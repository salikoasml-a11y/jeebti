"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useBankingStore } from "@/store/banking-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/hooks/use-translation";

const FUNDING_SOURCE_IDS = ["debit-4242", "debit-7731", "bank-transfer"] as const;
type FundingSourceId = (typeof FUNDING_SOURCE_IDS)[number];

export function TopUpDialog({ trigger }: { trigger: React.ReactNode }) {
  const { t } = useTranslation();
  const topUp = useBankingStore((s) => s.topUp);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState<FundingSourceId>(FUNDING_SOURCE_IDS[0]);
  const [submitting, setSubmitting] = useState(false);

  const fundingSourceLabel = (id: FundingSourceId) => {
    switch (id) {
      case "debit-4242":
        return t("wallet.topup.source.debitCard", { digits: "4242" });
      case "debit-7731":
        return t("wallet.topup.source.debitCard", { digits: "7731" });
      case "bank-transfer":
        return t("wallet.topup.source.bankTransfer");
    }
  };

  const reset = () => {
    setAmount("");
    setSource(FUNDING_SOURCE_IDS[0]);
  };

  const handleSubmit = async () => {
    const value = Number(amount);
    if (!value || value <= 0) {
      toast.error(t("wallet.topup.errorAmount"));
      return;
    }
    setSubmitting(true);
    try {
      await topUp(value, fundingSourceLabel(source));
      toast.success(t("wallet.topup.successToast", { amount: `£${value.toFixed(2)}` }));
      setOpen(false);
      reset();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("wallet.topup.errorGeneric"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("wallet.topup.title")}</DialogTitle>
          <DialogDescription>{t("wallet.topup.description")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="topup-amount">{t("wallet.topup.amountLabel")}</Label>
            <Input
              id="topup-amount"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="topup-source">{t("wallet.topup.fundingSourceLabel")}</Label>
            <Select value={source} onValueChange={(v) => setSource(v as FundingSourceId)}>
              <SelectTrigger id="topup-source" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FUNDING_SOURCE_IDS.map((id) => (
                  <SelectItem key={id} value={id}>
                    {fundingSourceLabel(id)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? t("wallet.topup.submitting") : t("wallet.topup.title")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
