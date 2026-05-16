/**
 * Sparkline paths (viewBox 0 0 128 40) — smooth uptrends, one per KPI card.
 * Dot sits on the path end for a clean finish.
 */
export type ImpactMetricSparklineSpec = Readonly<{
  path: string;
  dot: Readonly<{ cx: number; cy: number }>;
}>;

export const IMPACT_METRIC_SPARKLINES: readonly ImpactMetricSparklineSpec[] = [
  {
    path: "M 6 30 C 32 28 52 18 78 12 S 102 8 118 9",
    dot: { cx: 118, cy: 9 },
  },
  {
    path: "M 6 32 C 28 30 48 16 72 11 S 100 7 120 8",
    dot: { cx: 120, cy: 8 },
  },
  {
    path: "M 6 34 C 30 32 50 20 74 13 S 100 9 120 8",
    dot: { cx: 120, cy: 8 },
  },
  {
    path: "M 6 28 C 34 26 56 14 82 10 S 106 6 118 7",
    dot: { cx: 118, cy: 7 },
  },
] as const;
