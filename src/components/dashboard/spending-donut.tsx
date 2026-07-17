"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { TransactionCategory } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/components/transactions/category-meta";

interface SpendSlice {
  category: TransactionCategory;
  amount: number;
}

export function SpendingDonut({ data, currency }: { data: SpendSlice[]; currency: string }) {
  const total = data.reduce((sum, d) => sum + d.amount, 0);

  if (data.length === 0 || total === 0) {
    return (
      <div className="flex h-48 flex-col items-center justify-center gap-1 text-center">
        <p className="text-sm font-medium text-foreground">No spending yet this month</p>
        <p className="text-xs text-muted-foreground">Your category breakdown will appear here.</p>
      </div>
    );
  }

  const sorted = [...data].sort((a, b) => b.amount - a.amount);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative mx-auto h-44 w-44 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sorted}
              dataKey="amount"
              nameKey="category"
              innerRadius="65%"
              outerRadius="100%"
              paddingAngle={2}
              stroke="var(--card)"
              strokeWidth={2}
            >
              {sorted.map((slice) => (
                <Cell key={slice.category} fill={CATEGORY_COLORS[slice.category]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [
                formatCurrency(Number(value) || 0, currency),
                CATEGORY_LABELS[name as TransactionCategory],
              ]}
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 12,
                color: "var(--popover-foreground)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground">Total spent</span>
          <span className="text-lg font-bold text-foreground">{formatCurrency(total, currency)}</span>
        </div>
      </div>

      <ul className="min-w-0 flex-1 space-y-2">
        {sorted.map((slice) => (
          <li key={slice.category} className="flex items-center justify-between gap-2 text-sm">
            <span className="flex min-w-0 items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[slice.category] }}
              />
              <span className="truncate text-foreground">{CATEGORY_LABELS[slice.category]}</span>
            </span>
            <span className="shrink-0 font-medium tabular-nums text-foreground">
              {formatCurrency(slice.amount, currency)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
