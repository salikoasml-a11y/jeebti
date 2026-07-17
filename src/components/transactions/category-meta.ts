import {
  ShoppingCart,
  Car,
  Clapperboard,
  Utensils,
  ShoppingBag,
  Receipt,
  Wallet as WalletIcon,
  ArrowLeftRight,
  Repeat,
  HeartPulse,
  Plane,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";
import type { TransactionCategory, TransactionStatus } from "@/lib/types";

// Fixed categorical color order — from the validated Jeebti data-viz palette.
// Assigned in a fixed order per category so identity never shifts across filters.
export const CATEGORY_COLORS: Record<TransactionCategory, string> = {
  groceries: "#2a78d6", // blue
  transport: "#008300", // green
  entertainment: "#e87ba4", // magenta
  dining: "#eda100", // yellow
  shopping: "#1baf7a", // aqua
  bills: "#eb6834", // orange
  income: "#4a3aa7", // violet
  travel: "#e34948", // red
  subscriptions: "#eb6834",
  health: "#1baf7a",
  transfer: "#4a3aa7",
  other: "#898781", // muted
};

export const CATEGORY_ICONS: Record<TransactionCategory, LucideIcon> = {
  groceries: ShoppingCart,
  transport: Car,
  entertainment: Clapperboard,
  dining: Utensils,
  shopping: ShoppingBag,
  bills: Receipt,
  income: WalletIcon,
  transfer: ArrowLeftRight,
  subscriptions: Repeat,
  health: HeartPulse,
  travel: Plane,
  other: MoreHorizontal,
};

export const CATEGORY_LABELS: Record<TransactionCategory, string> = {
  groceries: "Groceries",
  transport: "Transport",
  entertainment: "Entertainment",
  dining: "Dining",
  shopping: "Shopping",
  bills: "Bills",
  income: "Income",
  transfer: "Transfer",
  subscriptions: "Subscriptions",
  health: "Health",
  travel: "Travel",
  other: "Other",
};

export const STATUS_STYLES: Record<TransactionStatus, string> = {
  completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  failed: "bg-destructive/10 text-destructive",
  reversed: "bg-muted text-muted-foreground",
};

export const STATUS_LABELS: Record<TransactionStatus, string> = {
  completed: "Completed",
  pending: "Pending",
  failed: "Failed",
  reversed: "Reversed",
};
