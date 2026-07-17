import type { AuthProvider } from "@/lib/banking/provider";
import type { User } from "@/lib/types";
import { demoUser } from "@/lib/seed";

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));
const SESSION_KEY = "jeebti_session_user_id";

const demoAdmin: User = {
  id: "usr_admin_001",
  firstName: "Nadia",
  lastName: "Hussain",
  email: "admin@jeebti.com",
  phone: "+44 7700 900555",
  dateOfBirth: "1988-06-02",
  address: { line1: "1 Jeebti HQ", city: "London", postcode: "EC2A 2BB", country: "United Kingdom" },
  kycStatus: "verified",
  role: "admin",
  createdAt: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString(),
  twoFactorEnabled: true,
  biometricEnabled: false,
};

const registeredUsers = new Map<string, { user: User; password: string }>([
  [demoUser.email, { user: demoUser, password: "demo1234" }],
  [demoAdmin.email, { user: demoAdmin, password: "admin1234" }],
]);

/**
 * Mock implementation of AuthProvider, standing in for Supabase Auth until a
 * real Supabase project is connected. The interface intentionally mirrors
 * Supabase's signUp/signInWithPassword/signOut/getSession shape so swapping
 * in `@supabase/supabase-js` later is a drop-in change behind this file.
 */
export class MockAuthProvider implements AuthProvider {
  async signUp(input: { firstName: string; lastName: string; email: string; phone: string; password: string }) {
    await delay(600);
    if (registeredUsers.has(input.email)) {
      throw new Error("An account with this email already exists");
    }
    const user: User = {
      id: `usr_${Math.random().toString(36).slice(2, 10)}`,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      dateOfBirth: "",
      address: { line1: "", city: "", postcode: "", country: "United Kingdom" },
      kycStatus: "unverified",
      role: "customer",
      createdAt: new Date().toISOString(),
      twoFactorEnabled: false,
      biometricEnabled: false,
    };
    registeredUsers.set(input.email, { user, password: input.password });
    if (typeof window !== "undefined") localStorage.setItem(SESSION_KEY, user.id);
    return user;
  }

  async signIn(email: string, password: string) {
    await delay(600);
    const record = registeredUsers.get(email);
    if (!record || record.password !== password) {
      throw new Error("Invalid email or password");
    }
    if (typeof window !== "undefined") localStorage.setItem(SESSION_KEY, record.user.id);
    return record.user;
  }

  async signOut() {
    await delay(200);
    if (typeof window !== "undefined") localStorage.removeItem(SESSION_KEY);
  }

  async getSession() {
    await delay(150);
    if (typeof window === "undefined") return null;
    const id = localStorage.getItem(SESSION_KEY);
    if (!id) return null;
    for (const { user } of registeredUsers.values()) {
      if (user.id === id) return user;
    }
    return null;
  }
}

export const authProvider = new MockAuthProvider();
