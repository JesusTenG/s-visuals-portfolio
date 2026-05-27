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
  getHeroPanelVideoStaggerMs,
  isCoarsePointerDevice,
  isHeroPanelVideoActive,
  prefersReducedMotion,
  scheduleAfterIdle,
  shouldDeferHeroVideoPlayback,
  HERO_MOBILE_LAYOUT_MAX_WIDTH_PX,
  HERO_MOBILE_VISIBLE_PANEL_INDICES,
  HERO_VIDEO_IDLE_DELAY_MOBILE_MS,
  HERO_VIDEO_IDLE_DELAY_MS,
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

import shellStyles from "./HeroPanelsShell.module.css";
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

function getVisiblePanelOrder(mobileLayout: boolean): readonly number[] {
  return mobileLayout ? HERO_MOBILE_VISIBLE_PANEL_INDICES : [0, 1, 2, 3, 4];
}

function setPanelGradientHidden(panelIndex: number, hidden: boolean) {
  const fill = document.querySelector<HTMLElement>(`[data-hero-gradient="${panelIndex}"]`);
  if (!fill) return;
  if (hidden) {
    fill.setAttribute("data-gradient-hidden", "true");
  } else {
    fill.removeAttribute("data-gradient-hidden");
  }
}

type HeroPanelProps = Readonly<{
  panelIndex: number;
  slot: PanelSlotState;
  isVideoCapable: boolean;
  panelVideoSrcAllowed: boolean;
  allowPlayback: boolean;
  hasClip: boolean;
  mobileLayout: boolean;
  onIncomingCanPlay: (panelIndex: number) => void;
  onCrossfadeComplete: (panelIndex: number) => void;
  onVideoError: (clipId: string) => void;
}>;

