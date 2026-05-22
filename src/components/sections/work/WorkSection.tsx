import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

import { SectionHeader } from "@/components/sections/SectionHeader";
import shellStyles from "@/components/sections/SectionShell.module.css";

import { WorkVideoGrid } from "./WorkVideoGrid.client";
import { WorkSectionRoot } from "./WorkSectionRoot.client";
import styles from "./WorkSection.module.css";

type Props = Readonly<{
  dict: Dictionary;
  locale: Locale;
}>;

export function WorkSection({ dict, locale }: Props) {
  const { work } = dict;

  return (
    <WorkSectionRoot>
      <div className={shellStyles.shell__glow} aria-hidden="true" />
      <div className={`container-base ${shellStyles.shell__inner} ${styles["work-section__inner"]}`}>
        <SectionHeader
          eyebrow={work.eyebrow}
          title={work.title}
          intro={work.intro}
          titleId="work-section-title"
          align="center"
        />

        <WorkVideoGrid
          locale={locale}
          featuredItems={work.items}
          moreItems={work.moreItems}
          viewMoreWork={work.viewMoreWork}
          showLessWork={work.showLessWork}
          viewCaseLabel={dict.clientStories.viewCase}
        />
      </div>
    </WorkSectionRoot>
  );
}
