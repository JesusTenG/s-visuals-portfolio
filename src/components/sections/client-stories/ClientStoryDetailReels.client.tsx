"use client";

import type { WorkVideoItem } from "@/i18n/dictionaries";
import { WorkVideoGallery } from "@/components/sections/work/WorkVideoGallery.client";

import styles from "./ClientStoryDetailView.module.css";

type Props = Readonly<{
  items: WorkVideoItem[];
}>;

export function ClientStoryDetailReels({ items }: Props) {
  return (
    <WorkVideoGallery
      items={items}
      gridClassName={styles["client-story-detail__reels-grid"]}
    />
  );
}
