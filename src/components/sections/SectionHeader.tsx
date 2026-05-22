import styles from "./SectionHeader.module.css";

type Props = Readonly<{
  eyebrow?: string;
  title: string;
  intro?: string;
  titleId?: string;
  align?: "center" | "start";
  className?: string;
}>;

export function SectionHeader({
  eyebrow,
  title,
  intro,
  titleId,
  align = "center",
  className,
}: Props) {
  const rootClass = [
    styles.header,
    align === "center" ? styles["header--center"] : styles["header--start"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={rootClass}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </header>
  );
}
