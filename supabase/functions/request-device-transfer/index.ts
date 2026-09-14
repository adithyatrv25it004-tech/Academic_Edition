// Edge Function: request-device-transfer (v2)
// Allows a paid user to transfer their study pack to a new device.
// Enforces:
//   - Active entitlement required
//   - Rate limit: 1 approved transfer per 7 days
//   - Revokes all existing active devices and study sessions
//   - Registers new device with provided ECDSA P-256 public key
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { getSupabaseAdmin } from '../_shared/supabaseAdmin.ts';

const PRODUCT_ID = 'atp_complete';
const TRANSFER_COOLDOWN_DAYS = 7;

serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing auth header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json().catch(() => ({}));
    const { public_key, device_name, reason } = body;

    if (!public_key) {
      return new Response(JSON.stringify({ error: 'public_key is required for device transfer' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate JWK format
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
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
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
        JSON.stringify({ error: 'NO_ENTITLEMENT', message: 'Active purchase required for device transfer.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Rate limit check: no approved transfer in the last TRANSFER_COOLDOWN_DAYS
    const cooldownDate = new Date(Date.now() - TRANSFER_COOLDOWN_DAYS * 24 * 60 * 60 * 1000).toISOString();
    const { data: recentTransfers } = await supabaseAdmin
      .from('device_transfer_requests')
      .select('id, approved_at')
      .eq('user_id', user.id)
      .eq('status', 'approved')
      .gt('approved_at', cooldownDate)
      .order('approved_at', { ascending: false })
      .limit(1);

    if (recentTransfers && recentTransfers.length > 0) {
      const lastTransfer = recentTransfers[0];
      const cooldownEnds = new Date(
        new Date(lastTransfer.approved_at).getTime() + TRANSFER_COOLDOWN_DAYS * 24 * 60 * 60 * 1000
      );
      return new Response(
        JSON.stringify({
          error: 'TRANSFER_RATE_LIMITED',
          message: `Device transfer is limited to once every ${TRANSFER_COOLDOWN_DAYS} days for account security.`,
          cooldown_ends: cooldownEnds.toISOString(),
          next_transfer_available: cooldownEnds.toISOString(),
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Find and revoke old active devices
    const { data: oldDevices } = await supabaseAdmin
      .from('devices')
      .select('id, device_name')
      .eq('user_id', user.id)
      .eq('status', 'active');

    const oldDeviceIds = (oldDevices || []).map((d: any) => d.id);

    if (oldDeviceIds.length > 0) {
      await supabaseAdmin
        .from('devices')
        .update({ status: 'revoked' })
        .in('id', oldDeviceIds);
    }

    // 5. Revoke all active study sessions
    await supabaseAdmin
      .from('study_sessions')
      .update({ revoked_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .is('revoked_at', null);

    // 6. Register new device with new public key
    const publicKeyStr = typeof public_key === 'string' ? public_key : JSON.stringify(public_key);
    const { data: newDevice, error: insertError } = await supabaseAdmin
      .from('devices')
      .insert([
        {
          user_id: user.id,
          public_key: publicKeyStr,
          device_name: device_name || 'Transferred Device',
          status: 'active',
          activated_at: new Date().toISOString(),
          last_seen_at: new Date().toISOString(),
        },
      ])
      .select('id, device_name, activated_at')
      .single();

    if (insertError) {
      console.error('Failed to register transferred device:', insertError);
      return new Response(JSON.stringify({ error: 'Failed to complete device transfer' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 7. Log the transfer
    const now = new Date().toISOString();
    await supabaseAdmin.from('device_transfer_requests').insert([
      {
        user_id: user.id,
        old_device_id: oldDeviceIds.length > 0 ? oldDeviceIds[0] : null,
        new_device_name: device_name || 'Transferred Device',
        status: 'approved',
        reason: reason || 'User initiated device transfer',
        requested_at: now,
        resolved_at: now,
        approved_at: now,
      },
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Device transfer successful. Your study pack is now bound to this new device.',
        new_device_id: newDevice.id,
        new_device_name: newDevice.device_name,
        activated_at: newDevice.activated_at,
        old_devices_revoked: oldDeviceIds.length,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('request-device-transfer error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
