import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Sparkles,
  Brain,
  Globe2,
  GraduationCap,
  ShieldCheck,
  Quote,
  MapPin,
  Building2,
  Users,
} from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiVercel,
  SiFigma,
  SiFramer,
  SiWebflow,
  SiWordpress,
  SiStripe,
  SiOdoo,
  SiNotion,
  SiOpenai,
  SiAnthropic,
} from "react-icons/si";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { TextReveal } from "@/components/ui/TextReveal";
import { Accordion } from "@/components/ui/accordion";
import LogoLoop from "@/components/ui/LogoLoop";
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
  title: "Agence web à Bruxelles : sites premium & IA pour PME | MV Agency",
  description:
    "Agence web à Bruxelles. Création de sites internet premium et intégration d'intelligence artificielle pour les PME bruxelloises. Présence locale (Schaerbeek, Ixelles, Etterbeek, Anderlecht), méthode rapide.",
  alternates: { canonical: "/agence-web-bruxelles" },
  openGraph: {
    type: "website",
    title: "Agence web à Bruxelles — MV Agency",
    description:
      "Création de sites web premium et intégration IA pour les PME bruxelloises. Ancrage local, méthode async, propriété 100 % client.",
    url: `${SITE_URL}/agence-web-bruxelles`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence web à Bruxelles — MV Agency",
    description:
      "Sites premium & IA pour PME bruxelloises. Toutes les communes desservies. Async + visio.",
  },
};

/* -------------------------------------------------------------------------- */
/*  Données                                                                   */
/* -------------------------------------------------------------------------- */

const PAGE_URL = `${SITE_URL}/agence-web-bruxelles`;

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Accueil", url: SITE_URL },
  { name: "Agence web en Belgique", url: `${SITE_URL}/agence-web-belgique` },
  { name: "Agence web à Bruxelles", url: PAGE_URL },
]);

const bruxellesLocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${PAGE_URL}#localbusiness-bruxelles`,
  name: "MV Agency — Agence web & IA à Bruxelles",
  url: PAGE_URL,
  description:
    "Agence web et intelligence artificielle ancrée à Bruxelles. Création de sites web premium, agents IA et automatisations pour les PME, ASBL, indépendants et startups bruxellois. Toutes les communes de Bruxelles-Capitale couvertes.",
  parentOrganization: { "@id": `${SITE_URL}/#organization` },
  founder: { "@id": `${SITE_URL}/a-propos#person` },
  email: CONTACT_EMAIL,
  priceRange: "€€",
  areaServed: [
    { "@type": "City", name: "Bruxelles" },
    { "@type": "AdministrativeArea", name: "Région de Bruxelles-Capitale" },
    { "@type": "City", name: "Schaerbeek" },
    { "@type": "City", name: "Ixelles" },
    { "@type": "City", name: "Etterbeek" },
    { "@type": "City", name: "Anderlecht" },
    { "@type": "City", name: "Uccle" },
    { "@type": "City", name: "Saint-Gilles" },
    { "@type": "City", name: "Woluwe-Saint-Lambert" },
    { "@type": "City", name: "Forest" },
    { "@type": "City", name: "Auderghem" },
    { "@type": "City", name: "Molenbeek-Saint-Jean" },
  ],
};

