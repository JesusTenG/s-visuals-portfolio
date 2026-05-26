"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

import type { WorkVideoItem } from "@/i18n/dictionaries";

import { VideoLightbox, type VideoLightboxItem } from "./VideoLightbox.client";
import { preloadPreviewVideos } from "./preloadPreviewVideos";
import SVisualsButton from "@/components/ui/SVisualsButton";

import { WorkVideoCard } from "./WorkVideoCard";
import styles from "./WorkSection.module.css";

const INITIAL_PRELOAD_COUNT = 2;

const MOBILE_MAX_PX = 768;
const MORE_COUNT_DESKTOP = 9;
const MORE_COUNT_MOBILE = 6;

type IdleCallbackHandle = number;
type IdleDeadline = { timeRemaining: () => number; didTimeout: boolean };

function requestIdle(cb: () => void, timeoutMs = 1200): IdleCallbackHandle {
  const ric = (window as unknown as { requestIdleCallback?: (fn: (d: IdleDeadline) => void, o?: { timeout: number }) => number })
    .requestIdleCallback;
  if (typeof ric === "function") {
    return ric(() => cb(), { timeout: timeoutMs });
  }
  return window.setTimeout(cb, 350);
}

function cancelIdle(handle: IdleCallbackHandle) {
  const cancelRic = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
  if (typeof cancelRic === "function") cancelRic(handle);
  else window.clearTimeout(handle);
}

function subscribeMobileLayout(onStoreChange: () => void) {
  const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_PX}px)`);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getMobileLayoutSnapshot() {
  return window.matchMedia(`(max-width: ${MOBILE_MAX_PX}px)`).matches;
}

function getServerMobileLayoutSnapshot() {
  return false;
}

type Props = Readonly<{
  featuredItems: WorkVideoItem[];
  moreItems: WorkVideoItem[];
  viewMoreWork: string;
  showLessWork: string;
}>;

function toLightboxItem(item: WorkVideoItem): VideoLightboxItem {
  return {
    lightboxSrc: item.lightboxSrc,
    label: item.videoAriaLabel,
    poster: item.posterSrc,
  };
}

export function WorkVideoGrid({
  featuredItems,
  moreItems,
  viewMoreWork,
  showLessWork,
}: Props) {
  const [activeVideo, setActiveVideo] = useState<VideoLightboxItem | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const isMobileLayout = useSyncExternalStore(
    subscribeMobileLayout,
    getMobileLayoutSnapshot,
    getServerMobileLayoutSnapshot,
  );

  const visibleMoreItems = useMemo(() => {
    const limit = isMobileLayout ? MORE_COUNT_MOBILE : MORE_COUNT_DESKTOP;
    return moreItems.slice(0, limit);
  }, [moreItems, isMobileLayout]);

  const isLightboxOpen = activeVideo !== null;
  const preloadedSrcsRef = useRef(new Set<string>());
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasEnteredViewport) return;
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "120px 0px 120px 0px", threshold: [0, 0.08, 0.2] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasEnteredViewport]);

  useEffect(() => {
    if (!hasEnteredViewport) return;
    if (isMobileLayout) return;
    const initialSrcs = featuredItems
      .slice(0, INITIAL_PRELOAD_COUNT)
      .map((item) => item.previewSrc)
      .filter((src) => !preloadedSrcsRef.current.has(src));
    if (initialSrcs.length === 0) return;
    for (const src of initialSrcs) preloadedSrcsRef.current.add(src);
    let cancelPreload = () => {};
    const idleHandle = requestIdle(() => {
      cancelPreload = preloadPreviewVideos(initialSrcs, { delay: 0, concurrency: 1 });
    }, 1200);

    return () => {
      cancelIdle(idleHandle);
      cancelPreload();
    };
  }, [featuredItems, hasEnteredViewport, isMobileLayout]);

  useEffect(() => {
    if (!isExpanded) return;
    if (!hasEnteredViewport) return;
    if (isMobileLayout) return;
    const moreSrcs = visibleMoreItems
      .map((item) => item.previewSrc)
      .filter((src) => !preloadedSrcsRef.current.has(src));
    if (moreSrcs.length === 0) return;
    for (const src of moreSrcs) preloadedSrcsRef.current.add(src);
    let cancelPreload = () => {};
    const idleHandle = requestIdle(() => {
      cancelPreload = preloadPreviewVideos(moreSrcs, { delay: 0, concurrency: 1 });
    }, 1200);

    return () => {
      cancelIdle(idleHandle);
      cancelPreload();
    };
  }, [isExpanded, visibleMoreItems, hasEnteredViewport, isMobileLayout]);

  const renderCard = (item: WorkVideoItem) => (
    <div
      key={item.previewSrc}
      className={styles["work-section__card-wrap"]}
      data-work-reveal-card
    >
      <WorkVideoCard
        title={item.title}
        description={item.description}
        posterSrc={item.posterSrc}
        previewSrc={item.previewSrc}
        alt={item.alt}
        videoAriaLabel={item.videoAriaLabel}
        isLightboxOpen={isLightboxOpen}
        onOpen={() => setActiveVideo(toLightboxItem(item))}
      />
    </div>
  );

  return (
    <>
      <div ref={gridRef} className={styles["work-section__grid"]}>
        {featuredItems.map(renderCard)}
      </div>

      {isExpanded ? (
        <div
          id="work-section-expanded-grid"
          className={`${styles["work-section__more-reveal"]} ${styles["work-section__more-reveal--stagger"]}`}
          role="region"
          aria-label={viewMoreWork}
        >
          <div className={styles["work-section__more-grid"]}>{visibleMoreItems.map(renderCard)}</div>
        </div>
      ) : null}

      <div className={styles["work-section__toggle-wrap"]}>
        <SVisualsButton
          type="button"
          variant="secondary"
          showIcon={false}
          enableStarBorder={false}
          aria-expanded={isExpanded}
          aria-controls={isExpanded ? "work-section-expanded-grid" : undefined}
          onClick={() => setIsExpanded((open) => !open)}
        >
          {isExpanded ? showLessWork : viewMoreWork}
        </SVisualsButton>
      </div>

      {activeVideo ? (
        <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
      ) : null}
    </>
  );
}
