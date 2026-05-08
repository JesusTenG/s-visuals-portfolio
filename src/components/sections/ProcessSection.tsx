import type { Dictionary } from "@/i18n/dictionaries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import styles from "./ProcessSection.module.css";

type Props = Readonly<{
  dict: Dictionary;
}>;

export function ProcessSection({ dict }: Props) {
  return (
    <section id="process" className={styles.section}>
      <div className="container-base">
        <h2 className="section-title">{dict.process.title}</h2>
        <div className={styles.grid}>
          {dict.process.steps.map((step, idx) => (
            <Card key={step.title} className="glass-card">
              <CardHeader className="flex-row items-start justify-between gap-3">
                <CardTitle className="leading-snug">{step.title}</CardTitle>
                <span className={styles["step-number"]}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

