"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useBankingStore } from "@/store/banking-store";
import { useTranslation } from "@/hooks/use-translation";
import type { Contact } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ContactPicker } from "@/components/payments/contact-picker";
import { initials } from "@/lib/format";
import {
  ArrowLeftIcon,
  CheckCircle2Icon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";

type Recipient = {
  name: string;
  accountNumber: string;
  sortCode: string;
  bankName?: string;
  isJeebtiUser?: boolean;
};

type Step = "recipient" | "amount" | "review" | "success";

export default function SendMoneyPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const contacts = useBankingStore((s) => s.contacts);
  const sendMoney = useBankingStore((s) => s.sendMoney);
  const primaryAccount = useBankingStore((s) => s.primaryAccount);

  const [step, setStep] = useState<Step>("recipient");
  const [payNew, setPayNew] = useState(false);
  const [recipient, setRecipient] = useState<Recipient | null>(null);

  const [newName, setNewName] = useState("");
  const [newAccountNumber, setNewAccountNumber] = useState("");
  const [newSortCode, setNewSortCode] = useState("");

  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [amountError, setAmountError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [newBalance, setNewBalance] = useState<number | null>(null);

  const account = primaryAccount();

  function selectContact(contact: Contact) {
    setRecipient({
      name: contact.name,
      accountNumber: contact.accountNumber ?? "00000000",
      sortCode: contact.sortCode ?? "00-00-00",
      bankName: contact.bankName,
      isJeebtiUser: contact.isJeebtiUser,
    });
    setStep("amount");
  }

  function confirmNewRecipient() {
    if (!newName.trim() || !newAccountNumber.trim() || !newSortCode.trim()) return;
    setRecipient({
      name: newName.trim(),
      accountNumber: newAccountNumber.trim(),
      sortCode: newSortCode.trim(),
    });
    setStep("amount");
  }

  function validateAmount(): boolean {
    const value = Number(amount);
    if (!amount || Number.isNaN(value) || value <= 0) {
      setAmountError(t("payments.send.amount.error.invalid"));
      return false;
    }
    if (account && value > account.availableBalance) {
      setAmountError(t("payments.send.amount.error.exceedsBalance"));
      return false;
    }
    setAmountError(null);
    return true;
  }

  async function handleConfirm() {
    if (!recipient) return;
    setSubmitting(true);
    try {
      const tx = await sendMoney({
        toAccountNumber: recipient.accountNumber,
        toSortCode: recipient.sortCode,
        toName: recipient.name,
        amount: Number(amount),
        reference: reference || undefined,
      });
      const updated = useBankingStore.getState().primaryAccount();
      setNewBalance(updated?.balance ?? null);
      void tx;
      setStep("success");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("payments.send.toast.error"));
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setStep("recipient");
    setPayNew(false);
    setRecipient(null);
    setNewName("");
    setNewAccountNumber("");
    setNewSortCode("");
    setAmount("");
    setReference("");
    setAmountError(null);
    setNewBalance(null);
  }

  return (
    <div>
      <PageHeader title={t("payments.send.page.title")} description={t("payments.send.page.description")} />

      <div className="mx-auto max-w-lg px-4 pb-10 sm:px-6">
        {step === "recipient" && (
          <div className="space-y-4">
            <div className="flex rounded-lg border border-border p-1">
              <button
                type="button"
                onClick={() => setPayNew(false)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-sm font-medium transition-colors ${
                  !payNew ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                <UsersIcon className="size-3.5" />
                {t("payments.send.tab.contacts")}
              </button>
              <button
                type="button"
                onClick={() => setPayNew(true)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-sm font-medium transition-colors ${
                  payNew ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                <UserPlusIcon className="size-3.5" />
                {t("payments.send.tab.payNew")}
              </button>
            </div>

            {!payNew ? (
              <ContactPicker contacts={contacts} onSelect={selectContact} />
            ) : (
              <div className="grid gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="new-name">{t("payments.send.newRecipient.name")}</Label>
                  <Input id="new-name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="new-account">{t("payments.send.newRecipient.accountNumber")}</Label>
                    <Input
                      id="new-account"
                      value={newAccountNumber}
                      onChange={(e) => setNewAccountNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-sortcode">{t("payments.send.newRecipient.sortCode")}</Label>
                    <Input id="new-sortcode" value={newSortCode} onChange={(e) => setNewSortCode(e.target.value)} />
                  </div>
                </div>
                <Button
                  type="button"
                  className="mt-1"
                  disabled={!newName.trim() || !newAccountNumber.trim() || !newSortCode.trim()}
                  onClick={confirmNewRecipient}
                >
                  {t("payments.send.newRecipient.continue")}
                </Button>
              </div>
            )}
          </div>
        )}

        {step === "amount" && recipient && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setStep("recipient")}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeftIcon className="size-3.5 rtl:rotate-180" />
              {t("payments.send.back")}
            </button>

            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <Avatar>
                <AvatarFallback>{initials(recipient.name.split(" ")[0] ?? "", recipient.name.split(" ")[1] ?? "")}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{recipient.name}</p>
                <p className="text-xs text-muted-foreground">
                  {recipient.sortCode} · {recipient.accountNumber}
                </p>
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="amount">{t("payments.send.amount.label")}</Label>
                {account && (
                  <span className="text-xs text-muted-foreground">
                    {t("payments.send.amount.available", {
                      amount: formatCurrency(account.availableBalance, account.currency),
                    })}
                  </span>
                )}
              </div>
              <Input
                id="amount"
                type="number"
                min={0}
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setAmountError(null);
                }}
              />
              {amountError && <p className="text-xs text-destructive">{amountError}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="reference">{t("payments.send.amount.reference")}</Label>
              <Textarea
                id="reference"
                rows={2}
                placeholder={t("payments.send.amount.referencePlaceholder")}
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </div>

            <Button
              type="button"
              className="w-full"
              onClick={() => {
                if (validateAmount()) setStep("review");
              }}
            >
              {t("payments.send.amount.continue")}
            </Button>
          </div>
        )}

        {step === "review" && recipient && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setStep("amount")}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeftIcon className="size-3.5 rtl:rotate-180" />
              {t("payments.send.back")}
            </button>

            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <p className="text-xs text-muted-foreground">{t("payments.send.review.sending")}</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums">{formatCurrency(Number(amount))}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("payments.send.review.to", { name: recipient.name })}</p>
            </div>

            <div className="grid gap-2 rounded-lg border border-border p-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("payments.send.review.recipient")}</span>
                <span>{recipient.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("payments.send.review.sortCodeAccount")}</span>
                <span>
                  {recipient.sortCode} · {recipient.accountNumber}
                </span>
              </div>
              {reference && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("payments.send.review.reference")}</span>
                  <span>{reference}</span>
                </div>
              )}
              <div className="flex justify-between font-medium">
                <span className="text-muted-foreground">{t("payments.send.review.amount")}</span>
                <span>{formatCurrency(Number(amount))}</span>
              </div>
            </div>

            <Button type="button" className="w-full" disabled={submitting} onClick={handleConfirm}>
              {submitting ? t("payments.send.review.sending2") : t("payments.send.review.confirmAndSend")}
            </Button>
          </div>
        )}

        {step === "success" && recipient && (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2Icon className="size-8" />
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums">{formatCurrency(Number(amount))}</p>
              <p className="text-sm text-muted-foreground">{t("payments.send.success.sentTo", { name: recipient.name })}</p>
            </div>
            {newBalance !== null && (
              <div className="rounded-lg border border-border px-4 py-2 text-sm">
                {t("payments.send.success.newBalance")}{" "}
                <span className="font-medium tabular-nums">{formatCurrency(newBalance)}</span>
              </div>
            )}
            {reference && (
              <Badge variant="outline" className="text-xs">
                {reference}
              </Badge>
            )}
            <div className="flex w-full gap-2">
              <Button type="button" variant="outline" className="flex-1" onClick={reset}>
                {t("payments.send.success.sendAnother")}
              </Button>
              <Button type="button" className="flex-1" onClick={() => router.push("/dashboard")}>
                {t("payments.send.success.done")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
