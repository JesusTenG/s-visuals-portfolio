import type { Dictionary } from "@/i18n/dictionaries";
import SVisualsButton from "@/components/ui/SVisualsButton";
import { HeroMetricCard } from "@/components/sections/HeroMetricCard";
import { HeroMockupTilt } from "@/components/sections/HeroMockupTilt";
import { HeroParallaxLayer } from "@/components/sections/HeroParallaxLayer.client";
import Image from "next/image";

import styles from "./HeroSection.module.css";

type Props = Readonly<{
  dict: Dictionary;
  locale: "en" | "de";
}>;

export function HeroSection({ dict, locale }: Props) {
  return (
    <section className={styles["hero-section"]}>
      <div className={styles["hero-rail"]}>
        <div className={styles["hero-container"]}>
          <div className={styles["hero-content"]}>
            <p
              className={`${styles["hero-eyebrow"]} ${styles["hero-enter"]} ${styles["hero-enter-d1"]}`}
            >
              {dict.hero.eyebrow}
            </p>

            <div
              className={`${styles["hero-catchphrase"]} ${styles["hero-enter"]} ${styles["hero-enter-d2"]}`}
            >
              <span className={styles["hero-catchphrase-line"]}>{dict.hero.catchphraseLines[0]}</span>
              <span className={styles["hero-catchphrase-line"]}>{dict.hero.catchphraseLines[1]}</span>
              <span
                className={`${styles["hero-catchphrase-line"]} ${styles["hero-catchphrase-accent"]}`}
              >
                {dict.hero.catchphraseLines[2]}
              </span>
            </div>

            <h1
              className={`${styles["hero-seo-title"]} ${styles["hero-enter"]} ${styles["hero-enter-d3"]}`}
            >
              {dict.hero.seoTitle}
            </h1>

            <div
              className={`${styles["hero-actions"]} ${styles["hero-enter"]} ${styles["hero-enter-d4"]}`}
            >
              <SVisualsButton href="#contact" showIcon={false}>
                {dict.hero.primaryCta}
              </SVisualsButton>
              <SVisualsButton href="#work" variant="quiet" showIcon={false}>
                {dict.hero.secondaryCta}
              </SVisualsButton>
            </div>
          </div>

          <div
            className={`${styles["hero-media"]} ${styles["hero-enter"]} ${styles["hero-enter-d5"]}`}
            aria-label="Hero media"
          >
            <HeroParallaxLayer className={styles["hero-media-parallax"]}>
              <div className={styles["hero-media-glow"]} aria-hidden="true" />

              <div className={styles["hero-image-slot"]} aria-label="Reserved space for future iPhone mockup image">
                <HeroMockupTilt className={styles["hero-mockup-tilt"]}>
                  <div className={styles["hero-mockup"]}>
                  <Image
                    className={styles["hero-mockup-image"]}
                    src="/assets/mockups/hero-mockup1.webp"
                    alt="Smartphone Mockup mit Conversion-orientierter Reel-Ansicht"
                    width={1497}
                    height={1982}
                    priority
                    sizes="(min-width: 980px) 544px, (min-width: 520px) 512px, 90vw"
                  />
                  </div>
                </HeroMockupTilt>
              </div>

              <HeroMetricCard
                className={styles["hero-metric-card-views"]}
                label={dict.hero.floatingMetrics.views.label}
                targetValue={dict.hero.floatingMetrics.views.targetValue}
                suffix={dict.hero.floatingMetrics.views.suffix}
                decimals={dict.hero.floatingMetrics.views.decimals}
                locale={locale}
                icon="views"
                animationDelayMs={0}
                sparklinePath="M4 38 C18 36 24 30 36 31 C50 33 54 18 68 20 C84 22 91 9 108 6"
              />

              <HeroMetricCard
                className={styles["hero-metric-card-likes"]}
                label={dict.hero.floatingMetrics.likes.label}
                targetValue={dict.hero.floatingMetrics.likes.targetValue}
                suffix={dict.hero.floatingMetrics.likes.suffix}
                decimals={dict.hero.floatingMetrics.likes.decimals}
                locale={locale}
                icon="likes"
                animationDelayMs={180}
                sparklinePath="M4 39 C16 37 25 36 36 27 C49 16 56 24 70 17 C84 10 94 7 108 3"
              />

              <HeroMetricCard
                className={styles["hero-metric-card-comments"]}
                label={dict.hero.floatingMetrics.comments.label}
                targetValue={dict.hero.floatingMetrics.comments.targetValue}
                suffix={dict.hero.floatingMetrics.comments.suffix}
                decimals={dict.hero.floatingMetrics.comments.decimals}
                locale={locale}
                icon="comments"
                animationDelayMs={360}
                sparklinePath="M4 37 C18 31 26 33 38 29 C52 24 56 15 70 18 C86 21 94 10 108 5"
              />

              <HeroMetricCard
                className={styles["hero-metric-card-shares"]}
                label={dict.hero.floatingMetrics.shares.label}
                targetValue={dict.hero.floatingMetrics.shares.targetValue}
                suffix={dict.hero.floatingMetrics.shares.suffix}
                decimals={dict.hero.floatingMetrics.shares.decimals}
                locale={locale}
                icon="shares"
                animationDelayMs={540}
                sparklinePath="M4 40 C18 38 25 29 38 31 C54 34 59 17 74 13 C89 9 96 5 108 3"
              />
            </HeroParallaxLayer>
          </div>
        </div>

        <div
          className={`${styles["hero-platform-strip"]} ${styles["hero-enter"]} ${styles["hero-enter-d6"]}`}
          aria-label={dict.hero.platformStripLabel}
        >
          <div className={styles["hero-platform-line"]} aria-hidden="true" />
          <div className={styles["hero-platform-label"]}>{dict.hero.platformStripLabel}</div>
          <div className={styles["hero-platform-line"]} aria-hidden="true" />
          <ul className={styles["hero-platform-items"]} aria-label="Platforms">
            {dict.hero.platformStripItems.map((item) => (
              <li key={item} className={styles["hero-platform-item"]}>
                <span className={styles["hero-platform-dot"]} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

