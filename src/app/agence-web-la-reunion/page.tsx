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
  Bot,
  Workflow,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { TextReveal } from "@/components/ui/TextReveal";
import { Accordion } from "@/components/ui/accordion";
import { Timeline, type TimelineStep } from "@/components/ui/Timeline";
import LogoLoop from "@/components/ui/LogoLoop";
import { MockupWeb } from "@/components/ui/mockups/MockupWeb";
import { MockupWorkflow } from "@/components/ui/mockups/MockupWorkflow";
import { MockupIA } from "@/components/ui/mockups/MockupIA";
import {
  MobileWebAnim,
  MobileWorkflowAnim,
  MobileIAAnim,
  MobileFormationAnim,
} from "@/components/ui/mockups/MobileServiceAnims";
import { MockupTree } from "@/components/ui/mockups/MockupTree";
import { ProjectMockup } from "@/app/cas-clients/ProjectMockup";
import { SITE_URL, CONTACT_EMAIL, FOUNDER_NAME, buildBreadcrumbSchema, buildFaqPageSchema, type FaqItem, OG_IMAGE } from "@/lib/seo";
import { realizations } from "@/data/projects";
import { ReunionMap } from "./ReunionMap";
import { techLogos } from "@/data/tech-logos";
import styles from "./AgenceReunion.module.css";

/* -------------------------------------------------------------------------- */
/*  Metadata                                                                  */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Agence web & IA à La Réunion (974) pour PME — MV Agency",
  description:
    "Agence web et IA à La Réunion. Sites premium et agents IA pour TPE/PME — Saint-Denis, Saint-Pierre, Saint-Paul, Le Port. Présentiel ou visio.",
  alternates: { canonical: "/agence-web-la-reunion" },
  openGraph: {
    type: "website",
    title: "Agence web & IA à La Réunion (974) — MV Agency",
    description:
      "Création de sites premium et intégration IA pour les PME réunionnaises. Présentiel sur toute l'île ou visio. Pas d'abonnement caché, propriété 100 % client.",
    url: `${SITE_URL}/agence-web-la-reunion`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence web & IA à La Réunion — MV Agency",
    description:
      "Sites web premium et IA pour PME 974. Saint-Denis, Saint-Pierre, Saint-Paul, Le Port. Présentiel ou visio.",
    images: [OG_IMAGE.url],
  },
};

/* -------------------------------------------------------------------------- */
/*  Données                                                                   */
/* -------------------------------------------------------------------------- */

const PAGE_URL = `${SITE_URL}/agence-web-la-reunion`;

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Accueil", url: SITE_URL },
  { name: "Agence web à La Réunion", url: PAGE_URL },
]);

