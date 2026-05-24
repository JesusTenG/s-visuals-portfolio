import type { Locale } from "@/i18n/config";
import type { Dictionary, WorkVideoItem } from "@/i18n/dictionaries";

export type ClientStorySocialPlatform = "instagram";

export type ClientStorySocialLink = {
  platform: ClientStorySocialPlatform;
  handle: string;
  url: string;
};

export type ClientStoryLocaleContent = {
  intro: string;
  collaborationText: string;
  metaDescription: string;
};

export type ClientStoryBentoRole = "stack" | "feature";

export type ClientStory = {
  slug: string;
  name: string;
  firstName: string;
  lastName: string;
  handle: string;
  /** Homepage bento: stack = left column, feature = tall right card */
  bentoRole: ClientStoryBentoRole;
  /** Card image on homepage — poster or portrait */
  cardImageSrc?: string;
  /** Hero portrait on detail page */
  heroImageSrc?: string;
  socialLinks: ClientStorySocialLink[];
  /** Stable keys: work item previewSrc paths */
  workReelPreviewSrcs: string[];
  localized: Record<Locale, ClientStoryLocaleContent>;
};

export const TODO_SOCIAL_URL = "TODO_ADD_REAL_INSTAGRAM_URL";

/** Creator photos: public/assets/videos/collaboration/ */
const collaborationPhoto = (filename: string) =>
  `/assets/videos/collaboration/${filename}` as const;

export function isResolvableSocialUrl(url: string): boolean {
  return url.startsWith("http") && !url.includes("TODO");
}

export function isResolvableImageSrc(src: string | undefined): src is string {
  return !!src && src.startsWith("/") && !src.includes("TODO");
}