const faqItems: FaqItem[] = [
  {
    question: "Quelle est l'adresse physique de MV Agency à Bruxelles ?",
    answer:
      "MV Agency travaille principalement depuis La Réunion, avec une présence régulière à Bruxelles où le fondateur Victor Marchetti est ancré. Pas de bureau ouvert au public à Bruxelles : les rendez-vous se font soit en visio, soit en présentiel dans un café partenaire (Ixelles ou centre-ville selon votre zone), soit chez vous. Cette structure légère permet de pratiquer des tarifs cohérents avec la qualité d'exécution sans répercuter de loyers parisiens ou bruxellois sur votre facture.",
  },
  {
    question: "Quelles communes de Bruxelles couvrez-vous ?",
    answer:
      "Les 19 communes de la Région de Bruxelles-Capitale, plus le Brabant wallon (Wavre, Louvain-la-Neuve, Nivelles) en extension naturelle. Concrètement : Schaerbeek, Ixelles, Etterbeek, Anderlecht, Uccle, Saint-Gilles, Woluwe-Saint-Lambert, Woluwe-Saint-Pierre, Forest, Auderghem, Molenbeek-Saint-Jean, Jette, Berchem-Sainte-Agathe, Evere, Ganshoren, Koekelberg, Saint-Josse-ten-Noode, Watermael-Boitsfort, et la Ville de Bruxelles centre.",
  },
  {
    question: "À quels types d'entreprises bruxelloises s'adressent vos services ?",
    answer:
      "Tous les profils typiques de Bruxelles : PME et ETI (5-100 collaborateurs), ASBL et associations professionnelles, indépendants et professions libérales (avocats, comptables, consultants), startups en SaaS ou e-commerce, sièges régionaux de groupes, et structures liées aux institutions européennes. Notre approche fonctionne particulièrement bien quand vous avez besoin à la fois d'un site web propre ET d'un volet IA différenciant — combinaison rare sur le marché bruxellois.",
  },
  {
    question: "Pouvez-vous travailler avec une ASBL ou une institution bruxelloise ?",
    answer:
      "Oui. Bruxelles a un tissu associatif et institutionnel très dense (ASBL, fondations, lobbying, think tanks autour des institutions européennes), avec des contraintes spécifiques : multilinguisme FR/NL/EN, conformité accessibilité (WCAG 2.1 AA), gouvernance multi-parties prenantes. Notre stack Next.js + design system permet de livrer des sites multilingues robustes, et nous savons travailler avec des comités de validation — process Notion partagé qui sert de tableau de bord à toutes les parties prenantes.",
  },
  {
    question: "Combien coûte un site internet à Bruxelles avec MV Agency ?",
    answer:
      "Les fourchettes restent cohérentes avec le marché belge : 1 500 à 4 000 € pour un site vitrine premium (3-5 pages, design responsive, SEO de base, formulaire), 4 000 à 8 000 € pour un site avec automatisations et début d'IA (chatbot, génération de contenu assistée), 8 000 à 15 000 € pour une plateforme complète (e-commerce ou app sur-mesure). Le devis exact se cadre en 30 minutes d'appel découverte. Facturation HT avec autoliquidation de la TVA pour les entreprises belges B2B.",
  },
  {
    question: "Comment se passe concrètement un projet à Bruxelles ?",
    answer:
      "Étape 1 : appel de découverte de 30 minutes via Cal.com, en visio ou en présentiel selon votre préférence. Étape 2 : devis cadré sous 48h. Étape 3 : kick-off avec ouverture d'un Notion partagé qui sert de tableau de bord projet. Étape 4 : itérations (design → développement → intégration IA → recette) avec validation à chaque étape. Étape 5 : livraison + formation (présentielle à Bruxelles si vous le souhaitez) + remise des accès admin complets. Délais standards : 3-4 semaines pour un site vitrine + auto, 6-8 semaines pour une plateforme avec IA.",
  },
  {
    question: "Quelle différence avec une grosse agence digitale bruxelloise ?",
    answer:
      "Trois différences pratiques : (1) Vous parlez directement à la personne qui construit votre site, sans strate commerciale ni chef de projet intermédiaire. (2) Tarifs typiquement 30-50 % en dessous des agences full-service bruxelloises à qualité d'exécution équivalente, parce qu'on porte une structure légère. (3) On cumule web premium ET IA — quand la majorité des agences bruxelloises font soit du web, soit du marketing, soit de la data, sans tout intégrer en un livrable cohérent.",
  },
  {
    question: "Est-ce que MV Agency intervient aussi en néerlandais (NL) ?",
    answer:
      "L'échange projet se fait en français ou en anglais. Les livrables peuvent inclure une version NL si vous fournissez la traduction (interne ou prestataire que nous coordonnons). Le site final est multilingue (FR/NL/EN selon votre cible), avec balises hreflang correctes pour le SEO. C'est particulièrement pertinent pour les entreprises actives à Bruxelles qui ciblent à la fois la Wallonie, la Flandre et l'international.",
  },
];

const faqPageSchema = buildFaqPageSchema(faqItems, PAGE_URL);

const SERVICES = [
  {
    icon: Code2,
    title: "Création de site web premium",
    description:
      "Sites vitrines en Next.js, e-commerce Shopify ou sur-mesure pour PME, ASBL et indépendants bruxellois. Multilingue FR/NL/EN selon cible, SEO optimisé à la racine, accessibilité WCAG 2.1.",
  },
  {
    icon: Brain,
    title: "Intégration d'IA conforme RGPD",
    description:
      "Agents IA, chatbots souverains, automatisations augmentées. Choix du fournisseur (Anthropic, OpenAI, modèles européens, auto-hébergement) selon la sensibilité des données — important pour les structures liées aux institutions UE.",
  },
  {
    icon: Sparkles,
    title: "Automatisation & connecteurs",
    description:
      "Make, n8n, Zapier. Connexion CRM (HubSpot, Pipedrive), comptabilité (Odoo), emailing, gestion adhérents pour ASBL. L'IA branchée sur vos workflows existants.",
  },
  {
    icon: GraduationCap,
    title: "Formation & accompagnement",
    description:
      "Sessions pédagogiques en présentiel à Bruxelles ou en visio. Documentation Notion fournie. Pas de dépendance technique : à la livraison, votre équipe est autonome.",
  },
];

