"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

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
  isLightboxOpen: boolean;
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
  isLightboxOpen,
  onOpen,
}: WorkVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canHoverPreview, setCanHoverPreview] = useState(false);

  useEffect(() => {
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setCanHoverPreview(hoverMq.matches && !reducedMq.matches);
    };
    sync();
    hoverMq.addEventListener("change", sync);
    reducedMq.addEventListener("change", sync);
    return () => {
      hoverMq.removeEventListener("change", sync);
      reducedMq.removeEventListener("change", sync);
    };
  }, []);

  const stopPreview = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }, []);

  useEffect(() => {
    if (!canHoverPreview) return;
    if (isLightboxOpen) stopPreview();
  }, [canHoverPreview, isLightboxOpen, stopPreview]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canHoverPreview) return;

    const syncPausedFrame = () => {
      video.pause();
      video.currentTime = 0;
    };

    video.addEventListener("loadeddata", syncPausedFrame);
    if (video.readyState >= 2) syncPausedFrame();

    return () => {
      video.removeEventListener("loadeddata", syncPausedFrame);
    };
  }, [canHoverPreview, videoSrc]);

  const onMediaEnter = () => {
    if (!canHoverPreview || isLightboxOpen) return;
    void videoRef.current?.play().catch(() => {});
  };

  const onMediaLeave = () => {
    stopPreview();
  };

  return (
    <article className={styles["work-video-card"]} data-work-reveal-card>
      <button
        type="button"
        className={styles["work-video-card__media-trigger"]}
        aria-label={`Open video: ${videoAriaLabel}`}
        onClick={onOpen}
        onMouseEnter={onMediaEnter}
        onMouseLeave={onMediaLeave}
      >
        <div className={styles["work-video-card__media"]}>
          {canHoverPreview ? (
            <video
              ref={videoRef}
              key={videoSrc}
              className={styles["work-video-card__video-preview"]}
              src={videoSrc}
              poster={posterSrc}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          ) : (
            <Image
              className={styles["work-video-card__poster-layer"]}
              src={posterSrc}
              alt={alt}
              fill
              sizes="(max-width: 768px) 92vw, (max-width: 980px) 45vw, 30vw"
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
