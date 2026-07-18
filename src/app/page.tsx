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
import { LanguageSwitcher } from "@/components/language-switcher";
import { JeebtiLogo } from "@/components/marketing/jeebti-logo";
import { useTranslation } from "@/hooks/use-translation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  const { t } = useTranslation();

  const navLinks = [
    { key: "landing.nav.features", href: "#features" },
    { key: "landing.nav.security", href: "#security" },
    { key: "landing.nav.help", href: "/help" },
  ];

  const features = [
    { icon: Wallet, titleKey: "landing.features.wallet.title", descKey: "landing.features.wallet.description" },
    { icon: Send, titleKey: "landing.features.send.title", descKey: "landing.features.send.description" },
    { icon: CreditCard, titleKey: "landing.features.cards.title", descKey: "landing.features.cards.description" },
    { icon: PiggyBank, titleKey: "landing.features.savings.title", descKey: "landing.features.savings.description" },
    { icon: QrCode, titleKey: "landing.features.qr.title", descKey: "landing.features.qr.description" },
    { icon: ShieldCheck, titleKey: "landing.features.security.title", descKey: "landing.features.security.description" },
  ];

  const stats = [
    { value: "50k+", labelKey: "landing.stats.activeUsers" },
    { value: "4.9★", labelKey: "landing.stats.appRating" },
    { value: "£2.1B+", labelKey: "landing.stats.processedVolume" },
    { value: "180+", labelKey: "landing.stats.countries" },
  ];

  const securityPoints = [
    { icon: Lock, titleKey: "landing.security.encryption.title", descKey: "landing.security.encryption.description" },
    { icon: Fingerprint, titleKey: "landing.security.biometric.title", descKey: "landing.security.biometric.description" },
    { icon: BellRing, titleKey: "landing.security.fraud.title", descKey: "landing.security.fraud.description" },
  ];

  const steps = [
    { step: "01", titleKey: "landing.howItWorks.step1.title", descKey: "landing.howItWorks.step1.description" },
    { step: "02", titleKey: "landing.howItWorks.step2.title", descKey: "landing.howItWorks.step2.description" },
    { step: "03", titleKey: "landing.howItWorks.step3.title", descKey: "landing.howItWorks.step3.description" },
  ];

  const footerColumns = [
    {
      titleKey: "landing.footer.product",
      links: [
        { labelKey: "landing.footer.features", href: "#features" },
        { labelKey: "landing.footer.security", href: "#security" },
        { labelKey: "landing.footer.cards", href: "#features" },
        { labelKey: "landing.footer.savings", href: "#features" },
      ],
    },
    {
      titleKey: "landing.footer.company",
      links: [
        { labelKey: "landing.footer.aboutUs", href: "/help" },
        { labelKey: "landing.footer.careers", href: "/help" },
        { labelKey: "landing.footer.press", href: "/help" },
        { labelKey: "landing.footer.blog", href: "/help" },
      ],
    },
    {
      titleKey: "landing.footer.legal",
      links: [
        { labelKey: "landing.footer.terms", href: "/help" },
        { labelKey: "landing.footer.privacy", href: "/help" },
        { labelKey: "landing.footer.cookies", href: "/help" },
      ],
    },
    {
      titleKey: "landing.footer.support",
      links: [
        { labelKey: "landing.footer.helpCenter", href: "/help" },
        { labelKey: "landing.footer.contactUs", href: "/help" },
        { labelKey: "landing.footer.status", href: "/help" },
      ],
    },
  ];

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
                key={link.key}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(link.key)}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">{t("landing.nav.login")}</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">
                {t("landing.nav.getStarted")}
                <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <LanguageSwitcher />
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
                    <SheetClose asChild key={link.key}>
                      <a
                        href={link.href}
                        className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        {t(link.key)}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-6 flex flex-col gap-3">
                  <SheetClose asChild>
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/login">{t("landing.nav.login")}</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button size="lg" asChild>
                      <Link href="/signup">
                        {t("landing.nav.getStarted")}
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
                {t("landing.hero.badge")}
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {t("landing.hero.title")}
              </h1>
              <p className="mt-5 max-w-lg text-lg text-muted-foreground text-pretty">{t("landing.hero.subtitle")}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-11 px-6 text-base" asChild>
                  <Link href="/signup">
                    {t("landing.hero.getStartedFree")}
                    <ArrowRight />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-11 px-6 text-base" asChild>
                  <Link href="/login">{t("landing.hero.login")}</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-jeebti-brand text-jeebti-brand" />
                  <span className="font-medium text-foreground">4.9</span> {t("landing.hero.rating")}
                </div>
                <span className="text-border">•</span>
                <div className="flex items-center gap-1">
                  <Users className="size-4" />
                  <span className="font-medium text-foreground">50k+</span> {t("landing.hero.users")}
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
                    <span className="text-sm font-medium text-white/80">{t("landing.hero.totalBalance")}</span>
                    <Wallet className="size-5 text-white/80" />
                  </div>
                  <p className="mt-2 text-3xl font-bold tracking-tight">£12,480.32</p>
                  <div className="mt-4 flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium">
                      <ArrowUpRight className="size-3" />
                      +£1,240 {t("landing.hero.thisMonth")}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <p className="text-xs font-medium text-muted-foreground">{t("landing.hero.recentActivity")}</p>
                  {[
                    { nameKey: "landing.hero.salaryDeposit", amount: "+£3,200.00", icon: ArrowDownLeft, positive: true },
                    { nameKey: "landing.hero.groceryStore", amount: "-£64.20", icon: ArrowUpRight, positive: false },
                    { nameKey: "landing.hero.savingsHoliday", amount: "-£150.00", icon: PiggyBank, positive: false },
                  ].map((tx) => (
                    <div key={tx.nameKey} className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2.5">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-full bg-background text-jeebti-brand">
                          <tx.icon className="size-4" />
                        </span>
                        <span className="text-sm font-medium">{t(tx.nameKey)}</span>
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
              <FadeIn key={stat.labelKey} delay={i * 0.05} className="text-center">
                <p className="text-2xl font-bold tracking-tight text-jeebti-brand sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t(stat.labelKey)}</p>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("landing.features.heading")}</h2>
            <p className="mt-3 text-lg text-muted-foreground text-pretty">{t("landing.features.subheading")}</p>
          </FadeIn>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <FadeIn key={feature.titleKey} delay={i * 0.06}>
                <Card className="h-full gap-3 p-6 transition-shadow hover:shadow-lg">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-jeebti-brand/10 text-jeebti-brand">
                    <feature.icon className="size-5" />
                  </span>
                  <h3 className="mt-1 font-heading text-lg font-semibold">{t(feature.titleKey)}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t(feature.descKey)}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-muted/40 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("landing.howItWorks.heading")}</h2>
              <p className="mt-3 text-lg text-muted-foreground text-pretty">{t("landing.howItWorks.subheading")}</p>
            </FadeIn>
            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {steps.map((item, i) => (
                <FadeIn key={item.step} delay={i * 0.08} className="relative">
                  <span className="text-4xl font-bold text-jeebti-brand/20">{item.step}</span>
                  <h3 className="mt-2 font-heading text-lg font-semibold">{t(item.titleKey)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(item.descKey)}</p>
                  {i < 2 && (
                    <ChevronRight className="absolute top-2 -right-4 hidden size-5 text-muted-foreground/40 sm:block rtl:rotate-180" />
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
                {t("landing.security.badge")}
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t("landing.security.heading")}</h2>
              <p className="mt-3 text-lg text-muted-foreground text-pretty">{t("landing.security.subheading")}</p>
              <div className="mt-8 flex flex-col gap-6">
                {securityPoints.map((point) => (
                  <div key={point.titleKey} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-jeebti-brand/10 text-jeebti-brand">
                      <point.icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-heading font-semibold">{t(point.titleKey)}</h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">{t(point.descKey)}</p>
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
                      <p className="font-heading font-semibold">{t("landing.security.card.accountProtected")}</p>
                      <p className="text-xs text-muted-foreground">{t("landing.security.card.twoFactorActive")}</p>
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
                      <p className="font-heading font-semibold">{t("landing.security.card.biometricLogin")}</p>
                      <p className="text-xs text-muted-foreground">{t("landing.security.card.faceIdEnabled")}</p>
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
                      <p className="font-heading font-semibold">{t("landing.security.card.fraudMonitoring")}</p>
                      <p className="text-xs text-muted-foreground">{t("landing.security.card.realTimeAlerts")}</p>
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
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t("landing.cta.heading")}</h2>
              <p className="mx-auto mt-3 max-w-lg text-lg text-white/80 text-pretty">{t("landing.cta.subheading")}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-11 bg-white px-6 text-base text-jeebti-brand hover:bg-white/90"
                  asChild
                >
                  <Link href="/signup">
                    {t("landing.cta.getStartedFree")}
                    <ArrowRight />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 border-white/30 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link href="/login">{t("landing.cta.login")}</Link>
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
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">{t("landing.footer.tagline")}</p>
              <div className="mt-4 flex items-center gap-3 text-muted-foreground">
                <Globe className="size-4" aria-hidden />
                <MessageCircle className="size-4" aria-hidden />
                <Mail className="size-4" aria-hidden />
              </div>
            </div>
            {footerColumns.map((col) => (
              <div key={col.titleKey}>
                <h3 className="font-heading text-sm font-semibold">{t(col.titleKey)}</h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.labelKey}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {t(link.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Jeebti. {t("landing.footer.rights")}</p>
            <p className="max-w-md text-xs text-muted-foreground">{t("landing.footer.disclaimer")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
