import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WorkVideoItem } from "@/i18n/dictionaries";
import type { WorkCaseLocaleContent } from "@/data/work-cases";
import { buildCanonical } from "@/lib/seo";
import { INSTAGRAM_URL, SITE_NAME } from "@/lib/site";

export function buildHomeJsonLd(locale: Locale, dict: Dictionary) {
  const url = buildCanonical(locale);

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url,
      inLanguage: locale === "de" ? "de-DE" : "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: dict.meta.title,
      description: dict.meta.description,
      url,
      inLanguage: locale === "de" ? "de-DE" : "en-US",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: buildCanonical(locale) },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Simon Saad",
      url,
      jobTitle: locale === "de" ? "Video Editor & Produzent" : "Video Editor & Producer",
      sameAs: [INSTAGRAM_URL],
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: SITE_NAME,
      url,
      areaServed: {
        "@type": "Country",
        name: "Germany",
      },
      serviceType: dict.services.items.map((item) => item.title),
      description: dict.meta.description,
    },
  ];
}

export function buildFaqJsonLd(dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildCaseJsonLd(
  locale: Locale,
  slug: string,
  content: WorkCaseLocaleContent,
) {
  const url = buildCanonical(locale, `/work/${slug}`);

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: content.title,
      description: content.description,
      url,
      inLanguage: locale === "de" ? "de-DE" : "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "de" ? "Start" : "Home",
          item: buildCanonical(locale),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: locale === "de" ? "Work" : "Work",
          item: `${buildCanonical(locale)}#work`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: content.title,
          item: url,
        },
      ],
    },
  ];
}

export function buildCaseVideoJsonLd(
  locale: Locale,
  slug: string,
  content: WorkCaseLocaleContent,
) {
  const pageUrl = buildCanonical(locale, `/work/${slug}`);

  return content.contentDrops
    .filter((drop) => drop.lightboxSrc)
    .map((drop) => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: drop.title,
      description: drop.description ?? content.description,
      thumbnailUrl: new URL(drop.posterSrc, buildCanonical(locale)).toString(),
      contentUrl: new URL(drop.lightboxSrc!, buildCanonical(locale)).toString(),
      embedUrl: pageUrl,
      inLanguage: locale === "de" ? "de-DE" : "en-US",
    }));
}

export function buildClientStoryJsonLd(
  locale: Locale,
  slug: string,
  title: string,
  description: string,
) {
  const url = buildCanonical(locale, `/client-stories/${slug}`);

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url,
      inLanguage: locale === "de" ? "de-DE" : "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "de" ? "Start" : "Home",
          item: buildCanonical(locale),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: locale === "de" ? "Kooperationen" : "Collaborations",
          item: `${buildCanonical(locale)}#collaborations`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: title,
          item: url,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: SITE_NAME,
      url: buildCanonical(locale),
      areaServed: { "@type": "Country", name: "Germany" },
      description,
    },
  ];
}

export function buildClientStoryVideoJsonLd(
  locale: Locale,
  slug: string,
  items: WorkVideoItem[],
  fallbackDescription: string,
) {
  const pageUrl = buildCanonical(locale, `/client-stories/${slug}`);
  const inLanguage = locale === "de" ? "de-DE" : "en-US";

  return items
    .filter((item) => Boolean(item.lightboxSrc && item.posterSrc))
    .map((item) => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: item.title,
      description: item.description || fallbackDescription,
      thumbnailUrl: new URL(item.posterSrc, buildCanonical(locale)).toString(),
      contentUrl: new URL(item.lightboxSrc, buildCanonical(locale)).toString(),
      embedUrl: pageUrl,
      inLanguage,
    }));
}
