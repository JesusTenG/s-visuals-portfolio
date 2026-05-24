"use client";

import { useId, useState } from "react";

import { SectionIntro } from "@/components/section-intro/SectionIntro";
import { sectionIntroTuning } from "@/components/section-intro/sectionIntroTuning";
import type { Dictionary } from "@/i18n/dictionaries";

import editorialLayout from "./editorialLayout.module.css";
import shellStyles from "./SectionShell.module.css";
import styles from "./FaqSection.module.css";

type Props = Readonly<{
  dict: Dictionary;
}>;

export function FaqSection({ dict }: Props) {
  const { faq } = dict;
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className={shellStyles.shell} aria-labelledby="faq-section-title">
      <div className={`${shellStyles.shell__inner} ${editorialLayout["editorial-section-inner"]}`}>
        <SectionIntro
          eyebrow={faq.eyebrow}
          title={faq.title}
          subtitle={faq.intro}
          headlineSide="left"
          titleId="faq-section-title"
          {...sectionIntroTuning.faq}
        />

        <div className={`${styles["faq-section__accordion"]} ${editorialLayout["editorial-content-width"]}`}>
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            const triggerId = `${baseId}-trigger-${index}`;
            const panelId = `${baseId}-panel-${index}`;

            return (
              <article key={item.question} className={styles["faq-section__item"]}>
                <h3 className={styles["faq-section__question-heading"]}>
                  <button
                    type="button"
                    id={triggerId}
                    className={styles["faq-section__trigger"]}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className={styles["faq-section__question"]}>{item.question}</span>
                    <span className={styles["faq-section__icon"]} aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  className={styles["faq-section__panel"]}
                  data-open={isOpen ? "true" : "false"}
                  {...(!isOpen ? { inert: true } : {})}
                >
                  <div className={styles["faq-section__panel-inner"]}>
                    <p className={styles["faq-section__answer"]}>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
