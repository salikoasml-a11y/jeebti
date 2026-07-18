import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { SESSION_COOKIE, sessionCookieOptions, type JeebtiSessionUser } from "@/lib/auth/session";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ code: "invalid_request" }, { status: 400 });
  }

  const { fullName, phone, email, username, password, pin } = body as Record<string, unknown>;

  if (
    typeof fullName !== "string" ||
    typeof phone !== "string" ||
    typeof password !== "string" ||
    typeof pin !== "string"
  ) {
    return NextResponse.json({ code: "invalid_request" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .rpc("jeebti_signup", {
      p_full_name: fullName,
      p_phone: phone,
      p_email: typeof email === "string" && email.trim() ? email : null,
      p_username: typeof username === "string" && username.trim() ? username : null,
      p_password: password,
      p_pin: pin,
    })
    .single<{
      session_token: string;
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
    const code = error?.message ?? "signup_failed";
    const status = code === "phone_taken" || code === "email_taken" || code === "username_taken" ? 409 : 400;
    return NextResponse.json({ code }, { status });
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

  const response = NextResponse.json({ user });
  response.cookies.set(SESSION_COOKIE, data.session_token, sessionCookieOptions);
  return response;
}
