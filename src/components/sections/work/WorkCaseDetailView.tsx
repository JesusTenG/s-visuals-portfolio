import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WorkCase } from "@/data/work-cases";
import SVisualsButton from "@/components/ui/SVisualsButton";

import { CaseContentDropCard } from "./CaseContentDropCard";
import styles from "./WorkCaseDetailView.module.css";

type Props = Readonly<{
  locale: Locale;
  dict: Dictionary;
  workCase: WorkCase;
}>;

export function WorkCaseDetailView({ locale, dict, workCase }: Props) {
  const homeWorkHash = `/${locale}#work`;
  const contactHref = `/${locale}${dict.caseDetail.ctaHref}`;

  return (
    <article className={styles["work-case-detail"]}>
      <p className={styles["work-case-detail__back-wrap"]}>
        <Link href={homeWorkHash} className={styles["work-case-detail__back"]}>
          {dict.caseDetail.back}
        </Link>
      </p>

      <header className={styles["work-case-detail__header"]}>
        <p className={styles["work-case-detail__label"]}>{workCase.label}</p>
        <h1 className={styles["work-case-detail__title"]}>{workCase.title}</h1>
        <p className={styles["work-case-detail__description"]}>{workCase.description}</p>
      </header>

      <div className={styles["work-case-detail__hero-media"]}>
        <Image
          src={workCase.posterSrc}
          alt={workCase.alt}
          fill
          className={styles["work-case-detail__hero-image"]}
          sizes="(max-width: 980px) 96vw, 72rem"
          priority
        />
      </div>

      <section className={styles["work-case-detail__drops"]} aria-labelledby="case-drops-heading">
        <h2 id="case-drops-heading" className={styles["work-case-detail__drops-title"]}>
          {dict.caseDetail.contentGridTitle}
        </h2>
        <div className={styles["work-case-detail__drops-grid"]}>
          {workCase.contentDrops.map((drop) => (
            <CaseContentDropCard
              key={drop.title}
              title={drop.title}
              type={drop.type}
              posterSrc={drop.posterSrc}
              videoSrc={drop.videoSrc}
              alt={drop.alt}
            />
          ))}
        </div>
      </section>

      <div className={styles["work-case-detail__cta"]}>
        <SVisualsButton href={contactHref}>{dict.caseDetail.cta}</SVisualsButton>
      </div>
    </article>
  );
}
