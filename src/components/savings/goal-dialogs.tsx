"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useBankingStore } from "@/store/banking-store";
import { useTranslation } from "@/hooks/use-translation";
import type { SavingsGoal } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const GOAL_EMOJIS = ["🏠", "✈️", "🚗", "💻", "🎓", "🛡️", "🎁", "💍", "🐶"];

export const GOAL_COLORS = [
  { value: "bg-emerald-500", labelKey: "savings.newGoal.color.emerald" },
  { value: "bg-blue-500", labelKey: "savings.newGoal.color.blue" },
  { value: "bg-purple-500", labelKey: "savings.newGoal.color.purple" },
  { value: "bg-amber-500", labelKey: "savings.newGoal.color.amber" },
  { value: "bg-rose-500", labelKey: "savings.newGoal.color.rose" },
  { value: "bg-cyan-500", labelKey: "savings.newGoal.color.cyan" },
] as const;

export function NewGoalDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  const createGoal = useBankingStore((s) => s.createGoal);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState(GOAL_EMOJIS[0]);
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [color, setColor] = useState<string>(GOAL_COLORS[0].value);
  const [roundUp, setRoundUp] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setName("");
    setEmoji(GOAL_EMOJIS[0]);
    setTargetAmount("");
    setTargetDate("");
    setColor(GOAL_COLORS[0].value);
    setRoundUp(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) reset();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("savings.newGoal.title")}</DialogTitle>
          <DialogDescription>{t("savings.newGoal.description")}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="goal-name">{t("savings.newGoal.name")}</Label>
            <Input
              id="goal-name"
              placeholder={t("savings.newGoal.namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>{t("savings.newGoal.emoji")}</Label>
            <div className="flex flex-wrap gap-2">
              {GOAL_EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg border text-lg transition-colors",
                    emoji === e ? "border-jeebti-brand bg-jeebti-brand/10" : "border-border hover:bg-muted"
                  )}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="goal-amount">{t("savings.newGoal.targetAmount")}</Label>
              <Input
                id="goal-amount"
                type="number"
                min={0}
                placeholder="1000"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="goal-date">{t("savings.newGoal.targetDate")}</Label>
              <Input id="goal-date" type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="goal-color">{t("savings.newGoal.color")}</Label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger id="goal-color" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GOAL_COLORS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    <span className={cn("mr-2 inline-block size-2.5 rounded-full", c.value)} />
                    {t(c.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
            <div>
              <p className="text-sm">{t("savings.newGoal.roundUpSaving")}</p>
              <p className="text-xs text-muted-foreground">{t("savings.newGoal.roundUpDescription")}</p>
            </div>
            <Switch checked={roundUp} onCheckedChange={setRoundUp} />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {t("action.cancel")}
          </Button>
          <Button
            type="button"
            disabled={submitting || !name.trim() || !targetAmount || Number(targetAmount) <= 0}
            onClick={async () => {
              setSubmitting(true);
              try {
                await createGoal({
                  name: name.trim(),
                  emoji,
                  targetAmount: Number(targetAmount),
                  targetDate: targetDate || undefined,
                  color,
                  roundUpEnabled: roundUp,
                });
                toast.success(t("savings.toast.goalCreated"));
                onOpenChange(false);
                reset();
              } catch (e) {
                toast.error(e instanceof Error ? e.message : t("savings.toast.error"));
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? t("savings.newGoal.creating") : t("savings.newGoal.create")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AddMoneyDialog({
  goal,
  open,
  onOpenChange,
}: {
  goal: SavingsGoal;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  const contributeToGoal = useBankingStore((s) => s.contributeToGoal);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setAmount("");
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("savings.addMoney.title", { name: goal.name })}</DialogTitle>
          <DialogDescription>
            {t("savings.addMoney.description", {
              current: formatCurrency(goal.currentAmount),
              target: formatCurrency(goal.targetAmount),
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label htmlFor="add-amount">{t("savings.addMoney.amount")}</Label>
          <Input
            id="add-amount"
            type="number"
            min={0}
            placeholder="50"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {t("action.cancel")}
          </Button>
          <Button
            type="button"
            disabled={submitting || !amount || Number(amount) <= 0}
            onClick={async () => {
              setSubmitting(true);
              try {
                await contributeToGoal(goal.id, Number(amount));
                toast.success(t("savings.toast.moneyAdded"));
                onOpenChange(false);
                setAmount("");
              } catch (e) {
                toast.error(e instanceof Error ? e.message : t("savings.toast.error"));
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? t("savings.addMoney.adding") : t("savings.goal.addMoney")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function WithdrawDialog({
  goal,
  open,
  onOpenChange,
}: {
  goal: SavingsGoal;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useTranslation();
  const withdrawFromGoal = useBankingStore((s) => s.withdrawFromGoal);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setAmount("");
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("savings.withdraw.title", { name: goal.name })}</DialogTitle>
          <DialogDescription>
            {t("savings.withdraw.description", { current: formatCurrency(goal.currentAmount) })}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label htmlFor="withdraw-amount">{t("savings.withdraw.amount")}</Label>
          <Input
            id="withdraw-amount"
            type="number"
            min={0}
            placeholder="50"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {t("action.cancel")}
          </Button>
          <Button
            type="button"
            disabled={submitting || !amount || Number(amount) <= 0}
            onClick={async () => {
              setSubmitting(true);
              try {
                await withdrawFromGoal(goal.id, Number(amount));
                toast.success(t("savings.toast.moneyWithdrawn"));
                onOpenChange(false);
                setAmount("");
              } catch (e) {
                toast.error(e instanceof Error ? e.message : t("savings.toast.error"));
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? t("savings.withdraw.withdrawing") : t("savings.goal.withdraw")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
