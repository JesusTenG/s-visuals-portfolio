"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type TransitionEvent as ReactTransitionEvent,
} from "react";

import {
  isHeroPanelVideoActive,
  shouldDeferHeroVideoPlayback,
  HERO_MOBILE_LAYOUT_MAX_WIDTH_PX,
} from "./heroPerformance";
import {
  assertNoAdjacentDuplicates,
  buildInitialPanelClipIds,
  getHeroClipById,
  HERO_PANEL_CENTER_INDEX,
  HERO_PANEL_ROTATE_INTERVAL_MS,
  HERO_ROTATION_ENABLED,
  HERO_VIDEO_CROSSFADE_MS,
  HERO_PANEL_PLAYBACK_OFFSET_S,
  HERO_VIDEO_PLAYBACK_RATE,
  pickAllowedClipIdForPanel,
} from "./heroVideos";

import styles from "./HeroVideoPanels.module.css";

const HERO_IN_VIEW_RATIO = 0.12;

function encodePublicAssetSrc(src: string): string {
  return src.replace(/ /g, "%20");
}

function applyPlaybackRate(video: HTMLVideoElement): void {
  video.defaultPlaybackRate = HERO_VIDEO_PLAYBACK_RATE;
  video.playbackRate = HERO_VIDEO_PLAYBACK_RATE;
}

function applyPanelTimeOffset(video: HTMLVideoElement, panelIndex: number): void {
  const offset = HERO_PANEL_PLAYBACK_OFFSET_S[panelIndex] ?? 0;
  if (!Number.isFinite(video.duration) || video.duration <= 0) return;

  const target = offset % video.duration;
  if (Math.abs(video.currentTime - target) > 0.12) {
    try {
      video.currentTime = target;
    } catch {
      /* ignore seek errors before buffer ready */
    }
  }
}

type PanelLayer = "a" | "b";

type PanelSlotState = {
  clipId: string;
  visibleLayer: PanelLayer;
  layerClips: Record<PanelLayer, string>;
  pendingLayer: PanelLayer | null;
  pendingClipId: string | null;
};

function createInitialPanelStates(): PanelSlotState[] {
  const initialIds = buildInitialPanelClipIds();
  assertNoAdjacentDuplicates(initialIds, "initial assignment");

  return initialIds.map((clipId) => ({
    clipId,
    visibleLayer: "a" as PanelLayer,
    layerClips: { a: clipId, b: clipId },
    pendingLayer: null,
    pendingClipId: null,
  }));
}

type HeroPanelProps = Readonly<{
  panelIndex: number;
  slot: PanelSlotState;
  useVideo: boolean;
  allowPlayback: boolean;
  hasClip: boolean;
  mobileLite: boolean;
  onIncomingCanPlay: (panelIndex: number) => void;
  onCrossfadeComplete: (panelIndex: number) => void;
  onVideoError: (clipId: string) => void;
}>;

