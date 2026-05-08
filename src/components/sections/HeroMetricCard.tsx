"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Eye, Heart, MessageCircle, Send } from "lucide-react";

import styles from "./HeroMetricCard.module.css";

export type HeroMetricIcon = "views" | "likes" | "comments" | "shares";

export type HeroMetricCardProps = {
  label: string;
  targetValue: number;
  suffix?: string;
  decimals?: number;
  locale: "en" | "de";
  sparklinePath: string;
  icon: HeroMetricIcon;
  className?: string;
  animationDelayMs?: number;
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function formatValue(value: number, locale: "en" | "de", decimals: number, suffix?: string) {
  const nf = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${nf.format(value)}${suffix ?? ""}`;
}

function MetricIcon({ icon }: { icon: HeroMetricIcon }) {
  const iconProps = {
    size: 16,
    strokeWidth: 2,
    "aria-hidden": true,
    focusable: false,
  } as const;

  switch (icon) {
    case "views":
      return <Eye {...iconProps} />;
    case "likes":
      return <Heart {...iconProps} />;
    case "comments":
      return <MessageCircle {...iconProps} />;
    case "shares":
      return <Send {...iconProps} />;
  }
}

function createArrowHeadPath(params: {
  end: { x: number; y: number };
  angleRad: number;
  size: number;
  spreadRad: number;
}) {
  const { end, angleRad, size, spreadRad } = params;

  const leftAngle = angleRad + Math.PI - spreadRad;
  const rightAngle = angleRad + Math.PI + spreadRad;

  const ax = end.x + Math.cos(leftAngle) * size;
  const ay = end.y + Math.sin(leftAngle) * size;
  const bx = end.x + Math.cos(rightAngle) * size;
  const by = end.y + Math.sin(rightAngle) * size;

  return `M ${ax.toFixed(3)} ${ay.toFixed(3)} L ${end.x.toFixed(3)} ${end.y.toFixed(3)} M ${bx.toFixed(3)} ${by.toFixed(3)} L ${end.x.toFixed(3)} ${end.y.toFixed(3)}`;
}

export function HeroMetricCard({
  label,
  targetValue,
  suffix,
  decimals = 0,
  locale,
  sparklinePath,
  icon,
  className,
  animationDelayMs = 0,
}: HeroMetricCardProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const sparklineRef = useRef<SVGPathElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const [arrowHeadPath, setArrowHeadPath] = useState<string>("");

  const finalText = useMemo(
    () => formatValue(targetValue, locale, decimals, suffix),
    [targetValue, locale, decimals, suffix],
  );

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReduced) {
      const id = requestAnimationFrame(() => {
        setDisplayValue(targetValue);
        setHasStarted(true);
      });
      return () => cancelAnimationFrame(id);
    }

    const node = rootRef.current;
    if (!node) return;

    let didRun = false;

    const start = () => {
      if (didRun) return;
      didRun = true;
      setHasStarted(true);

      const durationMs = 1100;
      const startAt = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - startAt) / durationMs);
        const eased = easeOutCubic(t);
        setDisplayValue(targetValue * eased);
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
        else setDisplayValue(targetValue);
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      start();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    io.observe(node);

    return () => {
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [targetValue]);

  useEffect(() => {
    const pathEl = sparklineRef.current;
    if (!pathEl) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const id = requestAnimationFrame(() => {
      try {
        const total = pathEl.getTotalLength();
        if (!Number.isFinite(total) || total <= 0) return;

        const epsilon = Math.min(6, Math.max(1.5, total * 0.02));
        const end = pathEl.getPointAtLength(total);
        const prev = pathEl.getPointAtLength(Math.max(0, total - epsilon));
        const angle = Math.atan2(end.y - prev.y, end.x - prev.x);

        setArrowHeadPath(
          createArrowHeadPath({
            end: { x: end.x, y: end.y },
            angleRad: angle,
            size: prefersReduced ? 9.5 : 12.5,
            spreadRad: prefersReduced ? 0.52 : 0.56,
          }),
        );
      } catch {
        setArrowHeadPath("");
      }
    });

    return () => cancelAnimationFrame(id);
  }, [sparklinePath]);

  return (
    <div
      ref={rootRef}
      className={[
        styles["hero-metric-card"],
        hasStarted ? styles["is-animated"] : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ ["--hero-metric-delay" as never]: `${animationDelayMs}ms` }}
      aria-label={`${label}: ${finalText}`}
    >
      <div className={styles["hero-metric-header"]}>
        <span className={styles["hero-metric-icon"]} aria-hidden="true">
          <MetricIcon icon={icon} />
        </span>
        <span className={styles["hero-metric-label"]}>{label}</span>
      </div>

      <strong className={styles["hero-metric-value"]} aria-hidden="true">
        {formatValue(displayValue, locale, decimals, suffix)}
      </strong>
      <span className={styles["sr-only"]}>{finalText}</span>

      <svg
        className={styles["hero-metric-sparkline"]}
        viewBox="0 0 120 44"
        aria-hidden="true"
        focusable="false"
      >
        <path
          ref={sparklineRef}
          className={styles["hero-metric-sparkline-path"]}
          pathLength={1}
          d={sparklinePath}
        />
        <path
          className={styles["hero-metric-sparkline-arrow"]}
          pathLength={1}
          d={arrowHeadPath}
        />
      </svg>
    </div>
  );
}

