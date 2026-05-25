"use client";

import type { WorkVideoItem } from "@/i18n/dictionaries";
import { WorkVideoGallery } from "@/components/sections/work/WorkVideoGallery.client";

type Props = Readonly<{
  items: WorkVideoItem[];
  gridClassName: string;
}>;

export function ClientStoryDetailReels({ items, gridClassName }: Props) {
  return <WorkVideoGallery items={items} gridClassName={gridClassName} />;
}
