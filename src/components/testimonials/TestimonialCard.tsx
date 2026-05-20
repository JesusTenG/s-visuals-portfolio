import { Instagram } from "lucide-react";

import type { Testimonial } from "@/content/testimonials";

import { TestimonialAvatar } from "./TestimonialAvatar.client";
import styles from "./TestimonialCard.module.css";

type Props = Readonly<{
  testimonial: Testimonial;
  className?: string;
}>;

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function getInstagramAriaLabel(authorName: string): string {
  return `Open ${authorName} on Instagram`;
}

export function TestimonialCard({ testimonial, className }: Props) {
  const { quote, authorName, brandName, avatarSrc, instagramUrl, isPlaceholder } = testimonial;

  const rootClass = [
    styles["testimonial-card"],
    isPlaceholder ? styles["testimonial-card--placeholder"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={rootClass}>
      {isPlaceholder ? (
        <span className={styles["testimonial-card__draft-label"]}>
          {testimonial.locale === "de" ? "Platzhalter" : "Placeholder"}
        </span>
      ) : null}
      <blockquote className={styles["testimonial-card__quote"]}>
        <p>{quote}</p>
      </blockquote>

      <figcaption className={styles["testimonial-card__caption"]}>
        <div className={styles["testimonial-card__caption-start"]}>
          <TestimonialAvatar avatarSrc={avatarSrc} initials={getInitials(authorName)} />
          <span className={styles["testimonial-card__identity"]}>
            <cite className={styles["testimonial-card__name"]}>{authorName}</cite>
            {brandName ? (
              <>
                <span className={styles["testimonial-card__identity-sep"]} aria-hidden="true">
                  ·
                </span>
                <span className={styles["testimonial-card__brand"]}>{brandName}</span>
              </>
            ) : null}
          </span>
        </div>

        {instagramUrl ? (
          <a
            href={instagramUrl}
            className={styles["testimonial-card__instagram-link"]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={getInstagramAriaLabel(authorName)}
          >
            <Instagram className={styles["testimonial-card__instagram-icon"]} aria-hidden="true" />
          </a>
        ) : null}
      </figcaption>
    </figure>
  );
}
