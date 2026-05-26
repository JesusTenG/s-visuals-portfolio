import {
  getClientStoryContent,
  getClientStoryPageTitle,
  getWorkItemsForClientStory,
} from "@/data/client-stories";
import { getTestimonialForClientStory } from "@/content/testimonials";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { contactCtaClassNames } from "@/components/ui/contactCtaButton";
import SVisualsButton from "@/components/ui/SVisualsButton";

import type { ClientStory } from "@/data/client-stories";
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
  const contactHref = `/${locale}#contact`;
  const workHref = `/${locale}#work`;
  const pageTitle = getClientStoryPageTitle(story, dict);
  const testimonial = getTestimonialForClientStory(story.slug, locale);
  const workItems = getWorkItemsForClientStory(story, dict, locale);
  const hasTestimonial = testimonial !== undefined;

  return (
    <article className={styles["collaboration-detail"]}>
      <div className={styles["collaboration-detail__shell"]}>
        <div className={styles["collaboration-detail-back"]}>
          <SVisualsButton
            href={backHref}
            variant="secondary"
            showIcon={false}
            enableStarBorder={false}
          >
            {clientStoryDetail.back}
          </SVisualsButton>
        </div>

        <section className={styles["collaboration-detail-intro"]} aria-label={pageTitle}>
          <div className={styles["collaboration-detail-copy"]}>
            <h1 className={styles["collaboration-detail-headline"]}>{pageTitle}</h1>
            <p className={styles["collaboration-detail-description"]}>
              {content.collaborationText}
            </p>
          </div>
        </section>

        {workItems.length > 0 || hasTestimonial ? (
          <section
            className={styles["collaboration-detail-content"]}
            aria-labelledby={workItems.length > 0 ? "client-story-edits-heading" : undefined}
          >
            {workItems.length > 0 ? (
              <h2
                id="client-story-edits-heading"
                className={`${styles["collaboration-detail-headline"]} ${styles["collaboration-detail-reels-heading"]}`}
              >
                {clientStoryDetail.publishedEditsHeading}
              </h2>
            ) : null}

            <div
              className={styles["collaboration-detail-content-body"]}
              data-has-testimonial={hasTestimonial ? "true" : "false"}
            >
              {workItems.length > 0 ? (
                <div className={styles["collaboration-detail-reels"]}>
                  <ClientStoryDetailReels
                    items={workItems}
                    gridClassName={styles["collaboration-detail-reels-grid"]}
                  />
                </div>
              ) : null}

              {hasTestimonial ? (
                <aside
                  className={styles["collaboration-detail-testimonial"]}
                  aria-label={clientStoryDetail.testimonialAriaLabel}
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    className={styles["collaboration-detail-testimonial-card"]}
                  />
                </aside>
              ) : null}
            </div>
          </section>
        ) : null}

        <section
          className={styles["collaboration-detail-cta"]}
          aria-labelledby="client-story-cta-heading"
        >
          <h2 id="client-story-cta-heading" className={styles["collaboration-detail-cta-title"]}>
            {clientStoryDetail.ctaHeadline}
          </h2>
          <p className={styles["collaboration-detail-cta-text"]}>{clientStoryDetail.ctaBody}</p>
          <div className={styles["collaboration-detail-cta-actions"]}>
            <SVisualsButton
              href={contactHref}
              showIcon={false}
              className={`${contactCtaClassNames.primary} ${contactCtaClassNames.prominent}`}
            >
              {clientStoryDetail.ctaPrimary}
            </SVisualsButton>
            <SVisualsButton
              href={workHref}
              variant="secondary"
              showIcon={false}
              enableStarBorder={false}
              className={contactCtaClassNames.secondary}
            >
              {clientStoryDetail.ctaSecondary}
            </SVisualsButton>
          </div>
        </section>
      </div>
    </article>
  );
}
