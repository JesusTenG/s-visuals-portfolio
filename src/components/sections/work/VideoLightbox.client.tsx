"use client";

import { useCallback, useEffect, useRef } from "react";

import { VideoLightboxPlayer } from "./VideoLightboxPlayer.client";
import styles from "./VideoLightbox.module.css";

export type VideoLightboxItem = Readonly<{
  lightboxSrc: string;
  label: string;
  poster?: string;
}>;

type Props = Readonly<{
  video: VideoLightboxItem;
  onClose: () => void;
}>;

export function VideoLightbox({ video, onClose }: Props) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleClose]);

  return (
    <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={video.label}>
      <button
        type="button"
        className={styles.lightbox__backdrop}
        aria-label="Close video"
        onClick={handleClose}
      />

      <div className={styles.lightbox__panel}>
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.lightbox__close}
          aria-label="Close video"
          onClick={handleClose}
        >
          <span aria-hidden="true">×</span>
        </button>

        <VideoLightboxPlayer
          key={video.lightboxSrc}
          lightboxSrc={video.lightboxSrc}
          label={video.label}
          poster={video.poster}
        />
      </div>
    </div>
  );
}
