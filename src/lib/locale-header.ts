import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

export const LOCALE_HEADER = "x-locale";

/** Read locale set by middleware (for root layout `html lang`). */
export function readLocaleFromHeaders(headerValue: string | null): Locale {
  if (headerValue && isLocale(headerValue)) return headerValue;
  return defaultLocale;
}
