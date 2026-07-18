import type { User } from "@/lib/types";
import type { JeebtiSessionUser } from "@/lib/auth/session";

/**
 * Maps the real, database-backed session user (Supabase-hosted `jeebti_users`
 * row) onto the richer `User` shape the rest of the app already renders
 * against. Fields the Bankily-style signup flow doesn't collect (address,
 * date of birth) default empty and are editable — but not yet persisted —
 * from the Profile page, same as before this integration. 2FA/biometric
 * flags are likewise local-only preferences layered on top of the real,
 * persisted identity until a dedicated settings table exists.
 */
export function mapSessionUserToUser(sessionUser: JeebtiSessionUser): User {
  const [firstName, ...rest] = sessionUser.full_name.trim().split(/\s+/);
  return {
    id: sessionUser.user_id,
    firstName: firstName || sessionUser.full_name,
    lastName: rest.join(" "),
    email: sessionUser.email ?? "",
    phone: sessionUser.phone,
    dateOfBirth: "",
    address: { line1: "", city: "", postcode: "", country: "" },
    kycStatus: sessionUser.kyc_status,
    role: sessionUser.role,
    createdAt: sessionUser.created_at,
    twoFactorEnabled: false,
    biometricEnabled: false,
  };
}
