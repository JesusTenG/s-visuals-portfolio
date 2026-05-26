"use client";

import { ScrollReveal } from "@/components/animation/ScrollReveal";

import styles from "./SectionHeader.module.css";

type Props = Readonly<{
  eyebrow?: string;
  title: string;
  intro?: string;
  titleId?: string;
  align?: "center" | "start";
  headingLevel?: "h1" | "h2";
  className?: string;
}>;

export function SectionHeader({
  eyebrow,
  title,
  intro,
  titleId,
  align = "center",
  headingLevel = "h2",
  className,
}: Props) {
  const rootClass = [
    styles.header,
    align === "center" ? styles["header--center"] : styles["header--start"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const textDirection = align === "start" ? "left" : "fade";
  const HeadingTag = headingLevel;

  return (
    <header className={rootClass}>
      {eyebrow ? (
        <ScrollReveal direction={textDirection} delay={0}>
          <p className={styles.eyebrow}>{eyebrow}</p>
        </ScrollReveal>
      ) : null}
      <ScrollReveal direction={textDirection} delay={eyebrow ? 80 : 0}>
        <HeadingTag id={titleId} className={styles.title}>
          {title}
        </HeadingTag>
      </ScrollReveal>
      {intro ? (
        <ScrollReveal direction={textDirection} delay={eyebrow ? 140 : 80}>
          <p className={styles.intro}>{intro}</p>
        </ScrollReveal>
      ) : null}
    </header>
  );
}
