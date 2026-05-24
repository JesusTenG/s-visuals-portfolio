import Link from "next/link";
import Image from "next/image";

import {
  getClientStoriesForHomeSection,
  isResolvableImageSrc,
  type ClientStory,
} from "@/data/client-stories";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { SectionIntro } from "@/components/section-intro/SectionIntro";
import { sectionIntroTuning } from "@/components/section-intro/sectionIntroTuning";
import SVisualsButton from "@/components/ui/SVisualsButton";

import editorialLayout from "@/components/sections/editorialLayout.module.css";
import shellStyles from "@/components/sections/SectionShell.module.css";

import styles from "./ClientStoriesSection.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
}>;

function ClientStoryCard({
  story,
  locale,
  learnMoreLabel,
}: Readonly<{
  story: ClientStory;
  locale: Locale;
  learnMoreLabel: string;
}>) {
  const detailHref = `/${locale}/client-stories/${story.slug}`;
  const cardImageSrc = story.cardImageSrc;
  const hasImage = isResolvableImageSrc(cardImageSrc);
  const isFeatured = story.bentoRole === "feature";

  return (
    <article
      className={styles["client-stories-card"]}
      data-slug={story.slug}
      data-bento={story.bentoRole}
    >
      <Link
        href={detailHref}
        className={styles["client-stories-card__media-link"]}
        aria-label={`${story.name} — ${learnMoreLabel}`}
      >
        <div className={styles["client-stories-card__media"]}>
          {hasImage ? (
            <Image
              className={styles["client-stories-card__image"]}
              src={cardImageSrc}
              alt=""
              fill
              sizes={
                isFeatured
                  ? "(max-width: 768px) 92vw, (max-width: 980px) 45vw, 34vw"
                  : "(max-width: 768px) 92vw, (max-width: 980px) 42vw, 18vw"
              }
            />
          ) : (
            <span
              className={styles["client-stories-card__image-placeholder"]}
              aria-hidden="true"
            />
          )}
          <span className={styles["client-stories-card__scrim"]} aria-hidden="true" />
        </div>
      </Link>

      <div className={styles["client-stories-card__footer"]}>
        <Link href={detailHref} className={styles["client-stories-card__name-link"]}>
          <h3 className={styles["client-stories-card__name"]}>
            <span className={styles["client-stories-card__name-line"]}>{story.firstName}</span>
            <span className={styles["client-stories-card__name-line"]}>{story.lastName}</span>
          </h3>
        </Link>
        <SVisualsButton
          href={detailHref}
          variant="secondary"
          showIcon={false}
          enableStarBorder={false}
          className={styles["client-stories-card__cta"]}
        >
          {learnMoreLabel}
        </SVisualsButton>
      </div>
    </article>
  );
}

export function ClientStoriesSection({ locale, dict }: Props) {
  const { clientStories } = dict;
  const stories = getClientStoriesForHomeSection();

  return (
    <section
      id="collaborations"
      className={shellStyles.shell}
      aria-labelledby="client-stories-title"
    >
      <div className={`${shellStyles.shell__inner} ${editorialLayout["editorial-section-inner"]}`}>
        <SectionIntro
          eyebrow={clientStories.eyebrow}
          title={clientStories.title}
          subtitle={clientStories.intro}
          headlineSide="left"
          titleId="client-stories-title"
          {...sectionIntroTuning.clientStories}
        />

        <div
          className={`${styles["client-stories-section__grid"]} ${editorialLayout["editorial-content-width"]}`}
        >
          {stories.map((story) => (
            <ClientStoryCard
              key={story.slug}
              story={story}
              locale={locale}
              learnMoreLabel={clientStories.learnMore}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
