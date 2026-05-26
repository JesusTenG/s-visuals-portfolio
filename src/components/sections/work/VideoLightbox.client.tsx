"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

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
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    // Mobile-Browser-Sperre: Nicht nur `body`, sondern auch `html` sperren.
    // Zusätzlich `touchmove` blocken (v. a. iOS), damit das Hintergrund-Scrolling nicht weiterläuft.
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const preventTouchMove = (event: TouchEvent) => {
      if (!event.cancelable) return;
      event.preventDefault();
    };

    if (isTouchDevice) {
      document.addEventListener("touchmove", preventTouchMove, { passive: false });
    }

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      if (isTouchDevice) {
        document.removeEventListener("touchmove", preventTouchMove);
      }
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleClose]);

  const lightbox = (
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
          <X className={styles["lightbox__close-icon"]} aria-hidden="true" strokeWidth={2} />
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

  // Client-only guard: avoids `document` access during SSR/prerender.
  if (typeof document === "undefined") return null;

  return createPortal(lightbox, document.body);
}
