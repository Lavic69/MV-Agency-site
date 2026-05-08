import React from "react";
import { SiNextdotjs, SiWordpress, SiShopify, SiReact, SiVuedotjs, SiSvelte, SiAstro, SiAngular, SiDjango, SiWebflow } from "react-icons/si";
import type { CoverKeyword as CoverKeywordType } from "@/app/blog/_articles";
import styles from "./CoverKeyword.module.css";

/* Carte d'icônes supportées pour le pattern "vs". On ne charge que les marques
   qu'on prévoit d'utiliser dans des comparatifs blog — ajouts faciles ici. */
const LOGO_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  nextjs: SiNextdotjs,
  wordpress: SiWordpress,
  shopify: SiShopify,
  react: SiReact,
  vue: SiVuedotjs,
  svelte: SiSvelte,
  astro: SiAstro,
  angular: SiAngular,
  django: SiDjango,
  webflow: SiWebflow,
};

/**
 * Détecte les opérateurs (×, +, /, vs, —) dans une chaîne et la
 * découpe en parts alternant "text" et "op".
 * Exemple : "IA × PME" → [{kind:"text",value:"IA"}, {kind:"op",value:"×"}, {kind:"text",value:"PME"}]
 */
function splitOnOperators(value: string): Array<{ kind: "text" | "op"; value: string }> {
  // Ordre du regex : opérateurs spaced first (` vs `, ` × `, ` + `, ` / `, ` — `)
  const regex = /(\s+vs\s+|\s+[×+/—]\s+)/gi;
  const tokens = value.split(regex).filter((s) => s.length > 0);
  return tokens.map((tok) => {
    if (regex.test(tok) || /^\s+(vs|[×+/—])\s+$/i.test(tok)) {
      return { kind: "op" as const, value: tok.trim() };
    }
    return { kind: "text" as const, value: tok };
  });
}

export type CoverKeywordSize = "xl" | "md" | "sm" | "xs";

interface CoverKeywordProps {
  keyword: CoverKeywordType;
  size?: CoverKeywordSize;
  className?: string;
}

export const CoverKeyword: React.FC<CoverKeywordProps> = ({ keyword, size = "xl", className }) => {
  const sizeClass = styles[`size-${size}`];

  if (keyword.type === "vs") {
    const [a, b] = keyword.logos;
    const LogoA = LOGO_MAP[a];
    const LogoB = LOGO_MAP[b];

    if (!LogoA || !LogoB) {
      // Fallback texte si un logo n'est pas mappé — on affiche le slug en majuscules.
      const fallbackText = `${a.toUpperCase()} VS ${b.toUpperCase()}`;
      return (
        <div className={`${styles.root} ${sizeClass} ${className ?? ""}`} aria-label={fallbackText}>
          {fallbackText}
        </div>
      );
    }

    return (
      <div
        className={`${styles.versus} ${sizeClass} ${className ?? ""}`}
        aria-label={`${a} vs ${b}`}
      >
        <span className={styles.logo}>
          <LogoA />
        </span>
        <span className={styles.versusLabel}>vs</span>
        <span className={`${styles.logo} ${styles.logoAlt}`}>
          <LogoB />
        </span>
      </div>
    );
  }

  // Pattern "text" — on parse les opérateurs et on stylise les morceaux.
  const parts = splitOnOperators(keyword.value);
  return (
    <div
      className={`${styles.root} ${sizeClass} ${className ?? ""}`}
      aria-label={keyword.value}
    >
      {parts.map((part, i) =>
        part.kind === "op" ? (
          <span key={i} className={styles.op}>
            {part.value}
          </span>
        ) : (
          <span key={i}>{part.value}</span>
        )
      )}
    </div>
  );
};
