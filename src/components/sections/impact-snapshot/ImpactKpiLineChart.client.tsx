"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  IMPACT_ARROW_DRAW_DURATION_MS,
  IMPACT_ARROW_START_DELAY_MS,
  IMPACT_CURVE_DURATION_MS,
  IMPACT_CURVE_PATH,
  IMPACT_CURVE_VIEWBOX,
} from "./impactSnapshotLayout";
import styles from "./ImpactSnapshotSection.module.css";

type Props = Readonly<{
  isRevealed: boolean;
  reducedMotion: boolean;
}>;

const ARROW_SAMPLE_BACK = 28;
/** Open chevron in local coords (tip at origin, points backward along the curve). */
const ARROW_HEAD_D = "M -29 15.5 L 0 0 L -24 -15.5";

export function ImpactKpiLineChart({ isRevealed, reducedMotion }: Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [arrowTransform, setArrowTransform] = useState<string | null>(null);

  const shouldDraw = isRevealed && !reducedMotion && !hasDrawn;
  const showComplete = hasDrawn || (isRevealed && reducedMotion);
  const showArrow = isRevealed && arrowTransform;

  const syncArrow = useCallback(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    if (length <= 0) return;

    const tip = path.getPointAtLength(length);
    const before = path.getPointAtLength(Math.max(0, length - ARROW_SAMPLE_BACK));
    const angle =
      (Math.atan2(tip.y - before.y, tip.x - before.x) * 180) / Math.PI;

    setArrowTransform(`translate(${tip.x} ${tip.y}) rotate(${angle})`);
  }, []);

  useEffect(() => {
    if (!isRevealed) return;

    syncArrow();

    const ro = new ResizeObserver(() => syncArrow());
    const path = pathRef.current;
    if (path) ro.observe(path);

    return () => ro.disconnect();
  }, [isRevealed, syncArrow]);

  useEffect(() => {
    if (!shouldDraw) return;

    const timeoutId = window.setTimeout(
      () => setHasDrawn(true),
      IMPACT_ARROW_START_DELAY_MS + IMPACT_ARROW_DRAW_DURATION_MS + 40,
    );

    return () => window.clearTimeout(timeoutId);
  }, [shouldDraw]);

  const wrapClass = [
    styles.kpiCurveWrap,
    isRevealed ? styles["kpiCurveWrap--revealed"] : "",
    shouldDraw ? styles["kpiCurveWrap--drawing"] : "",
    showComplete ? styles["kpiCurveWrap--drawn"] : "",
    reducedMotion && isRevealed ? styles["kpiCurveWrap--instant"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleCurveAnimationEnd = () => {
    if (shouldDraw) {
      syncArrow();
    }
  };

  const handleArrowAnimationEnd = () => {
    if (shouldDraw) setHasDrawn(true);
  };

  return (
    <div
      className={wrapClass}
      style={{
        ["--curve-duration" as string]: `${IMPACT_CURVE_DURATION_MS}ms`,
        ["--arrow-delay" as string]: `${IMPACT_ARROW_START_DELAY_MS}ms`,
        ["--arrow-duration" as string]: `${IMPACT_ARROW_DRAW_DURATION_MS}ms`,
      }}
      aria-hidden
    >
      <svg
        className={styles.kpiCurveSvg}
        viewBox={`0 0 ${IMPACT_CURVE_VIEWBOX.width} ${IMPACT_CURVE_VIEWBOX.height}`}
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          ref={pathRef}
          className={styles.kpiCurvePath}
          d={IMPACT_CURVE_PATH}
          pathLength={1}
          onAnimationEnd={handleCurveAnimationEnd}
        />
        {showArrow ? (
          <g className={styles.kpiCurveArrowWrap} transform={arrowTransform}>
            <path
              className={styles.kpiCurveArrowHead}
              d={ARROW_HEAD_D}
              pathLength={1}
              onAnimationEnd={handleArrowAnimationEnd}
            />
          </g>
        ) : null}
      </svg>
    </div>
  );
}
