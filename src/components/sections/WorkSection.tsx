import type { Dictionary } from "@/i18n/dictionaries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import styles from "./WorkSection.module.css";

type Props = Readonly<{
  dict: Dictionary;
}>;

export function WorkSection({ dict }: Props) {
  return (
    <section id="work" className={styles.section}>
      <div className="container-base">
        <h2 className="section-title">{dict.work.title}</h2>
        <div className={styles.grid}>
          {dict.work.items.map((item) => (
            <Card key={item.title} className="glass-card overflow-hidden">
              <div className={styles["work-preview"]} aria-hidden="true" />
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{item.tag}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

