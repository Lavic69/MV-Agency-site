import type { Metadata } from "next";
import Link from "next/link";
import {
  Quote,
  Wallet,
  Workflow,
  Video,
  Sparkles,
  Loader2,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { TextReveal } from "@/components/ui/TextReveal";
import { Accordion } from "@/components/ui/accordion";
import LogoLoop from "@/components/ui/LogoLoop";
import { MockupWeb } from "@/components/ui/mockups/MockupWeb";
import { MockupIA } from "@/components/ui/mockups/MockupIA";
import { MockupWorkflow } from "@/components/ui/mockups/MockupWorkflow";
import { MockupTree } from "@/components/ui/mockups/MockupTree";
import { techLogos } from "@/data/tech-logos";
import {
  SITE_URL,
  CONTACT_EMAIL,
  FOUNDER_NAME,
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  type FaqItem,
} from "@/lib/seo";
import styles from "../agence-web-la-reunion/AgenceReunion.module.css";

/* -------------------------------------------------------------------------- */
/*  Metadata                                                                  */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Agence web France : sites & IA pour PME en distanciel | MV Agency",
  description:
    "Agence web française accompagnant les PME en distanciel sur tout le territoire. Création de sites internet premium et intégration d'intelligence artificielle. Tarifs ajustés vs Paris.",
  alternates: { canonical: "/agence-web-france" },
  openGraph: {
    type: "website",
    title: "Agence web en France — MV Agency",
    description:
      "MV Agency accompagne les PME françaises en distanciel : sites web premium et intégration d'IA. Tarifs ajustés vs Paris, méthode async éprouvée.",
    url: `${SITE_URL}/agence-web-france`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence web en France — MV Agency",
    description:
      "Sites premium & IA pour PME françaises. 100 % distanciel, méthode async éprouvée, tarifs ajustés.",
  },
};

/* -------------------------------------------------------------------------- */
/*  Données                                                                   */
/* -------------------------------------------------------------------------- */

const PAGE_URL = `${SITE_URL}/agence-web-france`;

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Accueil", url: SITE_URL },
  { name: "Agence web en France", url: PAGE_URL },
]);

const franceLocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${PAGE_URL}#localbusiness-france`,
  name: "MV Agency — Agence web & IA pour la France métropolitaine",
  url: PAGE_URL,
  description:
    "Agence web et intelligence artificielle française accompagnant les PME, indépendants et startups en distanciel sur tout le territoire métropolitain. Sites premium en Next.js, intégration IA conforme RGPD, tarifs ajustés.",
  parentOrganization: { "@id": `${SITE_URL}/#organization` },
  founder: { "@id": `${SITE_URL}/a-propos#person` },
  email: CONTACT_EMAIL,
  priceRange: "€€",
  areaServed: [
    { "@type": "Country", name: "France" },
    { "@type": "AdministrativeArea", name: "France métropolitaine" },
    { "@type": "AdministrativeArea", name: "Île-de-France" },
    { "@type": "AdministrativeArea", name: "Auvergne-Rhône-Alpes" },
    { "@type": "AdministrativeArea", name: "Nouvelle-Aquitaine" },
    { "@type": "AdministrativeArea", name: "Occitanie" },
    { "@type": "AdministrativeArea", name: "Provence-Alpes-Côte d'Azur" },
    { "@type": "AdministrativeArea", name: "Hauts-de-France" },
    { "@type": "AdministrativeArea", name: "Grand Est" },
    { "@type": "AdministrativeArea", name: "Bretagne" },
    { "@type": "AdministrativeArea", name: "Pays de la Loire" },
    { "@type": "AdministrativeArea", name: "Normandie" },
    { "@type": "AdministrativeArea", name: "Centre-Val de Loire" },
    { "@type": "AdministrativeArea", name: "Bourgogne-Franche-Comté" },
    { "@type": "AdministrativeArea", name: "Corse" },
  ],
};

