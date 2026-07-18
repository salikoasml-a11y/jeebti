"use client";

import { useState } from "react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { useBankingStore } from "@/store/banking-store";
import { useTranslation } from "@/hooks/use-translation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon, CheckIcon } from "lucide-react";

function CopyRow({ label, value }: { label: string; value: string }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2.5">
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="truncate font-mono text-sm">{value}</p>
      </div>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        className="shrink-0"
        onClick={async () => {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          toast.success(t("payments.receive.toast.copied"));
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
      </Button>
    </div>
  );
}

export default function ReceiveMoneyPage() {
  const { t } = useTranslation();
  const primaryAccount = useBankingStore((s) => s.primaryAccount);
  const requestMoney = useBankingStore((s) => s.requestMoney);
  const account = primaryAccount();

  const [amount, setAmount] = useState("");
  const [fromName, setFromName] = useState("");
  const [reference, setReference] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [link, setLink] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  return (
    <div>
      <PageHeader title={t("payments.receive.page.title")} description={t("payments.receive.page.description")} />

      <div className="grid gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-medium">{t("payments.receive.accountDetails.title")}</h2>
          {account ? (
            <div className="grid gap-2">
              <CopyRow label={t("payments.receive.accountDetails.accountName")} value={account.name} />
              <CopyRow label={t("payments.receive.accountDetails.iban")} value={account.iban} />
              <CopyRow label={t("payments.receive.accountDetails.sortCode")} value={account.sortCode} />
              <CopyRow label={t("payments.receive.accountDetails.accountNumber")} value={account.accountNumber} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{t("payments.receive.accountDetails.noAccount")}</p>
          )}
        </div>

        <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-medium">{t("payments.receive.request.title")}</h2>

          {!link ? (
            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="req-amount">{t("payments.receive.request.amount")}</Label>
                <Input
                  id="req-amount"
                  type="number"
                  min={0}
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="req-from">{t("payments.receive.request.from")}</Label>
                <Input
                  id="req-from"
                  placeholder={t("payments.receive.request.fromPlaceholder")}
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="req-reference">{t("payments.receive.request.reference")}</Label>
                <Input
                  id="req-reference"
                  placeholder={t("payments.receive.request.referencePlaceholder")}
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </div>
              <Button
                type="button"
                disabled={submitting || !amount || Number(amount) <= 0 || !fromName.trim()}
                onClick={async () => {
                  setSubmitting(true);
                  try {
                    const result = await requestMoney({
                      amount: Number(amount),
                      fromName: fromName.trim(),
                      reference: reference || undefined,
                    });
                    setLink(result.link);
                    toast.success(t("payments.receive.request.toast.created"));
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : t("payments.receive.request.toast.error"));
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {submitting ? t("payments.receive.request.creating") : t("payments.receive.request.create")}
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="flex justify-center rounded-xl border border-border p-4">
                <QRCodeSVG value={link} size={180} />
              </div>
              <div className="flex items-center gap-2">
                <Input readOnly value={link} className="font-mono text-xs" />
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={async () => {
                    await navigator.clipboard.writeText(link);
                    setLinkCopied(true);
                    toast.success(t("payments.receive.toast.linkCopied"));
                    setTimeout(() => setLinkCopied(false), 1500);
                  }}
                >
                  {linkCopied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
                </Button>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setLink(null);
                  setAmount("");
                  setFromName("");
                  setReference("");
                }}
              >
                {t("payments.receive.request.newRequest")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
