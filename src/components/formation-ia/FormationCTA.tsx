import { Button } from "@/components/ui/Button";
import { formationIACommon } from "@/data/formation-ia-content";
import styles from "./FormationCTA.module.css";

export function FormationCTA() {
  const c = formationIACommon.ctaFinal;
  return (
    <section className={styles.section}>
      <div className={styles.panel}>
        <h2 className={styles.title}>{c.title}</h2>
        <p className={styles.body}>{c.body}</p>
        <div className={styles.actions}>
          <Button href={c.primary.href} variant="primary" size="lg">
            {c.primary.label}
          </Button>
          {c.secondary && (
            <Button href={c.secondary.href} variant="outline" size="lg">
              {c.secondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