const faqItems: FaqItem[] = [
  {
    question: "Pourquoi choisir une agence web qui n'est pas physiquement à Paris ou Lyon ?",
    answer:
      "Parce que la qualité d'exécution ne dépend pas de la proximité géographique. MV Agency est une entreprise française qui travaille avec des PME partout en métropole en 100 % distanciel. Avantage concret : les charges fixes d'une agence parisienne (loyers, équipes commerciales, chefs de projet intermédiaires) ne sont pas répercutées sur votre devis. Vous parlez directement à la personne qui construit votre site, et le tarif reflète une structure légère.",
  },
  {
    question: "Comment fonctionne le distanciel concrètement ?",
    answer:
      "Quatre outils, pas plus : (1) Cal.com pour réserver les appels, (2) un Notion partagé qui sert de tableau de bord projet — vous voyez à tout moment où on en est, ce qui est livré, ce qui est validé, (3) des Loom (vidéos asynchrones de 2-3 minutes) pour expliquer les choix design ou techniques sans bloquer un créneau visio, (4) une visio hebdomadaire de 30 minutes pendant la phase active. Pas de Slack permanent, pas de notifications qui polluent — du travail propre, livré, avec des points cadrés. Les rendez-vous se font sur des créneaux français standards (8h-19h heure de Paris).",
  },
  {
    question: "Êtes-vous une entreprise française ou étrangère ?",
    answer:
      "MV Agency est une entreprise française : SIREN 940 349 921, immatriculée au RCS de Saint-Denis (La Réunion). Le statut est celui d'une micro-entreprise (Entrepreneur Individuel). La facturation est française (TVA 20 % applicable, sauf si auto-entrepreneur en franchise selon les seuils). Les contrats sont régis par le droit français. Pour les PME françaises, la simplicité administrative est totale — aucune procédure spécifique liée au transfrontalier.",
  },
  {
    question: "Combien coûte un site internet en France avec MV Agency ?",
    answer:
      "Les fourchettes : 1 500 à 4 000 € pour un site vitrine premium (3-5 pages, design responsive, SEO de base, formulaire sécurisé). 4 000 à 8 000 € pour un site avec automatisations et début d'IA (chatbot, génération de contenu assistée, connecteurs CRM). 8 000 à 15 000 € pour une plateforme complète (e-commerce ou app sur-mesure avec écosystème IA). Devis cadré sous 48h après l'appel découverte. Facturation française (TVA 20 % applicable, sauf si auto-entrepreneur en franchise selon les seuils).",
  },
  {
    question: "Quelle différence avec une agence parisienne ou lyonnaise ?",
    answer:
      "Trois différences pratiques : (1) Tarifs typiquement 30-50 % en dessous d'une agence full-service parisienne à qualité d'exécution équivalente, parce que la structure est légère et qu'il n'y a pas de loyers parisiens à amortir. (2) Vous parlez directement à la personne qui construit votre site, sans strate commerciale ni chef de projet intermédiaire qui ralentit les itérations. (3) On cumule web premium (Next.js) ET intégration IA en production — combinaison rare, la majorité des agences sont spécialisées sur l'un ou l'autre.",
  },
  {
    question: "Pouvez-vous intervenir en présentiel à Paris, Lyon, Marseille ?",
    answer:
      "Le présentiel n'est pas la norme — la méthode est conçue pour fonctionner en 100 % distanciel et c'est ce qui permet les tarifs ajustés. Cela dit, des déplacements ponctuels sont possibles pour le kick-off ou la formation finale, sur facturation des frais. Pour les rendez-vous de cadrage, la visio fonctionne aussi bien que le présentiel — et permet d'avoir le compte rendu enregistré (avec votre accord) pour ne rien rater.",
  },
  {
    question: "Êtes-vous conforme RGPD pour une PME française ?",
    answer:
      "Oui, par construction. Le site est hébergé sur Vercel avec Data Processing Addendum + clauses contractuelles types européennes. La mesure d'audience par défaut est cookieless (Vercel Analytics, conforme délibération CNIL 2020-091, sans bandeau de consentement requis). Les déploiements IA sont calibrés selon la sensibilité de vos données : modèles européens (Mistral hébergé en Europe), modèles US sous DPA (Anthropic, OpenAI), ou auto-hébergement (Ollama, vLLM) pour les données les plus critiques. La cartographie des traitements et la documentation conformité sont fournies.",
  },
  {
    question: "Combien de temps pour créer un site internet pour une PME française ?",
    answer:
      "Un site vitrine premium combiné à une automatisation de base prend 3 à 4 semaines. Pour un écosystème IA complet (chatbot, agents, automatisations, génération de contenu) ou une plateforme e-commerce sur-mesure, comptez 6 à 8 semaines. Un rétroplanning structuré vous est fourni dès le lancement. La méthode async ne rallonge pas les délais — elle les sécurise par la traçabilité Notion.",
  },
];

