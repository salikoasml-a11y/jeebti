import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { SESSION_COOKIE, type JeebtiSessionUser } from "@/lib/auth/session";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.rpc("jeebti_validate_session", { p_token: token }).single<{
    user_id: string;
    full_name: string;
    phone: string;
    email: string | null;
    username: string | null;
    role: "customer" | "admin";
    kyc_status: JeebtiSessionUser["kyc_status"];
    created_at: string;
  }>();

  if (error || !data) {
    const response = NextResponse.json({ user: null }, { status: 200 });
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  const user: JeebtiSessionUser = {
    user_id: data.user_id,
    full_name: data.full_name,
    phone: data.phone,
    email: data.email,
    username: data.username,
    role: data.role,
    kyc_status: data.kyc_status,
    created_at: data.created_at,
  };

  return NextResponse.json({ user });
}
