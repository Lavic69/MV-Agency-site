import type { Metadata } from "next";
import {
  SITE_NAME,
  SITE_URL,
  CONTACT_EMAIL,
  LEGAL,
  LEGAL_LAST_UPDATED,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Politique de confidentialité et traitement des données personnelles de ${SITE_NAME}, conforme RGPD.`,
  alternates: { canonical: "/politique-de-confidentialite" },
  robots: { index: true, follow: false },
};

const LAST_UPDATED_FR = new Date(LEGAL_LAST_UPDATED).toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="container" style={{ padding: "6rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Politique de confidentialité</h1>

      <p style={{ marginBottom: "2rem" }}>
        La présente politique décrit la manière dont {SITE_NAME} collecte, utilise et protège les
        données personnelles des utilisateurs du site <a href={SITE_URL}>{SITE_URL}</a>, conformément
        au <strong>Règlement Général sur la Protection des Données (RGPD)</strong> et à la loi
        Informatique et Libertés.
      </p>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>1. Responsable du traitement</h2>
        <p>
          <strong>{LEGAL.legalName}</strong>, exerçant sous le nom commercial {SITE_NAME},
          {" "}{LEGAL.legalForm.toLowerCase()}, immatriculée au {LEGAL.rcs} sous le n° {LEGAL.siren}.
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          Siège : {LEGAL.publicAddress}
          <br />
          Contact RGPD : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <br />
          Téléphone : <a href={`tel:${LEGAL.phone}`}>{LEGAL.phoneDisplay}</a>
        </p>
        <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", fontStyle: "italic" }}>
          Aucun délégué à la protection des données (DPO) n'est désigné, le traitement ne le rendant
          pas obligatoire (art. 37 RGPD).
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>2. Données collectées</h2>
        <p>Nous collectons uniquement les données que vous nous fournissez volontairement :</p>
        <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
          <li>Via le <strong>formulaire de contact / prise de rendez-vous Cal.com</strong> : nom, email, téléphone (optionnel), description de votre projet.</li>
          <li>Via les <strong>échanges email</strong> : toute donnée que vous nous communiquez.</li>
        </ul>
        <p style={{ marginTop: "0.5rem" }}>
          Aucune donnée sensible (santé, opinions politiques, etc.) n'est collectée.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>3. Finalités & base légale</h2>
        <ul style={{ marginLeft: "1.5rem" }}>
          <li><strong>Répondre à vos demandes</strong> (contact, devis, rendez-vous) — base légale : exécution pré-contractuelle / intérêt légitime.</li>
          <li><strong>Gérer la relation client</strong> si un contrat est signé — base légale : exécution du contrat.</li>
          <li><strong>Mesurer l'audience du site</strong> de manière anonymisée — base légale : intérêt légitime.</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>4. Durée de conservation</h2>
        <ul style={{ marginLeft: "1.5rem" }}>
          <li>Prospects sans suite : 3 ans après le dernier contact.</li>
          <li>Clients : durée de la relation contractuelle + délais légaux (facturation : 10 ans).</li>
          <li>Données techniques / logs : 13 mois maximum.</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>5. Destinataires & sous-traitants</h2>
        <p>Vos données peuvent être transmises aux sous-traitants techniques suivants :</p>
        <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
          <li><strong>Vercel Inc.</strong> (hébergement du site, USA — garanties : Data Processing Addendum + SCCs européennes).</li>
          <li><strong>Cloudflare, Inc.</strong> (DNS, domaine).</li>
          <li><strong>Infomaniak SA</strong> (email professionnel, Suisse — pays à protection adéquate).</li>
          <li><strong>Cal.com</strong> (prise de rendez-vous — si intégré).</li>
        </ul>
        <p style={{ marginTop: "0.5rem" }}>
          Aucune donnée n'est vendue à des tiers.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>6. Cookies</h2>
        <p>
          Le site utilise uniquement des cookies strictement nécessaires à son fonctionnement. Aucun
          cookie publicitaire ou de tracking tiers n'est déposé sans votre consentement explicite.
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          Si une solution de mesure d'audience est ajoutée ultérieurement (Plausible, Vercel
          Analytics ou équivalent), la liste exacte sera mise à jour ici et le consentement requis
          sera sollicité conformément à la recommandation CNIL « cookies et autres traceurs ».
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>7. Vos droits</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
          <li>Droit d'accès, de rectification, d'effacement</li>
          <li>Droit à la limitation et à l'opposition au traitement</li>
          <li>Droit à la portabilité des données</li>
          <li>Droit de définir des directives post-mortem</li>
          <li>Droit d'introduire une réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">CNIL</a></li>
        </ul>
        <p style={{ marginTop: "0.5rem" }}>
          Pour exercer ces droits, contactez-nous à{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Réponse sous 30 jours maximum.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>8. Sécurité</h2>
        <p>
          {SITE_NAME} met en œuvre les mesures techniques et organisationnelles appropriées pour
          garantir la sécurité des données : chiffrement HTTPS, hébergement sécurisé, accès
          authentifié aux systèmes, sauvegardes régulières.
        </p>
      </section>

      <p style={{ marginTop: "3rem", fontSize: "0.9rem", color: "var(--accent)" }}>
        Dernière mise à jour : {LAST_UPDATED_FR}
      </p>
    </main>
  );
}
