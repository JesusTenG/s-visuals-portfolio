import { ListChecks, Palette, Timer, type LucideIcon } from "lucide-react";

import { SectionIntro } from "@/components/section-intro/SectionIntro";
import { sectionIntroTuning } from "@/components/section-intro/sectionIntroTuning";
import type { Dictionary } from "@/i18n/dictionaries";

import editorialLayout from "./editorialLayout.module.css";
import shellStyles from "./SectionShell.module.css";
import styles from "./ApproachSection.module.css";

type Props = Readonly<{
  dict: Dictionary;
}>;

type ApproachIconId = Dictionary["approach"]["principles"][number]["icon"];

const APPROACH_ICONS: Record<ApproachIconId, LucideIcon> = {
  timer: Timer,
  palette: Palette,
  "list-checks": ListChecks,
};

export function ApproachSection({ dict }: Props) {
  const { approach } = dict;

  return (
    <section
      id="approach"
      className={shellStyles.shell}
      aria-labelledby="approach-section-title"
    >
      <div className={`${shellStyles.shell__inner} ${editorialLayout["editorial-section-inner"]}`}>
        <SectionIntro
          eyebrow={approach.eyebrow}
          title={approach.title}
          subtitle={approach.subtitle}
          headlineSide="right"
          titleId="approach-section-title"
          {...sectionIntroTuning.approach}
        />

        <div
          className={`${styles["approach-section__layout"]} ${editorialLayout["editorial-content-width"]}`}
        >
          <ul className={styles["approach-section__cards"]}>
            {approach.principles.map((principle) => {
              const Icon = APPROACH_ICONS[principle.icon];

              return (
                <li key={principle.title} className={styles["approach-section__card-item"]}>
                  <article className={styles["approach-section__card"]}>
                    <div className={styles["approach-section__icon-wrap"]} aria-hidden="true">
                      <Icon className={styles["approach-section__icon"]} />
                    </div>
                    <h3 className={styles["approach-section__card-title"]}>{principle.title}</h3>
                    <p className={styles["approach-section__card-text"]}>{principle.description}</p>
                  </article>
                </li>
              );
            })}
          </ul>

          <p className={styles["approach-section__body"]}>{approach.body}</p>
        </div>
      </div>
    </section>
  );
}
