// Edge Function: refresh-study-session
// Extends an active study session by SESSION_TTL_HOURS from now.
// Called by the frontend heartbeat every 60 seconds.
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { getSupabaseAdmin } from '../_shared/supabaseAdmin.ts';

const PRODUCT_ID = 'atp_complete';
const SESSION_TTL_HOURS = 4;

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
      return new Response(JSON.stringify({ error: 'Missing x-session-token header' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // 1. Authenticate user
    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: 'Invalid or expired JWT' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const user = userData.user;

    // 2. Verify active entitlement (belt-and-suspenders)
    const { data: entitlement } = await supabaseAdmin
      .from('entitlements')
      .select('user_id')
      .eq('user_id', user.id)
      .eq('product_id', PRODUCT_ID)
      .eq('status', 'active')
      .maybeSingle();

    if (!entitlement) {
      return new Response(
        JSON.stringify({ error: 'NO_ENTITLEMENT' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Find and validate the session token
    const { data: session, error: sessErr } = await supabaseAdmin
      .from('study_sessions')
      .select('id, user_id, device_id, expires_at, revoked_at')
      .eq('session_token', sessionToken)
      .maybeSingle();

    if (sessErr || !session) {
      return new Response(
        JSON.stringify({ error: 'SESSION_NOT_FOUND', message: 'Study session not found.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (session.user_id !== user.id) {
      return new Response(
        JSON.stringify({ error: 'SESSION_MISMATCH' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (session.revoked_at) {
      return new Response(
        JSON.stringify({ error: 'SESSION_REVOKED', message: 'Study session has been revoked.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (new Date(session.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: 'SESSION_EXPIRED', message: 'Study session has expired.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Verify device is still active
    const { data: device } = await supabaseAdmin
      .from('devices')
      .select('id, status')
      .eq('id', session.device_id)
      .maybeSingle();

    if (!device || device.status !== 'active') {
      // Device was revoked (e.g. after transfer) - revoke session too
      await supabaseAdmin
        .from('study_sessions')
        .update({ revoked_at: new Date().toISOString() })
        .eq('id', session.id);

      return new Response(
        JSON.stringify({ error: 'DEVICE_REVOKED', message: 'Device has been revoked.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 5. Extend session
    const newExpiresAt = new Date(Date.now() + SESSION_TTL_HOURS * 60 * 60 * 1000).toISOString();
    const now = new Date().toISOString();

    await supabaseAdmin
      .from('study_sessions')
      .update({ expires_at: newExpiresAt, last_seen_at: now })
      .eq('id', session.id);

    await supabaseAdmin
      .from('devices')
      .update({ last_seen_at: now })
      .eq('id', session.device_id);

    return new Response(
      JSON.stringify({ ok: true, expires_at: newExpiresAt }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('refresh-study-session error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
