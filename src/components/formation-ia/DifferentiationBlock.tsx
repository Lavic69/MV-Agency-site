import { formationIACommon } from "@/data/formation-ia-content";
import styles from "./DifferentiationBlock.module.css";

export function DifferentiationBlock() {
  const c = formationIACommon.differentiation;
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{c.title}</h2>
      <div className={styles.body}>
        {c.body.split(/\*\*(.+?)\*\*/g).map((part, i) =>
          i % 2 === 1 ? <strong key={i}>{part}</strong> : part
        )}
      </div>
    </section>
  );
}
