import type { CSSProperties } from "react";

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
  const rootClass = [
    styles["section-intro"],
    styles[`section-intro--headline-${headlineSide}`],
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

  const hasShiftStyle = centerShift !== undefined || centerShiftDesktop !== undefined;

  return (
    <header className={rootClass} style={hasShiftStyle ? style : undefined}>
      <p className={styles["section-intro__eyebrow"]}>{eyebrow}</p>

      <div className={styles["section-intro__grid"]}>
        <div className={styles["section-intro__headline-col"]}>
          <h2 id={titleId} className={styles["section-intro__title"]}>
            {lines.map((line) => (
              <span key={line} className={titleLineClass}>
                {line}
              </span>
            ))}
          </h2>
        </div>

        {subtitle ? (
          <div className={styles["section-intro__subtitle-col"]}>
            <p className={styles["section-intro__subtitle"]}>{subtitle}</p>
          </div>
        ) : null}
      </div>
    </header>
  );
}
