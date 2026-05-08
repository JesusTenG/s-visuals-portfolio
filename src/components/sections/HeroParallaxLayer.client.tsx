"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = Readonly<{
  children: ReactNode;
  className?: string;
}>;

/**
 * Scroll-Parallax nur per translate3d (kein Layout, kein blur).
 * prefers-reduced-motion, document.hidden und Sichtbarkeit werden respektiert.
 */
export function HeroParallaxLayer({ children, className }: Props) {
  const layerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = mq.matches;

    const syncReduced = () => {
      reduced = mq.matches;
      layer.style.transform = "";
    };

    mq.addEventListener("change", syncReduced);

    let inView = true;
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries.some((e) => e.isIntersecting && e.intersectionRatio > 0);
        if (!inView) layer.style.transform = "";
      },
      { threshold: [0, 0.02, 0.15] },
    );
    io.observe(layer);

    const update = () => {
      rafRef.current = null;
      if (reduced || document.hidden || !inView) {
        layer.style.transform = "";
        return;
      }

      const rect = layer.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -64 || rect.top > vh + 64) {
        layer.style.transform = "";
        return;
      }

      const ty = Math.max(-52, Math.min(52, -rect.top * 0.095));
      layer.style.transform = `translate3d(0, ${ty.toFixed(2)}px, 0)`;
    };

    const onScrollOrVisibility = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        update();
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", onScrollOrVisibility, { passive: true });
    document.addEventListener("visibilitychange", onScrollOrVisibility);
    update();

    return () => {
      mq.removeEventListener("change", syncReduced);
      io.disconnect();
      window.removeEventListener("scroll", onScrollOrVisibility);
      document.removeEventListener("visibilitychange", onScrollOrVisibility);
      layer.style.transform = "";
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={layerRef} className={className}>
      {children}
    </div>
  );
}
