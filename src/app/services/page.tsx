import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Metadata } from 'next';
import { FaCheck } from 'react-icons/fa';
import styles from './Services.module.css';
import { FeaturesGrid } from '@/components/ui/FeaturesGrid';
import { MockupWeb } from '@/components/ui/mockups/MockupWeb';
import { MockupWorkflow } from '@/components/ui/mockups/MockupWorkflow';
import { MockupTree } from '@/components/ui/mockups/MockupTree';
import { MockupIA } from '@/components/ui/mockups/MockupIA';
import { MockupEcosystem } from '@/components/ui/mockups/MockupEcosystem';
import { FadeIn } from '@/components/ui/FadeIn';
import { AnimatedTestimonials } from '@/components/ui/AnimatedTestimonials';

export const metadata: Metadata = {
  title: 'Services | MV Agency',
  description: 'Découvrez comment nous propulsons les PME avec le digital et l\'IA.',
};

export default function ServicesPage() {
  return (
    <main style={{ paddingBottom: "4rem" }}>
      {/* S1 — HEADER / HERO SERVICES */}
      <section className={`${styles.section}`} style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', background: 'transparent', marginTop: '6rem' }}>
        <div className={styles.container} style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div className={styles.splitLayout} style={{ alignItems: 'center' }}>
            <div className={styles.col60}>
              <FadeIn direction="up">
                <h1 className={styles.headerTitle} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, textAlign: 'left' }}>
                  Les 4 piliers qui feront passer votre activité à la <span style={{ fontStyle: 'italic', background: 'linear-gradient(90deg, #60a5fa 0%, #ffffff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', paddingRight: '0.1em' }}>vitesse supérieure</span>.
                </h1>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <p className={styles.headerDesc} style={{ margin: '1.5rem 0 0', textAlign: 'left' }}>
                  Une agence qui conçoit, explique et propulse. Pour les professionnels qui veulent des résultats mesurables, pas des slides.
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.3}>
                <div className={styles.ctaActions} style={{ justifyContent: 'flex-start', marginTop: '3rem' }}>
                  <Link href="/contact" tabIndex={-1}>
                    <Button variant="primary">Réserver un appel offert</Button>
                  </Link>
                  <Link href="/offres" tabIndex={-1}>
                    <Button variant="outline">Voir nos packs</Button>
                  </Link>
                </div>
              </FadeIn>
            </div>
            <div className={styles.col40}>
              <FadeIn direction="right" delay={0.4} className="w-full">
                <MockupEcosystem />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* S3 — FEATURES GRID AMORCÉE */}
      <section className={`${styles.section} ${styles.darkBg}`} style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <h3 style={{ textAlign: 'center', fontSize: '1.8rem', color: 'var(--text-light)', marginBottom: '3rem' }}>
              6 leviers pour accélérer votre croissance
            </h3>
            <FeaturesGrid />
          </FadeIn>
        </div>
      </section>

      {/* S2 — CRÉATION WEB (bloc détaillé) */}
      <section className={`${styles.section} ${styles.neutralBg}`}>
        <div className={styles.container}>
          <div className={styles.splitLayout}>
            <div className={styles.col60}>
              <FadeIn direction="left">
                <h2 className={styles.sectionTitle}>Une présence digitale qui marque les esprits</h2>
                <ul className={styles.servicesList}>
                  <li><FaCheck className={styles.checkIcon} /> Sites vitrines ultra-rapides en Next.js, e-commerce, refontes et landing pages de conversion</li>
                   <li><FaCheck className={styles.checkIcon} /> SEO et référencement naturel optimisé à la racine</li>
                  <li><FaCheck className={styles.checkIcon} /> Identité visuelle (Logos animés, charte graphique sur mesure)</li>
                  <li><FaCheck className={styles.checkIcon} /> Design responsive parfait et UX centrée conversion</li>
                </ul>
                
                <div className={styles.pillsContainer}>
                  <span className={styles.pill}>Rapide</span>
                  <span className={styles.pill}>SEO-ready</span>
                  <span className={styles.pill}>Évolutif</span>
                  <span className={styles.pill}>100% propriétaire</span>
                </div>
              </FadeIn>
            </div>
            <div className={styles.col40}>
              <FadeIn direction="right" delay={0.2} className="w-full">
                <MockupWeb />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* S3 — AUTOMATISATION (bloc détaillé) */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container}>
          <div className={styles.splitLayout} style={{ flexDirection: 'row-reverse' }}>
            <div className={styles.col60}>
              <FadeIn direction="right">
                <h2 className={styles.sectionTitle}>L'automatisation au service de votre productivité</h2>
                <ul className={styles.servicesList}>
                  <li><FaCheck className={styles.checkIcon} /> Connexion directe et secrète entre tous vos outils via n8n & Make</li>
                  <li><FaCheck className={styles.checkIcon} /> Automatisation complète de votre CRM et processus de vente</li>
                  <li><FaCheck className={styles.checkIcon} /> Emailing dynamique et trigger d'événements</li>
                </ul>
                <span className={styles.highlightText}>
                  Accessible à tous. Pas besoin d'être technique, on s'occupe de la magie.
                </span>
              </FadeIn>
            </div>
            <div className={styles.col40}>
              <FadeIn direction="left" delay={0.2} className="w-full">
                <MockupWorkflow />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* S3BIS — INTELLIGENCE ARTIFICIELLE (nouveau bloc) */}
      <section className={`${styles.section} ${styles.neutralBg}`}>
        <div className={styles.container}>
          <div className={styles.splitLayout}>
            <div className={styles.col60}>
              <FadeIn direction="left">
                <h2 className={styles.sectionTitle}>L'Intelligence Artificielle intégrée à votre métier</h2>
                <ul className={styles.servicesList}>
                  <li><FaCheck className={styles.checkIcon} /> Déploiement d'agents IA autonomes ultra-spécifiques</li>
                  <li><FaCheck className={styles.checkIcon} /> Connexion aux modèles de langage (LLM, Claude, GPT) sur vos propres données</li>
                  <li><FaCheck className={styles.checkIcon} /> Chatbots de support surhumain pour le service client</li>
                  <li><FaCheck className={styles.checkIcon} /> Génération assistée de contenu SEO et rapports internes</li>
                </ul>
                <span className={styles.highlightText}>
                  La puissance maximale des modèles de langage configurée uniquement pour vos besoins.
                </span>
              </FadeIn>
            </div>
            <div className={styles.col40}>
              <FadeIn direction="right" delay={0.2} className="w-full">
                 <MockupIA />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* S4 — FORMATION & ACCOMPAGNEMENT (bloc détaillé) */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container}>
          <div className={styles.splitLayout} style={{ flexDirection: 'row-reverse' }}>
            <div className={styles.col60}>
              <FadeIn direction="right">
                <h2 className={styles.sectionTitle}>Vous rendre 100% autonome</h2>
                <ul className={styles.servicesList}>
                  <li><FaCheck className={styles.checkIcon} /> <span style={{ color: "var(--text-light)"}}>Formation incluse de base dans tous nos packs</span></li>
                  <li><FaCheck className={styles.checkIcon} /> Vidéos Loom explicatives et archivées pour chaque livrable</li>
                  <li><FaCheck className={styles.checkIcon} /> Bibliothèque de ressources privées dans notre portail client Notion</li>
                </ul>
                <span className={styles.highlightText}>
                  Notre but : Vous repartez 100% autonome, et non pas dépendant de l'agence.
                </span>
              </FadeIn>
            </div>
            <div className={styles.col40}>
              <FadeIn direction="left" delay={0.2} className="w-full">
                <MockupTree />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* NOUVEAU CARROUSEL TÉMOIGNAGES ICI (Entre Autonomie et CTA) */}
      <AnimatedTestimonials
        title="Approuvé par nos clients"
        subtitle="Découvrez comment nous avons accéléré leur croissance."
        testimonials={[
          {
            id: 1,
            name: "Alexandre L.",
            role: "Fondateur",
            company: "Johnny App",
            content:
              "MV a transformé notre idée en app qui convertit. On a pigé chaque ligne de code livrée.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
          },
          {
            id: 2,
            name: "Christophe Marchetti",
            role: "Gérant",
            company: "Pharmacie Les Lataniers",
            content:
              "Un site refondu en 4 semaines. Aujourd'hui, on pilote notre visibilité locale sans dépendre de personne.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
          },
          {
            id: 3,
            name: "Nicolas D.",
            role: "CTO",
            company: "Stark AI",
            content:
              "Intégration IA propre et documentée. L'équipe MV explique au lieu de jargonner.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
          },
        ]}
      />

      {/* S5 — CTA FINAL */}
      <section className={`${styles.section}`} style={{ textAlign: "center", padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 2rem) 4rem clamp(1rem, 5vw, 2rem)", position: 'relative', overflow: 'hidden', background: 'transparent' }}>
        <div className={styles.container} style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn direction="up">
            <h2 className={styles.sectionTitle} style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              Prêt à <span style={{ fontStyle: 'italic', background: 'linear-gradient(90deg, #60a5fa 0%, #ffffff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', paddingRight: '0.1em' }}>booster votre activité</span> ?
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className={styles.headerDesc} style={{ marginBottom: "3rem" }}>
              Prenons un moment pour discuter de votre activité. Nous serons ravis de vous conseiller et de voir comment la tech peut vous libérer l'esprit au quotidien.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.3}>
            <div className={styles.ctaActions}>
              <Link href="/contact" tabIndex={-1}>
                <Button variant="primary">Réserver un appel offert</Button>
              </Link>
              <Link href="/offres" tabIndex={-1}>
                <Button variant="outline">Voir nos packs</Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
