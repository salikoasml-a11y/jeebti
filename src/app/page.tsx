"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Wallet,
  Send,
  CreditCard,
  PiggyBank,
  QrCode,
  ShieldCheck,
  Menu,
  Fingerprint,
  Lock,
  BellRing,
  Star,
  Users,
  TrendingUp,
  Globe,
  Mail,
  MessageCircle,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { JeebtiLogo } from "@/components/marketing/jeebti-logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "Help", href: "/help" },
];

const features = [
  {
    icon: Wallet,
    title: "Smart Wallet",
    description: "One account for everyday spending with real-time balance tracking and instant insights.",
  },
  {
    icon: Send,
    title: "Send & Receive",
    description: "Move money instantly to friends, family, or businesses — no fees, no waiting around.",
  },
  {
    icon: CreditCard,
    title: "Virtual & Physical Cards",
    description: "Freeze, top up, and control spending limits on virtual or physical cards in seconds.",
  },
  {
    icon: PiggyBank,
    title: "Savings Goals",
    description: "Set a goal, round up spare change automatically, and watch your savings grow.",
  },
  {
    icon: QrCode,
    title: "QR Payments",
    description: "Scan to pay or get paid in-store — fast, contactless, and completely secure.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Security",
    description: "2FA, biometric login, and real-time fraud alerts keep your money protected 24/7.",
  },
];

const stats = [
  { value: "50k+", label: "Active users" },
  { value: "4.9★", label: "App rating" },
  { value: "£2.1B+", label: "Processed volume" },
  { value: "180+", label: "Countries supported" },
];

