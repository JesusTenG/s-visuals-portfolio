import Link from "next/link";
import Image from "next/image";

import {
  getIndexableWorkCases,
  getWorkCaseContent,
} from "@/data/work-cases";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { SectionHeader } from "@/components/sections/SectionHeader";
import shellStyles from "@/components/sections/SectionShell.module.css";

import styles from "./ClientStoriesSection.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
}>;

export function ClientStoriesSection({ locale, dict }: Props) {
  const { clientStories } = dict;
  const cases = getIndexableWorkCases();

  if (cases.length === 0) return null;

  return (
    <section
      id="collaborations"
      className={shellStyles.shell}
      aria-labelledby="client-stories-title"
    >
      <div className={`container-base ${shellStyles.shell__inner}`}>
        <SectionHeader
          eyebrow={clientStories.eyebrow}
          title={clientStories.title}
          intro={clientStories.intro}
          titleId="client-stories-title"
          align="center"
        />

        <div
          className={styles["client-stories-section__grid"]}
          data-count={cases.length === 1 ? "single" : "multi"}
        >
          {cases.map((workCase) => {
            const content = getWorkCaseContent(workCase, locale);

            return (
              <Link
                key={workCase.slug}
                href={`/${locale}/work/${workCase.slug}`}
                className={styles["client-stories-card"]}
              >
                <div className={styles["client-stories-card__media"]}>
                  <Image
                    className={styles["client-stories-card__image"]}
                    src={workCase.posterSrc}
                    alt={content.alt}
                    fill
                    sizes="(max-width: 768px) 92vw, (max-width: 980px) 45vw, 30vw"
                  />
                  <span className={styles["client-stories-card__scrim"]} aria-hidden="true" />
                </div>
                <div className={styles["client-stories-card__body"]}>
                  <p className={styles["client-stories-card__label"]}>{content.label}</p>
                  <h3 className={styles["client-stories-card__title"]}>{content.title}</h3>
                  <p className={styles["client-stories-card__description"]}>
                    {content.description}
                  </p>
                  <span className={styles["client-stories-card__cta"]}>
                    {clientStories.viewCase}
                    <span className={styles["client-stories-card__arrow"]} aria-hidden="true">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
