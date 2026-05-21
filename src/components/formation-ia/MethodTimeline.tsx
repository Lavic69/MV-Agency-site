import { formationIACommon } from "@/data/formation-ia-content";
import { TextReveal } from "@/components/ui/TextReveal";
import styles from "./MethodTimeline.module.css";

export function MethodTimeline() {
  const c = formationIACommon.method;
  return (
    <section id="methode" className={styles.section}>
      <span className={styles.eyebrow}>{c.eyebrow}</span>
      <h2 className={styles.title}>
        <TextReveal>{c.title}</TextReveal>
      </h2>
      <p className={styles.intro}>{c.intro}</p>
      <ol className={styles.list}>
        {c.phases.map((p) => (
          <li key={p.num} className={styles.step}>
            <span className={styles.stepNum}>{p.num}</span>
            <h3 className={styles.stepTitle}>{p.title}</h3>
            <p className={styles.stepDuration}>{p.durationLabel}</p>
            <p className={styles.stepBody}>{p.body}</p>
            <p className={styles.stepDeliverable}>
              Livrable : {p.deliverable}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
