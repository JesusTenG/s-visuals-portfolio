"use client";

import { useState } from "react";

import type { Dictionary } from "@/i18n/dictionaries";

import { SectionHeader } from "./SectionHeader";
import shellStyles from "./SectionShell.module.css";
import styles from "./FaqSection.module.css";

type Props = Readonly<{
  dict: Dictionary;
}>;

export function FaqSection({ dict }: Props) {
  const { faq } = dict;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className={shellStyles.shell} aria-labelledby="faq-title">
      <div className={shellStyles.shell__glow} aria-hidden="true" />
      <div className={`container-base ${shellStyles.shell__inner}`}>
        <SectionHeader
          eyebrow={faq.eyebrow}
          title={faq.title}
          titleId="faq-title"
          align="center"
        />

        <div className={styles.list}>
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article key={item.question} className={styles.item}>
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className={styles.q}>{item.question}</span>
                  <span className={styles.icon} aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={styles.answerWrap}
                  data-open={isOpen ? "true" : "false"}
                  hidden={!isOpen}
                >
                  <p className={styles.a}>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
