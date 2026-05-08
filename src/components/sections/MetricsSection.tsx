import type { Dictionary } from "@/i18n/dictionaries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import styles from "./MetricsSection.module.css";

type Props = Readonly<{
  dict: Dictionary;
}>;

export function MetricsSection({ dict }: Props) {
  return (
    <section className={styles.section}>
      <div className="container-base">
        <h2 className="section-title">{dict.metrics.title}</h2>
        <div className={styles.grid}>
          {dict.metrics.items.map((item) => (
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

