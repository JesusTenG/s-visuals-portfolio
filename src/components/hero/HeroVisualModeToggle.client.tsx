"use client";

import { Film, ImageIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import type { Dictionary } from "@/i18n/dictionaries";

import { useHeroVisualModeOptional } from "./HeroVisualModeProvider.client";

import styles from "./HeroVisualModeToggle.module.css";

type Props = Readonly<{
  dict: Dictionary;
}>;

function isHomePath(pathname: string): boolean {
  return /^\/(en|de)\/?$/.test(pathname);
}

export function HeroVisualModeToggle({ dict }: Props) {
  const pathname = usePathname();
  const context = useHeroVisualModeOptional();

  if (!context || !isHomePath(pathname)) return null;

  const { mode, toggleMode } = context;
  const showsVideoPanels = mode === "image";
  const label = showsVideoPanels
    ? dict.nav.heroImageToggle
    : dict.nav.heroVideoPreviewToggle;

  return (
    <button
      type="button"
      className={styles["hero-mode-toggle"]}
      onClick={toggleMode}
      aria-pressed={showsVideoPanels}
      aria-label={label}
      title={label}
    >
      {showsVideoPanels ? (
        <ImageIcon className={styles["hero-mode-toggle-icon"]} aria-hidden="true" />
      ) : (
        <Film className={styles["hero-mode-toggle-icon"]} aria-hidden="true" />
      )}
    </button>
  );
}
