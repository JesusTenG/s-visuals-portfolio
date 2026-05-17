"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import styles from "./VideoLightbox.module.css";

const INITIAL_VOLUME = 0.05;

export type VideoLightboxPlayerProps = Readonly<{
  lightboxSrc: string;
  label: string;
  poster?: string;
}>;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function encodePublicAssetSrc(src: string): string {
  return src.replace(/ /g, "%20");
}

export function VideoLightboxPlayer({ lightboxSrc, label, poster }: VideoLightboxPlayerProps) {
  const encodedLightboxSrc = encodePublicAssetSrc(lightboxSrc);
  const encodedPoster = poster ? encodePublicAssetSrc(poster) : undefined;
  const videoRef = useRef<HTMLVideoElement>(null);
  const volumeBeforeMuteRef = useRef(INITIAL_VOLUME);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(INITIAL_VOLUME);
  const [isMuted, setIsMuted] = useState(false);

  const applyVolume = useCallback((video: HTMLVideoElement, nextVolume: number) => {
    const clamped = Math.min(1, Math.max(0, nextVolume));
    video.volume = clamped;
    video.muted = clamped === 0;
    setVolume(clamped);
    setIsMuted(clamped === 0);
    if (clamped > 0) volumeBeforeMuteRef.current = clamped;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = INITIAL_VOLUME;
    video.muted = false;
    volumeBeforeMuteRef.current = INITIAL_VOLUME;
    setVolume(INITIAL_VOLUME);
    setIsMuted(false);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    const syncDuration = () => {
      if (Number.isFinite(video.duration)) setDuration(video.duration);
    };

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("loadedmetadata", syncDuration);
    video.addEventListener("durationchange", syncDuration);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    if (video.readyState >= 1) syncDuration();

    return () => {
      video.pause();
      video.removeEventListener("loadedmetadata", syncDuration);
      video.removeEventListener("durationchange", syncDuration);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [encodedLightboxSrc]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => setIsPlaying(false));
    else video.pause();
  };

  const handleSeek = (value: number) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(duration)) return;
    video.currentTime = value;
    setCurrentTime(value);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted || volume === 0) {
      applyVolume(video, volumeBeforeMuteRef.current || INITIAL_VOLUME);
      return;
    }

    volumeBeforeMuteRef.current = volume;
    applyVolume(video, 0);
  };

  const handleVolumeChange = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    applyVolume(video, value);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercent = (isMuted ? 0 : volume) * 100;

  return (
    <div className={styles["lightbox-player"]}>
      <div className={styles["lightbox-player__stage"]}>
        <video
          ref={videoRef}
          className={styles["lightbox__video"]}
          src={encodedLightboxSrc}
          playsInline
          preload="metadata"
          disablePictureInPicture
          {...(encodedPoster ? { poster: encodedPoster } : {})}
          aria-label={label}
          onClick={togglePlay}
        />

        <div
          className={styles["lightbox-player__controls"]}
          aria-label="Video player controls"
          onClick={(event) => event.stopPropagation()}
        >
          <input
            type="range"
            className={`${styles["lightbox-player__range"]} ${styles["lightbox-player__timeline"]}`}
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(currentTime, duration || 0)}
            onChange={(event) => handleSeek(Number(event.target.value))}
            onInput={(event) => handleSeek(Number(event.currentTarget.value))}
            aria-label="Seek video timeline"
            aria-valuemin={0}
            aria-valuemax={duration || 0}
            aria-valuenow={currentTime}
            disabled={!duration}
            style={{ "--range-progress": `${progressPercent}%` } as CSSProperties}
          />

          <div className={styles["lightbox-player__toolbar"]}>
            <button
              type="button"
              className={styles["lightbox-player__btn"]}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <Pause className={styles["lightbox-player__icon"]} aria-hidden="true" />
              ) : (
                <Play className={styles["lightbox-player__icon"]} aria-hidden="true" />
              )}
            </button>

            <span className={styles["lightbox-player__time"]} aria-live="off">
              <span className={styles["lightbox-player__time-current"]}>
                {formatTime(currentTime)}
              </span>
              <span className={styles["lightbox-player__time-sep"]} aria-hidden="true">
                /
              </span>
              <span className={styles["lightbox-player__time-total"]}>{formatTime(duration)}</span>
            </span>

            <div className={styles["lightbox-player__volume"]}>
              <button
                type="button"
                className={styles["lightbox-player__btn"]}
                onClick={toggleMute}
                aria-label={isMuted || volume === 0 ? "Unmute video" : "Mute video"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className={styles["lightbox-player__icon"]} aria-hidden="true" />
                ) : (
                  <Volume2 className={styles["lightbox-player__icon"]} aria-hidden="true" />
                )}
              </button>
              <input
                type="range"
                className={`${styles["lightbox-player__range"]} ${styles["lightbox-player__volume-range"]}`}
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(event) => handleVolumeChange(Number(event.target.value))}
                aria-label="Change volume"
                style={{ "--range-progress": `${volumePercent}%` } as CSSProperties}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
