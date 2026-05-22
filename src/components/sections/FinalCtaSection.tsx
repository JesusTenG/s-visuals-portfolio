import type { Dictionary } from "@/i18n/dictionaries";
import { contactCtaClassNames } from "@/components/ui/contactCtaButton";
import SVisualsButton from "@/components/ui/SVisualsButton";
import { INSTAGRAM_URL } from "@/lib/site";

import { SectionHeader } from "./SectionHeader";
import shellStyles from "./SectionShell.module.css";
import styles from "./FinalCtaSection.module.css";

type Props = Readonly<{
  dict: Dictionary;
}>;

export function FinalCtaSection({ dict }: Props) {
  return (
    <section id="contact" className={`${shellStyles.shell} ${styles.section}`}>
      <div className={shellStyles.shell__glow} aria-hidden="true" />
      <div className={`container-base ${shellStyles.shell__inner}`}>
        <div className={styles.panel}>
          <div className={styles.accent} aria-hidden="true" />
          <div className={styles.inner}>
            <SectionHeader
              eyebrow={dict.nav.links.contact}
              title={dict.contact.title}
              intro={dict.contact.description}
              titleId="contact-section-title"
              align="center"
              className={styles.header}
            />

            <div className={styles["cta-row"]}>
              <SVisualsButton
                href="#contact"
                showIcon={false}
                className={`${contactCtaClassNames.primary} ${contactCtaClassNames.prominent}`}
              >
                {dict.contact.cta}
              </SVisualsButton>
              <SVisualsButton href="#services" variant="secondary" showIcon={false}>
                {dict.services.title}
              </SVisualsButton>
            </div>

            <p className={styles.instagram}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                <span className={styles["instagram-label"]}>{dict.contact.instagramCta}</span>
                <span className={styles.handle}>{dict.contact.instagramLabel}</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
