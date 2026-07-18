"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useBankingStore } from "@/store/banking-store";
import { formatDate } from "@/lib/format";
import type { Transaction, TransactionCategory, TransactionStatus } from "@/lib/types";
import { PageHeader } from "@/components/shared/page-header";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionRow } from "@/components/transactions/transaction-row";
import { CATEGORY_LABEL_KEYS } from "@/components/transactions/category-meta";
import { useTranslation } from "@/hooks/use-translation";

type DateRange = "all" | "week" | "month";
type StatusFilter = "all" | TransactionStatus;
type CategoryFilter = "all" | TransactionCategory;

function dateGroupKey(date: string): "today" | "yesterday" | string {
  const d = new Date(date);
  const now = new Date();
  const startOfDay = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate());
  const diffDays = Math.round((startOfDay(now).getTime() - startOfDay(d).getTime()) / 86400000);
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  return formatDate(d, { day: "numeric", month: "long", year: "numeric" });
}

export default function TransactionsPage() {
  const { t } = useTranslation();
  const { loaded, transactions } = useBankingStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [range, setRange] = useState<DateRange>("all");
  const [now] = useState(() => Date.now());

  const filtered = useMemo(() => {
    const rangeMs = range === "week" ? 7 * 86400000 : range === "month" ? 30 * 86400000 : Infinity;
    const query = search.trim().toLowerCase();

    return transactions.filter((tx) => {
      if (category !== "all" && tx.category !== category) return false;
      if (status !== "all" && tx.status !== status) return false;
      if (rangeMs !== Infinity && now - new Date(tx.date).getTime() > rangeMs) return false;
      if (query) {
        const haystack = `${tx.merchant} ${tx.description ?? ""}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [transactions, category, status, range, search, now]);

  const groups = useMemo(() => {
    const map = new Map<string, Transaction[]>();
    for (const tx of filtered) {
      const key = dateGroupKey(tx.date);
      const list = map.get(key);
      if (list) list.push(tx);
      else map.set(key, [tx]);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const groupLabel = (key: string) => {
    if (key === "today") return t("transactions.dateGroup.today");
    if (key === "yesterday") return t("transactions.dateGroup.yesterday");
    return key;
  };

  return (
    <div>
      <PageHeader title={t("transactions.title")} description={t("transactions.description")} />

      <div className="mx-auto max-w-3xl space-y-4 px-4 pb-8 sm:px-6">
        <div className="space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("transactions.searchPlaceholder")}
              className="h-9 pl-8"
            />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Tabs value={range} onValueChange={(v) => setRange(v as DateRange)}>
              <TabsList>
                <TabsTrigger value="all">{t("transactions.range.all")}</TabsTrigger>
                <TabsTrigger value="week">{t("transactions.range.week")}</TabsTrigger>
                <TabsTrigger value="month">{t("transactions.range.month")}</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-2">
              <Select value={category} onValueChange={(v) => setCategory(v as CategoryFilter)}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder={t("transactions.filter.categoryPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("transactions.filter.allCategories")}</SelectItem>
                  {(Object.keys(CATEGORY_LABEL_KEYS) as TransactionCategory[]).map((c) => (
                    <SelectItem key={c} value={c}>
                      {t(CATEGORY_LABEL_KEYS[c])}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={status} onValueChange={(v) => setStatus(v as StatusFilter)}>
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue placeholder={t("transactions.filter.statusPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("transactions.filter.allStatuses")}</SelectItem>
                  <SelectItem value="completed">{t("status.completed")}</SelectItem>
                  <SelectItem value="pending">{t("status.pending")}</SelectItem>
                  <SelectItem value="failed">{t("status.failed")}</SelectItem>
                  <SelectItem value="reversed">{t("status.reversed")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {!loaded ? (
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border py-16 text-center">
            <p className="text-sm font-medium text-foreground">{t("transactions.empty.title")}</p>
            <p className="text-xs text-muted-foreground">{t("transactions.empty.description")}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {groups.map(([key, txs]) => (
              <div key={key}>
                <h2 className="sticky top-16 z-10 -mx-1 bg-background/95 px-1 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase backdrop-blur-sm">
                  {groupLabel(key)}
                </h2>
                <div className="space-y-0.5">
                  {txs.map((tx) => (
                    <TransactionRow key={tx.id} transaction={tx} showRelativeDate={false} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
