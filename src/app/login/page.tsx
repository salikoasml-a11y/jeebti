"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, ShieldCheck, User as UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { JeebtiLogo } from "@/components/marketing/jeebti-logo";
import { useAuthStore } from "@/store/auth-store";

const DEMO_CUSTOMER = { email: "amelia.clarke@example.com", password: "demo1234" };
const DEMO_ADMIN = { email: "admin@jeebti.com", password: "admin1234" };

export default function LoginPage() {
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState<"idle" | "form" | "customer" | "admin">("idle");
  const [resetSent, setResetSent] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  const performSignIn = async (
    targetEmail: string,
    targetPassword: string,
    mode: "form" | "customer" | "admin"
  ) => {
    setSubmitting(mode);
    try {
      await signIn(targetEmail, targetPassword);
      const user = useAuthStore.getState().user;
      toast.success(`Welcome back${user ? `, ${user.firstName}` : ""}!`);
      router.replace(user?.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting("idle");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }
    void performSignIn(email, password, "form");
  };

  const handleDemo = (which: "customer" | "admin") => {
    const creds = which === "customer" ? DEMO_CUSTOMER : DEMO_ADMIN;
    setEmail(creds.email);
    setPassword(creds.password);
    void performSignIn(creds.email, creds.password, which);
  };

  const isSubmitting = submitting !== "idle";

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,var(--jeebti-brand),transparent)] opacity-[0.14]"
      />

      <Link href="/" className="mb-8" aria-label="Jeebti home">
        <JeebtiLogo />
      </Link>

      <div className="w-full max-w-[420px] rounded-2xl border border-border bg-card p-6 shadow-xl shadow-black/5 sm:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Log in to Jeebti</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Welcome back — enter your details to continue.</p>
        </div>

        <form className="mt-7 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Dialog open={resetOpen} onOpenChange={setResetOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="text-xs font-medium text-jeebti-brand hover:underline"
                    onClick={() => setResetSent(false)}
                  >
                    Forgot password?
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Reset your password</DialogTitle>
                    <DialogDescription>
                      {resetSent
                        ? "Check your inbox — if an account exists for that email, a reset link is on its way."
                        : "Enter the email associated with your account and we'll send you a link to reset your password."}
                    </DialogDescription>
                  </DialogHeader>
                  {!resetSent ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="reset-email">Email</Label>
                        <Input id="reset-email" type="email" placeholder="you@example.com" defaultValue={email} />
                      </div>
                      <Button type="button" onClick={() => setResetSent(true)}>
                        Send reset link
                      </Button>
                    </div>
                  ) : (
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button variant="outline">Done</Button>
                      </DialogClose>
                    </DialogFooter>
                  )}
                </DialogContent>
              </Dialog>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                required
                className="pr-9"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-1 h-10" disabled={isSubmitting}>
            {submitting === "form" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Logging in…
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium text-muted-foreground">Quick demo access</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="flex flex-col gap-2.5">
          <Button
            type="button"
            variant="outline"
            className="h-10 justify-start gap-2.5"
            onClick={() => handleDemo("customer")}
            disabled={isSubmitting}
          >
            {submitting === "customer" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <UserIcon className="size-4 text-jeebti-brand" />
            )}
            Continue as Customer (demo)
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-10 justify-start gap-2.5"
            onClick={() => handleDemo("admin")}
            disabled={isSubmitting}
          >
            {submitting === "admin" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ShieldCheck className="size-4 text-jeebti-brand" />
            )}
            Continue as Admin (demo)
          </Button>
        </div>

        <p className="mt-7 text-center text-sm text-muted-foreground">
          New to Jeebti?{" "}
          <Link href="/signup" className="font-medium text-jeebti-brand hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
