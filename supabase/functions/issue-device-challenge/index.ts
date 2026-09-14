// Edge Function: issue-device-challenge
// Generates a one-time-use cryptographic challenge for the user's registered device.
// The browser signs this challenge with its non-exportable private key.
// Challenge is valid for 30 seconds and can only be used once.
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { getSupabaseAdmin } from '../_shared/supabaseAdmin.ts';

const PRODUCT_ID = 'atp_complete';
const CHALLENGE_TTL_SECONDS = 30;

function base64urlEncode(bytes: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...bytes));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

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
    const { data: entitlement } = await supabaseAdmin
      .from('entitlements')
      .select('user_id')
      .eq('user_id', user.id)
      .eq('product_id', PRODUCT_ID)
      .eq('status', 'active')
      .maybeSingle();

    if (!entitlement) {
      return new Response(
        JSON.stringify({ error: 'NO_ENTITLEMENT', message: 'Active entitlement required.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Find user's active device
    const { data: device, error: devErr } = await supabaseAdmin
      .from('devices')
      .select('id, public_key, device_name, status')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('activated_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (devErr || !device) {
      return new Response(
        JSON.stringify({
          error: 'NO_ACTIVE_DEVICE',
          message: 'No active device registered. Please activate your device first.',
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!device.public_key) {
      return new Response(
        JSON.stringify({
          error: 'DEVICE_NOT_CRYPTO_BOUND',
          message: 'Device does not have a registered public key. Please re-activate your device.',
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Generate 32 cryptographically random bytes → base64url
    const randomBytes = new Uint8Array(32);
    crypto.getRandomValues(randomBytes);
    const challengeStr = base64urlEncode(randomBytes);

    const expiresAt = new Date(Date.now() + CHALLENGE_TTL_SECONDS * 1000).toISOString();

    // 5. Store challenge in DB
    const { data: challengeRow, error: insertErr } = await supabaseAdmin
      .from('device_challenges')
      .insert([
        {
          user_id: user.id,
          device_id: device.id,
          challenge: challengeStr,
          expires_at: expiresAt,
        },
      ])
      .select('id')
      .single();

    if (insertErr) {
      console.error('Failed to insert challenge:', insertErr);
      return new Response(JSON.stringify({ error: 'Failed to generate challenge' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        challenge_id: challengeRow.id,
        challenge: challengeStr,
        device_id: device.id,
        expires_in: CHALLENGE_TTL_SECONDS,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('issue-device-challenge error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
