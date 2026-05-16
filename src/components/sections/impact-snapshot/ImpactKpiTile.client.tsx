"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, Heart, MessageCircle, Share2 } from "lucide-react";

import type { Locale } from "@/i18n/config";
import type { ImpactSnapshotCardDict, ImpactSnapshotCardIcon } from "@/i18n/dictionaries";

import { IMPACT_METRIC_SPARKLINES } from "./impactSnapshotSparklines";
import { ImpactMetricSparkline } from "./ImpactMetricSparkline";
import styles from "./ImpactSnapshotSection.module.css";

type Props = Readonly<{
  card: ImpactSnapshotCardDict;
  index: number;
  locale: Locale;
  revealed: boolean;
  reducedMotion: boolean;
}>;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function formatValue(value: number, locale: Locale, decimals: number, suffix: string) {
  const nf = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${nf.format(value)}${suffix}`;
}

function ImpactCardIcon({ icon }: { icon: ImpactSnapshotCardIcon }) {
  const common = {
    className: styles.tileIconSvg,
    size: 28,
    strokeWidth: 1.65,
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "eye":
      return <Eye {...common} />;
    case "heart":
      return <Heart {...common} />;
    case "message":
      return <MessageCircle {...common} />;
    case "share2":
      return <Share2 {...common} />;
  }
}

const COUNT_DURATION_MS = 900;
const COUNT_START_BASE_MS = 400;
const COUNT_STAGGER_MS = 85;
const SPARK_DRAW_BASE_MS = 520;
const SPARK_DRAW_STAGGER_MS = 85;

export function ImpactKpiTile({ card, index, locale, revealed, reducedMotion }: Props) {
  const [displayValue, setDisplayValue] = useState(0);
  const [sparkDrawn, setSparkDrawn] = useState(false);
  const rafRef = useRef<number | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    if (!revealed || reducedMotion) return;

    const clearAll = () => {
      for (const id of timeoutsRef.current) window.clearTimeout(id);
      timeoutsRef.current = [];
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const countDelay = COUNT_START_BASE_MS + index * COUNT_STAGGER_MS;
    const sparkDelay = SPARK_DRAW_BASE_MS + index * SPARK_DRAW_STAGGER_MS;

    timeoutsRef.current.push(
      window.setTimeout(() => {
        const startAt = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - startAt) / COUNT_DURATION_MS);
          const eased = easeOutCubic(t);
          setDisplayValue(card.targetValue * eased);
          if (t < 1) rafRef.current = requestAnimationFrame(tick);
          else setDisplayValue(card.targetValue);
        };
        rafRef.current = requestAnimationFrame(tick);
      }, countDelay),
    );

    timeoutsRef.current.push(
      window.setTimeout(() => {
        setSparkDrawn(true);
      }, sparkDelay),
    );

    return clearAll;
  }, [revealed, reducedMotion, card.targetValue, index]);

  const resolvedValue = reducedMotion && revealed ? card.targetValue : displayValue;
  const valueText = formatValue(resolvedValue, locale, card.decimals, card.suffix);
  const finalText = formatValue(card.targetValue, locale, card.decimals, card.suffix);
  const showSparkDrawn = sparkDrawn || (revealed && reducedMotion);

  return (
    <li
      className={[styles.tile, showSparkDrawn ? styles["tile--spark-drawn"] : ""].filter(Boolean).join(" ")}
      style={{ ["--tile-stagger" as never]: `${index * 85}ms` }}
      aria-label={`${card.label}: ${finalText}`}
    >
      <div className={styles.tileMain}>
        <div className={styles.tileRow}>
          <span className={styles.tileIconWrap}>
            <ImpactCardIcon icon={card.icon} />
          </span>
          <div className={styles.tileMeta}>
            <p className={styles.tileLabel}>{card.label}</p>
            <div className={styles.tileValueRow}>
              <p className={styles.tileValue}>{valueText}</p>
              <ImpactMetricSparkline
                spec={IMPACT_METRIC_SPARKLINES[index] ?? IMPACT_METRIC_SPARKLINES[0]}
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
