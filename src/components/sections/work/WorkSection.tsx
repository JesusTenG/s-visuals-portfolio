import type { Dictionary } from "@/i18n/dictionaries";

import { WorkVideoGrid } from "./WorkVideoGrid.client";
import { WorkSectionRoot } from "./WorkSectionRoot.client";
import styles from "./WorkSection.module.css";

type Props = Readonly<{
  dict: Dictionary;
}>;

export function WorkSection({ dict }: Props) {
  const { work } = dict;

  return (
    <WorkSectionRoot>
      <div className={`container-base ${styles["work-section__inner"]}`}>
        <header className={styles["work-section__header"]}>
          <p className={styles["work-section__eyebrow"]}>{work.eyebrow}</p>
          <h2 id="work-section-title" className={styles["work-section__title"]}>
            {work.title}
          </h2>
          <p className={styles["work-section__intro"]}>{work.intro}</p>
        </header>

        <WorkVideoGrid
          featuredItems={work.items}
          moreItems={work.moreItems}
          viewMoreWork={work.viewMoreWork}
          showLessWork={work.showLessWork}
        />
      </div>
    </WorkSectionRoot>
  );
}
