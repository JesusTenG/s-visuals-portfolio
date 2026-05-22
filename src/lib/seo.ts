import type { Metadata } from "next";

import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { DEFAULT_OG_IMAGE_PATH, SITE_NAME } from "@/lib/site";

/** Production site URL — used for metadataBase, canonicals, and sitemap. */
export const siteUrl = new URL("https://simonsaadvisuals.de");

/**
 * Builds a locale-prefixed path (e.g. `/de`, `/de/work/slug`).
 * `pathname` may be `""`, `"/"`, or `"/work/foo"`.
 */
export function localePath(locale: Locale, pathname = ""): string {
  const trimmed = pathname.replace(/^\/+/, "");
  return trimmed ? `/${locale}/${trimmed}` : `/${locale}`;
}

/** hreflang map for a page (relative paths; resolved via metadataBase). */
export function buildLanguageAlternates(pathname = ""): NonNullable<
  Metadata["alternates"]
>["languages"] {
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    languages[locale] = localePath(locale, pathname);
  }

  languages["x-default"] = localePath(defaultLocale, pathname);
  return languages;
}

/** Absolute canonical URL for a locale + pathname. */
export function buildCanonical(locale: Locale, pathname = ""): string {
  return new URL(localePath(locale, pathname), siteUrl).toString();
}

/** Canonical + hreflang alternates for a localized page. */
export function buildPageAlternates(
  locale: Locale,
  pathname = "",
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: buildCanonical(locale, pathname),
    languages: buildLanguageAlternates(pathname),
  };
}

type PageMetadataInput = Readonly<{
  locale: Locale;
  pathname?: string;
  title: string;
  description: string;
  ogImagePath?: string;
  robots?: Metadata["robots"];
}>;

/** Full metadata bundle: alternates, Open Graph, Twitter, locale. */
export function buildPageMetadata({
  locale,
  pathname = "",
  title,
  description,
  ogImagePath = DEFAULT_OG_IMAGE_PATH,
  robots,
}: PageMetadataInput): Metadata {
  const canonical = buildCanonical(locale, pathname);
  const ogLocale = locale === "de" ? "de_DE" : "en_US";
  const alternateOgLocale = locale === "de" ? "en_US" : "de_DE";

  return {
    title,
    description,
    alternates: buildPageAlternates(locale, pathname),
    robots,
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: [alternateOgLocale],
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: ogImagePath,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImagePath],
    },
  };
}
