import Link from "next/link";
import { Button } from "@/components/ui/Button";
import LiquidEther from "@/components/ui/LiquidEther";
import LogoLoop from "@/components/ui/LogoLoop";
import CircularTestimonials from "@/components/ui/circular-testimonials";
import { Accordion } from "@/components/ui/accordion";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import FeaturesSection from "@/components/ui/Features";
import MagicBento from "@/components/ui/MagicBento";
import styles from "./Home.module.css";
import { SiWordpress, SiWebflow, SiNotion, SiShopify, SiOpenai, SiAnthropic } from 'react-icons/si';

const techLogos = [
  { node: <SiWordpress size={40} color="rgba(255,255,255,0.7)" />, title: "WordPress" },
  { node: <SiWebflow size={40} color="rgba(255,255,255,0.7)" />, title: "Webflow" },
  { node: <SiNotion size={40} color="rgba(255,255,255,0.7)" />, title: "Notion" },
  { node: <SiAnthropic size={40} color="rgba(255,255,255,0.7)" />, title: "Claude AI" },
  { node: <SiShopify size={40} color="rgba(255,255,255,0.7)" />, title: "Shopify" },
  { node: <SiOpenai size={40} color="rgba(255,255,255,0.7)" />, title: "ChatGPT" },
];

const realizations = [
  {
    name: "Pharmacie Les Lataniers",
    designation: "Site web santé",
    quote: "Création d'un site web performant avec un système de prise de rendez-vous, dépôt d'ordonnance sécurisé, et un travail SEO en profondeur.",
    link: "https://pharmacieleslataniers.fr",
    src: "/projects/lataniers.png"
  },
  {
    name: "Johnny App",
    designation: "Application & Site Web",
    quote: "Le site plus l'app : conception technique d'une application de coaching sportif et création de sa vitrine web dédiée.",
    link: "https://johnny-site.vercel.app",
    src: "/projects/johnny.png"
  },
  {
    name: "Marque Osan",
    designation: "Landing Page Produit",
    quote: "Développement d'une très belle landing page e-commerce conçue de A à Z pour mettre en avant la gamme de ces produits.",
    link: "https://hosan-one.vercel.app",
    src: "/projects/hosan.png"
  }
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
    text: "MV Agency a complètement transformé notre présence en ligne. L'équipe est très pédagogue et le rendu est juste parfait.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    name: "Marie L.",
    role: "Gérante TPE"
  },
  {
    text: "L'intégration de notre nouveau CRM automatisé a changé la donne. L'équipe a su vulgariser l'outil et nous former de A à Z.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
    name: "Julien D.",
    role: "Consultant Indépendant"
  },
  {
    text: "Des délais respectés et une qualité incroyable. Le site nous rapporte enfin des clients qualifiés en automatique. Merci !",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80",
    name: "Sarah T.",
    role: "Entrepreneuse"
  },
  {
    text: "Cette approche de l'automatisation a révolutionné nos opérations. La plateforme intégrée nous garde productifs, même à distance.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    name: "Thomas V.",
    role: "Directeur Commercial"
  },
  {
    text: "Une collaboration partenariale véritablement unique. On se sent écoutés. Et le chatbot IA répond 24/7 à nos clients !",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    name: "Camille P.",
    role: "Fondatrice Startup"
  },
  {
    text: "Excellent travail sur la refonte de notre site. Une navigation beaucoup plus fluide et des ventes en hausse dès le premier mois.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80",
    name: "Antoine M.",
    role: "Gérant Boutique"
  },
  {
    text: "L'équipe est exceptionnelle et réactive. Ils nous ont parfaitement guidés à travers toute la mise en place de la solution.",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&q=80",
    name: "Sophie K.",
    role: "Avocate"
  },
  {
    text: "En intégrant cette touche d'Intelligence Artificielle à nos processus internes, notre entreprise a pu scaler de manière efficace.",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&q=80",
    name: "Nicolas B.",
    role: "Directeur Marketing"
  },
  {
    text: "Leur formation pédagogique claire a permis à toute mon équipe de prendre en main le nouveau site web sans aucune friction.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    name: "Élodie F.",
    role: "Responsable RH"
  }
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const faqItems = [
  {
    question: "À qui s'adressent vos services ?",
    answer: "Principalement aux TPE, PME, indépendants et professions libérales qui souhaitent professionnaliser leur présence en ligne et gagner du temps grâce à l'automatisation et l'IA, sans se perdre dans le jargon technique."
  },
  {
    question: "Je n'y connais rien en intelligence artificielle, est-ce grave ?",
    answer: "Absolument pas ! C'est justement la force de MV Agency : la pédagogie. Nous nous occupons de l'intégration technique complexe et nous vous expliquons pas-à-pas comment utiliser vos nouveaux outils de manière autonome."
  },
  {
    question: "Quels sont vos tarifs ?",
    answer: "Contrairement aux agences traditionnelles qui fonctionnent sur devis opaques, nous proposons 3 packages progressifs clairs : Fondation, Croissance (le plus populaire) et Performance IA. Le budget s'adapte à vos besoins réels et non l'inverse."
  },
  {
    question: "Suis-je totalement propriétaire de mon site et de mes outils ?",
    answer: "Oui, à 100 %. Dès la livraison du projet, nous vous remettons tous vos accès administrateurs. Vous n'êtes lié à nous par aucun abonnement caché ou contraignant."
  }
];

