export const LOCALES = ["en", "fr", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};

export const RTL_LOCALES: Locale[] = ["ar"];

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

/** A dictionary namespace: one flat-ish object of keys -> per-locale strings. */
export type Namespace = Record<string, Record<Locale, string>>;
