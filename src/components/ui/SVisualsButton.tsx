import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { StarBorderButton } from "@/components/ui/StarBorderButton";

import styles from "./SVisualsButton.module.css";

type CommonProps = {
  label?: string;
  children?: ReactNode;
  ariaLabel?: string;
  className?: string;
  variant?: "primary" | "secondary";
  showIcon?: boolean;
  /** Animated star border (off for Navbar). Default: true */
  enableStarBorder?: boolean;
};

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "aria-label"> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "aria-label"> & {
    href?: undefined;
  };

type Props = LinkProps | NativeButtonProps;

function isLinkProps(p: Props): p is LinkProps {
  return typeof (p as LinkProps).href === "string";
}

export default function SVisualsButton(props: Props) {
  const {
    label: _label,
    children,
    ariaLabel,
    className,
    variant,
    showIcon: showIconProp,
    enableStarBorder = true,
    ...domProps
  } = props;

  const content = children ?? _label ?? "";
  const variantKey = variant === "secondary" ? "secondary" : "primary";
  const variantClass =
    variant === "secondary"
      ? styles["svisuals-button--secondary"]
      : styles["svisuals-button--primary"];
  const starBorderInner = enableStarBorder ? styles["svisuals-button--within-star-border"] : "";
  const btnClass = `${styles["svisuals-button"]} ${variantClass} ${starBorderInner} ${className ?? ""}`.trim();
  const showIcon = showIconProp ?? false;

  const computedAriaLabel =
    ariaLabel ?? (typeof content === "string" ? content : undefined);

  const innerContent = (
    <>
      <span className={styles["svisuals-button__label"]}>{content}</span>
      {showIcon ? (
        <svg
          className={styles["svisuals-button__icon"]}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
          />
        </svg>
      ) : null}
    </>
  );

  if (enableStarBorder) {
    if (isLinkProps(props)) {
      const { href, ...anchorProps } = domProps as Omit<LinkProps, keyof CommonProps>;
      return (
        <StarBorderButton
          href={href}
          variant={variantKey}
          innerClassName={btnClass}
          ariaLabel={computedAriaLabel}
          {...anchorProps}
        >
          {innerContent}
        </StarBorderButton>
      );
    }

    const { href: _href, ...buttonProps } = domProps as Omit<NativeButtonProps, keyof CommonProps>;
    void _href;
    return (
      <StarBorderButton
        variant={variantKey}
        innerClassName={btnClass}
        ariaLabel={computedAriaLabel}
        {...buttonProps}
      >
        {innerContent}
      </StarBorderButton>
    );
  }

  if (isLinkProps(props)) {
    const { href, ...anchorProps } = domProps as Omit<LinkProps, keyof CommonProps>;
    return (
      <a href={href} {...anchorProps} className={btnClass} aria-label={computedAriaLabel}>
        {innerContent}
      </a>
    );
  }

  const { href: _href, ...buttonProps } = domProps as Omit<NativeButtonProps, keyof CommonProps>;
  void _href;
  return (
    <button
      {...buttonProps}
      className={btnClass}
      aria-label={computedAriaLabel}
      type={buttonProps.type ?? "button"}
    >
      {innerContent}
    </button>
  );
}
