"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import styles from "./WorkSection.module.css";

/** Min. Anteil der Section-Bounding-Box im Viewport, ab dem die Cards revealen (0–1). */
const WORK_SECTION_REVEAL_RATIO_DESKTOP = 0.4;
const WORK_SECTION_REVEAL_RATIO_MOBILE = 0.06;

/** Mehrere Schwellen, damit schnelles Scrollen den Cut nicht überspringt. */
const WORK_SECTION_INTERSECTION_THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

function getRevealRatio(): number {
  if (typeof window === "undefined") return WORK_SECTION_REVEAL_RATIO_DESKTOP;
  return window.matchMedia("(max-width: 768px)").matches
    ? WORK_SECTION_REVEAL_RATIO_MOBILE
    : WORK_SECTION_REVEAL_RATIO_DESKTOP;
}

function isSectionVisibleEnough(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  if (rect.bottom <= 0 || rect.top >= viewportHeight) return false;

  const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  const intersectionRatio = visibleHeight / Math.max(rect.height, 1);
  return intersectionRatio >= getRevealRatio();
}

type Props = Readonly<{
  children: ReactNode;
}>;

export function WorkSectionRoot({ children }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reveal = () => {
      setIsRevealed(true);
    };

    if (isSectionVisibleEnough(el)) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        if (entry.intersectionRatio >= getRevealRatio() || isSectionVisibleEnough(el)) {
          reveal();
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 10% 0px",
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
      className={`${styles["work-section"]} section-flow section-flow--nocturne ${isRevealed ? styles["work-section--revealed"] : ""}`}
      aria-labelledby="work-section-title"
    >
      {children}
    </section>
  );
}
