"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./WorkVideoCard.module.css";

export type WorkVideoCardProps = Readonly<{
  title: string;
  type: string;
  description: string;
  tags: string[];
  posterSrc: string;
  videoSrc: string;
  alt: string;
  videoAriaLabel: string;
  preload?: "none" | "metadata";
  isPreviewPaused: boolean;
  onOpen: () => void;
}>;

export function WorkVideoCard({
  title,
  type,
  description,
  tags,
  posterSrc,
  videoSrc,
  alt,
  videoAriaLabel,
  preload = "none",
  isPreviewPaused,
  onOpen,
}: WorkVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    if (isPreviewPaused) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
          return;
        }
        video.pause();
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [prefersReducedMotion, videoSrc, isPreviewPaused]);

  return (
    <article className={styles["work-video-card"]}>
      <button
        type="button"
        className={styles["work-video-card__media-trigger"]}
        aria-label={`Open video: ${videoAriaLabel}`}
        onClick={onOpen}
      >
        <div className={styles["work-video-card__media"]}>
          {prefersReducedMotion ? (
            <Image
              className={styles["work-video-card__poster"]}
              src={posterSrc}
              alt={alt}
              fill
              sizes="(max-width: 768px) 92vw, (max-width: 980px) 45vw, 30vw"
            />
          ) : (
            <video
              ref={videoRef}
              className={styles["work-video-card__video"]}
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload={preload}
              aria-hidden="true"
            />
          )}
          <span className={styles["work-video-card__play"]} aria-hidden="true">
            Play
          </span>
        </div>
      </button>

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
