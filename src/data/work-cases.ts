export type WorkCaseContentDrop = {
  title: string;
  type: string;
  posterSrc: string;
  videoSrc?: string;
  alt: string;
};

export type WorkCase = {
  slug: string;
  title: string;
  label: string;
  description: string;
  posterSrc: string;
  alt: string;
  contentDrops: WorkCaseContentDrop[];
};

export const workCases: WorkCase[] = [
  {
    slug: "client-one",
    title: "Client One",
    label: "Ongoing Social Edits",
    description:
      "Recurring reels, campaign cuts and visual direction across multiple content drops.",
    posterSrc: "/assets/clients/client-one-poster.svg",
    alt: "Preview image for Client One collaboration",
    contentDrops: [
      {
        title: "Campaign Reel 01",
        type: "Reel",
        posterSrc: "/assets/clients/client-one/drop-01-poster.svg",
        videoSrc: "/assets/clients/client-one/drop-01.mp4",
        alt: "Poster image for Client One campaign reel",
      },
    ],
  },
  {
    slug: "client-two",
    title: "Client Two",
    label: "Creator Content System",
    description:
      "A consistent editing language across short-form videos, launches and social content.",
    posterSrc: "/assets/clients/client-two-poster.svg",
    alt: "Preview image for Client Two collaboration",
    contentDrops: [
      {
        title: "Launch Week 01",
        type: "Reel",
        posterSrc: "/assets/clients/client-two/drop-01-poster.svg",
        alt: "Poster image for Client Two launch week reel",
      },
    ],
  },
  {
    slug: "client-three",
    title: "Client Three",
    label: "Brand Visuals",
    description: "Premium campaign edits and atmospheric visuals shaped for social platforms.",
    posterSrc: "/assets/clients/client-three-poster.svg",
    alt: "Preview image for Client Three collaboration",
    contentDrops: [
      {
        title: "Brand Spot 01",
        type: "Brand Spot",
        posterSrc: "/assets/clients/client-three/drop-01-poster.svg",
        alt: "Poster image for Client Three brand spot",
      },
    ],
  },
];

export function getWorkCaseBySlug(slug: string): WorkCase | undefined {
  return workCases.find((c) => c.slug === slug);
}
