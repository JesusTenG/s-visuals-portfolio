import type { Locale } from "@/i18n/config";

export type Testimonial = {
  id: string;
  locale: Locale;
  quote: string;
  authorName: string;
  authorRole?: string;
  /** Brand, company, project or creator brand shown next to the author name. */
  brandName?: string;
  companyOrChannel?: string;
  avatarSrc?: string;
  instagramHandle?: string;
  instagramUrl?: string;
  relatedCaseSlug?: string;
  /** True = draft placeholder copy; replace before launch. */
  isPlaceholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "de-real-01",
    locale: "de",
    quote:
      "Ich bin sehr froh, mittlerweile alle meine Video-Projekte gemeinsam mit Simon umzusetzen. Die Detailverliebtheit, Zuverlässigkeit und der Qualitätsanspruch übersteigen das, was ich aus meiner Zusammenarbeit mit anderen Freelancern gewohnt war. Ich würde zum aktuellen Stand mit niemand anderem meine Projekte umsetzen.",
    authorName: "Leon Hägele",
    authorRole: "Creator",
    brandName: "Enhanced Coach",
    instagramHandle: "@leon.haegele",
    instagramUrl: "https://www.instagram.com/leon.haegele/",
    avatarSrc: "/assets/testimonials/leon-haegele.webp",
    isPlaceholder: false,
  },
  {
    id: "de-placeholder-02",
    locale: "de",
    quote:
      "[Platzhalter] Kurzes Feedback zu Timing, Look und Zusammenarbeit. Diesen Text vor dem Launch durch ein echtes Zitat ersetzen.",
    authorName: "[Platzhalter] Name",
    authorRole: "Rolle",
    companyOrChannel: "[Platzhalter] Kanal / Brand",
    isPlaceholder: true,
  },
  {
    id: "de-placeholder-03",
    locale: "de",
    quote:
      "[Platzhalter] Zweites Zitat für die mittlere Karte. Kein echtes Kundenfeedback, nur Layout-Platzhalter.",
    authorName: "[Platzhalter] Name",
    authorRole: "Rolle",
    isPlaceholder: true,
  },
  {
    id: "en-real-01",
    locale: "en",
    quote:
      "I am glad to work on all my video projects with Simon now. The attention to detail, reliability and quality go beyond what I was used to with other freelancers. At this point, I would not execute my projects with anyone else.",
    authorName: "Leon Hägele",
    authorRole: "Creator",
    brandName: "Enhanced Coach",
    instagramHandle: "@leon.haegele",
    instagramUrl: "https://www.instagram.com/leon.haegele/",
    avatarSrc: "/assets/testimonials/leon-haegele.webp",
    isPlaceholder: false,
  },
  {
    id: "en-placeholder-02",
    locale: "en",
    quote:
      "[Placeholder] Short feedback on timing, look and collaboration. Replace this text with a real quote before launch.",
    authorName: "[Placeholder] Name",
    authorRole: "Role",
    companyOrChannel: "[Placeholder] Channel / brand",
    isPlaceholder: true,
  },
  {
    id: "en-placeholder-03",
    locale: "en",
    quote:
      "[Placeholder] Second quote for the center card. Not a real client review, layout placeholder only.",
    authorName: "[Placeholder] Name",
    authorRole: "Role",
    isPlaceholder: true,
  },
];

const SECTION_CARD_COUNT = 3;

export function getSectionTestimonials(locale: Locale): Testimonial[] {
  return testimonials
    .filter((item) => item.locale === locale && !item.isPlaceholder)
    .slice(0, SECTION_CARD_COUNT);
}
