"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  UserCheck,
  Wallet,
  ArrowLeftRight,
  TrendingUp,
  UserPlus,
  ShieldCheck,
  LifeBuoy,
  AlertTriangle,
  CreditCard,
  BarChart3,
  ScrollText,
  ArrowUpRight,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { demoAdminAnalytics, demoAuditLogs } from "@/lib/seed";
import { formatCurrency, formatDate, relativeTime } from "@/lib/format";
import { RoleBadge } from "@/components/admin/status-badge";

interface LiveStats {
  totalUsers: number;
  newSignupsThisWeek: number;
  activeSessions: number;
}

const volumeByDay = [
  { day: "Mon", volume: 38210 },
  { day: "Tue", volume: 41230 },
  { day: "Wed", volume: 36940 },
  { day: "Thu", volume: 45870 },
  { day: "Fri", volume: 52630 },
  { day: "Sat", volume: 31980 },
  { day: "Sun", volume: demoAdminAnalytics.totalVolumeToday },
];

const quickLinks = [
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/kyc", label: "KYC Review", icon: ShieldCheck },
  { href: "/admin/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/admin/cards", label: "Cards", icon: CreditCard },
  { href: "/admin/tickets", label: "Support Tickets", icon: LifeBuoy },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/audit-logs", label: "Audit Logs", icon: ScrollText },
];

function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  positive,
  live,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  delta?: string;
  positive?: boolean;
  live: boolean;
}) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <Badge
              variant="outline"
              className={
                live
                  ? "h-4 border-emerald-500/30 px-1 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400"
                  : "h-4 border-border px-1 text-[9px] font-medium text-muted-foreground"
              }
            >
              {live ? "Live" : "Demo"}
            </Badge>
          </div>
          <p className="font-heading text-2xl font-semibold tracking-tight">{value}</p>
          {delta && (
            <span
              className={
                "inline-flex items-center gap-1 text-xs font-medium " +
                (positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400")
              }
            >
              {delta} vs last week
            </span>
          )}
        </div>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-jeebti-brand/10 text-jeebti-brand">
          <Icon className="size-4.5" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminOverviewPage() {
  const [live, setLive] = useState<LiveStats | null>(null);
  const [liveError, setLiveError] = useState(false);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setLive(data))
      .catch(() => setLiveError(true));
  }, []);

  const recentActivity = [...demoAuditLogs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">Admin Overview</h1>
          <p className="text-sm text-muted-foreground">{formatDate(new Date(), { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-emerald-600 dark:text-emerald-400">Live</span> metrics come straight from
          the real user database. <span className="font-medium">Demo</span> metrics are illustrative sample data until
          a real transaction ledger is connected.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {!live && !liveError ? (
          <>
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
          </>
        ) : (
          <>
            <StatCard label="Total Users" value={(live?.totalUsers ?? 0).toLocaleString()} icon={Users} live />
            <StatCard
              label="Active Sessions"
              value={(live?.activeSessions ?? 0).toLocaleString()}
              icon={UserCheck}
              live
            />
            <StatCard
              label="New Signups This Week"
              value={(live?.newSignupsThisWeek ?? 0).toLocaleString()}
              icon={UserPlus}
              live
            />
          </>
        )}
        <StatCard
          label="Total Platform Balance"
          value={formatCurrency(demoAdminAnalytics.totalBalance)}
          icon={Wallet}
          delta="+1.6%"
          positive
          live={false}
        />
        <StatCard
          label="Transactions Today"
          value={demoAdminAnalytics.totalTransactionsToday.toLocaleString()}
          icon={ArrowLeftRight}
          delta="+8.1%"
          positive
          live={false}
        />
        <StatCard
          label="Volume Today"
          value={formatCurrency(demoAdminAnalytics.totalVolumeToday)}
          icon={TrendingUp}
          delta="+5.4%"
          positive
          live={false}
        />
        <StatCard
          label="Pending KYC"
          value={demoAdminAnalytics.pendingKyc.toLocaleString()}
          icon={ShieldCheck}
          delta="-3.1%"
          positive={false}
          live={false}
        />
        <StatCard
          label="Open Tickets"
          value={demoAdminAnalytics.openTickets.toLocaleString()}
          icon={LifeBuoy}
          delta="-1.4%"
          positive={false}
          live={false}
        />
        <StatCard
          label="Fraud Alerts Open"
          value={demoAdminAnalytics.fraudAlertsOpen.toLocaleString()}
          icon={AlertTriangle}
          delta="+0.5%"
          positive={false}
          live={false}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle>Transaction Volume — Last 7 Days</CardTitle>
            <Badge variant="outline" className="h-4 border-border px-1 text-[9px] font-medium text-muted-foreground">
              Demo
            </Badge>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeByDay} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  tickFormatter={(v: number) => `£${Math.round(v / 1000)}k`}
                  width={44}
                />
                <Tooltip
                  cursor={{ fill: "var(--muted)" }}
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    fontSize: 12,
                    color: "var(--foreground)",
                  }}
                  formatter={(v) => [formatCurrency(Number(v)), "Volume"]}
                />
                <Bar dataKey="volume" fill="var(--chart-1)" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle>Recent Activity</CardTitle>
            <Link href="/admin/audit-logs" className="flex items-center gap-1 text-xs font-medium text-jeebti-brand hover:underline">
              View all <ArrowUpRight className="size-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((log) => (
              <div key={log.id} className="flex items-start justify-between gap-3 text-sm">
                <div className="min-w-0 space-y-0.5">
                  <p className="truncate font-medium">{log.action}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {log.actorName} · {log.targetType} {log.targetId}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <RoleBadge role={log.actorRole} />
                  <span className="text-[11px] text-muted-foreground">{relativeTime(log.createdAt)}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Quick links</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {quickLinks.map((q) => (
            <Link key={q.href} href={q.href}>
              <Card className="transition-colors hover:bg-accent">
                <CardContent className="flex flex-col items-center gap-2 py-2 text-center">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-jeebti-brand/10 text-jeebti-brand">
                    <q.icon className="size-4.5" />
                  </div>
                  <span className="text-xs font-medium">{q.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
