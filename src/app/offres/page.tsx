import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import styles from './Offres.module.css';
import { FadeIn } from '@/components/ui/FadeIn';
import { TextReveal } from '@/components/ui/TextReveal';
import { ShieldCheck, Scale, User } from 'lucide-react';
import { FaCheckCircle, FaTimes, FaCheck } from 'react-icons/fa';
import { Accordion } from '@/components/ui/accordion';
import { Timeline, defaultOffresSteps } from '@/components/ui/Timeline';
import { JsonLd } from '@/components/JsonLd';
import {
  SITE_URL,
  offerCatalogSchema,
  buildFaqPageSchema,
  buildBreadcrumbSchema,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Nos Offres & Packs | MV Agency',
  description: 'Découvrez nos packs sur-mesure combinant un design web high-end et toute la puissance de l\'intelligence artificielle pour votre croissance.',
  alternates: { canonical: '/offres' },
};

type ComparePackKey = 'fondation' | 'croissance' | 'performance';

const comparePacks: { key: ComparePackKey; label: string }[] = [
  { key: 'fondation', label: 'Fondation' },
  { key: 'croissance', label: 'Croissance' },
  { key: 'performance', label: 'Performance IA' },
];

const compareRows: {
  feature: string;
  fondation: string | null;
  croissance: string;
  performance: string;
}[] = [
  { feature: 'Création de Site Web', fondation: 'Vitrines basic', croissance: 'Vitrines avancé', performance: 'E-commerce / Sur-mesure' },
  { feature: 'Optimisation SEO', fondation: 'Fondations techniques', croissance: 'Avancée + Contenu IA', performance: 'Audit profond & Stratégie' },
  { feature: 'Automatisations Métier', fondation: null, croissance: 'CRM & Emailing de base', performance: 'Workflows IA ultra-complexes' },
  { feature: 'Intelligence Artificielle', fondation: null, croissance: 'Chatbot & Génération texte', performance: 'Agents IA autonomes (LLM)' },
  { feature: 'Formation & Autonomie', fondation: 'Outils CMS basiques', croissance: 'Marketing & Édition site', performance: 'Masterclass IA complète' },
  { feature: 'Accompagnement & Suivi', fondation: 'Support technique J+14', croissance: '1 session stratégique', performance: 'Suivi Premium (3 mois)' },
];

const faqItems = [
  {
    question: "Comment se déroule la collaboration ?",
    answer: "Tout commence par un appel de découverte stratégique. Une fois vos besoins validés, nous créons un espace Notion partagé. Vous validez chaque étape (Design, Développement, Intégration IA) avant la mise en ligne finale."
  },
  {
    question: "Dois-je m'engager sur un abonnement mensuel ?",
    answer: "Non. Nos packs correspondent à des prestations de création ou refonte concrètes ('one-off'). Vous êtes propriétaire à 100% de votre site et de vos automatisations une fois le projet livré. Seule la maintenance (hébergement/sécurité) peut faire l'objet d'un suivi au choix."
  },
  {
    question: "Pourquoi n'indiquez-vous pas de prix exacts ?",
    answer: "Parce qu'un site pour un dentiste n'a pas le même périmètre qu'un site e-commerce — et qu'on refuse de vous vendre un pack sur catalogue qui ne correspond pas à votre réalité. En 30 minutes d'appel offert, on cadre ensemble le périmètre et le budget. Pas de devis surprise, pas de coûts cachés, pas d'engagement."
  },
  {
    question: "Fournissez-vous les textes et les images ?",
    answer: "Cela dépend de vos besoins ! Nos packs Croissance et Performance IA incluent la génération assistée par IA pour vous aider à structurer un copywriting percutant. Pour la base, vos images de marque sont utilisées, mais nous pouvons vous accompagner sur la recherche de visuels premium."
  },
  {
    question: "Le site m'appartient-il vraiment à la fin ?",
    answer: "Oui, à 100%. Dès la livraison finale, nous vous remettons tous les accès administrateurs (nom de domaine, hébergement, CMS, identifiants). Vous ne payez pas de 'licence d'utilisation' comme chez certaines agences."
  },
  {
    question: "Travaillez-vous avec des clients hors de La Réunion ?",
    answer: "Absolument. Si MV Agency est basée à La Réunion (avec un point d'ancrage en Belgique), nous travaillons activement avec des entreprises en France métropolitaine via des workflows asynchrones pertinents (visios, Loom, Notion). En revanche, nous ne disposons pas de locaux physiques en France pour des rencontres présentielles."
  },
  {
    question: "Faites-vous uniquement du 'No-Code' ?",
    answer: "Non. Bien que nous soyons experts en solutions d'automatisation (Make, n8n, Webflow) pour aller vite, nous maîtrisons le développement pur (React, Next.js, bases de données quantitatives) pour concevoir des architectures sur-mesure que le no-code standard serait incapable de gérer."
  }
];

