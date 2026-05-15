"use client";

import { useState } from "react";

import type { WorkVideoItem } from "@/i18n/dictionaries";

import { VideoLightbox, type VideoLightboxItem } from "./VideoLightbox.client";
import { WorkVideoCard } from "./WorkVideoCard";
import styles from "./WorkSection.module.css";

type Props = Readonly<{
  items: WorkVideoItem[];
}>;

function toLightboxItem(item: WorkVideoItem): VideoLightboxItem {
  return {
    src: item.videoSrc,
    label: item.videoAriaLabel,
  };
}

export function WorkVideoGrid({ items }: Props) {
  const [activeVideo, setActiveVideo] = useState<VideoLightboxItem | null>(null);
  const isModalOpen = activeVideo !== null;

  return (
    <>
      <div className={styles["work-section__grid"]}>
        {items.map((item) => (
          <WorkVideoCard
            key={item.title}
            title={item.title}
            type={item.type}
            description={item.description}
            tags={item.tags}
            posterSrc={item.posterSrc}
            videoSrc={item.videoSrc}
            alt={item.alt}
            videoAriaLabel={item.videoAriaLabel}
            preload="none"
            isPreviewPaused={isModalOpen}
            onOpen={() => setActiveVideo(toLightboxItem(item))}
          />
        ))}
      </div>

      {activeVideo ? (
        <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
      ) : null}
    </>
  );
}
