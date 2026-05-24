/**
 * Per-section center-line offsets for SectionIntro (tablet + desktop).
 * Positive → center line moves right (more space on the left).
 * Negative → center line moves left (more space on the right).
 * Split-axis and shifts apply from 980px; below that, CSS resets shifts to 0.
 */
export const sectionIntroTuning = {
  services: {
    centerShift: "0.75rem",
    centerShiftDesktop: "8rem",
  },
  work: {
    centerShift: "-0.5rem",
    centerShiftDesktop: "-7rem",
  },
  testimonials: {
    centerShift: "0.5rem",
    centerShiftDesktop: "0.75rem",
  },
  approach: {
    centerShift: "-0.5rem",
    centerShiftDesktop: "-13rem",
  },
  process: {
    centerShift: "0.5rem",
    centerShiftDesktop: "1rem",
  },
  clientStories: {
    centerShift: "0.5rem",
    centerShiftDesktop: "13rem",
  },
  faq: {
    centerShift: "-0.25rem",
    centerShiftDesktop: "10.5rem",
  },
  contact: {
    centerShift: "0px",
    centerShiftDesktop: "0px",
  },
} as const;
