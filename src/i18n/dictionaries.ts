import type { Locale } from "./config";

export type WorkVideoItem = {
  title: string;
  type: string;
  description: string;
  tags: string[];
  posterSrc: string;
  videoSrc: string;
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
  focus: {
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  services: {
    title: string;
    items: Array<{ title: string; description: string }>;
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
    focus: {
      title: "Focus",
      items: [
        {
          title: "Pacing & rhythm",
          description: "Cuts that breathe with the story — clarity without noise.",
        },
        {
          title: "Visual intent",
          description: "Every frame earns its place; emotion before decoration.",
        },
        {
          title: "Sound design sensibility",
          description: "Music and ambience treated as part of the picture.",
        },
        {
          title: "Delivery-ready exports",
          description: "Formats and specs aligned with platform expectations.",
        },
      ],
    },
    services: {
      title: "SERVICES",
      items: [
        {
          title: "Reel Editing",
          description: "Vertical edits with punchy rhythm and clean storytelling.",
        },
        {
          title: "Cinematic Content",
          description: "Long-form scenes, mood and atmosphere — narrative-first.",
        },
        {
          title: "Ads",
          description: "Sharp commercial cuts designed to hold attention fast.",
        },
        {
          title: "YouTube",
          description: "Retention-aware pacing for titles, chapters and hooks.",
        },
        {
          title: "Music Videos",
          description: "Performance-forward edits built around track energy.",
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
      viewMoreWork: "View more work",
      showLessWork: "Show less",
      items: [
        {
          title: "Fitness — cinematic reel",
          type: "Cinematic Reel",
          description:
            "High-energy pacing, sharp transitions and a premium training atmosphere.",
          tags: ["Hook", "Pacing", "Sound sync"],
          posterSrc: "/assets/work/fitness-reel-poster.svg",
          videoSrc: "/assets/videos/diamten/sinnvoll_final.mp4",
          alt: "Poster frame for a cinematic fitness reel",
          videoAriaLabel: "Cinematic fitness reel editing example",
        },
        {
          title: "Brand spot — night drive",
          type: "Brand Spot",
          description: "Moody visuals, clean cuts and atmosphere-driven product framing.",
          tags: ["Atmosphere", "Brand", "Motion"],
          posterSrc: "/assets/work/night-drive-poster.svg",
          videoSrc: "/assets/videos/podcast%20trailer/PT_FINAL.mp4",
          alt: "Poster frame for a night drive brand spot",
          videoAriaLabel: "Brand trailer video editing with moody pacing",
        },
        {
          title: "Creator edit — performance",
          type: "Creator Edit",
          description: "Fast structure, retention-focused timing and social-first delivery.",
          tags: ["Retention", "Social", "Performance"],
          posterSrc: "/assets/work/creator-performance-poster.svg",
          videoSrc: "/assets/videos/random/ayo.mp4",
          alt: "Poster frame for a creator performance edit",
          videoAriaLabel: "Social media reel editing proof",
        },
      ],
      moreItems: [
        {
          title: "Diamond cut — energy edit",
          type: "Social Reel",
          description: "Punchy rhythm, clean structure and a bold visual attitude.",
          tags: ["Energy", "Pacing", "Structure"],
          posterSrc: "/assets/work/fitness-reel-poster.svg",
          videoSrc: "/assets/videos/diamten/bracen.mp4",
          alt: "Poster frame for a high-energy diamond-cut reel",
          videoAriaLabel: "High-energy social reel editing proof",
        },
        {
          title: "Campaign moment — layered build",
          type: "Brand Moment",
          description: "Layered reveals and controlled tension for a premium campaign feel.",
          tags: ["Layers", "Tension", "Brand"],
          posterSrc: "/assets/work/night-drive-poster.svg",
          videoSrc: "/assets/videos/diamten/diamanten_2.mp4",
          alt: "Poster frame for a layered brand moment edit",
          videoAriaLabel: "Brand moment edit with layered pacing",
        },
        {
          title: "Portrait performance — tight framing",
          type: "Creator Cut",
          description: "Performance-first framing with social-native pacing.",
          tags: ["Framing", "Creator", "Pacing"],
          posterSrc: "/assets/work/creator-performance-poster.svg",
          videoSrc: "/assets/videos/diamten/mario%20festhalten%20neu.mp4",
          alt: "Poster frame for a portrait performance edit",
          videoAriaLabel: "Creator portrait performance editing example",
        },
        {
          title: "Mood study — contrast & tone",
          type: "Atmospheric Edit",
          description: "Contrast-driven tone shaping with deliberate pacing.",
          tags: ["Tone", "Contrast", "Mood"],
          posterSrc: "/assets/work/fitness-reel-poster.svg",
          videoSrc: "/assets/videos/diamten/negative%20final.mp4",
          alt: "Poster frame for a moody contrast-driven edit",
          videoAriaLabel: "Atmospheric editing with contrast and tone",
        },
        {
          title: "Series trailer — hook forward",
          type: "Trailer",
          description: "Hook-first structure built for retention and clarity.",
          tags: ["Hook", "Trailer", "Retention"],
          posterSrc: "/assets/work/night-drive-poster.svg",
          videoSrc: "/assets/videos/podcast%20trailer/PODCAST_TRAILER.mp4",
          alt: "Poster frame for a series trailer edit",
          videoAriaLabel: "Series trailer editing with hook-forward pacing",
        },
        {
          title: "Weekly drop — fast turnaround",
          type: "Weekly Edit",
          description: "Tight turnaround pacing with consistent visual language.",
          tags: ["Weekly", "Speed", "Consistency"],
          posterSrc: "/assets/work/creator-performance-poster.svg",
          videoSrc: "/assets/videos/podcast%20trailer/Podvast10.05.mp4",
          alt: "Poster frame for a weekly drop edit",
          videoAriaLabel: "Weekly content drop editing example",
        },
        {
          title: "Episode teaser — cliffhanger rhythm",
          type: "Teaser",
          description: "Micro-tension and rhythm tuned for a teaser format.",
          tags: ["Teaser", "Rhythm", "Tension"],
          posterSrc: "/assets/work/fitness-reel-poster.svg",
          videoSrc: "/assets/videos/podcast%20trailer/trailer%20f15.mp4",
          alt: "Poster frame for an episode teaser edit",
          videoAriaLabel: "Episode teaser editing with cliffhanger rhythm",
        },
        {
          title: "Long-form cut — narrative arc",
          type: "Long-form",
          description: "Macro pacing and chapter-like structure for longer storytelling.",
          tags: ["Narrative", "Arc", "Pacing"],
          posterSrc: "/assets/work/night-drive-poster.svg",
          videoSrc: "/assets/videos/podcast%20trailer/trailer%20folge%2014.mp4",
          alt: "Poster frame for a long-form narrative edit",
          videoAriaLabel: "Long-form narrative editing example",
        },
        {
          title: "Finance explain — clarity first",
          type: "Explain Edit",
          description: "Clarity-first pacing for information-heavy visuals.",
          tags: ["Clarity", "Explain", "Structure"],
          posterSrc: "/assets/work/creator-performance-poster.svg",
          videoSrc: "/assets/videos/random/investment.mp4",
          alt: "Poster frame for a finance explain edit",
          videoAriaLabel: "Finance content editing with clarity-first pacing",
        },
        {
          title: "Food spot — playful rhythm",
          type: "Product Spot",
          description: "Playful rhythm and tight product beats for social delivery.",
          tags: ["Product", "Rhythm", "Social"],
          posterSrc: "/assets/work/fitness-reel-poster.svg",
          videoSrc: "/assets/videos/random/mealplans%20leiser.mp4",
          alt: "Poster frame for a playful food product edit",
          videoAriaLabel: "Food product spot editing with playful rhythm",
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
    focus: {
      title: "FOKUS",
      items: [
        {
          title: "Pacing & Rhythmus",
          description: "Schnitte mit Luft und Präzision — Klarheit statt Lärm.",
        },
        {
          title: "Visuelle Intention",
          description: "Jedes Bild hat Gewicht; Emotion vor Dekoration.",
        },
        {
          title: "Sound-Sinn",
          description: "Musik und Ambiente als Teil des Bildes gedacht.",
        },
        {
          title: "Delivery-ready Exports",
          description: "Formate und Specs, die zu Plattformen passen.",
        },
      ],
    },
    services: {
      title: "SERVICES",
      items: [
        {
          title: "Reel Editing",
          description: "Vertikale Edits mit klarer Dramaturgie und Drive.",
        },
        {
          title: "Cinematic Content",
          description: "Langform mit Atmosphäre — Story und Stimmung zuerst.",
        },
        {
          title: "Ads",
          description: "Commercial-Schnitte mit sofortiger Aufmerksamkeit.",
        },
        {
          title: "YouTube",
          description: "Retention-orientiertes Timing für Hooks und Kapitel.",
        },
        {
          title: "Music Videos",
          description: "Performance-zentrierte Cuts im Rhythmus des Tracks.",
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
      viewMoreWork: "Mehr Work anzeigen",
      showLessWork: "Weniger anzeigen",
      items: [
        {
          title: "Fitness — Cinematic Reel",
          type: "Cinematic Reel",
          description:
            "Energiegeladenes Pacing, präzise Übergänge und eine hochwertige Trainingsatmosphäre.",
          tags: ["Hook", "Pacing", "Sound Sync"],
          posterSrc: "/assets/work/fitness-reel-poster.svg",
          videoSrc: "/assets/videos/diamten/sinnvoll_final.mp4",
          alt: "Posterbild eines cinematic Fitness Reels",
          videoAriaLabel: "Beispiel für ein cinematic Fitness-Reel-Editing",
        },
        {
          title: "Brand Spot — Night Drive",
          type: "Brand Spot",
          description: "Moody Visuals, klare Cuts und atmosphärisches Product Framing.",
          tags: ["Atmosphäre", "Brand", "Motion"],
          posterSrc: "/assets/work/night-drive-poster.svg",
          videoSrc: "/assets/videos/podcast%20trailer/PT_FINAL.mp4",
          alt: "Posterbild eines Night Drive Brand Spots",
          videoAriaLabel: "Brand-Trailer-Editing mit atmosphärischem Pacing",
        },
        {
          title: "Creator Edit — Performance",
          type: "Creator Edit",
          description: "Schnelle Struktur, retention-fokussiertes Timing und social-first Delivery.",
          tags: ["Retention", "Social", "Performance"],
          posterSrc: "/assets/work/creator-performance-poster.svg",
          videoSrc: "/assets/videos/random/ayo.mp4",
          alt: "Posterbild eines Creator Performance Edits",
          videoAriaLabel: "Social-Media-Reel als Editing-Proof",
        },
      ],
      moreItems: [
        {
          title: "Diamond Cut — Energy Edit",
          type: "Social Reel",
          description: "Direkter Rhythmus, klare Struktur und eine starke visuelle Haltung.",
          tags: ["Energy", "Pacing", "Struktur"],
          posterSrc: "/assets/work/fitness-reel-poster.svg",
          videoSrc: "/assets/videos/diamten/bracen.mp4",
          alt: "Vorschau eines energiegeladenen Diamond-Cut-Reels",
          videoAriaLabel: "Social-Reel-Proof mit hoher Energie",
        },
        {
          title: "Campaign Moment — Layered Build",
          type: "Brand Moment",
          description: "Geschichtete Reveals und kontrollierte Spannung für Premium-Feeling.",
          tags: ["Layers", "Spannung", "Brand"],
          posterSrc: "/assets/work/night-drive-poster.svg",
          videoSrc: "/assets/videos/diamten/diamanten_2.mp4",
          alt: "Vorschau eines geschichteten Brand-Moment-Edits",
          videoAriaLabel: "Brand-Moment-Edit mit geschichtetem Pacing",
        },
        {
          title: "Portrait Performance — Tight Framing",
          type: "Creator Cut",
          description: "Performance-first Framing mit social-nativem Pacing.",
          tags: ["Framing", "Creator", "Pacing"],
          posterSrc: "/assets/work/creator-performance-poster.svg",
          videoSrc: "/assets/videos/diamten/mario%20festhalten%20neu.mp4",
          alt: "Vorschau eines Portrait-Performance-Edits",
          videoAriaLabel: "Creator-Portrait-Performance-Editing",
        },
        {
          title: "Mood Study — Kontrast & Ton",
          type: "Atmospheric Edit",
          description: "Kontrastgetriebene Tonführung mit bewusstem Pacing.",
          tags: ["Ton", "Kontrast", "Mood"],
          posterSrc: "/assets/work/fitness-reel-poster.svg",
          videoSrc: "/assets/videos/diamten/negative%20final.mp4",
          alt: "Vorschau eines moody Kontrast-Edits",
          videoAriaLabel: "Atmosphärisches Editing mit Kontrast und Ton",
        },
        {
          title: "Serien-Trailer — Hook forward",
          type: "Trailer",
          description: "Hook-first Struktur für Retention und klare Lesbarkeit.",
          tags: ["Hook", "Trailer", "Retention"],
          posterSrc: "/assets/work/night-drive-poster.svg",
          videoSrc: "/assets/videos/podcast%20trailer/PODCAST_TRAILER.mp4",
          alt: "Vorschau eines Serien-Trailer-Edits",
          videoAriaLabel: "Serien-Trailer-Editing mit Hook-forward-Pacing",
        },
        {
          title: "Weekly Drop — schnelle Turnaround",
          type: "Weekly Edit",
          description: "Straffes Turnaround-Pacing mit konsistenter Bildsprache.",
          tags: ["Weekly", "Speed", "Konsistenz"],
          posterSrc: "/assets/work/creator-performance-poster.svg",
          videoSrc: "/assets/videos/podcast%20trailer/Podvast10.05.mp4",
          alt: "Vorschau eines Weekly-Drop-Edits",
          videoAriaLabel: "Weekly-Content-Drop als Editing-Beispiel",
        },
        {
          title: "Episode Teaser — Cliffhanger-Rhythmus",
          type: "Teaser",
          description: "Mikro-Spannung und Rhythmus im Teaser-Format.",
          tags: ["Teaser", "Rhythmus", "Spannung"],
          posterSrc: "/assets/work/fitness-reel-poster.svg",
          videoSrc: "/assets/videos/podcast%20trailer/trailer%20f15.mp4",
          alt: "Vorschau eines Episode-Teaser-Edits",
          videoAriaLabel: "Episode-Teaser mit Cliffhanger-Rhythmus",
        },
        {
          title: "Long-form Cut — narrative Arc",
          type: "Long-form",
          description: "Makro-Pacing und kapitelartige Struktur für längere Stories.",
          tags: ["Narrativ", "Arc", "Pacing"],
          posterSrc: "/assets/work/night-drive-poster.svg",
          videoSrc: "/assets/videos/podcast%20trailer/trailer%20folge%2014.mp4",
          alt: "Vorschau eines Long-form-Narrativ-Edits",
          videoAriaLabel: "Long-form-Narrativ-Editing",
        },
        {
          title: "Finance Explain — Klarheit zuerst",
          type: "Explain Edit",
          description: "Klarheits-first Pacing für informationsreiche Visuals.",
          tags: ["Klarheit", "Explain", "Struktur"],
          posterSrc: "/assets/work/creator-performance-poster.svg",
          videoSrc: "/assets/videos/random/investment.mp4",
          alt: "Vorschau eines Finance-Explain-Edits",
          videoAriaLabel: "Finance-Content-Editing mit Klarheits-Fokus",
        },
        {
          title: "Food Spot — spielerischer Rhythmus",
          type: "Product Spot",
          description: "Spielerischer Rhythmus und präzise Produkt-Beats für Social.",
          tags: ["Produkt", "Rhythmus", "Social"],
          posterSrc: "/assets/work/fitness-reel-poster.svg",
          videoSrc: "/assets/videos/random/mealplans%20leiser.mp4",
          alt: "Vorschau eines spielerischen Food-Produkt-Edits",
          videoAriaLabel: "Food-Produkt-Spot mit spielerischem Rhythmus",
        },
      ],
    },
    impactSnapshot: {
      ariaLabel: "Engagement-Kennzahlen — Likes, Aufrufe, Kommentare und Shares",
      statementLines: ["Mehr Likes.", "Mehr Views.", "Mehr Aufmerksamkeit."] as const,
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
