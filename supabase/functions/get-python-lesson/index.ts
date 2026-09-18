// Edge Function: get-python-lesson
// Authenticates paid lesson requests by verifying entitlement before returning lesson payload.
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { getSupabaseAdmin } from '../_shared/supabaseAdmin.ts';

const PRODUCT_ID = 'atp_complete';

serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { lesson_id } = await req.json().catch(() => ({}));
    if (!lesson_id) {
      return new Response(JSON.stringify({ error: 'lesson_id is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const token = authHeader.replace('Bearer ', '');
    const supabaseAdmin = getSupabaseAdmin();
    
    // 1. Authenticate user
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: 'Invalid or expired user session' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const user = userData.user;

    // 2. Fetch requested lesson
    const { data: lessonData, error: lessonError } = await supabaseAdmin
      .from('python_course_lessons')
      .select('*')
      .eq('id', lesson_id)
      .eq('active', true)
      .maybeSingle();

    if (lessonError || !lessonData) {
      return new Response(JSON.stringify({ error: 'Lesson not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 3. Verify entitlement IF the lesson is not a free preview
    if (!lessonData.is_free_preview) {
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
            message: 'Active ATP Python Journey access required to view this lesson.',
          }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // 4. Return secure lesson payload
    return new Response(JSON.stringify({ lesson: lessonData }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    console.error('Server error in get-python-lesson:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
