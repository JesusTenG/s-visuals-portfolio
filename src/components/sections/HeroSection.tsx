import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import SVisualsButton from "@/components/ui/SVisualsButton";
import Image from "next/image";

import styles from "./HeroSection.module.css";

const HERO_FRAMES = [
  "/assets/hero/hero-frame-01-camera.webp",
  "/assets/hero/hero-frame-02-fitness-gym.webp",
  "/assets/hero/hero-frame-03-cutter-desktop.webp",
  "/assets/hero/hero-frame-04-city-shot.webp",
  "/assets/hero/hero-frame-05-closeup-lens.webp",
] as const;

type Props = Readonly<{
  dict: Dictionary;
}>;

export function HeroSection({ dict }: Props) {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles["hero-panels"]} aria-hidden="true">
        {HERO_FRAMES.map((src, index) => (
          <div
            key={src}
            className={styles["hero-panel"]}
            style={{ ["--hero-panel-i" as string]: index } as CSSProperties}
          >
            <Image
              src={src}
              alt=""
              fill
              className={styles["hero-panel-img"]}
              sizes="(max-width: 768px) 22vw, 20vw"
              priority={index === 2}
            />
          </div>
        ))}
      </div>

      <div className={styles["hero-overlay"]} aria-hidden="true" />

      <div className={styles["hero-inner"]}>
        <div className={styles["hero-content"]}>
          <h1 id="hero-heading" className={styles["sr-only"]}>
            {dict.hero.seoH1}
          </h1>

          <p
            className={`${styles["hero-eyebrow"]} ${styles["hero-enter"]} ${styles["hero-enter-d1"]}`}
          >
            {dict.hero.eyebrow}
          </p>

          <div
            className={`${styles["hero-headline"]} ${styles["hero-enter"]} ${styles["hero-enter-d2"]}`}
            aria-hidden="true"
          >
            <span className={styles["hero-headline-text"]}>{dict.hero.headline}</span>
          </div>

          <p
            className={`${styles["hero-subline"]} ${styles["hero-enter"]} ${styles["hero-enter-d3"]}`}
          >
            {dict.hero.subline}
          </p>

          <ul
            className={`${styles["hero-service-list"]} ${styles["hero-enter"]} ${styles["hero-enter-d4"]}`}
            aria-label={dict.services.title}
          >
            {dict.hero.services.map((label, i) => (
              <li key={label} className={styles["hero-service-item"]}>
                {i > 0 ? (
                  <span className={styles["hero-service-dot"]} aria-hidden="true" />
                ) : null}
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <div
            className={`${styles["hero-actions"]} ${styles["hero-enter"]} ${styles["hero-enter-d5"]}`}
          >
            <SVisualsButton href={dict.hero.primaryCtaHref} showIcon={false}>
              {dict.hero.primaryCta}
            </SVisualsButton>
            <SVisualsButton
              href={dict.hero.secondaryCtaHref}
              variant="quiet"
              showIcon={false}
            >
              {dict.hero.secondaryCta}
            </SVisualsButton>
          </div>
        </div>
      </div>

      <div
        className={`${styles["hero-scroll"]} ${styles["hero-enter"]} ${styles["hero-enter-d6"]}`}
      >
        <span className={styles["hero-scroll-line"]} aria-hidden="true" />
        <span className={styles["hero-scroll-label"]}>{dict.hero.scrollLabel}</span>
      </div>
    </section>
  );
}
