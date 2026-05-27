import type { CSSProperties } from "react";

import { HERO_PANEL_CENTER_INDEX, HERO_PANEL_COUNT } from "./heroPerformance";

import shellStyles from "./HeroPanelsShell.module.css";
import styles from "./HeroGradientPanels.module.css";

/** Server-rendered panel placeholders — CSS gradients only until video enhancement. */
export function HeroGradientPanels() {
  return (
    <div
      className={`hero-gradient-shell ${shellStyles["hero-panels"]} ${shellStyles["hero-panels--base"]}`}
      aria-hidden="true"
    >
      {Array.from({ length: HERO_PANEL_COUNT }, (_, panelIndex) => (
        <div
          key={panelIndex}
          className={shellStyles["hero-panel"]}
          style={
            {
              ["--hero-panel-ring" as string]: Math.abs(
                panelIndex - HERO_PANEL_CENTER_INDEX,
              ),
            } as CSSProperties
          }
        >
          <div className={shellStyles["hero-panel-media"]}>
            <div
              className={styles["hero-panel-fill"]}
              data-hero-gradient={panelIndex}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
