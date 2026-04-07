import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import styles from './Offres.module.css';
import { FadeIn } from '@/components/ui/FadeIn';
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
    answer: "Chaque activité est unique. Un dentiste n'a pas les mêmes besoins d'automatisation et de contenu qu'une boutique e-commerce naissante. Nous discutons de votre vision lors de l'appel pour vous proposer un devis transparent, fixe et sans surprise, basé sur l'architecture du pack choisi."
  },
  {
    question: "Fournissez-vous les textes et les images ?",
    answer: "Cela dépend de vos besoins ! Nos packs Croissance et Performance IA incluent la génération assistée par IA pour vous aider à structurer un copywriting percutant. Pour la base, vos images de marque sont utilisées, mais nous pouvons vous accompagner sur la recherche de visuels premium."
  }
];

export default function OffresPage() {
  return (
    <main style={{ paddingBottom: "0" }}>
      {/* S1: HERO OFFRES */}
      <section className={`${styles.section}`} style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', background: 'transparent' }}>
        <div className={styles.container} style={{ position: 'relative', zIndex: 1, marginTop: '5rem' }}>
          <FadeIn direction="up">
            <h1 className={styles.headerTitle}>
              Investissez dans une infrastructure digitale qui <br/>
              <span style={{ color: '#3b82f6' }}>génère du chiffre d'affaires</span>.
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className={styles.headerDesc}>
              Construisez des fondations solides et accélérez votre croissance avec nos trois architectures d'accompagnement. Des solutions transparentes et puissantes pour dominer votre marché.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* S2: LES 3 PACKS */}
      <section id="packs" className={`${styles.section} ${styles.neutralBg}`}>
        <div className={styles.container}>
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
                  <Button variant="outline" style={{ width: '100%' }}>Réserver un appel</Button>
                </Link>
              </div>
            </FadeIn>

            {/* PACK 2 (Mise en avant) */}
            <FadeIn delay={0.3}>
              <div className={`${styles.packCard} ${styles.packCardHighlight}`}>
                <div className={styles.packBadge}>Le plus choisi</div>
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
                  <Button variant="primary" style={{ width: '100%' }}>Réserver un appel</Button>
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
                  <Button variant="outline" style={{ width: '100%' }}>Réserver un appel</Button>
                </Link>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* S3: TABLEAU COMPARATIF */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <h2 className={styles.sectionTitle}>Comparatif détaillé</h2>
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
                    <td className={styles.featureName}>Nombre de pages</td>
                    <td>Jusqu'à 5 pages</td>
                    <td className={styles.highlightCol}>Jusqu'à 10 pages</td>
                    <td>Illimité / Dynamique</td>
                  </tr>
                  <tr>
                    <td className={styles.featureName}>Design Responsive & Premium</td>
                    <td><FaCheck className={styles.iconCheck} /></td>
                    <td className={styles.highlightCol}><FaCheck className={styles.iconCheckAccent} /></td>
                    <td><FaCheck className={styles.iconCheck} /></td>
                  </tr>
                  <tr>
                    <td className={styles.featureName}>Optimisation SEO</td>
                    <td>Fondations techniques</td>
                    <td className={styles.highlightCol}>Avancée + Contenu IA</td>
                    <td>Audit profond & Stratégie</td>
                  </tr>
                  <tr>
                    <td className={styles.featureName}>Landing Page Conversion</td>
                    <td><FaTimes className={styles.iconCross} /></td>
                    <td className={styles.highlightCol}><FaCheck className={styles.iconCheckAccent} /></td>
                    <td>Multiples</td>
                  </tr>
                  <tr>
                    <td className={styles.featureName}>Automatisations Métier</td>
                    <td><FaTimes className={styles.iconCross} /></td>
                    <td className={styles.highlightCol}>CRM & Emailing de base</td>
                    <td>Workflows IA ultra-complexes</td>
                  </tr>
                  <tr>
                    <td className={styles.featureName}>Chatbot IA & Assistants virtuels</td>
                    <td><FaTimes className={styles.iconCross} /></td>
                    <td className={styles.highlightCol}><FaCheck className={styles.iconCheckAccent} /></td>
                    <td>Agents IA personnalisés (LLM)</td>
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
            <h2 className={styles.sectionTitle}>Comment nous travaillons</h2>
          </FadeIn>
          <Timeline steps={defaultOffresSteps} />
        </div>
      </section>

      {/* S5: FAQ */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container} style={{ maxWidth: '800px' }}>
          <FadeIn direction="up">
            <h2 className={styles.sectionTitle}>Questions Fréquentes</h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <Accordion items={faqItems} />
          </FadeIn>
        </div>
      </section>

      {/* S6: CTA FINAL */}
      <section className={`${styles.section}`} style={{ textAlign: "center", padding: "8rem 2rem 4rem 2rem", position: 'relative', overflow: 'hidden', background: 'transparent' }}>
        <div className={styles.container} style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn direction="up">
            <h2 className={styles.sectionTitle} style={{ marginBottom: "1rem" }}>Prêt à passer à l'étape supérieure ?</h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className={styles.headerDesc} style={{ marginBottom: "3rem" }}>
              Évitons de perdre du temps. Réservez un appel gratuit de 30 min pour auditer vos besoins et trouver l'architecture digitale parfaite pour vous.
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
