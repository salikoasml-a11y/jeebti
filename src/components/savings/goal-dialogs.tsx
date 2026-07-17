"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useBankingStore } from "@/store/banking-store";
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
  { value: "bg-emerald-500", label: "Emerald" },
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-amber-500", label: "Amber" },
  { value: "bg-rose-500", label: "Rose" },
  { value: "bg-cyan-500", label: "Cyan" },
];

export function NewGoalDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const createGoal = useBankingStore((s) => s.createGoal);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState(GOAL_EMOJIS[0]);
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [color, setColor] = useState(GOAL_COLORS[0].value);
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
          <DialogTitle>New savings goal</DialogTitle>
          <DialogDescription>Set a target and start saving towards it.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="goal-name">Goal name</Label>
            <Input
              id="goal-name"
              placeholder="e.g. Summer holiday"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Emoji</Label>
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
              <Label htmlFor="goal-amount">Target amount</Label>
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
              <Label htmlFor="goal-date">Target date (optional)</Label>
              <Input id="goal-date" type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="goal-color">Color</Label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger id="goal-color" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GOAL_COLORS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    <span className={cn("mr-2 inline-block size-2.5 rounded-full", c.value)} />
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
            <div>
              <p className="text-sm">Round-up saving</p>
              <p className="text-xs text-muted-foreground">Round up card spending into this goal.</p>
            </div>
            <Switch checked={roundUp} onCheckedChange={setRoundUp} />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
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
                toast.success("Savings goal created");
                onOpenChange(false);
                reset();
              } catch (e) {
                toast.error(e instanceof Error ? e.message : "Something went wrong");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? "Creating..." : "Create goal"}
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
          <DialogTitle>Add money to {goal.name}</DialogTitle>
          <DialogDescription>
            {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)} saved.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label htmlFor="add-amount">Amount</Label>
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
            Cancel
          </Button>
          <Button
            type="button"
            disabled={submitting || !amount || Number(amount) <= 0}
            onClick={async () => {
              setSubmitting(true);
              try {
                await contributeToGoal(goal.id, Number(amount));
                toast.success("Money added to goal");
                onOpenChange(false);
                setAmount("");
              } catch (e) {
                toast.error(e instanceof Error ? e.message : "Something went wrong");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? "Adding..." : "Add money"}
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
          <DialogTitle>Withdraw from {goal.name}</DialogTitle>
          <DialogDescription>{formatCurrency(goal.currentAmount)} available in this goal.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label htmlFor="withdraw-amount">Amount</Label>
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
            Cancel
          </Button>
          <Button
            type="button"
            disabled={submitting || !amount || Number(amount) <= 0}
            onClick={async () => {
              setSubmitting(true);
              try {
                await withdrawFromGoal(goal.id, Number(amount));
                toast.success("Money withdrawn from goal");
                onOpenChange(false);
                setAmount("");
              } catch (e) {
                toast.error(e instanceof Error ? e.message : "Something went wrong");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? "Withdrawing..." : "Withdraw"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