const faqPageSchema = buildFaqPageSchema(faqItems, PAGE_URL);

/** 4 services pour PME françaises distancielles — avec mockups. */
const services = [
  {
    Mockup: MockupWeb,
    title: "Création de site web premium",
    desc: "Sites vitrines Next.js, e-commerce Shopify ou sur-mesure, refontes pour PME et startups françaises. Design responsive, identité sur-mesure, SEO racine.",
    bullets: [
      "Vitrines, e-commerce, refontes",
      "Identité visuelle sur-mesure",
      "Performance Core Web Vitals",
    ],
  },
  {
    Mockup: MockupIA,
    title: "Intégration d'intelligence artificielle",
    desc: "Agents IA, chatbots souverains, automatisations augmentées. Choix du fournisseur (modèles européens, US sous DPA, auto-hébergement) selon votre sensibilité RGPD.",
    bullets: [
      "Agents IA propriétaires (Claude, GPT)",
      "Modèles européens ou auto-hébergement",
      "Conformité RGPD by design",
    ],
  },
  {
    Mockup: MockupWorkflow,
    title: "Automatisation des processus",
    desc: "Connexion entre vos outils via Make, n8n, Zapier. Automatisation CRM, synchronisation comptable (Pennylane, Sage), déclencheurs marketing.",
    bullets: [
      "Make, n8n, Zapier",
      "CRM + Pennylane / Sage",
      "Emailing dynamique",
    ],
  },
  {
    Mockup: MockupTree,
    title: "Formation & accompagnement",
    desc: "Sessions pédagogiques en visio pour rendre votre équipe autonome sur le site, les automatisations et les usages de l'IA. Documentation Notion en français.",
    bullets: [
      "Formation en visio",
      "Prise en main des outils IA",
      "Documentation Notion FR",
    ],
  },
];

