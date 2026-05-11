import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe2,
  ShieldCheck,
  Sparkles,
  Quote,
  Bot,
  Workflow,
  GraduationCap,
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
import {
  SITE_URL,
  CONTACT_EMAIL,
  FOUNDER_NAME,
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  type FaqItem,
} from "@/lib/seo";
import styles from "../agence-web-la-reunion/AgenceReunion.module.css";
import { BelgiqueMap } from "./BelgiqueMap";
import { techLogos } from "@/data/tech-logos";

/* -------------------------------------------------------------------------- */
/*  Metadata                                                                  */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Agence web & IA en Belgique | MV Agency",
  description:
    "Agence web & intelligence artificielle pour les PME belges. Création de sites web premium, agents IA et automatisations. Bruxelles, Wallonie, Liège, Namur, Charleroi — collaboration 100 % asynchrone (visio, Loom, Notion).",
  alternates: { canonical: "/agence-web-belgique" },
  openGraph: {
    type: "website",
    title: "Agence web & IA en Belgique — MV Agency",
    description:
      "Création de sites premium et intégration IA pour les PME belges. Collaboration asynchrone (visio, Loom, Notion). Pas d'abonnement caché, propriété 100 % client.",
    url: `${SITE_URL}/agence-web-belgique`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence web & IA en Belgique — MV Agency",
    description:
      "Sites web premium et IA pour PME belges. Bruxelles, Wallonie, Liège, Namur. 100 % asynchrone.",
  },
};

/* -------------------------------------------------------------------------- */
/*  Données                                                                   */
/* -------------------------------------------------------------------------- */

const PAGE_URL = `${SITE_URL}/agence-web-belgique`;

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Accueil", url: SITE_URL },
  { name: "Agence web en Belgique", url: PAGE_URL },
]);

const belgiumLocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${PAGE_URL}#localbusiness-belgique`,
  name: "MV Agency — Agence web & IA en Belgique",
  url: PAGE_URL,
  description:
    "Agence web et intelligence artificielle pour les PME belges. Création de sites web premium, agents IA et automatisations. Collaboration 100 % asynchrone depuis Bruxelles, Wallonie, Liège, Namur, Charleroi.",
  parentOrganization: { "@id": `${SITE_URL}/#organization` },
  founder: { "@id": `${SITE_URL}/a-propos#person` },
  email: CONTACT_EMAIL,
  priceRange: "€€",
  areaServed: [
    { "@type": "Country", name: "Belgique" },
    { "@type": "City", name: "Bruxelles" },
    { "@type": "AdministrativeArea", name: "Wallonie" },
    { "@type": "City", name: "Liège" },
    { "@type": "City", name: "Namur" },
    { "@type": "City", name: "Charleroi" },
    { "@type": "City", name: "Mons" },
    { "@type": "City", name: "Tournai" },
    { "@type": "City", name: "Louvain-la-Neuve" },
  ],
};

