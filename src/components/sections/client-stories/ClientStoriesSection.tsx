import Link from "next/link";
import Image from "next/image";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

import styles from "./ClientStoriesSection.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
}>;

export function ClientStoriesSection({ locale, dict }: Props) {
  const { clientStories } = dict;

  return (
    <section
      id="collaborations"
      className={styles["client-stories-section"]}
      aria-labelledby="client-stories-title"
    >
      <div className={`container-base ${styles["client-stories-section__inner"]}`}>
        <header className={styles["client-stories-section__header"]}>
          <p className={styles["client-stories-section__eyebrow"]}>{clientStories.eyebrow}</p>
          <h2 id="client-stories-title" className={styles["client-stories-section__title"]}>
            {clientStories.title}
          </h2>
          <p className={styles["client-stories-section__intro"]}>{clientStories.intro}</p>
        </header>

        <div className={styles["client-stories-section__grid"]}>
          {clientStories.items.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className={styles["client-stories-card"]}
            >
              <div className={styles["client-stories-card__media"]}>
                <Image
                  className={styles["client-stories-card__image"]}
                  src={item.imageSrc}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, (max-width: 980px) 45vw, 30vw"
                />
              </div>
              <div className={styles["client-stories-card__body"]}>
                <p className={styles["client-stories-card__label"]}>{item.label}</p>
                <h3 className={styles["client-stories-card__title"]}>{item.title}</h3>
                <p className={styles["client-stories-card__description"]}>{item.description}</p>
                <span className={styles["client-stories-card__cta"]}>
                  {clientStories.viewCase}
                  <span className={styles["client-stories-card__arrow"]} aria-hidden="true">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
