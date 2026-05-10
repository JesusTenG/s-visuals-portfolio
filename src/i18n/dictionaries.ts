import type { Locale } from "./config";

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
  metrics: {
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
    title: string;
    items: Array<{ title: string; tag: string }>;
  };
  contact: {
    title: string;
    description: string;
    cta: string;
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
    metrics: {
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
      title: "WORK",
      items: [
        { title: "Fitness — cinematic reel", tag: "Hook · pacing · contrast" },
        { title: "Brand spot — night drive", tag: "Mood · grade · sound" },
        { title: "Creator edit — performance", tag: "Energy · structure · cuts" },
      ],
    },
    contact: {
      title: "Let’s build something sharp.",
      description:
        "Tell me about your project, timeline and references — I’ll reply with next steps.",
      cta: "START A PROJECT",
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
    metrics: {
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
      title: "WORK",
      items: [
        { title: "Fitness — cinematic reel", tag: "Hook · Rhythmus · Kontrast" },
        { title: "Brand spot — night drive", tag: "Mood · Grade · Sound" },
        { title: "Creator edit — performance", tag: "Energie · Struktur · Cuts" },
      ],
    },
    contact: {
      title: "Lass uns etwas Präzises bauen.",
      description:
        "Schreib mir zu Projekt, Timeline und Referenzen — ich melde mich mit den nächsten Schritten.",
      cta: "PROJEKT STARTEN",
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
