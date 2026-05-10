/**
 * Formattage des dates pour le blog. Centralisé pour éviter la duplication
 * entre ArticleHeader, BlogClient, BlogPreview, et la page liste.
 */

/** Format `JJ.MM.AA` — pour les méta-infos en monospace (cohérent avec la signature magazine). */
export function formatDateMono(iso: string): string {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${dd}.${mm}.${yy}`;
}

/** Format long en français — ex: "07 mai 2026". Pour les notices "Maj le …". */
export function formatDateLong(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
