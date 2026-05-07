import { Accordion } from "@/components/ui/accordion";
import type { FaqItem } from "@/lib/seo";
import styles from "./Article.module.css";

type FAQProps = {
  items: ReadonlyArray<FaqItem>;
  /** Titre de section — défaut "Foire aux questions" */
  title?: string;
};

/**
 * Section FAQ d'article. Wrappe l'Accordion existant avec la structure
 * sémantique `<section aria-labelledby>` que les IA AI Overviews utilisent
 * pour identifier les blocs Q/R extractibles.
 *
 * Le JSON-LD FAQPage doit être injecté séparément en parallèle via
 * `<JsonLd data={buildFaqPageSchema(items, pageUrl)} />`.
 */
export function FAQ({ items, title = "Foire aux questions" }: FAQProps) {
  if (items.length === 0) return null;

  return (
    <section className={styles.faqSection} aria-labelledby="faq-heading">
      <h2 id="faq-heading" className={styles.faqTitle}>
        {title}
      </h2>
      <Accordion items={items.map((i) => ({ question: i.question, answer: i.answer }))} />
    </section>
  );
}
