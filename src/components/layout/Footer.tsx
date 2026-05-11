import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

import styles from "./Footer.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
}>;

export function Footer({ locale, dict }: Props) {
  const home = `/${locale}`;

  return (
    <footer className={styles.footer}>
      <div className="container-base">
        <div className={styles.inner}>
          <div className={styles.row}>
            <div className={styles.copy}>{dict.footer.copyright}</div>
            <nav className={styles.links}>
              <a href={`${home}#work`}>
                {dict.footer.links.work}
              </a>
              <a href={`${home}#services`}>
                {dict.footer.links.services}
              </a>
              <a href={`${home}#about`}>
                {dict.footer.links.about}
              </a>
              <a href={`${home}#contact`}>
                {dict.footer.links.contact}
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

