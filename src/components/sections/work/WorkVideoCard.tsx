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
  previewSrc: string;
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
  previewSrc,
  alt,
  videoAriaLabel,
  isLightboxOpen,
  onOpen,
}: WorkVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canHoverPreview, setCanHoverPreview] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPreviewReady, setIsPreviewReady] = useState(false);

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

  const shouldLoadPreview = canHoverPreview && isHovering && !isLightboxOpen;

  const markPreviewReady = useCallback(() => {
    setIsPreviewReady(true);
  }, []);

  const activatePreview = useCallback(() => {
    if (!canHoverPreview || isLightboxOpen) return;
    setIsHovering(true);
    setIsPreviewReady(false);
  }, [canHoverPreview, isLightboxOpen]);

  const deactivatePreview = useCallback(() => {
    setIsHovering(false);
    setIsPreviewReady(false);
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }, []);

  useEffect(() => {
    if (!shouldLoadPreview) return;
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => {});
  }, [shouldLoadPreview, previewSrc]);

  const posterClassName = [
    styles["work-video-card__poster-layer"],
    isPreviewReady && shouldLoadPreview ? styles["work-video-card__poster-layer--hidden"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const videoClassName = [
    styles["work-video-card__video-preview"],
    isPreviewReady ? styles["work-video-card__video-preview--visible"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={styles["work-video-card"]} data-work-reveal-card>
      <button
        type="button"
        className={styles["work-video-card__media-trigger"]}
        aria-label={`Open video: ${videoAriaLabel}`}
        onClick={onOpen}
        onMouseEnter={activatePreview}
        onMouseLeave={deactivatePreview}
        onFocus={activatePreview}
        onBlur={deactivatePreview}
      >
        <div className={styles["work-video-card__media"]}>
          <Image
            className={posterClassName}
            src={posterSrc}
            alt={alt}
            fill
            sizes="(max-width: 768px) 92vw, (max-width: 980px) 45vw, 30vw"
            loading="lazy"
          />
          {shouldLoadPreview ? (
            <video
              ref={videoRef}
              key={previewSrc}
              className={videoClassName}
              src={previewSrc}
              muted
              loop
              autoPlay
              playsInline
              preload="none"
              aria-label={videoAriaLabel}
              onLoadedData={markPreviewReady}
              onCanPlay={markPreviewReady}
              onPlaying={markPreviewReady}
            />
          ) : null}
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
