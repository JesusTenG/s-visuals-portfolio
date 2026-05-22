import type { Locale } from "@/i18n/config";

export type WorkCaseContentDrop = {
  title: string;
  type: string;
  posterSrc: string;
  previewSrc?: string;
  lightboxSrc?: string;
  alt: string;
  description?: string;
};

export type WorkCaseLocaleContent = {
  title: string;
  label: string;
  description: string;
  overview: string;
  alt: string;
  role: string[];
  platforms: string[];
  formats: string[];
  scope: string[];
  contentDrops: WorkCaseContentDrop[];
};

export type WorkCase = {
  slug: string;
  posterSrc: string;
  /** Temporary placeholder — exclude from sitemap and set noindex until real case content ships. */
  isPlaceholder?: boolean;
  localized: Record<Locale, WorkCaseLocaleContent>;
};

export const workCases: WorkCase[] = [
  {
    slug: "prep-my-meal-leon-haegele",
    posterSrc: "/assets/videos/posters/random/PIZZZZZA-poster.webp",
    localized: {
      en: {
        title: "Prep My Meal × Leon Hägele",
        label: "Commercial Social Ad",
        description:
          "Commercial edit and production for Prep My Meal with creator Leon Hägele — built as a high-impact social ad for the feed.",
        overview:
          "Simon produced and edited the video used as a paid social ad for Prep My Meal. The collaboration with Leon Hägele focused on a clean, premium food aesthetic and a direct hook for social delivery.",
        alt: "Poster for Prep My Meal commercial collaboration with Leon Hägele",
        role: ["Video editing", "Production"],
        platforms: ["Instagram", "Paid social"],
        formats: ["Social ad", "Short-form commercial"],
        scope: [
          "Concept-to-feed commercial cut",
          "Visual pacing for paid social",
          "Premium brand look for Prep My Meal",
        ],
        contentDrops: [
          {
            title: "Prep My Meal Ad",
            type: "Social Ad",
            posterSrc: "/assets/videos/posters/random/PIZZZZZA-poster.webp",
            previewSrc: "/assets/videos/preview/random/PIZZZZZA-web.mp4",
            lightboxSrc: "/assets/videos/lightbox/random/PIZZZZZA-lightbox.mp4",
            alt: "Poster frame for Prep My Meal commercial edit by Simon Saad Visuals",
            description:
              "Main ad cut for @prepmymeal with @leon.haegele — shaped for social feeds and paid delivery.",
          },
        ],
      },
      de: {
        title: "Prep My Meal × Leon Hägele",
        label: "Werbevideo Social Ad",
        description:
          "Werbevideo-Produktion und Schnitt für Prep My Meal mit Creator Leon Hägele — umgesetzt als hochwertiger Social Ad für den Feed.",
        overview:
          "Simon hat das Video produziert und geschnitten, das als bezahlte Social Ad für Prep My Meal eingesetzt wurde. Die Zusammenarbeit mit Leon Hägele zielte auf eine cleane, premium Food-Ästhetik und einen direkten Hook für Social.",
        alt: "Posterbild für Prep My Meal Werbekooperation mit Leon Hägele",
        role: ["Videoschnitt", "Produktion"],
        platforms: ["Instagram", "Paid Social"],
        formats: ["Werbevideo", "Short-Form Commercial"],
        scope: [
          "Commercial-Schnitt für Paid Social",
          "Visuelles Pacing für Ads",
          "Premium-Look für Prep My Meal",
        ],
        contentDrops: [
          {
            title: "Prep My Meal Werbespot",
            type: "Social Ad",
            posterSrc: "/assets/videos/posters/random/PIZZZZZA-poster.webp",
            previewSrc: "/assets/videos/preview/random/PIZZZZZA-web.mp4",
            lightboxSrc: "/assets/videos/lightbox/random/PIZZZZZA-lightbox.mp4",
            alt: "Posterbild für Prep My Meal Werbespot von Simon Saad Visuals",
            description:
              "Haupt-Ad für @prepmymeal mit @leon.haegele — optimiert für Feed und Paid Social.",
          },
        ],
      },
    },
  },
  {
    slug: "client-one",
    isPlaceholder: true,
    posterSrc: "/assets/clients/client-one-poster.svg",
    localized: {
      en: {
        title: "Client One",
        label: "Ongoing Social Edits",
        description:
          "Recurring reels, campaign cuts and visual direction across multiple content drops.",
        overview: "Placeholder collaboration case — content coming soon.",
        alt: "Preview image for Client One collaboration",
        role: ["Video editing"],
        platforms: ["Instagram"],
        formats: ["Reels"],
        scope: ["Placeholder"],
        contentDrops: [
          {
            title: "Campaign Reel 01",
            type: "Reel",
            posterSrc: "/assets/clients/client-one/drop-01-poster.svg",
            alt: "Poster image for Client One campaign reel",
          },
        ],
      },
      de: {
        title: "Kunde Eins",
        label: "Ongoing Social Edits",
        description:
          "Wiederkehrende Reels, Kampagnen-Cuts und visuelle Richtung über mehrere Content-Drops.",
        overview: "Platzhalter-Case — Inhalt folgt.",
        alt: "Vorschaubild für Zusammenarbeit Kunde Eins",
        role: ["Videoschnitt"],
        platforms: ["Instagram"],
        formats: ["Reels"],
        scope: ["Platzhalter"],
        contentDrops: [
          {
            title: "Campaign Reel 01",
            type: "Reel",
            posterSrc: "/assets/clients/client-one/drop-01-poster.svg",
            alt: "Posterbild für Campaign Reel Kunde Eins",
          },
        ],
      },
    },
  },
  {
    slug: "client-two",
    isPlaceholder: true,
    posterSrc: "/assets/clients/client-two-poster.svg",
    localized: {
      en: {
        title: "Client Two",
        label: "Creator Content System",
        description:
          "A consistent editing language across short-form videos, launches and social content.",
        overview: "Placeholder collaboration case — content coming soon.",
        alt: "Preview image for Client Two collaboration",
        role: ["Video editing"],
        platforms: ["Instagram", "TikTok"],
        formats: ["Reels"],
        scope: ["Placeholder"],
        contentDrops: [
          {
            title: "Launch Week 01",
            type: "Reel",
            posterSrc: "/assets/clients/client-two/drop-01-poster.svg",
            alt: "Poster image for Client Two launch week reel",
          },
        ],
      },
      de: {
        title: "Kunde Zwei",
        label: "Creator Content System",
        description:
          "Eine konsistente Editing-Sprache für Short-Form-Videos, Launches und Social Content.",
        overview: "Platzhalter-Case — Inhalt folgt.",
        alt: "Vorschaubild für Zusammenarbeit Kunde Zwei",
        role: ["Videoschnitt"],
        platforms: ["Instagram", "TikTok"],
        formats: ["Reels"],
        scope: ["Platzhalter"],
        contentDrops: [
          {
            title: "Launch Week 01",
            type: "Reel",
            posterSrc: "/assets/clients/client-two/drop-01-poster.svg",
            alt: "Posterbild für Launch Week Reel Kunde Zwei",
          },
        ],
      },
    },
  },
  {
    slug: "client-three",
    isPlaceholder: true,
    posterSrc: "/assets/clients/client-three-poster.svg",
    localized: {
      en: {
        title: "Client Three",
        label: "Brand Visuals",
        description: "Premium campaign edits and atmospheric visuals shaped for social platforms.",
        overview: "Placeholder collaboration case — content coming soon.",
        alt: "Preview image for Client Three collaboration",
        role: ["Video editing"],
        platforms: ["Instagram"],
        formats: ["Brand spot"],
        scope: ["Placeholder"],
        contentDrops: [
          {
            title: "Brand Spot 01",
            type: "Brand Spot",
            posterSrc: "/assets/clients/client-three/drop-01-poster.svg",
            alt: "Poster image for Client Three brand spot",
          },
        ],
      },
      de: {
        title: "Kunde Drei",
        label: "Brand Visuals",
        description: "Premium Campaign Edits und atmosphärische Visuals für Social-Plattformen.",
        overview: "Platzhalter-Case — Inhalt folgt.",
        alt: "Vorschaubild für Zusammenarbeit Kunde Drei",
        role: ["Videoschnitt"],
        platforms: ["Instagram"],
        formats: ["Brand Spot"],
        scope: ["Platzhalter"],
        contentDrops: [
          {
            title: "Brand Spot 01",
            type: "Brand Spot",
            posterSrc: "/assets/clients/client-three/drop-01-poster.svg",
            alt: "Posterbild für Brand Spot Kunde Drei",
          },
        ],
      },
    },
  },
];

export function getWorkCaseBySlug(slug: string): WorkCase | undefined {
  return workCases.find((c) => c.slug === slug);
}

export function getWorkCaseContent(
  workCase: WorkCase,
  locale: Locale,
): WorkCaseLocaleContent {
  return workCase.localized[locale];
}

export function isPlaceholderWorkCase(workCase: WorkCase): boolean {
  return workCase.isPlaceholder === true;
}

/** Cases that are ready for indexing (sitemap, no noindex). */
export function getIndexableWorkCases(): WorkCase[] {
  return workCases.filter((c) => !isPlaceholderWorkCase(c));
}