const faqItems: FaqItem[] = [
  {
    question: "Pourquoi choisir une agence web basée à La Réunion ?",
    answer:
      "Une agence ancrée localement comprend les spécificités du tissu économique réunionnais : taille des PME, contraintes logistiques, fuseau horaire (UTC+4), réalité des marchés du Nord, du Sud, de l'Est et de l'Ouest. MV Agency est née à La Réunion et accompagne les entreprises de l'île avec une approche directe — pas de strate intermédiaire entre vous et la personne qui construit votre solution.",
  },
  {
    question: "Combien de temps pour créer un site internet à La Réunion avec MV Agency ?",
    answer:
      "Un site vitrine premium combiné à une automatisation de base prend en moyenne 3 à 4 semaines. Pour un écosystème IA complet ou une plateforme e-commerce sur-mesure, comptez 6 à 8 semaines. Un rétroplanning structuré vous est fourni dès le lancement, avec validation à chaque étape via un espace Notion partagé.",
  },
  {
    question: "Quelles villes de La Réunion couvrez-vous ?",
    answer:
      "Toute l'île. Que votre entreprise soit à Saint-Denis, Saint-Pierre, Saint-Paul, Le Port, Saint-André, Saint-Benoît, Le Tampon, Saint-Louis ou ailleurs, nous intervenons sans frais de déplacement. Les rendez-vous se font en présentiel chez vous ou en visio selon votre préférence — chaque approche a sa pertinence selon la phase du projet.",
  },
  {
    question: "Quelles technologies utilisez-vous pour développer un site ?",
    answer:
      "Nous adaptons la technologie au projet. Pour des sites vitrines simples à mettre à jour, WordPress, Webflow ou Shopify font très bien le travail. Pour des sites haute performance ou des plateformes sur-mesure, nous utilisons des frameworks modernes (Next.js, React). Pour les automatisations, n8n et Make. Pour l'IA, des agents basés sur Claude ou GPT avec une architecture qui garantit la confidentialité de vos données. Le bon choix dépend de votre contexte — c'est ce que nous cadrons ensemble lors de l'appel découverte.",
  },
  {
    question: "Quels types d'entreprises réunionnaises accompagnez-vous ?",
    answer:
      "Toutes les structures qui veulent professionnaliser leur présence digitale ou intégrer l'IA : TPE et PME locales (pharmacies, cabinets, commerces, artisans), boutiques e-commerce, indépendants, startups en SaaS, professions libérales. Nos cas clients vont de la Pharmacie Les Lataniers (e-santé avec prise de rendez-vous IA) à Osan (e-commerce premium).",
  },
  {
    question: "Pouvez-vous intégrer l'IA dans mon entreprise à La Réunion ?",
    answer:
      "Oui, c'est un de nos axes principaux. Nous déployons des agents IA, des chatbots intelligents capables de qualifier les demandes clients 24/7, des automatisations de devis et facturation vers votre CRM, ainsi que de la génération de contenu assistée par IA. L'objectif : libérer du temps opérationnel sans que vous ayez à gérer la moindre infrastructure technique.",
  },
  {
    question: "Comment se déroule un projet avec MV Agency ?",
    answer:
      "Tout commence par un appel de découverte stratégique gratuit de 30 minutes. Une fois le périmètre validé, nous ouvrons un espace Notion partagé où chaque étape — design, développement, intégration IA — passe par votre validation. À la livraison, nous vous remettons les accès administrateurs complets : nom de domaine, hébergement, CMS, automatisations. Vous êtes propriétaire à 100 % de votre solution.",
  },
];

const faqPageSchema = buildFaqPageSchema(faqItems, PAGE_URL);

const reunionLocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${PAGE_URL}#localbusiness-reunion`,
  name: "MV Agency — Agence web & IA à La Réunion",
  url: PAGE_URL,
  description:
    "Agence web et intelligence artificielle basée à La Réunion (974). Création de sites web premium, agents IA et automatisations pour TPE/PME.",
  parentOrganization: { "@id": `${SITE_URL}/#organization` },
  founder: { "@id": `${SITE_URL}/a-propos#person` },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Saint-Denis",
    postalCode: "97400",
    addressRegion: "La Réunion",
    addressCountry: "FR",
  },
  email: CONTACT_EMAIL,
  telephone: "+262693465749",
  priceRange: "€€",
  areaServed: [
    { "@type": "AdministrativeArea", name: "La Réunion" },
    { "@type": "City", name: "Saint-Denis" },
    { "@type": "City", name: "Saint-Pierre" },
    { "@type": "City", name: "Saint-Paul" },
    { "@type": "City", name: "Le Port" },
    { "@type": "City", name: "Saint-André" },
    { "@type": "City", name: "Saint-Benoît" },
    { "@type": "City", name: "Le Tampon" },
  ],
};

