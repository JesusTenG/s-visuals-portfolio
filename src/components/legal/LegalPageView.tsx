import Link from "next/link";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { SectionHeader } from "@/components/sections/SectionHeader";

import styles from "./LegalPageView.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
  page: "impressum" | "datenschutz";
}>;

export function LegalPageView({ locale, dict, page }: Props) {
  const content = dict.legal[page];
  const home = `/${locale}`;
  const backLabel = locale === "de" ? "Zur Startseite" : "Back to home";

  return (
    <article className={styles.legal}>
      <p className={styles.back}>
        <Link href={home}>← {backLabel}</Link>
      </p>

      <div className={styles.panel}>
        <SectionHeader
          title={content.title}
          align="start"
          headingLevel="h1"
          className={styles.header}
        />

        {content.sections.map((section) => (
          <section key={section.heading} className={styles.block}>
            <h2 className={styles.heading}>{section.heading}</h2>
            <p className={styles.body}>{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