const securityPoints = [
  {
    icon: Lock,
    title: "End-to-end encryption",
    description: "Every transaction and message is encrypted in transit and at rest, using industry-standard protocols.",
  },
  {
    icon: Fingerprint,
    title: "Biometric login",
    description: "Face ID and fingerprint sign-in mean only you can access your account, even if your device is lost.",
  },
  {
    icon: BellRing,
    title: "Real-time fraud alerts",
    description: "Our monitoring systems flag suspicious activity instantly, so you can act before it becomes a problem.",
  },
];

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Security", href: "#security" },
      { label: "Cards", href: "#features" },
      { label: "Savings", href: "#features" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/help" },
      { label: "Careers", href: "/help" },
      { label: "Press", href: "/help" },
      { label: "Blog", href: "/help" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/help" },
      { label: "Privacy Policy", href: "/help" },
      { label: "Cookie Policy", href: "/help" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Contact us", href: "/help" },
      { label: "Status", href: "/help" },
    ],
  },
];

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Jeebti home">
            <JeebtiLogo />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">
                Get started
                <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-4/5 p-6">
                <SheetHeader className="p-0">
                  <SheetTitle>
                    <JeebtiLogo />
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.label}>
                      <a
                        href={link.href}
                        className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-6 flex flex-col gap-3">
                  <SheetClose asChild>
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/login">Log in</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button size="lg" asChild>
                      <Link href="/signup">
                        Get started
                        <ArrowRight />
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,var(--jeebti-brand),transparent)] opacity-[0.12]"
          />
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:py-28 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <ShieldCheck className="size-3.5 text-jeebti-brand" />
                Built on licensed banking infrastructure
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Banking Made Simple.
              </h1>
              <p className="mt-5 max-w-lg text-lg text-muted-foreground text-pretty">
                Jeebti brings your spending, saving, and payments into one beautifully simple app —
                so you always know where your money stands.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-11 px-6 text-base" asChild>
                  <Link href="/signup">
                    Get started free
                    <ArrowRight />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-11 px-6 text-base" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-jeebti-brand text-jeebti-brand" />
                  <span className="font-medium text-foreground">4.9</span> rating
                </div>
                <span className="text-border">•</span>
                <div className="flex items-center gap-1">
                  <Users className="size-4" />
                  <span className="font-medium text-foreground">50k+</span> users
                </div>
              </div>
            </motion.div>

            {/* Phone / dashboard mock */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="relative mx-auto w-full max-w-sm"
            >
              <div
                aria-hidden
                className="absolute -inset-8 -z-10 rounded-[3rem] bg-jeebti-brand/10 blur-2xl"
              />
              <Card className="gap-0 overflow-hidden border-none p-0 shadow-2xl ring-1 ring-foreground/10">
                <div className="bg-jeebti-brand p-6 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white/80">Total balance</span>
                    <Wallet className="size-5 text-white/80" />
                  </div>
                  <p className="mt-2 text-3xl font-bold tracking-tight">£12,480.32</p>
                  <div className="mt-4 flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium">
                      <ArrowUpRight className="size-3" />
                      +£1,240 this month
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <p className="text-xs font-medium text-muted-foreground">Recent activity</p>
                  {[
                    { name: "Salary deposit", amount: "+£3,200.00", icon: ArrowDownLeft, positive: true },
                    { name: "Grocery Store", amount: "-£64.20", icon: ArrowUpRight, positive: false },
                    { name: "Savings — Holiday", amount: "-£150.00", icon: PiggyBank, positive: false },
                  ].map((tx) => (
                    <div key={tx.name} className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2.5">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-full bg-background text-jeebti-brand">
                          <tx.icon className="size-4" />
                        </span>
                        <span className="text-sm font-medium">{tx.name}</span>
                      </div>
                      <span
                        className={`text-sm font-semibold ${tx.positive ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}
                      >
                        {tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-y border-border bg-muted/40">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.05} className="text-center">
                <p className="text-2xl font-bold tracking-tight text-jeebti-brand sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything your money needs</h2>
            <p className="mt-3 text-lg text-muted-foreground text-pretty">
              A full banking toolkit, designed for how you actually live — simple, fast, and always in your pocket.
            </p>
          </FadeIn>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.06}>
                <Card className="h-full gap-3 p-6 transition-shadow hover:shadow-lg">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-jeebti-brand/10 text-jeebti-brand">
                    <feature.icon className="size-5" />
                  </span>
                  <h3 className="mt-1 font-heading text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-muted/40 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get started in minutes</h2>
              <p className="mt-3 text-lg text-muted-foreground text-pretty">
                No branch visits, no paperwork — just a phone and a few minutes.
              </p>
            </FadeIn>
            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {[
                { step: "01", title: "Sign up free", description: "Create your account in under two minutes — no fees, no minimum balance." },
                { step: "02", title: "Verify your identity", description: "Quick, secure identity checks keep your account and money protected." },
                { step: "03", title: "Start banking", description: "Send, save, and spend instantly with your new virtual card and account." },
              ].map((item, i) => (
                <FadeIn key={item.step} delay={i * 0.08} className="relative">
                  <span className="text-4xl font-bold text-jeebti-brand/20">{item.step}</span>
                  <h3 className="mt-2 font-heading text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  {i < 2 && (
                    <ChevronRight className="absolute top-2 -right-4 hidden size-5 text-muted-foreground/40 sm:block" />
                  )}
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Security */}
        <section id="security" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-jeebti-brand/10 px-3 py-1 text-xs font-medium text-jeebti-brand">
                <ShieldCheck className="size-3.5" />
                Security first
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Your money, protected around the clock
              </h2>
              <p className="mt-3 text-lg text-muted-foreground text-pretty">
                Jeebti is built on licensed banking infrastructure with layers of protection designed to keep
                your account safe, no matter what.
              </p>
              <div className="mt-8 flex flex-col gap-6">
                {securityPoints.map((point) => (
                  <div key={point.title} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-jeebti-brand/10 text-jeebti-brand">
                      <point.icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-heading font-semibold">{point.title}</h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Card className="gap-5 p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="size-5" />
                    </span>
                    <div>
                      <p className="font-heading font-semibold">Account protected</p>
                      <p className="text-xs text-muted-foreground">Two-factor authentication active</p>
                    </div>
                  </div>
                </div>
                <div className="h-px bg-border" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full bg-jeebti-brand/10 text-jeebti-brand">
                      <Fingerprint className="size-5" />
                    </span>
                    <div>
                      <p className="font-heading font-semibold">Biometric login</p>
                      <p className="text-xs text-muted-foreground">Face ID enabled on this device</p>
                    </div>
                  </div>
                </div>
                <div className="h-px bg-border" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <BellRing className="size-5" />
                    </span>
                    <div>
                      <p className="font-heading font-semibold">Fraud monitoring</p>
                      <p className="text-xs text-muted-foreground">Real-time alerts on unusual activity</p>
                    </div>
                  </div>
                </div>
              </Card>
            </FadeIn>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
          <FadeIn>
            <Card className="relative overflow-hidden border-none bg-jeebti-brand p-10 text-center text-white sm:p-16">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,white,transparent)] opacity-[0.08]"
              />
              <TrendingUp className="mx-auto size-10 text-white/80" />
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Ready to simplify your banking?</h2>
              <p className="mx-auto mt-3 max-w-lg text-lg text-white/80 text-pretty">
                Join 50,000+ people who already bank smarter with Jeebti. It takes less than two minutes to sign up.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-11 bg-white px-6 text-base text-jeebti-brand hover:bg-white/90"
                  asChild
                >
                  <Link href="/signup">
                    Get started free
                    <ArrowRight />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 border-white/30 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link href="/login">Log in</Link>
                </Button>
              </div>
            </Card>
          </FadeIn>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <JeebtiLogo />
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Banking Made Simple. Everyday spending, saving, and payments — all in one app.
              </p>
              <div className="mt-4 flex items-center gap-3 text-muted-foreground">
                <Globe className="size-4" aria-hidden />
                <MessageCircle className="size-4" aria-hidden />
                <Mail className="size-4" aria-hidden />
              </div>
            </div>
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="font-heading text-sm font-semibold">{col.title}</h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Jeebti. All rights reserved.</p>
            <p className="max-w-md text-xs text-muted-foreground">
              Jeebti operates via a licensed banking partner. Jeebti is not a bank.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
