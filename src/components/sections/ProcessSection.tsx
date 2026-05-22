import type { Dictionary } from "@/i18n/dictionaries";

import { SectionHeader } from "./SectionHeader";
import shellStyles from "./SectionShell.module.css";
import styles from "./ProcessSection.module.css";

type Props = Readonly<{
  dict: Dictionary;
}>;

export function ProcessSection({ dict }: Props) {
  const { about } = dict;

  return (
    <section id="about" className={shellStyles.shell} aria-labelledby="about-section-title">
      <div className={`container-base ${shellStyles.shell__inner}`}>
        <SectionHeader
          eyebrow={about.eyebrow}
          title={about.title}
          intro={about.intro}
          titleId="about-section-title"
          align="center"
        />

        <ol className={styles.steps}>
          {about.steps.map((step, idx) => (
            <li key={step.title} className={styles.step}>
              <article className={styles["step-card"]}>
                <span className={styles.index} aria-hidden="true">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className={styles.copy}>
                  <h3 className={styles["step-title"]}>{step.title}</h3>
                  <p className={styles["step-text"]}>{step.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
