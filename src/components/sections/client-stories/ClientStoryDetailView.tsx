import Image from "next/image";
import Link from "next/link";

import type { ClientStory } from "@/data/client-stories";
import {
  getClientStoryContent,
  getWorkItemsForClientStory,
  isResolvableImageSrc,
  isResolvableSocialUrl,
} from "@/data/client-stories";
import { getTestimonialForClientStory } from "@/content/testimonials";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";

import { ClientStoryDetailReels } from "./ClientStoryDetailReels.client";
import styles from "./ClientStoryDetailView.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
  story: ClientStory;
}>;

export function ClientStoryDetailView({ locale, dict, story }: Props) {
  const content = getClientStoryContent(story, locale);
  const { clientStoryDetail } = dict;
  const backHref = `/${locale}#collaborations`;
  const testimonial = getTestimonialForClientStory(story.slug, locale);
  const workItems = getWorkItemsForClientStory(story, dict);
  const resolvedSocial = story.socialLinks.filter((link) => isResolvableSocialUrl(link.url));
  const heroImageSrc = story.heroImageSrc;
  const hasHeroImage = isResolvableImageSrc(heroImageSrc);
  const hasTestimonial = testimonial !== undefined;

  return (
    <article className={styles["client-story-detail"]}>
      <p className={styles["client-story-detail__back-wrap"]}>
        <Link href={backHref} className={styles["client-story-detail__back"]}>
          {clientStoryDetail.back}
        </Link>
      </p>

      <header className={styles["client-story-detail__header"]}>
        <p className={styles["client-story-detail__eyebrow"]}>{clientStoryDetail.eyebrow}</p>
        <h1 className={styles["client-story-detail__title"]}>{story.name}</h1>
        <p className={styles["client-story-detail__handle"]}>@{story.handle}</p>
        <p className={styles["client-story-detail__intro"]}>{content.intro}</p>

        {resolvedSocial.length > 0 ? (
          <div className={styles["client-story-detail__social"]}>
            {resolvedSocial.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                className={styles["client-story-detail__social-link"]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.handle}
              </a>
            ))}
          </div>
        ) : null}
      </header>

      <div
        className={styles["client-story-detail__split"]}
        data-has-testimonial={hasTestimonial ? "true" : "false"}
      >
        <div className={styles["client-story-detail__hero"]}>
          {hasHeroImage ? (
            <Image
              className={styles["client-story-detail__hero-image"]}
              src={heroImageSrc}
              alt=""
              fill
              sizes="(max-width: 768px) 11.5rem, 13.5rem"
              priority
            />
          ) : (
            <span
              className={styles["client-story-detail__hero-placeholder"]}
              aria-hidden="true"
            />
          )}
        </div>

        {hasTestimonial ? (
          <div className={styles["client-story-detail__testimonial"]}>
            <TestimonialCard testimonial={testimonial} />
          </div>
        ) : null}
      </div>

      <div className={styles["client-story-detail__body"]}>
        <p className={styles["client-story-detail__collaboration"]}>{content.collaborationText}</p>
      </div>

      {workItems.length > 0 ? (
        <section
          className={styles["client-story-detail__reels"]}
          aria-labelledby="client-story-edits-heading"
        >
          <h2
            id="client-story-edits-heading"
            className={styles["client-story-detail__reels-title"]}
          >
            {clientStoryDetail.publishedEditsHeading}
          </h2>
          <ClientStoryDetailReels items={workItems} />
        </section>
      ) : null}
    </article>
  );
}