export const clientStories: ClientStory[] = [
  {
    slug: "leon-haegele",
    name: "Leon Hägele",
    firstName: "Leon",
    lastName: "Hägele",
    bentoRole: "stack",
    handle: "leon.haegele",
    cardImageSrc: collaborationPhoto("leon1.png"),
    heroImageSrc: collaborationPhoto("leon1.png"),
    socialLinks: [
      {
        platform: "instagram",
        handle: "@leon.haegele",
        url: "https://www.instagram.com/leon.haegele/",
      },
    ],
    workReelPreviewSrcs: [
      "/assets/videos/preview/random/PIZZZZZA-web.mp4",
      "/assets/videos/preview/random/VERSION2-web.mp4",
    ],
    localized: {
      en: {
        intro:
          "Recurring social ads and performance edits with a consistent premium look across the feed.",
        collaborationText:
          "The collaboration with Leon runs across social ads, campaign-style edits and performance content. The focus is a clear visual direction that stays premium in the feed — with hooks, pacing and finish tuned for Instagram and paid delivery, without losing flexibility across formats.",
        metaDescription:
          "Long-term video editing partnership with creator Leon Hägele — social ads, performance edits and premium brand visuals by Simon Saad Visuals.",
      },
      de: {
        intro:
          "Wiederkehrende Social Ads und Performance-Edits mit konsistentem Premium-Look im Feed.",
        collaborationText:
          "Die Zusammenarbeit mit Leon läuft über Social Ads, kampagnenartige Edits und Performance-Content. Im Mittelpunkt steht eine klare visuelle Richtung, die im Feed premium wirkt — mit Hooks, Pacing und Finish für Instagram und Paid, ohne an Flexibilität über Formate hinweg zu verlieren.",
        metaDescription:
          "Langfristige Video-Editing-Partnerschaft mit Creator Leon Hägele — Social Ads, Performance-Edits und Premium-Brand-Visuals von Simon Saad Visuals.",
      },
    },
  },
  {
    slug: "ramon-limacher",
    name: "Ramon Limacher",
    firstName: "Ramon",
    lastName: "Limacher",
    bentoRole: "feature",
    handle: "ramon_limacher",
    cardImageSrc: collaborationPhoto("ramon1.png"),
    heroImageSrc: collaborationPhoto("ramon1.png"),
    socialLinks: [
      {
        platform: "instagram",
        handle: "@ramon_limacher",
        url: TODO_SOCIAL_URL,
      },
    ],
    workReelPreviewSrcs: ["/assets/videos/preview/random/mealplans leiser-web.mp4"],
    localized: {
      en: {
        intro:
          "Recurring social edits shaped for recognition, calm pacing and platform-native rhythm.",
        collaborationText:
          "With Ramon, the work is built around ongoing social content rather than one-off projects. Edits stay clear and recognisable — educational and lifestyle reels with pacing that fits Instagram and short-form platforms.",
        metaDescription:
          "Ongoing social video editing for creator Ramon Limacher — recurring visuals and platform-native edits by Simon Saad Visuals.",
      },
      de: {
        intro:
          "Regelmäßige Social Edits mit Fokus auf Wiedererkennung, ruhigem Pacing und kanalgerechtem Rhythmus.",
        collaborationText:
          "Mit Ramon entsteht fortlaufender Social Content statt Einzelprojekte. Die Schnitte bleiben klar und wiedererkennbar — Educational- und Lifestyle-Reels mit Pacing, das zu Instagram und Short-Form passt.",
        metaDescription:
          "Fortlaufender Social-Video-Schnitt für Creator Ramon Limacher — wiederkehrende Visuals und plattformgerechte Edits von Simon Saad Visuals.",
      },
    },
  },
  {
    slug: "mario-scherthan",
    name: "Mario Scherthan",
    firstName: "Mario",
    lastName: "Scherthan",
    bentoRole: "stack",
    handle: "marioscherthan",
    cardImageSrc: collaborationPhoto("mario1.png"),
    heroImageSrc: collaborationPhoto("mario1.png"),
    socialLinks: [
      {
        platform: "instagram",
        handle: "@marioscherthan",
        url: TODO_SOCIAL_URL,
      },
    ],
    workReelPreviewSrcs: [],
    localized: {
      en: {
        intro:
          "Ongoing social content with clear visual direction and a consistent editing style.",
        collaborationText:
          "The collaboration with Mario focuses on recurring social edits along a defined visual direction. Content should feel intentional in the feed — social-first pacing, brand-aware rhythm and a cohesive look across ongoing drops.",
        metaDescription:
          "Long-term social content editing for Mario Scherthan — consistent visual direction and premium short-form edits by Simon Saad Visuals.",
      },
      de: {
        intro:
          "Fortlaufender Social Content mit klarer visueller Richtung und konsistentem Schnittstil.",
        collaborationText:
          "Die Zusammenarbeit mit Mario konzentriert sich auf wiederkehrende Social Edits entlang einer definierten Bildsprache. Der Content soll im Feed bewusst wirken — social-first Pacing, markenbewusster Rhythmus und ein stimmiger Look über laufende Drops.",
        metaDescription:
          "Langfristiger Social-Content-Schnitt für Mario Scherthan — konsistente visuelle Richtung und Premium-Short-Form-Edits von Simon Saad Visuals.",
      },
    },
  },
];

export function getClientStoryBySlug(slug: string): ClientStory | undefined {
  return clientStories.find((story) => story.slug === slug);
}

export function getClientStoryContent(
  story: ClientStory,
  locale: Locale,
): ClientStoryLocaleContent {
  return story.localized[locale];
}

export function getAllClientStories(): ClientStory[] {
  return clientStories;
}

/** Bento section order: left stack (Leon, Mario), then featured (Ramon). */
export function getClientStoriesForHomeSection(): ClientStory[] {
  const order = ["leon-haegele", "mario-scherthan", "ramon-limacher"] as const;
  return order
    .map((slug) => clientStories.find((story) => story.slug === slug))
    .filter((story): story is ClientStory => story !== undefined);
}

export function getWorkItemsForClientStory(
  story: ClientStory,
  dict: Dictionary,
): WorkVideoItem[] {
  if (story.workReelPreviewSrcs.length === 0) return [];

  const allItems = [...dict.work.items, ...dict.work.moreItems];

  return story.workReelPreviewSrcs
    .map((previewSrc) => allItems.find((item) => item.previewSrc === previewSrc))
    .filter((item): item is WorkVideoItem => item !== undefined);
}
