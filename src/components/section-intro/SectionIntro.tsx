"use client";

import type { CSSProperties } from "react";

import { ScrollReveal } from "@/components/animation/ScrollReveal";

import {
  sectionIntroRevealDirections,
  sectionIntroRevealDirectionsStack,
} from "./sectionIntroReveal";
import { useSectionIntroStackLayout } from "./useSectionIntroStackLayout";
import styles from "./SectionIntro.module.css";

export type SectionIntroHeadlineSide = "left" | "right";

type Props = Readonly<{
  eyebrow: string;
  title: string;
  subtitle?: string;
  headlineSide: SectionIntroHeadlineSide;
  /**
   * Shifts the imaginary center line between headline and subtitle (tablet/desktop only).
   * Positive values move the line to the right; negative values move it to the left.
   * Examples: "2rem", "-3vw", "clamp(-2rem, -4vw, 1rem)"
   */
  centerShift?: string;
  /** Optional override from 1200px up; falls back to `centerShift`. */
  centerShiftDesktop?: string;
  /** Associates the section `aria-labelledby` with the headline. */
  titleId?: string;
  className?: string;
}>;

function titleLines(title: string) {
  return title.split("\n").filter((line) => line.length > 0);
}

export function SectionIntro({
  eyebrow,
  title,
  subtitle,
  headlineSide,
  centerShift,
  centerShiftDesktop,
  titleId,
  className,
}: Props) {
  const isStackLayout = useSectionIntroStackLayout();
  const reveal = isStackLayout
    ? sectionIntroRevealDirectionsStack()
    : sectionIntroRevealDirections(headlineSide);

  const rootClass = [
    styles["section-intro"],
    styles[`section-intro--headline-${headlineSide}`],
    isStackLayout ? styles["section-intro--stack"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const lines = titleLines(title);
  const titleLineClass =
    lines.length > 2
      ? `${styles["section-intro__title-line"]} ${styles["section-intro__title-line--multiline"]}`
      : styles["section-intro__title-line"];

  const style = {
    ...(centerShift !== undefined
      ? { "--section-intro-center-shift": centerShift }
      : {}),
    ...(centerShiftDesktop !== undefined
      ? { "--section-intro-center-shift-desktop": centerShiftDesktop }
      : {}),
  } as CSSProperties;

  const hasShiftStyle =
    !isStackLayout && (centerShift !== undefined || centerShiftDesktop !== undefined);

  return (
    <header className={rootClass} style={hasShiftStyle ? style : undefined}>
      <ScrollReveal
        direction={reveal.eyebrow}
        delay={0}
        className={styles["section-intro__eyebrow-reveal"]}
      >
        <p className={styles["section-intro__eyebrow"]}>{eyebrow}</p>
      </ScrollReveal>

      <div className={styles["section-intro__grid"]}>
        <div className={styles["section-intro__headline-col"]}>
          <ScrollReveal
            direction={reveal.headline}
            delay={80}
            className={styles["section-intro__headline-reveal"]}
          >
            <h2 id={titleId} className={styles["section-intro__title"]}>
              {lines.map((line) => (
                <span key={line} className={titleLineClass}>
                  {line}
                </span>
              ))}
            </h2>
          </ScrollReveal>
        </div>

        {subtitle ? (
          <div className={styles["section-intro__subtitle-col"]}>
            <ScrollReveal
              direction={reveal.subtitle}
              delay={140}
              className={styles["section-intro__subtitle-reveal"]}
            >
              <p className={styles["section-intro__subtitle"]}>{subtitle}</p>
            </ScrollReveal>
          </div>
        ) : null}
      </div>
    </header>
  );
}
