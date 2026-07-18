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
    if (fullName.trim().length < 2) return "Veuillez indiquer votre nom complet.";
    if (!PHONE_PATTERN.test(phone.trim())) return "Numéro de téléphone invalide.";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Adresse e-mail invalide.";
    if (username.trim() && !/^[a-zA-Z0-9_.]{3,20}$/.test(username.trim()))
      return "Le nom d'utilisateur doit contenir entre 3 et 20 caractères (lettres, chiffres, _ ou .).";
    if (password.length < 8) return "Le mot de passe doit contenir au moins 8 caractères.";
    if (password !== confirmPassword) return "Les mots de passe ne correspondent pas.";
    if (pin.length !== 4) return "Le code PIN doit contenir 4 chiffres.";
    if (pin !== confirmPin) return "Les codes PIN ne correspondent pas.";
    if (!agreed) return "Veuillez accepter les conditions générales.";
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
      toast.success(`Bienvenue chez Jeebti, ${user.firstName} !`);
      router.push("/dashboard");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      footer={
        <>
          Déjà un compte ?{" "}
          <Link href="/login" className="font-semibold text-jeebti-navy underline dark:text-jeebti-gold-light">
            Se connecter
          </Link>
        </>
      }
    >
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold text-foreground">Créer un compte Jeebti</h1>
        <p className="mt-1 text-sm text-muted-foreground">Ouvrez votre compte en quelques minutes.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nom complet</Label>
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
          <Label htmlFor="phone">Numéro de téléphone</Label>
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
            <Label htmlFor="email">E-mail (optionnel)</Label>
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
            <Label htmlFor="username">Nom d&apos;utilisateur (optionnel)</Label>
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
            <Label htmlFor="password">Mot de passe</Label>
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
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
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
            <Label>Code PIN (4 chiffres)</Label>
            <PinInput value={pin} onChange={setPin} aria-label="Code PIN" />
          </div>
          <div className="space-y-2">
            <Label>Confirmer le code PIN</Label>
            <PinInput value={confirmPin} onChange={setConfirmPin} aria-label="Confirmer le code PIN" />
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Checkbox id="agree" checked={agreed} onCheckedChange={(c) => setAgreed(c === true)} className="mt-0.5" />
          <Label htmlFor="agree" className="text-sm font-normal leading-snug text-muted-foreground">
            J&apos;accepte les{" "}
            <TermsDialog />{" "}
            et la{" "}
            <PrivacyDialog /> de Jeebti.
          </Label>
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="h-12 w-full rounded-xl bg-jeebti-gold text-base font-bold text-jeebti-navy shadow-md hover:bg-jeebti-gold-light"
        >
          {submitting ? "Création du compte…" : "Créer mon compte"}
        </Button>
      </form>
    </AuthShell>
  );
}

function TermsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="font-semibold text-jeebti-navy underline dark:text-jeebti-gold-light">
          conditions générales
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Conditions générales d&apos;utilisation</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            En créant un compte Jeebti, vous acceptez d&apos;utiliser le service de manière conforme à la
            réglementation en vigueur, de fournir des informations exactes lors de votre inscription, et de
            protéger la confidentialité de votre code PIN et de votre mot de passe.
          </p>
          <p>
            Jeebti se réserve le droit de suspendre tout compte présentant une activité frauduleuse ou une
            violation de ces conditions. Les frais applicables à chaque service sont communiqués avant toute
            transaction.
          </p>
          <p>
            Jeebti opère via un partenaire bancaire agréé et n&apos;est pas elle-même une banque. Les fonds
            déposés sont protégés conformément à la réglementation applicable.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PrivacyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="font-semibold text-jeebti-navy underline dark:text-jeebti-gold-light">
          politique de confidentialité
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Politique de confidentialité</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            Vos données personnelles (nom, téléphone, e-mail) sont stockées de manière chiffrée et ne sont
            utilisées que pour fournir les services Jeebti et prévenir la fraude. Votre mot de passe et votre
            code PIN sont hachés et ne sont jamais stockés en clair.
          </p>
          <p>
            Nous ne partageons vos informations avec des tiers que lorsque la loi l&apos;exige ou avec votre
            consentement explicite. Vous pouvez demander la suppression de votre compte à tout moment depuis les
            paramètres.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
