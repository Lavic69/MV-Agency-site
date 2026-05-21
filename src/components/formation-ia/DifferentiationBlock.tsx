import { formationIACommon } from "@/data/formation-ia-content";
import { TextReveal } from "@/components/ui/TextReveal";
import styles from "./DifferentiationBlock.module.css";

function renderBold(text: string) {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );
}

export function DifferentiationBlock() {
  const c = formationIACommon.differentiation;
  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>{c.eyebrow}</span>
      <h2 className={styles.title}>
        <TextReveal>{c.title}</TextReveal>
      </h2>
      <p className={styles.intro}>{c.intro}</p>
      <div className={styles.grid}>
        {c.cards.map((card, i) => {
          const num = String(i + 1).padStart(2, "0");
          return (
            <article key={card.title} className={styles.card}>
              <span className={styles.num} aria-hidden="true">
                {num}
              </span>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardBody}>{renderBold(card.body)}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