/** 6 différenciateurs avec icônes Lucide. Cartes de hauteur identique. */
const differentiators = [
  {
    Icon: Code2,
    title: "Stack moderne et adaptée",
    text: "WordPress, Webflow, Shopify ou frameworks sur-mesure (React, Next.js) — on choisit la bonne technologie pour votre projet, pas l'inverse. Sites rapides, sécurisés, optimisés SEO à la racine.",
  },
  {
    Icon: Sparkles,
    title: "Design haut-de-gamme",
    text: "Identité visuelle, mockups animés, glassmorphism, micro-interactions. Le rendu d'un produit premium, pas d'un template générique.",
  },
  {
    Icon: Brain,
    title: "IA-native, pas vernie",
    text: "Agents IA propriétaires, automatisations n8n et Make, intégrations Claude et GPT. L'IA est dans l'ADN de l'agence, pas un bonus rajouté à la fin.",
  },
  {
    Icon: Globe2,
    title: "Multi-zone",
    text: "MV Agency travaille sur l'île, en Belgique et en France métropolitaine. Vos partenaires hors-département sont gérés sans friction.",
  },
  {
    Icon: GraduationCap,
    title: "Pédagogie incluse",
    text: "Chaque livraison s'accompagne d'une formation pour rendre vos équipes autonomes. On vous explique la mécanique, on ne vous laisse pas dépendant.",
  },
  {
    Icon: ShieldCheck,
    title: "Transparence totale",
    text: "Pas d'abonnement caché. Pas de licence d'utilisation. À la livraison, vous récupérez l'intégralité des accès administrateurs et la propriété de la solution.",
  },
];

/** 4 services contextualisés Réunion, chacun avec un mockup desktop +
 *  une animation mobile dédiée (cohérente avec /services). */
const services = [
  {
    Mockup: MockupWeb,
    MobileAnim: MobileWebAnim,
    title: "Création de site web",
    desc: "Sites vitrines premium, e-commerce, refontes et landing pages de conversion. SEO optimisé à la racine, design responsive sur-mesure, technologie adaptée au projet.",
    bullets: [
      "Vitrines, e-commerce, refontes",
      "Identité visuelle sur-mesure",
      "Performance Core Web Vitals",
    ],
  },
  {
    Mockup: MockupIA,
    MobileAnim: MobileIAAnim,
    title: "Intégration d'IA",
    desc: "Agents IA et chatbots souverains, automatisations augmentées par l'IA, génération de contenu assistée. Architecture qui garantit la confidentialité de vos données.",
    bullets: [
      "Agents IA propriétaires (Claude, GPT)",
      "Chatbots qualifiants 24/7",
      "Architecture de confidentialité",
    ],
  },
  {
    Mockup: MockupWorkflow,
    MobileAnim: MobileWorkflowAnim,
    title: "Automatisation",
    desc: "Connexion entre vos outils via n8n et Make. Automatisation CRM, processus de vente, emailing dynamique, déclencheurs d'événements.",
    bullets: [
      "Automatisations n8n et Make",
      "CRM et processus de vente",
      "Emailing dynamique",
    ],
  },
  {
    Mockup: MockupTree,
    MobileAnim: MobileFormationAnim,
    title: "Formation & accompagnement",
    desc: "Sessions pédagogiques pour rendre vos équipes autonomes sur le site, les outils d'automatisation et les usages quotidiens de l'IA.",
    bullets: [
      "Formation à l'utilisation",
      "Prise en main des outils IA",
      "Documentation personnalisée",
    ],
  },
];