const faqItems: FaqItem[] = [
  {
    question: "Pourquoi choisir une agence web qui n'est pas physiquement en Belgique ?",
    answer:
      "Parce que la qualité d'exécution et la proximité humaine ne dépendent pas du nombre de kilomètres entre votre bureau et le nôtre. MV Agency est ancrée par son fondateur entre la France, La Réunion et la Belgique : la collaboration se fait en français, en visio, avec un espace Notion partagé où chaque étape est validée. Le résultat : pas de strate intermédiaire, un interlocuteur direct, et des coûts opérationnels réduits qui se reflètent dans le devis.",
  },
  {
    question: "Comment se passe concrètement la collaboration à distance avec une PME belge ?",
    answer:
      "L'avantage du fuseau horaire : Bruxelles est en UTC+1, La Réunion en UTC+4 — soit 3 heures d'avance le matin. Les retours faits le soir côté Belgique sont traités tôt le lendemain. Concrètement : un kick-off en visio (1h), un Notion partagé qui sert de tableau de bord projet, des Loom (vidéos asynchrones de 2-3 minutes) pour expliquer les choix design ou techniques, et une visio hebdomadaire de 30 minutes pendant la phase active. Pas de Slack permanent, pas de notifications qui polluent : du travail propre, livré.",
  },
  {
    question: "Quelles villes belges couvrez-vous ?",
    answer:
      "Toute la Belgique francophone et bilingue. Que votre entreprise soit à Bruxelles, Liège, Namur, Charleroi, Mons, Tournai, Louvain-la-Neuve, Wavre, Verviers ou n'importe où en Wallonie, le mode de travail est identique. La Flandre est également couverte si l'échange peut se faire en français ou en anglais (les livrables peuvent être traduits en NL par votre équipe ou par un prestataire que nous coordonnons).",
  },
  {
    question: "Comment gérez-vous la TVA et la facturation pour une entreprise belge ?",
    answer:
      "MV Agency est une entreprise française (micro-entreprise — SIREN 940 349 921). Pour une PME belge assujettie à la TVA, la facturation se fait HT avec autoliquidation de la TVA (article 21bis du Code TVA belge — prestation B2B intra-UE). Vous récupérez la TVA via votre déclaration habituelle, c'est neutre pour votre trésorerie. Le devis et la facture sont émis en euros.",
  },
  {
    question: "Combien de temps pour créer un site internet pour une PME belge ?",
    answer:
      "Un site vitrine premium combiné à une automatisation de base prend en moyenne 3 à 4 semaines. Pour un écosystème IA complet (chatbot, agents, automatisations Make/n8n, génération de contenu) ou une plateforme e-commerce sur-mesure, comptez 6 à 8 semaines. Un rétroplanning structuré vous est fourni dès le lancement — la collaboration asynchrone n'allonge pas les délais, elle les sécurise.",
  },
  {
    question: "Pouvez-vous intégrer une IA conforme au RGPD pour une entreprise belge ?",
    answer:
      "Oui. Tous les déploiements respectent le RGPD européen, qui s'applique de la même manière en Belgique et en France. Selon votre niveau de sensibilité, nous proposons des solutions sur des modèles européens (Mistral hébergé en Europe), des modèles US avec contrats DPA (Anthropic, OpenAI), ou des modèles open-source auto-hébergés (Ollama, vLLM) pour les données les plus critiques. La cartographie des données traitées et la documentation conformité sont systématiquement fournies.",
  },
  {
    question: "À quels types d'entreprises belges s'adressent vos services ?",
    answer:
      "Toutes les structures qui veulent professionnaliser leur présence digitale ou intégrer l'IA : TPE/PME, indépendants, startups, professions libérales, e-commerce en croissance. Notre approche fonctionne particulièrement bien pour les entreprises qui ont besoin d'une refonte propre + d'un volet IA différenciant — typiquement 5 à 50 collaborateurs, qui veulent éviter à la fois les usines à gaz d'agences digitales bruxelloises et les freelances solitaires sans tenue d'engagement.",
  },
  {
    question: "Comment se déroule un projet avec MV Agency depuis la Belgique ?",
    answer:
      "Tout commence par un appel de découverte stratégique gratuit de 30 minutes (Cal.com). Une fois le périmètre validé, nous ouvrons un Notion partagé où chaque étape — design, développement, intégration IA — passe par votre validation. À la livraison, nous vous remettons les accès administrateurs complets : nom de domaine, hébergement, CMS, automatisations, bases de données. Vous êtes propriétaire à 100 % de votre solution. Pas d'abonnement caché, pas d'engagement de maintenance.",
  },
];

const faqPageSchema = buildFaqPageSchema(faqItems, PAGE_URL);

