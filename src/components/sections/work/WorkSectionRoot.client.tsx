"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import styles from "./WorkSection.module.css";

/** Min. Anteil der Section-Bounding-Box im Viewport, ab dem die Cards revealen (0–1). */
const WORK_SECTION_REVEAL_RATIO = 0.4;

/** Mehrere Schwellen, damit schnelles Scrollen den 40%-Cut nicht überspringt. */
const WORK_SECTION_INTERSECTION_THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

type Props = Readonly<{
  children: ReactNode;
}>;

export function WorkSectionRoot({ children }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= WORK_SECTION_REVEAL_RATIO) setIsRevealed(true);
      },
      {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: WORK_SECTION_INTERSECTION_THRESHOLDS,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className={`${styles["work-section"]} ${isRevealed ? styles["work-section--revealed"] : ""}`}
      aria-labelledby="work-section-title"
    >
      {children}
    </section>
  );
}
