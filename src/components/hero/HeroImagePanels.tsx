import type { CSSProperties } from "react";
import Image from "next/image";

import styles from "./HeroImagePanels.module.css";

const HERO_FRAMES = [
  "/assets/hero/hero-frame-01-camera-v2.webp",
  "/assets/hero/hero-frame-02-fitness-filming.webp",
  "/assets/hero/hero-frame-04-city-shot.webp",
  "/assets/hero/hero-frame-03-cutter-desktop.webp",
  "/assets/hero/hero-frame-05-closeup-lens.webp",
] as const;

const HERO_PANEL_CENTER_INDEX = (HERO_FRAMES.length - 1) / 2;

export function HeroImagePanels() {
  return (
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
  );
}
