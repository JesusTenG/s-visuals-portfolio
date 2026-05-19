import type { CSSProperties } from "react";

/** Shared intro sequence: panels → hero content → navbar → scroll. */
export const introTiming = {
  panelStagger: 0.18,
  panelDuration: 1.25,
  contentDelay: 1.15,
  contentStagger: 0.12,
  contentDuration: 0.62,
  navbarDelay: 2.05,
  navbarDuration: 0.62,
  scrollDelay: 2.65,
  scrollDuration: 0.62,
  scrollLoopDuration: 1.8,
  easeOut: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

export type IntroTiming = typeof introTiming;

export function introCssVariables(
  timing: IntroTiming = introTiming,
): Record<string, string> {
  return {
    "--intro-ease-out": timing.easeOut,
    "--intro-panel-stagger": `${timing.panelStagger}s`,
    "--intro-panel-duration": `${timing.panelDuration}s`,
    "--intro-content-delay": `${timing.contentDelay}s`,
    "--intro-content-stagger": `${timing.contentStagger}s`,
    "--intro-content-duration": `${timing.contentDuration}s`,
    "--intro-navbar-delay": `${timing.navbarDelay}s`,
    "--intro-navbar-duration": `${timing.navbarDuration}s`,
    "--intro-scroll-delay": `${timing.scrollDelay}s`,
    "--intro-scroll-duration": `${timing.scrollDuration}s`,
    "--intro-scroll-loop-duration": `${timing.scrollLoopDuration}s`,
    "--intro-scroll-loop-delay": `${timing.scrollDelay + timing.scrollDuration}s`,
  };
}

export function introCssProperties(
  timing: IntroTiming = introTiming,
): CSSProperties {
  return introCssVariables(timing) as CSSProperties;
}