/** Étapes de la méthode adaptées à la Réunion. */
const reunionMethodSteps: TimelineStep[] = [
  {
    num: "01",
    title: "Appel découverte (30 min, offert)",
    text: "Visio ou présentiel sur l'île selon vos préférences. On comprend votre contexte, vos contraintes, vos objectifs. Aucun engagement à ce stade — c'est aussi un moyen de vérifier qu'on s'entend bien avant d'aller plus loin.",
  },
  {
    num: "02",
    title: "Cadrage & devis détaillé",
    text: "Brief écrit, périmètre validé, planning précis. On ouvre un espace Notion partagé où vous suivez l'avancement en temps réel. Le devis arrive sous 48h, sans surprise et sans coûts cachés.",
  },
  {
    num: "03",
    title: "Production & itérations",
    text: "Design, développement, intégration IA et automatisations. Validations à chaque étape via Notion ou rendez-vous physiques selon les besoins. Vous voyez le projet prendre forme, vous gardez la main.",
  },
  {
    num: "04",
    title: "Livraison & autonomie",
    text: "Mise en ligne, transfert complet des accès (domaine, hébergement, CMS, automatisations), formation vidéo et documentation personnalisée. À la fin, vous êtes propriétaire à 100 % et autonome sur votre solution.",
  },
];


