import { formationIACommon } from "@/data/formation-ia-content";
import styles from "./CaseStudyStory.module.css";

/**
 * 3-block case study (Avant / Notre intervention / Après).
 * The `apres` body uses light markdown ("1. **Bold**") — rendered as
 * pre-wrapped text with bold spans. No markdown parser needed for V0.
 */
function renderBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

export function CaseStudyStory() {
  const c = formationIACommon.caseStudy;
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{c.title}</h2>
      <div className={styles.grid}>
        <article className={styles.card}>
          <p className={styles.label}>Avant</p>
          <p className={styles.body}>{c.avant}</p>
        </article>
        <article className={styles.card}>
          <p className={styles.label}>Notre intervention</p>
          <p className={styles.body}>{c.intervention}</p>
        </article>
        <article className={styles.cardHighlight}>
          <p className={styles.label}>Après</p>
          <div className={styles.bodyRich}>{renderBold(c.apres)}</div>
        </article>
      </div>
    </section>
  );
}
