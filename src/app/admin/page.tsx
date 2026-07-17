"use client";

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
import { demoAdminAnalytics, demoAuditLogs } from "@/lib/seed";
import { formatCurrency, formatDate, relativeTime } from "@/lib/format";
import { RoleBadge } from "@/components/admin/status-badge";

const stats: {
  label: string;
  value: string;
  icon: React.ElementType;
  delta: string;
  positive: boolean;
}[] = [
  { label: "Total Users", value: demoAdminAnalytics.totalUsers.toLocaleString(), icon: Users, delta: "+4.2%", positive: true },
  { label: "Active Users", value: demoAdminAnalytics.activeUsers.toLocaleString(), icon: UserCheck, delta: "+2.8%", positive: true },
  { label: "Total Platform Balance", value: formatCurrency(demoAdminAnalytics.totalBalance), icon: Wallet, delta: "+1.6%", positive: true },
  { label: "Transactions Today", value: demoAdminAnalytics.totalTransactionsToday.toLocaleString(), icon: ArrowLeftRight, delta: "+8.1%", positive: true },
  { label: "Volume Today", value: formatCurrency(demoAdminAnalytics.totalVolumeToday), icon: TrendingUp, delta: "+5.4%", positive: true },
  { label: "New Signups This Week", value: demoAdminAnalytics.newSignupsThisWeek.toLocaleString(), icon: UserPlus, delta: "+12%", positive: true },
  { label: "Pending KYC", value: demoAdminAnalytics.pendingKyc.toLocaleString(), icon: ShieldCheck, delta: "-3.1%", positive: false },
  { label: "Open Tickets", value: demoAdminAnalytics.openTickets.toLocaleString(), icon: LifeBuoy, delta: "-1.4%", positive: false },
  { label: "Fraud Alerts Open", value: demoAdminAnalytics.fraudAlertsOpen.toLocaleString(), icon: AlertTriangle, delta: "+0.5%", positive: false },
];

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

export default function AdminOverviewPage() {
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
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
                <p className="font-heading text-2xl font-semibold tracking-tight">{s.value}</p>
                <span
                  className={
                    "inline-flex items-center gap-1 text-xs font-medium " +
                    (s.positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400")
                  }
                >
                  {s.delta} vs last week
                </span>
              </div>
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-jeebti-brand/10 text-jeebti-brand">
                <s.icon className="size-4.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Transaction Volume — Last 7 Days</CardTitle>
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