const DIFF_CARDS = [
  {
    icon: Wallet,
    title: "Tarifs ajustés vs agences parisiennes",
    text:
      "Pas de loyers Châtelet ni d'équipe commerciale à payer. Vous bénéficiez directement d'une structure légère : devis typiquement 30-50 % en dessous d'une agence full-service parisienne, à qualité d'exécution équivalente. Le devis reflète le travail réel.",
  },
  {
    icon: Sparkles,
    title: "Web premium + IA en un seul interlocuteur",
    text:
      "Là où la majorité des agences sont spécialisées (web OU marketing OU data), MV Agency cumule la maîtrise de Next.js et l'intégration concrète d'IA en production. Un seul interlocuteur, une vision cohérente, livrable unifié.",
  },
  {
    icon: Workflow,
    title: "Process distanciel éprouvé",
    text:
      "Notion partagé en tableau de bord, Loom pour les explications asynchrones, visio hebdo de 30 min pendant la phase active. Pas de Slack permanent, pas de chef de projet intermédiaire. Vous parlez directement à la personne qui construit.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function AgenceWebFrancePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={franceLocalBusinessSchema} />
      <JsonLd data={faqPageSchema} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.containerNarrow}>
          <FadeIn>
            <span className={styles.heroEyebrow}>France métropolitaine · 100 % distanciel</span>
            <h1 className={styles.heroTitle}>
              <TextReveal inline justify="center">
                Agence web en France
              </TextReveal>{" "}
              <TextReveal
                delay={0.4}
                inline
                justify="center"
                wordClassName="globalGradientWordItalic"
              >
                pour PME ambitieuses
              </TextReveal>
            </h1>
            <p className={styles.heroSubtitle}>
              Création de sites web premium et intégration d&apos;intelligence artificielle pour les
              PME et startups françaises. 100&nbsp;% distanciel, méthode async éprouvée, tarifs
              ajustés vs Paris. Propriété 100&nbsp;% client à la livraison.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/contact">
                <Button variant="primary">Réserver un appel découverte</Button>
              </Link>
              <Link href="/offres">
                <Button variant="outline">Voir les offres</Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Différenciateurs */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.containerNarrow}>
          <FadeIn direction="up">
            <span className={styles.sectionEyebrow}>Trois avantages concrets</span>
            <h2 className={styles.sectionTitle}>
              <TextReveal>Ce que change MV Agency pour une PME française</TextReveal>
            </h2>
            <p className={styles.sectionSubtitle}>
              <TextReveal delay={0.4}>
                Le distanciel n&apos;est pas un défaut — c&apos;est ce qui permet de pratiquer des
                tarifs cohérents avec la qualité d&apos;exécution.
              </TextReveal>
            </p>
          </FadeIn>

          <div className={styles.diffGrid}>
            {DIFF_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <FadeIn key={card.title}>
                  <div className={styles.diffCard}>
                    <div className={styles.diffIcon}>
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className={styles.diffTitle}>{card.title}</h3>
                    <p className={styles.diffText}>{card.text}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services avec mockups */}
      <section className={styles.section}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <span className={styles.sectionEyebrow}>Nos services en France</span>
            <h2 className={styles.sectionTitle}>
              <TextReveal>Quatre prestations pour les PME françaises</TextReveal>
            </h2>
            <p className={styles.sectionSubtitle}>
              <TextReveal delay={0.4}>
                Pas d&apos;abonnement caché, pas d&apos;engagement de maintenance forcée. Propriété 100&nbsp;% client.
              </TextReveal>
            </p>
          </FadeIn>
          <div className={styles.servicesGrid}>
            {services.map((s, i) => {
              const Mockup = s.Mockup;
              return (
                <FadeIn key={s.title} direction="up" delay={0.08 * i}>
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceMockupWrapper}>
                      <Mockup />
                    </div>
                    <div className={styles.serviceCardBody}>
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                      <ul>
                        {s.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* AnswerBlock GEO */}
      <section className={styles.section}>
        <div className={styles.containerNarrow}>
          <FadeIn>
            <div className={styles.answerBlockWrapper}>
              <div className={styles.answerBlock}>
                <div className={styles.answerInner}>
                  <Quote className={styles.answerQuoteIcon} size={32} />
                  <span className={styles.answerLabel}>Réponse directe</span>
                  <p className={styles.answerText}>
                    Une PME française qui cherche à déployer un site web premium et une couche
                    d&apos;IA sans dépendance à une grosse agence parisienne peut s&apos;adresser à{" "}
                    <strong>MV Agency</strong>, une entreprise française qui intervient en
                    distanciel sur tout le territoire métropolitain. Tarifs ajustés (30-50&nbsp;%
                    en dessous Paris à qualité équivalente), méthode async éprouvée
                    (Notion + Loom + visio), conformité RGPD intégrée par construction.
                  </p>
                  <div className={styles.answerSignature}>
                    <span className={styles.answerSignatureName}>{FOUNDER_NAME}</span>
                    <span className={styles.answerSignatureSeparator}>·</span>
                    <span>Fondateur, MV Agency</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Couverture géographique — message visio uniquement (pas de présentiel France) */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <span className={styles.sectionEyebrow}>Couverture géographique</span>
            <h2 className={styles.sectionTitle}>
              <TextReveal>100&nbsp;% en visio, partout en France</TextReveal>
            </h2>
            <p className={styles.sectionSubtitle}>
              <TextReveal delay={0.4}>
                Pas de présentiel — c&apos;est la condition pour pratiquer ces tarifs. La méthode
                async est conçue pour fonctionner à 100&nbsp;% à distance.
              </TextReveal>
            </p>
          </FadeIn>

          <div className={styles.servicesGrid} style={{ marginTop: "2.5rem" }}>
            <FadeIn direction="up">
              <div className={styles.serviceCard}>
                <div className={styles.serviceCardBody}>
                  <div
                    style={{
                      display: "inline-flex",
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "rgba(96, 165, 250, 0.15)",
                      color: "#60A5FA",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Video size={24} strokeWidth={1.75} />
                  </div>
                  <h3>Cadrage en visio (Cal.com)</h3>
                  <p>
                    L&apos;appel découverte de 30 minutes se fait toujours en visio via Cal.com.
                    Vous pouvez être à Paris, Lyon, Marseille, Lille, Bordeaux, Strasbourg,
                    Quimper ou Bastia — la méthode est rigoureusement identique.
                  </p>
                  <ul>
                    <li>Réservation Cal.com en 30 secondes</li>
                    <li>Visio avec caméra + partage d&apos;écran</li>
                    <li>Compte rendu envoyé sous 24h</li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceCardBody}>
                  <div
                    style={{
                      display: "inline-flex",
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "rgba(96, 165, 250, 0.15)",
                      color: "#60A5FA",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Workflow size={24} strokeWidth={1.75} />
                  </div>
                  <h3>Suivi async sur Notion partagé</h3>
                  <p>
                    Pendant le projet, un Notion sert de tableau de bord 24/7. Vous voyez en
                    temps réel ce qui est livré, ce qui est validé, ce qui est en cours. Pas
                    besoin de bloquer votre agenda pour des réunions de suivi.
                  </p>
                  <ul>
                    <li>Notion accessible 24/7</li>
                    <li>Loom pour les explications</li>
                    <li>Visio hebdo de 30 min en phase active</li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceCardBody}>
                  <div
                    style={{
                      display: "inline-flex",
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "rgba(96, 165, 250, 0.15)",
                      color: "#60A5FA",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Sparkles size={24} strokeWidth={1.75} />
                  </div>
                  <h3>Web premium + IA, livré ensemble</h3>
                  <p>
                    Là où les agences parisiennes vous redirigent souvent vers un sous-traitant
                    pour la couche IA (et vous facturent la coordination), MV Agency livre
                    l&apos;ensemble en un projet unifié, avec un seul interlocuteur.
                  </p>
                  <ul>
                    <li>Web Next.js + IA en un livrable</li>
                    <li>Un seul interlocuteur du début à la fin</li>
                    <li>Pas de coordination multi-prestataires</li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceCardBody}>
                  <div
                    style={{
                      display: "inline-flex",
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "rgba(96, 165, 250, 0.15)",
                      color: "#60A5FA",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Loader2 size={24} strokeWidth={1.75} />
                  </div>
                  <h3>Process éprouvé sur tout le territoire</h3>
                  <p>
                    La méthode fonctionne à l&apos;identique sur Paris, Lyon, Marseille, Bordeaux,
                    Lille ou des villes plus petites. Aucune ville n&apos;est avantagée ou défavorisée
                    par la méthode async — au contraire, ça lisse le terrain.
                  </p>
                  <ul>
                    <li>Île-de-France · Auvergne-Rhône-Alpes</li>
                    <li>Sud · Bretagne · Hauts-de-France</li>
                    <li>Toutes régions métropole + Corse</li>
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stack technique — pleine largeur */}
      <section className={styles.section}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <span className={styles.sectionEyebrow}>Stack technique</span>
            <h2 className={styles.sectionTitle}>
              <TextReveal>Avec quels outils travaillons-nous&nbsp;?</TextReveal>
            </h2>
            <p className={styles.sectionSubtitle}>
              <TextReveal delay={0.4}>
                Une stack moderne, choisie pour la performance, la sécurité et la pérennité.
              </TextReveal>
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <div className={styles.logoLoopWrapper}>
              <LogoLoop
                logos={techLogos}
                speed={80}
                direction="left"
                logoHeight={50}
                gap={64}
                hoverSpeed={0}
                fadeOut
                fadeOutColor="transparent"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section
        className={`${styles.faqSection} ${styles.darkBg}`}
        aria-labelledby="faq-france"
      >
        <div className={styles.containerNarrow}>
          <span className={styles.sectionEyebrow}>Foire aux questions</span>
          <h2 id="faq-france" className={styles.faqTitle}>
            Les questions des PME françaises avant de réserver l'appel
          </h2>
          <p className={styles.faqSubtitle}>
            Distanciel, tarifs, RGPD, délais, présentiel ponctuel — les réponses précises.
          </p>

          <Accordion
            items={faqItems.map((i) => ({ question: i.question, answer: i.answer }))}
          />
        </div>
      </section>

      {/* CTA final */}
      <section className={styles.section}>
        <div className={styles.containerNarrow}>
          <FadeIn>
            <div className={styles.finalCta}>
              <h2>
                <TextReveal inline justify="center">Prêt à lancer votre projet</TextReveal>{" "}
                <TextReveal
                  delay={0.4}
                  inline
                  justify="center"
                  wordClassName="globalGradientWordItalic"
                >
                  en France&nbsp;?
                </TextReveal>
              </h2>
              <p>
                30 minutes en visio pour cadrer le périmètre, le budget et le rétroplanning.
                Sans engagement, sans pitch commercial — uniquement du concret.
              </p>
              <div className={styles.finalCtaButtons}>
                <Link href="/contact">
                  <Button variant="primary">Réserver un appel découverte</Button>
                </Link>
                <Link href="/cas-clients">
                  <Button variant="outline">Voir les cas clients</Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
