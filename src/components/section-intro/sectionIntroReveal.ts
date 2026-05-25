import type { ScrollRevealDirection } from "@/components/animation/ScrollReveal";
import type { SectionIntroHeadlineSide } from "./SectionIntro";

/** Below desktop split axis — single-column editorial stack. */
export const SECTION_INTRO_STACK_MEDIA = "(max-width: 979px)";

export type SectionIntroRevealDirections = Readonly<{
  eyebrow: ScrollRevealDirection;
  headline: ScrollRevealDirection;
  subtitle: ScrollRevealDirection;
}>;

/** Mobile/tablet: normal top-to-bottom flow, no opposing slide directions. */
export function sectionIntroRevealDirectionsStack(): SectionIntroRevealDirections {
  return {
    eyebrow: "fade",
    headline: "fade",
    subtitle: "fade",
  };
}

/**
 * Desktop (≥980px) — slide direction follows column position (not text-align).
 *
 * headlineSide "left"  → headline in left column  → from left
 *                      → subtitle in right column → from right
 *
 * headlineSide "right" → headline in right column → from right
 *                      → subtitle in left column  → from left
 */
export function sectionIntroRevealDirections(
  headlineSide: SectionIntroHeadlineSide,
): SectionIntroRevealDirections {
  if (headlineSide === "left") {
    return {
      eyebrow: "fade",
      headline: "left",
      subtitle: "right",
    };
  }

  return {
    eyebrow: "fade",
    headline: "right",
    subtitle: "left",
  };
}
