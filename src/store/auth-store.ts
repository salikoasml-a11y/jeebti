import { create } from "zustand";
import type { User } from "@/lib/types";
import { mapSessionUserToUser } from "@/lib/auth/map-session-user";

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
  error: string | null;
  init: () => Promise<void>;
  signInWithPin: (identifier: string, pin: string) => Promise<User>;
  signInWithPassword: (identifier: string, password: string) => Promise<User>;
  signUp: (input: {
    fullName: string;
    phone: string;
    email?: string;
    username?: string;
    password: string;
    pin: string;
  }) => Promise<User>;
  resetPin: (identifier: string, password: string, newPin: string) => Promise<User>;
  signOut: () => Promise<void>;
  updateUser: (patch: Partial<User>) => void;
  clearError: () => void;
}

// The server returns a stable machine-readable `code` (e.g. "phone_taken"),
// never prose — translating it into a language-appropriate message is the
// caller's job via `authErrorMessage()` in @/lib/auth/error-messages, since
// this store isn't a component and can't call the useTranslation hook.
async function parseJsonResponse<T>(response: Response): Promise<T> {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body?.code || "unknown_error");
  }
  return body as T;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  status: "idle",
  error: null,

  init: async () => {
    if (get().status !== "idle") return;
    set({ status: "loading" });
    try {
      const response = await fetch("/api/auth/me");
      const body = await response.json();
      const user = body.user ? mapSessionUserToUser(body.user) : null;
      set({ user, status: user ? "authenticated" : "unauthenticated" });
    } catch {
      set({ user: null, status: "unauthenticated" });
    }
  },

  signInWithPin: async (identifier, pin) => {
    set({ status: "loading", error: null });
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, pin }),
      });
      const { user: sessionUser } = await parseJsonResponse<{ user: import("@/lib/auth/session").JeebtiSessionUser }>(
        response
      );
      const user = mapSessionUserToUser(sessionUser);
      set({ user, status: "authenticated" });
      return user;
    } catch (e) {
      set({ status: "unauthenticated", error: e instanceof Error ? e.message : "Une erreur est survenue." });
      throw e;
    }
  },

  signInWithPassword: async (identifier, password) => {
    set({ status: "loading", error: null });
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const { user: sessionUser } = await parseJsonResponse<{ user: import("@/lib/auth/session").JeebtiSessionUser }>(
        response
      );
      const user = mapSessionUserToUser(sessionUser);
      set({ user, status: "authenticated" });
      return user;
    } catch (e) {
      set({ status: "unauthenticated", error: e instanceof Error ? e.message : "Une erreur est survenue." });
      throw e;
    }
  },

  signUp: async (input) => {
    set({ status: "loading", error: null });
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const { user: sessionUser } = await parseJsonResponse<{ user: import("@/lib/auth/session").JeebtiSessionUser }>(
        response
      );
      const user = mapSessionUserToUser(sessionUser);
      set({ user, status: "authenticated" });
      return user;
    } catch (e) {
      set({ status: "unauthenticated", error: e instanceof Error ? e.message : "Une erreur est survenue." });
      throw e;
    }
  },

  resetPin: async (identifier, password, newPin) => {
    set({ status: "loading", error: null });
    try {
      const response = await fetch("/api/auth/forgot-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password, newPin }),
      });
      const { user: sessionUser } = await parseJsonResponse<{ user: import("@/lib/auth/session").JeebtiSessionUser }>(
        response
      );
      const user = mapSessionUserToUser(sessionUser);
      set({ user, status: "authenticated" });
      return user;
    } catch (e) {
      set({ status: "unauthenticated", error: e instanceof Error ? e.message : "Une erreur est survenue." });
      throw e;
    }
  },

  signOut: async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    set({ user: null, status: "unauthenticated" });
  },

  updateUser: (patch) => {
    const current = get().user;
    if (!current) return;
    set({ user: { ...current, ...patch } });
  },

  clearError: () => set({ error: null }),
}));
