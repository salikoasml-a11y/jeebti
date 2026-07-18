"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useBankingStore } from "@/store/banking-store";
import { useAuthStore } from "@/store/auth-store";
import { useTranslation } from "@/hooks/use-translation";
import type { Card } from "@/lib/types";
import { formatDate } from "@/lib/format";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardFace } from "@/components/cards/card-face";
import { CopyIcon, EyeIcon, CheckIcon } from "lucide-react";

function CopyField({ label, value }: { label: string; value: string }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2">
      <div>
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="font-mono text-sm tabular-nums">{value}</p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={async () => {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          toast.success(t("cards.toast.copied"));
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
      </Button>
    </div>
  );
}

export function ViewDetailsDialog({
  card,
  open,
  onOpenChange,
}: {
  card: Card;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  const [revealed, setRevealed] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setRevealed(false);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("cards.details.title")}</DialogTitle>
          <DialogDescription>{t("cards.details.description")}</DialogDescription>
        </DialogHeader>

        <CardFace card={card} revealedNumber={revealed ? card.fullNumber : undefined} />

        {!revealed ? (
          <Button type="button" onClick={() => setRevealed(true)} className="gap-1.5">
            <EyeIcon className="size-4" />
            {t("cards.details.reveal")}
          </Button>
        ) : (
          <div className="grid gap-2">
            <CopyField label={t("cards.details.cardNumber")} value={card.fullNumber} />
            <div className="grid grid-cols-2 gap-2">
              <CopyField label={t("cards.details.expiry")} value={card.expiry} />
              <CopyField label={t("cards.details.cvv")} value={card.cvv} />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {t("action.close")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function SetLimitDialog({
  card,
  open,
  onOpenChange,
}: {
  card: Card;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  const setCardLimit = useBankingStore((s) => s.setCardLimit);
  const [limit, setLimit] = useState(String(card.spendingLimit));
  const [submitting, setSubmitting] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("cards.setLimit.title")}</DialogTitle>
          <DialogDescription>{t("cards.setLimit.description", { label: card.label })}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label htmlFor="limit">{t("cards.setLimit.monthlyLimit")}</Label>
          <Input
            id="limit"
            type="number"
            min={0}
            step={10}
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
          <input
            type="range"
            min={0}
            max={10000}
            step={50}
            value={Number(limit) || 0}
            onChange={(e) => setLimit(e.target.value)}
            className="accent-jeebti-brand"
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {t("action.cancel")}
          </Button>
          <Button
            type="button"
            disabled={submitting || !limit || Number(limit) < 0}
            onClick={async () => {
              setSubmitting(true);
              try {
                await setCardLimit(card.id, Number(limit));
                toast.success(t("cards.toast.limitUpdated"));
                onOpenChange(false);
              } catch (e) {
                toast.error(e instanceof Error ? e.message : t("cards.toast.error"));
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? t("cards.setLimit.saving") : t("cards.setLimit.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function CreateVirtualCardDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  const createVirtualCard = useBankingStore((s) => s.createVirtualCard);
  const [label, setLabel] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setLabel("");
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("cards.createVirtual.title")}</DialogTitle>
          <DialogDescription>{t("cards.createVirtual.description")}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label htmlFor="vc-label">{t("cards.createVirtual.label")}</Label>
          <Input
            id="vc-label"
            placeholder={t("cards.createVirtual.labelPlaceholder")}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {t("action.cancel")}
          </Button>
          <Button
            type="button"
            disabled={submitting || !label.trim()}
            onClick={async () => {
              setSubmitting(true);
              try {
                await createVirtualCard(label.trim());
                toast.success(t("cards.toast.virtualCardCreated"));
                onOpenChange(false);
                setLabel("");
              } catch (e) {
                toast.error(e instanceof Error ? e.message : t("cards.toast.error"));
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? t("cards.createVirtual.creating") : t("cards.createVirtual.create")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function RequestPhysicalCardDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  const requestPhysicalCard = useBankingStore((s) => s.requestPhysicalCard);
  const user = useAuthStore((s) => s.user);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setSuccess(false);
      }}
    >
      <DialogContent className="sm:max-w-sm">
        {!success ? (
          <>
            <DialogHeader>
              <DialogTitle>{t("cards.requestPhysical.title")}</DialogTitle>
              <DialogDescription>{t("cards.requestPhysical.description")}</DialogDescription>
            </DialogHeader>

            {user && (
              <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm">
                <p className="font-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-muted-foreground">{user.address.line1}</p>
                <p className="text-muted-foreground">
                  {user.address.city}, {user.address.postcode}
                </p>
                <p className="text-muted-foreground">{user.address.country}</p>
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {t("action.cancel")}
              </Button>
              <Button
                type="button"
                disabled={submitting}
                onClick={async () => {
                  setSubmitting(true);
                  try {
                    await requestPhysicalCard();
                    setSuccess(true);
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : t("cards.toast.error"));
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {submitting ? t("cards.requestPhysical.requesting") : t("cards.requestPhysical.confirmAddress")}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t("cards.requestPhysical.successTitle")}</DialogTitle>
              <DialogDescription>{t("cards.requestPhysical.successDescription")}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" onClick={() => onOpenChange(false)}>
                {t("action.done")}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

const EMPLOYMENT_OPTIONS = [
  { value: "employed", labelKey: "cards.applyCredit.employment.employed" },
  { value: "self-employed", labelKey: "cards.applyCredit.employment.selfEmployed" },
  { value: "student", labelKey: "cards.applyCredit.employment.student" },
  { value: "unemployed", labelKey: "cards.applyCredit.employment.unemployed" },
  { value: "retired", labelKey: "cards.applyCredit.employment.retired" },
] as const;

export function ApplyCreditCardDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  const applyForCreditCard = useBankingStore((s) => s.applyForCreditCard);
  const cards = useBankingStore((s) => s.cards);
  const [income, setIncome] = useState("");
  const [employment, setEmployment] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setIncome("");
    setEmployment("");
    setAgreed(false);
    setSuccess(false);
  };

  const newCard = success ? cards.find((c) => c.type === "credit") : undefined;

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) reset();
      }}
    >
      <DialogContent className="sm:max-w-md">
        {!success ? (
          <>
            <DialogHeader>
              <DialogTitle>{t("cards.applyCredit.title")}</DialogTitle>
              <DialogDescription>{t("cards.applyCredit.description")}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="income">{t("cards.applyCredit.income")}</Label>
                <Input
                  id="income"
                  type="number"
                  min={0}
                  placeholder={t("cards.applyCredit.incomePlaceholder")}
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="employment">{t("cards.applyCredit.employmentStatus")}</Label>
                <Select value={employment} onValueChange={setEmployment}>
                  <SelectTrigger id="employment" className="w-full">
                    <SelectValue placeholder={t("cards.applyCredit.selectStatus")} />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPLOYMENT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {t(opt.labelKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <label className="flex items-start gap-2 text-sm">
                <Checkbox
                  checked={agreed}
                  onCheckedChange={(c) => setAgreed(c === true)}
                  className="mt-0.5"
                />
                <span className="text-muted-foreground">{t("cards.applyCredit.agree")}</span>
              </label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {t("action.cancel")}
              </Button>
              <Button
                type="button"
                disabled={submitting || !income || !employment || !agreed}
                onClick={async () => {
                  setSubmitting(true);
                  try {
                    await applyForCreditCard();
                    setSuccess(true);
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : t("cards.toast.error"));
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {submitting ? t("cards.applyCredit.submitting") : t("cards.applyCredit.submit")}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t("cards.applyCredit.successTitle")}</DialogTitle>
              <DialogDescription>{t("cards.applyCredit.successDescription")}</DialogDescription>
            </DialogHeader>
            {newCard && <CardFace card={newCard} />}
            {newCard?.createdAt && (
              <p className="text-xs text-muted-foreground">
                {t("cards.applyCredit.appliedOn", { date: formatDate(newCard.createdAt) })}
              </p>
            )}
            <DialogFooter>
              <Button type="button" onClick={() => onOpenChange(false)}>
                {t("action.done")}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
