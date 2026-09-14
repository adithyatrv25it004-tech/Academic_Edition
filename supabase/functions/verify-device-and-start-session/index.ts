// Edge Function: verify-device-and-start-session
// Verifies that the browser signed the challenge with its non-exportable private key
// by checking the ECDSA P-256 signature against the stored public key.
// On success: revokes any existing study sessions and creates a new one.
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { getSupabaseAdmin } from '../_shared/supabaseAdmin.ts';

const PRODUCT_ID = 'atp_complete';
const SESSION_TTL_HOURS = 4;

function base64urlToBytes(base64url: string): Uint8Array {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function generateOpaqueToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
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

    const body = await req.json().catch(() => ({}));
    const { challenge_id, signature, device_id } = body;

    if (!challenge_id || !signature || !device_id) {
      return new Response(
        JSON.stringify({ error: 'challenge_id, signature, and device_id are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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

    // 3. Load the challenge — must exist, belong to this user, not expired, not used
    const { data: challengeRow, error: challengeErr } = await supabaseAdmin
      .from('device_challenges')
      .select('id, user_id, device_id, challenge, expires_at, used_at')
      .eq('id', challenge_id)
      .maybeSingle();

    if (challengeErr || !challengeRow) {
      return new Response(
        JSON.stringify({ error: 'CHALLENGE_NOT_FOUND', message: 'Challenge not found or expired.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (challengeRow.user_id !== user.id) {
      return new Response(
        JSON.stringify({ error: 'CHALLENGE_MISMATCH', message: 'Challenge does not belong to this user.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (challengeRow.used_at) {
      return new Response(
        JSON.stringify({ error: 'CHALLENGE_USED', message: 'This challenge has already been used.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (new Date(challengeRow.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: 'CHALLENGE_EXPIRED', message: 'Challenge has expired. Please try again.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (challengeRow.device_id !== device_id) {
      return new Response(
        JSON.stringify({ error: 'DEVICE_MISMATCH', message: 'Challenge was not issued for this device.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Load the device and its stored public key
    const { data: device, error: devErr } = await supabaseAdmin
      .from('devices')
      .select('id, user_id, public_key, status, device_name')
      .eq('id', device_id)
      .maybeSingle();

    if (devErr || !device) {
      return new Response(
        JSON.stringify({ error: 'DEVICE_NOT_FOUND', message: 'Registered device not found.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (device.user_id !== user.id) {
      return new Response(
        JSON.stringify({ error: 'DEVICE_NOT_OWNED', message: 'Device does not belong to this user.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (device.status !== 'active') {
      return new Response(
        JSON.stringify({ error: 'DEVICE_REVOKED', message: 'This device has been revoked. Please activate a new device.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!device.public_key) {
      return new Response(
        JSON.stringify({ error: 'NO_PUBLIC_KEY', message: 'Device has no registered public key.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 5. Verify ECDSA P-256 signature
    try {
      const jwk = JSON.parse(device.public_key);
      const cryptoKey = await crypto.subtle.importKey(
        'jwk',
        jwk,
        { name: 'ECDSA', namedCurve: 'P-256' },
        false, // not extractable
        ['verify']
      );

      // Challenge bytes are the raw UTF-8 bytes of the base64url challenge string
      const encoder = new TextEncoder();
      const challengeBytes = encoder.encode(challengeRow.challenge);

      // Signature comes as base64 from the browser
      const signatureBytes = base64urlToBytes(signature);

      const isValid = await crypto.subtle.verify(
        { name: 'ECDSA', hash: { name: 'SHA-256' } },
        cryptoKey,
        signatureBytes,
        challengeBytes
      );

      if (!isValid) {
        return new Response(
          JSON.stringify({ error: 'SIGNATURE_INVALID', message: 'Device signature verification failed.' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } catch (cryptoErr: any) {
      console.error('Crypto verification error:', cryptoErr);
      return new Response(
        JSON.stringify({ error: 'SIGNATURE_ERROR', message: 'Failed to verify device signature.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 6. Mark challenge as used (prevent replay attacks)
    await supabaseAdmin
      .from('device_challenges')
      .update({ used_at: new Date().toISOString() })
      .eq('id', challenge_id);

    // 7. Update device last_seen_at
    await supabaseAdmin
      .from('devices')
      .update({ last_seen_at: new Date().toISOString() })
      .eq('id', device_id);

    // 8. Revoke all existing active study sessions for this user
    await supabaseAdmin
      .from('study_sessions')
      .update({ revoked_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .is('revoked_at', null);

    // 9. Create a new study session
    const sessionToken = generateOpaqueToken();
    const expiresAt = new Date(Date.now() + SESSION_TTL_HOURS * 60 * 60 * 1000).toISOString();

    const { data: newSession, error: sessionErr } = await supabaseAdmin
      .from('study_sessions')
      .insert([
        {
          user_id: user.id,
          device_id: device_id,
          session_token: sessionToken,
          expires_at: expiresAt,
        },
      ])
      .select('id, session_token, expires_at')
      .single();

    if (sessionErr) {
      console.error('Failed to create study session:', sessionErr);
      return new Response(JSON.stringify({ error: 'Failed to create study session' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        session_token: newSession.session_token,
        session_id: newSession.id,
        expires_at: newSession.expires_at,
        device_name: device.device_name,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('verify-device-and-start-session error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
