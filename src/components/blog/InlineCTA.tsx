import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./Article.module.css";

type InlineCTAProps = {
  /** Titre du bloc — court, accrocheur */
  title: string;
  /** Texte d'accompagnement — 1 ou 2 phrases max */
  text: string;
  /** Texte du lien d'action */
  ctaLabel: string;
  /** Cible — interne (`/contact`, `/offres`) ou externe */
  href: string;
};

/**
 * CTA en milieu d'article. À placer après le 2ᵉ ou 3ᵉ H2, jamais en tête.
 * Toujours pointer vers une page conversion (`/contact` ou `/offres`).
 */
export function InlineCTA({ title, text, ctaLabel, href }: InlineCTAProps) {
  return (
    <aside className={styles.inlineCta}>
      <h3 className={styles.inlineCtaTitle}>{title}</h3>
      <p className={styles.inlineCtaText}>{text}</p>
      <Link href={href} className={styles.inlineCtaLink}>
        {ctaLabel}
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </aside>
  );
}
