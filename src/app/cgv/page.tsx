import type { Metadata } from "next";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: `Conditions Générales de Vente des prestations de ${SITE_NAME} — création web, intégration IA, accompagnement.`,
  alternates: { canonical: "/cgv" },
  robots: { index: true, follow: false },
};

/**
 * ⚠️ IMPORTANT — SQUELETTE À FINALISER AVANT MISE EN LIGNE PRODUCTION
 *
 * Ce document est un canevas générique pour une activité de prestations de services
 * digitaux B2B (TPE/PME). Il DOIT être :
 *  1. Relu et ajusté selon ta réalité commerciale exacte (délais, acomptes, livrables, etc.)
 *  2. Idéalement validé par un avocat / expert-comptable avant mise en ligne
 *  3. Accepté explicitement par chaque client (signature devis + case cochée sur portail)
 *
 * Clauses incontournables pour une prestation digitale :
 *  - Objet et périmètre précis
 *  - Prix, modalités de paiement, acompte
 *  - Délais d'exécution et retards
 *  - Cession / licence des droits sur les livrables
 *  - Obligations de chaque partie
 *  - Résiliation et conséquences
 *  - Responsabilité et garanties
 *  - Confidentialité
 *  - Droit applicable et juridiction
 */
export default function CgvPage() {
  return (
    <main className="container" style={{ padding: "6rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Conditions Générales de Vente</h1>

      <p style={{ marginBottom: "2rem", fontStyle: "italic", color: "var(--accent)" }}>
        Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent les relations
        contractuelles entre {SITE_NAME} (ci-après « le Prestataire ») et ses clients professionnels
        (ci-après « le Client ») pour toute prestation de services digitaux.
      </p>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Article 1 — Objet</h2>
        <p>
          Les présentes CGV définissent les conditions dans lesquelles {SITE_NAME} fournit à ses
          clients des prestations de création de site web, d'intégration d'intelligence artificielle,
          d'automatisation et d'accompagnement associé.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Article 2 — Devis et commande</h2>
        <p>
          Toute prestation fait l'objet d'un devis écrit précisant la nature, le périmètre, les
          livrables, le planning et le prix. Le devis est valable [À COMPLÉTER — ex. 30 jours] à
          compter de sa date d'émission. La commande est réputée ferme dès signature du devis par le
          Client et encaissement de l'acompte prévu à l'article 4.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Article 3 — Prix</h2>
        <p>
          Les prix sont indiqués en euros, [À COMPLÉTER : « HT » si assujetti TVA / « net, TVA non
          applicable – art. 293 B du CGI » pour micro-entreprise].
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          Les prix ne comprennent pas les coûts tiers (noms de domaine, hébergement, licences
          logicielles, API payantes, etc.) qui font l'objet d'une facturation séparée ou d'un
          abonnement pris directement par le Client.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Article 4 — Modalités de paiement</h2>
        <p>Sauf accord particulier :</p>
        <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
          <li>Acompte de [À COMPLÉTER — ex. 30 ou 40] % à la commande.</li>
          <li>Solde à la livraison ou selon échéancier convenu au devis.</li>
          <li>Paiement par virement bancaire sous 15 jours à réception de facture.</li>
        </ul>
        <p style={{ marginTop: "0.5rem" }}>
          Tout retard de paiement entraîne de plein droit, après mise en demeure restée infructueuse,
          des pénalités au taux d'intérêt légal majoré de 10 points, ainsi qu'une indemnité
          forfaitaire pour frais de recouvrement de 40 € (art. L.441-10 et D.441-5 du Code de
          commerce).
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Article 5 — Délais d'exécution</h2>
        <p>
          Les délais annoncés sont indicatifs et supposent la fourniture par le Client, en temps
          utile, des informations, contenus et validations nécessaires. Tout retard imputable au
          Client (retour tardif, contenu manquant, validation différée) entraîne un décalage
          corrélatif du planning.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Article 6 — Livrables et propriété intellectuelle</h2>
        <p>
          À l'issue de la prestation et après paiement intégral, le Prestataire cède au Client les
          droits d'usage des livrables finaux (design, textes sur-mesure, configuration) pour une
          exploitation sur le périmètre du projet défini au devis.
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          Le code source, les méthodologies, les composants réutilisables et le savoir-faire restent
          la propriété intellectuelle du Prestataire. Le Prestataire se réserve le droit de mentionner
          le projet à des fins de promotion (portfolio, cas clients) sauf demande contraire écrite du
          Client.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Article 7 — Obligations du Client</h2>
        <p>Le Client s'engage à :</p>
        <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
          <li>Fournir les contenus, validations et accès nécessaires dans les délais convenus.</li>
          <li>Garantir disposer des droits sur les éléments fournis (images, textes, marques).</li>
          <li>Régler les factures aux échéances prévues.</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Article 8 — Responsabilité</h2>
        <p>
          Le Prestataire est tenu à une obligation de moyens. Sa responsabilité ne saurait être
          engagée qu'en cas de faute prouvée et se limite au montant des sommes effectivement versées
          par le Client pour la prestation concernée. Le Prestataire ne saurait être tenu responsable
          des dommages indirects (perte d'exploitation, perte de chiffre d'affaires, etc.).
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Article 9 — Confidentialité</h2>
        <p>
          Chaque partie s'engage à conserver la confidentialité des informations échangées dans le
          cadre de la prestation, pendant toute la durée du contrat et 3 ans après son terme.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Article 10 — Résiliation</h2>
        <p>
          En cas de manquement grave de l'une des parties, l'autre partie pourra résilier le contrat
          après mise en demeure restée infructueuse pendant 15 jours. Les sommes déjà versées
          correspondant aux travaux déjà effectués restent acquises au Prestataire.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Article 11 — Droit applicable et juridiction</h2>
        <p>
          Les présentes CGV sont soumises au droit français. En cas de litige, et après échec d'une
          tentative de résolution amiable, compétence exclusive est attribuée aux tribunaux du
          ressort du siège du Prestataire.
        </p>
      </section>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Article 12 — Contact</h2>
        <p>
          Pour toute question relative aux présentes CGV :{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </section>

      <p style={{ marginTop: "3rem", fontSize: "0.9rem", color: "var(--accent)" }}>
        Version [À COMPLÉTER] · Dernière mise à jour : [À COMPLÉTER]
      </p>
    </main>
  );
}
