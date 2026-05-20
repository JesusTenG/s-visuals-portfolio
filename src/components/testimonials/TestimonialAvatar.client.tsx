"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./TestimonialCard.module.css";

type Props = Readonly<{
  avatarSrc?: string;
  initials: string;
}>;

export function TestimonialAvatar({ avatarSrc, initials }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(avatarSrc) && !imageFailed;

  if (!showImage) {
    return (
      <span className={styles["testimonial-card__avatar-fallback"]} aria-hidden="true">
        {initials}
      </span>
    );
  }

  return (
    <span className={styles["testimonial-card__avatar"]}>
      <Image
        src={avatarSrc!}
        alt=""
        width={46}
        height={46}
        sizes="46px"
        className={styles["testimonial-card__avatar-img"]}
        onError={() => setImageFailed(true)}
      />
    </span>
  );
}
