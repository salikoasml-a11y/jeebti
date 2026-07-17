"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Copy, Plus, ChevronRight, ChevronDown } from "lucide-react";
import { useBankingStore } from "@/store/banking-store";
import { formatCurrency } from "@/lib/format";
import type { Account } from "@/lib/types";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TopUpDialog } from "@/components/wallet/topup-dialog";
import { TransactionRow } from "@/components/transactions/transaction-row";
import { cn } from "@/lib/utils";

function CopyField({ label, value }: { label: string; value: string }) {
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    toast.success("Copied");
  };
  return (
    <div className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2">
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium tabular-nums text-foreground">{value}</p>
      </div>
      <Button variant="ghost" size="icon-sm" onClick={copy} aria-label={`Copy ${label}`}>
        <Copy className="size-3.5" />
      </Button>
    </div>
  );
}

function AccountCard({ account }: { account: Account }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{account.name}</CardTitle>
        <CardAction>
          {account.type === "current" && (
            <TopUpDialog
              trigger={
                <Button size="sm" variant="secondary">
                  <Plus className="size-3.5" />
                  Top up
                </Button>
              }
            />
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-3xl font-bold tabular-nums text-foreground">
            {formatCurrency(account.balance, account.currency)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Available {formatCurrency(account.availableBalance, account.currency)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1 text-sm font-medium text-jeebti-brand"
        >
          Account details
          <ChevronDown className={cn("size-4 transition-transform", expanded && "rotate-180")} />
        </button>

        {expanded && (
          <div className="grid gap-2 sm:grid-cols-3">
            <CopyField label="IBAN" value={account.iban} />
            <CopyField label="Sort code" value={account.sortCode} />
            <CopyField label="Account number" value={account.accountNumber} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function BalanceBreakdown({ accounts }: { accounts: Account[] }) {
  const total = accounts.reduce((sum, a) => sum + a.balance, 0);
  if (total <= 0) {
    return <p className="text-sm text-muted-foreground">No balance to show yet.</p>;
  }
  const colors: Record<Account["type"], string> = {
    current: "#2a78d6",
    savings: "#1baf7a",
  };
  return (
    <div className="space-y-3">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
        {accounts.map((a) => (
          <div
            key={a.id}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{
              width: `${Math.max(0, (a.balance / total) * 100)}%`,
              backgroundColor: colors[a.type],
            }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {accounts.map((a) => (
          <div key={a.id} className="flex items-center gap-2 text-sm">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: colors[a.type] }} />
            <span className="text-foreground">{a.name}</span>
            <span className="font-medium tabular-nums text-muted-foreground">
              {formatCurrency(a.balance, a.currency)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WalletPage() {
  const { loaded, accounts, transactions } = useBankingStore();
  const recent = transactions.slice(0, 8);

  return (
    <div>
      <PageHeader title="Wallet" description="Manage your accounts and money." />

      <div className="mx-auto max-w-3xl space-y-6 px-4 pb-6 sm:px-6">
        {!loaded ? (
          <>
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </>
        ) : accounts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No accounts found.</p>
        ) : (
          accounts.map((account) => <AccountCard key={account.id} account={account} />)
        )}

        {loaded && accounts.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Balance breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <BalanceBreakdown accounts={accounts} />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardAction>
              <Link href="/transactions" className="flex items-center gap-0.5 text-sm font-medium text-jeebti-brand hover:underline">
                View all <ChevronRight className="size-3.5" />
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            {!loaded ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : recent.length === 0 ? (
              <p className="text-sm text-muted-foreground">No transactions yet.</p>
            ) : (
              <div className="space-y-0.5">
                {recent.map((tx) => (
                  <TransactionRow key={tx.id} transaction={tx} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
