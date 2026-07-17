"use client";

import { useState } from "react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { useBankingStore } from "@/store/banking-store";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon, CheckIcon } from "lucide-react";

function CopyRow({ label, value }: { label: string; value: string }) {
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
          toast.success("Copied");
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
      </Button>
    </div>
  );
}

export default function ReceiveMoneyPage() {
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
      <PageHeader title="Receive Money" description="Share your account details or request a specific amount." />

      <div className="grid gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-medium">Your account details</h2>
          {account ? (
            <div className="grid gap-2">
              <CopyRow label="Account name" value={account.name} />
              <CopyRow label="IBAN" value={account.iban} />
              <CopyRow label="Sort code" value={account.sortCode} />
              <CopyRow label="Account number" value={account.accountNumber} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No account found.</p>
          )}
        </div>

        <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-medium">Request a specific amount</h2>

          {!link ? (
            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="req-amount">Amount</Label>
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
                <Label htmlFor="req-from">From</Label>
                <Input
                  id="req-from"
                  placeholder="Who are you requesting from?"
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="req-reference">Reference (optional)</Label>
                <Input
                  id="req-reference"
                  placeholder="e.g. Dinner split"
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
                    toast.success("Payment request created");
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : "Something went wrong");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {submitting ? "Creating request..." : "Create request"}
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
                    toast.success("Link copied");
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
                New request
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
