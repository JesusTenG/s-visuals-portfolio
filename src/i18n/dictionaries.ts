import type { Locale } from "./config";

export type WorkVideoItem = {
  title: string;
  description: string;
  posterSrc: string;
  previewSrc: string;
  lightboxSrc: string;
  alt: string;
  videoAriaLabel: string;
  /** Links this portfolio clip to a collaboration case page. */
  caseSlug?: string;
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
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      title: string;
      description: string;
      icon: "smartphone" | "monitor-play" | "megaphone" | "camera";
    }>;
  };
  identity: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{ title: string; description: string }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
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
    eyebrow: string;
    title: string;
  };
  clientStories: {
    eyebrow: string;
    title: string;
    intro: string;
    viewCase: string;
  };
  contact: {
    title: string;
    description: string;
    cta: string;
    instagramLabel: string;
    instagramCta: string;
  };
  caseDetail: {
    back: string;
    overviewTitle: string;
    scopeTitle: string;
    roleTitle: string;
    platformsTitle: string;
    formatsTitle: string;
    contentGridTitle: string;
    servicesLink: string;
    servicesHref: string;
    cta: string;
    ctaHref: string;
  };
  footer: {
    copyright: string;
    instagramLabel: string;
    links: {
      work: string;
      services: string;
      about: string;
      contact: string;
      impressum: string;
      datenschutz: string;
    };
  };
  legal: {
    impressum: { title: string; sections: Array<{ heading: string; body: string }> };
    datenschutz: { title: string; sections: Array<{ heading: string; body: string }> };
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      title: "Simon Saad Visuals — High Impact Video Editing for Brands & Creators",
      description:
        "Premium video editing and production for brands and creators in Germany — reels, YouTube, ads and filming. Remote collaborations nationwide.",
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
      seoH1:
        "High Impact Video Editing for Brands and Creators — Simon Saad Visuals",
      services: ["REEL EDITING", "YOUTUBE", "ADS", "FILMING"],
      primaryCta: "REQUEST PROJECT",
      primaryCtaHref: "#contact",
      secondaryCta: "VIEW WORK",
      secondaryCtaHref: "#work",
      scrollLabel: "SCROLL",
    },
    identity: {
      eyebrow: "PREMIUM SOCIAL EDITOR",
      title: "About Simon",
      paragraphs: [
        "Simon Saad Visuals is a premium video editing and production portfolio for creators, influencers and brands that need social-native content with a high-end look.",
        "Based in Germany and working remotely nationwide, Simon focuses on short-form edits, YouTube, commercial cuts and on-set filming — with clear communication and an editor-first mindset.",
        "This is not budget bulk editing. Every project is shaped for impact, rhythm and brand clarity.",
      ],
    },
    services: {
      eyebrow: "SERVICES",
      title: "Editing built for impact",
      intro:
        "Reels, TikToks, YouTube, commercial videos and filming — cleanly edited, clearly structured and built to feel premium.",
      items: [
        {
          title: "Shortform Editing",
          description:
            "Reels, TikToks and YouTube Shorts with fast pacing, clean cuts and a look built for social — ideal when you want short-form video editing for creators and brands.",
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
            "Commercial and campaign videos with strong hooks — social media ads and product films with fast visual impact.",
          icon: "megaphone",
        },
        {
          title: "Filming",
          description:
            "On-set capture for brands, creators and campaigns — social media video production with footage built to edit well.",
          icon: "camera",
        },
      ],
    },
    about: {
      eyebrow: "PROCESS",
      title: "How we work",
      intro:
        "From first message to final export — a clear process built for premium collaborations with creators and brands.",
      steps: [
        {
          title: "01 — Project inquiry",
          description:
            "You share goal, formats, references and timeline. We align on scope before editing starts.",
        },
        {
          title: "02 — Edit & direction",
          description:
            "Simon shapes pacing, structure and visual direction — story-first, platform-aware.",
        },
        {
          title: "03 — Feedback rounds",
          description: "Clear revision loops with focused notes — fewer rounds, stronger results.",
        },
        {
          title: "04 — Delivery",
          description:
            "Final exports optimized for your platforms — ready to publish or run as ads.",
        },
      ],
    },
    faq: {
      eyebrow: "QUESTIONS",
      title: "FAQ",
      items: [
        {
          question: "Do you edit reels, TikToks and YouTube Shorts?",
          answer:
            "Yes. Short-form editing for Instagram, TikTok and YouTube Shorts is a core service — including hooks, pacing and platform-native structure.",
        },
        {
          question: "Do you work with clients across Germany?",
          answer:
            "Yes. Collaborations run remotely across Germany. Filming can be planned where needed.",
        },
        {
          question: "What is the difference between editing and filming?",
          answer:
            "Editing covers cutting and finishing existing footage. Filming includes on-set capture so the project is planned for a strong edit from day one.",
        },
        {
          question: "Who is Simon Saad Visuals not for?",
          answer:
            "Wedding-only requests, bulk budget editing or photography-first projects are not a fit. The focus is premium social and commercial video for creators and brands.",
        },
      ],
    },
    work: {
      eyebrow: "SELECTED WORK",
      title: "Proof in motion",
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
          alt: "Poster frame for Prep My Meal commercial edit by Simon Saad Visuals",
          videoAriaLabel: "Open Prep My Meal commercial edit",
          caseSlug: "prep-my-meal-leon-haegele",
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
      eyebrow: "TRUST",
      title: "What clients say about working together",
    },
    clientStories: {
      eyebrow: "COLLABORATIONS",
      title: "Long-term visual systems for creators and brands",
      intro:
        "Explore collaborations with recurring edits, campaign visuals and content built around a consistent visual direction.",
      viewCase: "View case",
    },
    contact: {
      title: "Let’s build something sharp.",
      description:
        "Tell me about your project, timeline and references — I’ll reply with next steps. Project inquiries via Instagram DM.",
      cta: "START A PROJECT",
      instagramLabel: "@simon__saad",
      instagramCta: "Message on Instagram",
    },
    caseDetail: {
      back: "Back to selected work",
      overviewTitle: "Project overview",
      scopeTitle: "Scope",
      roleTitle: "Role",
      platformsTitle: "Platforms",
      formatsTitle: "Formats",
      contentGridTitle: "Content from this collaboration",
      servicesLink: "View services",
      servicesHref: "#services",
      cta: "Start a project",
      ctaHref: "#contact",
    },
    footer: {
      copyright: "© Simon Saad Visuals",
      instagramLabel: "@simon__saad",
      links: {
        work: "WORK",
        services: "SERVICES",
        about: "ABOUT",
        contact: "CONTACT",
        impressum: "IMPRINT",
        datenschutz: "PRIVACY",
      },
    },
    legal: {
      impressum: {
        title: "Imprint",
        sections: [
          {
            heading: "Information pursuant to § 5 TMG",
            body: "Simon Saad Visuals\n[Street and house number]\n[Postal code] [City]\nGermany\n\nContact: via Instagram @simon__saad or project inquiry on this website.\n\nResponsible for content: Simon Saad",
          },
          {
            heading: "Note",
            body: "Please replace the placeholder address with your legally required business details before publication.",
          },
        ],
      },
      datenschutz: {
        title: "Privacy Policy",
        sections: [
          {
            heading: "Overview",
            body: "This website is operated by Simon Saad Visuals. Personal data is processed only to the extent necessary to operate the site and handle project inquiries.",
          },
          {
            heading: "Hosting & server logs",
            body: "When you visit this website, the hosting provider may process technical access data (e.g. IP address, timestamp, requested URL) in server logs for security and operation.",
          },
          {
            heading: "External links",
            body: "Links to Instagram and other third-party services are subject to the privacy policies of those providers. When you follow an external link, their terms apply.",
          },
          {
            heading: "Your rights",
            body: "You may have rights of access, rectification, erasure, restriction and objection under applicable data protection law. Contact Simon Saad for requests related to this website.",
          },
          {
            heading: "Note",
            body: "This is a baseline privacy text. Please review and complete it with your hosting provider details and legal counsel before publication.",
          },
        ],
      },
    },
  },
  de: {
    meta: {
      title: "Simon Saad Visuals — Premium Video Editing für Creator & Brands",
      description:
        "Video Editing & Video Produktion in Deutschland: Reels, TikToks, YouTube, Werbevideos & Dreharbeiten für Creator, Influencer und Marken. Jetzt Projekt anfragen.",
    },
    nav: {
      wordmark: "Simon Saad Visuals",
      logoTop: "SIMON SAAD",
      logoBottom: "VISUALS",
      links: {
        work: "ARBEIT",
        services: "LEISTUNGEN",
        about: "PROZESS",
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
      seoH1:
        "Premium Video Editing für Creator und Brands — Simon Saad Visuals",
      services: ["REEL EDITING", "YOUTUBE", "ADS", "FILMING"],
      primaryCta: "PROJEKT ANFRAGEN",
      primaryCtaHref: "#contact",
      secondaryCta: "WORK ANSEHEN",
      secondaryCtaHref: "#work",
      scrollLabel: "SCROLL",
    },
    identity: {
      eyebrow: "PREMIUM SOCIAL EDITOR",
      title: "Über Simon",
      paragraphs: [
        "Simon Saad Visuals ist ein Premium-Portfolio für Video Editing und Produktion — für Creator, Influencer und Marken, die social-native Inhalte mit hochwertigem Look brauchen.",
        "Aus Deutschland, deutschlandweit remote: Fokus auf Short-Form-Schnitt, YouTube, Werbevideos und Dreharbeiten — mit klarer Kommunikation und Editor-First-Denken.",
        "Kein Budget-Massen-Schnitt. Jedes Projekt wird auf Wirkung, Rhythmus und Markenklarheit ausgelegt.",
      ],
    },
    services: {
      eyebrow: "LEISTUNGEN",
      title: "Schnitt, der Content stärker macht",
      intro:
        "Reels, TikToks, YouTube, Werbevideos und Dreharbeiten — präzise geschnitten, klar geführt, hochwertig umgesetzt.",
      items: [
        {
          title: "Shortform-Schnitt",
          description:
            "Reels, TikToks und YouTube Shorts schneiden lassen — mit schnellem Pacing, klaren Cuts und einem Look für Social Media.",
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
            "Werbevideo schneiden oder erstellen lassen — Kampagnen- und Produktvideos mit starken Hooks und klarer Botschaft für Paid Social.",
          icon: "megaphone",
        },
        {
          title: "Filming",
          description:
            "Dreharbeiten und Social Media Video Produktion für Brands und Creator — geplante Shots, sauberes Material, Look der sich gut schneiden lässt.",
          icon: "camera",
        },
      ],
    },
    about: {
      eyebrow: "PROZESS",
      title: "So läuft die Zusammenarbeit",
      intro:
        "Von der ersten Anfrage bis zum finalen Export — ein klarer Ablauf für Premium-Projekte mit Creators und Marken.",
      steps: [
        {
          title: "01 — Projektanfrage",
          description:
            "Du teilst Ziel, Formate, Referenzen und Timeline. Scope wird vor dem Schnitt abgestimmt.",
        },
        {
          title: "02 — Schnitt & Richtung",
          description:
            "Simon formt Pacing, Struktur und visuelle Richtung — story-first und plattformgerecht.",
        },
        {
          title: "03 — Feedback",
          description: "Klare Revisionsschleifen mit fokussiertem Feedback — weniger Runden, stärkere Ergebnisse.",
        },
        {
          title: "04 — Delivery",
          description:
            "Finale Exporte für deine Plattformen — ready to publish oder als Ads einsetzbar.",
        },
      ],
    },
    faq: {
      eyebrow: "FRAGEN",
      title: "Häufige Fragen",
      items: [
        {
          question: "Schneidest du Reels, TikToks und YouTube Shorts?",
          answer:
            "Ja. Short-Form-Editing für Instagram, TikTok und YouTube Shorts gehört zum Kernangebot — inklusive Hooks, Pacing und plattformgerechter Struktur.",
        },
        {
          question: "Arbeitest du deutschlandweit?",
          answer:
            "Ja. Zusammenarbeit läuft remote in ganz Deutschland. Dreharbeiten können bei Bedarf geplant werden.",
        },
        {
          question: "Was ist der Unterschied zwischen Editing und Filming?",
          answer:
            "Editing ist der Schnitt und Finish aus vorhandenem Material. Filming umfasst Dreharbeiten, damit das Projekt von Anfang an auf einen starken Schnitt ausgelegt ist.",
        },
        {
          question: "Für wen ist Simon Saad Visuals nicht geeignet?",
          answer:
            "Hochzeitsvideos, Billig-Massen-Schnitt oder Fotografie-first-Projekte passen nicht. Fokus: Premium Social- und Werbevideo für Creator und Marken.",
        },
      ],
    },
    work: {
      eyebrow: "AUSGEWÄHLTE ARBEIT",
      title: "Proof in Motion",
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
          alt: "Posterbild für Prep My Meal Werbespot von Simon Saad Visuals",
          videoAriaLabel: "Prep My Meal Werbespot öffnen",
          caseSlug: "prep-my-meal-leon-haegele",
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
      eyebrow: "VERTRAUEN",
      title: "Was Kunden über die Zusammenarbeit sagen",
    },
    clientStories: {
      eyebrow: "KOOPERATIONEN",
      title: "Langfristige Visual-Systeme für Creator und Marken",
      intro:
        "Tiefere Einblicke in Zusammenarbeiten mit wiederkehrenden Edits, Kampagnen-Visuals und klarer visueller Richtung.",
      viewCase: "Case ansehen",
    },
    contact: {
      title: "Lass uns etwas Präzises bauen.",
      description:
        "Schreib mir zu Projekt, Timeline und Referenzen — ich melde mich mit den nächsten Schritten. Projektanfragen per Instagram-DM.",
      cta: "PROJEKT STARTEN",
      instagramLabel: "@simon__saad",
      instagramCta: "Auf Instagram schreiben",
    },
    caseDetail: {
      back: "Zurück zu ausgewählter Arbeit",
      overviewTitle: "Projektüberblick",
      scopeTitle: "Leistungsumfang",
      roleTitle: "Rolle",
      platformsTitle: "Plattformen",
      formatsTitle: "Formate",
      contentGridTitle: "Content aus dieser Kooperation",
      servicesLink: "Leistungen ansehen",
      servicesHref: "#services",
      cta: "Projekt starten",
      ctaHref: "#contact",
    },
    footer: {
      copyright: "© Simon Saad Visuals",
      instagramLabel: "@simon__saad",
      links: {
        work: "ARBEIT",
        services: "LEISTUNGEN",
        about: "PROZESS",
        contact: "KONTAKT",
        impressum: "IMPRESSUM",
        datenschutz: "DATENSCHUTZ",
      },
    },
    legal: {
      impressum: {
        title: "Impressum",
        sections: [
          {
            heading: "Angaben gemäß § 5 TMG",
            body: "Simon Saad Visuals\n[Straße und Hausnummer]\n[PLZ] [Ort]\nDeutschland\n\nKontakt: über Instagram @simon__saad oder Projektanfrage über diese Website.\n\nVerantwortlich für den Inhalt: Simon Saad",
          },
          {
            heading: "Hinweis",
            body: "Bitte ersetze die Platzhalter-Adresse vor Veröffentlichung durch deine vollständigen Impressumsangaben.",
          },
        ],
      },
      datenschutz: {
        title: "Datenschutz",
        sections: [
          {
            heading: "Überblick",
            body: "Diese Website wird von Simon Saad Visuals betrieben. Personenbezogene Daten werden nur verarbeitet, soweit das für den Betrieb der Website und die Bearbeitung von Projektanfragen erforderlich ist.",
          },
          {
            heading: "Hosting & Server-Logs",
            body: "Beim Besuch der Website kann der Hosting-Anbieter technische Zugriffsdaten (z. B. IP-Adresse, Zeitstempel, aufgerufene URL) in Server-Logs für Betrieb und Sicherheit verarbeiten.",
          },
          {
            heading: "Externe Links",
            body: "Links zu Instagram und anderen Diensten unterliegen den Datenschutzbestimmungen der jeweiligen Anbieter.",
          },
          {
            heading: "Deine Rechte",
            body: "Du hast nach geltendem Datenschutzrecht u. a. Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung und Widerspruch. Anfragen kannst du an Simon Saad richten.",
          },
          {
            heading: "Hinweis",
            body: "Dieser Text ist eine Basisversion. Bitte mit Hosting-Details und rechtlicher Prüfung vor Veröffentlichung ergänzen.",
          },
        ],
      },
    },
  },
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale];
}
