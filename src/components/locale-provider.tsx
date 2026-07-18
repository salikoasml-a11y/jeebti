"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocaleStore } from "@/store/locale-store";
import { isRtl } from "@/lib/i18n/types";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocaleStore((s) => s.locale);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    // The admin console is English-only by design and must never mirror to
    // RTL, regardless of the customer-facing language the same browser has
    // previously chosen (the locale is a single global store, not scoped to
    // a route group, so this has to be enforced here explicitly).
    if (isAdmin) {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
      return;
    }
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl(locale) ? "rtl" : "ltr";
  }, [locale, isAdmin]);

  return <>{children}</>;
}
