"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useBankingStore } from "@/store/banking-store";
import { useAuthStore } from "@/store/auth-store";
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
          toast.success("Copied");
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
          <DialogTitle>Card details</DialogTitle>
          <DialogDescription>Sensitive details are hidden until you reveal them.</DialogDescription>
        </DialogHeader>

        <CardFace card={card} revealedNumber={revealed ? card.fullNumber : undefined} />

        {!revealed ? (
          <Button type="button" onClick={() => setRevealed(true)} className="gap-1.5">
            <EyeIcon className="size-4" />
            Reveal card details
          </Button>
        ) : (
          <div className="grid gap-2">
            <CopyField label="Card number" value={card.fullNumber} />
            <div className="grid grid-cols-2 gap-2">
              <CopyField label="Expiry" value={card.expiry} />
              <CopyField label="CVV" value={card.cvv} />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
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
  const setCardLimit = useBankingStore((s) => s.setCardLimit);
  const [limit, setLimit] = useState(String(card.spendingLimit));
  const [submitting, setSubmitting] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Set spending limit</DialogTitle>
          <DialogDescription>Monthly limit for {card.label}.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label htmlFor="limit">Monthly limit</Label>
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
            Cancel
          </Button>
          <Button
            type="button"
            disabled={submitting || !limit || Number(limit) < 0}
            onClick={async () => {
              setSubmitting(true);
              try {
                await setCardLimit(card.id, Number(limit));
                toast.success("Spending limit updated");
                onOpenChange(false);
              } catch (e) {
                toast.error(e instanceof Error ? e.message : "Something went wrong");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? "Saving..." : "Save limit"}
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
          <DialogTitle>Create virtual card</DialogTitle>
          <DialogDescription>Instantly issue a new virtual card for online spending.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label htmlFor="vc-label">Card label</Label>
          <Input
            id="vc-label"
            placeholder="e.g. Subscriptions"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={submitting || !label.trim()}
            onClick={async () => {
              setSubmitting(true);
              try {
                await createVirtualCard(label.trim());
                toast.success("Virtual card created");
                onOpenChange(false);
                setLabel("");
              } catch (e) {
                toast.error(e instanceof Error ? e.message : "Something went wrong");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? "Creating..." : "Create card"}
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
              <DialogTitle>Request physical card</DialogTitle>
              <DialogDescription>Confirm your delivery address below.</DialogDescription>
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
                Cancel
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
                    toast.error(e instanceof Error ? e.message : "Something went wrong");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {submitting ? "Requesting..." : "Confirm address"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Card on the way</DialogTitle>
              <DialogDescription>
                Your new physical card has been ordered and will arrive by post within 5-7 working days.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" onClick={() => onOpenChange(false)}>
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

const EMPLOYMENT_OPTIONS = [
  { value: "employed", label: "Employed" },
  { value: "self-employed", label: "Self-employed" },
  { value: "student", label: "Student" },
  { value: "unemployed", label: "Unemployed" },
  { value: "retired", label: "Retired" },
];

export function ApplyCreditCardDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
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
              <DialogTitle>Apply for a credit card</DialogTitle>
              <DialogDescription>
                Tell us a bit about your finances so we can review your application.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="income">Estimated annual income</Label>
                <Input
                  id="income"
                  type="number"
                  min={0}
                  placeholder="e.g. 35000"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="employment">Employment status</Label>
                <Select value={employment} onValueChange={setEmployment}>
                  <SelectTrigger id="employment" className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPLOYMENT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
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
                <span className="text-muted-foreground">
                  I agree to the credit card terms and conditions and consent to a credit check.
                </span>
              </label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
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
                    toast.error(e instanceof Error ? e.message : "Something went wrong");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {submitting ? "Submitting..." : "Submit application"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Application submitted</DialogTitle>
              <DialogDescription>
                Your credit card application is pending review. We&apos;ll notify you once it&apos;s approved.
              </DialogDescription>
            </DialogHeader>
            {newCard && <CardFace card={newCard} />}
            {newCard?.createdAt && (
              <p className="text-xs text-muted-foreground">Applied on {formatDate(newCard.createdAt)}</p>
            )}
            <DialogFooter>
              <Button type="button" onClick={() => onOpenChange(false)}>
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