const DIFF_CARDS = [
  {
    icon: Building2,
    title: "Ancrage local Bruxelles",
    text:
      "Le fondateur Victor Marchetti est régulièrement présent à Bruxelles. Connaissance du tissu économique bruxellois : PME, ASBL, indépendants, structures liées aux institutions UE, startups SaaS. Rendez-vous présentiels possibles selon disponibilités.",
  },
  {
    icon: ShieldCheck,
    title: "RGPD-by-design + multilinguisme",
    text:
      "Tous les déploiements respectent le RGPD européen et l'accessibilité WCAG 2.1 AA — exigences fréquentes pour les structures bruxelloises. Sites multilingues FR/NL/EN avec balises hreflang correctes pour le SEO international.",
  },
  {
    icon: Sparkles,
    title: "Web premium + IA en un seul interlocuteur",
    text:
      "Là où la majorité des agences bruxelloises sont spécialisées (web OU marketing OU data), MV Agency cumule la maîtrise de Next.js et l'intégration concrète d'IA en production. Un seul interlocuteur, une vision cohérente, livrable unifié.",
  },
];

const COMMUNES = [
  {
    name: "Centre — Ville de Bruxelles",
    description: "Quartier européen, Grand-Place, Sainte-Catherine. PME, sièges, associations.",
  },
  {
    name: "Ixelles & Etterbeek",
    description: "Cabinets, professions libérales, consultants, startups. Forte densité d'indépendants.",
  },
  {
    name: "Schaerbeek & Saint-Josse",
    description: "Tissu PME diversifié, commerces, ASBL, services aux entreprises.",
  },
  {
    name: "Uccle, Forest, Saint-Gilles",
    description: "Cabinets, retail premium, écoles, professions libérales.",
  },
  {
    name: "Woluwe-Saint-Lambert & Saint-Pierre",
    description: "Sièges régionaux, multinationales, PME B2B.",
  },
  {
    name: "Anderlecht & Molenbeek",
    description: "Logistique, industrie légère, e-commerce, startups en croissance.",
  },
  {
    name: "Brabant wallon (extension)",
    description: "Wavre, Louvain-la-Neuve, Nivelles. Pôles tech, universités, sièges B2B.",
  },
];

