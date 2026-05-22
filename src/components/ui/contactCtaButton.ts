import contactCtaStyles from "./contactCtaButton.module.css";

/** Shared Kontakt CTA classes for Hero (Navbar uses primary + local .cta sizing). */
export const contactCtaClassNames = {
  primary: contactCtaStyles["contact-cta-primary"],
  secondary: contactCtaStyles["contact-cta-secondary"],
  prominent: contactCtaStyles["contact-cta-prominent"],
} as const;
