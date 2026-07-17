"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { JeebtiLogo } from "@/components/marketing/jeebti-logo";
import { useAuthStore } from "@/store/auth-store";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\-\s\d]{7,20}$/;

export default function SignupPage() {
  const router = useRouter();
  const signUp = useAuthStore((s) => s.signUp);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [legalDialog, setLegalDialog] = useState<"terms" | "privacy" | null>(null);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!firstName.trim()) next.firstName = "First name is required.";
    if (!lastName.trim()) next.lastName = "Last name is required.";
    if (!email.trim() || !emailPattern.test(email)) next.email = "Enter a valid email address.";
    if (!phone.trim() || !phonePattern.test(phone)) next.phone = "Enter a valid phone number.";
    if (password.length < 8) next.password = "Password must be at least 8 characters.";
    if (confirmPassword !== password) next.confirmPassword = "Passwords do not match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!agreed) {
      toast.error("Please agree to the Terms & Privacy Policy to continue.");
      return;
    }
    setSubmitting(true);
    try {
      await signUp({ firstName, lastName, email, phone, password });
      toast.success("Account created — welcome to Jeebti!");
      router.replace("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,var(--jeebti-brand),transparent)] opacity-[0.14]"
      />

      <Link href="/" className="mb-8" aria-label="Jeebti home">
        <JeebtiLogo />
      </Link>

      <div className="w-full max-w-[460px] rounded-2xl border border-border bg-card p-6 shadow-xl shadow-black/5 sm:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Banking Made Simple — join in under two minutes.</p>
        </div>

        <form className="mt-7 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                autoComplete="given-name"
                placeholder="Amelia"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={submitting}
                aria-invalid={!!errors.firstName}
              />
              {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                autoComplete="family-name"
                placeholder="Clarke"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={submitting}
                aria-invalid={!!errors.lastName}
              />
              {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+44 7700 900123"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={submitting}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}
                aria-invalid={!!errors.password}
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
            {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={submitting}
                aria-invalid={!!errors.confirmPassword}
                className="pr-9"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-muted-foreground hover:text-foreground"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              disabled={submitting}
              className="mt-0.5"
            />
            <Label htmlFor="agree" className="text-sm font-normal text-muted-foreground">
              I agree to the{" "}
              <button
                type="button"
                className="font-medium text-jeebti-brand hover:underline"
                onClick={() => setLegalDialog("terms")}
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                className="font-medium text-jeebti-brand hover:underline"
                onClick={() => setLegalDialog("privacy")}
              >
                Privacy Policy
              </button>
              .
            </Label>
          </div>

          <Button type="submit" size="lg" className="mt-1 h-10" disabled={submitting || !agreed}>
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating account…
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-jeebti-brand hover:underline">
            Log in
          </Link>
        </p>
      </div>

      <Dialog open={legalDialog !== null} onOpenChange={(open) => !open && setLegalDialog(null)}>
        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{legalDialog === "terms" ? "Terms of Service" : "Privacy Policy"}</DialogTitle>
            <DialogDescription>Last updated 1 July 2026</DialogDescription>
          </DialogHeader>
          {legalDialog === "terms" ? (
            <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                By creating a Jeebti account, you agree to use the service in accordance with applicable law and
                these terms. Jeebti provides account, payment, and card services via a licensed banking partner;
                Jeebti itself is not a bank.
              </p>
              <p>
                You are responsible for keeping your login credentials, PIN, and two-factor authentication methods
                confidential. You must notify us immediately of any unauthorized use of your account.
              </p>
              <p>
                Fees, limits, and available features may vary and will be disclosed within the app before you
                confirm a transaction. We may suspend or close accounts found to be in breach of these terms or
                relevant financial regulations.
              </p>
              <p>
                These terms may be updated from time to time; continued use of Jeebti after changes take effect
                constitutes acceptance of the revised terms.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                We collect the personal and financial information necessary to open and operate your account,
                including your name, contact details, date of birth, and transaction activity.
              </p>
              <p>
                Your data is encrypted in transit and at rest, and is only shared with our licensed banking
                partner, regulators, and service providers as needed to deliver Jeebti&apos;s services or comply
                with the law.
              </p>
              <p>
                We use your data to prevent fraud, personalize your experience, and meet our regulatory
                obligations. We do not sell your personal data to third parties.
              </p>
              <p>
                You can request a copy of your data or ask us to delete it, subject to our regulatory
                record-keeping requirements, at any time from your account settings.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
