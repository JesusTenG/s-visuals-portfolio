import type { Locale } from "./config";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    wordmark: string;
    links: {
      work: string;
      services: string;
      process: string;
      contact: string;
    };
    cta: string;
    langSwitchLabel: string;
  };
  hero: {
    eyebrow: string;
    catchphraseLines: [string, string, string];
    seoTitle: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    platformStripLabel: string;
    platformStripItems: string[];
    floatingMetrics: {
      views: { label: string; targetValue: number; suffix: string; decimals: number };
      likes: { label: string; targetValue: number; suffix: string; decimals: number };
      comments: { label: string; targetValue: number; suffix: string; decimals: number };
      shares: { label: string; targetValue: number; suffix: string; decimals: number };
    };
  };
  metrics: {
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  services: {
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  process: {
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
      process: string;
      contact: string;
    };
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      title: "S-Visuals | Short-Form Video Editing for Reels, TikTok & Shorts",
      description:
        "Premium short-form video editing for creators, brands and businesses that want more attention, watchtime and engagement.",
    },
    nav: {
      wordmark: "S-Visuals",
      links: {
        work: "Work",
        services: "Services",
        process: "Process",
        contact: "Contact",
      },
      cta: "Start a project",
      langSwitchLabel: "DE",
    },
    hero: {
      eyebrow: "Video editing + filming",
      catchphraseLines: ["More attention.", "More views.", "More results."],
      seoTitle:
        "Video editing, cutting and short-form content for creators, brands and businesses. Optimized for Reels, TikTok, YouTube Shorts and social content.",
      description:
        "Premium video editing and filming support. Built around strong hooks, retention-focused cuts and platform-ready exports.",
      primaryCta: "Start a project",
      secondaryCta: "View work",
      platformStripLabel: "Platform-ready for",
      platformStripItems: [
        "Instagram",
        "TikTok",
        "YouTube",
        "Reels",
        "Shorts",
        "Video Editing",
        "Cutting",
        "Filming",
        "Social Ads",
        "Captions",
      ],
      floatingMetrics: {
        views: { label: "Views", targetValue: 2.3, suffix: "M", decimals: 1 },
        likes: { label: "Likes", targetValue: 128, suffix: "K", decimals: 0 },
        comments: { label: "Comments", targetValue: 4.6, suffix: "K", decimals: 1 },
        shares: { label: "Shares", targetValue: 3.1, suffix: "K", decimals: 1 },
      },
    },
    metrics: {
      title: "Built for performance",
      items: [
        {
          title: "Watchtime-first edits",
          description: "Structure and pacing designed to keep viewers watching.",
        },
        {
          title: "Short-form optimized",
          description: "Hooks, rhythm and timing tuned for vertical platforms.",
        },
        {
          title: "Built for retention",
          description: "Clean storytelling that reduces drop-off.",
        },
        {
          title: "Made for Reels, TikTok & Shorts",
          description: "Formats, safe zones and export standards done right.",
        },
      ],
    },
    services: {
      title: "Services",
      items: [
        {
          title: "Reel Editing",
          description: "High-signal edits from your raw clips. Crisp, paced, retention-first.",
        },
        {
          title: "Short-Form Strategy",
          description: "Hook frameworks, content angles and iteration focused on what performs.",
        },
        {
          title: "Social Media Content Systems",
          description: "A repeatable pipeline from capture to publish. Designed for consistency.",
        },
      ],
    },
    process: {
      title: "Process",
      steps: [
        { title: "Send raw footage", description: "Upload clips, references and must-keep moments." },
        { title: "Define the goal", description: "Audience, platform and outcome (reach, leads, sales)." },
        { title: "Edit for retention", description: "Hook, pacing and sound design built to hold attention." },
        { title: "Publish and improve", description: "Export-ready deliverables. Iterate based on results." },
      ],
    },
    work: {
      title: "Selected Work",
      items: [
        { title: "Fitness Reel Concept", tag: "Hook + pacing" },
        { title: "Personal Brand Clip", tag: "Story + clarity" },
        { title: "Product Highlight", tag: "Benefit-led cut" },
      ],
    },
    contact: {
      title: "Ready to upgrade your short-form?",
      description:
        "We turn attention into measurable engagement. Your content earns watchtime, likes, comments, shares and reach.",
      cta: "Contact S-Visuals",
    },
    footer: {
      copyright: "© S-Visuals",
      links: {
        work: "Work",
        services: "Services",
        process: "Process",
        contact: "Contact",
      },
    },
  },
  de: {
    meta: {
      title: "S-Visuals | Short-Form Videoschnitt für Reels, TikTok & Shorts",
      description:
        "Premium Short-Form Videoschnitt für Creator, Marken und Unternehmen, die mehr Aufmerksamkeit, Watchtime und Engagement wollen.",
    },
    nav: {
      wordmark: "S-Visuals",
      links: {
        work: "Arbeiten",
        services: "Services",
        process: "Prozess",
        contact: "Kontakt",
      },
      cta: "Projekt starten",
      langSwitchLabel: "EN",
    },
    hero: {
      eyebrow: "Video Editing und Filming",
      catchphraseLines: ["Mehr Aufmerksamkeit.", "Mehr Aufrufe.", "Mehr Ergebnisse."],
      seoTitle:
        "Video Editing, Cutting und Short-Form Content für Creator, Marken und Unternehmen. Optimiert für Reels, TikTok, YouTube Shorts und Social Content.",
      description:
        "Premium Video Editing mit Filming-Support. Mit starken Hooks, retention-orientierten Cuts und plattformfertigen Exports.",
      primaryCta: "Projekt starten",
      secondaryCta: "Arbeiten ansehen",
      platformStripLabel: "Platform-ready für",
      platformStripItems: [
        "Instagram",
        "TikTok",
        "YouTube",
        "Reels",
        "Shorts",
        "Video Editing",
        "Cutting",
        "Filming",
        "Social Ads",
        "Captions",
      ],
      floatingMetrics: {
        views: { label: "Aufrufe", targetValue: 2.3, suffix: "M", decimals: 1 },
        likes: { label: "Likes", targetValue: 128, suffix: "K", decimals: 0 },
        comments: { label: "Kommentare", targetValue: 4.6, suffix: "K", decimals: 1 },
        shares: { label: "Teilungen", targetValue: 3.1, suffix: "K", decimals: 1 },
      },
    },
    metrics: {
      title: "Auf Performance ausgelegt",
      items: [
        {
          title: "Edits für mehr Watchtime",
          description: "Struktur und Tempo, damit Zuschauer dranbleiben.",
        },
        {
          title: "Short-Form optimiert",
          description: "Hooks, Rhythmus und Timing für Vertical-Plattformen.",
        },
        {
          title: "Auf Retention ausgelegt",
          description: "Klares Storytelling mit weniger Drop-off.",
        },
        {
          title: "Für Reels, TikTok & Shorts",
          description: "Formate, Safe-Zones und Exports sauber umgesetzt.",
        },
      ],
    },
    services: {
      title: "Services",
      items: [
        {
          title: "Reel-Schnitt",
          description: "High-Signal Edits aus deinen Clips. Clean, paced, retention-first.",
        },
        {
          title: "Short-Form-Strategie",
          description: "Hook-Frameworks, Content-Angles und Iteration nach Performance.",
        },
        {
          title: "Social-Media-Content-Systeme",
          description: "Ein wiederholbarer Workflow von Capture bis Publish. Für Konsistenz.",
        },
      ],
    },
    process: {
      title: "Prozess",
      steps: [
        { title: "Rohmaterial senden", description: "Clips, Referenzen und Must-haves bereitstellen." },
        { title: "Ziel definieren", description: "Audience, Plattform und Outcome (Reach, Leads, Sales)." },
        { title: "Für Retention schneiden", description: "Hook, Tempo und Sound für maximale Aufmerksamkeit." },
        { title: "Veröffentlichen und verbessern", description: "Upload-ready Deliverables. Iterieren nach Daten." },
      ],
    },
    work: {
      title: "Ausgewählte Arbeiten",
      items: [
        { title: "Fitness-Reel-Konzept", tag: "Hook + Tempo" },
        { title: "Personal-Brand-Clip", tag: "Story + Klarheit" },
        { title: "Produkt-Highlight", tag: "Benefit-Edit" },
      ],
    },
    contact: {
      title: "Bereit für Short-Form auf Premium-Niveau?",
      description:
        "Wir machen Aufmerksamkeit messbar. Mit mehr Watchtime, Likes, Kommentaren, Shares und Reichweite.",
      cta: "S-Visuals kontaktieren",
    },
    footer: {
      copyright: "© S-Visuals",
      links: {
        work: "Arbeiten",
        services: "Services",
        process: "Prozess",
        contact: "Kontakt",
      },
    },
  },
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale];
}

