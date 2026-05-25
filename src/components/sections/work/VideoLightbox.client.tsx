"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const [portalReady, setPortalReady] = useState(false);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useLayoutEffect(() => {
    setPortalReady(true);
  }, []);

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

  if (!portalReady) return null;

  return createPortal(lightbox, document.body);
}
