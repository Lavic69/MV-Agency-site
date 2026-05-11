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
import {
  MobileWebAnim,
  MobileWorkflowAnim,
  MobileIAAnim,
  MobileFormationAnim,
} from '@/components/ui/mockups/MobileServiceAnims';
import { FadeIn } from '@/components/ui/FadeIn';
import { TextReveal } from '@/components/ui/TextReveal';
import { AnimatedTestimonials } from '@/components/ui/AnimatedTestimonials';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL, servicesSchemas, buildBreadcrumbSchema } from '@/lib/seo';
import { BlogPreview } from '@/components/ui/BlogPreview';
import { ShieldCheck, Scale, User, Globe2, Workflow, Bot, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services | MV Agency',
  description: 'Découvrez comment nous propulsons les PME avec le digital et l\'IA.',
  alternates: { canonical: '/services' },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Accueil', url: SITE_URL },
  { name: 'Services', url: `${SITE_URL}/services` },
]);

export default function ServicesPage() {
  return (
    <main style={{ paddingBottom: "4rem" }}>
      {servicesSchemas.map((schema) => (
        <JsonLd key={schema['@id']} data={schema} />
      ))}
      <JsonLd data={breadcrumbSchema} />
      {/* S1 — HEADER / HERO SERVICES */}
      <section className={`${styles.section} ${styles.heroServices}`} style={{ display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', background: 'transparent', marginTop: '6rem' }}>
        <div className={styles.container} style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          {/* Desktop : splitLayout original — H1 left, mockup right */}
          <div className={styles.desktopOnly}>
            <div className={styles.splitLayout} style={{ alignItems: 'center' }}>
              <div className={styles.col60}>
                <FadeIn direction="up">
                  <h1 className={styles.headerTitle} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, textAlign: 'left' }}>
                    <TextReveal inline justify="flex-start">Les 4 piliers qui feront passer votre activité à la</TextReveal>{' '}
                    <TextReveal delay={1.35} inline justify="flex-start" wordClassName="globalGradientWordItalic">vitesse supérieure</TextReveal>
                  </h1>
                </FadeIn>
                <FadeIn direction="up" delay={0.2}>
                  <p className={styles.headerDesc} style={{ margin: '1.5rem 0 0', textAlign: 'left' }}>
                    <TextReveal delay={1.8} inline justify="flex-start">Une agence qui conçoit, explique et propulse. Pour les professionnels qui veulent des résultats mesurables, pas des slides.</TextReveal>
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

          {/* Mobile : H1 centré + description + CTAs + grid 2×2 piliers */}
          <div className={styles.mobileOnly}>
            <FadeIn direction="up">
              <h1 className={styles.headerTitle} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, textAlign: 'center' }}>
                <TextReveal inline>Les 4 piliers qui feront passer votre activité à la</TextReveal>{' '}
                <TextReveal delay={1.35} inline wordClassName="globalGradientWordItalic">vitesse supérieure</TextReveal>
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <p className={styles.headerDesc} style={{ margin: '1.5rem 0 0', textAlign: 'center' }}>
                <TextReveal delay={1.8} inline>Une agence qui conçoit, explique et propulse. Pour les professionnels qui veulent des résultats mesurables, pas des slides.</TextReveal>
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
              <div className={styles.ctaActions} style={{ justifyContent: 'center', marginTop: '3rem' }}>
                <Link href="/contact" tabIndex={-1}>
                  <Button variant="primary">Réserver un appel offert</Button>
                </Link>
                <Link href="/offres" tabIndex={-1}>
                  <Button variant="outline">Voir nos packs</Button>
                </Link>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.4}>
              <div className={styles.heroPillarsGrid} style={{ marginTop: '2.5rem' }}>
                <div className={styles.heroPillarItem}>
                  <div className={styles.heroPillarIcon} style={{ background: 'rgba(59,130,246,0.12)', borderColor: 'rgba(59,130,246,0.4)', color: '#60a5fa' }}>
                    <Globe2 size={22} />
                  </div>
                  <span className={styles.heroPillarLabel}>Développement Web</span>
                </div>
                <div className={styles.heroPillarItem}>
                  <div className={styles.heroPillarIcon} style={{ background: 'rgba(168,85,247,0.12)', borderColor: 'rgba(168,85,247,0.4)', color: '#d8b4fe' }}>
                    <Bot size={22} />
                  </div>
                  <span className={styles.heroPillarLabel}>Intelligence Artificielle</span>
                </div>
                <div className={styles.heroPillarItem}>
                  <div className={styles.heroPillarIcon} style={{ background: 'rgba(16,185,129,0.12)', borderColor: 'rgba(16,185,129,0.4)', color: '#34d399' }}>
                    <Workflow size={22} />
                  </div>
                  <span className={styles.heroPillarLabel}>Automatisation</span>
                </div>
                <div className={styles.heroPillarItem}>
                  <div className={styles.heroPillarIcon} style={{ background: 'rgba(251,146,60,0.12)', borderColor: 'rgba(251,146,60,0.4)', color: '#fdba74' }}>
                    <GraduationCap size={22} />
                  </div>
                  <span className={styles.heroPillarLabel}>Formation & Autonomie</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* S3 — FEATURES GRID AMORCÉE */}
      <section className={`${styles.section} ${styles.darkBg}`} style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <span className="eyebrow" style={{ textAlign: "center" }}>Notre Écosystème</span>
            <h3 style={{ textAlign: 'center', fontSize: '1.8rem', color: 'var(--text-light)', marginBottom: '3rem' }}>
              <TextReveal>6 leviers pour accélérer votre croissance</TextReveal>
            </h3>
            <FeaturesGrid />
          </FadeIn>
        </div>
      </section>

      {/* S2 — CRÉATION WEB (bloc détaillé) */}
      <section className={`${styles.section} ${styles.neutralBg}`}>
        <div className={styles.container}>
          {/* Desktop: layout split text+mockup intact */}
          <div className={styles.desktopOnly}>
            <div className={styles.splitLayout}>
              <div className={styles.col60}>
                <FadeIn direction="left">
                  <span className="eyebrow" style={{ textAlign: "center" }}>Création Web</span>
                  <h2 className={styles.sectionTitle}>
                    <TextReveal>Une présence digitale qui marque les esprits</TextReveal>
                  </h2>
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
          {/* Mobile: card avec animation web + texte + bullets */}
          <div className={styles.mobileOnly}>
            <FadeIn direction="up">
              <div className={styles.mobileServiceCard}>
                <MobileWebAnim />
                <span className={styles.mobileServiceEyebrow}>Création Web</span>
                <h2 className={styles.mobileServiceTitle}>Une présence digitale qui marque les esprits</h2>
                <ul className={styles.mobileServiceBullets}>
                  <li><FaCheck size={14} /><span>Sites vitrines, e-commerce, refontes et landing pages de conversion</span></li>
                  <li><FaCheck size={14} /><span>SEO et référencement naturel optimisé à la racine</span></li>
                  <li><FaCheck size={14} /><span>Identité visuelle (logos animés, charte graphique sur mesure)</span></li>
                  <li><FaCheck size={14} /><span>Design responsive parfait et UX centrée conversion</span></li>
                </ul>
                <div className={styles.mobileServicePills}>
                  <span>Rapide</span>
                  <span>SEO-ready</span>
                  <span>Évolutif</span>
                  <span>100% propriétaire</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* S3 — AUTOMATISATION (bloc détaillé) */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container}>
          {/* Desktop */}
          <div className={styles.desktopOnly}>
            <div className={styles.splitLayout} style={{ flexDirection: 'row-reverse' }}>
              <div className={styles.col60}>
                <FadeIn direction="right">
                  <span className="eyebrow" style={{ textAlign: "center" }}>Automatisation</span>
                  <h2 className={styles.sectionTitle}>
                    <TextReveal>L'automatisation au service de votre productivité</TextReveal>
                  </h2>
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
          {/* Mobile */}
          <div className={styles.mobileOnly}>
            <FadeIn direction="up">
              <div className={styles.mobileServiceCard}>
                <MobileWorkflowAnim />
                <span className={styles.mobileServiceEyebrow}>Automatisation</span>
                <h2 className={styles.mobileServiceTitle}>L'automatisation au service de votre productivité</h2>
                <ul className={styles.mobileServiceBullets}>
                  <li><FaCheck size={14} /><span>Connexion directe et secrète entre tous vos outils via n8n & Make</span></li>
                  <li><FaCheck size={14} /><span>Automatisation complète de votre CRM et processus de vente</span></li>
                  <li><FaCheck size={14} /><span>Emailing dynamique et trigger d'événements</span></li>
                </ul>
                <span className={styles.mobileServiceHighlight}>
                  Accessible à tous. Pas besoin d'être technique, on s'occupe de la magie.
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* BANDE GARANTIE — entre Automatisation et Agents IA */}
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
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.28) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
          <div style={{ transform: 'skewY(3deg)', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem', maxWidth: '1000px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
              <FadeIn direction="up" delay={0.1}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ color: '#60A5FA', padding: '16px', background: '#0d1628', borderRadius: '14px', border: '1px solid rgba(96,165,250,0.3)', boxShadow: '0 0 24px rgba(37,99,235,0.25)' }}><ShieldCheck size={36} /></div>
                  <h4 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-light)', fontWeight: 700, letterSpacing: '-0.01em' }}>Satisfait ou remanié</h4>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '240px' }}>Rendu initial pas conforme ? <strong style={{ color: 'var(--text-light)', fontWeight: 600 }}>On itère gratuitement</strong>, sans discussion.</p>
                </div>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ color: '#60A5FA', padding: '16px', background: '#0d1628', borderRadius: '14px', border: '1px solid rgba(96,165,250,0.3)', boxShadow: '0 0 24px rgba(37,99,235,0.25)' }}><Scale size={36} /></div>
                  <h4 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-light)', fontWeight: 700, letterSpacing: '-0.01em' }}>Pas d&apos;engagement</h4>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '240px' }}><strong style={{ color: 'var(--text-light)', fontWeight: 600 }}>Aucun abonnement caché.</strong> Vous restez libres à tout moment.</p>
                </div>
              </FadeIn>
              <FadeIn direction="up" delay={0.3}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ color: '#60A5FA', padding: '16px', background: '#0d1628', borderRadius: '14px', border: '1px solid rgba(96,165,250,0.3)', boxShadow: '0 0 24px rgba(37,99,235,0.25)' }}><User size={36} /></div>
                  <h4 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--text-light)', fontWeight: 700, letterSpacing: '-0.01em' }}>Un seul interlocuteur</h4>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '240px' }}>Du premier appel à la livraison finale, <strong style={{ color: 'var(--text-light)', fontWeight: 600 }}>une seule personne</strong> pilote votre projet.</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      {/* S3BIS — INTELLIGENCE ARTIFICIELLE (nouveau bloc) */}
      <section className={`${styles.section} ${styles.neutralBg}`}>
        <div className={styles.container}>
          {/* Desktop */}
          <div className={styles.desktopOnly}>
            <div className={styles.splitLayout}>
              <div className={styles.col60}>
                <FadeIn direction="left">
                  <span className="eyebrow" style={{ textAlign: "center" }}>Agents IA</span>
                  <h2 className={styles.sectionTitle}>
                    <TextReveal>L'Intelligence Artificielle intégrée à votre métier</TextReveal>
                  </h2>
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
          {/* Mobile */}
          <div className={styles.mobileOnly}>
            <FadeIn direction="up">
              <div className={styles.mobileServiceCard}>
                <MobileIAAnim />
                <span className={styles.mobileServiceEyebrow}>Agents IA</span>
                <h2 className={styles.mobileServiceTitle}>L'Intelligence Artificielle intégrée à votre métier</h2>
                <ul className={styles.mobileServiceBullets}>
                  <li><FaCheck size={14} /><span>Déploiement d'agents IA autonomes ultra-spécifiques</span></li>
                  <li><FaCheck size={14} /><span>Connexion aux modèles de langage (Claude, GPT) sur vos propres données</span></li>
                  <li><FaCheck size={14} /><span>Chatbots de support surhumain pour le service client</span></li>
                  <li><FaCheck size={14} /><span>Génération assistée de contenu SEO et rapports internes</span></li>
                </ul>
                <span className={styles.mobileServiceHighlight}>
                  La puissance maximale des modèles de langage configurée uniquement pour vos besoins.
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* S4 — FORMATION & ACCOMPAGNEMENT (bloc détaillé) */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container}>
          {/* Desktop */}
          <div className={styles.desktopOnly}>
          <div className={styles.splitLayout} style={{ flexDirection: 'row-reverse' }}>
            <div className={styles.col60}>
              <FadeIn direction="right">
                <span className="eyebrow" style={{ textAlign: "center" }}>Formation & Accompagnement</span>
                <h2 className={styles.sectionTitle}>
                  <TextReveal>Vous rendre 100% autonome</TextReveal>
                </h2>
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
          {/* Mobile */}
          <div className={styles.mobileOnly}>
            <FadeIn direction="up">
              <div className={styles.mobileServiceCard}>
                <MobileFormationAnim />
                <span className={styles.mobileServiceEyebrow}>Formation & Accompagnement</span>
                <h2 className={styles.mobileServiceTitle}>Vous rendre 100% autonome</h2>
                <ul className={styles.mobileServiceBullets}>
                  <li><FaCheck size={14} /><span>Formation incluse de base dans tous nos packs</span></li>
                  <li><FaCheck size={14} /><span>Vidéos Loom explicatives et archivées pour chaque livrable</span></li>
                  <li><FaCheck size={14} /><span>Bibliothèque de ressources privées dans notre portail client Notion</span></li>
                </ul>
                <span className={styles.mobileServiceHighlight}>
                  Notre but : Vous repartez 100% autonome, pas dépendant de l'agence.
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* NOUVEAU CARROUSEL TÉMOIGNAGES ICI (Entre Autonomie et CTA) */}
      <FadeIn direction="up">
        <div style={{ textAlign: "center", marginBottom: "-4rem", position: "relative", zIndex: 2 }}>
          <span className="eyebrow" style={{ display: "inline-block" }}>Avis Clients</span>
        </div>
      </FadeIn>
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

      {/* S4.5 — BLOG INSIGHTS */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 5vw, 2rem)', background: 'transparent' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeIn direction="up">
            <span className="eyebrow" style={{ textAlign: 'center' }}>Blog & Ressources</span>
            <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: 'var(--text-light)', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em', marginBottom: '3rem' }}>
              <TextReveal>Approfondissez nos méthodes</TextReveal>
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <BlogPreview />
          </FadeIn>
        </div>
      </section>

      {/* S5 — CTA FINAL */}
      <section className={`${styles.section}`} style={{ textAlign: "center", padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 2rem) 4rem clamp(1rem, 5vw, 2rem)", position: 'relative', overflow: 'hidden', background: 'transparent' }}>
        <div className={styles.container} style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(3rem, 5vw, 5rem) clamp(1.5rem, 5vw, 3rem)', backgroundColor: 'rgba(10, 10, 10, 0.4)', borderRadius: '2rem', border: '1px solid rgba(255, 255, 255, 0.05)', position: 'relative', zIndex: 1, backdropFilter: 'blur(12px)' }}>
          <FadeIn direction="up">
            <h2 className={styles.sectionTitle} style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              <TextReveal inline>Prêt à</TextReveal>{' '}
              <TextReveal delay={0.3} inline wordClassName="globalGradientWordItalic">booster votre activité ?</TextReveal>
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className={styles.headerDesc} style={{ marginBottom: "3rem" }}>
              <TextReveal inline justify="center">Prenons un moment pour discuter de votre activité. Nous serons ravis de vous conseiller et de voir comment la tech peut vous libérer l'esprit au quotidien.</TextReveal>
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
