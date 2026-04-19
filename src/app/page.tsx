import Link from "next/link";
import { Button } from "@/components/ui/Button";
import LiquidEther from "@/components/ui/LiquidEther";
import LogoLoop from "@/components/ui/LogoLoop";
import CircularTestimonials from "@/components/ui/circular-testimonials";
import { Accordion } from "@/components/ui/accordion";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import FeaturesSection from "@/components/ui/Features";
import MagicBento from "@/components/ui/MagicBento";
import { TextReveal } from "@/components/ui/TextReveal";
import { FadeIn } from "@/components/ui/FadeIn";
import styles from "./Home.module.css";
import { realizations } from "@/data/projects";
import { SiWordpress, SiWebflow, SiNotion, SiShopify, SiOpenai, SiAnthropic, SiReact, SiNextdotjs, SiFigma, SiN8N, SiStripe, SiVercel, SiOdoo, SiJira, SiAsana, SiFramer } from 'react-icons/si';

const techLogos = [
  { node: <SiWordpress size={40} color="#21759b" />, title: "WordPress" },
  { node: <SiWebflow size={40} color="#4353FF" />, title: "Webflow" },
  { node: <SiReact size={40} color="#61DAFB" />, title: "React" },
  { node: <SiNextdotjs size={40} color="var(--text-light)" />, title: "Next.js" },
  { node: <SiNotion size={40} color="var(--text-light)" />, title: "Notion" },
  { node: <SiAnthropic size={40} color="#d97757" />, title: "Claude AI" },
  { node: <img src="https://svgl.app/library/shopify.svg" style={{ height: 40, width: 'auto' }} alt="Shopify" />, title: "Shopify" },
  { node: <SiOpenai size={40} color="var(--text-light)" />, title: "ChatGPT" },
  { node: <img src="https://svgl.app/library/n8n.svg" style={{ height: 35, width: 'auto' }} alt="n8n" />, title: "n8n" },
  { node: <SiStripe size={40} color="#635BFF" />, title: "Stripe" },
  { node: <img src="https://svgl.app/library/figma.svg" style={{ height: 40, width: 'auto' }} alt="Figma" />, title: "Figma" },
  { node: <SiVercel size={40} color="var(--text-light)" />, title: "Vercel" },
  { node: <SiOdoo size={55} color="#714B67" />, title: "Odoo" },
  { node: <SiJira size={40} color="#0052CC" />, title: "Jira" },
  { node: <SiAsana size={40} color="#F06A6A" />, title: "Asana" },
  { node: <SiFramer size={40} color="#0055FF" />, title: "Framer" },
  { node: <img src="https://svgl.app/library/canva.svg" style={{ height: 40, width: 'auto' }} alt="Canva" />, title: "Canva" },
  { node: <img src="/ollama.svg" style={{ height: 40, width: 'auto' }} alt="Ollama" />, title: "Ollama" },
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
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    name: "Olivier G.",
    role: "Titulaire, Pharmacie Les Lataniers"
  },
  {
    text: "Une architecture sans faille. MV Agency a construit la structure technique de notre app de coaching sportif et notre magnifique site vitrine. Le rendu final est bluffant.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
    name: "Johnny M.",
    role: "Fondateur, Johnny App"
  },
  {
    text: "Notre nouvelle landing page e-commerce convertit incroyablement bien. Le design est ultra premium, fluide, et valorise parfaitement notre nouvelle gamme de produits.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80",
    name: "Léa C.",
    role: "Fondatrice, Osan"
  },
  {
    text: "Nous perdions des heures en saisie manuelle. Ils ont automatisé toute la création de nos contrats et la synchronisation CRM. Mon équipe commerciale revit complètement !",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    name: "Thomas V.",
    role: "Directeur Commercial"
  },
  {
    text: "L'agent IA qu'ils ont entraîné sur nos données internes répond à 80% des requêtes clients, 24/7. Notre délai de réponse a fondu et la satisfaction client a explosé.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    name: "Camille P.",
    role: "CEO E-commerce"
  },
  {
    text: "Création d'un portail interne sur mesure connecté à tous nos flux de données via n8n. Tout est centralisé en temps réel. Un travail de backend chirurgical.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80",
    name: "Antoine M.",
    role: "Gérant Agence Immo"
  },
  {
    text: "La solution de génération de contenu optimisée pour le SEO, que l'équipe a propulsée par IA pour notre blog, nous permet de ranker sans sacrifier notre temps.",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&q=80",
    name: "Sophie K.",
    role: "Responsable Marketing"
  },
  {
    text: "L'automatisation complète de notre process d'onboarding RH a éliminé toutes nos frictions. Du formulaire initial à la création des accès mails, l'IA pilote tout.",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&q=80",
    name: "Nicolas B.",
    role: "Directeur des Opérations"
  },
  {
    text: "Plus qu'une agence, de vrais architectes tech. Ils ont mis en place des automatisations complexes, tout en formant nos équipes pour nous rendre 100% autonomes.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
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
              <TextReveal delay={0.1}>Votre site web.</TextReveal>
              <TextReveal delay={0.2}>Notre expertise.</TextReveal>
              <TextReveal delay={0.3}>
                <span style={{ 
                  background: "linear-gradient(90deg, var(--text-light) 0%, var(--primary) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                  paddingBottom: "0.1em",
                  display: "inline-block"
                }}>L'IA en plus.</span>
              </TextReveal>
            </h1>
            <FadeIn direction="up" delay={0.5}>
              <p className={styles.heroSubtitle}>
                Agence digitale spécialisée en création web et intelligence artificielle. On conçoit, on explique, on propulse. Pour TPE, PME et indépendants.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.6}>
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
            </FadeIn>

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
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', letterSpacing: '0.3px', fontFamily: 'var(--font-body)' }}>
              Rejoint par <strong style={{ color: 'var(--text-light)', fontWeight: '500' }}>+50</strong> entrepreneurs.
            </p>
          </div>
          </div>
        </section>

        {/* S2 — TECHNOLOGIES (Désormais sous le fond interactif) */}
        <section className={styles.marqueeSection} style={{ padding: '8rem 0 6rem 0', background: 'transparent', position: 'relative', zIndex: 1, flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ textAlign: "center", marginBottom: "4rem", padding: "0 2rem" }}>
            <FadeIn direction="up">
              <h3 style={{ 
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)", 
                fontWeight: 600, 
                fontFamily: "var(--font-heading), sans-serif",
                letterSpacing: "-0.03em",
                background: "linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                margin: 0
              }}>
                Les technologies que nous maîtrisons
              </h3>
            </FadeIn>
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
          <h2 className={styles.sectionTitle}>Découvrez nos dernières collaborations</h2>
        </FadeIn>
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
          <h2 className={styles.sectionTitle}>Notre savoir-faire, à votre service</h2>
        </FadeIn>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <FeaturesSection />
        </div>
      </section>

      {/* S5 — TÉMOIGNAGES */}
      <section className={styles.section} style={{ overflow: 'hidden' }}>
        <FadeIn direction="up">
          <h2 className={styles.sectionTitle}>Ils travaillent avec nous au quotidien</h2>
        </FadeIn>
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
        <FadeIn direction="up">
          <h2 className={styles.sectionTitle} style={{ marginBottom: "2rem" }}>Pourquoi faire appel à nous ?</h2>
        </FadeIn>
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
        <FadeIn direction="up">
          <h2 className={styles.sectionTitle}>Vous avez des questions ? On y répond.</h2>
        </FadeIn>
        <Accordion items={faqItems} />
      </section>

      {/* S8 — GRAND CTA FINAL */}
      <section className={styles.finalCtaSection} style={{ position: 'relative', overflow: 'hidden', paddingTop: '5rem', background: 'transparent' }}>
        <div className={styles.finalCtaGlow} style={{ zIndex: 1 }}></div>
        <div className={styles.finalCtaContent} style={{ position: 'relative', zIndex: 2 }}>
          <FadeIn direction="up">
            <h2 className={styles.finalCtaTitle}>
              Prêt à allier l'excellence du web à la puissance de <br className={styles.hideOnMobile} />
              <span style={{ 
                fontStyle: 'italic',
                background: "linear-gradient(90deg, #60a5fa 0%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent"
              }}>l'intelligence artificielle</span> ?
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
                  Demander un devis
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
