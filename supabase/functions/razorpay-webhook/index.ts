// Edge Function: razorpay-webhook
// Securely verifies Razorpay HMAC-SHA256 signature and idempotently activates student entitlement
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { getSupabaseAdmin } from '../_shared/supabaseAdmin.ts';

const EXPECTED_AMOUNT_PAISE = 4900;
const EXPECTED_CURRENCY = 'INR';
const PRODUCT_ID = 'atp_complete';

// Verify HMAC-SHA256 signature
async function verifyHmacSha256(rawBody: string, signature: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBytes = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(rawBody)
  );

  const hexSignature = Array.from(new Uint8Array(signatureBytes))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return hexSignature.toLowerCase() === signature.toLowerCase();
}

serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const webhookSecret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET');
  if (!webhookSecret) {
    console.error('RAZORPAY_WEBHOOK_SECRET secret missing!');
    return new Response('Server configuration error', { status: 500 });
  }

  const signature = req.headers.get('x-razorpay-signature');
  if (!signature) {
    console.warn('Webhook rejected: Missing x-razorpay-signature header');
    return new Response('Missing signature header', { status: 400 });
  }

  const rawBody = await req.text();

  const isValid = await verifyHmacSha256(rawBody, signature, webhookSecret);
  if (!isValid) {
    console.warn('Webhook signature verification failed!');
    return new Response('Invalid webhook signature', { status: 400 });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response('Invalid JSON body', { status: 400 });
  }

  console.log(`Received verified Razorpay event: ${event.event}`);

  // We handle order.paid and payment.captured
  if (event.event === 'order.paid' || event.event === 'payment.captured') {
    const payload = event.payload;
    const paymentEntity = payload.payment?.entity;
    const orderEntity = payload.order?.entity;

    const gatewayOrderId = paymentEntity?.order_id || orderEntity?.id;
    const gatewayPaymentId = paymentEntity?.id;
    const amount = paymentEntity?.amount || orderEntity?.amount;
    const currency = paymentEntity?.currency || orderEntity?.currency;

    if (!gatewayOrderId) {
      console.warn('No order_id found in payment payload');
      return new Response('Order ID missing in payload', { status: 200 });
    }

    // Verify amount is ₹49 (4900 paise)
    if (amount !== EXPECTED_AMOUNT_PAISE) {
      console.error(`Amount mismatch: expected ${EXPECTED_AMOUNT_PAISE}, got ${amount}`);
      return new Response('Amount mismatch recorded', { status: 200 });
    }

    // Verify currency is INR
    if (currency !== EXPECTED_CURRENCY) {
      console.error(`Currency mismatch: expected ${EXPECTED_CURRENCY}, got ${currency}`);
      return new Response('Currency mismatch recorded', { status: 200 });
    }

    // Verify payment status is actually captured/paid
    const paymentStatus = paymentEntity?.status;
    if (paymentStatus !== 'captured' && paymentStatus !== 'authorized') {
      console.warn(`Payment status not valid: ${paymentStatus}`);
      return new Response('Payment not completed', { status: 200 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // Find the corresponding order in Supabase
    const { data: orderRecord, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('gateway_order_id', gatewayOrderId)
      .maybeSingle();

    if (orderError || !orderRecord) {
      console.error('Order not found for gateway_order_id:', gatewayOrderId);
      // If user_id was stored in notes, fallback to notes
      const notesUserId = paymentEntity?.notes?.user_id || orderEntity?.notes?.user_id;
      if (notesUserId) {
        await activateEntitlement(supabaseAdmin, notesUserId, gatewayPaymentId || gatewayOrderId);
      }
      return new Response(JSON.stringify({ status: 'Order not found, fallback attempted' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 1. Update order status to paid
    await supabaseAdmin
      .from('orders')
      .update({
        status: 'paid',
        gateway_payment_id: gatewayPaymentId || orderRecord.gateway_payment_id,
        paid_at: new Date().toISOString(),
      })
      .eq('id', orderRecord.id);

    // 2. Idempotently create/activate student entitlement
    await activateEntitlement(supabaseAdmin, orderRecord.user_id, gatewayPaymentId || gatewayOrderId);

    console.log(`Successfully activated entitlement for user: ${orderRecord.user_id}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});

async function activateEntitlement(supabaseAdmin: any, userId: string, paymentId: string) {
  const { error } = await supabaseAdmin
    .from('entitlements')
    .upsert(
      {
        user_id: userId,
        product_id: PRODUCT_ID,
        payment_id: paymentId,
        status: 'active',
        activated_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id,product_id',
      }
    );

  if (error) {
    console.error('Error upserting entitlement:', error);
    throw error;
  }
}
