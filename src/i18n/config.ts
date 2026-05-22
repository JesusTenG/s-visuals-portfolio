export const locales = ["en", "de"] as const;

export type Locale = (typeof locales)[number];

/** Primary SEO market — used for x-default, Accept-Language fallback, and html lang default. */
export const defaultLocale: Locale = "de";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "de" : "en";
}

