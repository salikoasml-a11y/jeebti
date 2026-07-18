export const SESSION_COOKIE = "jeebti_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days, mirrors jeebti_sessions.expires_at

export interface JeebtiSessionUser {
  user_id: string;
  full_name: string;
  phone: string;
  email: string | null;
  username: string | null;
  role: "customer" | "admin";
  kyc_status: "unverified" | "pending" | "verified" | "rejected";
  created_at: string;
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};