function HeroPanel({
  panelIndex,
  slot,
  isVideoCapable,
  panelVideoSrcAllowed,
  allowPlayback,
  hasClip,
  mobileLayout,
  onIncomingCanPlay,
  onCrossfadeComplete,
  onVideoError,
}: HeroPanelProps) {
  const showSecondLayer = !mobileLayout || slot.pendingClipId !== null;
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const applyVideo = useCallback(
    (video: HTMLVideoElement | null, layerClipId: string, shouldPlay: boolean) => {
      if (!video || !isVideoCapable || !panelVideoSrcAllowed || !layerClipId) {
        if (video) {
          video.pause();
          video.removeAttribute("src");
          video.removeAttribute("data-loaded-src");
        }
        return;
      }

      const layerClip = getHeroClipById(layerClipId);
      if (!layerClip) return;

      applyPlaybackRate(video);

      const encoded = encodePublicAssetSrc(layerClip.src);
      if (video.dataset.loadedSrc !== encoded) {
        video.dataset.loadedSrc = encoded;
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
    [allowPlayback, isVideoCapable, panelIndex, panelVideoSrcAllowed],
  );

  const handleLoadedMetadata = useCallback(
    (video: HTMLVideoElement | null) => {
      if (!video) return;
      applyPlaybackRate(video);
      applyPanelTimeOffset(video, panelIndex);
    },
    [panelIndex],
  );

  const markVideoReady = useCallback(() => {
    setVideoReady(true);
    setPanelGradientHidden(panelIndex, true);
  }, [panelIndex]);

  useEffect(() => {
    if (!videoReady) {
      setPanelGradientHidden(panelIndex, false);
    }
  }, [panelIndex, videoReady]);

  useEffect(() => {
    if (!isVideoCapable || !hasClip || !panelVideoSrcAllowed) {
      if (videoARef.current) {
        videoARef.current.pause();
        videoARef.current.removeAttribute("src");
        videoARef.current.removeAttribute("data-loaded-src");
      }
      if (videoBRef.current) {
        videoBRef.current.pause();
        videoBRef.current.removeAttribute("src");
        videoBRef.current.removeAttribute("data-loaded-src");
      }
      return;
    }

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
      videoBRef.current.removeAttribute("data-loaded-src");
    }
  }, [applyVideo, hasClip, isVideoCapable, panelVideoSrcAllowed, showSecondLayer, slot]);

  const layerAVisible = slot.visibleLayer === "a";
  const layerBVisible = slot.visibleLayer === "b";
  const showVideos = isVideoCapable && hasClip && panelVideoSrcAllowed;

  const handleCanPlay = (layer: PanelLayer) => {
    const isVisible =
      slot.visibleLayer === layer ||
      (slot.pendingLayer === layer && slot.pendingClipId !== null);
    if (isVisible) markVideoReady();
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
      className={shellStyles["hero-panel"]}
      style={
        {
          ["--hero-panel-ring" as string]: Math.abs(
            panelIndex - HERO_PANEL_CENTER_INDEX,
          ),
        } as CSSProperties
      }
    >
      <div className={shellStyles["hero-panel-media"]}>
        {showVideos ? (
          <>
            <video
              ref={videoARef}
              className={[
                styles["hero-panel-video"],
                layerAVisible && videoReady ? styles["hero-panel-video--visible"] : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ transitionDuration: `${HERO_VIDEO_CROSSFADE_MS}ms` }}
              muted
              playsInline
              loop
              preload="none"
              aria-hidden="true"
              onLoadedMetadata={() => handleLoadedMetadata(videoARef.current)}
              onLoadedData={() => {
                if (layerAVisible) markVideoReady();
              }}
              onCanPlay={() => handleCanPlay("a")}
              onTransitionEnd={handleFadeEnd("a")}
              onError={handleError(slot.layerClips.a)}
            />
            {showSecondLayer ? (
              <video
                ref={videoBRef}
                className={[
                  styles["hero-panel-video"],
                  layerBVisible && videoReady ? styles["hero-panel-video--visible"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ transitionDuration: `${HERO_VIDEO_CROSSFADE_MS}ms` }}
                muted
                playsInline
                loop
                preload="none"
                aria-hidden="true"
                onLoadedMetadata={() => handleLoadedMetadata(videoBRef.current)}
                onLoadedData={() => {
                  if (layerBVisible) markVideoReady();
                }}
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

function readAllowVideoEnhancement(): boolean {
  if (typeof window === "undefined") return true;

  const reduced = prefersReducedMotion();
  let saveData = false;
  try {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    saveData = Boolean(connection?.saveData);
  } catch {
    saveData = false;
  }

  return !reduced && !saveData;
}

export function HeroVideoPanels() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [allowVideoEnhancement] = useState(readAllowVideoEnhancement);
  const [slots, setSlots] = useState<PanelSlotState[]>(createInitialPanelStates);
  const [mobileLayout, setMobileLayout] = useState(false);
  const [idleVideoReady, setIdleVideoReady] = useState(false);
  const [unlockedPanels, setUnlockedPanels] = useState<ReadonlySet<number>>(() => new Set());
  const [isInView, setIsInView] = useState(false);
  const [allowPlayback, setAllowPlayback] = useState(false);
  const [failedClipIds, setFailedClipIds] = useState<ReadonlySet<string>>(() => new Set());

  const fadeStartedRef = useRef<Record<number, boolean>>({});
  const failedClipIdsRef = useRef(failedClipIds);

  useEffect(() => {
    failedClipIdsRef.current = failedClipIds;
  }, [failedClipIds]);

  useEffect(() => {
    const mqMobileLayout = window.matchMedia(
      `(max-width: ${HERO_MOBILE_LAYOUT_MAX_WIDTH_PX}px)`,
    );

    const sync = () => {
      setMobileLayout(mqMobileLayout.matches);
    };

    sync();
    mqMobileLayout.addEventListener("change", sync);
    return () => mqMobileLayout.removeEventListener("change", sync);
  }, []);

  const canScheduleVideo = allowVideoEnhancement;

  useEffect(() => {
    if (!canScheduleVideo) return;

    const delayMs = isCoarsePointerDevice()
      ? HERO_VIDEO_IDLE_DELAY_MOBILE_MS
      : HERO_VIDEO_IDLE_DELAY_MS;

    return scheduleAfterIdle(() => {
      if (!shouldDeferHeroVideoPlayback()) {
        setIdleVideoReady(true);
      }
    }, delayMs);
  }, [canScheduleVideo]);

  const globalVideoGateOpen =
    canScheduleVideo && idleVideoReady && !shouldDeferHeroVideoPlayback();

  useEffect(() => {
    if (!globalVideoGateOpen) return;

    let cancelled = false;
    const order = getVisiblePanelOrder(mobileLayout);
    const timeoutIds: number[] = [
      window.setTimeout(() => {
        if (!cancelled) setUnlockedPanels(new Set());
      }, 0),
    ];

    for (const [orderIndex, panelIndex] of order.entries()) {
      timeoutIds.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setUnlockedPanels((prev) => {
            const next = new Set(prev);
            next.add(panelIndex);
            return next;
          });
        }, getHeroPanelVideoStaggerMs(orderIndex)),
      );
    }

    return () => {
      cancelled = true;
      for (const id of timeoutIds) window.clearTimeout(id);
    };
  }, [globalVideoGateOpen, mobileLayout]);

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
      setAllowPlayback(
        globalVideoGateOpen && isInView && !document.hidden && allowVideoEnhancement,
      );
    };

    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, [allowVideoEnhancement, globalVideoGateOpen, isInView]);

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
      if (!globalVideoGateOpen || !HERO_ROTATION_ENABLED) return;
      if (!unlockedPanels.has(panelIndex)) return;

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
    [globalVideoGateOpen, unlockedPanels],
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
    if (!globalVideoGateOpen || !allowPlayback || !HERO_ROTATION_ENABLED || mobileLayout) {
      return;
    }

    const intervalIds = HERO_PANEL_ROTATE_INTERVAL_MS.map((period, panelIndex) =>
      window.setInterval(() => startRotation(panelIndex), period),
    );

    return () => {
      for (const id of intervalIds) window.clearInterval(id);
    };
  }, [allowPlayback, globalVideoGateOpen, mobileLayout, startRotation]);

  return (
    <div
      ref={rootRef}
      className={`${shellStyles["hero-panels"]} ${shellStyles["hero-panels--videos"]}`}
      aria-hidden="true"
    >
      {slots.map((slot, panelIndex) => {
        const hasClip = Boolean(
          slot.clipId && getHeroClipById(slot.clipId) && !failedClipIds.has(slot.clipId),
        );
        const isVideoCapable = isHeroPanelVideoActive(panelIndex, mobileLayout);
        const panelVideoSrcAllowed =
          globalVideoGateOpen && unlockedPanels.has(panelIndex);

        return (
          <HeroPanel
            key={`${panelIndex}-${panelVideoSrcAllowed ? "on" : "off"}`}
            panelIndex={panelIndex}
            slot={slot}
            isVideoCapable={isVideoCapable}
            panelVideoSrcAllowed={panelVideoSrcAllowed}
            allowPlayback={allowPlayback}
            hasClip={hasClip}
            mobileLayout={mobileLayout}
            onIncomingCanPlay={revealIncoming}
            onCrossfadeComplete={completeRotation}
            onVideoError={handleVideoError}
          />
        );
      })}
    </div>
  );
}