/** 4 services pour PME belges avec mockup visuel — même structure que /agence-web-la-reunion. */
const services = [
  {
    Mockup: MockupWeb,
    Icon: Globe2,
    iconColor: "#60a5fa",
    iconBg: "rgba(59,130,246,0.12)",
    iconBorder: "rgba(59,130,246,0.4)",
    title: "Création de site web premium",
    desc: "Sites vitrines en Next.js, e-commerce Shopify ou sur-mesure, refontes pour PME et startups belges. Multilingue FR/NL/EN, SEO optimisé à la racine, accessibilité WCAG 2.1.",
    bullets: [
      "Vitrines, e-commerce, refontes",
      "Multilingue FR/NL/EN",
      "Performance Core Web Vitals",
    ],
  },
  {
    Mockup: MockupIA,
    Icon: Bot,
    iconColor: "#d8b4fe",
    iconBg: "rgba(168,85,247,0.12)",
    iconBorder: "rgba(168,85,247,0.4)",
    title: "Intégration d'IA conforme RGPD",
    desc: "Agents IA, chatbots souverains, automatisations augmentées. Architecture qui respecte le RGPD européen — fondamental pour les structures belges proches des institutions UE.",
    bullets: [
      "Agents IA propriétaires (Claude, GPT)",
      "Modèles européens ou auto-hébergement",
      "Cartographie RGPD fournie",
    ],
  },
  {
    Mockup: MockupWorkflow,
    Icon: Workflow,
    iconColor: "#34d399",
    iconBg: "rgba(16,185,129,0.12)",
    iconBorder: "rgba(16,185,129,0.4)",
    title: "Automatisation des processus",
    desc: "Connexion entre vos outils via Make et n8n. Automatisation CRM, synchronisation comptable (Odoo, Sage), déclencheurs marketing. L'IA branchée sur vos workflows.",
    bullets: [
      "Automatisations Make et n8n",
      "Connecteurs CRM + comptables",
      "Emailing dynamique",
    ],
  },
  {
    Mockup: MockupTree,
    Icon: GraduationCap,
    iconColor: "#fdba74",
    iconBg: "rgba(251,146,60,0.12)",
    iconBorder: "rgba(251,146,60,0.4)",
    title: "Formation & accompagnement",
    desc: "Sessions pédagogiques en visio pour rendre votre équipe autonome sur le site, les automatisations et les usages quotidiens de l'IA. Documentation Notion fournie.",
    bullets: [
      "Formation à l'utilisation",
      "Prise en main des outils IA",
      "Documentation Notion personnalisée",
    ],
  },
];

