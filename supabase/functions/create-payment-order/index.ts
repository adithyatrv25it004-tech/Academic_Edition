// Edge Function: create-payment-order
// Authenticates user and securely creates a unique Razorpay Order for ₹49 (4900 paise)
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { getSupabaseAdmin } from '../_shared/supabaseAdmin.ts';

const PRODUCT_ID = 'atp_complete';
const AMOUNT_PAISE = 4900; // Strict server-side: ₹49 = 4900 paise
const CURRENCY = 'INR';

serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing Authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    // Authenticate user token
    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !userData?.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Invalid or expired session' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const user = userData.user;

    // Check if user already has an active entitlement
    const { data: existingEntitlement } = await supabaseAdmin
      .from('entitlements')
      .select('*')
      .eq('user_id', user.id)
      .eq('product_id', PRODUCT_ID)
      .eq('status', 'active')
      .maybeSingle();

    if (existingEntitlement) {
      return new Response(
        JSON.stringify({
          already_active: true,
          message: 'You already have active access to this revision vault.',
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check for pending orders in last 5 minutes to prevent duplicates
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: pendingOrder } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .eq('product_id', PRODUCT_ID)
      .eq('status', 'created')
      .gte('created_at', fiveMinutesAgo)
      .maybeSingle();

    if (pendingOrder) {
      return new Response(
        JSON.stringify({
          pending_order: true,
          order_id: pendingOrder.gateway_order_id,
          message: 'You have a pending order. Please complete or wait for it to expire.',
        }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Razorpay Credentials from Edge Secrets
    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID');
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!razorpayKeyId || !razorpayKeySecret) {
      console.error('Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET in secrets');
      return new Response(
        JSON.stringify({ error: 'Payment gateway configuration error on server' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create unique order via Razorpay Orders API
    const receiptId = `rcpt_${user.id.slice(0, 8)}_${Date.now()}`;
    const rzpAuth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);

    const rzpResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${rzpAuth}`,
      },
      body: JSON.stringify({
        amount: AMOUNT_PAISE,
        currency: CURRENCY,
        receipt: receiptId,
        notes: {
          user_id: user.id,
          user_email: user.email || '',
          product_id: PRODUCT_ID,
        },
      }),
    });

    if (!rzpResponse.ok) {
      const errorText = await rzpResponse.text();
      console.error('Razorpay Order Creation Failed:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to create payment order with gateway' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const rzpOrder = await rzpResponse.json();

    // Store in Supabase orders table with status 'created'
    // Uses ONLY valid live public.orders columns:
    // user_id, product_id, gateway, gateway_order_id, amount_paise, currency, status
    const { error: dbError } = await supabaseAdmin.from('orders').insert([
      {
        user_id: user.id,
        product_id: PRODUCT_ID,
        gateway: 'razorpay',
        gateway_order_id: rzpOrder.id,
        amount_paise: AMOUNT_PAISE,
        currency: CURRENCY,
        status: 'created',
      },
    ]);

    if (dbError) {
      console.error('Failed to record order in DB:', dbError.message || dbError);
      // CRITICAL: If the Supabase order insert fails, DO NOT continue checkout.
      // Return an error and block the payment flow.
      return new Response(
        JSON.stringify({ error: 'Failed to record payment order in database. Checkout blocked.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Return safe checkout parameters (NEVER expose key_secret!)
    return new Response(
      JSON.stringify({
        order_id: rzpOrder.id,
        amount: AMOUNT_PAISE,
        currency: CURRENCY,
        key_id: razorpayKeyId,
        product_name: 'ATP Complete Revision Pack',
        description: 'Complete revision notes, PYQs, last-minute sheets & recall deck',
        prefill: {
          email: user.email || '',
          name: user.user_metadata?.name || '',
        },
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Server error in create-payment-order:', err.message || err);
    return new Response(
      JSON.stringify({ error: err.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
