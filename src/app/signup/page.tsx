"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, Phone, Mail, AtSign, Lock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthShell } from "@/components/auth/auth-shell";
import { PinInput } from "@/components/auth/pin-input";
import { useAuthStore } from "@/store/auth-store";
import { useTranslation } from "@/hooks/use-translation";

const PHONE_PATTERN = /^\+?[0-9]{7,15}$/;

function FieldRow({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 border-b-2 border-jeebti-navy/20 pb-2 focus-within:border-jeebti-gold dark:border-white/20">
      <Icon className="size-5 shrink-0 text-jeebti-navy/60 dark:text-white/50" />
      {children}
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const signUp = useAuthStore((s) => s.signUp);
  const { t } = useTranslation();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function validate(): string | null {
    if (fullName.trim().length < 2) return t("signup.error.name");
    if (!PHONE_PATTERN.test(phone.trim())) return t("signup.error.phone");
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return t("signup.error.email");
    if (username.trim() && !/^[a-zA-Z0-9_.]{3,20}$/.test(username.trim())) return t("signup.error.username");
    if (password.length < 8) return t("signup.error.passwordLength");
    if (password !== confirmPassword) return t("signup.error.passwordMatch");
    if (pin.length !== 4) return t("signup.error.pinLength");
    if (pin !== confirmPin) return t("signup.error.pinMatch");
    if (!agreed) return t("signup.error.terms");
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    setSubmitting(true);
    try {
      const user = await signUp({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        username: username.trim() || undefined,
        password,
        pin,
      });
      toast.success(`${t("signup.welcome")} ${user.firstName}!`);
      router.push("/dashboard");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("error.generic"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      footer={
        <>
          {t("signup.alreadyHaveAccount")}{" "}
          <Link href="/login" className="font-semibold text-jeebti-navy underline dark:text-jeebti-gold-light">
            {t("signup.logIn")}
          </Link>
        </>
      }
    >
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold text-foreground">{t("signup.heading")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("signup.subheading")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName">{t("signup.fullName")}</Label>
          <FieldRow icon={User}>
            <input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Amadou Ba"
              autoComplete="name"
              className="w-full border-0 bg-transparent p-0 text-base text-foreground outline-none placeholder:text-muted-foreground"
              required
            />
          </FieldRow>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t("signup.phone")}</Label>
          <FieldRow icon={Phone}>
            <input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+222 XX XX XX XX"
              autoComplete="tel"
              className="w-full border-0 bg-transparent p-0 text-base text-foreground outline-none placeholder:text-muted-foreground"
              required
            />
          </FieldRow>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">{t("signup.emailOptional")}</Label>
            <FieldRow icon={Mail}>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full border-0 bg-transparent p-0 text-base text-foreground outline-none"
              />
            </FieldRow>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">{t("signup.usernameOptional")}</Label>
            <FieldRow icon={AtSign}>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="w-full border-0 bg-transparent p-0 text-base text-foreground outline-none"
              />
            </FieldRow>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="password">{t("signup.password")}</Label>
            <FieldRow icon={Lock}>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full border-0 bg-transparent p-0 text-base text-foreground outline-none"
                required
              />
            </FieldRow>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("signup.confirmPassword")}</Label>
            <FieldRow icon={Lock}>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full border-0 bg-transparent p-0 text-base text-foreground outline-none"
                required
              />
            </FieldRow>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>{t("signup.pin")}</Label>
            <PinInput value={pin} onChange={setPin} aria-label={t("signup.pin")} />
          </div>
          <div className="space-y-2">
            <Label>{t("signup.confirmPin")}</Label>
            <PinInput value={confirmPin} onChange={setConfirmPin} aria-label={t("signup.confirmPin")} />
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Checkbox id="agree" checked={agreed} onCheckedChange={(c) => setAgreed(c === true)} className="mt-0.5" />
          <Label htmlFor="agree" className="text-sm font-normal leading-snug text-muted-foreground">
            {t("signup.agreePrefix")} <TermsDialog /> {t("signup.and")} <PrivacyDialog />.
          </Label>
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="h-12 w-full rounded-xl bg-jeebti-gold text-base font-bold text-jeebti-navy shadow-md hover:bg-jeebti-gold-light"
        >
          {submitting ? t("signup.submitting") : t("signup.submit")}
        </Button>
      </form>
    </AuthShell>
  );
}

function TermsDialog() {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="font-semibold text-jeebti-navy underline dark:text-jeebti-gold-light">
          {t("signup.terms")}
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("terms.title")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>{t("terms.body1")}</p>
          <p>{t("terms.body2")}</p>
          <p>{t("terms.body3")}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PrivacyDialog() {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="font-semibold text-jeebti-navy underline dark:text-jeebti-gold-light">
          {t("signup.privacy")}
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("privacy.title")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>{t("privacy.body1")}</p>
          <p>{t("privacy.body2")}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
