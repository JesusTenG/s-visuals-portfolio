"use client";

import { useMemo, useState, useSyncExternalStore } from "react";

import type { WorkVideoItem } from "@/i18n/dictionaries";

import { VideoLightbox, type VideoLightboxItem } from "./VideoLightbox.client";
import { WorkVideoCard } from "./WorkVideoCard";
import styles from "./WorkSection.module.css";

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
    src: item.videoSrc,
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

  const renderCard = (item: WorkVideoItem) => (
    <WorkVideoCard
      key={`${item.videoSrc}-${item.title}`}
      title={item.title}
      type={item.type}
      description={item.description}
      tags={item.tags}
      posterSrc={item.posterSrc}
      videoSrc={item.videoSrc}
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
        <button
          type="button"
          className={styles["work-section__toggle-more"]}
          aria-expanded={isExpanded}
          aria-controls={isExpanded ? "work-section-expanded-grid" : undefined}
          onClick={() => setIsExpanded((open) => !open)}
        >
          {isExpanded ? showLessWork : viewMoreWork}
        </button>
      </div>

      {activeVideo ? (
        <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
      ) : null}
    </>
  );
}
