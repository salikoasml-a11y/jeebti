"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { demoAdminAnalytics, demoTransactions, demoKycSubmissions } from "@/lib/seed";
import { formatCurrency } from "@/lib/format";

const DAY = 24 * 60 * 60 * 1000;

const CHART_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

const tooltipStyle = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  fontSize: 12,
  color: "var(--foreground)",
};

function buildUserGrowth(totalUsers: number) {
  const weeks = 12;
  const start = Math.round(totalUsers * 0.42);
  const points: { week: string; users: number }[] = [];
  for (let i = 0; i < weeks; i++) {
    const progress = i / (weeks - 1);
    const eased = 1 - Math.pow(1 - progress, 1.6);
    const users = Math.round(start + (totalUsers - start) * eased);
    points.push({ week: `W${i + 1}`, users });
  }
  points[points.length - 1].users = totalUsers;
  return points;
}

function buildVolumeTrend(latestVolume: number) {
  const days = 14;
  const points: { date: string; volume: number }[] = [];
  const now = Date.now();
  for (let i = days - 1; i >= 0; i--) {
    const base = latestVolume * (0.72 + 0.28 * ((days - i) / days));
    const jitter = base * (Math.sin(i * 1.7) * 0.08);
    const label = new Date(now - i * DAY).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    points.push({ date: label, volume: Math.max(0, Math.round(base + jitter)) });
  }
  points[points.length - 1].volume = Math.round(latestVolume);
  return points;
}

export default function AdminAnalyticsPage() {
  const userGrowth = useMemo(() => buildUserGrowth(demoAdminAnalytics.totalUsers), []);
  const volumeTrend = useMemo(() => buildVolumeTrend(demoAdminAnalytics.totalVolumeToday), []);

  const categoryBreakdown = useMemo(() => {
    const totals = new Map<string, number>();
    for (const t of demoTransactions) {
      if (t.type !== "debit") continue;
      totals.set(t.category, (totals.get(t.category) ?? 0) + t.amount);
    }
    return [...totals.entries()]
      .map(([category, amount]) => ({ category, amount: Math.round(amount * 100) / 100 }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 8);
  }, []);

  const kycBreakdown = useMemo(() => {
    const totals = new Map<string, number>();
    for (const k of demoKycSubmissions) {
      totals.set(k.status, (totals.get(k.status) ?? 0) + 1);
    }
    return ["pending", "verified", "rejected"].map((status) => ({
      status,
      count: totals.get(status) ?? 0,
    }));
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground">Platform-wide trends and breakdowns</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Growth — Last 12 Weeks</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowth} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} width={44} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [Number(v).toLocaleString(), "Users"]} />
                <Line type="monotone" dataKey="users" stroke="var(--chart-1)" strokeWidth={2} dot={false} name="Total users" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Volume — Last 14 Days</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeTrend} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="volumeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} interval={1} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  tickFormatter={(v: number) => `£${Math.round(v / 1000)}k`}
                  width={44}
                />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [formatCurrency(Number(v)), "Volume"]} />
                <Area type="monotone" dataKey="volume" stroke="var(--chart-2)" strokeWidth={2} fill="url(#volumeFill)" name="Volume" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spend by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  dataKey="amount"
                  nameKey="category"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  stroke="var(--card)"
                  strokeWidth={2}
                >
                  {categoryBreakdown.map((entry, i) => (
                    <Cell key={entry.category} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => [formatCurrency(Number(v)), String(n)]} />
                <Legend
                  verticalAlign="bottom"
                  height={48}
                  iconType="circle"
                  iconSize={8}
                  formatter={(value: string) => <span className="text-xs capitalize text-muted-foreground">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>KYC Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kycBreakdown} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 0 }}>
                <CartesianGrid horizontal={false} stroke="var(--border)" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <YAxis
                  type="category"
                  dataKey="status"
                  axisLine={false}
                  tickLine={false}
                  width={80}
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [Number(v), "Submissions"]} cursor={{ fill: "var(--muted)" }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={28}>
                  {kycBreakdown.map((entry, i) => (
                    <Cell key={entry.status} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
