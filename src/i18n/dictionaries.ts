import type { Locale } from "./config";

export type WorkVideoItem = {
  title: string;
  type: string;
  description: string;
  tags: string[];
  posterSrc: string;
  previewSrc: string;
  lightboxSrc: string;
  alt: string;
  videoAriaLabel: string;
};

export type ClientStoryItem = {
  title: string;
  label: string;
  description: string;
  href: string;
  imageSrc: string;
  alt: string;
};

export type ImpactSnapshotCardIcon = "eye" | "heart" | "message" | "share2";

export type ImpactSnapshotCardDict = {
  label: string;
  targetValue: number;
  decimals: number;
  suffix: string;
  icon: ImpactSnapshotCardIcon;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    wordmark: string;
    logoTop: string;
    logoBottom: string;
    links: {
      work: string;
      services: string;
      about: string;
      contact: string;
    };
    cta: string;
    langSwitchLabel: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subline: string;
    seoH1: string;
    services: string[];
    primaryCta: string;
    primaryCtaHref: string;
    secondaryCta: string;
    secondaryCtaHref: string;
    scrollLabel: string;
  };
  services: {
    title: string;
    intro: string;
    items: Array<{
      title: string;
      description: string;
      icon: "smartphone" | "monitor-play" | "megaphone" | "clapperboard";
    }>;
  };
  about: {
    title: string;
    steps: Array<{ title: string; description: string }>;
  };
  work: {
    eyebrow: string;
    title: string;
    intro: string;
    items: WorkVideoItem[];
    moreItems: WorkVideoItem[];
    viewMoreWork: string;
    showLessWork: string;
    collaborationsCtaLabel: string;
    collaborationsCtaHref: string;
  };
  impactSnapshot: {
    ariaLabel: string;
    statementLines: readonly [string, string, string];
    cards: ImpactSnapshotCardDict[];
  };
  testimonials: {
    title: string;
  };
  clientStories: {
    eyebrow: string;
    title: string;
    intro: string;
    items: ClientStoryItem[];
    viewCase: string;
  };
  contact: {
    title: string;
    description: string;
    cta: string;
  };
  caseDetail: {
    back: string;
    contentGridTitle: string;
    cta: string;
    ctaHref: string;
  };
  footer: {
    copyright: string;
    links: {
      work: string;
      services: string;
      about: string;
      contact: string;
    };
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      title: "Simon Saad Visuals — High Impact Video Editing",
      description:
        "Cinematic video editing and high impact visuals for brands, artists and creators.",
    },
    nav: {
      wordmark: "Simon Saad Visuals",
      logoTop: "SIMON SAAD",
      logoBottom: "VISUALS",
      links: {
        work: "WORK",
        services: "SERVICES",
        about: "ABOUT",
        contact: "CONTACT",
      },
      cta: "LET'S TALK",
      langSwitchLabel: "DE",
    },
    hero: {
      eyebrow: "HIGH IMPACT",
      headline: "VISUALS",
      subline: "FOR BRANDS & CREATORS",
      seoH1: "Simon Saad Visuals — High Impact Video Editing for Brands and Creators",
      services: ["REEL EDITING", "CINEMATIC CONTENT", "ADS", "YOUTUBE"],
      primaryCta: "LET'S TALK",
      primaryCtaHref: "#contact",
      secondaryCta: "VIEW WORK",
      secondaryCtaHref: "#work",
      scrollLabel: "SCROLL",
    },
    services: {
      title: "Editing built for impact",
      intro:
        "Reels, YouTube, campaigns and cinematic formats. Cleanly edited, clearly structured and built to feel premium.",
      items: [
        {
          title: "Shortform Editing",
          description:
            "Reels, TikToks and shorts with fast pacing, clean cuts and a look built for social.",
          icon: "smartphone",
        },
        {
          title: "YouTube & Longform",
          description:
            "Longer videos, interviews and episodes with clean structure, flow and clear viewer guidance.",
          icon: "monitor-play",
        },
        {
          title: "Ads & Campaign Cuts",
          description:
            "Campaign and product videos with strong hooks, a clear message and fast visual impact.",
          icon: "megaphone",
        },
        {
          title: "Cinematic Content",
          description:
            "Trailers, podcasts, recaps and atmospheric edits for content that should feel more premium.",
          icon: "clapperboard",
        },
      ],
    },
    about: {
      title: "ABOUT",
      steps: [
        {
          title: "Editor-first mindset",
          description: "Cutting is decision-making — what stays, what moves, what lands.",
        },
        {
          title: "Story before trends",
          description: "Technique serves the narrative; style follows substance.",
        },
        {
          title: "Rhythm you can feel",
          description: "Micro-timing and macro-structure tuned for emotional pull.",
        },
        {
          title: "Collaboration",
          description: "Clear feedback loops — fewer iterations, stronger outcomes.",
        },
      ],
    },
    work: {
      eyebrow: "SELECTED WORK",
      title: "Proof in motion.",
      intro:
        "A first look at pacing, rhythm and visual direction across social edits, brand content and creator-focused videos.",
      collaborationsCtaLabel: "View deeper collaborations",
      collaborationsCtaHref: "#collaborations",
      viewMoreWork: "View more",
      showLessWork: "Show less",
      items: [
        {
          title: "PIZZZZZA",
          type: "Social Reel",
          description: "Bold food pacing with punchy cuts and high-energy product beats.",
          tags: ["Food", "Rhythm", "Social"],
          posterSrc: "/assets/videos/posters/random/PIZZZZZA-poster.webp",
          previewSrc: "/assets/videos/preview/random/PIZZZZZA-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/PIZZZZZA-lightbox.mp4",
          alt: "Poster frame for PIZZZZZA video edit",
          videoAriaLabel: "PIZZZZZA food reel editing example",
        },
        {
          title: "mealplans leiser",
          type: "Product Spot",
          description: "Quieter mix direction with playful rhythm for a meal-plan spot.",
          tags: ["Product", "Rhythm", "Social"],
          posterSrc: "/assets/videos/posters/random/mealplans leiser-poster.webp",
          previewSrc: "/assets/videos/preview/random/mealplans leiser-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/mealplans leiser-lightbox.mp4",
          alt: "Poster frame for mealplans leiser video edit",
          videoAriaLabel: "mealplans leiser product spot editing example",
        },
        {
          title: "VERSION2",
          type: "Social Reel",
          description: "Fast-paced random cut with bold rhythm and social-first delivery.",
          tags: ["Rhythm", "Social", "Energy"],
          posterSrc: "/assets/videos/posters/random/VERSION2-poster.webp",
          previewSrc: "/assets/videos/preview/random/VERSION2-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/VERSION2-lightbox.mp4",
          alt: "Poster frame for VERSION2 video edit",
          videoAriaLabel: "VERSION2 social reel editing example",
        },
      ],
      moreItems: [
        {
          title: "diamanten_2",
          type: "Brand Moment",
          description: "Layered reveals and controlled tension across a premium campaign cut.",
          tags: ["Layers", "Tension", "Brand"],
          posterSrc: "/assets/videos/posters/diamten/diamanten_2-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/diamanten_2-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/diamanten_2-lightbox.mp4",
          alt: "Poster frame for diamanten_2 video edit",
          videoAriaLabel: "diamanten_2 brand moment editing example",
        },
        {
          title: "sinnvoll_final",
          type: "Cinematic Reel",
          description: "High-energy pacing, sharp transitions and a premium training atmosphere.",
          tags: ["Hook", "Pacing", "Sound sync"],
          posterSrc: "/assets/videos/posters/diamten/sinnvoll_final-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/sinnvoll_final-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/sinnvoll_final-lightbox.mp4",
          alt: "Poster frame for sinnvoll_final video edit",
          videoAriaLabel: "sinnvoll_final cinematic reel editing example",
        },
        {
          title: "PT_FINAL",
          type: "Brand Spot",
          description: "Moody visuals, clean cuts and atmosphere-driven product framing.",
          tags: ["Atmosphere", "Brand", "Motion"],
          posterSrc: "/assets/videos/posters/podcast trailer/PT_FINAL-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/PT_FINAL-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/PT_FINAL-lightbox.mp4",
          alt: "Poster frame for PT_FINAL video edit",
          videoAriaLabel: "PT_FINAL brand trailer editing example",
        },
        {
          title: "ayo",
          type: "Creator Edit",
          description: "Fast structure, retention-focused timing and social-first delivery.",
          tags: ["Retention", "Social", "Performance"],
          posterSrc: "/assets/videos/posters/random/ayo-poster.webp",
          previewSrc: "/assets/videos/preview/random/ayo-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/ayo-lightbox.mp4",
          alt: "Poster frame for ayo video edit",
          videoAriaLabel: "ayo creator reel editing example",
        },
        {
          title: "bracen",
          type: "Social Reel",
          description: "Punchy rhythm, clean structure and a bold visual attitude.",
          tags: ["Energy", "Pacing", "Structure"],
          posterSrc: "/assets/videos/posters/diamten/bracen-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/bracen-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/bracen-lightbox.mp4",
          alt: "Poster frame for bracen video edit",
          videoAriaLabel: "bracen social reel editing example",
        },
        {
          title: "mario festhalten neu",
          type: "Creator Cut",
          description: "Performance-first framing with social-native pacing.",
          tags: ["Framing", "Creator", "Pacing"],
          posterSrc: "/assets/videos/posters/diamten/mario festhalten neu-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/mario festhalten neu-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/mario festhalten neu-lightbox.mp4",
          alt: "Poster frame for mario festhalten neu video edit",
          videoAriaLabel: "mario festhalten neu creator cut editing example",
        },
        {
          title: "negative final",
          type: "Atmospheric Edit",
          description: "Contrast-driven tone shaping with deliberate pacing.",
          tags: ["Tone", "Contrast", "Mood"],
          posterSrc: "/assets/videos/posters/diamten/negative final-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/negative final-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/negative final-lightbox.mp4",
          alt: "Poster frame for negative final video edit",
          videoAriaLabel: "negative final atmospheric editing example",
        },
        {
          title: "PODCAST_TRAILER",
          type: "Trailer",
          description: "Hook-first structure built for retention and clarity.",
          tags: ["Hook", "Trailer", "Retention"],
          posterSrc: "/assets/videos/posters/podcast trailer/PODCAST_TRAILER-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/PODCAST_TRAILER-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/PODCAST_TRAILER-lightbox.mp4",
          alt: "Poster frame for PODCAST_TRAILER video edit",
          videoAriaLabel: "PODCAST_TRAILER series trailer editing example",
        },
        {
          title: "Podvast10.05",
          type: "Weekly Edit",
          description: "Tight turnaround pacing with consistent visual language.",
          tags: ["Weekly", "Speed", "Consistency"],
          posterSrc: "/assets/videos/posters/podcast trailer/Podvast10.05-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/Podvast10.05-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/Podvast10.05-lightbox.mp4",
          alt: "Poster frame for Podvast10.05 video edit",
          videoAriaLabel: "Podvast10.05 weekly drop editing example",
        },
        {
          title: "trailer f15",
          type: "Teaser",
          description: "Micro-tension and rhythm tuned for a teaser format.",
          tags: ["Teaser", "Rhythm", "Tension"],
          posterSrc: "/assets/videos/posters/podcast trailer/trailer f15-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/trailer f15-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/trailer f15-lightbox.mp4",
          alt: "Poster frame for trailer f15 video edit",
          videoAriaLabel: "trailer f15 episode teaser editing example",
        },
        {
          title: "trailer folge 14",
          type: "Long-form",
          description: "Macro pacing and chapter-like structure for longer storytelling.",
          tags: ["Narrative", "Arc", "Pacing"],
          posterSrc: "/assets/videos/posters/podcast trailer/trailer folge 14-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/trailer folge 14-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/trailer folge 14-lightbox.mp4",
          alt: "Poster frame for trailer folge 14 video edit",
          videoAriaLabel: "trailer folge 14 long-form editing example",
        },
        {
          title: "investment",
          type: "Explain Edit",
          description: "Clarity-first pacing for information-heavy visuals.",
          tags: ["Clarity", "Explain", "Structure"],
          posterSrc: "/assets/videos/posters/random/investment-poster.webp",
          previewSrc: "/assets/videos/preview/random/investment-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/investment-lightbox.mp4",
          alt: "Poster frame for investment video edit",
          videoAriaLabel: "investment explain edit editing example",
        },
      ],
    },
    impactSnapshot: {
      ariaLabel: "Engagement metrics — likes, views, comments and shares",
      statementLines: ["More likes.", "More views.", "More attention."] as const,
      cards: [
        {
          label: "Likes",
          targetValue: 892,
          decimals: 0,
          suffix: "K",
          icon: "heart",
        },
        {
          label: "Views",
          targetValue: 1.24,
          decimals: 2,
          suffix: "M",
          icon: "eye",
        },
        {
          label: "Comments",
          targetValue: 24.5,
          decimals: 1,
          suffix: "K",
          icon: "message",
        },
        {
          label: "Shares",
          targetValue: 9.4,
          decimals: 1,
          suffix: "K",
          icon: "share2",
        },
      ],
    },
    testimonials: {
      title: "What clients say about working together",
    },
    clientStories: {
      eyebrow: "COLLABORATIONS",
      title: "Long-term visual systems for creators and brands.",
      intro:
        "Explore ongoing collaborations with recurring edits, campaign visuals and content built around a consistent visual direction.",
      viewCase: "View case",
      items: [
        {
          title: "Client One",
          label: "Ongoing Social Edits",
          description:
            "Recurring reels, campaign cuts and visual direction across multiple content drops.",
          href: "/work/client-one",
          imageSrc: "/assets/clients/client-one-poster.svg",
          alt: "Preview image for Client One collaboration",
        },
        {
          title: "Client Two",
          label: "Creator Content System",
          description:
            "A consistent editing language across short-form videos, launches and social content.",
          href: "/work/client-two",
          imageSrc: "/assets/clients/client-two-poster.svg",
          alt: "Preview image for Client Two collaboration",
        },
        {
          title: "Client Three",
          label: "Brand Visuals",
          description: "Premium campaign edits and atmospheric visuals shaped for social platforms.",
          href: "/work/client-three",
          imageSrc: "/assets/clients/client-three-poster.svg",
          alt: "Preview image for Client Three collaboration",
        },
      ],
    },
    contact: {
      title: "Let’s build something sharp.",
      description:
        "Tell me about your project, timeline and references — I’ll reply with next steps.",
      cta: "START A PROJECT",
    },
    caseDetail: {
      back: "Back to selected work",
      contentGridTitle: "Content drops",
      cta: "Start a project",
      ctaHref: "#contact",
    },
    footer: {
      copyright: "© Simon Saad Visuals",
      links: {
        work: "WORK",
        services: "SERVICES",
        about: "ABOUT",
        contact: "CONTACT",
      },
    },
  },
  de: {
    meta: {
      title: "Simon Saad Visuals — High Impact Video Editing",
      description:
        "Cinematic Video Editing und hochwertige Visuals für Brands, Artists und Creator.",
    },
    nav: {
      wordmark: "Simon Saad Visuals",
      logoTop: "SIMON SAAD",
      logoBottom: "VISUALS",
      links: {
        work: "WORK",
        services: "SERVICES",
        about: "ABOUT",
        contact: "KONTAKT",
      },
      cta: "ANFRAGEN",
      langSwitchLabel: "EN",
    },
    hero: {
      eyebrow: "HIGH IMPACT",
      headline: "VISUALS",
      subline: "FÜR BRANDS & CREATOR",
      seoH1: "Simon Saad Visuals — High Impact Video Editing für Brands und Creator",
      services: ["REEL EDITING", "CINEMATIC CONTENT", "ADS", "YOUTUBE"],
      primaryCta: "ANFRAGEN",
      primaryCtaHref: "#contact",
      secondaryCta: "WORK ANSEHEN",
      secondaryCtaHref: "#work",
      scrollLabel: "SCROLL",
    },
    services: {
      title: "Schnitt, der Content stärker macht",
      intro:
        "Reels, YouTube, Kampagnen und cineastische Formate. Präzise geschnitten, klar geführt, hochwertig umgesetzt.",
      items: [
        {
          title: "Shortform-Schnitt",
          description:
            "Reels, TikToks und Shorts mit schnellem Pacing, klaren Cuts und einem Look, der auf Social funktioniert.",
          icon: "smartphone",
        },
        {
          title: "YouTube & Longform",
          description:
            "Längere Videos, Interviews und Episoden mit sauberer Struktur, Flow und klarer Zuschauerführung.",
          icon: "monitor-play",
        },
        {
          title: "Werbevideos",
          description:
            "Kampagnen- und Produktvideos mit starken Hooks, klarer Botschaft und schneller visueller Wirkung.",
          icon: "megaphone",
        },
        {
          title: "Cineastische Formate",
          description:
            "Trailer, Podcasts, Recaps und atmosphärische Edits für Content, der hochwertiger wirken soll.",
          icon: "clapperboard",
        },
      ],
    },
    about: {
      title: "ABOUT",
      steps: [
        {
          title: "Editor-Denkweise",
          description: "Schnitt ist Entscheiden — was bleibt, was trägt, was wirkt.",
        },
        {
          title: "Story vor Trend",
          description: "Technik dient der Erzählung; Stil folgt Substanz.",
        },
        {
          title: "Spürbarer Rhythmus",
          description: "Mikro-Timing und Makro-Spannung für emotionale Zugkraft.",
        },
        {
          title: "Zusammenarbeit",
          description: "Klare Feedback-Schleifen — weniger Runden, mehr Klarheit.",
        },
      ],
    },
    work: {
      eyebrow: "SELECTED WORK",
      title: "Proof in motion.",
      intro:
        "Ein erster Blick auf Pacing, Rhythmus und visuelle Richtung in Social Edits, Brand Content und Creator-Videos.",
      collaborationsCtaLabel: "Mehr Collaborations",
      collaborationsCtaHref: "#collaborations",
      viewMoreWork: "Mehr anzeigen",
      showLessWork: "Weniger anzeigen",
      items: [
        {
          title: "PIZZZZZA",
          type: "Social Reel",
          description: "Energiegeladenes Food-Pacing mit prägnanten Cuts und starken Produkt-Beats.",
          tags: ["Food", "Rhythmus", "Social"],
          posterSrc: "/assets/videos/posters/random/PIZZZZZA-poster.webp",
          previewSrc: "/assets/videos/preview/random/PIZZZZZA-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/PIZZZZZA-lightbox.mp4",
          alt: "Posterbild für PIZZZZZA Video-Edit",
          videoAriaLabel: "PIZZZZZA Food-Reel als Editing-Beispiel",
        },
        {
          title: "mealplans leiser",
          type: "Product Spot",
          description: "Leisere Mix-Richtung mit spielerischem Rhythmus für einen Meal-Plan-Spot.",
          tags: ["Produkt", "Rhythmus", "Social"],
          posterSrc: "/assets/videos/posters/random/mealplans leiser-poster.webp",
          previewSrc: "/assets/videos/preview/random/mealplans leiser-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/mealplans leiser-lightbox.mp4",
          alt: "Posterbild für mealplans leiser Video-Edit",
          videoAriaLabel: "mealplans leiser Produkt-Spot als Editing-Beispiel",
        },
        {
          title: "VERSION2",
          type: "Social Reel",
          description: "Schneller Random-Cut mit starkem Rhythmus und social-first Delivery.",
          tags: ["Rhythmus", "Social", "Energy"],
          posterSrc: "/assets/videos/posters/random/VERSION2-poster.webp",
          previewSrc: "/assets/videos/preview/random/VERSION2-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/VERSION2-lightbox.mp4",
          alt: "Posterbild für VERSION2 Video-Edit",
          videoAriaLabel: "VERSION2 Social-Reel als Editing-Beispiel",
        },
      ],
      moreItems: [
        {
          title: "diamanten_2",
          type: "Brand Moment",
          description: "Geschichtete Reveals und kontrollierte Spannung in einem Premium-Campaign-Cut.",
          tags: ["Layers", "Spannung", "Brand"],
          posterSrc: "/assets/videos/posters/diamten/diamanten_2-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/diamanten_2-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/diamanten_2-lightbox.mp4",
          alt: "Posterbild für diamanten_2 Video-Edit",
          videoAriaLabel: "diamanten_2 Brand-Moment als Editing-Beispiel",
        },
        {
          title: "sinnvoll_final",
          type: "Cinematic Reel",
          description:
            "Energiegeladenes Pacing, präzise Übergänge und eine hochwertige Trainingsatmosphäre.",
          tags: ["Hook", "Pacing", "Sound Sync"],
          posterSrc: "/assets/videos/posters/diamten/sinnvoll_final-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/sinnvoll_final-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/sinnvoll_final-lightbox.mp4",
          alt: "Posterbild für sinnvoll_final Video-Edit",
          videoAriaLabel: "sinnvoll_final Cinematic-Reel als Editing-Beispiel",
        },
        {
          title: "PT_FINAL",
          type: "Brand Spot",
          description: "Moody Visuals, klare Cuts und atmosphärisches Product Framing.",
          tags: ["Atmosphäre", "Brand", "Motion"],
          posterSrc: "/assets/videos/posters/podcast trailer/PT_FINAL-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/PT_FINAL-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/PT_FINAL-lightbox.mp4",
          alt: "Posterbild für PT_FINAL Video-Edit",
          videoAriaLabel: "PT_FINAL Brand-Trailer als Editing-Beispiel",
        },
        {
          title: "ayo",
          type: "Creator Edit",
          description: "Schnelle Struktur, retention-fokussiertes Timing und social-first Delivery.",
          tags: ["Retention", "Social", "Performance"],
          posterSrc: "/assets/videos/posters/random/ayo-poster.webp",
          previewSrc: "/assets/videos/preview/random/ayo-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/ayo-lightbox.mp4",
          alt: "Posterbild für ayo Video-Edit",
          videoAriaLabel: "ayo Creator-Reel als Editing-Beispiel",
        },
        {
          title: "bracen",
          type: "Social Reel",
          description: "Direkter Rhythmus, klare Struktur und eine starke visuelle Haltung.",
          tags: ["Energy", "Pacing", "Struktur"],
          posterSrc: "/assets/videos/posters/diamten/bracen-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/bracen-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/bracen-lightbox.mp4",
          alt: "Posterbild für bracen Video-Edit",
          videoAriaLabel: "bracen Social-Reel als Editing-Beispiel",
        },
        {
          title: "mario festhalten neu",
          type: "Creator Cut",
          description: "Performance-first Framing mit social-nativem Pacing.",
          tags: ["Framing", "Creator", "Pacing"],
          posterSrc: "/assets/videos/posters/diamten/mario festhalten neu-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/mario festhalten neu-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/mario festhalten neu-lightbox.mp4",
          alt: "Posterbild für mario festhalten neu Video-Edit",
          videoAriaLabel: "mario festhalten neu Creator-Cut als Editing-Beispiel",
        },
        {
          title: "negative final",
          type: "Atmospheric Edit",
          description: "Kontrastgetriebene Tonführung mit bewusstem Pacing.",
          tags: ["Ton", "Kontrast", "Mood"],
          posterSrc: "/assets/videos/posters/diamten/negative final-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/negative final-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/negative final-lightbox.mp4",
          alt: "Posterbild für negative final Video-Edit",
          videoAriaLabel: "negative final atmosphärisches Editing als Beispiel",
        },
        {
          title: "PODCAST_TRAILER",
          type: "Trailer",
          description: "Hook-first Struktur für Retention und klare Lesbarkeit.",
          tags: ["Hook", "Trailer", "Retention"],
          posterSrc: "/assets/videos/posters/podcast trailer/PODCAST_TRAILER-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/PODCAST_TRAILER-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/PODCAST_TRAILER-lightbox.mp4",
          alt: "Posterbild für PODCAST_TRAILER Video-Edit",
          videoAriaLabel: "PODCAST_TRAILER Serien-Trailer als Editing-Beispiel",
        },
        {
          title: "Podvast10.05",
          type: "Weekly Edit",
          description: "Straffes Turnaround-Pacing mit konsistenter Bildsprache.",
          tags: ["Weekly", "Speed", "Konsistenz"],
          posterSrc: "/assets/videos/posters/podcast trailer/Podvast10.05-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/Podvast10.05-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/Podvast10.05-lightbox.mp4",
          alt: "Posterbild für Podvast10.05 Video-Edit",
          videoAriaLabel: "Podvast10.05 Weekly-Drop als Editing-Beispiel",
        },
        {
          title: "trailer f15",
          type: "Teaser",
          description: "Mikro-Spannung und Rhythmus im Teaser-Format.",
          tags: ["Teaser", "Rhythmus", "Spannung"],
          posterSrc: "/assets/videos/posters/podcast trailer/trailer f15-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/trailer f15-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/trailer f15-lightbox.mp4",
          alt: "Posterbild für trailer f15 Video-Edit",
          videoAriaLabel: "trailer f15 Episode-Teaser als Editing-Beispiel",
        },
        {
          title: "trailer folge 14",
          type: "Long-form",
          description: "Makro-Pacing und kapitelartige Struktur für längere Stories.",
          tags: ["Narrativ", "Arc", "Pacing"],
          posterSrc: "/assets/videos/posters/podcast trailer/trailer folge 14-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/trailer folge 14-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/trailer folge 14-lightbox.mp4",
          alt: "Posterbild für trailer folge 14 Video-Edit",
          videoAriaLabel: "trailer folge 14 Long-form-Edit als Beispiel",
        },
        {
          title: "investment",
          type: "Explain Edit",
          description: "Klarheits-first Pacing für informationsreiche Visuals.",
          tags: ["Klarheit", "Explain", "Struktur"],
          posterSrc: "/assets/videos/posters/random/investment-poster.webp",
          previewSrc: "/assets/videos/preview/random/investment-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/investment-lightbox.mp4",
          alt: "Posterbild für investment Video-Edit",
          videoAriaLabel: "investment Explain-Edit als Editing-Beispiel",
        },
      ],
    },
    impactSnapshot: {
      ariaLabel: "Engagement-Kennzahlen — Likes, Aufrufe, Kommentare und Shares",
      statementLines: ["Mehr Likes.", "Mehr Views.", "Mehr Wachstum."] as const,
      cards: [
        {
          label: "Likes",
          targetValue: 892,
          decimals: 0,
          suffix: "K",
          icon: "heart",
        },
        {
          label: "Aufrufe",
          targetValue: 1.24,
          decimals: 2,
          suffix: "M",
          icon: "eye",
        },
        {
          label: "Kommentare",
          targetValue: 24.5,
          decimals: 1,
          suffix: "K",
          icon: "message",
        },
        {
          label: "Shares",
          targetValue: 9.4,
          decimals: 1,
          suffix: "K",
          icon: "share2",
        },
      ],
    },
    testimonials: {
      title: "Was Kunden über die Zusammenarbeit sagen",
    },
    clientStories: {
      eyebrow: "COLLABORATIONS",
      title: "Langfristige Visual-Systeme für Creator und Marken.",
      intro:
        "Entdecke laufende Zusammenarbeiten mit wiederkehrenden Edits, Kampagnen-Visuals und Content mit klarer visueller Richtung.",
      viewCase: "Case ansehen",
      items: [
        {
          title: "Kunde Eins",
          label: "Ongoing Social Edits",
          description:
            "Wiederkehrende Reels, Kampagnen-Cuts und visuelle Richtung über mehrere Content-Drops hinweg.",
          href: "/work/client-one",
          imageSrc: "/assets/clients/client-one-poster.svg",
          alt: "Vorschaubild für die Zusammenarbeit mit Kunde Eins",
        },
        {
          title: "Kunde Zwei",
          label: "Creator Content System",
          description:
            "Eine konsistente Editing-Sprache für Short-Form-Videos, Launches und Social Content.",
          href: "/work/client-two",
          imageSrc: "/assets/clients/client-two-poster.svg",
          alt: "Vorschaubild für die Zusammenarbeit mit Kunde Zwei",
        },
        {
          title: "Kunde Drei",
          label: "Brand Visuals",
          description: "Premium Campaign Edits und atmosphärische Visuals für Social-Plattformen.",
          href: "/work/client-three",
          imageSrc: "/assets/clients/client-three-poster.svg",
          alt: "Vorschaubild für die Zusammenarbeit mit Kunde Drei",
        },
      ],
    },
    contact: {
      title: "Lass uns etwas Präzises bauen.",
      description:
        "Schreib mir zu Projekt, Timeline und Referenzen — ich melde mich mit den nächsten Schritten.",
      cta: "PROJEKT STARTEN",
    },
    caseDetail: {
      back: "Zurück zu Selected Work",
      contentGridTitle: "Content Drops",
      cta: "Projekt starten",
      ctaHref: "#contact",
    },
    footer: {
      copyright: "© Simon Saad Visuals",
      links: {
        work: "WORK",
        services: "SERVICES",
        about: "ABOUT",
        contact: "KONTAKT",
      },
    },
  },
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale];
}
