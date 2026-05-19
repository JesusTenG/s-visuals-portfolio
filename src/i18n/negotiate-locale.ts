import { defaultLocale, type Locale } from "./config";

/**
 * Picks `de` or `en` from an Accept-Language header (RFC 9110).
 * German variants (de-DE, de-AT, …) map to `de`. Falls back to `defaultLocale`.
 */
export function negotiateLocaleFromAcceptLanguage(
  acceptLanguage: string | null | undefined,
): Locale {
  if (!acceptLanguage) return defaultLocale;

  const candidates = acceptLanguage
    .split(",")
    .map((part) => {
      const [rawTag, ...params] = part.trim().split(";");
      const tag = rawTag.trim().toLowerCase();
      let quality = 1;
      for (const param of params) {
        const q = param.trim();
        if (q.startsWith("q=")) {
          const parsed = Number.parseFloat(q.slice(2));
          if (!Number.isNaN(parsed)) quality = parsed;
        }
      }
      const base = tag.split("-")[0] ?? tag;
      return { base, quality };
    })
    .filter(({ quality }) => quality > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const { base } of candidates) {
    if (base === "de") return "de";
    if (base === "en") return "en";
  }

  return defaultLocale;
}
