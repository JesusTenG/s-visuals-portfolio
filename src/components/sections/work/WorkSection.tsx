import type { Dictionary } from "@/i18n/dictionaries";

import { WorkVideoGrid } from "./WorkVideoGrid.client";
import styles from "./WorkSection.module.css";

type Props = Readonly<{
  dict: Dictionary;
}>;

export function WorkSection({ dict }: Props) {
  const { work } = dict;

  return (
    <section id="work" className={styles["work-section"]} aria-labelledby="work-section-title">
      <div className={`container-base ${styles["work-section__inner"]}`}>
        <header className={styles["work-section__header"]}>
          <p className={styles["work-section__eyebrow"]}>{work.eyebrow}</p>
          <h2 id="work-section-title" className={styles["work-section__title"]}>
            {work.title}
          </h2>
          <p className={styles["work-section__intro"]}>{work.intro}</p>
        </header>

        <WorkVideoGrid items={work.items} />

        <p className={styles["work-section__cta-wrap"]}>
          <a className={styles["work-section__cta-link"]} href={work.collaborationsCtaHref}>
            {work.collaborationsCtaLabel}
          </a>
        </p>
      </div>
    </section>
  );
}
