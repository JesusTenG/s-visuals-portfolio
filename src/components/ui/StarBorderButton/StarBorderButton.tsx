import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import Link from "next/link";

import styles from "./StarBorderButton.module.css";

const DEFAULT_ACCENT = "var(--color-accent)";
const DEFAULT_SPEED = "3s";

type CommonProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  variant?: "primary" | "secondary";
  color?: string;
  speed?: string;
  thickness?: number;
  ariaLabel?: string;
};

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "aria-label"> & {
    href: string;
  };

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "aria-label"> & {
    href?: undefined;
  };

export type StarBorderButtonProps = LinkProps | ButtonProps;

function isLinkProps(props: StarBorderButtonProps): props is LinkProps {
  return typeof (props as LinkProps).href === "string";
}

export function StarBorderButton(props: StarBorderButtonProps) {
  const {
    children,
    className,
    innerClassName,
    variant = "primary",
    color = DEFAULT_ACCENT,
    speed = DEFAULT_SPEED,
    thickness = 3,
    ariaLabel,
    ...rest
  } = props;

  const variantClass =
    variant === "secondary"
      ? styles["star-border-button--secondary"]
      : styles["star-border-button--primary"];

  const wrapperClass = [styles["star-border-button"], variantClass, className]
    .filter(Boolean)
    .join(" ");

  const wrapperStyle = {
    "--star-border-glow-color": color,
    "--star-border-speed": speed,
    "--star-border-thickness": `${thickness}px`,
  } as CSSProperties;

  const inner = isLinkProps(props) ? (
    <Link
      href={props.href}
      {...(rest as Omit<LinkProps, keyof CommonProps | "href">)}
      className={innerClassName}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  ) : (
    <button
      {...(rest as Omit<ButtonProps, keyof CommonProps>)}
      type={(rest as ButtonHTMLAttributes<HTMLButtonElement>).type ?? "button"}
      className={innerClassName}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );

  return (
    <span className={wrapperClass} style={wrapperStyle}>
      <span className={styles["star-border-button__surface"]}>
        <span className={styles["star-border-button__glow-top"]} aria-hidden="true" />
        <span className={styles["star-border-button__glow-bottom"]} aria-hidden="true" />
        <span className={styles["star-border-button__inner"]}>{inner}</span>
      </span>
    </span>
  );
}

export default StarBorderButton;
