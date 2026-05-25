import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  BRAND_LOGO_SRC,
  INSTAGRAM_URL,
  SITE_NAME,
  buildWhatsAppUrl,
} from "@/lib/site";

import styles from "./Footer.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
}>;

type FooterTextLink = Readonly<{
  href: string;
  label: string;
  external?: boolean;
}>;

function WhatsAppIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FooterTextAnchor({ item }: Readonly<{ item: FooterTextLink }>) {
  if (item.external) {
    return (
      <a
        href={item.href}
        className={styles.textLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.label}
      </a>
    );
  }

  return (
    <a href={item.href} className={styles.textLink}>
      {item.label}
    </a>
  );
}

export function Footer({ locale, dict }: Props) {
  const home = `/${locale}`;
  const whatsAppUrl = buildWhatsAppUrl();

  const navigationLinks: FooterTextLink[] = [
    { href: `${home}#services`, label: dict.footer.links.services },
    { href: `${home}#work`, label: dict.footer.links.work },
    { href: `${home}#process`, label: dict.footer.links.process },
    { href: `${home}#approach`, label: dict.footer.links.approach },
    { href: `${home}#testimonials`, label: dict.footer.links.testimonials },
    { href: `${home}#impact`, label: dict.footer.links.impact },
    { href: `${home}#collaborations`, label: dict.footer.links.collaborations },
    { href: `${home}#faq`, label: dict.footer.links.faq },
  ];

  const legalLinks: FooterTextLink[] = [
    { href: `/${locale}/impressum`, label: dict.footer.links.impressum },
    { href: `/${locale}/datenschutz`, label: dict.footer.links.datenschutz },
  ];

  return (
    <footer className={`${styles.footer} section-flow section-flow--terminus`}>
      <div className={`container-base ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href={home} className={styles.logoLink} aria-label={dict.nav.wordmark}>
              <Image
                src={BRAND_LOGO_SRC}
                alt=""
                width={196}
                height={52}
                className={styles.logo}
                unoptimized
              />
            </Link>
            <p className={styles.tagline}>{dict.footer.tagline}</p>
          </div>

          <div className={styles.column}>
            <h2 className={styles.columnTitle}>{dict.footer.columns.navigation}</h2>
            <ul className={styles.linkList}>
              {navigationLinks.map((item) => (
                <li key={item.href}>
                  <FooterTextAnchor item={item} />
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h2 className={styles.columnTitle}>{dict.footer.columns.contact}</h2>
            <ul className={styles.linkList}>
              <li>
                <FooterTextAnchor
                  item={{ href: `${home}#contact`, label: dict.footer.links.contact }}
                />
              </li>
            </ul>
            <ul className={styles.socialList} aria-label={dict.footer.columns.contact}>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={dict.footer.instagramLabel}
                >
                  <Instagram className={styles.socialIcon} strokeWidth={1.65} aria-hidden="true" />
                </a>
              </li>
              {whatsAppUrl ? (
                <li>
                  <a
                    href={whatsAppUrl}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={dict.contact.info.whatsAppLabel}
                  >
                    <WhatsAppIcon className={styles.socialIcon} />
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div className={styles.column}>
            <h2 className={styles.columnTitle}>{dict.footer.columns.legal}</h2>
            <ul className={styles.linkList}>
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <FooterTextAnchor item={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{dict.footer.copyright}</p>
          <p className={styles.siteName}>{SITE_NAME}</p>
        </div>
      </div>
    </footer>
  );
}
