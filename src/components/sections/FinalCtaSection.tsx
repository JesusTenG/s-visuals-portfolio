import type { Dictionary } from "@/i18n/dictionaries";
import { Card } from "@/components/ui/card";
import SVisualsButton from "@/components/ui/SVisualsButton";

import styles from "./FinalCtaSection.module.css";

type Props = Readonly<{
  dict: Dictionary;
}>;

export function FinalCtaSection({ dict }: Props) {
  return (
    <section id="contact" className={styles.section}>
      <div className="container-base">
        <Card className={`glass-card ${styles.panel}`}>
          <div className={styles.inner}>
            <h2 className={styles.title}>{dict.contact.title}</h2>
            <p className={styles.description}>{dict.contact.description}</p>
            <div className={styles["cta-row"]}>
              <SVisualsButton href="#contact">{dict.contact.cta}</SVisualsButton>
              <SVisualsButton href="#services" variant="quiet" showIcon={false}>
                {dict.services.title}
              </SVisualsButton>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

