import type { Locale } from "./config";

export type WorkVideoItem = {
  title: string;
  description: string;
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
    heroVideoPreviewToggle: string;
    heroImageToggle: string;
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
      icon: "smartphone" | "monitor-play" | "megaphone" | "camera";
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
      cta: "CONTACT",
      langSwitchLabel: "DE",
      heroVideoPreviewToggle: "Video Preview",
      heroImageToggle: "Image Hero",
    },
    hero: {
      eyebrow: "SIMON SAAD",
      headline: "VISUALS",
      subline: "FOR BRANDS & CREATORS",
      seoH1: "Simon Saad Visuals — High Impact Video Editing for Brands and Creators",
      services: ["REEL EDITING", "YOUTUBE", "ADS", "FILMING"],
      primaryCta: "REQUEST PROJECT",
      primaryCtaHref: "#contact",
      secondaryCta: "VIEW WORK",
      secondaryCtaHref: "#work",
      scrollLabel: "SCROLL",
    },
    services: {
      title: "Editing built for impact",
      intro:
        "Reels, YouTube, campaigns and on-set filming. Cleanly edited, clearly structured and built to feel premium.",
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
            "Longer videos, interviews and episodes, including trailers and podcast formats, with clean structure, flow and clear viewer guidance.",
          icon: "monitor-play",
        },
        {
          title: "Ads & Campaign Cuts",
          description:
            "Campaign and product videos with strong hooks, a clear message and fast visual impact.",
          icon: "megaphone",
        },
        {
          title: "Filming",
          description:
            "On-set capture for brands, creators and campaigns, with planned shots, clean footage and a look built to edit well.",
          icon: "camera",
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
          title: "Prep My Meal Ad",
          description:
            "Commercial edit for @prepmymeal with @leon.haegele, shaped as a clean social ad for the feed.",
          posterSrc: "/assets/videos/posters/random/PIZZZZZA-poster.webp",
          previewSrc: "/assets/videos/preview/random/PIZZZZZA-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/PIZZZZZA-lightbox.mp4",
          alt: "Poster frame for Prep My Meal commercial edit",
          videoAriaLabel: "Open Prep My Meal commercial edit",
        },
        {
          title: "Educational Reel",
          description:
            "Meal plan content with @ramonlimacher, edited into a clear and calm educational reel.",
          posterSrc: "/assets/videos/posters/random/mealplans leiser-poster.webp",
          previewSrc: "/assets/videos/preview/random/mealplans leiser-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/mealplans leiser-lightbox.mp4",
          alt: "Poster frame for educational meal plan reel",
          videoAriaLabel: "Open educational meal plan reel",
        },
        {
          title: "Cinematic Gym Edit",
          description:
            "Cinematic edit with @leon.haegele, focused on gym atmosphere, movement and a premium look.",
          posterSrc: "/assets/videos/posters/random/VERSION2-poster.webp",
          previewSrc: "/assets/videos/preview/random/VERSION2-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/VERSION2-lightbox.mp4",
          alt: "Poster frame for cinematic gym edit",
          videoAriaLabel: "Open cinematic gym edit",
        },
      ],
      moreItems: [
        {
          title: "Diamond Campaign",
          description: "Premium campaign cut built around layered reveals and controlled tension.",
          posterSrc: "/assets/videos/posters/diamten/diamanten_2-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/diamanten_2-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/diamanten_2-lightbox.mp4",
          alt: "Poster frame for diamond campaign edit",
          videoAriaLabel: "Open diamond campaign edit",
        },
        {
          title: "Training Reel",
          description: "Training reel with sharp transitions and a strong gym atmosphere.",
          posterSrc: "/assets/videos/posters/diamten/sinnvoll_final-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/sinnvoll_final-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/sinnvoll_final-lightbox.mp4",
          alt: "Poster frame for training reel edit",
          videoAriaLabel: "Open training reel edit",
        },
        {
          title: "Podcast Trailer",
          description: "Podcast trailer with moody visuals and clean atmospheric cuts.",
          posterSrc: "/assets/videos/posters/podcast trailer/PT_FINAL-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/PT_FINAL-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/PT_FINAL-lightbox.mp4",
          alt: "Poster frame for podcast trailer edit",
          videoAriaLabel: "Open podcast trailer edit",
        },
        {
          title: "Creator Reel",
          description: "Creator reel with retention-focused pacing for social delivery.",
          posterSrc: "/assets/videos/posters/random/ayo-poster.webp",
          previewSrc: "/assets/videos/preview/random/ayo-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/ayo-lightbox.mp4",
          alt: "Poster frame for creator reel edit",
          videoAriaLabel: "Open creator reel edit",
        },
        {
          title: "Energy Reel",
          description: "High-energy social reel with punchy rhythm and a bold visual attitude.",
          posterSrc: "/assets/videos/posters/diamten/bracen-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/bracen-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/bracen-lightbox.mp4",
          alt: "Poster frame for energy reel edit",
          videoAriaLabel: "Open energy reel edit",
        },
        {
          title: "Creator Cut",
          description: "Performance-led creator cut with social-native pacing and framing.",
          posterSrc: "/assets/videos/posters/diamten/mario festhalten neu-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/mario festhalten neu-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/mario festhalten neu-lightbox.mp4",
          alt: "Poster frame for creator cut edit",
          videoAriaLabel: "Open creator cut edit",
        },
        {
          title: "Mood Edit",
          description: "Mood-driven edit with contrast-led tone and deliberate pacing.",
          posterSrc: "/assets/videos/posters/diamten/negative final-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/negative final-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/negative final-lightbox.mp4",
          alt: "Poster frame for mood edit",
          videoAriaLabel: "Open mood edit",
        },
        {
          title: "Series Trailer",
          description: "Series trailer shaped around hooks, clarity and retention.",
          posterSrc: "/assets/videos/posters/podcast trailer/PODCAST_TRAILER-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/PODCAST_TRAILER-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/PODCAST_TRAILER-lightbox.mp4",
          alt: "Poster frame for series trailer edit",
          videoAriaLabel: "Open series trailer edit",
        },
        {
          title: "Weekly Drop",
          description: "Weekly drop with tight turnaround and a consistent visual language.",
          posterSrc: "/assets/videos/posters/podcast trailer/Podvast10.05-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/Podvast10.05-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/Podvast10.05-lightbox.mp4",
          alt: "Poster frame for weekly drop edit",
          videoAriaLabel: "Open weekly drop edit",
        },
        {
          title: "Episode Teaser",
          description: "Episode teaser tuned for micro-tension, rhythm and a fast hook.",
          posterSrc: "/assets/videos/posters/podcast trailer/trailer f15-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/trailer f15-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/trailer f15-lightbox.mp4",
          alt: "Poster frame for episode teaser edit",
          videoAriaLabel: "Open episode teaser edit",
        },
        {
          title: "Episode Trailer",
          description: "Episode trailer with macro pacing for longer-form storytelling.",
          posterSrc: "/assets/videos/posters/podcast trailer/trailer folge 14-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/trailer folge 14-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/trailer folge 14-lightbox.mp4",
          alt: "Poster frame for episode trailer edit",
          videoAriaLabel: "Open episode trailer edit",
        },
        {
          title: "Explain Edit",
          description: "Explain-style edit built for clarity on information-heavy visuals.",
          posterSrc: "/assets/videos/posters/random/investment-poster.webp",
          previewSrc: "/assets/videos/preview/random/investment-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/investment-lightbox.mp4",
          alt: "Poster frame for explain edit",
          videoAriaLabel: "Open explain edit video",
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
      cta: "KONTAKT",
      langSwitchLabel: "EN",
      heroVideoPreviewToggle: "Video Preview",
      heroImageToggle: "Bild-Hero",
    },
    hero: {
      eyebrow: "SIMON SAAD",
      headline: "VISUALS",
      subline: "FÜR BRANDS & CREATORS",
      seoH1: "Simon Saad Visuals — High Impact Video Editing für Brands und Creator",
      services: ["REEL EDITING", "YOUTUBE", "ADS", "FILMING"],
      primaryCta: "PROJEKT ANFRAGEN",
      primaryCtaHref: "#contact",
      secondaryCta: "WORK ANSEHEN",
      secondaryCtaHref: "#work",
      scrollLabel: "SCROLL",
    },
    services: {
      title: "Schnitt, der Content stärker macht",
      intro:
        "Reels, YouTube, Kampagnen und Dreharbeiten. Präzise geschnitten, klar geführt, hochwertig umgesetzt.",
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
            "Längere Videos, Interviews und Episoden inkl. Trailer und Podcast-Formate mit sauberer Struktur, Flow und klarer Zuschauerführung.",
          icon: "monitor-play",
        },
        {
          title: "Werbevideos",
          description:
            "Kampagnen- und Produktvideos mit starken Hooks, klarer Botschaft und schneller visueller Wirkung.",
          icon: "megaphone",
        },
        {
          title: "Filming",
          description:
            "Dreharbeiten für Brands, Creator und Kampagnen mit geplanten Shots, sauberem Material und einem Look, der sich gut schneiden lässt.",
          icon: "camera",
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
          title: "Prep My Meal Ad",
          description:
            "Commercial Edit für @prepmymeal mit @leon.haegele, umgesetzt als cleaner Social Ad für den Feed.",
          posterSrc: "/assets/videos/posters/random/PIZZZZZA-poster.webp",
          previewSrc: "/assets/videos/preview/random/PIZZZZZA-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/PIZZZZZA-lightbox.mp4",
          alt: "Posterbild für Prep My Meal Werbespot",
          videoAriaLabel: "Prep My Meal Werbespot öffnen",
        },
        {
          title: "Educational Reel",
          description:
            "Meal-Plan-Content mit @ramonlimacher, als informatives Reel klar und ruhig aufbereitet.",
          posterSrc: "/assets/videos/posters/random/mealplans leiser-poster.webp",
          previewSrc: "/assets/videos/preview/random/mealplans leiser-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/mealplans leiser-lightbox.mp4",
          alt: "Posterbild für Educational Meal-Plan-Reel",
          videoAriaLabel: "Educational Meal-Plan-Reel öffnen",
        },
        {
          title: "Cinematic Gym Edit",
          description:
            "Cinematic Edit mit @leon.haegele, fokussiert auf Gym-Atmosphäre, Bewegung und einen hochwertigen Look.",
          posterSrc: "/assets/videos/posters/random/VERSION2-poster.webp",
          previewSrc: "/assets/videos/preview/random/VERSION2-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/VERSION2-lightbox.mp4",
          alt: "Posterbild für Cinematic Gym Edit",
          videoAriaLabel: "Cinematic Gym Edit öffnen",
        },
      ],
      moreItems: [
        {
          title: "Diamond Campaign",
          description:
            "Premium Campaign-Cut mit geschichteten Reveals und kontrollierter Spannung.",
          posterSrc: "/assets/videos/posters/diamten/diamanten_2-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/diamanten_2-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/diamanten_2-lightbox.mp4",
          alt: "Posterbild für Diamond Campaign Edit",
          videoAriaLabel: "Diamond Campaign Edit öffnen",
        },
        {
          title: "Training Reel",
          description: "Training-Reel mit präzisen Übergängen und starker Gym-Atmosphäre.",
          posterSrc: "/assets/videos/posters/diamten/sinnvoll_final-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/sinnvoll_final-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/sinnvoll_final-lightbox.mp4",
          alt: "Posterbild für Training Reel",
          videoAriaLabel: "Training Reel öffnen",
        },
        {
          title: "Podcast Trailer",
          description: "Podcast-Trailer mit moody Visuals und klaren atmosphärischen Cuts.",
          posterSrc: "/assets/videos/posters/podcast trailer/PT_FINAL-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/PT_FINAL-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/PT_FINAL-lightbox.mp4",
          alt: "Posterbild für Podcast Trailer",
          videoAriaLabel: "Podcast Trailer öffnen",
        },
        {
          title: "Creator Reel",
          description: "Creator-Reel mit retention-fokussiertem Pacing für Social.",
          posterSrc: "/assets/videos/posters/random/ayo-poster.webp",
          previewSrc: "/assets/videos/preview/random/ayo-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/ayo-lightbox.mp4",
          alt: "Posterbild für Creator Reel",
          videoAriaLabel: "Creator Reel öffnen",
        },
        {
          title: "Energy Reel",
          description: "Energiegeladenes Social-Reel mit direktem Rhythmus und klarer Haltung.",
          posterSrc: "/assets/videos/posters/diamten/bracen-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/bracen-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/bracen-lightbox.mp4",
          alt: "Posterbild für Energy Reel",
          videoAriaLabel: "Energy Reel öffnen",
        },
        {
          title: "Creator Cut",
          description: "Performance-orientierter Creator-Cut mit social-nativem Pacing.",
          posterSrc: "/assets/videos/posters/diamten/mario festhalten neu-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/mario festhalten neu-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/mario festhalten neu-lightbox.mp4",
          alt: "Posterbild für Creator Cut",
          videoAriaLabel: "Creator Cut öffnen",
        },
        {
          title: "Mood Edit",
          description: "Stimmungsgetriebener Edit mit kontrastreicher Tonführung und Pacing.",
          posterSrc: "/assets/videos/posters/diamten/negative final-poster.webp",
          previewSrc: "/assets/videos/preview/diamten/negative final-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/diamten/negative final-lightbox.mp4",
          alt: "Posterbild für Mood Edit",
          videoAriaLabel: "Mood Edit öffnen",
        },
        {
          title: "Series Trailer",
          description: "Serien-Trailer mit klaren Hooks, Struktur und Retention.",
          posterSrc: "/assets/videos/posters/podcast trailer/PODCAST_TRAILER-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/PODCAST_TRAILER-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/PODCAST_TRAILER-lightbox.mp4",
          alt: "Posterbild für Series Trailer",
          videoAriaLabel: "Series Trailer öffnen",
        },
        {
          title: "Weekly Drop",
          description: "Weekly Drop mit straffem Turnaround und konsistenter Bildsprache.",
          posterSrc: "/assets/videos/posters/podcast trailer/Podvast10.05-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/Podvast10.05-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/Podvast10.05-lightbox.mp4",
          alt: "Posterbild für Weekly Drop",
          videoAriaLabel: "Weekly Drop öffnen",
        },
        {
          title: "Episode Teaser",
          description: "Episode-Teaser mit Mikro-Spannung, Rhythmus und schnellem Hook.",
          posterSrc: "/assets/videos/posters/podcast trailer/trailer f15-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/trailer f15-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/trailer f15-lightbox.mp4",
          alt: "Posterbild für Episode Teaser",
          videoAriaLabel: "Episode Teaser öffnen",
        },
        {
          title: "Episode Trailer",
          description: "Episode-Trailer mit Makro-Pacing für längere Story-Formate.",
          posterSrc: "/assets/videos/posters/podcast trailer/trailer folge 14-poster.webp",
          previewSrc: "/assets/videos/preview/podcast trailer/trailer folge 14-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/podcast trailer/trailer folge 14-lightbox.mp4",
          alt: "Posterbild für Episode Trailer",
          videoAriaLabel: "Episode Trailer öffnen",
        },
        {
          title: "Explain Edit",
          description: "Explain-Edit für informationsreiche Visuals mit klarer Struktur.",
          posterSrc: "/assets/videos/posters/random/investment-poster.webp",
          previewSrc: "/assets/videos/preview/random/investment-web.mp4",
          lightboxSrc: "/assets/videos/lightbox/random/investment-lightbox.mp4",
          alt: "Posterbild für Explain Edit",
          videoAriaLabel: "Explain Edit öffnen",
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
