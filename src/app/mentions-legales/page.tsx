import type { Metadata } from "next";
import {
  SITE_NAME,
  SITE_URL,
  CONTACT_EMAIL,
  LEGAL,
  HOST,
  LEGAL_LAST_UPDATED,
} from "@/lib/seo";
import { TextReveal } from "@/components/ui/TextReveal";

export const metadata: Metadata = {
  title: "Mentions légales — MV Agency",
  description: `Mentions légales de ${SITE_NAME}. Éditeur, hébergeur, propriété intellectuelle.`,
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: false },
};

const LAST_UPDATED_FR = new Date(LEGAL_LAST_UPDATED).toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function MentionsLegalesPage() {
  return (
    <main className="container" style={{ padding: "6rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
        <TextReveal inline>Mentions légales</TextReveal>
      </h1>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>1. Éditeur du site</h2>
        <p><strong>Nom commercial :</strong> {LEGAL.commercialName}</p>
        <p><strong>Dénomination légale :</strong> {LEGAL.legalName}</p>
        <p><strong>Forme juridique :</strong> {LEGAL.legalForm}</p>
        <p><strong>SIREN :</strong> {LEGAL.siren}</p>
        <p><strong>SIRET (établissement principal) :</strong> {LEGAL.siret}</p>
        <p><strong>Code APE / NAF :</strong> {LEGAL.ape} — {LEGAL.apeLabel}</p>
        <p><strong>Immatriculation :</strong> {LEGAL.rcs} — n° de gestion {LEGAL.rcsManagementNumber}</p>
        <p><strong>TVA :</strong> {LEGAL.vatNotice}</p>
        <p><strong>Siège social :</strong> {LEGAL.publicAddress}</p>
        <p><strong>Téléphone :</strong> <a href={`tel:${LEGAL.phone}`}>{LEGAL.phoneDisplay}</a></p>
        <p>
          <strong>Email :</strong>{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <p><strong>Directeur de la publication :</strong> {LEGAL.publicationDirector}</p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>2. Hébergeur</h2>
        <p><strong>{HOST.name}</strong></p>
        <p>{HOST.address}</p>
        <p>
          Site :{" "}
          <a href={HOST.url} target="_blank" rel="noopener noreferrer">
            {HOST.url.replace(/^https?:\/\//, "")}
          </a>
        </p>
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
        Dernière mise à jour : {LAST_UPDATED_FR}
      </p>
    </main>
  );
}
