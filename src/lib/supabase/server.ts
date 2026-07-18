import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

/**
 * Server-only Supabase client used exclusively to call the jeebti_* RPC
 * functions (see the `jeebti_auth_*` migrations). All real access control
 * lives in those Postgres functions (bcrypt password/PIN checks, lockout,
 * session issuance) — this client only ever uses the public anon key and
 * never touches jeebti_users/jeebti_sessions directly (RLS blocks that).
 */
export function getSupabaseServerClient() {
  return createClient(url!, anonKey!, {
    auth: { persistSession: false },
  });
}