/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function AgenceWebLaReunionPage() {
  // Cas clients sélectionnés depuis la data partagée — Pharmacie Les Lataniers (974) + Osan
  const featuredProjects = [
    { ...realizations[0], badge: "974 · E-santé" },
    { ...realizations[2], badge: "E-commerce premium" },
  ];

  return (
    <main style={{ paddingBottom: "0", position: "relative" }}>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={reunionLocalBusinessSchema} />
      <JsonLd data={faqPageSchema} />

      {/* ============================== HERO ============================== */}
      <section className={styles.hero}>
        <span className={`${styles.heroEyebrow} heroReveal`}>Réunion · 974</span>
        <h1 className={`${styles.heroTitle} heroReveal heroRevealDelay1`}>
          Agence web &amp; IA à{" "}
          <span className="globalGradientWordItalic">La Réunion</span>
        </h1>
        <p className={`${styles.heroSubtitle} heroReveal heroRevealDelay2`}>
          Création de sites web premium, agents IA et automatisations pour les TPE et PME
          réunionnaises. Intervention sur toute l'île, en présentiel ou en visio.
        </p>
        <div className={`${styles.heroCtas} heroReveal heroRevealDelay3`}>
          <Link href="/contact" tabIndex={-1}>
            <Button variant="primary">Réserver un appel offert</Button>
          </Link>
          <Link href="/offres" tabIndex={-1}>
            <Button variant="outline">Voir nos packs</Button>
          </Link>
        </div>
      </section>

      {/* ====================== ANSWER BLOCK (résumé GEO) ====================== */}
      <section className={styles.section}>
        <div className={styles.containerNarrow}>
          <FadeIn direction="up">
            <div className={styles.answerBlockWrapper}>
              <blockquote className={styles.answerBlock} aria-label="Résumé">
                <Quote
                  size={64}
                  strokeWidth={1.5}
                  className={styles.answerQuoteIcon}
                  style={{ transform: "rotate(180deg)" }}
                  aria-hidden="true"
                />
                <div className={styles.answerInner}>
                  <span className={styles.answerLabel}>L'essentiel</span>
                  <p className={styles.answerText}>
                    <strong>MV Agency</strong> est une agence web et intelligence artificielle
                    basée à La Réunion (974), fondée par {FOUNDER_NAME}. Nous concevons des sites
                    web premium et intégrons des agents IA, des chatbots souverains et des
                    automatisations pour les TPE, PME et indépendants réunionnais. Nous
                    intervenons sur toute l'île — Saint-Denis, Saint-Pierre, Saint-Paul, Le Port,
                    Saint-André, Saint-Benoît et au-delà — en présentiel ou en visio selon vos
                    préférences. Notre promesse : pas d'abonnement caché, propriété 100&nbsp;%
                    client sur les livrables, accompagnement pédagogique sans jargon. Cas clients
                    récents : Pharmacie Les Lataniers (e-santé avec prise de rendez-vous IA) et
                    Osan (e-commerce premium).
                  </p>
                  <div className={styles.answerSignature}>
                    <span className={styles.answerSignatureName}>Par {FOUNDER_NAME}</span>
                    <span className={styles.answerSignatureSeparator}>·</span>
                    <span>Fondateur</span>
                    <span className={styles.answerSignatureSeparator}>·</span>
                    <span>Mis à jour le 7 mai 2026</span>
                  </div>
                </div>
              </blockquote>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===================== POURQUOI MV AGENCY (différenciateurs) ===================== */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <span className={styles.sectionEyebrow}>Notre approche</span>
            <h2 className={styles.sectionTitle}>
              <TextReveal>Pourquoi MV Agency à La Réunion ?</TextReveal>
            </h2>
            <p className={styles.sectionSubtitle}>
              <TextReveal delay={0.4}>
                Six choix structurants qui définissent notre travail au quotidien.
              </TextReveal>
            </p>
          </FadeIn>
          <div className={styles.diffGrid}>
            {differentiators.map((d, i) => {
              const Icon = d.Icon;
              return (
                <FadeIn key={d.title} direction="up" delay={0.08 * i}>
                  <div className={styles.diffCard}>
                    <div className={styles.diffIcon}>
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <h3 className={styles.diffTitle}>{d.title}</h3>
                    <p className={styles.diffText}>{d.text}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================== SERVICES + MOCKUPS ============================== */}
      <section className={styles.section}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <span className={styles.sectionEyebrow}>Nos services à La Réunion</span>
            <h2 className={styles.sectionTitle}>
              <TextReveal>Quels services proposons-nous aux entreprises réunionnaises ?</TextReveal>
            </h2>
            <p className={styles.sectionSubtitle}>
              <TextReveal delay={0.4}>
                Quatre piliers qui couvrent l'intégralité de la chaîne digitale.
              </TextReveal>
            </p>
          </FadeIn>
          <div className={styles.servicesGrid}>
            {services.map((s, i) => {
              const Mockup = s.Mockup;
              const MobileAnim = s.MobileAnim;
              return (
                <FadeIn key={s.title} direction="up" delay={0.08 * i}>
                  <div className={styles.serviceCard}>
                    {/* Desktop : mockup complexe */}
                    <div className={styles.serviceMockupWrapper}>
                      <Mockup />
                    </div>
                    {/* Mobile : mini-animation dédiée (même style que /services) */}
                    <div className={styles.serviceIconWrapper}>
                      <MobileAnim />
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

      {/* ============================== CAS CLIENTS ============================== */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <span className={styles.sectionEyebrow}>Réalisations</span>
            <h2 className={styles.sectionTitle}>
              <TextReveal>Des projets concrets, à La Réunion et au-delà</TextReveal>
            </h2>
            <p className={styles.sectionSubtitle}>
              <TextReveal delay={0.4}>
                Aperçu de deux cas clients récents qui illustrent notre approche.
              </TextReveal>
            </p>
          </FadeIn>
          <div className={styles.casGrid}>
            {featuredProjects.map((project, i) => (
              <FadeIn key={project.name} direction="up" delay={0.1 * (i + 1)}>
                <article className={styles.casCard}>
                  <div className={styles.casMockupWrapper}>
                    <ProjectMockup
                      desktopSrc={project.src}
                      hasMobile={project.hasMobile}
                      hasWebApp={project.hasWebApp}
                      mobileSrc={project.mobileSrc}
                      webAppSrc={project.webAppSrc}
                      projectName={project.name}
                    />
                  </div>
                  <div className={styles.casCardBody}>
                    <span className={styles.casBadge}>{project.badge}</span>
                    <h3>{project.name}</h3>
                    <p className={styles.casCardDesignation}>{project.designation}</p>
                    <p>{project.quote}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.casCardLink}
                    >
                      Voir le projet en ligne →
                    </a>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/cas-clients" tabIndex={-1}>
              <Button variant="outline">Voir tous nos cas clients</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================== CARTE RÉUNION ============================== */}
      <section className={styles.section}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <span className={styles.sectionEyebrow}>Zones d'intervention</span>
            <h2 className={styles.sectionTitle}>
              <TextReveal>Dans quelles villes intervenons-nous ?</TextReveal>
            </h2>
            <p className={styles.sectionSubtitle}>
              <TextReveal delay={0.4}>
                Toute La Réunion — du Nord au Sud, de l'Est à l'Ouest. Sans frais de déplacement.
              </TextReveal>
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <ReunionMap />
          </FadeIn>
          <FadeIn direction="up" delay={0.3}>
            <div className={styles.zonesCta}>
              <div className={styles.zonesCtaText}>
                <span className={styles.zonesCtaTitle}>
                  Vous êtes basé ailleurs sur l'île&nbsp;?
                </span>
                <span className={styles.zonesCtaSubtitle}>
                  Aucun frais de déplacement, on s'adapte à votre commune.
                </span>
              </div>
              <Link href="/contact" tabIndex={-1}>
                <Button variant="primary">Parlons-en</Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================== NOTRE MÉTHODE (Timeline) ============================== */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <span className={styles.sectionEyebrow}>Notre méthode</span>
            <h2 className={styles.sectionTitle}>
              <TextReveal>Comment se déroule un projet avec MV Agency ?</TextReveal>
            </h2>
            <p className={styles.sectionSubtitle}>
              <TextReveal delay={0.4}>
                Quatre étapes simples, transparentes, où vous gardez la main du début à la fin.
              </TextReveal>
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <Timeline steps={reunionMethodSteps} />
          </FadeIn>
        </div>
      </section>

      {/* ============================== STACK TECH (LogoLoop) ============================== */}
      <section className={styles.section}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <span className={styles.sectionEyebrow}>Stack technique</span>
            <h2 className={styles.sectionTitle}>
              <TextReveal>Avec quels outils travaillons-nous ?</TextReveal>
            </h2>
            <p className={styles.sectionSubtitle}>
              <TextReveal delay={0.4}>
                Une stack moderne, choisie pour la performance, la sécurité et la pérennité.
              </TextReveal>
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <div className={styles.logoLoopWrapper}>
              {/* @ts-ignore - LogoLoop is a JSX component */}
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

      {/* ============================== FAQ ============================== */}
      <section className={`${styles.faqSection} ${styles.darkBg}`} aria-labelledby="faq-reunion">
        <div className={styles.containerNarrow}>
          <FadeIn direction="up">
            <span className={styles.sectionEyebrow}>Foire aux questions</span>
            <h2 id="faq-reunion" className={styles.faqTitle}>
              <TextReveal>Vos questions sur MV Agency à La Réunion</TextReveal>
            </h2>
            <p className={styles.faqSubtitle}>
              <TextReveal delay={0.4}>
                Sept réponses aux questions que se posent les entreprises réunionnaises avant de
                démarrer un projet.
              </TextReveal>
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <Accordion
              items={faqItems.map((i) => ({ question: i.question, answer: i.answer }))}
            />
          </FadeIn>
        </div>
      </section>

      {/* ============================== FINAL CTA ============================== */}
      <section className={styles.section}>
        <div className={styles.containerNarrow}>
          <FadeIn direction="up">
            <div className={styles.finalCta}>
              <h2>
                <TextReveal inline>Discutons de</TextReveal>{" "}
                <TextReveal delay={0.45} inline wordClassName="globalGradientWordItalic">
                  votre projet
                </TextReveal>{" "}
                <TextReveal delay={0.9} inline>
                  à La Réunion
                </TextReveal>
              </h2>
              <p>
                30 minutes offertes pour cadrer ensemble le périmètre, le budget et le calendrier.
                Sans engagement, sans devis surprise.
              </p>
              <div className={styles.finalCtaButtons}>
                <Link href="/contact" tabIndex={-1}>
                  <Button variant="primary">Réserver un appel</Button>
                </Link>
                <Link href="/cas-clients" tabIndex={-1}>
                  <Button variant="outline">Voir nos réalisations</Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
