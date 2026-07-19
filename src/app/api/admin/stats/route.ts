import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { SESSION_COOKIE } from "@/lib/auth/session";

/**
 * Real, database-backed platform stats — total registered customers, new
 * signups this week, and users with a currently valid session. Unlike the
 * transaction/balance figures on this dashboard (which stay illustrative
 * mock data until a real banking ledger exists), these numbers reflect the
 * actual jeebti_users/jeebti_sessions tables.
 */
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ code: "unauthenticated" }, { status: 401 });
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .rpc("jeebti_admin_user_stats", { p_token: token })
    .single<{ total_users: number; new_signups_this_week: number; active_sessions: number }>();

  if (error || !data) {
    const forbidden = error?.message === "forbidden";
    return NextResponse.json({ code: forbidden ? "forbidden" : "error" }, { status: forbidden ? 403 : 500 });
  }

  return NextResponse.json({
    totalUsers: data.total_users,
    newSignupsThisWeek: data.new_signups_this_week,
    activeSessions: data.active_sessions,
  });
}
