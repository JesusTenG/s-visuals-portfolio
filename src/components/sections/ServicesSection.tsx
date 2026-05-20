import {
  Clapperboard,
  Megaphone,
  MonitorPlay,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import type { Dictionary } from "@/i18n/dictionaries";

import styles from "./ServicesSection.module.css";

type Props = Readonly<{
  dict: Dictionary;
}>;

type ServiceIconId = Dictionary["services"]["items"][number]["icon"];

const SERVICE_ICONS: Record<ServiceIconId, LucideIcon> = {
  smartphone: Smartphone,
  "monitor-play": MonitorPlay,
  megaphone: Megaphone,
  clapperboard: Clapperboard,
};

export function ServicesSection({ dict }: Props) {
  const { services } = dict;

  return (
    <section
      id="services"
      className={styles["services-section"]}
      aria-labelledby="services-section-title"
    >
      <div className={styles["services-section__glow"]} aria-hidden="true" />
      <div className={`container-base ${styles["services-section__inner"]}`}>
        <header className={styles["services-section__header"]}>
          <h2 id="services-section-title" className={styles["services-section__title"]}>
            {services.title}
          </h2>
          <p className={styles["services-section__intro"]}>{services.intro}</p>
        </header>

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
