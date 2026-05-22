"use client";

import dynamic from "next/dynamic";

import { HeroImagePanels } from "./HeroImagePanels";
import { useHeroVisualMode } from "./HeroVisualModeProvider.client";

const HeroVideoPanels = dynamic(
  () =>
    import("./HeroVideoPanels.client").then((module) => ({
      default: module.HeroVideoPanels,
    })),
  { ssr: false },
);

export function HeroSectionBackground() {
  const { mode } = useHeroVisualMode();

  /* Modi getauscht: mode "image" → Video-Panels, mode "video" → Bild-Panels */
  if (mode === "image") {
    return <HeroVideoPanels />;
  }

  return <HeroImagePanels />;
}
