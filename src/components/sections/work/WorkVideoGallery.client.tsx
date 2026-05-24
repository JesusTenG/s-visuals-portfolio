"use client";

import { useEffect, useRef, useState } from "react";

import type { WorkVideoItem } from "@/i18n/dictionaries";

import { VideoLightbox, type VideoLightboxItem } from "./VideoLightbox.client";
import { preloadPreviewVideos } from "./preloadPreviewVideos";
import { WorkVideoCard } from "./WorkVideoCard";
import styles from "./WorkSection.module.css";

const INITIAL_PRELOAD_COUNT = 3;

type Props = Readonly<{
  items: WorkVideoItem[];
  gridClassName?: string;
}>;

function toLightboxItem(item: WorkVideoItem): VideoLightboxItem {
  return {
    lightboxSrc: item.lightboxSrc,
    label: item.videoAriaLabel,
    poster: item.posterSrc,
  };
}

export function WorkVideoGallery({ items, gridClassName }: Props) {
  const [activeVideo, setActiveVideo] = useState<VideoLightboxItem | null>(null);
  const isLightboxOpen = activeVideo !== null;
  const preloadedSrcsRef = useRef(new Set<string>());

  useEffect(() => {
    const initialSrcs = items
      .slice(0, INITIAL_PRELOAD_COUNT)
      .map((item) => item.previewSrc)
      .filter((src) => !preloadedSrcsRef.current.has(src));
    if (initialSrcs.length === 0) return;
    for (const src of initialSrcs) preloadedSrcsRef.current.add(src);
    return preloadPreviewVideos(initialSrcs, { delay: 400, concurrency: 1 });
  }, [items]);

  if (items.length === 0) return null;

  const gridClass = gridClassName ?? styles["work-section__grid"];

  return (
    <>
      <div className={gridClass}>
        {items.map((item) => (
          <div key={item.previewSrc} className={styles["work-section__card-wrap"]}>
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
        ))}
      </div>

      {activeVideo ? (
        <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
      ) : null}
    </>
  );
}
