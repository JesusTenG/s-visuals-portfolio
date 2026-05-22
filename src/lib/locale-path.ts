import { isLocale, type Locale } from "@/i18n/config";

/**
 * Switches the locale segment in a pathname while preserving the rest of the path.
 * `/de/work/foo` + `en` → `/en/work/foo`
 */
export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLocale}`;
  }

  if (isLocale(segments[0])) {
    segments[0] = targetLocale;
    return `/${segments.join("/")}`;
  }

  return `/${targetLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
