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

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(errorCodeToMessage(body?.code));
  }
  return body as T;
}

function errorCodeToMessage(code: string | undefined): string {
  switch (code) {
    case "invalid_credentials":
      return "Numéro, nom d'utilisateur ou code PIN incorrect.";
    case "account_locked":
      return "Compte temporairement verrouillé suite à plusieurs tentatives. Réessayez dans 15 minutes.";
    case "phone_taken":
      return "Ce numéro de téléphone est déjà utilisé.";
    case "email_taken":
      return "Cette adresse e-mail est déjà utilisée.";
    case "username_taken":
      return "Ce nom d'utilisateur est déjà pris.";
    case "invalid_phone":
      return "Numéro de téléphone invalide.";
    case "weak_password":
      return "Le mot de passe doit contenir au moins 8 caractères.";
    case "invalid_pin":
      return "Le code PIN doit contenir exactement 4 chiffres.";
    case "invalid_full_name":
      return "Veuillez indiquer votre nom complet.";
    case "invalid_request":
      return "Formulaire incomplet.";
    default:
      return "Une erreur est survenue. Veuillez réessayer.";
  }
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
