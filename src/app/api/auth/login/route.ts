import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { SESSION_COOKIE, sessionCookieOptions, type JeebtiSessionUser } from "@/lib/auth/session";

type RpcRow = {
  success: boolean;
  error_code: string | null;
  session_token: string | null;
  user_id: string | null;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  username: string | null;
  role: "customer" | "admin" | null;
  kyc_status: JeebtiSessionUser["kyc_status"] | null;
  created_at: string | null;
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ code: "invalid_request" }, { status: 400 });
  }

  const { identifier, pin, password } = body as Record<string, unknown>;

  if (typeof identifier !== "string" || !identifier.trim()) {
    return NextResponse.json({ code: "invalid_request" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();

  const { data, error } =
    typeof pin === "string"
      ? await supabase.rpc("jeebti_login_pin", { p_identifier: identifier, p_pin: pin }).single<RpcRow>()
      : typeof password === "string"
        ? await supabase
            .rpc("jeebti_login_password", { p_identifier: identifier, p_password: password })
            .single<RpcRow>()
        : { data: null, error: { message: "invalid_request" } };

  if (error || !data || !data.success || !data.session_token || !data.user_id) {
    const code = error?.message ?? data?.error_code ?? "login_failed";
    const status = code === "account_locked" ? 423 : code === "invalid_credentials" ? 401 : 400;
    return NextResponse.json({ code }, { status });
  }

  const user: JeebtiSessionUser = {
    user_id: data.user_id,
    full_name: data.full_name!,
    phone: data.phone!,
    email: data.email,
    username: data.username,
    role: data.role!,
    kyc_status: data.kyc_status!,
    created_at: data.created_at!,
  };

  const response = NextResponse.json({ user });
  response.cookies.set(SESSION_COOKIE, data.session_token, sessionCookieOptions);
  return response;
}
