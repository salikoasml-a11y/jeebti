import { create } from "zustand";
import type { User } from "@/lib/types";
import { authProvider } from "@/lib/auth/mock-auth-provider";

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
  error: string | null;
  init: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (input: { firstName: string; lastName: string; email: string; phone: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (patch: Partial<User>) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  status: "idle",
  error: null,

  init: async () => {
    if (get().status !== "idle") return;
    set({ status: "loading" });
    const user = await authProvider.getSession();
    set({ user, status: user ? "authenticated" : "unauthenticated" });
  },

  signIn: async (email, password) => {
    set({ status: "loading", error: null });
    try {
      const user = await authProvider.signIn(email, password);
      set({ user, status: "authenticated" });
    } catch (e) {
      set({ status: "unauthenticated", error: e instanceof Error ? e.message : "Something went wrong" });
      throw e;
    }
  },

  signUp: async (input) => {
    set({ status: "loading", error: null });
    try {
      const user = await authProvider.signUp(input);
      set({ user, status: "authenticated" });
    } catch (e) {
      set({ status: "unauthenticated", error: e instanceof Error ? e.message : "Something went wrong" });
      throw e;
    }
  },

  signOut: async () => {
    await authProvider.signOut();
    set({ user: null, status: "unauthenticated" });
  },

  updateUser: (patch) => {
    const current = get().user;
    if (!current) return;
    set({ user: { ...current, ...patch } });
  },

  clearError: () => set({ error: null }),
}));
