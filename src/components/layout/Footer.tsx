import type { Dictionary } from "@/i18n/dictionaries";

import styles from "./Footer.module.css";

type Props = Readonly<{
  dict: Dictionary;
}>;

export function Footer({ dict }: Props) {
  return (
    <footer className={styles.footer}>
      <div className="container-base">
        <div className={styles.inner}>
          <div className={styles.row}>
            <div className={styles.copy}>{dict.footer.copyright}</div>
            <nav className={styles.links}>
              <a href="#work">
                {dict.footer.links.work}
              </a>
              <a href="#services">
                {dict.footer.links.services}
              </a>
              <a href="#process">
                {dict.footer.links.process}
              </a>
              <a href="#contact">
                {dict.footer.links.contact}
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

