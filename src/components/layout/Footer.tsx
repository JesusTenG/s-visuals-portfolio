import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { INSTAGRAM_URL } from "@/lib/site";

import styles from "./Footer.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
}>;

export function Footer({ locale, dict }: Props) {
  const home = `/${locale}`;

  return (
    <footer className={styles.footer}>
      <div className={`container-base ${styles.inner}`}>
        <div className={styles.top}>
          <p className={styles.copy}>{dict.footer.copyright}</p>
          <a
            href={INSTAGRAM_URL}
            className={styles.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.footer.instagramLabel}
          </a>
        </div>
        <nav className={styles.links} aria-label="Footer">
          <a href={`${home}#services`}>{dict.footer.links.services}</a>
          <a href={`${home}#work`}>{dict.footer.links.work}</a>
          <a href={`${home}#approach`}>{dict.footer.links.approach}</a>
          <a href={`${home}#process`}>{dict.footer.links.process}</a>
          <a href={`${home}#faq`}>{dict.footer.links.faq}</a>
          <a href={`${home}#contact`}>{dict.footer.links.contact}</a>
          <a href={`/${locale}/impressum`}>{dict.footer.links.impressum}</a>
          <a href={`/${locale}/datenschutz`}>{dict.footer.links.datenschutz}</a>
        </nav>
      </div>
    </footer>
  );
}
