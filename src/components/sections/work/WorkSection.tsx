import type { Dictionary } from "@/i18n/dictionaries";

import { SectionIntro } from "@/components/section-intro/SectionIntro";
import { sectionIntroTuning } from "@/components/section-intro/sectionIntroTuning";
import editorialLayout from "@/components/sections/editorialLayout.module.css";
import shellStyles from "@/components/sections/SectionShell.module.css";

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
      <div className={shellStyles.shell__glow} aria-hidden="true" />
      <div
        className={`${shellStyles.shell__inner} ${editorialLayout["editorial-section-inner"]} ${styles["work-section__inner"]}`}
      >
        <SectionIntro
          eyebrow={work.eyebrow}
          title={work.title}
          subtitle={work.intro}
          headlineSide="right"
          titleId="work-section-title"
          {...sectionIntroTuning.work}
        />

        <div className={editorialLayout["editorial-content-width"]}>
          <WorkVideoGrid
            featuredItems={work.items}
            moreItems={work.moreItems}
            viewMoreWork={work.viewMoreWork}
            showLessWork={work.showLessWork}
          />
        </div>
      </div>
    </WorkSectionRoot>
  );
}
