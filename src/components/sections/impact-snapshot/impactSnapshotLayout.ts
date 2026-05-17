import type { ImpactSnapshotCardIcon } from "@/i18n/dictionaries";

export const IMPACT_CURVE_DURATION_MS = 3500;

/** Chevron stroke duration (ms). */
export const IMPACT_ARROW_DRAW_DURATION_MS = 520;

/**
 * When the arrow stroke starts (ms). Shorter than curve duration because
 * ease-out reveals the tip before the CSS animation ends.
 */
export const IMPACT_ARROW_START_DELAY_MS = Math.round(IMPACT_CURVE_DURATION_MS * 0.7);

/** Delay between each KPI node reveal on viewport enter (ms). */
export const IMPACT_KPI_STAGGER_MS = 200;

/** Duration of each KPI count-up once its node is visible (ms). */
export const IMPACT_KPI_COUNT_DURATION_MS = 1600;

export const IMPACT_CURVE_VIEWBOX = { width: 1000, height: 260 } as const;

/**
 * Volatile upward growth curve — cubic Bézier only (M + C).
 * Higher highs, higher lows; steep overall climb.
 */
/** One smooth final swoop: carries momentum down, then rises to the peak. */
export const IMPACT_CURVE_PATH =
  "M 20 220 C 70 205, 85 170, 130 155 C 170 142, 185 190, 245 172 C 305 154, 320 105, 380 95 C 430 87, 455 132, 515 118 C 575 104, 590 55, 650 45 C 705 37, 735 82, 795 98 C 852 116, 940 132, 976 8";

/** KPI row order (left → right). */
export const IMPACT_NODE_ICONS: readonly ImpactSnapshotCardIcon[] = [
  "heart",
  "message",
  "share2",
  "eye",
] as const;