const STACK_LOGOS = [
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiReact />, title: "React" },
  { node: <SiVercel />, title: "Vercel" },
  { node: <SiFigma />, title: "Figma" },
  { node: <SiFramer />, title: "Framer" },
  { node: <SiWebflow />, title: "Webflow" },
  { node: <SiWordpress />, title: "WordPress" },
  { node: <SiStripe />, title: "Stripe" },
  { node: <SiOdoo />, title: "Odoo" },
  { node: <SiNotion />, title: "Notion" },
  { node: <SiOpenai />, title: "OpenAI" },
  { node: <SiAnthropic />, title: "Anthropic" },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function AgenceWebBruxellesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={bruxellesLocalBusinessSchema} />
      <JsonLd data={faqPageSchema} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.containerNarrow}>
          <FadeIn>
            <span className={styles.heroEyebrow}>Bruxelles · Région-Capitale · Brabant wallon</span>
            <h1 className={styles.heroTitle}>
              <TextReveal inline justify="center">
                Agence web à Bruxelles
              </TextReveal>{" "}
              <TextReveal
                delay={0.4}
                inline
                justify="center"
                wordClassName="globalGradientWordItalic"
              >
                premium + IA
              </TextReveal>
            </h1>
            <p className={styles.heroSubtitle}>
              Création de sites web premium et intégration d'intelligence artificielle pour les
              PME, ASBL et indépendants bruxellois. Toutes les communes de la Région-Capitale
              desservies. Ancrage local, méthode async + visio, propriété 100 % client.
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
          <span className={styles.sectionEyebrow}>Pourquoi MV Agency à Bruxelles</span>
          <h2 className={styles.sectionTitle}>
            Trois différenciateurs concrets sur le marché bruxellois
          </h2>
          <p className={styles.sectionSubtitle}>
            Ce qui change pour une PME, une ASBL ou un indépendant bruxellois quand on travaille
            avec MV plutôt qu'une agence full-service classique.
          </p>

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

      {/* Services */}
      <section className={styles.section}>
        <div className={styles.containerNarrow}>
          <span className={styles.sectionEyebrow}>Nos services à Bruxelles</span>
          <h2 className={styles.sectionTitle}>
            Quatre prestations, livrables clés en main
          </h2>
          <p className={styles.sectionSubtitle}>
            Pas de SaaS d'abonnement caché, pas d'engagement de maintenance forcée. Vous êtes
            propriétaire à 100 % à la livraison.
          </p>

          <div className={styles.diffGrid}>
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <FadeIn key={service.title}>
                  <div className={styles.serviceCard}>
                    <div className={styles.diffIcon}>
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className={styles.diffTitle}>{service.title}</h3>
                    <p className={styles.diffText}>{service.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bruxelles : contexte économique */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.containerNarrow}>
          <FadeIn>
            <div className={styles.answerBlockWrapper}>
              <div className={styles.answerBlock}>
                <div className={styles.answerInner}>
                  <Quote className={styles.answerQuoteIcon} size={32} />
                  <span className={styles.answerLabel}>Bruxelles : le terrain</span>
                  <p className={styles.answerText}>
                    Bruxelles concentre une densité unique d'institutions européennes,
                    multinationales, ASBL, sièges régionaux et indépendants. Cette diversité
                    crée un besoin spécifique : des sites web professionnels capables de gérer
                    le multilinguisme (FR/NL/EN), l'accessibilité, et de plus en plus
                    l'intégration d'IA. MV Agency intervient sur l'ensemble de ces profils
                    avec un livrable unique — site premium + couche IA — pensé dès le cadrage
                    pour respecter les contraintes locales.
                  </p>
                  <div className={styles.answerSignature}>
                    <span className={styles.answerSignatureName}>{FOUNDER_NAME}</span>
                    <span className={styles.answerSignatureSeparator}>·</span>
                    <span>Fondateur, MV Agency · Ancré à Bruxelles</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Communes desservies */}
      <section className={styles.section}>
        <div className={styles.containerNarrow}>
          <span className={styles.sectionEyebrow}>Communes desservies</span>
          <h2 className={styles.sectionTitle}>
            Les 19 communes de Bruxelles-Capitale + Brabant wallon
          </h2>
          <p className={styles.sectionSubtitle}>
            Couverture complète de la Région-Capitale et extension naturelle vers le Brabant
            wallon (Wavre, Louvain-la-Neuve, Nivelles).
          </p>

          <div className={styles.diffGrid}>
            {COMMUNES.map((commune) => (
              <FadeIn key={commune.name}>
                <div className={styles.diffCard}>
                  <div className={styles.diffIcon}>
                    <MapPin size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.diffTitle}>{commune.name}</h3>
                  <p className={styles.diffText}>{commune.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stack technique */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.containerNarrow}>
          <span className={styles.sectionEyebrow}>Stack technique</span>
          <h2 className={styles.sectionTitle}>
            Les outils déployés pour les projets bruxellois
          </h2>
          <p className={styles.sectionSubtitle}>
            Une sélection éprouvée, choisie pour la maintenabilité, la performance et la
            propriété client.
          </p>

          <div className={styles.logoLoopWrapper}>
            <LogoLoop logos={STACK_LOGOS} speed={50} logoHeight={48} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className={`${styles.faqSection} ${styles.darkBg}`}
        aria-labelledby="faq-bruxelles"
      >
        <div className={styles.containerNarrow}>
          <span className={styles.sectionEyebrow}>Foire aux questions</span>
          <h2 id="faq-bruxelles" className={styles.faqTitle}>
            Les questions des PME, ASBL et indépendants bruxellois
          </h2>
          <p className={styles.faqSubtitle}>
            Tarifs, présentiel, multilinguisme, ASBL, communes — les réponses précises avant
            de réserver l'appel.
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
              <h2>Prêt à lancer votre projet à Bruxelles ?</h2>
              <p>
                30 minutes en visio ou en présentiel à Bruxelles pour cadrer le périmètre, le
                budget et le rétroplanning. Sans engagement, sans pitch commercial.
              </p>
              <div className={styles.finalCtaButtons}>
                <Link href="/contact">
                  <Button variant="primary">Réserver un appel découverte</Button>
                </Link>
                <Link href="/agence-web-belgique">
                  <Button variant="outline">Voir la page Belgique</Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
