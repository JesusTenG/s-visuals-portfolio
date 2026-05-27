import type { CSSProperties } from "react";

/** Shared intro sequence — hero text first; videos are a separate client enhancement. */
export const introTiming = {
  panelStagger: 0.18,
  panelDuration: 1.25,
  contentDelay: 0.28,
  contentStagger: 0.1,
  contentDuration: 0.55,
  navbarDelay: 0.85,
  navbarDuration: 0.55,
  scrollDelay: 1.15,
  scrollDuration: 0.62,
  scrollLoopDuration: 1.8,
  easeOut: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

export type IntroTiming = typeof introTiming;

export type IntroCssOptions = {
  /** Extra delay (seconds) while brand intro plays — panels/content only. */
  brandIntroOffsetSec?: number;
};

export function introCssVariables(
  timing: IntroTiming = introTiming,
  options: IntroCssOptions = {},
): Record<string, string> {
  const brandOffset = options.brandIntroOffsetSec ?? 0;

  return {
    "--intro-ease-out": timing.easeOut,
    "--intro-panel-stagger": `${timing.panelStagger}s`,
    "--intro-panel-duration": `${timing.panelDuration}s`,
    "--intro-panel-animation-delay": `${brandOffset}s`,
    "--intro-content-delay": `${timing.contentDelay + brandOffset}s`,
    "--intro-content-stagger": `${timing.contentStagger}s`,
    "--intro-content-duration": `${timing.contentDuration}s`,
    "--intro-navbar-delay": `${timing.navbarDelay}s`,
    "--intro-navbar-duration": `${timing.navbarDuration}s`,
    "--intro-scroll-delay": `${timing.scrollDelay + brandOffset}s`,
    "--intro-scroll-duration": `${timing.scrollDuration}s`,
    "--intro-scroll-loop-duration": `${timing.scrollLoopDuration}s`,
    "--intro-scroll-loop-delay": `${timing.scrollDelay + timing.scrollDuration}s`,
  };
}

export function introCssProperties(
  timing: IntroTiming = introTiming,
  options: IntroCssOptions = {},
): CSSProperties {
  return introCssVariables(timing, options) as CSSProperties;
}
