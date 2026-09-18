// Edge Function: get-free-material-access
// Authenticates free material requests by checking materials.is_free = true on the backend.
// No JWT, no device binding, no entitlement required.
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { getSupabaseAdmin } from '../_shared/supabaseAdmin.ts';

const BUCKET_NAME = 'study-materials';
const SIGNED_URL_EXPIRATION_SECONDS = 90;

serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { material_id } = await req.json().catch(() => ({}));

    if (!material_id) {
      return new Response(JSON.stringify({ error: 'material_id is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // 1. Retrieve material strictly checking is_free = true
    const { data: material, error: matError } = await supabaseAdmin
      .from('materials')
      .select('id, title, category, storage_path, module_number, summary, is_free, active')
      .eq('id', material_id)
      .eq('active', true)
      .eq('is_free', true)
      .maybeSingle();

    if (matError || !material) {
      return new Response(JSON.stringify({ error: 'Study material not found or not available for free access' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Try to identify user safely (optional, for watermark)
    let licensedTo = 'FREE STUDENT COPY';
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (token && token !== 'null') {
        const { data: userData } = await supabaseAdmin.auth.getUser(token);
        if (userData?.user?.email) {
          const email = userData.user.email;
          const [local, domain] = email.split('@');
          if (local.length > 2) {
            licensedTo = `${local[0]}***${local[local.length - 1]}@${domain}`;
          } else {
            licensedTo = `${local[0]}***@${domain}`;
          }
        }
      }
    }

    // 3. Generate short-lived signed URL (90 seconds)
    const { data: signedData, error: signError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .createSignedUrl(material.storage_path, SIGNED_URL_EXPIRATION_SECONDS);

    const watermark = {
      brand: 'ATP REVISION LIBRARY',
      licensed_to: licensedTo,
      order_id: 'FREE-ACCESS',
      footer_notice: 'FREE STUDY MATERIAL',
    };

    if (signError || !signedData?.signedUrl) {
      console.warn('Storage signedUrl generation notice:', signError?.message);
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
        summary: material.summary,
        signedUrl: signedData.signedUrl,
        expiresIn: SIGNED_URL_EXPIRATION_SECONDS,
        watermark,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Server error in get-free-material-access:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
