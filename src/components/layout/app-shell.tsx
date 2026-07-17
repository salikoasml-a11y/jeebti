"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CreditCard,
  PiggyBank,
  Send,
  Settings,
  User as UserIcon,
  HelpCircle,
  Bell,
  Menu,
  LogOut,
  ShieldCheck,
  QrCode,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useBankingStore } from "@/store/banking-store";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/cards", label: "Cards", icon: CreditCard },
  { href: "/savings", label: "Savings", icon: PiggyBank },
  { href: "/send", label: "Send Money", icon: Send },
  { href: "/qr", label: "QR Payments", icon: QrCode },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help Center", icon: HelpCircle },
];

const MOBILE_NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/send", label: "Send", icon: Send },
  { href: "/cards", label: "Cards", icon: CreditCard },
  { href: "/profile", label: "Profile", icon: UserIcon },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, status, init, signOut } = useAuthStore();
  const { load, notifications } = useBankingStore();

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  useEffect(() => {
    if (user) load(user.id);
  }, [user, load]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (status === "idle" || status === "loading" || !user) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 animate-spin rounded-full border-2 border-jeebti-brand border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading Jeebti…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-sidebar lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-2 px-6">
          <div className="flex size-8 items-center justify-center rounded-lg bg-jeebti-brand text-white font-bold">J</div>
          <span className="text-lg font-bold tracking-tight">Jeebti</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-jeebti-brand text-white shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="size-4.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-3">
          <button
            onClick={async () => {
              await signOut();
              router.replace("/login");
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-destructive"
          >
            <LogOut className="size-4.5" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-h-dvh flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex h-16 items-center gap-2 border-b border-border px-6">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-jeebti-brand text-white font-bold">J</div>
                  <span className="text-lg font-bold tracking-tight">Jeebti</span>
                </div>
                <nav className="space-y-1 px-3 py-4">
                  {NAV_ITEMS.map((item) => {
                    const active = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                          active ? "bg-jeebti-brand text-white" : "text-muted-foreground hover:bg-accent"
                        )}
                      >
                        <item.icon className="size-4.5" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
            <span className="text-base font-bold">Jeebti</span>
          </div>

          <div className="hidden lg:block">
            <p className="text-sm text-muted-foreground">
              Welcome back, <span className="font-semibold text-foreground">{user.firstName}</span>
            </p>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <Link href="/settings?tab=security">
              <Button variant="ghost" size="icon" aria-label="Security" className="hidden sm:inline-flex">
                <ShieldCheck className="size-4.5" />
              </Button>
            </Link>
            <Link href="/settings?tab=notifications" className="relative">
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="size-4.5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -right-0.5 -top-0.5 flex size-4.5 items-center justify-center rounded-full bg-red-500 p-0 text-[10px] text-white">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/profile">
              <Avatar className="size-8 cursor-pointer border border-border">
                <AvatarFallback className="bg-jeebti-brand text-xs text-white">
                  {initials(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>

        <main className="flex-1 pb-24 lg:pb-8">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-30 flex h-16 items-center justify-around border-t border-border bg-background/95 backdrop-blur-md lg:hidden">
        {MOBILE_NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium",
                active ? "text-jeebti-brand" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("size-5", active && "fill-jeebti-brand/10")} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
