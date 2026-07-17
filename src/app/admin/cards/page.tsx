"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Search, Snowflake, PlayCircle } from "lucide-react";
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
import { demoCards, demoAdminUsers } from "@/lib/seed";
import type { Card as CardModel, CardNetwork, CardStatus, CardType } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import { CardStatusBadge } from "@/components/admin/status-badge";

function synthesizeCards(): CardModel[] {
  const types: CardType[] = ["virtual", "physical", "credit"];
  const networks: CardNetwork[] = ["visa", "mastercard"];
  const statuses: CardStatus[] = ["active", "active", "active", "frozen", "pending", "blocked"];
  const labels = ["Everyday Virtual", "Travel Card", "Jeebti Debit Card", "Business Expense Card", "Backup Virtual Card"];

  return demoAdminUsers.slice(1, 24).map((user, i) => {
    const type = types[i % types.length];
    return {
      id: `card_synth_${i}`,
      userId: user.id,
      accountId: `acc_${user.id}`,
      type,
      network: networks[i % networks.length],
      status: statuses[i % statuses.length],
      label: labels[i % labels.length],
      last4: String(1000 + ((i * 733) % 8999)).slice(-4),
      fullNumber: `•••• •••• •••• ${String(1000 + ((i * 733) % 8999)).slice(-4)}`,
      expiry: `${String(((i % 12) + 1)).padStart(2, "0")}/${28 + (i % 4)}`,
      cvv: "***",
      holderName: user.name.toUpperCase(),
      spendingLimit: [500, 1000, 2000, 5000, 10000][i % 5],
      createdAt: user.joinedAt,
      color: "from-slate-700 via-slate-800 to-black",
    };
  });
}

const PAGE_SIZE_ALL = 200;

export default function AdminCardsPage() {
  const [cards, setCards] = useState<CardModel[]>(() => [...demoCards, ...synthesizeCards()]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return cards.filter((c) => {
      const matchesSearch = !q || c.holderName.toLowerCase().includes(q) || c.label.toLowerCase().includes(q);
      const matchesType = typeFilter === "all" || c.type === typeFilter;
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [cards, search, typeFilter, statusFilter]);

  function toggleFreeze(c: CardModel) {
    const next: CardStatus = c.status === "frozen" ? "active" : "frozen";
    setCards((prev) => prev.map((card) => (card.id === c.id ? { ...card, status: next } : card)));
    toast.success(
      next === "frozen"
        ? `Card frozen on behalf of ${c.holderName}`
        : `Card unfrozen on behalf of ${c.holderName}`
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Cards</h1>
        <p className="text-sm text-muted-foreground">{cards.length} cards issued across the platform</p>
      </div>

      <Card className="p-0">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by holder or label…"
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="virtual">Virtual</SelectItem>
              <SelectItem value="physical">Physical</SelectItem>
              <SelectItem value="credit">Credit</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="frozen">Frozen</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Holder</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Network</TableHead>
              <TableHead>Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Spending limit</TableHead>
              <TableHead className="w-32" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.slice(0, PAGE_SIZE_ALL).map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.label}</TableCell>
                <TableCell className="text-muted-foreground">{c.holderName}</TableCell>
                <TableCell className="capitalize text-muted-foreground">{c.type}</TableCell>
                <TableCell className="capitalize text-muted-foreground">{c.network}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">•••• {c.last4}</TableCell>
                <TableCell>
                  <CardStatusBadge status={c.status} />
                </TableCell>
                <TableCell>{formatCurrency(c.spendingLimit)}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={c.status === "blocked" || c.status === "expired"}
                    onClick={() => toggleFreeze(c)}
                  >
                    {c.status === "frozen" ? (
                      <>
                        <PlayCircle className="size-4" /> Unfreeze
                      </>
                    ) : (
                      <>
                        <Snowflake className="size-4" /> Freeze
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-sm text-muted-foreground">
                  No cards match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
