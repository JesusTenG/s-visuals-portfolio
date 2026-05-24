import type { CSSProperties, ReactNode } from "react";

import styles from "./StarBorderButton.module.css";

const DEFAULT_ACCENT = "var(--color-accent, #8659ce)";
const DEFAULT_SPEED = "5s";

type Props = Readonly<{
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  variant?: "primary" | "secondary";
  layout?: "inline" | "block";
  color?: string;
  speed?: string;
  thickness?: number;
}>;

/** Non-interactive star-orbit border wrapper (panels, cards). */
export function StarBorderFrame({
  children,
  className,
  innerClassName,
  variant = "primary",
  layout = "inline",
  color = DEFAULT_ACCENT,
  speed = DEFAULT_SPEED,
  thickness = 3,
}: Props) {
  const variantClass =
    variant === "secondary"
      ? styles["star-border-button--secondary"]
      : styles["star-border-button--primary"];

  const layoutClass = layout === "block" ? styles["star-border-button--block"] : "";

  const wrapperClass = [styles["star-border-button"], variantClass, layoutClass, className]
    .filter(Boolean)
    .join(" ");

  const innerClass = [styles["star-border-button__inner"], innerClassName]
    .filter(Boolean)
    .join(" ");

  const wrapperStyle = {
    "--star-border-glow-color": color,
    "--star-border-speed": speed,
    "--star-border-thickness": `${thickness}px`,
  } as CSSProperties;

  return (
    <span className={wrapperClass} style={wrapperStyle}>
      <span className={styles["star-border-button__surface"]}>
        <span className={styles["star-border-button__glow-top"]} aria-hidden="true" />
        <span className={styles["star-border-button__glow-bottom"]} aria-hidden="true" />
        <div className={innerClass}>{children}</div>
      </span>
    </span>
  );
}
