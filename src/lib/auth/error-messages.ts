const KNOWN_CODES = new Set([
  "invalid_credentials",
  "account_locked",
  "phone_taken",
  "email_taken",
  "username_taken",
  "invalid_phone",
  "weak_password",
  "invalid_pin",
  "invalid_full_name",
  "invalid_request",
]);

/**
 * Translates a raw auth error code (thrown by the auth store as
 * `Error.message`, e.g. "phone_taken") into a language-appropriate message
 * via the given `t()` function. Falls back to a generic message for codes
 * the dictionary doesn't recognize, so a server-side typo or new error code
 * never surfaces as a raw snake_case string in the UI.
 */
export function authErrorMessage(code: string, t: (key: string) => string): string {
  const key = KNOWN_CODES.has(code) ? `authError.${code}` : "authError.default";
  return t(key);
}
