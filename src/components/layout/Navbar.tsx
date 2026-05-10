"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Menu } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { otherLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import SVisualsButton from "@/components/ui/SVisualsButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import styles from "./Navbar.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
}>;

export function Navbar({ locale, dict }: Props) {
  const switchTo = otherLocale(locale);
  const switchLabel =
    switchTo === "en" ? "Switch language to English" : "Sprache auf Deutsch wechseln";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={styles["site-nav"]}>
      <div className={styles["site-nav-inner"]}>
        <div className={styles["nav-inner"]}>
          <Link
            href={`/${locale}`}
            className={styles.wordmark}
            aria-label={dict.nav.wordmark}
          >
            <span className={styles["nav-logo-main"]}>{dict.nav.logoTop}</span>
            <span className={styles["nav-logo-sub"]}>{dict.nav.logoBottom}</span>
          </Link>

          <nav className={styles["nav-links"]} aria-label="Primary">
            <a href="#work">
              {dict.nav.links.work}
            </a>
            <a href="#services">
              {dict.nav.links.services}
            </a>
            <a href="#about">
              {dict.nav.links.about}
            </a>
            <a href="#contact">
              {dict.nav.links.contact}
            </a>
          </nav>

          <div className={styles.actions}>
            <SVisualsButton href="#contact" showIcon={false} className={`${styles.cta} ${styles["cta-button"]}`}>
              {dict.nav.cta}
            </SVisualsButton>
            <Link
              href={`/${switchTo}`}
              className={styles["lang-toggle"]}
              data-active-locale={locale}
              aria-label={switchLabel}
            >
              <span
                className={styles["lang-toggle-label"]}
                data-active={locale === "de" ? "true" : "false"}
                aria-hidden="true"
              >
                DE
              </span>
              <span className={styles["lang-toggle-pill"]} aria-hidden="true">
                <span className={styles["lang-toggle-knob"]}>
                  <Globe className={styles["lang-toggle-icon"]} aria-hidden="true" focusable="false" />
                </span>
              </span>
              <span
                className={styles["lang-toggle-label"]}
                data-active={locale === "en" ? "true" : "false"}
                aria-hidden="true"
              >
                EN
              </span>
            </Link>
          </div>

          <div className={styles["mobile-actions"]}>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className={styles["mobile-menu-trigger"]}
                  aria-label="Open menu"
                  aria-expanded={mobileOpen}
                  aria-controls="mobile-nav-sheet"
                >
                  <Menu aria-hidden="true" focusable="false" />
                </button>
              </SheetTrigger>
              <SheetContent
                id="mobile-nav-sheet"
                side="right"
                className={styles["mobile-sheet"]}
              >
                <nav className={styles["mobile-sheet-nav"]} aria-label="Mobile navigation">
                  <a href="#work" onClick={() => setMobileOpen(false)}>
                    {dict.nav.links.work}
                  </a>
                  <a href="#services" onClick={() => setMobileOpen(false)}>
                    {dict.nav.links.services}
                  </a>
                  <a href="#about" onClick={() => setMobileOpen(false)}>
                    {dict.nav.links.about}
                  </a>
                  <a href="#contact" onClick={() => setMobileOpen(false)}>
                    {dict.nav.links.contact}
                  </a>
                </nav>

                <div className={styles["mobile-sheet-footer"]}>
                  <SVisualsButton
                    href="#contact"
                    showIcon={false}
                    className={styles["mobile-sheet-cta"]}
                    onClick={() => setMobileOpen(false)}
                  >
                    {dict.nav.cta}
                  </SVisualsButton>

                  <Link
                    href={`/${switchTo}`}
                    className={styles["lang-toggle"]}
                    data-active-locale={locale}
                    aria-label={switchLabel}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span
                      className={styles["lang-toggle-label"]}
                      data-active={locale === "de" ? "true" : "false"}
                      aria-hidden="true"
                    >
                      DE
                    </span>
                    <span className={styles["lang-toggle-pill"]} aria-hidden="true">
                      <span className={styles["lang-toggle-knob"]}>
                        <Globe
                          className={styles["lang-toggle-icon"]}
                          aria-hidden="true"
                          focusable="false"
                        />
                      </span>
                    </span>
                    <span
                      className={styles["lang-toggle-label"]}
                      data-active={locale === "en" ? "true" : "false"}
                      aria-hidden="true"
                    >
                      EN
                    </span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

