"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./WorkVideoCard.module.css";

export type WorkVideoCardProps = Readonly<{
  title: string;
  type: string;
  description: string;
  tags: string[];
  posterSrc: string;
  videoSrc: string;
  alt: string;
}>;

export function WorkVideoCard({
  title,
  type,
  description,
  tags,
  posterSrc,
  videoSrc,
  alt,
}: WorkVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <article className={styles["work-video-card"]}>
      <div className={styles["work-video-card__media"]}>
        {isPlaying ? (
          <video
            className={styles["work-video-card__video"]}
            src={videoSrc}
            poster={posterSrc}
            controls
            playsInline
            preload="metadata"
          />
        ) : (
          <button
            className={styles["work-video-card__poster-button"]}
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`Play video: ${title}`}
          >
            <Image
              className={styles["work-video-card__poster"]}
              src={posterSrc}
              alt={alt}
              fill
              sizes="(max-width: 768px) 92vw, (max-width: 980px) 45vw, 30vw"
            />
            <span className={styles["work-video-card__play"]} aria-hidden="true">
              Play
            </span>
          </button>
        )}
      </div>

      <div className={styles["work-video-card__content"]}>
        <p className={styles["work-video-card__type"]}>{type}</p>
        <h3 className={styles["work-video-card__title"]}>{title}</h3>
        <p className={styles["work-video-card__description"]}>{description}</p>

        <ul className={styles["work-video-card__tags"]} aria-label="Edit focus">
          {tags.map((tag) => (
            <li className={styles["work-video-card__tag"]} key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
