import type { Dictionary } from "@/i18n/dictionaries";

import { SectionHeader } from "./SectionHeader";
import shellStyles from "./SectionShell.module.css";
import styles from "./IdentitySection.module.css";

type Props = Readonly<{
  dict: Dictionary;
}>;

export function IdentitySection({ dict }: Props) {
  const { identity } = dict;

  return (
    <section id="identity" className={shellStyles.shell} aria-labelledby="identity-title">
      <div className={shellStyles.shell__glow} aria-hidden="true" />
      <div className={`container-base ${shellStyles.shell__inner}`}>
        <SectionHeader
          eyebrow={identity.eyebrow}
          title={identity.title}
          titleId="identity-title"
          align="center"
        />

        <div className={styles.panel}>
          <div className={styles.accent} aria-hidden="true" />
          <div className={styles.body}>
            {identity.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={index === 0 ? styles.lead : styles.paragraph}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
