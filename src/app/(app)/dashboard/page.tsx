"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Send, ArrowDownToLine, Plus, QrCode, Bell, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useBankingStore } from "@/store/banking-store";
import { bankProvider } from "@/lib/banking/client";
import { formatCurrency, formatDate } from "@/lib/format";
import type { TransactionCategory } from "@/lib/types";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { TopUpDialog } from "@/components/wallet/topup-dialog";
import { TransactionRow } from "@/components/transactions/transaction-row";
import { SpendingDonut } from "@/components/dashboard/spending-donut";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { loaded, transactions, goals, notifications, primaryAccount } = useBankingStore();
  const account = primaryAccount();

  const [spend, setSpend] = useState<{ category: TransactionCategory; amount: number }[] | null>(null);

  useEffect(() => {
    if (!account) return;
    let cancelled = false;
    bankProvider.getSpendingByCategory(account.id, "month").then((data) => {
      if (!cancelled) setSpend(data);
    });
    return () => {
      cancelled = true;
    };
  }, [account]);

  if (!user) return null;

  const recentTransactions = transactions.slice(0, 5);
  const topGoals = goals.slice(0, 3);
  const recentNotifications = notifications.slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 pt-6 sm:px-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {greeting()}, {user.firstName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{formatDate(new Date(), { weekday: "long", day: "numeric", month: "long" })}</p>
      </div>

      {/* Balance hero */}
      {!loaded ? (
        <Skeleton className="h-56 w-full rounded-xl" />
      ) : account ? (
        <Card className="border-0 bg-jeebti-brand text-white ring-0">
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-white/70">{account.name}</p>
              <p className="mt-1 text-4xl font-bold tracking-tight tabular-nums">
                {formatCurrency(account.balance, account.currency)}
              </p>
              <p className="mt-1 text-xs text-white/60">
                Available {formatCurrency(account.availableBalance, account.currency)}
              </p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <Link href="/send" className="flex flex-col items-center gap-1.5">
                <span className="flex size-11 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25">
                  <Send className="size-4.5" />
                </span>
                <span className="text-xs font-medium">Send</span>
              </Link>
              <Link href="/receive" className="flex flex-col items-center gap-1.5">
                <span className="flex size-11 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25">
                  <ArrowDownToLine className="size-4.5" />
                </span>
                <span className="text-xs font-medium">Receive</span>
              </Link>
              <TopUpDialog
                trigger={
                  <button type="button" className="flex flex-col items-center gap-1.5">
                    <span className="flex size-11 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25">
                      <Plus className="size-4.5" />
                    </span>
                    <span className="text-xs font-medium">Top up</span>
                  </button>
                }
              />
              <Link href="/qr" className="flex flex-col items-center gap-1.5">
                <span className="flex size-11 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25">
                  <QrCode className="size-4.5" />
                </span>
                <span className="text-xs font-medium">QR</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Spending analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Spending this month</CardTitle>
        </CardHeader>
        <CardContent>
          {!loaded || !account || spend === null ? (
            <Skeleton className="h-44 w-full" />
          ) : (
            <SpendingDonut data={spend} currency={account.currency} />
          )}
        </CardContent>
      </Card>

      {/* Savings goals */}
      <Card>
        <CardHeader>
          <CardTitle>Savings goals</CardTitle>
          <CardAction>
            <Link href="/savings" className="flex items-center gap-0.5 text-sm font-medium text-jeebti-brand hover:underline">
              View all <ChevronRight className="size-3.5" />
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          {!loaded ? (
            <>
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </>
          ) : topGoals.length === 0 ? (
            <p className="text-sm text-muted-foreground">You haven&apos;t created any savings goals yet.</p>
          ) : (
            topGoals.map((goal) => {
              const pct = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
              return (
                <div key={goal.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 font-medium text-foreground">
                      <span aria-hidden>{goal.emoji}</span>
                      {goal.name}
                    </span>
                    <span className="text-muted-foreground tabular-nums">
                      {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                    </span>
                  </div>
                  <Progress value={pct} />
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Recent transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent transactions</CardTitle>
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
          ) : recentTransactions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No transactions yet.</p>
          ) : (
            <div className="space-y-0.5">
              {recentTransactions.map((tx) => (
                <TransactionRow key={tx.id} transaction={tx} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notifications preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5">
            <Bell className="size-4" />
            Notifications
          </CardTitle>
          <CardAction>
            <Link
              href="/settings?tab=notifications"
              className="flex items-center gap-0.5 text-sm font-medium text-jeebti-brand hover:underline"
            >
              View all <ChevronRight className="size-3.5" />
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-3">
          {!loaded ? (
            <Skeleton className="h-14 w-full" />
          ) : recentNotifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">You&apos;re all caught up.</p>
          ) : (
            recentNotifications.map((n) => (
              <Link
                key={n.id}
                href="/settings?tab=notifications"
                className="flex items-start gap-3 rounded-lg px-1 py-1 transition-colors hover:bg-accent"
              >
                <span
                  className={`mt-1.5 size-1.5 shrink-0 rounded-full ${n.read ? "bg-transparent" : "bg-jeebti-brand"}`}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{n.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{n.message}</p>
                </div>
              </Link>
            ))
          )}
        </CardContent>
      </Card>

      <div className="pb-2 sm:hidden" />
    </div>
  );
}
