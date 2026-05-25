import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getSectionTestimonials } from "@/content/testimonials";
import { SectionIntro } from "@/components/section-intro/SectionIntro";
import { sectionIntroTuning } from "@/components/section-intro/sectionIntroTuning";

import editorialLayout from "@/components/sections/editorialLayout.module.css";
import shellStyles from "@/components/sections/SectionShell.module.css";

import { TestimonialCard } from "./TestimonialCard";
import styles from "./TestimonialSection.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
}>;

export function TestimonialSection({ locale, dict }: Props) {
  const items = getSectionTestimonials(locale);

  if (items.length === 0) return null;

  return (
    <section
      id="testimonials"
      className={`${shellStyles.shell} section-flow section-flow--echo`}
      aria-labelledby="testimonials-title"
    >
      <div className={shellStyles.shell__glow} aria-hidden="true" />
      <div className={`${shellStyles.shell__inner} ${editorialLayout["editorial-section-inner"]} ${styles.inner}`}>
        <SectionIntro
          eyebrow={dict.testimonials.eyebrow}
          title={dict.testimonials.title}
          subtitle={dict.testimonials.intro}
          headlineSide="left"
          titleId="testimonials-title"
          className={styles["testimonials-section-intro"]}
          {...sectionIntroTuning.testimonials}
        />

        <ul
          className={`${styles.grid} ${editorialLayout["editorial-content-width"]}`}
          data-count={items.length <= 1 ? "single" : items.length === 2 ? "duo" : "trio"}
        >
          {items.map((item) => (
            <li key={item.id} className={styles.item}>
              <TestimonialCard testimonial={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