export default function Home() {
  return (
    <main className={styles.main}>
      {/* ======================================= */}
      {/* WRAPPER S1 & S2 POUR PARTAGEMENT DU FOND */}
      {/* ======================================= */}
      {/* WRAPPER S1 & S2 POUR PARTAGEMENT DU FOND (FONDATEUR GLOABAL GÉRÉ PAR LAYOUT) */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div className={styles.heroGlow} style={{ top: '45%' }}></div>

        {/* S1: HERO CONTENT */}
        <section className={styles.hero} style={{ background: 'transparent', borderBottom: 'none', minHeight: '85vh' }}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
            Votre site web.<br />
            Notre expertise.<br />
            <span className="neon-text" style={{ color: "var(--primary)" }}>L'IA en plus.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Agence digitale spécialisée en création web et intelligence artificielle. On conçoit, on explique, on propulse. Pour TPE, PME et indépendants.
          </p>
          <div className={styles.heroActions}>
            <Link href="/offres" tabIndex={-1} style={{ textDecoration: 'none' }}>
              <Button variant="primary">
                Découvrir nos offres
              </Button>
            </Link>
            <Link href="/a-propos" tabIndex={-1} style={{ textDecoration: 'none' }}>
              <Button variant="outline">
                Voir comment on travaille
              </Button>
            </Link>
          </div>

          {/* Social Proof Pill */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '12px', 
            marginTop: '3.5rem', 
            padding: '6px 20px 6px 8px', 
            borderRadius: '999px', 
            border: '1px solid rgba(255,255,255,0.15)', 
            backgroundColor: 'rgba(10, 10, 10, 0.65)', 
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', marginLeft: '4px' }}>
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80" alt="Client 1" style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #222', position: 'relative', zIndex: 4, objectFit: 'cover' }} />
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" alt="Client 2" style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #222', position: 'relative', zIndex: 3, marginLeft: '-10px', objectFit: 'cover' }} />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Client 3" style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #222', position: 'relative', zIndex: 2, marginLeft: '-10px', objectFit: 'cover' }} />
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Client 4" style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #222', position: 'relative', zIndex: 1, marginLeft: '-10px', objectFit: 'cover' }} />
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#B3B3B3', letterSpacing: '0.3px', fontFamily: 'var(--font-body)' }}>
              Rejoint par <strong style={{ color: '#fff', fontWeight: '500' }}>+50</strong> entrepreneurs.
            </p>
          </div>
          </div>
        </section>

        {/* S2 — TECHNOLOGIES (Désormais sous le fond interactif) */}
        <section className={styles.marqueeSection} style={{ padding: '0 0 3rem 0', background: 'transparent', position: 'relative', zIndex: 1 }}>
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
        </section>
      </div>

      {/* S3 — NOS RÉALISATIONS */}
      <section className={styles.section} style={{ paddingLeft: 0, paddingRight: 0 }}>
        <h2 className={styles.sectionTitle}>Nos réalisations</h2>
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
        <h2 className={styles.sectionTitle}>Nos expertises</h2>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <FeaturesSection />
        </div>
      </section>

      {/* S5 — TÉMOIGNAGES */}
      <section className={styles.section} style={{ overflow: 'hidden' }}>
        <h2 className={styles.sectionTitle}>Ce que nos clients disent de nous</h2>
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
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} duration={32} className={styles.hideOnMobile} />
          <TestimonialsColumn testimonials={thirdColumn} duration={28} className={styles.hideOnTablet} />
        </div>
      </section>

      {/* S6 — POURQUOI CHOISIR MV AGENCY */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle} style={{ marginBottom: "2rem" }}>Pourquoi choisir MV Agency ?</h2>
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

      {/* S7 — FAQ */}
      <section className={styles.section} style={{ paddingBottom: '5rem' }}>
        <h2 className={styles.sectionTitle}>FAQ</h2>
        <Accordion items={faqItems} />
      </section>

      {/* S8 — GRAND CTA FINAL */}
      <section className={styles.finalCtaSection} style={{ position: 'relative', overflow: 'hidden', paddingTop: '5rem', background: 'transparent' }}>
        <div className={styles.finalCtaGlow} style={{ zIndex: 1 }}></div>
        <div className={styles.finalCtaContent} style={{ position: 'relative', zIndex: 2 }}>
          <h2 className={styles.finalCtaTitle}>Prêt à déléguer l'aspect technique tout en accélérant votre croissance ?</h2>
          <p className={styles.finalCtaSubtitle}>Optez pour un site web ultra performant et des processus quotidiens automatisés par l'IA. Prenez rendez-vous pour en discuter de vive voix : c'est 100% offert.</p>
          <div style={{ marginTop: '3rem' }}>
            <Link href="/contact" tabIndex={-1} style={{ textDecoration: 'none' }}>
              <Button variant="primary" style={{ boxShadow: '0 0 30px rgba(37,99,235,0.4)' }}>
                Demander un devis
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
