"use client";

import { useEffect, useState } from "react";

import { SECTION_INTRO_STACK_MEDIA } from "./sectionIntroReveal";

function readStackLayout(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(SECTION_INTRO_STACK_MEDIA).matches;
}

/** True when SectionIntro uses single-column stack (below desktop split at 980px). */
export function useSectionIntroStackLayout(): boolean {
  const [isStackLayout, setIsStackLayout] = useState(readStackLayout);

  useEffect(() => {
    const mq = window.matchMedia(SECTION_INTRO_STACK_MEDIA);
    const onChange = () => setIsStackLayout(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isStackLayout;
}
