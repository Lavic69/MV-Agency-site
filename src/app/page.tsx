import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import LogoLoop from "@/components/ui/LogoLoop";
import { MockupHub } from "@/components/ui/mockups/MockupHub";

// Sections below-the-fold : code-split pour alléger le bundle critique mobile.
// SSR=true (défaut) pour préserver SEO, seul le JS est différé.
const CircularTestimonials = dynamic(() => import("@/components/ui/circular-testimonials"));
const Accordion = dynamic(() => import("@/components/ui/accordion").then(m => ({ default: m.Accordion })));
const TestimonialsColumn = dynamic(() => import("@/components/ui/testimonials-columns").then(m => ({ default: m.TestimonialsColumn })));
const FeaturesSection = dynamic(() => import("@/components/ui/Features"));
const MagicBento = dynamic(() => import("@/components/ui/MagicBento"));
import { TiltCard } from "@/components/ui/TiltCard";
import { TextReveal } from "@/components/ui/TextReveal";
import { FadeIn } from "@/components/ui/FadeIn";
import { ShieldCheck, Scale, User, Phone, LayoutDashboard, Code2, Rocket, ArrowRight } from 'lucide-react';
import styles from "./Home.module.css";
import { AvailabilityPill } from "@/components/ui/AvailabilityPill";
import { realizations } from "@/data/projects";
import { SiWordpress, SiWebflow, SiNotion, SiShopify, SiOpenai, SiAnthropic, SiReact, SiNextdotjs, SiFigma, SiN8N, SiStripe, SiVercel, SiOdoo, SiJira, SiAsana, SiFramer } from 'react-icons/si';
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, buildFaqPageSchema, OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Création de site web & IA pour PME — MV Agency",
  description:
    "Agence web et intelligence artificielle pour TPE, PME et indépendants. On conçoit votre site, on intègre l'IA dans vos process, on vous forme.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Agence web & IA pour PME — MV Agency",
    description:
      "On conçoit votre site, on intègre l'IA dans vos process, on vous forme. Pour TPE, PME et indépendants qui veulent comprendre, pas juste déléguer.",
    url: SITE_URL,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence web & IA pour PME — MV Agency",
    description:
      "Sites premium et IA intégrée pour PME. On conçoit, on explique, on propulse.",
    images: [OG_IMAGE.url],
  },
};

const techLogos = [
  { node: <SiWordpress size={40} color="#21759b" />, title: "WordPress" },
  { node: <Image src="/tech/woocommerce.svg" width={158} height={32} style={{ height: 32, width: 'auto' }} alt="WooCommerce" />, title: "WooCommerce" },
  { node: <Image src="/tech/prestashop.svg" width={64} height={55} style={{ height: 55, width: 'auto' }} alt="PrestaShop" />, title: "PrestaShop" },
  { node: <SiWebflow size={40} color="#4353FF" />, title: "Webflow" },
  { node: <SiReact size={40} color="#61DAFB" />, title: "React" },
  { node: <SiNextdotjs size={40} color="var(--text-light)" />, title: "Next.js" },
  { node: <SiNotion size={40} color="var(--text-light)" />, title: "Notion" },
  { node: <SiAnthropic size={40} color="#d97757" />, title: "Claude AI" },
  { node: <Image src="/tech/shopify.svg" width={40} height={40} style={{ height: 40, width: 'auto' }} alt="Shopify" />, title: "Shopify" },
  { node: <SiOpenai size={40} color="var(--text-light)" />, title: "ChatGPT" },
  { node: <Image src="/tech/n8n.svg" width={35} height={35} style={{ height: 35, width: 'auto' }} alt="n8n" />, title: "n8n" },
  { node: <SiStripe size={40} color="#635BFF" />, title: "Stripe" },
  { node: <Image src="/tech/figma.svg" width={40} height={40} style={{ height: 40, width: 'auto' }} alt="Figma" />, title: "Figma" },
  { node: <SiVercel size={40} color="var(--text-light)" />, title: "Vercel" },
  { node: <SiOdoo size={55} color="#714B67" />, title: "Odoo" },
  { node: <SiJira size={40} color="#0052CC" />, title: "Jira" },
  { node: <SiAsana size={40} color="#F06A6A" />, title: "Asana" },
  { node: <SiFramer size={40} color="#0055FF" />, title: "Framer" },
  { node: <Image src="/tech/canva.svg" width={40} height={40} style={{ height: 40, width: 'auto' }} alt="Canva" />, title: "Canva" },
  { node: <Image src="/ollama.svg" width={40} height={40} style={{ height: 40, width: 'auto' }} alt="Ollama" />, title: "Ollama" },
];



