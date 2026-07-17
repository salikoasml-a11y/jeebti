import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Tone = "green" | "amber" | "red" | "slate" | "blue" | "violet";

const TONE_CLASSES: Record<Tone, string> = {
  green: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  amber: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  red: "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
  slate: "border-border bg-muted text-muted-foreground",
  blue: "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  violet: "border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

function ToneBadge({ tone, label, className }: { tone: Tone; label: string; className?: string }) {
  return (
    <Badge variant="outline" className={cn(TONE_CLASSES[tone], "capitalize", className)}>
      {label.replace(/_/g, " ")}
    </Badge>
  );
}

export function UserStatusBadge({ status }: { status: "active" | "suspended" | "pending" }) {
  const tone: Tone = status === "active" ? "green" : status === "suspended" ? "red" : "amber";
  return <ToneBadge tone={tone} label={status} />;
}

export function KycStatusBadge({ status }: { status: "unverified" | "pending" | "verified" | "rejected" }) {
  const tone: Tone = status === "verified" ? "green" : status === "rejected" ? "red" : status === "pending" ? "amber" : "slate";
  return <ToneBadge tone={tone} label={status} />;
}

export function TicketStatusBadge({ status }: { status: "open" | "in_progress" | "resolved" | "closed" }) {
  const tone: Tone = status === "open" ? "amber" : status === "in_progress" ? "blue" : status === "resolved" ? "green" : "slate";
  return <ToneBadge tone={tone} label={status} />;
}

export function PriorityBadge({ priority }: { priority: "low" | "medium" | "high" | "urgent" }) {
  const tone: Tone = priority === "urgent" ? "red" : priority === "high" ? "amber" : priority === "medium" ? "blue" : "slate";
  return <ToneBadge tone={tone} label={priority} />;
}

export function TransactionStatusBadge({ status }: { status: "completed" | "pending" | "failed" | "reversed" }) {
  const tone: Tone = status === "completed" ? "green" : status === "pending" ? "amber" : status === "failed" ? "red" : "violet";
  return <ToneBadge tone={tone} label={status} />;
}

export function CardStatusBadge({ status }: { status: "active" | "frozen" | "pending" | "blocked" | "expired" }) {
  const tone: Tone = status === "active" ? "green" : status === "frozen" ? "blue" : status === "pending" ? "amber" : status === "blocked" ? "red" : "slate";
  return <ToneBadge tone={tone} label={status} />;
}

export function RoleBadge({ role }: { role: "customer" | "admin" | "support" | "system" }) {
  const tone: Tone = role === "admin" ? "violet" : role === "support" ? "blue" : role === "system" ? "amber" : "slate";
  return <ToneBadge tone={tone} label={role} />;
}

export function RiskScoreBadge({ score }: { score: number }) {
  const tone: Tone = score < 30 ? "green" : score < 70 ? "amber" : "red";
  return <ToneBadge tone={tone} label={String(score)} className="capitalize-0 normal-case" />;
}
