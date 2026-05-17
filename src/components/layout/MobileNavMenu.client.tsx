"use client";

import { useCallback, useEffect, useRef } from "react";
import { Instagram } from "lucide-react";
import { usePathname } from "next/navigation";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

import styles from "./Navbar.module.css";

type NavItem = Readonly<{
  num: string;
  href: string;
  label: string;
}>;

type Props = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: Locale;
  home: string;
  dict: Dictionary;
  items: readonly NavItem[];
  panelId: string;
}>;

const INSTAGRAM_URL = "https://www.instagram.com/simon__saad/";
const INSTAGRAM_HANDLE = "@simon__saad";

export function MobileNavMenu({
  open,
  onOpenChange,
  locale,
  home,
  dict,
  items,
  panelId,
}: Props) {
  const pathname = usePathname();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const close = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  useEffect(() => {
    onOpenChange(false);
  }, [locale, pathname, onOpenChange]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    firstLinkRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <div
      className={styles["navbar-mobile-overlay"]}
      data-open={open ? "true" : "false"}
      aria-hidden={!open}
      inert={!open}
    >
      <div
        id={panelId}
        className={styles["navbar-mobile-panel"]}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className={styles["navbar-mobile-link-list"]} aria-label="Mobile navigation">
          {items.map((item, index) => (
            <a
              key={item.href}
              ref={index === 0 ? firstLinkRef : undefined}
              href={item.href}
              className={styles["navbar-mobile-link"]}
              style={{ ["--nav-link-delay" as string]: `${70 + index * 50}ms` }}
              onClick={close}
            >
              <span className={styles["navbar-mobile-link-index"]}>{item.num}</span>
              <span className={styles["navbar-mobile-link-label"]}>{item.label}</span>
            </a>
          ))}
        </nav>

        <a
          href={`${home}#contact`}
          className={styles["navbar-mobile-cta"]}
          onClick={close}
        >
          {dict.nav.cta}
        </a>

        <div className={styles["navbar-mobile-footer"]}>
          <a
            href={INSTAGRAM_URL}
            className={styles["navbar-mobile-instagram"]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
            onClick={close}
          >
            <Instagram
              className={styles["navbar-mobile-instagram-icon"]}
              aria-hidden="true"
              focusable="false"
            />
            <span className={styles["navbar-mobile-instagram-label"]}>{INSTAGRAM_HANDLE}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
