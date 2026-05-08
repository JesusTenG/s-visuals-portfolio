import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./SVisualsButton.module.css";

type CommonProps = {
  label?: string;
  children?: ReactNode;
  ariaLabel?: string;
  className?: string;
  variant?: "primary" | "quiet";
  showIcon?: boolean;
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
  const content = props.children ?? props.label ?? "";
  const variantClass =
    props.variant === "quiet" ? styles["svisuals-button--quiet"] : styles["svisuals-button--primary"];
  const btnClass = `${styles["svisuals-button"]} ${variantClass} ${props.className ?? ""}`.trim();
  const showIcon = props.showIcon ?? props.variant === "quiet";

  const computedAriaLabel =
    props.ariaLabel ?? (typeof content === "string" ? content : undefined);

  if (isLinkProps(props)) {
    const { href, ...rest } = props;
    return (
      <a href={href} {...rest} className={btnClass} aria-label={computedAriaLabel}>
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
      </a>
    );
  }

  const { href: _href, ...rest } = props;
  void _href;
  return (
    <button
      {...rest}
      className={btnClass}
      aria-label={computedAriaLabel}
      type={(rest as ButtonHTMLAttributes<HTMLButtonElement>).type ?? "button"}
    >
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
    </button>
  );
}

