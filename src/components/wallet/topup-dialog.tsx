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

const FUNDING_SOURCES = [
  "Debit card ending 4242",
  "Debit card ending 7731",
  "Bank transfer",
];

export function TopUpDialog({ trigger }: { trigger: React.ReactNode }) {
  const topUp = useBankingStore((s) => s.topUp);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState(FUNDING_SOURCES[0]);
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setAmount("");
    setSource(FUNDING_SOURCES[0]);
  };

  const handleSubmit = async () => {
    const value = Number(amount);
    if (!value || value <= 0) {
      toast.error("Enter an amount greater than zero");
      return;
    }
    setSubmitting(true);
    try {
      await topUp(value, source);
      toast.success(`Topped up £${value.toFixed(2)}`);
      setOpen(false);
      reset();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Top up failed");
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
          <DialogTitle>Top up</DialogTitle>
          <DialogDescription>Add money to your current account.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="topup-amount">Amount</Label>
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
            <Label htmlFor="topup-source">Funding source</Label>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger id="topup-source" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FUNDING_SOURCES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Adding money…" : "Top up"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
