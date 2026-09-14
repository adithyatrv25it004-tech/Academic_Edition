// Edge Function: get-material-access (v2 — Cryptographic Session)
// Authenticates user, verifies entitlement, validates active study session
// (which itself was established by verifying an ECDSA P-256 device signature),
// then issues a short-lived (90s) signed Storage URL with dynamic watermark metadata.
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { getSupabaseAdmin } from '../_shared/supabaseAdmin.ts';

const BUCKET_NAME = 'study-materials';
const PRODUCT_ID = 'atp_complete';
const SIGNED_URL_EXPIRATION_SECONDS = 90;

function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return 'user***@atp.internal';
  const [local, domain] = email.split('@');
  if (local.length <= 2) {
    return `${local[0]}***@${domain}`;
  }
  return `${local[0]}***${local[local.length - 1]}@${domain}`;
}

serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const authHeader = req.headers.get('Authorization');
    const sessionToken = req.headers.get('x-session-token');

    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!sessionToken) {
      return new Response(
        JSON.stringify({
          error: 'SESSION_REQUIRED',
          message: 'A valid study session token is required to access protected materials.',
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { material_id } = await req.json().catch(() => ({}));

    if (!material_id) {
      return new Response(JSON.stringify({ error: 'material_id is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // 1. Authenticate user via JWT
    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: 'Invalid or expired user session' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const user = userData.user;

    // 2. Verify active entitlement
    const { data: entitlement, error: entError } = await supabaseAdmin
      .from('entitlements')
      .select('payment_id, status')
      .eq('user_id', user.id)
      .eq('product_id', PRODUCT_ID)
      .eq('status', 'active')
      .maybeSingle();

    if (entError || !entitlement) {
      return new Response(
        JSON.stringify({
          error: 'NO_ENTITLEMENT',
          message: 'Active ATP Revision Pack entitlement required to access this resource.',
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Validate study session token
    const { data: session, error: sessErr } = await supabaseAdmin
      .from('study_sessions')
      .select('id, user_id, device_id, expires_at, revoked_at, last_seen_at')
      .eq('session_token', sessionToken)
      .maybeSingle();

    if (sessErr || !session) {
      return new Response(
        JSON.stringify({
          error: 'SESSION_INVALID',
          message: 'Study session not found. Please re-authenticate your device.',
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify session belongs to this user
    if (session.user_id !== user.id) {
      return new Response(
        JSON.stringify({ error: 'SESSION_MISMATCH', message: 'Session does not belong to this account.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check not revoked
    if (session.revoked_at) {
      return new Response(
        JSON.stringify({
          error: 'SESSION_REVOKED',
          message: 'This study session has been revoked. Please re-authenticate your device.',
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check not expired
    if (new Date(session.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({
          error: 'SESSION_EXPIRED',
          message: 'Study session has expired. Please refresh your session.',
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Verify device is still active (catches immediate revocation after transfer)
    const { data: device, error: devErr } = await supabaseAdmin
      .from('devices')
      .select('id, status, device_name')
      .eq('id', session.device_id)
      .maybeSingle();

    if (devErr || !device) {
      return new Response(
        JSON.stringify({ error: 'DEVICE_NOT_FOUND', message: 'Registered device not found.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (device.status !== 'active') {
      // Revoke session too since device is gone
      await supabaseAdmin
        .from('study_sessions')
        .update({ revoked_at: new Date().toISOString() })
        .eq('id', session.id);

      return new Response(
        JSON.stringify({
          error: 'DEVICE_REVOKED',
          message: 'Your device access has been revoked. This may happen after a device transfer.',
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 5. Update session last_seen_at (heartbeat)
    const now = new Date().toISOString();
    await supabaseAdmin
      .from('study_sessions')
      .update({ last_seen_at: now })
      .eq('id', session.id);

    await supabaseAdmin
      .from('devices')
      .update({ last_seen_at: now })
      .eq('id', device.id);

    // 6. Retrieve material storage path
    const { data: material, error: matError } = await supabaseAdmin
      .from('materials')
      .select('id, title, category, storage_path, module_number, summary')
      .eq('id', material_id)
      .eq('active', true)
      .maybeSingle();

    if (matError || !material) {
      return new Response(JSON.stringify({ error: 'Study material not found or not active' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 7. Generate short-lived signed URL (90 seconds)
    const { data: signedData, error: signError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .createSignedUrl(material.storage_path, SIGNED_URL_EXPIRATION_SECONDS);

    const maskedEmail = maskEmail(user.email || '');
    const orderRef = entitlement.payment_id
      ? `ATP-${entitlement.payment_id.slice(-5).toUpperCase()}`
      : 'ATP-ACTIVE';

    const watermark = {
      brand: 'ATP REVISION VAULT',
      licensed_to: maskedEmail,
      order_id: orderRef,
      footer_notice: 'PERSONAL STUDY ACCESS',
    };

    if (signError || !signedData?.signedUrl) {
      console.warn('Storage signedUrl generation notice (file may not be uploaded yet):', signError?.message);
      // Return metadata with null signedUrl — viewer renders text content fallback
      return new Response(
        JSON.stringify({
          material_id: material.id,
          title: material.title,
          category: material.category,
          module_number: material.module_number,
          summary: material.summary,
          signedUrl: null,
          is_mock_mode: true,
          expiresIn: SIGNED_URL_EXPIRATION_SECONDS,
          watermark,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        material_id: material.id,
        title: material.title,
        category: material.category,
        module_number: material.module_number,
        signedUrl: signedData.signedUrl,
        expiresIn: SIGNED_URL_EXPIRATION_SECONDS,
        watermark,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Server error in get-material-access:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
