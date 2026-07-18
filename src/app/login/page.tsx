"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CircleUserRound, Lock, KeyRound } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AuthShell } from "@/components/auth/auth-shell";
import { PinInput } from "@/components/auth/pin-input";
import { ForgotPinDialog } from "@/components/auth/forgot-pin-dialog";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithPin, signInWithPassword } = useAuthStore();

  const [mode, setMode] = useState<"pin" | "password">("pin");
  const [identifier, setIdentifier] = useState("");
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!identifier.trim()) {
      toast.error("Veuillez indiquer votre nom d'utilisateur ou numéro de téléphone.");
      return;
    }
    if (mode === "pin" && pin.length !== 4) {
      toast.error("Le code PIN doit contenir 4 chiffres.");
      return;
    }
    if (mode === "password" && password.length < 8) {
      toast.error("Mot de passe invalide.");
      return;
    }

    setSubmitting(true);
    try {
      const user =
        mode === "pin" ? await signInWithPin(identifier, pin) : await signInWithPassword(identifier, password);
      toast.success(`Bon retour, ${user.firstName} !`);
      router.push(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Une erreur est survenue.");
      setPin("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      footer={
        <>
          Nouvel utilisateur ?{" "}
          <Link href="/signup" className="font-semibold text-jeebti-navy underline dark:text-jeebti-gold-light">
            S&apos;inscrire maintenant
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="identifier" className="text-sm font-medium text-foreground">
            Nom d&apos;utilisateur ou numéro de téléphone
          </Label>
          <div className="flex items-center gap-3 border-b-2 border-jeebti-navy/20 pb-2 focus-within:border-jeebti-gold dark:border-white/20">
            <CircleUserRound className="size-5 shrink-0 text-jeebti-navy/60 dark:text-white/50" />
            <input
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="+222 XX XX XX XX"
              autoComplete="username"
              className="w-full border-0 bg-transparent p-0 text-base text-foreground outline-none placeholder:text-muted-foreground"
              required
            />
          </div>
        </div>

        {mode === "pin" ? (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Lock className="size-5 shrink-0 text-jeebti-navy/60 dark:text-white/50" />
              <Label className="text-sm font-medium text-foreground">Code PIN</Label>
            </div>
            <PinInput value={pin} onChange={setPin} className="px-8" />
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Mot de passe
            </Label>
            <div className="flex items-center gap-3 border-b-2 border-jeebti-navy/20 pb-2 focus-within:border-jeebti-gold dark:border-white/20">
              <Lock className="size-5 shrink-0 text-jeebti-navy/60 dark:text-white/50" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full border-0 bg-transparent p-0 text-base text-foreground outline-none"
                required
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => setMode((m) => (m === "pin" ? "password" : "pin"))}
            className="flex items-center gap-1.5 font-medium text-jeebti-navy underline underline-offset-2 dark:text-jeebti-gold-light"
          >
            <KeyRound className="size-3.5" />
            {mode === "pin" ? "Mot de passe" : "Code PIN"}
          </button>
          {mode === "pin" && (
            <ForgotPinDialog
              trigger={
                <button
                  type="button"
                  className="font-medium text-jeebti-navy underline underline-offset-2 dark:text-jeebti-gold-light"
                >
                  Code PIN oublié ?
                </button>
              }
            />
          )}
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="h-12 w-full rounded-xl bg-jeebti-gold text-base font-bold text-jeebti-navy shadow-md hover:bg-jeebti-gold-light"
        >
          {submitting ? "Connexion…" : "Se connecter"}
        </Button>
      </form>
    </AuthShell>
  );
}
