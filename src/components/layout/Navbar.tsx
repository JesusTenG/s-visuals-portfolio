"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { otherLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import SVisualsButton from "@/components/ui/SVisualsButton";

import { MobileNavMenu } from "./MobileNavMenu.client";
import styles from "./Navbar.module.css";

const MOBILE_NAV_PANEL_ID = "mobile-navigation-panel";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
}>;

export function Navbar({ locale, dict }: Props) {
  const switchTo = otherLocale(locale);
  const switchLabel =
    switchTo === "en" ? "Switch language to English" : "Sprache auf Deutsch wechseln";
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const home = `/${locale}`;

  const toggleMenu = () => {
    setMobileOpen((open) => !open);
  };

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleWordmarkClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.stopPropagation();

      const isOnHome = pathname === home || pathname === `${home}/`;

      if (isOnHome) {
        event.preventDefault();
        setMobileOpen(false);
        if (window.location.hash) {
          window.history.replaceState(null, "", home);
        }
        scrollToTop();
      }
    },
    [home, pathname, scrollToTop],
  );

  const mobileNavItems = useMemo(
    () =>
      [
        { num: "01", href: `${home}#work`, label: dict.nav.links.work },
        { num: "02", href: `${home}#services`, label: dict.nav.links.services },
        { num: "03", href: `${home}#about`, label: dict.nav.links.about },
        { num: "04", href: `${home}#contact`, label: dict.nav.links.contact },
      ] as const,
    [home, dict.nav.links],
  );

  const langToggle = (
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
  );

  return (
    <header
      className={styles["site-nav"]}
      data-menu-open={mobileOpen ? "true" : "false"}
    >
      <nav className={styles["site-nav-inner"]} aria-label="Main navigation">
        <div className={styles["nav-inner"]}>
          <button
            type="button"
            className={styles["navbar-mobile-bar-trigger"]}
            tabIndex={-1}
            aria-hidden="true"
            onClick={toggleMenu}
          />
          <Link
            href={home}
            className={styles.wordmark}
            aria-label={dict.nav.wordmark}
            onClick={handleWordmarkClick}
          >
            <span className={styles["nav-logo-main"]}>{dict.nav.logoTop}</span>
            <span className={styles["nav-logo-sub"]}>{dict.nav.logoBottom}</span>
          </Link>

          <nav className={`${styles["nav-links"]} ${styles["navbar-desktop-links"]}`} aria-label="Primary">
            <a href={`${home}#work`}>{dict.nav.links.work}</a>
            <a href={`${home}#services`}>{dict.nav.links.services}</a>
            <a href={`${home}#about`}>{dict.nav.links.about}</a>
            <a href={`${home}#contact`}>{dict.nav.links.contact}</a>
          </nav>

          <div className={styles.actions}>
            <SVisualsButton
              href={`${home}#contact`}
              showIcon={false}
              className={`${styles.cta} ${styles["cta-button"]}`}
            >
              {dict.nav.cta}
            </SVisualsButton>
            {langToggle}
          </div>

          <div className={styles["navbar-mobile-actions"]}>
            <button
              type="button"
              className={styles["navbar-mobile-menu-toggle"]}
              data-open={mobileOpen ? "true" : "false"}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls={MOBILE_NAV_PANEL_ID}
              onClick={toggleMenu}
            >
              <span className={styles["navbar-mobile-menu-icon-bars"]} aria-hidden="true">
                <span className={styles["navbar-mobile-menu-bar"]} />
                <span className={styles["navbar-mobile-menu-bar"]} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <MobileNavMenu
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        locale={locale}
        home={home}
        dict={dict}
        items={mobileNavItems}
        panelId={MOBILE_NAV_PANEL_ID}
        langToggle={langToggle}
      />
    </header>
  );
}
