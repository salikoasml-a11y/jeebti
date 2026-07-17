"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { useBankingStore } from "@/store/banking-store";
import type { Contact } from "@/lib/types";
import { formatCurrency, initials } from "@/lib/format";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CameraIcon, ShareIcon, ArrowLeftIcon, CheckCircle2Icon } from "lucide-react";

function ScanToPay() {
  const router = useRouter();
  const contacts = useBankingStore((s) => s.contacts);
  const sendMoney = useBankingStore((s) => s.sendMoney);

  const [scanned, setScanned] = useState<Contact | null>(null);
  const [manualCode, setManualCode] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function simulateScan() {
    if (contacts.length === 0) {
      toast.error("No contacts available to simulate a scan");
      return;
    }
    const contact = contacts[Math.floor(Math.random() * contacts.length)];
    setScanned(contact);
  }

  function reset() {
    setScanned(null);
    setAmount("");
    setManualCode("");
  }

  if (scanned) {
    const [first, last] = scanned.name.split(" ");
    return (
      <div className="mx-auto max-w-sm space-y-4">
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-3.5" />
          Back
        </button>

        <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-5 text-center">
          <Avatar size="lg">
            <AvatarFallback>{initials(first ?? "", last ?? "")}</AvatarFallback>
          </Avatar>
          <div>
            <p className="flex items-center gap-1.5 font-medium">
              {scanned.name}
              {scanned.isJeebtiUser && (
                <Badge variant="secondary" className="text-[10px]">
                  Jeebti
                </Badge>
              )}
            </p>
            <p className="text-xs text-muted-foreground">{scanned.handle}</p>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="scan-amount">Amount</Label>
          <Input
            id="scan-amount"
            type="number"
            min={0}
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <Button
          type="button"
          className="w-full"
          disabled={submitting || !amount || Number(amount) <= 0}
          onClick={async () => {
            setSubmitting(true);
            try {
              await sendMoney({
                toAccountNumber: scanned.accountNumber ?? "00000000",
                toSortCode: scanned.sortCode ?? "00-00-00",
                toName: scanned.name,
                amount: Number(amount),
                reference: "QR payment",
              });
              toast.success(`${formatCurrency(Number(amount))} sent to ${scanned.name}`);
              router.push("/dashboard");
            } catch (e) {
              toast.error(e instanceof Error ? e.message : "Something went wrong");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {submitting ? "Paying..." : "Confirm and pay"}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm space-y-5">
      <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border bg-muted/30 py-14 text-center">
        <CameraIcon className="size-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Point your camera at a QR code</p>
      </div>

      <Button type="button" className="w-full" onClick={simulateScan}>
        Simulate scan (demo)
      </Button>

      <div className="space-y-2">
        <Label htmlFor="manual-code">Or enter code manually</Label>
        <div className="flex gap-2">
          <Input
            id="manual-code"
            placeholder="Payment code"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
          />
          <Button
            type="button"
            variant="outline"
            disabled={!manualCode.trim()}
            onClick={simulateScan}
          >
            Use code
          </Button>
        </div>
      </div>
    </div>
  );
}

function MyQr() {
  const primaryAccount = useBankingStore((s) => s.primaryAccount);
  const account = primaryAccount();
  const [copied, setCopied] = useState(false);

  if (!account) {
    return <p className="text-center text-sm text-muted-foreground">No account found.</p>;
  }

  const payload = JSON.stringify({
    accountNumber: account.accountNumber,
    sortCode: account.sortCode,
    name: account.name,
  });

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-4">
      <div className="rounded-2xl border border-border bg-card p-6">
        <QRCodeSVG value={payload} size={220} />
      </div>
      <div className="text-center">
        <p className="font-medium">{account.name}</p>
        <p className="text-sm text-muted-foreground">
          {account.sortCode} · {account.accountNumber}
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        className="gap-1.5"
        onClick={async () => {
          await navigator.clipboard.writeText(payload);
          setCopied(true);
          toast.success("Payment details copied");
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? <CheckCircle2Icon className="size-4" /> : <ShareIcon className="size-4" />}
        Share
      </Button>
    </div>
  );
}

export default function QrPaymentsPage() {
  return (
    <div>
      <PageHeader title="QR Payments" description="Get paid or pay someone instantly with a QR code." />

      <div className="px-4 pb-10 sm:px-6">
        <Tabs defaultValue="my-qr">
          <TabsList>
            <TabsTrigger value="my-qr">My QR</TabsTrigger>
            <TabsTrigger value="scan">Scan to Pay</TabsTrigger>
          </TabsList>
          <TabsContent value="my-qr" className="pt-6">
            <MyQr />
          </TabsContent>
          <TabsContent value="scan" className="pt-6">
            <ScanToPay />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
