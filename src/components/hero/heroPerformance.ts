/** Match HeroVideoPanels.module.css — 3-column layout, outer panels hidden. */
export const HERO_MOBILE_LAYOUT_MAX_WIDTH_PX = 560;

/** Visible hero panels on mobile (nth-child 1, 3, 5 — panels 2 and 4 are display:none). */
export const HERO_MOBILE_VISIBLE_PANEL_INDICES: readonly number[] = [0, 2, 4];

export function isHeroPanelVideoActive(
  panelIndex: number,
  mobileLayout: boolean,
): boolean {
  if (!mobileLayout) return true;
  return HERO_MOBILE_VISIBLE_PANEL_INDICES.includes(panelIndex);
}

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

/**
 * Skip hero MP4 decode when the user or connection signals low bandwidth.
 * Falls back to idle panel gradient (no extra network).
 */
export function shouldDeferHeroVideoPlayback(): boolean {
  if (typeof navigator === "undefined") return false;

  const connection = (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
  if (!connection) return false;

  if (connection.saveData) return true;

  const effectiveType = connection.effectiveType ?? "";
  return effectiveType === "slow-2g" || effectiveType === "2g";
}
