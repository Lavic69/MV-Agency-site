import { TextReveal } from "@/components/ui/TextReveal";
import { Button } from "@/components/ui/Button";
import {
  formationIACommon,
  territoires,
  type Territoire,
} from "@/data/formation-ia-content";
import styles from "./FormationHero.module.css";

interface Props {
  territoire: Territoire;
}

export function FormationHero({ territoire }: Props) {
  const t = territoires[territoire];
  const c = formationIACommon.hero;

  return (
    <section className={styles.hero}>
      <span className={styles.badge}>{c.badge}</span>
      <p className={styles.eyebrow}>Formation IA · {t.nom}</p>
      <h1 className={styles.h1}>
        <TextReveal>{c.h1}</TextReveal>
      </h1>
      <p className={styles.sub}>{c.sub}</p>
      <div className={styles.ctas}>
        <Button href={c.ctaPrimary.href} variant="primary" size="lg">
          {c.ctaPrimary.label}
        </Button>
        <Button href={c.ctaSecondary.href} variant="outline" size="lg">
          {c.ctaSecondary.label}
        </Button>
      </div>
    </section>
  );
}
