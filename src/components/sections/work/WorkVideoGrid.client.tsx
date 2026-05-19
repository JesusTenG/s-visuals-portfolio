"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

import type { WorkVideoItem } from "@/i18n/dictionaries";

import { VideoLightbox, type VideoLightboxItem } from "./VideoLightbox.client";
import { preloadPreviewVideos } from "./preloadPreviewVideos";
import SVisualsButton from "@/components/ui/SVisualsButton";

import { WorkVideoCard } from "./WorkVideoCard";
import styles from "./WorkSection.module.css";

const INITIAL_PRELOAD_COUNT = 3;

const MOBILE_MAX_PX = 768;
const MORE_COUNT_DESKTOP = 9;
const MORE_COUNT_MOBILE = 6;

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

  useEffect(() => {
    const initialSrcs = featuredItems
      .slice(0, INITIAL_PRELOAD_COUNT)
      .map((item) => item.previewSrc)
      .filter((src) => !preloadedSrcsRef.current.has(src));
    if (initialSrcs.length === 0) return;
    for (const src of initialSrcs) preloadedSrcsRef.current.add(src);
    return preloadPreviewVideos(initialSrcs, { delay: 400, concurrency: 1 });
  }, [featuredItems]);

  useEffect(() => {
    if (!isExpanded) return;
    const moreSrcs = visibleMoreItems
      .map((item) => item.previewSrc)
      .filter((src) => !preloadedSrcsRef.current.has(src));
    if (moreSrcs.length === 0) return;
    for (const src of moreSrcs) preloadedSrcsRef.current.add(src);
    return preloadPreviewVideos(moreSrcs, { delay: 150, concurrency: 1 });
  }, [isExpanded, visibleMoreItems]);

  const renderCard = (item: WorkVideoItem) => (
    <WorkVideoCard
      key={`${item.previewSrc}-${item.title}`}
      title={item.title}
      type={item.type}
      description={item.description}
      tags={item.tags}
      posterSrc={item.posterSrc}
      previewSrc={item.previewSrc}
      alt={item.alt}
      videoAriaLabel={item.videoAriaLabel}
      isLightboxOpen={isLightboxOpen}
      onOpen={() => setActiveVideo(toLightboxItem(item))}
    />
  );

  return (
    <>
      <div className={styles["work-section__grid"]}>{featuredItems.map(renderCard)}</div>

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
