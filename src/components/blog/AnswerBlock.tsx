import styles from "./Article.module.css";

type AnswerBlockProps = {
  /** Le texte du résumé GEO. 150-200 mots recommandés (cf. GEO_Plan §3.1) */
  children: React.ReactNode;
  /** Texte de l'étiquette en haut du bloc — défaut "Résumé" */
  label?: string;
};

/**
 * Bloc résumé extractible par les IA (ChatGPT, Perplexity, Google AI Overviews).
 * À placer EN PREMIER dans l'article, avant la première section H2.
 *
 * Doit contenir :
 *  - Verdict / chiffre / fourchette de l'article
 *  - Auto-suffisant : compréhensible hors contexte
 *  - 100% unique vs autres articles (pas de boilerplate)
 *
 * Voir GEO_Plan_MV_Agency.md §3 pour les règles d'écriture.
 */
export function AnswerBlock({ children, label = "Résumé" }: AnswerBlockProps) {
  return (
    <aside className={styles.answerBlock} role="note" aria-label={label}>
      <span className={styles.answerLabel}>{label}</span>
      <p className={styles.answerText}>{children}</p>
    </aside>
  );
}
