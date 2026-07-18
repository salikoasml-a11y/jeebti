"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PinInput } from "@/components/auth/pin-input";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

export function ForgotPinDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const resetPin = useAuthStore((s) => s.resetPin);
  const router = useRouter();

  function reset() {
    setIdentifier("");
    setPassword("");
    setNewPin("");
    setConfirmPin("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPin.length !== 4 || confirmPin.length !== 4) {
      toast.error("Le code PIN doit contenir 4 chiffres.");
      return;
    }
    if (newPin !== confirmPin) {
      toast.error("Les codes PIN ne correspondent pas.");
      return;
    }
    setSubmitting(true);
    try {
      await resetPin(identifier, password, newPin);
      toast.success("Votre code PIN a été réinitialisé.");
      setOpen(false);
      reset();
      router.push("/dashboard");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Code PIN oublié ?</DialogTitle>
          <DialogDescription>
            Confirmez votre identité avec votre mot de passe pour définir un nouveau code PIN.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fp-identifier">Nom d&apos;utilisateur ou numéro de téléphone</Label>
            <Input
              id="fp-identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="+222 XX XX XX XX"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fp-password">Mot de passe</Label>
            <Input
              id="fp-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Nouveau code PIN</Label>
            <PinInput value={newPin} onChange={setNewPin} aria-label="Nouveau code PIN" />
          </div>
          <div className="space-y-2">
            <Label>Confirmer le code PIN</Label>
            <PinInput value={confirmPin} onChange={setConfirmPin} aria-label="Confirmer le code PIN" />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-jeebti-gold text-jeebti-navy hover:bg-jeebti-gold-light"
            >
              {submitting ? "Validation…" : "Réinitialiser le code PIN"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
