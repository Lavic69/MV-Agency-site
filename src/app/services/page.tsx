import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Metadata } from 'next';
import { FaCheck } from 'react-icons/fa';
import styles from './Services.module.css';
import { FeaturesGrid } from '@/components/ui/FeaturesGrid';
import { MockupWeb } from '@/components/ui/mockups/MockupWeb';
import { MockupWorkflow } from '@/components/ui/mockups/MockupWorkflow';
import { MockupTree } from '@/components/ui/mockups/MockupTree';
import { FadeIn } from '@/components/ui/FadeIn';

export const metadata: Metadata = {
  title: 'Services | MV Agency',
  description: 'Découvrez comment nous propulsons les PME avec le digital et l\'IA.',
};

export default function ServicesPage() {
  return (
    <main style={{ paddingBottom: "4rem" }}>
      {/* S1 — HEADER / HERO SERVICES */}
      <section className={`${styles.section}`} style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', background: 'transparent' }}>
        <div className={styles.container} style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn direction="up">
            <h1 className={styles.headerTitle}>Comment nous vous accompagnons</h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className={styles.headerDesc}>
              Découvrez comment nous propulsons les PME et professions libérales grâce à 
              l'alliance du web ultra-performant et de l'intelligence artificielle.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className={`${styles.section} ${styles.darkBg}`} style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <FadeIn direction="up">
          <FeaturesGrid />
        </FadeIn>
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
                  <span className={styles.pill}>Next.js / React</span>
                  <span className={styles.pill}>WordPress</span>
                  <span className={styles.pill}>Webflow</span>
                  <span className={styles.pill}>Odoo</span>
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

      {/* S3 — IA & AUTOMATISATION (bloc détaillé) */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container}>
          <div className={styles.splitLayout} style={{ flexDirection: 'row-reverse' }}>
            <div className={styles.col60}>
              <FadeIn direction="right">
                <h2 className={styles.sectionTitle}>L'IA au service de votre productivité</h2>
                <ul className={styles.servicesList}>
                  <li><FaCheck className={styles.checkIcon} /> Chatbots intelligents & agents IA personnalisés</li>
                  <li><FaCheck className={styles.checkIcon} /> Automatisation CRM, emails dynamiques, gestions de formulaires</li>
                  <li><FaCheck className={styles.checkIcon} /> Génération assistée de contenu à la volée</li>
                  <li><FaCheck className={styles.checkIcon} /> Intégration d'IA dans vos processus métier internes</li>
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

      {/* S4 — FORMATION & ACCOMPAGNEMENT (bloc détaillé) */}
      <section className={`${styles.section} ${styles.neutralBg}`}>
        <div className={styles.container}>
          <div className={styles.splitLayout}>
            <div className={styles.col60}>
              <FadeIn direction="left">
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
              <FadeIn direction="right" delay={0.2} className="w-full">
                <MockupTree />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* S5 — CTA FINAL */}
      <section className={`${styles.section}`} style={{ textAlign: "center", padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 2rem) 4rem clamp(1rem, 5vw, 2rem)", position: 'relative', overflow: 'hidden', background: 'transparent' }}>
        <div className={styles.container} style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn direction="up">
            <h2 className={styles.sectionTitle} style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              Prêt à <span style={{ fontStyle: 'italic', background: 'linear-gradient(90deg, #60a5fa 0%, #ffffff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>booster votre activité</span> ?
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className={styles.headerDesc} style={{ marginBottom: "3rem" }}>
              Prenons un moment pour discuter de votre activité. Nous serons ravis de vous conseiller et de voir comment la tech peut vous libérer l'esprit au quotidien.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.3}>
            <div className={styles.ctaActions}>
              <Link href="/offres" tabIndex={-1}>
                <Button variant="primary">Voir nos packs</Button>
              </Link>
              <Link href="/contact" tabIndex={-1}>
                <Button variant="outline">Réserver un appel</Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
