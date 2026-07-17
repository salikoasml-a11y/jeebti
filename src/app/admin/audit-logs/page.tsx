"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Download, Search } from "lucide-react";
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
import { demoAuditLogs } from "@/lib/seed";
import { formatDateTime } from "@/lib/format";
import { RoleBadge } from "@/components/admin/status-badge";

type DateRange = "all" | "today" | "week";

// Computed once at module load (outside any component render) so filtering stays pure.
const NOW_MS = Date.now();

export default function AdminAuditLogsPage() {
  const [search, setSearch] = useState("");
  const [actorFilter, setActorFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange>("all");

  const actors = useMemo(() => [...new Set(demoAuditLogs.map((l) => l.actorName))], []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const dayMs = 24 * 60 * 60 * 1000;
    return [...demoAuditLogs]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .filter((l) => {
        const matchesSearch = !q || l.action.toLowerCase().includes(q) || l.targetType.toLowerCase().includes(q);
        const matchesActor = actorFilter === "all" || l.actorName === actorFilter;
        const age = NOW_MS - new Date(l.createdAt).getTime();
        const matchesDate = dateRange === "all" || (dateRange === "today" ? age <= dayMs : age <= 7 * dayMs);
        return matchesSearch && matchesActor && matchesDate;
      });
  }, [search, actorFilter, dateRange]);

  function exportCsv() {
    const headers = ["Timestamp", "Actor", "Role", "Action", "Target Type", "Target ID", "IP Address", "Details"];
    const rows = filtered.map((l) => [
      l.createdAt,
      l.actorName,
      l.actorRole,
      l.action,
      l.targetType,
      l.targetId,
      l.ipAddress,
      l.details,
    ]);
    const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const csv = [headers, ...rows].map((row) => row.map((cell) => escape(String(cell))).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `jeebti-audit-logs-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${filtered.length} audit log entries`);
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">Audit Logs</h1>
          <p className="text-sm text-muted-foreground">{demoAuditLogs.length} recorded administrative actions</p>
        </div>
        <Button onClick={exportCsv} variant="outline">
          <Download className="size-4" /> Export CSV
        </Button>
      </div>

      <Card className="p-0">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by action or target type…" className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={actorFilter} onValueChange={setActorFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Actor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All actors</SelectItem>
              {actors.map((a) => (
                <SelectItem key={a} value={a}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={dateRange} onValueChange={(v) => setDateRange(v as DateRange)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This week</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="text-muted-foreground">{formatDateTime(l.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{l.actorName}</span>
                    <RoleBadge role={l.actorRole} />
                  </div>
                </TableCell>
                <TableCell>{l.action}</TableCell>
                <TableCell className="text-muted-foreground">
                  {l.targetType} / {l.targetId}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{l.ipAddress}</TableCell>
                <TableCell className="max-w-xs truncate text-muted-foreground">{l.details}</TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                  No audit log entries match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
