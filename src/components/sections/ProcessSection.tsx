import { MessageCircle, PackageCheck, Scissors, Send, type LucideIcon } from "lucide-react";

import { SectionIntro } from "@/components/section-intro/SectionIntro";
import { sectionIntroTuning } from "@/components/section-intro/sectionIntroTuning";
import type { Dictionary } from "@/i18n/dictionaries";

import editorialLayout from "./editorialLayout.module.css";
import shellStyles from "./SectionShell.module.css";
import styles from "./ProcessSection.module.css";

type Props = Readonly<{
  dict: Dictionary;
}>;

type ProcessIconId = Dictionary["process"]["steps"][number]["icon"];

const PROCESS_ICONS: Record<ProcessIconId, LucideIcon> = {
  send: Send,
  scissors: Scissors,
  "message-circle": MessageCircle,
  "package-check": PackageCheck,
};

export function ProcessSection({ dict }: Props) {
  const { process } = dict;

  return (
    <section
      id="process"
      className={shellStyles.shell}
      aria-labelledby="process-section-title"
    >
      <div className={`${shellStyles.shell__inner} ${editorialLayout["editorial-section-inner"]}`}>
        <SectionIntro
          eyebrow={process.eyebrow}
          title={process.title}
          subtitle={process.intro}
          headlineSide="left"
          titleId="process-section-title"
          {...sectionIntroTuning.process}
        />

        <ol className={`${styles["process-section__steps"]} ${editorialLayout["editorial-content-width"]}`}>
          {process.steps.map((step) => {
            const Icon = PROCESS_ICONS[step.icon];

            return (
              <li key={step.title} className={styles["process-section__step"]}>
                <article className={styles["process-section__card"]}>
                  <div className={styles["process-section__icon-wrap"]} aria-hidden="true">
                    <Icon className={styles["process-section__icon"]} />
                  </div>
                  <h3 className={styles["process-section__card-title"]}>{step.title}</h3>
                  <p className={styles["process-section__card-text"]}>{step.description}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
