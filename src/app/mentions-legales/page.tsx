import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, CONTACT_EMAIL, FOUNDER_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales de ${SITE_NAME}. Éditeur, hébergeur, propriété intellectuelle.`,
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: false }, // pas de valeur SEO, crawl OK mais pas d'index
};

/**
 * ⚠️ IMPORTANT — À FINALISER AVANT MISE EN LIGNE PRODUCTION
 *
 * Les champs marqués [À COMPLÉTER] doivent être remplis avec les données réelles
 * dès l'immatriculation de l'entreprise (micro-entreprise / SASU / autre).
 *
 * Obligations légales FR (LCEN 2004-575) :
 *  - Nom / raison sociale de l'éditeur
 *  - Adresse du siège
 *  - Numéro de téléphone
 *  - Email de contact
 *  - SIRET / SIREN
 *  - Numéro TVA intracommunautaire (si applicable)
 *  - Directeur de la publication
 *  - Coordonnées complètes de l'hébergeur
 */
export default function MentionsLegalesPage() {
  return (
    <main className="container" style={{ padding: "6rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Mentions légales</h1>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>1. Éditeur du site</h2>
        <p><strong>Dénomination :</strong> {SITE_NAME}</p>
        <p><strong>Forme juridique :</strong> [À COMPLÉTER — ex. Entreprise individuelle / SASU]</p>
        <p><strong>SIRET :</strong> [À COMPLÉTER]</p>
        <p><strong>Numéro TVA intracommunautaire :</strong> [À COMPLÉTER ou « Non assujetti – Art. 293 B du CGI » pour micro-entreprise]</p>
        <p><strong>Siège social :</strong> [À COMPLÉTER — adresse complète, La Réunion]</p>
        <p>
          <strong>Email :</strong>{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <p><strong>Téléphone :</strong> [À COMPLÉTER]</p>
        <p><strong>Directeur de la publication :</strong> {FOUNDER_NAME}</p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>2. Hébergeur</h2>
        <p><strong>Vercel Inc.</strong></p>
        <p>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
        <p>Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a></p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>3. Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur le site <a href={SITE_URL}>{SITE_URL}</a> (textes,
          images, graphismes, logos, vidéos, code source, structure) sont la propriété exclusive de{" "}
          {SITE_NAME}, sauf mention contraire.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication, adaptation ou exploitation
          de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est
          interdite sans autorisation écrite préalable.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>4. Responsabilité</h2>
        <p>
          {SITE_NAME} s'efforce de fournir des informations aussi précises que possible mais ne
          saurait être tenue responsable des omissions, inexactitudes ou carences dans la mise à
          jour du site.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>5. Liens hypertextes</h2>
        <p>
          Le site peut contenir des liens vers des sites tiers. {SITE_NAME} n'exerce aucun contrôle
          sur ces sites et décline toute responsabilité quant à leur contenu.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>6. Droit applicable</h2>
        <p>Le présent site est soumis au droit français. Tout litige relève des tribunaux compétents français.</p>
      </section>

      <p style={{ marginTop: "3rem", fontSize: "0.9rem", color: "var(--accent)" }}>
        Dernière mise à jour : [À COMPLÉTER]
      </p>
    </main>
  );
}
