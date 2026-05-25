"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Eye, Heart, MessageCircle, Send } from "lucide-react";

import type { Locale } from "@/i18n/config";
import type { Dictionary, ImpactSnapshotCardDict, ImpactSnapshotCardIcon } from "@/i18n/dictionaries";

import SVisualsButton from "@/components/ui/SVisualsButton";
import { contactCtaClassNames } from "@/components/ui/contactCtaButton";

import { ImpactKpiLineChart } from "./ImpactKpiLineChart.client";
import {
  IMPACT_KPI_COUNT_DURATION_MS,
  IMPACT_KPI_STAGGER_MS,
  IMPACT_NODE_ICONS,
} from "./impactSnapshotLayout";
import styles from "./ImpactSnapshotSection.module.css";

const REVEAL_RATIO = 0.18;
const REVEAL_THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

type Props = Readonly<{
  dict: Dictionary;
  locale: Locale;
}>;

type MetricNode = ImpactSnapshotCardDict;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function formatMetric(value: number, locale: Locale, decimals: number, suffix: string) {
  return `${new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)}${suffix}`;
}

function ImpactNodeIcon({ icon }: { icon: ImpactSnapshotCardIcon }) {
  const common = {
    className: styles.kpiIcon,
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
      return <Send {...common} />;
  }
}

function MetricValue({
  card,
  locale,
  active,
  showFinal,
}: Readonly<{
  card: ImpactSnapshotCardDict;
  locale: Locale;
  active: boolean;
  showFinal: boolean;
}>) {
  const [animated, setAnimated] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (showFinal || !active) return;

    const startAt = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - startAt) / IMPACT_KPI_COUNT_DURATION_MS);
      setAnimated(card.targetValue * easeOutCubic(t));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else setAnimated(card.targetValue);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, showFinal, card.targetValue]);

  const display = showFinal ? card.targetValue : active ? animated : 0;

  return (
    <span className={styles.kpiValue} suppressHydrationWarning>
      {formatMetric(display, locale, card.decimals, card.suffix)}
    </span>
  );
}

export function ImpactSnapshotRoot({ dict, locale }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visibleNodes, setVisibleNodes] = useState<ReadonlySet<number>>(() => new Set());

  const isDrawing = isRevealed && !reducedMotion;
  const allNodesVisible = isRevealed && reducedMotion;

  const snap = dict.impactSnapshot;
  const [lineA, lineB, lineC] = snap.statementLines;

  const metrics = useMemo<MetricNode[]>(() => {
    return IMPACT_NODE_ICONS.map((icon) => {
      const card = snap.cards.find((c) => c.icon === icon);
      if (!card) throw new Error(`Missing impact snapshot card for icon: ${icon}`);
      return card;
    });
  }, [snap.cards]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.intersectionRatio >= REVEAL_RATIO) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "0px", threshold: REVEAL_THRESHOLDS },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isRevealed) return;

    if (reducedMotion) {
      const rafId = requestAnimationFrame(() => {
        setVisibleNodes(new Set(metrics.map((_, index) => index)));
      });
      return () => cancelAnimationFrame(rafId);
    }

    const timeouts = metrics.map((_, index) =>
      window.setTimeout(
        () => {
          setVisibleNodes((prev) => {
            const next = new Set(prev);
            next.add(index);
            return next;
          });
        },
        index * IMPACT_KPI_STAGGER_MS,
      ),
    );

    return () => {
      for (const id of timeouts) window.clearTimeout(id);
    };
  }, [isRevealed, reducedMotion, metrics]);

  const sectionClass = [
    styles.kpiSection,
    isRevealed ? styles["kpiSection--revealed"] : "",
    isDrawing ? styles["kpiSection--drawing"] : "",
    reducedMotion && isRevealed ? styles["kpiSection--instant"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id="impact"
      ref={sectionRef}
      className={`${sectionClass} section-flow section-flow--meridian`}
      aria-labelledby="impact-snapshot-heading"
    >
      <p className="sr-only">{snap.ariaLabel}</p>
      <div className={styles.kpiShell}>
        <div className={styles.kpiInner}>
          <div className={`${styles.kpiHotspot} ${styles["kpiHotspot--copy"]}`}>
            <div className={styles.kpiCopy}>
              <h2 id="impact-snapshot-heading" className={styles.kpiHeadline}>
                <span className={styles.kpiHeadlineLine}>{lineA}</span>
                <span className={styles.kpiHeadlineLine}>{lineB}</span>
                <span className={`${styles.kpiHeadlineLine} ${styles.kpiHeadlineLineAccent}`}>
                  {lineC}
                </span>
              </h2>
              <div className={styles.kpiCtaWrap}>
              <SVisualsButton
                href={snap.ctaHref}
                showIcon={false}
                className={`${contactCtaClassNames.primary} ${contactCtaClassNames.prominent}`}
              >
                {snap.ctaLabel}
              </SVisualsButton>
              </div>
            </div>
          </div>

          <div className={styles.kpiCurveArea}>
            <div className={`${styles.kpiHotspot} ${styles["kpiHotspot--curve"]}`}>
              <div className={styles.kpiCurveChart}>
                <ImpactKpiLineChart isRevealed={isRevealed} reducedMotion={reducedMotion} />
              </div>
            </div>

            <div className={styles.kpiNodesRow}>
              {metrics.map((metric, index) => {
                const isVisible = allNodesVisible || visibleNodes.has(index);
                const showFinal = allNodesVisible;

                return (
                  <div
                    key={metric.icon}
                    className={`${styles.kpiHotspot} ${styles["kpiHotspot--node"]}`}
                  >
                    <div
                      className={[
                        styles.kpiNode,
                        isVisible ? styles["kpiNode--visible"] : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={{
                        ["--reveal-delay" as string]: `${index * IMPACT_KPI_STAGGER_MS}ms`,
                      }}
                      aria-label={`${metric.label}: ${formatMetric(metric.targetValue, locale, metric.decimals, metric.suffix)}`}
                    >
                      <ImpactNodeIcon icon={metric.icon} />
                      <span className={styles.kpiLabel}>{metric.label}</span>
                      <MetricValue
                        card={metric}
                        locale={locale}
                        active={isVisible}
                        showFinal={showFinal}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
