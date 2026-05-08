import type { Dictionary } from "@/i18n/dictionaries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import styles from "./ServicesSection.module.css";

type Props = Readonly<{
  dict: Dictionary;
}>;

export function ServicesSection({ dict }: Props) {
  return (
    <section id="services" className={styles.section}>
      <div className="container-base">
        <h2 className="section-title">{dict.services.title}</h2>
        <div className={styles.grid}>
          {dict.services.items.map((item) => (
            <Card key={item.title} className="glass-card">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

