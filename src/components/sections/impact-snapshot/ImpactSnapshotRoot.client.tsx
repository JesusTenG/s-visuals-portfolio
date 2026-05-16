"use client";

import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

import { ImpactKpiTile } from "./ImpactKpiTile.client";
import styles from "./ImpactSnapshotSection.module.css";

const IMPACT_SNAPSHOT_REVEAL_RATIO = 0.22;
const IMPACT_SNAPSHOT_THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

type Props = Readonly<{
  dict: Dictionary;
  locale: Locale;
}>;

export function ImpactSnapshotRoot({ dict, locale }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const snap = dict.impactSnapshot;
  const [a, b, c] = snap.statementLines;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.intersectionRatio >= IMPACT_SNAPSHOT_REVEAL_RATIO) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "0px", threshold: IMPACT_SNAPSHOT_THRESHOLDS },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${isRevealed ? styles["section--revealed"] : ""}`}
      aria-labelledby="impact-snapshot-heading"
    >
      <div className={styles.shell}>
        <p className="sr-only">{snap.ariaLabel}</p>
        <div className={styles.panel}>
          <div className={styles.layout}>
            <div className={styles.copy}>
              <h2 id="impact-snapshot-heading" className={styles.statementHeading}>
                <span className={styles.statementLine}>{a}</span>
                <span className={styles.statementLine}>{b}</span>
                <span className={`${styles.statementLine} ${styles.statementLineAccent}`}>{c}</span>
              </h2>
            </div>
            <ul className={styles.kpiGrid}>
              {snap.cards.map((card, index) => (
                <ImpactKpiTile
                  key={card.label}
                  card={card}
                  index={index}
                  locale={locale}
                  revealed={isRevealed}
                  reducedMotion={reducedMotion}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
