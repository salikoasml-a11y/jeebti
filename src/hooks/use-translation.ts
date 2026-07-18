import { useCallback } from "react";
import { useLocaleStore } from "@/store/locale-store";
import { dictionary } from "@/lib/i18n/dict";
import { isRtl, type Locale } from "@/lib/i18n/types";

export function useTranslation() {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const entry = dictionary[key];
      let str = entry ? entry[locale] || entry.en : key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replace(new RegExp(`{${k}}`, "g"), String(v));
        }
      }
      return str;
    },
    [locale]
  );

  return { t, locale, setLocale, dir: isRtl(locale) ? "rtl" : "ltr" } as const;
}

export type { Locale };
