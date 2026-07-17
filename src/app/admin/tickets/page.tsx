"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Search, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { demoSupportTickets } from "@/lib/seed";
import type { SupportTicket } from "@/lib/types";
import { formatDateTime, relativeTime } from "@/lib/format";
import { TicketStatusBadge, PriorityBadge } from "@/components/admin/status-badge";
import { cn } from "@/lib/utils";

// Defined outside the component so id generation never runs during render.
let messageCounter = 0;
function genMessageId() {
  messageCounter += 1;
  return `m_${messageCounter}_${Math.random().toString(36).slice(2, 8)}`;
}

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>(() => [...demoSupportTickets]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [openTicketId, setOpenTicketId] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return [...tickets]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .filter((t) => {
        const matchesSearch = !q || t.subject.toLowerCase().includes(q) || t.userName.toLowerCase().includes(q);
        const matchesStatus = statusFilter === "all" || t.status === statusFilter;
        const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
      });
  }, [tickets, search, statusFilter, priorityFilter]);

  const openTicket = tickets.find((t) => t.id === openTicketId) ?? null;

  function updateTicket(id: string, patch: Partial<SupportTicket>) {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch, updatedAt: new Date().toISOString() } : t)));
  }

  function sendReply() {
    if (!openTicket || !reply.trim()) return;
    const message = {
      id: genMessageId(),
      author: "support" as const,
      authorName: "Jeebti Support",
      message: reply.trim(),
      createdAt: new Date().toISOString(),
    };
    updateTicket(openTicket.id, { messages: [...openTicket.messages, message] });
    setReply("");
    toast.success("Reply sent");
  }

  function changeStatus(status: SupportTicket["status"]) {
    if (!openTicket) return;
    updateTicket(openTicket.id, { status });
    toast.success(`Ticket status changed to "${status.replace("_", " ")}"`);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Support Tickets</h1>
        <p className="text-sm text-muted-foreground">{tickets.length} tickets total</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by subject or user…" className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {filtered.map((t) => (
          <Card key={t.id} className="cursor-pointer transition-colors hover:bg-accent" onClick={() => setOpenTicketId(t.id)}>
            <CardContent className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 space-y-0.5">
                <p className="truncate font-medium">{t.subject}</p>
                <p className="text-xs text-muted-foreground">
                  {t.userName} · Updated {relativeTime(t.updatedAt)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {t.category}
                </Badge>
                <PriorityBadge priority={t.priority} />
                <TicketStatusBadge status={t.status} />
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card>
            <CardContent className="py-10 text-center text-sm text-muted-foreground">No tickets match your filters.</CardContent>
          </Card>
        )}
      </div>

      <Sheet open={!!openTicket} onOpenChange={(open) => !open && setOpenTicketId(null)}>
        <SheetContent side="right" className="flex w-full flex-col sm:max-w-lg">
          {openTicket && (
            <>
              <SheetHeader>
                <SheetTitle>{openTicket.subject}</SheetTitle>
                <SheetDescription>
                  {openTicket.userName} · Created {formatDateTime(openTicket.createdAt)}
                </SheetDescription>
              </SheetHeader>

              <div className="flex items-center gap-2 px-4">
                <Badge variant="outline" className="capitalize">
                  {openTicket.category}
                </Badge>
                <PriorityBadge priority={openTicket.priority} />
                <div className="ml-auto w-40">
                  <Select value={openTicket.status} onValueChange={(v) => changeStatus(v as SupportTicket["status"])}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-2">
                {openTicket.messages.map((m) => (
                  <div key={m.id} className={cn("flex flex-col gap-1", m.author === "support" ? "items-end" : "items-start")}>
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                        m.author === "support" ? "bg-jeebti-brand text-white" : "bg-muted text-foreground"
                      )}
                    >
                      {m.message}
                    </div>
                    <span className="px-1 text-[11px] text-muted-foreground">
                      {m.authorName} · {relativeTime(m.createdAt)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-border px-4 py-3">
                <Textarea
                  placeholder="Type your reply…"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={3}
                />
                <Button className="w-full" onClick={sendReply} disabled={!reply.trim()}>
                  <Send className="size-4" /> Send reply
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