const expertises = [
  {
    title: "Création de sites web",
    text: "Vitrines, e-commerce, ou plateformes sur-mesure (WordPress, Webflow, Odoo). Design moderne et orienté conversion.",
    icon: "🌐"
  },
  {
    title: "Intelligence Artificielle",
    text: "Mise en place d'agents IA personnalisés, de chatbots intelligents et génération de contenu assistée par IA.",
    icon: "🤖"
  },
  {
    title: "Automatisation no-code",
    text: "Gagnez du temps au quotidien en automatisant vos tâches répétitives (emails, CRM, facturation).",
    icon: "⚡"
  },
  {
    title: "Formation & Accompagnement",
    text: "Un accompagnement humain et pédagogique continu pour vous rendre totalement autonome sur vos outils.",
    icon: "🤝"
  }
];

const testimonials = [
  {
    text: "Grâce à MV Agency, nos patients prennent rendez-vous et déposent leurs ordonnances en ligne en toute sécurité. Un gain de temps inestimable au comptoir.",
    image: "/avatars/client-1.jpg",
    name: "Olivier G.",
    role: "Titulaire, Pharmacie Les Lataniers"
  },
  {
    text: "Une architecture sans faille. MV Agency a construit la structure technique de notre app de coaching sportif et notre magnifique site vitrine. Le rendu final est bluffant.",
    image: "/avatars/client-2.jpg",
    name: "Johnny M.",
    role: "Fondateur, Johnny App"
  },
  {
    text: "Notre nouvelle landing page e-commerce convertit incroyablement bien. Le design est ultra premium, fluide, et valorise parfaitement notre nouvelle gamme de produits.",
    image: "/avatars/client-5.jpg",
    name: "Léa C.",
    role: "Fondatrice, Osan"
  },
  {
    text: "Nous perdions des heures en saisie manuelle. Ils ont automatisé toute la création de nos contrats et la synchronisation CRM. Mon équipe commerciale revit complètement !",
    image: "/avatars/client-4.jpg",
    name: "Thomas V.",
    role: "Directeur Commercial"
  },
  {
    text: "L'agent IA qu'ils ont entraîné sur nos données internes répond à 80% des requêtes clients, 24/7. Notre délai de réponse a fondu et la satisfaction client a explosé.",
    image: "/avatars/client-3.jpg",
    name: "Camille P.",
    role: "CEO E-commerce"
  },
  {
    text: "Création d'un portail interne sur mesure connecté à tous nos flux de données via n8n. Tout est centralisé en temps réel. Un travail de backend chirurgical.",
    image: "/avatars/client-6.jpg",
    name: "Antoine M.",
    role: "Gérant Agence Immo"
  },
  {
    text: "La solution de génération de contenu optimisée pour le SEO, que l'équipe a propulsée par IA pour notre blog, nous permet de ranker sans sacrifier notre temps.",
    image: "/avatars/client-7.jpg",
    name: "Sophie K.",
    role: "Responsable Marketing"
  },
  {
    text: "L'automatisation complète de notre process d'onboarding RH a éliminé toutes nos frictions. Du formulaire initial à la création des accès mails, l'IA pilote tout.",
    image: "/avatars/client-8.jpg",
    name: "Nicolas B.",
    role: "Directeur des Opérations"
  },
  {
    text: "Plus qu'une agence, de vrais architectes tech. Ils ont mis en place des automatisations complexes, tout en formant nos équipes pour nous rendre 100% autonomes.",
    image: "/avatars/client-9.jpg",
    name: "Élodie F.",
    role: "Fondatrice Cabinet Conseil"
  }
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const faqItems = [
  {
    question: "À quels types d'entreprises s'adressent vos services ?",
    answer: "Nous accompagnons un spectre très varié : les **TPE/PME locales** (comme des pharmacies ou cabinets voulant digitaliser leurs processus), les **boutiques E-commerce** cherchant à scaler, les **solopreneurs** voulant multiplier leur productivité via l'IA, et les **Startups** (SaaS, plateformes sur-mesure)."
  },
  {
    question: "Je n'y connais rien en Intelligence Artificielle ou en code, est-ce grave ?",
    answer: "Absolument pas ! L'objectif de MV Agency est de traduire l'innovation technique en valeur ajoutée concrète pour vous. Nous construisons des systèmes complexes, mais nous concevons des interfaces extrêmement simples à utiliser, et nous incluons toujours une formation pédagogique approfondie avec nos clients."
  },
  {
    question: "J'ai déjà un site web. Pouvez-vous uniquement y greffer des automatisations ?",
    answer: "Tout à fait. Si vous disposez déjà d'une base saine (WordPress, Shopify, Webflow, etc.), nous pouvons intervenir uniquement pour y déployer un Assistant IA, automatiser votre gestion de devis/facturation vers votre CRM, ou optimiser l'UI pour booster vos conversions."
  },
  {
    question: "Combien de temps prend généralement un projet avec MV Agency ?",
    answer: "La rapidité dépend de la complexité. Un site vitrine 'conversion' combiné à une automatisation de base prend en moyenne **3 à 4 semaines**. Pour un écosystème IA complet ou une plateforme e-commerce complexe, comptez de **6 à 8 semaines**. Un rétroplanning structuré vous est fourni dès le lancement."
  },
  {
    question: "Comment fonctionnent vos tarifs ?",
    answer: "La transparence est primordiale pour nous. Dès notre appel d'audit offert, nous évaluons vos besoins : nous vous orientons soit vers nos **Packs clairs et fixes**, soit nous vous établissons un devis sur-mesure si vous nécessitez des architectures serveurs et backend hyper complexes."
  },
  {
    question: "Suis-je totalement propriétaire de mon site et de mes outils ?",
    answer: "Oui, à 100 %. Nous facturons notre expertise à la prestation. À la livraison, nous vous remettons les clés et mots de passe administrateurs de votre site web, de vos automatisations logicielle (n8n, Make) et des bases de données. Pas de frais cachés, aucun abonnement 'otage'."
  }
];

const homeFaqSchema = buildFaqPageSchema(faqItems, SITE_URL);

export default function Home() {
  return (
    <main className={styles.main}>
      <JsonLd data={homeFaqSchema} />
      {/* ======================================= */}
      {/* WRAPPER S1 & S2 POUR PARTAGEMENT DU FOND */}
      {/* ======================================= */}
      {/* WRAPPER S1 & S2 POUR PARTAGEMENT DU FOND (FONDATEUR GLOABAL GÉRÉ PAR LAYOUT) */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div className={styles.heroGlow} style={{ top: '45%' }}></div>

        {/* S1: HERO CONTENT */}
        <section className={styles.hero} style={{ background: 'transparent', borderBottom: 'none', minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className={styles.heroContent} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="heroReveal">
              <AvailabilityPill />
            </div>
            <h1 className={`${styles.heroTitle} heroReveal heroRevealDelay1`} style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Un site qui convertit.{" "}
              <span style={{
                display: "inline-block",
                paddingBottom: "0.1em",
                paddingRight: "0.1em"
              }}>
                <span className={styles.heroGradientWord}>Une IA qui vous fait gagner du temps.</span>
              </span>
            </h1>
            <p className={`${styles.heroSubtitle} heroReveal heroRevealDelay2`} style={{ textAlign: "center", maxWidth: "600px", margin: "1.5rem auto" }}>
              Agence web + IA pour les TPE, PME et indépendants qui veulent comprendre, pas juste déléguer. On conçoit, on explique, on propulse.
            </p>
            <div className={`${styles.heroActions} heroReveal heroRevealDelay3`} style={{ justifyContent: 'center' }}>
              <Link href="/contact" tabIndex={-1} style={{ textDecoration: 'none' }}>
                <Button variant="primary">
                  Réserver un appel offert
                </Button>
              </Link>
              <Link href="/offres" tabIndex={-1} style={{ textDecoration: 'none' }}>
                <Button variant="outline">
                  Voir nos packs
                </Button>
              </Link>
            </div>

          {/* Social Proof Pill */}
          <div className="heroReveal heroRevealDelay4" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '3.5rem',
              padding: '8px 20px 8px 8px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.15)',
              backgroundColor: 'rgba(10, 10, 10, 0.65)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              alignSelf: 'center'
            }}>
              <div
                aria-label="Aperçu social proof — 10+ projets livrés"
                role="img"
                style={{ display: 'flex', marginLeft: '4px' }}
              >
                <Image src="/avatars/client-1.jpg" alt="" aria-hidden="true" width={28} height={28} style={{ borderRadius: '8px', border: '1px solid #222', position: 'relative', zIndex: 4, objectFit: 'cover', filter: 'grayscale(0.15) brightness(0.9)', opacity: 0.85 }} />
                <Image src="/avatars/client-2.jpg" alt="" aria-hidden="true" width={28} height={28} style={{ borderRadius: '8px', border: '1px solid #222', position: 'relative', zIndex: 3, marginLeft: '-10px', objectFit: 'cover', filter: 'grayscale(0.15) brightness(0.9)', opacity: 0.85 }} />
                <Image src="/avatars/client-3.jpg" alt="" aria-hidden="true" width={28} height={28} style={{ borderRadius: '8px', border: '1px solid #222', position: 'relative', zIndex: 2, marginLeft: '-10px', objectFit: 'cover', filter: 'grayscale(0.15) brightness(0.9)', opacity: 0.85 }} />
                <Image src="/avatars/client-4.jpg" alt="" aria-hidden="true" width={28} height={28} style={{ borderRadius: '8px', border: '1px solid #222', position: 'relative', zIndex: 1, marginLeft: '-10px', objectFit: 'cover', filter: 'grayscale(0.15) brightness(0.9)', opacity: 0.85 }} />
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', letterSpacing: '0.3px', fontFamily: 'var(--font-body)' }}>
                <strong style={{ color: 'var(--text-light)', fontWeight: '500' }}>10+ projets livrés</strong> · Web & IA
              </p>
            </div>
          </div>
        </section>

        {/* S2 — TECHNOLOGIES (Désormais sous le fond interactif) */}
        <section className={styles.marqueeSection} style={{ padding: '8rem 0 6rem 0', background: 'transparent', position: 'relative', zIndex: 1, flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ textAlign: "center", marginBottom: "4rem", padding: "0 2rem" }}>
              <h2 style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 600,
                fontFamily: "var(--font-heading), sans-serif",
                letterSpacing: "-0.03em",
                color: "var(--text-light)",
                margin: 0
              }}>
                <TextReveal>Partenaires techniques certifiés</TextReveal>
              </h2>
          </div>
          <div style={{ width: '100%' }}>
            {/* @ts-ignore - LogoLoop is a JSX component */}
            <LogoLoop
              logos={techLogos}
              speed={100}
              direction="left"
              logoHeight={50}
              gap={80}
              hoverSpeed={0}
              fadeOut
              fadeOutColor="transparent"
            />
          </div>
        </section>
      </div>

      {/* S3 — NOS RÉALISATIONS */}
      <section className={styles.section} style={{ paddingLeft: 0, paddingRight: 0 }}>
        <FadeIn direction="up">
          <span className="eyebrow" style={{ textAlign: "center" }}>Portfolio</span>
        </FadeIn>
        <h2 className={styles.sectionTitle}>
          <TextReveal>Découvrez nos dernières collaborations</TextReveal>
        </h2>
        <div style={{ maxWidth: "1200px", margin: "0 auto", overflow: "hidden" }}>
           <CircularTestimonials
            testimonials={realizations}
            autoplay={true}
            colors={{
              name: "#f7f7ff",
              designation: "var(--primary)",
              testimony: "#e1e1e1",
              arrowBackground: "rgba(37, 99, 235, 0.15)",
              arrowForeground: "#f7f7ff",
              arrowHoverBackground: "rgba(37, 99, 235, 0.8)",
            }}
            fontSizes={{
              name: "32px",
              designation: "18px",
              quote: "22px",
            }}
          />
        </div>
      </section>

      {/* S4 — NOS EXPERTISES */}
      <section className={styles.section}>
        <FadeIn direction="up">
          <span className="eyebrow" style={{ textAlign: "center" }}>Nos Expertises</span>
        </FadeIn>
        <h2 className={styles.sectionTitle}>
          <TextReveal>Notre savoir-faire, à votre service</TextReveal>
        </h2>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <FeaturesSection />
        </div>
      </section>

      {/* S5 — TÉMOIGNAGES */}
      <section className={styles.section} style={{ overflow: 'hidden' }}>
        <FadeIn direction="up">
          <span className="eyebrow" style={{ textAlign: "center" }}>Avis Clients</span>
        </FadeIn>
        <h2 className={styles.sectionTitle}>
          <TextReveal>Ils travaillent avec nous au quotidien</TextReveal>
        </h2>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          marginTop: "2.5rem",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          maxHeight: "680px",
          overflow: "hidden",
        }}>
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} duration={20} className={styles.hideOnMobile} />
          <TestimonialsColumn testimonials={thirdColumn} duration={17} className={styles.hideOnTablet} />
        </div>
      </section>

      {/* S6 — POURQUOI CHOISIR MV AGENCY */}
      <section className={styles.section} style={{ paddingBottom: '1rem' }}>
        <FadeIn direction="up">
          <span className="eyebrow" style={{ textAlign: "center" }}>Pourquoi nous ?</span>
        </FadeIn>
        <h2 className={styles.sectionTitle} style={{ marginBottom: "2rem" }}>
          <TextReveal>Pourquoi faire appel à nous ?</TextReveal>
        </h2>
        <MagicBento 
          textAutoHide={false}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect={true}
          spotlightRadius={250}
          particleCount={12}
          glowColor="37, 99, 235"
          disableAnimations={false}
        />
      </section>

      {/* BADGES GARANTIE — BANDE DIAGONALE */}
      <div style={{ position: 'relative', margin: '0', zIndex: 1 }}>
        <div style={{
          transform: 'skewY(-3deg)',
          background: 'radial-gradient(ellipse 90% 100% at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 70%), linear-gradient(105deg, #080e1f 0%, #0a1228 50%, #080e1f 100%)',
          padding: '9rem 0',
          position: 'relative',
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 32%, black 68%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 32%, black 68%, transparent 100%)',
        }}>
          {/* Dot grid — style Figma/Linear */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.28) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />

          {/* Contenu counter-skewé */}
          <div style={{ transform: 'skewY(3deg)', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem', maxWidth: '1000px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
              <FadeIn direction="up" delay={0.1}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ color: '#60A5FA', padding: '16px', background: 'var(--bg-deep)', borderRadius: '16px', border: '1px solid rgba(96,165,250,0.3)', boxShadow: '0 0 24px rgba(37,99,235,0.25)' }}>
                    <ShieldCheck size={36} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-light)', fontWeight: 700, letterSpacing: '-0.01em' }}>Satisfait ou remanié</h3>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '240px' }}>Rendu initial pas conforme ? <strong style={{ color: 'var(--text-light)', fontWeight: 600 }}>On itère gratuitement</strong>, sans discussion.</p>
                </div>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ color: '#60A5FA', padding: '16px', background: 'var(--bg-deep)', borderRadius: '16px', border: '1px solid rgba(96,165,250,0.3)', boxShadow: '0 0 24px rgba(37,99,235,0.25)' }}>
                    <Scale size={36} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-light)', fontWeight: 700, letterSpacing: '-0.01em' }}>Pas d&apos;engagement</h3>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '240px' }}><strong style={{ color: 'var(--text-light)', fontWeight: 600 }}>Aucun abonnement caché.</strong> Vous restez libres à tout moment.</p>
                </div>
              </FadeIn>
              <FadeIn direction="up" delay={0.3}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ color: '#60A5FA', padding: '16px', background: 'var(--bg-deep)', borderRadius: '16px', border: '1px solid rgba(96,165,250,0.3)', boxShadow: '0 0 24px rgba(37,99,235,0.25)' }}>
                    <User size={36} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-light)', fontWeight: 700, letterSpacing: '-0.01em' }}>Un seul interlocuteur</h3>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '240px' }}>Du premier appel à la livraison finale, <strong style={{ color: 'var(--text-light)', fontWeight: 600 }}>une seule personne</strong> pilote votre projet.</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>


      {/* S6.5 — COMMENT ÇA MARCHE */}
      <section className={styles.section} style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <FadeIn direction="up">
          <span className="eyebrow" style={{ textAlign: "center" }}>Notre Processus</span>
        </FadeIn>
        <h2 className={styles.sectionTitle}>
          <TextReveal>Comment on travaille avec vous</TextReveal>
        </h2>
        <FadeIn direction="up" delay={0.1}>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '580px', margin: '-2rem auto 4rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
            De l&apos;appel découverte à la livraison, chaque étape est cadrée, transparente et centralisée dans votre espace client <strong style={{ color: 'var(--text-light)' }}>MV Hub</strong>.
          </p>
        </FadeIn>

        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.5rem' }}>
          {[
            {
              num: '01',
              icon: <Phone size={20} />,
              title: 'Appel découverte offert',
              desc: '30 minutes pour comprendre votre activité, vos objectifs et voir si on est le bon fit. Sans engagement.',
              color: '#2563EB',
              highlight: false,
            },
            {
              num: '02',
              icon: <LayoutDashboard size={20} />,
              title: 'Signature & MV Hub',
              desc: 'Dès la signature, votre espace client MV Hub est créé : brief, welcome pack, suivi en direct.',
              color: '#2563EB',
              highlight: true,
            },
            {
              num: '03',
              icon: <Code2 size={20} />,
              title: 'Conception J0–J30',
              desc: 'Design, développement, IA et automatisations. Chaque avancement est visible dans votre Hub.',
              color: '#2563EB',
              highlight: false,
            },
            {
              num: '04',
              icon: <Rocket size={20} />,
              title: 'Livraison & Autonomie',
              desc: 'Formation incluse. Vous repartez 100% propriétaire de vos outils, sans dépendance à l\'agence.',
              color: '#2563EB',
              highlight: false,
            },
          ].map((step, i) => (
            <FadeIn key={i} direction="up" delay={0.1 * i}>
              <TiltCard
                maxTilt={10}
                style={{
                  background: step.highlight ? 'rgba(37,99,235,0.1)' : 'rgba(37,99,235,0.04)',
                  border: `1px solid ${step.highlight ? 'rgba(37,99,235,0.45)' : 'rgba(37,99,235,0.2)'}`,
                  borderRadius: '16px',
                  padding: '2rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {step.highlight && (
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.45)', borderRadius: '9999px', padding: '2px 12px', fontSize: '0.65rem', fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.08em' }}>MV Hub</div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 900, color: 'rgba(255,255,255,0.07)', lineHeight: 1, letterSpacing: '-0.03em' }}>{step.num}</span>
                  <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: `${step.color}22`, border: `1px solid ${step.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.color, flexShrink: 0 }}>
                    {step.icon}
                  </div>
                </div>
                <div style={{ color: 'var(--text-light)', fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.3, fontFamily: 'var(--font-heading)' }}>{step.title}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.65, flex: 1 }}>{step.desc}</div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>

        {/* MockupHub sous les étapes */}
        <FadeIn direction="up" delay={0.4}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem' }}>
            <div className="mockup-hub-gradient-wrapper" style={{ padding: '2px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(37,99,235,0.3) 0%, rgba(139,92,246,0.2) 100%)' }}>
              <MockupHub />
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.6}>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/a-propos" tabIndex={-1} style={{ textDecoration: 'none' }}>
              <Button variant="outline">Découvrir notre méthode complète</Button>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* S7 — FAQ */}
      <section className={styles.section} style={{ paddingBottom: '3rem' }}>
        <FadeIn direction="up">
          <span className="eyebrow" style={{ textAlign: "center" }}>Foire aux questions</span>
        </FadeIn>
        <h2 className={styles.sectionTitle}>
          <TextReveal>Vous avez des questions ? On y répond.</TextReveal>
        </h2>
        <Accordion items={faqItems} />
      </section>

      {/* BADGES GARANTIE — déplacés avant le processus */}

      {/* S8 — GRAND CTA FINAL */}
      <section className={styles.finalCtaSection} style={{ position: 'relative', overflow: 'hidden', paddingTop: '3rem', background: 'transparent' }}>
        <div className={styles.finalCtaGlow} style={{ zIndex: 1 }}></div>
        <div className={styles.finalCtaContent} style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(3rem, 5vw, 5rem) clamp(1.5rem, 5vw, 3rem)', backgroundColor: 'rgba(10, 10, 10, 0.4)', borderRadius: '2rem', border: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center', position: 'relative', zIndex: 2, backdropFilter: 'blur(12px)' }}>
          <FadeIn direction="up">
            <h2 className={styles.finalCtaTitle}>
              <TextReveal inline>Prêt à allier l'excellence du web à la puissance de</TextReveal> <br className={styles.hideOnMobile} />
              <TextReveal delay={1.5} inline wordClassName={styles.ctaGradientWord}>l'intelligence artificielle ?</TextReveal>
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className={styles.finalCtaSubtitle}>
              Discutons ensemble de vos envies et imaginons les solutions idéales pour vous faire gagner un temps précieux. Prenez un moment pour échanger de vive voix, c'est offert et sans engagement.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.4}>
            <div style={{ marginTop: '3rem' }}>
              <Link href="/contact" tabIndex={-1} style={{ textDecoration: 'none' }}>
                <Button variant="primary" style={{ boxShadow: '0 0 30px rgba(37,99,235,0.4)' }}>
                  Réserver un appel offert
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
