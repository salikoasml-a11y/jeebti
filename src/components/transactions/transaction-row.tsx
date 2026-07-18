"use client";

import { useState } from "react";
import type { Transaction } from "@/lib/types";
import { formatCurrency, formatDateTime, relativeTime } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  CATEGORY_LABEL_KEYS,
  STATUS_STYLES,
  STATUS_LABEL_KEYS,
} from "./category-meta";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";

export function TransactionRow({
  transaction,
  showRelativeDate = true,
}: {
  transaction: Transaction;
  showRelativeDate?: boolean;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const Icon = CATEGORY_ICONS[transaction.category];
  const color = CATEGORY_COLORS[transaction.category];
  const isCredit = transaction.type === "credit";
  const categoryLabel = t(CATEGORY_LABEL_KEYS[transaction.category]);
  const statusLabel = t(STATUS_LABEL_KEYS[transaction.status]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-accent"
      >
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `${color}1a`, color }}
        >
          <Icon className="size-4.5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{transaction.merchant}</p>
          <p className="truncate text-xs text-muted-foreground">
            {showRelativeDate ? relativeTime(transaction.date) : formatDateTime(transaction.date)}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span
            className={cn(
              "text-sm font-semibold tabular-nums",
              isCredit && "text-emerald-600 dark:text-emerald-400"
            )}
          >
            {isCredit ? "+" : "-"}
            {formatCurrency(transaction.amount, transaction.currency)}
          </span>
          {transaction.status !== "completed" && (
            <Badge className={cn("border-0", STATUS_STYLES[transaction.status])}>
              {statusLabel}
            </Badge>
          )}
        </div>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("transactions.detail.title")}</DialogTitle>
            <DialogDescription>{t("transactions.detail.description")}</DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-3">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `${color}1a`, color }}
            >
              <Icon className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold text-foreground">{transaction.merchant}</p>
              <p className="text-xs text-muted-foreground">{categoryLabel}</p>
            </div>
          </div>

          <p
            className={cn(
              "text-2xl font-bold tabular-nums",
              isCredit && "text-emerald-600 dark:text-emerald-400"
            )}
          >
            {isCredit ? "+" : "-"}
            {formatCurrency(transaction.amount, transaction.currency)}
          </p>

          <Separator />

          <dl className="space-y-2.5 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">{t("transactions.detail.status")}</dt>
              <dd>
                <Badge className={cn("border-0", STATUS_STYLES[transaction.status])}>
                  {statusLabel}
                </Badge>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">{t("transactions.detail.date")}</dt>
              <dd className="font-medium text-foreground">{formatDateTime(transaction.date)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">{t("transactions.detail.reference")}</dt>
              <dd className="font-medium text-foreground">{transaction.id}</dd>
            </div>
            {transaction.counterparty && (
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">{t("transactions.detail.counterparty")}</dt>
                <dd className="font-medium text-foreground">{transaction.counterparty.name}</dd>
              </div>
            )}
            {transaction.description && (
              <div className="flex items-center justify-between gap-4">
                <dt className="shrink-0 text-muted-foreground">{t("transactions.detail.description.label")}</dt>
                <dd className="text-right font-medium text-foreground">{transaction.description}</dd>
              </div>
            )}
          </dl>
        </DialogContent>
      </Dialog>
    </>
  );
}
