import type { ImpactMetricSparklineSpec } from "./impactSnapshotSparklines";
import styles from "./ImpactSnapshotSection.module.css";

type Props = Readonly<{
  spec: ImpactMetricSparklineSpec;
}>;

export function ImpactMetricSparkline({ spec }: Props) {
  return (
    <div className={styles.tileSparklineWrap}>
      <svg
        className={styles.tileSparklineSvg}
        viewBox="0 0 128 40"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <path className={styles.tileSparklinePath} pathLength={1} d={spec.path} />
        <circle className={styles.tileSparklineDot} cx={spec.dot.cx} cy={spec.dot.cy} r={2.5} />
      </svg>
    </div>
  );
}
