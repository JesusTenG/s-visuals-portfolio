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
  /** Links testimonial to a client-stories detail page slug */
  clientStorySlug?: string;
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
    avatarSrc: "/assets/clients/leon-haegele-hd.webp",
    clientStorySlug: "leon-haegele",
    isPlaceholder: false,
  },
  {
    id: "de-placeholder-02",
    locale: "de",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    authorName: "Lorem Ipsum",
    authorRole: "Platzhalter",
    brandName: "Dolor Sit",
    isPlaceholder: true,
  },
  {
    id: "de-placeholder-03",
    locale: "de",
    quote:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    authorName: "Amet Consetetur",
    authorRole: "Platzhalter",
    brandName: "Elitr Sed",
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
    avatarSrc: "/assets/clients/leon-haegele-hd.webp",
    clientStorySlug: "leon-haegele",
    isPlaceholder: false,
  },
  {
    id: "en-placeholder-02",
    locale: "en",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    authorName: "Lorem Ipsum",
    authorRole: "Placeholder",
    brandName: "Dolor Sit",
    isPlaceholder: true,
  },
  {
    id: "en-placeholder-03",
    locale: "en",
    quote:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    authorName: "Amet Consetetur",
    authorRole: "Placeholder",
    brandName: "Elitr Sed",
    isPlaceholder: true,
  },
];

const SECTION_CARD_COUNT = 3;

export function getSectionTestimonials(locale: Locale): Testimonial[] {
  const forLocale = testimonials.filter((item) => item.locale === locale);
  const real = forLocale.filter((item) => !item.isPlaceholder);
  const placeholders = forLocale.filter((item) => item.isPlaceholder);

  return [...real, ...placeholders].slice(0, SECTION_CARD_COUNT);
}

export function getTestimonialForClientStory(
  slug: string,
  locale: Locale,
): Testimonial | undefined {
  return testimonials.find(
    (item) =>
      item.locale === locale &&
      !item.isPlaceholder &&
      item.clientStorySlug === slug,
  );
}
