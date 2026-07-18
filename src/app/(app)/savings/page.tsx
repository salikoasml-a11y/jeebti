"use client";

import { useState } from "react";
import { useBankingStore } from "@/store/banking-store";
import { useTranslation } from "@/hooks/use-translation";
import type { SavingsGoal } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/format";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { NewGoalDialog, AddMoneyDialog, WithdrawDialog } from "@/components/savings/goal-dialogs";
import { PiggyBankIcon, PlusIcon, RefreshCwIcon } from "lucide-react";

function daysUntil(date: string) {
  const diff = new Date(date).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function GoalCard({ goal }: { goal: SavingsGoal }) {
  const { t } = useTranslation();
  const [addOpen, setAddOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const pct = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
  const remainingDays = goal.targetDate ? daysUntil(goal.targetDate) : undefined;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl text-xl ${goal.color}`}>
            {goal.emoji}
          </div>
          <div>
            <p className="font-medium leading-tight">{goal.name}</p>
            <p className="text-xs text-muted-foreground">
              {t("savings.goal.of", {
                current: formatCurrency(goal.currentAmount),
                target: formatCurrency(goal.targetAmount),
              })}
            </p>
          </div>
        </div>
        {goal.roundUpEnabled && (
          <Badge variant="outline" className="gap-1 shrink-0">
            <RefreshCwIcon className="size-3" />
            {t("savings.goal.roundUp")}
          </Badge>
        )}
      </div>

      <div className="space-y-1.5">
        <Progress value={pct} />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{t("savings.goal.funded", { pct })}</span>
          {goal.targetDate && (
            <span>
              {remainingDays !== undefined && remainingDays >= 0
                ? t(remainingDays === 1 ? "savings.goal.daysLeft" : "savings.goal.daysLeftPlural", { days: remainingDays })
                : t("savings.goal.targetDatePassed")}{" "}
              &middot; {formatDate(goal.targetDate)}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="button" size="sm" className="flex-1" onClick={() => setAddOpen(true)}>
          {t("savings.goal.addMoney")}
        </Button>
        <Button type="button" variant="outline" size="sm" className="flex-1" onClick={() => setWithdrawOpen(true)}>
          {t("savings.goal.withdraw")}
        </Button>
      </div>

      <AddMoneyDialog goal={goal} open={addOpen} onOpenChange={setAddOpen} />
      <WithdrawDialog goal={goal} open={withdrawOpen} onOpenChange={setWithdrawOpen} />
    </div>
  );
}

export default function SavingsPage() {
  const { t } = useTranslation();
  const goals = useBankingStore((s) => s.goals);
  const [newGoalOpen, setNewGoalOpen] = useState(false);

  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);

  return (
    <div>
      <PageHeader
        title={t("savings.page.title")}
        description={t("savings.page.description")}
        actions={
          <Button type="button" className="gap-1.5" onClick={() => setNewGoalOpen(true)}>
            <PlusIcon className="size-4" />
            {t("savings.action.newGoal")}
          </Button>
        }
      />

      <div className="px-4 pb-10 sm:px-6">
        {goals.length > 0 && (
          <div className="mb-6 grid grid-cols-2 gap-4 sm:max-w-md">
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground">{t("savings.summary.totalSaved")}</p>
              <p className="mt-1 text-xl font-semibold tabular-nums">{formatCurrency(totalSaved)}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground">{t("savings.summary.activeGoals")}</p>
              <p className="mt-1 text-xl font-semibold tabular-nums">{goals.length}</p>
            </div>
          </div>
        )}

        {goals.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
            <PiggyBankIcon className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{t("savings.empty.title")}</p>
            <Button type="button" size="sm" className="gap-1.5" onClick={() => setNewGoalOpen(true)}>
              <PlusIcon className="size-4" />
              {t("savings.action.createFirstGoal")}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        )}
      </div>

      <NewGoalDialog open={newGoalOpen} onOpenChange={setNewGoalOpen} />
    </div>
  );
}