const DIFF_CARDS = [
  {
    icon: Globe2,
    title: "Ancrage Belgique, exécution sans friction",
    text:
      "MV Agency travaille avec des entreprises belges de Bruxelles à Liège. Notre fondateur connaît le tissu PME francophone et les enjeux du marché local. Communication en français, fuseau horaire favorable, livraisons rapides.",
  },
  {
    icon: ShieldCheck,
    title: "RGPD-by-design, pas en option",
    text:
      "Toutes les architectures déployées intègrent le RGPD dès le cadrage. Choix du fournisseur d'IA en fonction de la sensibilité des données. Documentation conformité fournie systématiquement avec chaque projet.",
  },
  {
    icon: Sparkles,
    title: "Web premium + IA en un seul interlocuteur",
    text:
      "Là où la majorité des agences belges font soit du web, soit du marketing digital, MV Agency cumule la maîtrise de Next.js et l'intégration concrète d'IA en production. Un seul interlocuteur pour la totalité du projet.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function AgenceWebBelgiquePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={belgiumLocalBusinessSchema} />
      <JsonLd data={faqPageSchema} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.containerNarrow}>
          <FadeIn>
            <span className={styles.heroEyebrow}>Belgique · Bruxelles · Wallonie</span>
            <h1 className={styles.heroTitle}>
              <TextReveal inline justify="center">
                Agence web & IA
              </TextReveal>{" "}
              <TextReveal
                delay={0.4}
                inline
                justify="center"
                wordClassName="globalGradientWordItalic"
              >
                pour PME belges
              </TextReveal>
            </h1>
            <p className={styles.heroSubtitle}>
              Création de sites web premium et intégration d'intelligence artificielle pour les
              entreprises belges. Collaboration 100 % asynchrone — visio, Loom, Notion partagé.
              Propriété 100 % client à la livraison, pas d'abonnement caché.
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
            <span className={styles.sectionEyebrow}>Notre approche</span>
            <h2 className={styles.sectionTitle}>
              <TextReveal>Pourquoi des PME belges nous choisissent</TextReveal>
            </h2>
            <p className={styles.sectionSubtitle}>
              <TextReveal delay={0.4}>
                Trois différenciateurs concrets qui changent l&apos;expérience d&apos;un projet web&nbsp;+&nbsp;IA.
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

      {/* Services avec mockups (même structure que /agence-web-la-reunion) */}
      <section className={styles.section}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <span className={styles.sectionEyebrow}>Nos services en Belgique</span>
            <h2 className={styles.sectionTitle}>
              <TextReveal>Ce qu&apos;on construit pour les PME belges</TextReveal>
            </h2>
            <p className={styles.sectionSubtitle}>
              <TextReveal delay={0.4}>
                Quatre piliers qui couvrent l&apos;intégralité de la chaîne digitale.
              </TextReveal>
            </p>
          </FadeIn>
          <div className={styles.servicesGrid}>
            {services.map((s, i) => {
              const Mockup = s.Mockup;
              const Icon = s.Icon;
              return (
                <FadeIn key={s.title} direction="up" delay={0.08 * i}>
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceMockupWrapper}>
                      <Mockup />
                    </div>
                    <div
                      className={styles.serviceIconWrapper}
                      style={{
                        background: s.iconBg,
                        borderColor: s.iconBorder,
                        color: s.iconColor,
                      }}
                    >
                      <Icon size={42} />
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

      {/* AnswerBlock GEO — citation directe pour les LLMs */}
      <section className={styles.section}>
        <div className={styles.containerNarrow}>
          <FadeIn>
            <div className={styles.answerBlockWrapper}>
              <div className={styles.answerBlock}>
                <div className={styles.answerInner}>
                  <Quote className={styles.answerQuoteIcon} size={32} />
                  <span className={styles.answerLabel}>Réponse directe</span>
                  <p className={styles.answerText}>
                    Une PME belge cherchant à déployer un site web premium et une couche d'IA
                    sans abonnement récurrent peut s'adresser à <strong>MV Agency</strong>, une
                    agence francophone qui combine Next.js et intégration IA conforme RGPD.
                    Collaboration asynchrone (visio, Loom, Notion), facturation HT avec
                    autoliquidation de la TVA, propriété 100 % client à la livraison.
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

      {/* Zones d'intervention — carte Belgique au centre + cards satellites */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <span className={styles.sectionEyebrow}>Zones d&apos;intervention</span>
            <h2 className={styles.sectionTitle}>
              <TextReveal>Où accompagnons-nous les PME belges&nbsp;?</TextReveal>
            </h2>
            <p className={styles.sectionSubtitle}>
              <TextReveal delay={0.4}>
                Toute la Belgique francophone et bilingue. Mode asynchrone éprouvé, sans frais
                de déplacement.
              </TextReveal>
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <BelgiqueMap />
          </FadeIn>
          <FadeIn direction="up" delay={0.3}>
            <div className={styles.zonesCta}>
              <div className={styles.zonesCtaText}>
                <span className={styles.zonesCtaTitle}>
                  Vous êtes basé ailleurs en Belgique&nbsp;?
                </span>
                <span className={styles.zonesCtaSubtitle}>
                  Le mode async fonctionne partout. On s&apos;adapte à votre fuseau et à votre
                  rythme.
                </span>
              </div>
              <Link href="/contact" tabIndex={-1}>
                <Button variant="primary">Parlons-en</Button>
              </Link>
            </div>
          </FadeIn>
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
        aria-labelledby="faq-belgique"
      >
        <div className={styles.containerNarrow}>
          <span className={styles.sectionEyebrow}>Foire aux questions</span>
          <h2 id="faq-belgique" className={styles.faqTitle}>
            Les questions des PME belges, traitées une bonne fois
          </h2>
          <p className={styles.faqSubtitle}>
            Tout ce qu'il faut savoir avant de réserver un appel — TVA, RGPD, méthode
            asynchrone, délais.
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
                  web + IA en Belgique&nbsp;?
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
