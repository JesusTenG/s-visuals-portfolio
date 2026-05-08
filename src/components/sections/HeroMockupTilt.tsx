"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

type Props = Readonly<{
  className?: string;
  children: ReactNode;
}>;

export function HeroMockupTilt({ className, children }: Props) {
  const rafRef = useRef<number | null>(null);

  const setVars = (el: HTMLDivElement, rotateX: number, rotateY: number) => {
    el.style.setProperty("--mockup-rotate-x", `${rotateX.toFixed(3)}deg`);
    el.style.setProperty("--mockup-rotate-y", `${rotateY.toFixed(3)}deg`);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = event.currentTarget;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 5;
      const rotateX = -((y - centerY) / centerY) * 5;

      setVars(el, rotateX, rotateY);
    });
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setVars(el, 0, 0);
  };

  return (
    <div className={className} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      {children}
    </div>
  );
}

