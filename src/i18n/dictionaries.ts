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
    collaborationsCtaLabel: string;
    collaborationsCtaHref: string;
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
