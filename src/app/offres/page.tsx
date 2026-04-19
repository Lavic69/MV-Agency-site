import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import styles from './Offres.module.css';
import { FadeIn } from '@/components/ui/FadeIn';
import { ShieldCheck, Scale, User } from 'lucide-react';
import { FaCheckCircle, FaTimes, FaCheck } from 'react-icons/fa';
import { Accordion } from '@/components/ui/accordion';
import { Timeline, defaultOffresSteps } from '@/components/ui/Timeline';

export const metadata: Metadata = {
  title: 'Nos Offres & Packs | MV Agency',
  description: 'Découvrez nos packs sur-mesure combinant un design web high-end et toute la puissance de l\'intelligence artificielle pour votre croissance.',
};

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

export default function OffresPage() {
  return (
    <main style={{ paddingBottom: "0" }}>
      {/* S2: LES 3 PACKS (Promu en H1) */}
      <section id="packs" className={`${styles.section} ${styles.neutralBg}`} style={{ paddingTop: '12rem' }}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h1 className={styles.sectionTitle} style={{ 
                marginBottom: "1.5rem", 
                fontSize: "clamp(2.5rem, 5vw, 4rem)", 
                lineHeight: 1.1,
                color: "var(--text-light)"
              }}>
                3 packs pour <span style={{ fontStyle: 'italic', background: 'linear-gradient(90deg, #60a5fa 0%, #ffffff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', paddingRight: '0.1em' }}>3 ambitions</span>.
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                Du site vitrine au business propulsé par l'IA. On cadre le périmètre et le budget ensemble.
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

      {/* BADGES GARANTIE */}
      <section className={styles.section} style={{ paddingBottom: '3rem', paddingTop: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <FadeIn direction="up" delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
              <div style={{ color: '#60A5FA', padding: '12px', background: 'rgba(96, 165, 250, 0.1)', borderRadius: '12px' }}>
                <ShieldCheck size={32} />
              </div>
              <h4 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--text-light)' }}>Satisfait ou remanié</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Rendu initial pas conforme ? On itère gratuitement.</p>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
              <div style={{ color: '#60A5FA', padding: '12px', background: 'rgba(96, 165, 250, 0.1)', borderRadius: '12px' }}>
                <Scale size={32} />
              </div>
              <h4 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--text-light)' }}>Pas d'engagement</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Aucun abonnement caché. Vous êtes libres.</p>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.3}>
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
              <div style={{ color: '#60A5FA', padding: '12px', background: 'rgba(96, 165, 250, 0.1)', borderRadius: '12px' }}>
                <User size={32} />
              </div>
              <h4 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--text-light)' }}>Un seul interlocuteur</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Du premier appel à la livraison finale.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* S3: TABLEAU COMPARATIF */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <h2 className={styles.sectionTitle}>Entrons dans les détails</h2>
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
                  <tr>
                    <td className={styles.featureName}>Création de Site Web</td>
                    <td>Vitrines basic</td>
                    <td className={styles.highlightCol}>Vitrines avancé</td>
                    <td>E-commerce / Sur-mesure</td>
                  </tr>
                  <tr>
                    <td className={styles.featureName}>Optimisation SEO</td>
                    <td>Fondations techniques</td>
                    <td className={styles.highlightCol}>Avancée + Contenu IA</td>
                    <td>Audit profond & Stratégie</td>
                  </tr>
                  <tr>
                    <td className={styles.featureName}>Automatisations Métier</td>
                    <td><FaTimes className={styles.iconCross} /></td>
                    <td className={styles.highlightCol}>CRM & Emailing de base</td>
                    <td>Workflows IA ultra-complexes</td>
                  </tr>
                  <tr>
                    <td className={styles.featureName}>Intelligence Artificielle</td>
                    <td><FaTimes className={styles.iconCross} /></td>
                    <td className={styles.highlightCol}>Chatbot & Génération texte</td>
                    <td>Agents IA autonomes (LLM)</td>
                  </tr>
                  <tr>
                    <td className={styles.featureName}>Formation & Autonomie</td>
                    <td>Outils CMS basiques</td>
                    <td className={styles.highlightCol}>Marketing & Édition site</td>
                    <td>Masterclass IA complète</td>
                  </tr>
                  <tr>
                    <td className={styles.featureName}>Accompagnement & Suivi</td>
                    <td>Support technique J+14</td>
                    <td className={styles.highlightCol}>1 session stratégique</td>
                    <td>Suivi Premium (3 mois)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* S4: NOTRE PROCESSUS */}
      <section className={`${styles.section} ${styles.neutralBg}`}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <h2 className={styles.sectionTitle}>Notre méthode, pas à pas</h2>
          </FadeIn>
          <Timeline steps={defaultOffresSteps} />
        </div>
      </section>

      {/* S5: FAQ */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container} style={{ maxWidth: '800px' }}>
          <FadeIn direction="up">
            <h2 className={styles.sectionTitle}>Vous avez des questions ? On y répond.</h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <Accordion items={faqItems} />
          </FadeIn>
        </div>
      </section>

      {/* S6: CTA FINAL */}
      <section className={`${styles.section}`} style={{ textAlign: "center", padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 2rem) 4rem clamp(1rem, 5vw, 2rem)", position: 'relative', overflow: 'hidden', background: 'transparent' }}>
        <div className={styles.container} style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn direction="up">
            <h2 className={styles.sectionTitle} style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              Prêt à passer à <span style={{ fontStyle: 'italic', background: 'linear-gradient(90deg, #60a5fa 0%, #ffffff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>l'étape supérieure</span> ?
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className={styles.headerDesc} style={{ marginBottom: "3rem" }}>
              Prenons le temps d'échanger sur votre projet lors d'un appel offert de 30 min. Nous vous aiderons à définir avec bienveillance l'architecture qui vous fera vraiment avancer.
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
