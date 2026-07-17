"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { MoreHorizontal, Search, Flag, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { demoTransactions } from "@/lib/seed";
import type { Transaction, TransactionCategory } from "@/lib/types";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { DataPagination } from "@/components/admin/data-pagination";
import { TransactionStatusBadge } from "@/components/admin/status-badge";

const PAGE_SIZE = 10;

const CATEGORIES: TransactionCategory[] = [
  "groceries",
  "transport",
  "entertainment",
  "dining",
  "shopping",
  "bills",
  "income",
  "transfer",
  "subscriptions",
  "health",
  "travel",
  "other",
];

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => [...demoTransactions]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return transactions.filter((t) => {
      const matchesSearch = !q || t.merchant.toLowerCase().includes(q);
      const matchesCategory = categoryFilter === "all" || t.category === categoryFilter;
      const matchesStatus = statusFilter === "all" || t.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [transactions, search, categoryFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function updateTx(id: string, patch: Partial<Transaction>) {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  function flagForReview(t: Transaction) {
    updateTx(t.id, { status: "pending" });
    toast.success(`Transaction with ${t.merchant} flagged for review`);
  }

  function reverseTransaction(t: Transaction) {
    updateTx(t.id, { status: "reversed" });
    toast.success(`Transaction with ${t.merchant} has been reversed`);
  }

  function onFilterChange(setter: (v: string) => void) {
    return (v: string) => {
      setter(v);
      setPage(1);
    };
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Transactions</h1>
        <p className="text-sm text-muted-foreground">Platform-wide transaction activity</p>
      </div>

      <Card className="p-0">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by merchant…"
              className="pl-8"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <Select value={categoryFilter} onValueChange={onFilterChange(setCategoryFilter)}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c} className="capitalize">
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={onFilterChange(setStatusFilter)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="reversed">Reversed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Merchant</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageItems.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium">{t.merchant}</TableCell>
                <TableCell className="capitalize text-muted-foreground">{t.category}</TableCell>
                <TableCell className="capitalize text-muted-foreground">{t.type}</TableCell>
                <TableCell className={t.type === "credit" ? "text-emerald-600 dark:text-emerald-400" : ""}>
                  {t.type === "credit" ? "+" : "-"}
                  {formatCurrency(t.amount, t.currency)}
                </TableCell>
                <TableCell>
                  <TransactionStatusBadge status={t.status} />
                </TableCell>
                <TableCell className="text-muted-foreground">{formatDateTime(t.date)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" aria-label="Row actions">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => flagForReview(t)} disabled={t.status === "pending"}>
                        <Flag className="size-4" /> Flag for review
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => reverseTransaction(t)} disabled={t.status === "reversed"}>
                        <RotateCcw className="size-4" /> Reverse transaction
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {pageItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                  No transactions match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <DataPagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />
      </Card>
    </div>
  );
}
