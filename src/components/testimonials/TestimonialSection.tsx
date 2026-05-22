import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getSectionTestimonials } from "@/content/testimonials";
import { SectionHeader } from "@/components/sections/SectionHeader";
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
      className={shellStyles.shell}
      aria-labelledby="testimonials-title"
    >
      <div className={shellStyles.shell__glow} aria-hidden="true" />
      <div className={`container-base ${shellStyles.shell__inner} ${styles.inner}`}>
        <SectionHeader
          eyebrow={dict.testimonials.eyebrow}
          title={dict.testimonials.title}
          titleId="testimonials-title"
          align="center"
        />

        <ul
          className={styles.grid}
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
