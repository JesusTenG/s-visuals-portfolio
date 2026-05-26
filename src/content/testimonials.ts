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
    id: "de-placeholder-ramon",
    locale: "de",
    quote:
      "Hallo, ich bin Ramon Limacher und ich habe bestimmt auch was Tolles über unsere Zusammenarbeit zu sagen.",
    authorName: "Ramon Limacher",
    authorRole: "Creator",
    instagramHandle: "@ramon_limacher",
    instagramUrl: "https://www.instagram.com/ramon_limacher/",
    avatarSrc: "/assets/videos/collaboration/ramon1.png",
    clientStorySlug: "ramon-limacher",
    isPlaceholder: true,
  },
  {
    id: "de-placeholder-mario",
    locale: "de",
    quote:
      "Hallo, ich bin Mario Scherthan und ich habe bestimmt auch was Tolles über unsere Zusammenarbeit zu sagen.",
    authorName: "Mario Scherthan",
    authorRole: "Creator",
    instagramHandle: "@marioscherthan",
    instagramUrl: "https://www.instagram.com/marioscherthan/",
    avatarSrc: "/assets/videos/collaboration/mario1.png",
    clientStorySlug: "mario-scherthan",
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
    id: "en-placeholder-ramon",
    locale: "en",
    quote:
      "Hi, I'm Ramon Limacher and I'm sure I'll have something great to say about our collaboration.",
    authorName: "Ramon Limacher",
    authorRole: "Creator",
    instagramHandle: "@ramon_limacher",
    instagramUrl: "https://www.instagram.com/ramon_limacher/",
    avatarSrc: "/assets/videos/collaboration/ramon1.png",
    clientStorySlug: "ramon-limacher",
    isPlaceholder: true,
  },
  {
    id: "en-placeholder-mario",
    locale: "en",
    quote:
      "Hi, I'm Mario Scherthan and I'm sure I'll have something great to say about our collaboration.",
    authorName: "Mario Scherthan",
    authorRole: "Creator",
    instagramHandle: "@marioscherthan",
    instagramUrl: "https://www.instagram.com/marioscherthan/",
    avatarSrc: "/assets/videos/collaboration/mario1.png",
    clientStorySlug: "mario-scherthan",
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
    (item) => item.locale === locale && item.clientStorySlug === slug,
  );
}
