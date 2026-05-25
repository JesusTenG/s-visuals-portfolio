import {
  Camera,
  Megaphone,
  MonitorPlay,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import { SectionIntro } from "@/components/section-intro/SectionIntro";
import { sectionIntroTuning } from "@/components/section-intro/sectionIntroTuning";
import type { Dictionary } from "@/i18n/dictionaries";

import editorialLayout from "./editorialLayout.module.css";
import shellStyles from "./SectionShell.module.css";
import styles from "./ServicesSection.module.css";

type Props = Readonly<{
  dict: Dictionary;
}>;

type ServiceIconId = Dictionary["services"]["items"][number]["icon"];

const SERVICE_ICONS: Record<ServiceIconId, LucideIcon> = {
  smartphone: Smartphone,
  "monitor-play": MonitorPlay,
  megaphone: Megaphone,
  camera: Camera,
};

export function ServicesSection({ dict }: Props) {
  const { services } = dict;

  return (
    <section
      id="services"
      className={`${shellStyles.shell} section-flow section-flow--aurora ${styles["services-section"]}`}
      aria-labelledby="services-section-title"
    >
      <div className={styles["services-section__bleed"]} aria-hidden="true">
        <div className={styles["services-section__glow"]} />
      </div>

      <div
        className={`${shellStyles.shell__inner} ${editorialLayout["editorial-section-inner"]}`}
      >
        <SectionIntro
          eyebrow={services.eyebrow}
          title={services.title}
          subtitle={services.intro}
          headlineSide="left"
          titleId="services-section-title"
          {...sectionIntroTuning.services}
        />

        <div className={styles["services-section__grid"]}>
          {services.items.map((item) => {
            const Icon = SERVICE_ICONS[item.icon];

            return (
              <article key={item.title} className={styles["services-section__card"]}>
                <div className={styles["services-section__icon-wrap"]} aria-hidden="true">
                  <Icon className={styles["services-section__icon"]} />
                </div>
                <h3 className={styles["services-section__card-title"]}>{item.title}</h3>
                <p className={styles["services-section__card-text"]}>{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
