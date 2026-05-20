import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getSectionTestimonials } from "@/content/testimonials";

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
      className={styles["testimonial-section"]}
      aria-labelledby="testimonials-title"
    >
      <div className={`container-base ${styles["testimonial-section__inner"]}`}>
        <h2 id="testimonials-title" className={styles["testimonial-section__title"]}>
          {dict.testimonials.title}
        </h2>

        <div className={styles["testimonial-section__cards-wrap"]}>
          <ul className={styles["testimonial-section__grid"]}>
            {items.map((item) => (
              <li key={item.id} className={styles["testimonial-section__item"]}>
                <TestimonialCard testimonial={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
