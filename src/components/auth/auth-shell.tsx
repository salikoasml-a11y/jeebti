import Link from "next/link";
import { JeebtiBankLogo } from "@/components/auth/jeebti-bank-logo";
import { LanguageSwitcher } from "@/components/language-switcher";

export function AuthShell({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[oklch(0.95_0.02_240)] via-[oklch(0.97_0.015_90)] to-[oklch(0.94_0.03_85)] px-4 py-10 dark:from-[oklch(0.16_0.03_265)] dark:via-[oklch(0.14_0.02_265)] dark:to-[oklch(0.12_0.02_85)]">
      <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-jeebti-navy/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-jeebti-gold/20 blur-3xl" />

      <div className="absolute right-4 top-4">
        <LanguageSwitcher />
      </div>

      <Link href="/" className="relative mb-6 flex flex-col items-center gap-1">
        <JeebtiBankLogo size={84} />
      </Link>

      <div className="relative w-full max-w-md rounded-3xl border border-black/5 bg-card/90 p-6 shadow-xl backdrop-blur-sm sm:p-8 dark:border-white/10">
        {children}
      </div>

      {footer && <div className="relative mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
    </div>
  );
}