function HeroPanel({
  panelIndex,
  slot,
  useVideo,
  allowPlayback,
  hasClip,
  mobileLite,
  onIncomingCanPlay,
  onCrossfadeComplete,
  onVideoError,
}: HeroPanelProps) {
  const isActiveMobilePanel = isHeroPanelVideoActive(panelIndex, mobileLite);
  const showSecondLayer = !mobileLite || slot.pendingClipId !== null;
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  const applyVideo = useCallback(
    (video: HTMLVideoElement | null, layerClipId: string, shouldPlay: boolean) => {
      if (!video || !useVideo || !layerClipId || !isActiveMobilePanel) {
        if (video) video.pause();
        return;
      }
      const layerClip = getHeroClipById(layerClipId);
      if (!layerClip) return;

      applyPlaybackRate(video);

      const encoded = encodePublicAssetSrc(layerClip.src);
      if (video.dataset.src !== encoded) {
        video.dataset.src = encoded;
        video.src = encoded;
        video.load();
      }

      if (shouldPlay && allowPlayback) {
        applyPanelTimeOffset(video, panelIndex);
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    },
    [allowPlayback, isActiveMobilePanel, panelIndex, useVideo],
  );

  const handleLoadedMetadata = useCallback(
    (video: HTMLVideoElement | null) => {
      if (!video) return;
      applyPlaybackRate(video);
      applyPanelTimeOffset(video, panelIndex);
    },
    [panelIndex],
  );

  useEffect(() => {
    if (!useVideo || !hasClip) return;

    const playA =
      slot.visibleLayer === "a" ||
      (slot.pendingLayer === "a" && slot.pendingClipId !== null);
    const playB =
      slot.visibleLayer === "b" ||
      (slot.pendingLayer === "b" && slot.pendingClipId !== null);

    applyVideo(videoARef.current, slot.layerClips.a, playA);
    if (showSecondLayer) {
      applyVideo(videoBRef.current, slot.layerClips.b, playB);
    } else if (videoBRef.current) {
      videoBRef.current.pause();
      videoBRef.current.removeAttribute("src");
    }
  }, [applyVideo, hasClip, showSecondLayer, slot, useVideo]);

  const layerAVisible = slot.visibleLayer === "a";
  const layerBVisible = slot.visibleLayer === "b";
  const showVideos = useVideo && hasClip && isActiveMobilePanel;
  const panelPreload =
    isActiveMobilePanel && allowPlayback ? "metadata" : "none";

  const handleCanPlay = (layer: PanelLayer) => {
    if (slot.pendingLayer === layer) onIncomingCanPlay(panelIndex);
  };

  const handleFadeEnd = (layer: PanelLayer) => (event: ReactTransitionEvent<HTMLVideoElement>) => {
    if (event.propertyName !== "opacity") return;
    if (slot.pendingLayer !== layer) return;
    onCrossfadeComplete(panelIndex);
  };

  const handleError = (clipId: string) => () => {
    onVideoError(clipId);
  };

  return (
    <div
      className={styles["hero-panel"]}
      style={
        {
          ["--hero-panel-ring" as string]: Math.abs(
            panelIndex - HERO_PANEL_CENTER_INDEX,
          ),
        } as CSSProperties
      }
    >
      <div
        className={[
          styles["hero-panel-media"],
          showVideos ? "" : styles["hero-panel-media--idle"],
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {showVideos ? (
          <>
            <video
              ref={videoARef}
              className={[
                styles["hero-panel-video"],
                layerAVisible ? styles["hero-panel-video--visible"] : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ transitionDuration: `${HERO_VIDEO_CROSSFADE_MS}ms` }}
              muted
              playsInline
              loop
              autoPlay
              preload={panelPreload}
              aria-hidden="true"
              onLoadedMetadata={() => handleLoadedMetadata(videoARef.current)}
              onCanPlay={() => handleCanPlay("a")}
              onTransitionEnd={handleFadeEnd("a")}
              onError={handleError(slot.layerClips.a)}
            />
            {showSecondLayer ? (
              <video
                ref={videoBRef}
                className={[
                  styles["hero-panel-video"],
                  layerBVisible ? styles["hero-panel-video--visible"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ transitionDuration: `${HERO_VIDEO_CROSSFADE_MS}ms` }}
                muted
                playsInline
                loop
                autoPlay
                preload="none"
                aria-hidden="true"
                onLoadedMetadata={() => handleLoadedMetadata(videoBRef.current)}
                onCanPlay={() => handleCanPlay("b")}
                onTransitionEnd={handleFadeEnd("b")}
                onError={handleError(slot.layerClips.b)}
              />
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}

export function HeroVideoPanels() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [slots, setSlots] = useState<PanelSlotState[]>(createInitialPanelStates);
  const [useVideo, setUseVideo] = useState(false);
  const [mobileLite, setMobileLite] = useState(false);
  const [allowPlayback, setAllowPlayback] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [failedClipIds, setFailedClipIds] = useState<ReadonlySet<string>>(() => new Set());

  const fadeStartedRef = useRef<Record<number, boolean>>({});
  const failedClipIdsRef = useRef(failedClipIds);

  useEffect(() => {
    failedClipIdsRef.current = failedClipIds;
  }, [failedClipIds]);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobileLayout = window.matchMedia(
      `(max-width: ${HERO_MOBILE_LAYOUT_MAX_WIDTH_PX}px)`,
    );

    const sync = () => {
      const reducedMotion = mqReduce.matches;
      const saveDataOrSlow = shouldDeferHeroVideoPlayback();
      setMobileLite(mqMobileLayout.matches);
      setUseVideo(!reducedMotion && !saveDataOrSlow);
    };

    sync();
    mqReduce.addEventListener("change", sync);
    mqMobileLayout.addEventListener("change", sync);

    const connection = (
      navigator as Navigator & {
        connection?: {
          addEventListener?: (type: string, listener: () => void) => void;
          removeEventListener?: (type: string, listener: () => void) => void;
        };
      }
    ).connection;
    connection?.addEventListener?.("change", sync);

    return () => {
      mqReduce.removeEventListener("change", sync);
      mqMobileLayout.removeEventListener("change", sync);
      connection?.removeEventListener?.("change", sync);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(
          Boolean(entry?.isIntersecting && entry.intersectionRatio >= HERO_IN_VIEW_RATIO),
        );
      },
      { threshold: [0, HERO_IN_VIEW_RATIO, 0.35, 0.6] },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncVisibility = () => {
      setAllowPlayback(isInView && !document.hidden && useVideo);
    };

    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, [isInView, useVideo]);

  const handleVideoError = useCallback((clipId: string) => {
    setFailedClipIds((prev) => {
      if (prev.has(clipId)) return prev;
      const next = new Set(prev);
      next.add(clipId);
      return next;
    });
  }, []);

  const startRotation = useCallback(
    (panelIndex: number) => {
      if (!useVideo || !HERO_ROTATION_ENABLED) return;

      setSlots((prev) => {
        const slot = prev[panelIndex];
        if (!slot || slot.pendingClipId) return prev;

        const clipIds = prev.map((s) => s.clipId);
        const nextClipId = pickAllowedClipIdForPanel(
          panelIndex,
          clipIds,
          failedClipIdsRef.current,
        );
        if (!nextClipId) return prev;

        const tentativeIds = [...clipIds];
        tentativeIds[panelIndex] = nextClipId;

        assertNoAdjacentDuplicates(tentativeIds, `pre-rotate panel ${panelIndex}`);

        fadeStartedRef.current[panelIndex] = false;
        const pendingLayer: PanelLayer = slot.visibleLayer === "a" ? "b" : "a";

        const next = [...prev];
        next[panelIndex] = {
          ...slot,
          pendingLayer,
          pendingClipId: nextClipId,
          layerClips: {
            ...slot.layerClips,
            [pendingLayer]: nextClipId,
          },
        };
        return next;
      });
    },
    [useVideo],
  );

  const revealIncoming = useCallback((panelIndex: number) => {
    if (fadeStartedRef.current[panelIndex]) return;

    setSlots((prev) => {
      const slot = prev[panelIndex];
      if (!slot?.pendingLayer || !slot.pendingClipId) return prev;

      const tentativeIds = prev.map((s, i) =>
        i === panelIndex ? slot.pendingClipId! : s.clipId,
      );
      assertNoAdjacentDuplicates(tentativeIds, `reveal panel ${panelIndex}`);

      fadeStartedRef.current[panelIndex] = true;

      const next = [...prev];
      next[panelIndex] = {
        ...slot,
        visibleLayer: slot.pendingLayer,
      };
      return next;
    });
  }, []);

  const completeRotation = useCallback((panelIndex: number) => {
    setSlots((prev) => {
      const slot = prev[panelIndex];
      if (!slot?.pendingClipId) return prev;

      const next = [...prev];
      next[panelIndex] = {
        ...slot,
        clipId: slot.pendingClipId,
        pendingClipId: null,
        pendingLayer: null,
      };

      assertNoAdjacentDuplicates(
        next.map((s) => s.clipId),
        `complete panel ${panelIndex}`,
      );

      return next;
    });
    fadeStartedRef.current[panelIndex] = false;
  }, []);

  useEffect(() => {
    if (!useVideo || !allowPlayback || !HERO_ROTATION_ENABLED || mobileLite) return;

    const intervalIds = HERO_PANEL_ROTATE_INTERVAL_MS.map((period, panelIndex) =>
      window.setInterval(() => startRotation(panelIndex), period),
    );

    return () => {
      for (const id of intervalIds) window.clearInterval(id);
    };
  }, [allowPlayback, mobileLite, startRotation, useVideo]);

  return (
    <div ref={rootRef} className={styles["hero-panels"]} aria-hidden="true">
      {slots.map((slot, panelIndex) => {
        const hasClip = Boolean(slot.clipId && getHeroClipById(slot.clipId) && !failedClipIds.has(slot.clipId));

        return (
          <HeroPanel
            key={panelIndex}
            panelIndex={panelIndex}
            slot={slot}
            useVideo={useVideo}
            allowPlayback={allowPlayback}
            hasClip={hasClip}
            mobileLite={mobileLite}
            onIncomingCanPlay={revealIncoming}
            onCrossfadeComplete={completeRotation}
            onVideoError={handleVideoError}
          />
        );
      })}
    </div>
  );
}
