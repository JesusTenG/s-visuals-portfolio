"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import styles from "./ScrollReveal.module.css";

export type ScrollRevealDirection = "left" | "right" | "fade";

type Props = Readonly<{
  children: ReactNode;
  direction: ScrollRevealDirection;
  /** CSS transition-delay in ms (e.g. 0, 80, 140). */
  delay?: number;
  className?: string;
}>;

const ROOT_MARGIN = "0px 0px -12% 0px";
const THRESHOLD = 0.2;

export function ScrollReveal({ children, direction, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: ROOT_MARGIN, threshold: THRESHOLD },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const directionClass =
    direction === "left"
      ? styles["scroll-reveal--from-left"]
      : direction === "right"
        ? styles["scroll-reveal--from-right"]
        : styles["scroll-reveal--fade"];

  const rootClass = [
    styles["scroll-reveal"],
    directionClass,
    visible ? styles["scroll-reveal--visible"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      className={rootClass}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
