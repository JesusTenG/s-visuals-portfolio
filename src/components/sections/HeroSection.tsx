import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import SVisualsButton from "@/components/ui/SVisualsButton";
import { introCssProperties } from "@/lib/introAnimationTiming";
import Image from "next/image";

import styles from "./HeroSection.module.css";

// NOTE: hero-frame-01 is referenced as -v2 to bust both browser cache and the
// Next.js image-optimizer cache after the source asset was replaced on disk.
// The file on disk is renamed to match. If you replace it again, bump to -v3.
const HERO_FRAMES = [
  "/assets/hero/hero-frame-01-camera-v2.webp",
  "/assets/hero/hero-frame-02-fitness-filming.webp",
  "/assets/hero/hero-frame-04-city-shot.webp",
  "/assets/hero/hero-frame-03-cutter-desktop.webp",
  "/assets/hero/hero-frame-05-closeup-lens.webp",
] as const;

const HERO_PANEL_CENTER_INDEX = (HERO_FRAMES.length - 1) / 2;

type Props = Readonly<{
  dict: Dictionary;
}>;

export function HeroSection({ dict }: Props) {
  return (
    <section
      className={styles.hero}
      style={introCssProperties()}
      aria-labelledby="hero-heading"
    >
      <div className={styles["hero-panels"]} aria-hidden="true">
        {HERO_FRAMES.map((src, index) => (
          <div
            key={src}
            className={styles["hero-panel"]}
            style={
              {
                ["--hero-panel-ring" as string]: Math.abs(
                  index - HERO_PANEL_CENTER_INDEX,
                ),
              } as CSSProperties
            }
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
          <h1 id="hero-heading" className="sr-only">
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
              variant="secondary"
              showIcon={false}
            >
              {dict.hero.secondaryCta}
            </SVisualsButton>
          </div>
        </div>
      </div>

      <div className={`${styles["hero-scroll"]} ${styles["hero-scroll-intro"]}`}>
        <span className={styles["hero-scroll-line"]} aria-hidden="true" />
        <span className={styles["hero-scroll-label"]}>{dict.hero.scrollLabel}</span>
      </div>
    </section>
  );
}
