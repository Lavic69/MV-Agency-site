import { Accordion } from "@/components/ui/accordion";
import {
  formationIACommon,
  territoires,
  type Territoire,
} from "@/data/formation-ia-content";
import { TextReveal } from "@/components/ui/TextReveal";
import styles from "./FormationFAQ.module.css";

interface Props {
  territoire: Territoire;
}

/**
 * FAQ section for Formation IA pages.
 *
 * Implements the FAQ sentinel pattern: when an item's `answer` is "",
 * substitute `territoires[territoire].faqZone` for the active territory.
 * The `territoireOverride` map takes precedence if provided.
 */
export function FormationFAQ({ territoire }: Props) {
  const c = formationIACommon.faq;
  const t = territoires[territoire];

  const items = c.items.map((item) => {
    const override = item.territoireOverride?.[territoire];
    if (override) {
      return { question: item.question, answer: override };
    }
    if (item.answer === "") {
      return { question: item.question, answer: t.faqZone };
    }
    return { question: item.question, answer: item.answer };
  });

  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>{c.eyebrow}</span>
      <h2 className={styles.title}>
        <TextReveal>{c.title}</TextReveal>
      </h2>
      <Accordion items={items} />
    </section>
  );
}
