// Edge Function: register-device
// Registers a new ECDSA P-256 public key as the user's active device.
// Enforces: one active device per user.
// Called from DeviceActivation.jsx after payment confirmation.
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { getSupabaseAdmin } from '../_shared/supabaseAdmin.ts';

const PRODUCT_ID = 'atp_complete';

serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { public_key, device_name } = await req.json().catch(() => ({}));

    if (!public_key) {
      return new Response(JSON.stringify({ error: 'public_key is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate that public_key is valid JWK JSON
    try {
      const jwk = typeof public_key === 'string' ? JSON.parse(public_key) : public_key;
      if (!jwk.kty || !jwk.crv || jwk.crv !== 'P-256') {
        throw new Error('Invalid JWK format');
      }
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid public_key format. Expected ECDSA P-256 JWK.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // 1. Authenticate user
    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: 'Invalid or expired session' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const user = userData.user;

    // 2. Verify active entitlement
    const { data: entitlement, error: entError } = await supabaseAdmin
      .from('entitlements')
      .select('user_id, product_id, status')
      .eq('user_id', user.id)
      .eq('product_id', PRODUCT_ID)
      .eq('status', 'active')
      .maybeSingle();

    if (entError || !entitlement) {
      return new Response(
        JSON.stringify({
          error: 'NO_ENTITLEMENT',
          message: 'Active ATP Revision Pack purchase required to register a device.',
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Check if user already has an active device
    const { data: existingDevices, error: devErr } = await supabaseAdmin
      .from('devices')
      .select('id, device_name, activated_at, status')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('activated_at', { ascending: true });

    if (devErr) {
      console.error('Device query error:', devErr);
    }

    if (existingDevices && existingDevices.length > 0) {
      const existingDevice = existingDevices[0];
      return new Response(
        JSON.stringify({
          error: 'DEVICE_CONFLICT',
          message: 'This Revision Vault is already activated on another device.',
          registered_device: existingDevice.device_name || 'Your primary device',
          activated_at: existingDevice.activated_at,
          device_id: existingDevice.id,
        }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Store public key as the new active device
    const publicKeyStr = typeof public_key === 'string' ? public_key : JSON.stringify(public_key);
    const { data: newDevice, error: insertError } = await supabaseAdmin
      .from('devices')
      .insert([
        {
          user_id: user.id,
          public_key: publicKeyStr,
          device_name: device_name || 'Primary Study Device',
          status: 'active',
          activated_at: new Date().toISOString(),
          last_seen_at: new Date().toISOString(),
        },
      ])
      .select('id, device_name, activated_at')
      .single();

    if (insertError) {
      console.error('Failed to insert device:', insertError);
      return new Response(JSON.stringify({ error: 'Failed to register device' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        device_id: newDevice.id,
        device_name: newDevice.device_name,
        activated_at: newDevice.activated_at,
        message: 'Device registered successfully. Your study pack is secured to this device.',
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('register-device error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
