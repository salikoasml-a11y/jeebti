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
import { useTranslation } from "@/hooks/use-translation";
import { authErrorMessage } from "@/lib/auth/error-messages";

export function ForgotPinDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const resetPin = useAuthStore((s) => s.resetPin);
  const router = useRouter();
  const { t } = useTranslation();

  function reset() {
    setIdentifier("");
    setPassword("");
    setNewPin("");
    setConfirmPin("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPin.length !== 4 || confirmPin.length !== 4) {
      toast.error(t("forgotPin.invalidLength"));
      return;
    }
    if (newPin !== confirmPin) {
      toast.error(t("forgotPin.mismatch"));
      return;
    }
    setSubmitting(true);
    try {
      await resetPin(identifier, password, newPin);
      toast.success(t("forgotPin.success"));
      setOpen(false);
      reset();
      router.push("/dashboard");
    } catch (e) {
      toast.error(e instanceof Error ? authErrorMessage(e.message, t) : t("error.generic"));
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
          <DialogTitle>{t("forgotPin.title")}</DialogTitle>
          <DialogDescription>{t("forgotPin.description")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fp-identifier">{t("login.identifierLabel")}</Label>
            <Input
              id="fp-identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="+222 XX XX XX XX"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fp-password">{t("login.passwordLabel")}</Label>
            <Input
              id="fp-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>{t("forgotPin.newPin")}</Label>
            <PinInput value={newPin} onChange={setNewPin} aria-label={t("forgotPin.newPin")} />
          </div>
          <div className="space-y-2">
            <Label>{t("forgotPin.confirmPin")}</Label>
            <PinInput value={confirmPin} onChange={setConfirmPin} aria-label={t("forgotPin.confirmPin")} />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-jeebti-gold text-jeebti-navy hover:bg-jeebti-gold-light"
            >
              {submitting ? t("forgotPin.submitting") : t("forgotPin.submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
