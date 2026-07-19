"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  ArrowLeftRight,
  CreditCard,
  LifeBuoy,
  BarChart3,
  ScrollText,
  LogOut,
  Menu,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";
import { JeebtiMark } from "@/components/jeebti-mark";

const ADMIN_NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/kyc", label: "KYC Review", icon: ShieldCheck },
  { href: "/admin/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/admin/cards", label: "Cards", icon: CreditCard },
  { href: "/admin/tickets", label: "Support Tickets", icon: LifeBuoy },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/audit-logs", label: "Audit Logs", icon: ScrollText },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, status, init, signOut } = useAuthStore();

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login?redirect=/admin");
    else if (status === "authenticated" && user && user.role !== "admin") router.replace("/dashboard");
  }, [status, user, router]);

  if (status === "idle" || status === "loading" || !user || user.role !== "admin") {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 animate-spin rounded-full border-2 border-jeebti-brand border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading admin console…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh bg-background">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-sidebar lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-2 px-6">
          <JeebtiMark size={32} />
          <div>
            <p className="text-sm font-bold leading-none tracking-tight">Jeebti</p>
            <p className="text-[11px] leading-none text-muted-foreground mt-0.5">Admin Console</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {ADMIN_NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-jeebti-brand text-white shadow-sm" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="size-4.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-3">
          <Link href="/dashboard" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent">
            Exit to customer app
          </Link>
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
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetTitle className="sr-only">Admin navigation</SheetTitle>
                <div className="flex h-16 items-center gap-2 border-b border-border px-6">
                  <JeebtiMark size={28} />
                  <span className="text-lg font-bold tracking-tight">Jeebti Admin</span>
                </div>
                <nav className="space-y-1 px-3 py-4">
                  {ADMIN_NAV.map((item) => {
                    const active = pathname === item.href;
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
                <div className="border-t border-border p-3">
                  <Link
                    href="/dashboard"
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent"
                  >
                    Exit to customer app
                  </Link>
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
              </SheetContent>
            </Sheet>
            <span className="text-base font-bold">Admin Console</span>
          </div>
          <Badge variant="outline" className="hidden gap-1.5 border-jeebti-brand/30 text-jeebti-brand lg:flex">
            <ShieldCheck className="size-3.5" /> Administrator
          </Badge>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Avatar className="size-8 border border-border">
              <AvatarFallback className="bg-slate-900 text-xs text-white dark:bg-white dark:text-slate-900">
                {initials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 pb-8">{children}</main>
      </div>
    </div>
  );
}
