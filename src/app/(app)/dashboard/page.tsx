"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Send, ArrowDownToLine, Plus, QrCode, Bell, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useBankingStore } from "@/store/banking-store";
import { bankProvider } from "@/lib/banking/client";
import { formatCurrency } from "@/lib/format";
import type { TransactionCategory } from "@/lib/types";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { TopUpDialog } from "@/components/wallet/topup-dialog";
import { TransactionRow } from "@/components/transactions/transaction-row";
import { SpendingDonut } from "@/components/dashboard/spending-donut";
import { useTranslation } from "@/hooks/use-translation";

function greetingKey() {
  const hour = new Date().getHours();
  if (hour < 12) return "dashboard.greeting.morning";
  if (hour < 18) return "dashboard.greeting.afternoon";
  return "dashboard.greeting.evening";
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { loaded, transactions, goals, notifications, primaryAccount } = useBankingStore();
  const account = primaryAccount();
  const { t, locale } = useTranslation();

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
  const dateLocale = locale === "ar" ? "ar" : locale === "fr" ? "fr-FR" : "en-GB";

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 pt-6 sm:px-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t(greetingKey())}, {user.firstName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {new Intl.DateTimeFormat(dateLocale, { weekday: "long", day: "numeric", month: "long" }).format(new Date())}
        </p>
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
                {t("dashboard.available")} {formatCurrency(account.availableBalance, account.currency)}
              </p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <Link href="/send" className="flex flex-col items-center gap-1.5">
                <span className="flex size-11 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25">
                  <Send className="size-4.5" />
                </span>
                <span className="text-xs font-medium">{t("dashboard.action.send")}</span>
              </Link>
              <Link href="/receive" className="flex flex-col items-center gap-1.5">
                <span className="flex size-11 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25">
                  <ArrowDownToLine className="size-4.5" />
                </span>
                <span className="text-xs font-medium">{t("dashboard.action.receive")}</span>
              </Link>
              <TopUpDialog
                trigger={
                  <button type="button" className="flex flex-col items-center gap-1.5">
                    <span className="flex size-11 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25">
                      <Plus className="size-4.5" />
                    </span>
                    <span className="text-xs font-medium">{t("dashboard.action.topUp")}</span>
                  </button>
                }
              />
              <Link href="/qr" className="flex flex-col items-center gap-1.5">
                <span className="flex size-11 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25">
                  <QrCode className="size-4.5" />
                </span>
                <span className="text-xs font-medium">{t("dashboard.action.qr")}</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Spending analytics */}
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.spending.title")}</CardTitle>
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
          <CardTitle>{t("dashboard.goals.title")}</CardTitle>
          <CardAction>
            <Link href="/savings" className="flex items-center gap-0.5 text-sm font-medium text-jeebti-brand hover:underline">
              {t("action.viewAll")} <ChevronRight className="size-3.5 rtl:rotate-180" />
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
            <p className="text-sm text-muted-foreground">{t("dashboard.goals.empty")}</p>
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
          <CardTitle>{t("dashboard.transactions.title")}</CardTitle>
          <CardAction>
            <Link href="/transactions" className="flex items-center gap-0.5 text-sm font-medium text-jeebti-brand hover:underline">
              {t("action.viewAll")} <ChevronRight className="size-3.5 rtl:rotate-180" />
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
            <p className="text-sm text-muted-foreground">{t("dashboard.transactions.empty")}</p>
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
            {t("dashboard.notifications.title")}
          </CardTitle>
          <CardAction>
            <Link
              href="/settings?tab=notifications"
              className="flex items-center gap-0.5 text-sm font-medium text-jeebti-brand hover:underline"
            >
              {t("action.viewAll")} <ChevronRight className="size-3.5 rtl:rotate-180" />
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-3">
          {!loaded ? (
            <Skeleton className="h-14 w-full" />
          ) : recentNotifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("dashboard.notifications.empty")}</p>
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
