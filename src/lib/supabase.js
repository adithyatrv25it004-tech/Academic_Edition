import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://oiwlttllhrmiwxsreral.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || "sb_publishable_M3Cmfo7gmKEgTGJlu-7eGQ_bwuk2wEN";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);