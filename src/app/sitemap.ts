import type { MetadataRoute } from "next";

import { getAllClientStories } from "@/data/client-stories";
import { getIndexableWorkCases } from "@/data/work-cases";
import { locales, type Locale } from "@/i18n/config";
import { buildLanguageAlternates, localePath, siteUrl } from "@/lib/seo";

function absoluteLocaleUrl(locale: Locale, pathname = ""): string {
  return new URL(localePath(locale, pathname), siteUrl).toString();
}

function alternatesForPath(pathname: string): NonNullable<MetadataRoute.Sitemap[number]["alternates"]> {
  const languages = buildLanguageAlternates(pathname) ?? {};
  const mapped: Record<string, string> = {};

  for (const [lang, path] of Object.entries(languages)) {
    if (typeof path !== "string") continue;
    mapped[lang] = new URL(path, siteUrl).toString();
  }

  return { languages: mapped };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const staticPaths = ["", "/impressum", "/datenschutz"] as const;

  for (const pathname of staticPaths) {
    for (const locale of locales) {
      entries.push({
        url: absoluteLocaleUrl(locale, pathname),
        lastModified,
        alternates: alternatesForPath(pathname),
      });
    }
  }

  for (const workCase of getIndexableWorkCases()) {
    const pathname = `/work/${workCase.slug}`;

    for (const locale of locales) {
      entries.push({
        url: absoluteLocaleUrl(locale, pathname),
        lastModified,
        alternates: alternatesForPath(pathname),
      });
    }
  }

  for (const story of getAllClientStories()) {
    const pathname = `/client-stories/${story.slug}`;

    for (const locale of locales) {
      entries.push({
        url: absoluteLocaleUrl(locale, pathname),
        lastModified,
        alternates: alternatesForPath(pathname),
      });
    }
  }

  return entries;
}