const offresFaqSchema = buildFaqPageSchema(faqItems, `${SITE_URL}/offres`);
const offresBreadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Accueil', url: SITE_URL },
  { name: 'Offres', url: `${SITE_URL}/offres` },
]);

export default function OffresPage() {
  return (
    <main style={{ paddingBottom: "0" }}>
      <JsonLd data={offerCatalogSchema} />
      <JsonLd data={offresFaqSchema} />
      <JsonLd data={offresBreadcrumbSchema} />
      {/* S2: LES 3 PACKS (Promu en H1) */}
      <section id="packs" className={`${styles.section} ${styles.neutralBg}`} style={{ paddingTop: '12rem' }}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <span className="eyebrow" style={{ textAlign: "center" }}>Nos Offres</span>
              <h1 className={styles.sectionTitle} style={{ 
                marginBottom: "1.5rem", 
                fontSize: "clamp(2.5rem, 5vw, 4rem)", 
                lineHeight: 1.1,
                color: "var(--text-light)"
              }}>
                <TextReveal inline>3 packs pour</TextReveal>{' '}
                <TextReveal delay={0.45} inline wordClassName="globalGradientWordItalic">3 ambitions</TextReveal>
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                <TextReveal delay={0.8} inline justify="center">Du site vitrine au business propulsé par l'IA. On cadre le périmètre et le budget ensemble.</TextReveal>
              </p>
            </div>
          </FadeIn>
          <div className={styles.gridPacks}>
            
            {/* PACK 1 */}
            <FadeIn delay={0.1}>
              <div className={styles.packCard}>
                <h3 className={styles.packTitle}>Fondation digitale</h3>
                <p className={styles.packSubtitle}>Créer votre présence en ligne professionnelle et performante.</p>
                <div className={styles.packDivider} />
                <ul className={styles.packList}>
                  <li><FaCheckCircle className={styles.checkIcon} /> Site web vitrine Premium (jusqu'à 5 pages)</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Design Responsive & UI Moderne</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Optimisation SEO de base</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Formulaire de contact sécurisé</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Outils Analytiques (Google Analytics)</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Formation à l'utilisation du site</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Support technique de lancement</li>
                </ul>
                <Link href="/contact" tabIndex={-1} style={{ textDecoration: 'none', width: '100%' }}>
                  <Button variant="outline" style={{ width: '100%' }}>Choisir ce pack</Button>
                </Link>
              </div>
            </FadeIn>

            {/* PACK 2 (Mise en avant) */}
            <FadeIn delay={0.3}>
              <div className={`${styles.packCard} ${styles.packCardHighlight}`} style={{ transform: 'scale(1.05)', border: '2px solid #60A5FA', boxShadow: '0 0 40px rgba(96, 165, 250, 0.3)', zIndex: 10 }}>
                <div className={styles.packBadge} style={{ background: '#60A5FA', color: '#000', fontWeight: 'bold' }}>⭐ Le plus choisi</div>
                <h3 className={styles.packTitle}>Croissance digitale</h3>
                <p className={styles.packSubtitle}>Générer des clients et structurer votre acquisition de A à Z.</p>
                <div className={styles.packDivider} />
                <ul className={styles.packList}>
                  <li><FaCheckCircle className={styles.checkIcon} /> <strong>Tout le pack Fondation</strong></li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Site web avancé (jusqu'à 10 pages)</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Pages optimisées pour le SEO profond</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Landing Page orientée Conversion</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Automatisations clés (Emailing, CRM)</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Chatbot IA intelligent sur le site</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Contenu SEO assisté par IA</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Formation marketing digital</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> 1 session de suivi stratégique</li>
                </ul>
                <Link href="/contact" tabIndex={-1} style={{ textDecoration: 'none', width: '100%' }}>
                  <Button variant="primary" style={{ width: '100%' }}>Choisir ce pack</Button>
                </Link>
                <p style={{ textAlign: "center", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginTop: "1rem", marginBottom: 0 }}>
                  Le choix idéal pour générer vos premiers clients
                </p>
              </div>
            </FadeIn>

            {/* PACK 3 */}
            <FadeIn delay={0.5}>
              <div className={styles.packCard}>
                <h3 className={styles.packTitle}>Performance IA</h3>
                <p className={styles.packSubtitle}>Automatiser et optimiser chaque processus de votre business.</p>
                <div className={styles.packDivider} />
                <ul className={styles.packList}>
                  <li><FaCheckCircle className={styles.checkIcon} /> <strong>Tout le pack Croissance</strong></li>
                  <li><FaCheckCircle className={styles.checkIcon} /> E-commerce ou Plateforme sur mesure</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Automatisations complexes et multi-outils</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Agent IA Personnalisé (Business Logic)</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Génération automatique de contenu</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Audit digital & Stratégie data complète</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Formation IA poussée pour l'équipe</li>
                  <li><FaCheckCircle className={styles.checkIcon} /> Accompagnement Premium sur 3 mois</li>
                </ul>
                <Link href="/contact" tabIndex={-1} style={{ textDecoration: 'none', width: '100%' }}>
                  <Button variant="outline" style={{ width: '100%' }}>Choisir ce pack</Button>
                </Link>
              </div>
            </FadeIn>

          </div>
          <FadeIn direction="up" delay={0.6}>
            <p style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
              Un projet vraiment atypique qui ne rentre pas dans ces cases ? <br className={styles.hideOnMobile} />
              Ce n'est pas un problème, nous pouvons construire ensemble un accompagnement sur-mesure.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* BANDE GARANTIE — diagonal dot grid */}
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


      {/* S3: TABLEAU COMPARATIF */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <span className="eyebrow" style={{ textAlign: "center" }}>Comparatif détaillé</span>
            <h2 className={styles.sectionTitle}>
              <TextReveal>Entrons dans les détails</TextReveal>
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <div className={styles.tableContainer}>
              <table className={styles.compareTable}>
                <thead>
                  <tr>
                    <th style={{ width: "40%" }}>Fonctionnalités</th>
                    <th style={{ width: "20%" }}>Fondation</th>
                    <th className={styles.highlightColHeader} style={{ width: "20%" }}>Croissance</th>
                    <th style={{ width: "20%" }}>Performance IA</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.featureName}>{row.feature}</td>
                      <td>{row.fondation === null ? <FaTimes className={styles.iconCross} /> : row.fondation}</td>
                      <td className={styles.highlightCol}>{row.croissance}</td>
                      <td>{row.performance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile cards stack — alternative au compareTable sur mobile */}
            <div className={styles.compareMobile}>
              {comparePacks.map((pack) => (
                <div key={pack.key} className={styles.compareMobileCard}>
                  <div className={styles.compareMobileCardTitle}>{pack.label}</div>
                  <ul className={styles.compareMobileList}>
                    {compareRows.map((row) => {
                      const value = row[pack.key];
                      return (
                        <li key={row.feature}>
                          <strong>{row.feature} :</strong>{' '}
                          {value === null ? '—' : value}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* S4: NOTRE PROCESSUS */}
      <section className={`${styles.section} ${styles.neutralBg}`}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <span className="eyebrow" style={{ textAlign: "center" }}>Déroulement client</span>
            <h2 className={styles.sectionTitle}>
              <TextReveal>Notre méthode, pas à pas</TextReveal>
            </h2>
          </FadeIn>
          <Timeline steps={defaultOffresSteps} />
        </div>
      </section>

      {/* S5: FAQ */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container} style={{ maxWidth: '800px' }}>
          <FadeIn direction="up">
            <span className="eyebrow" style={{ textAlign: "center" }}>Foire aux questions</span>
            <h2 className={styles.sectionTitle}>
              <TextReveal>Vous avez des questions ? On y répond.</TextReveal>
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <Accordion items={faqItems} />
          </FadeIn>
        </div>
      </section>

      {/* S6: CTA FINAL */}
      <section className={`${styles.section}`} style={{ textAlign: "center", padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 2rem) 4rem clamp(1rem, 5vw, 2rem)", position: 'relative', overflow: 'hidden', background: 'transparent' }}>
        <div className={styles.container} style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(3rem, 5vw, 5rem) clamp(1.5rem, 5vw, 3rem)', backgroundColor: 'rgba(10, 10, 10, 0.4)', borderRadius: '2rem', border: '1px solid rgba(255, 255, 255, 0.05)', position: 'relative', zIndex: 1, backdropFilter: 'blur(12px)' }}>
          <FadeIn direction="up">
            <h2 className={styles.sectionTitle} style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              <TextReveal inline>Prêt à passer à</TextReveal>{' '}
              <TextReveal delay={0.6} inline wordClassName="globalGradientWordItalic">l'étape supérieure ?</TextReveal>
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className={styles.headerDesc} style={{ marginBottom: "3rem" }}>
              <TextReveal inline justify="center">Prenons le temps d'échanger sur votre projet lors d'un appel offert de 30 min. Nous vous aiderons à définir avec bienveillance l'architecture qui vous fera vraiment avancer.</TextReveal>
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.3}>
            <div className={styles.ctaActions}>
              <Link href="/contact" tabIndex={-1}>
                <Button variant="primary">Réserver un appel</Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
