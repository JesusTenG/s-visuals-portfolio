import Link from "next/link";
import { Globe } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { otherLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import SVisualsButton from "@/components/ui/SVisualsButton";

import styles from "./Navbar.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
}>;

export function Navbar({ locale, dict }: Props) {
  const switchTo = otherLocale(locale);

  return (
    <header className={styles["site-nav"]}>
      <div className={styles["site-nav-inner"]}>
        <div className="container-base">
          <div className={styles["nav-row"]}>
          <Link
            href={`/${locale}`}
            className={styles.wordmark}
            aria-label={dict.nav.wordmark}
          >
            <span className={styles["navbar-brand-logo"]} aria-hidden="true" />
          </Link>

          <nav className={styles["nav-links"]}>
            <a href="#work">
              {dict.nav.links.work}
            </a>
            <a href="#services">
              {dict.nav.links.services}
            </a>
            <a href="#process">
              {dict.nav.links.process}
            </a>
            <a href="#contact">
              {dict.nav.links.contact}
            </a>
          </nav>

          <div className={styles.actions}>
            <Link
              href={`/${switchTo}`}
              className={styles["lang-switch"]}
              aria-label={`Switch language to ${switchTo}`}
            >
              <Globe className={styles["lang-switch-icon"]} aria-hidden="true" focusable="false" />
              <span className={styles["lang-switch-label"]}>{dict.nav.langSwitchLabel}</span>
            </Link>
            <SVisualsButton href="#contact" className={`${styles.cta} ${styles["cta-button"]}`}>
              {dict.nav.cta}
            </SVisualsButton>
          </div>
        </div>
        </div>
      </div>
    </header>
  );
}

