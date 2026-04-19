"use client";

import React from 'react';
import { FadeIn } from '@/components/ui/FadeIn';
import { Timeline, TimelineStep } from '@/components/ui/Timeline';
import { Eye, Sparkles, Users, Award, ArrowRight, RefreshCcw } from 'lucide-react';
import styles from './APropos.module.css';

const aproposSteps: TimelineStep[] = [
  {
    num: "J0",
    title: "Signature & Welcome Pack",
    text: "Portail client créé, accès envoyés, formulaire de brief. Vous savez exactement ce qui va se passer."
  },
  {
    num: "J+3",
    title: "Immersion & Audit",
    text: "Analyse approfondie de votre métier, de vos cibles, et de l'architecture technique nécessaire."
  },
  {
    num: "J+7",
    title: "Stratégie & Maquettes",
    text: "Une fois l'audit terminé, nous attaquons l'arborescence et les premiers wireframes de votre plateforme."
  },
  {
    num: "J+10",
    title: "Design UI Validé",
    text: "Votre identité est posée. Polices, couleurs, maquette haute fidélité entièrement sur-mesure soumise à votre validation."
  },
  {
    num: "J+15",
    title: "Développement Core",
    text: "Transformation du design statique en infrastructure Next.js ultra-rapide et performante."
  },
  {
    num: "J+20",
    title: "Intégration IA & Data",
    text: "Nous codons proprement vos scripts invisibles et intégrons vos automatisations ou agents IA."
  },
  {
    num: "J+25",
    title: "Tests & Ajustements",
    text: "Tests de performance, design responsive, optimisation SEO technique poussée pour un site extrêmement robuste."
  },
  {
    num: "J+30",
    title: "Lancement & Formation",
    text: "Votre nouvelle infrastructure digitale est live ! On vous rend 100% autonome via notre formation pédagogique."
  }
];

const values = [
  {
    icon: <Eye size={24} />,
    title: "Clarté",
    text: "Fini le jargon technique. Nous expliquons avec des mots simples chaque choix et chaque outil mis en place."
  },
  {
    icon: <Sparkles size={24} />,
    title: "Innovation",
    text: "Nous restons à la pointe de l'intelligence artificielle pour vous donner un avantage concurrentiel tangible."
  },
  {
    icon: <Users size={24} />,
    title: "Proximité",
    text: "Vous n'êtes pas un numéro de ticket. On s'implique dans votre business comme si c'était le nôtre."
  },
  {
    icon: <Award size={24} />,
    title: "Excellence",
    text: "Le 'à peu près' n'existe pas. Design ultra poussé, code propre, performances chirurgicales."
  }
];

export default function AProposClient() {
  return (
    <main style={{ width: '100%' }}>
      {/* GLOBAL LIQUID ETHER IS IN LAYOUT NOW */}

      {/* S1: HERO */}
      <section className={styles.hero} style={{ background: 'transparent', borderBottom: 'none' }}>
          <div className={styles.heroContent} style={{ zIndex: 2, marginTop: '8rem' }}>
          <FadeIn direction="up">
            <h1 className={styles.title}>
              Derrière MV Agency
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className={styles.subtitle}>
              Une agence née d'un constat simple : le digital devrait être accessible, compréhensible et humain.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* S2: L'HISTOIRE */}
      <section className={styles.section} style={{ background: 'transparent' }}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <span className={styles.sectionLabel}>D'où vient MV Agency</span>
          </FadeIn>
          <div className={styles.historyGrid}>
            <FadeIn direction="left" delay={0.2}>
              <div className={styles.historyText}>
                <p>
                  Je suis <strong>Victor Marchetti</strong>, ancien étudiant en e-business devenu entrepreneur et fondateur de MV Agency.
                </p>
                <p>
                  En observant le terrain, j'ai fait un constat effarant : de trop nombreuses PME, artisans et professions libérales sont totalement dépassés par un digital qui évolue trop vite. Pire encore, ils confient souvent leurs projets à des prestataires qui <em>livrent sans expliquer</em>, les laissant dépendants et menottés.
                </p>
                <p>
                  J'ai créé MV Agency avec une ambition simple mais radicale : <strong>rendre le digital et l'Intelligence Artificielle accessibles aux indépendants.</strong> 
                </p>
                <p>
                  Pas de jargon agence, pas de blabla corporate inutile. Juste du bon sens, une passion pour l'esthétique et une volonté de bâtir des infrastructures réellement rentables pour vous. Mon but ? Être votre partenaire tech direct, chaleureux et transparent.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.4}>
              <div className={styles.imageWrapper}>
                <div className={styles.imageDecoration}></div>
                <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&q=80" alt="Victor Marchetti, Fondateur de MV Agency" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* S3: MISSION & VALEURS */}
      <section className={styles.section}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <span className={styles.sectionLabel} style={{ textAlign: 'center' }}>Notre Mission</span>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <h2 className={styles.missionPhrase}>
              Concevoir, expliquer, propulser.
            </h2>
          </FadeIn>

          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <FadeIn direction="up" delay={0.1 * i} key={i}>
                <div 
                  className={styles.valueCard}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
                    const relativeY = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--glow-x', `${relativeX}%`);
                    e.currentTarget.style.setProperty('--glow-y', `${relativeY}%`);
                    e.currentTarget.style.setProperty('--glow-intensity', '1');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.setProperty('--glow-intensity', '0');
                  }}
                >
                  <div className={styles.valueIcon}>{v.icon}</div>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueText}>{v.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* S4: NOTRE MÉTHODE */}
      <section className={styles.section} style={{ paddingBottom: '8rem' }}>
        <div className={styles.container} style={{ maxWidth: '1000px' }}>
          <FadeIn direction="up">
            <span className={styles.sectionLabel} style={{ textAlign: 'center' }}>Le Processus J0 à J30</span>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <h2 className={styles.sectionTitleCenter}>
              Comment on travaille avec vous
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.3}>
            <p style={{ textAlign: 'center', color: 'var(--accent)', fontSize: '1.2rem', marginBottom: '5rem', marginTop: '-2rem' }}>
              Un accompagnement structuré, transparent à chaque étape.
            </p>
          </FadeIn>
          
          <Timeline steps={aproposSteps} />
        </div>
      </section>

      {/* S5: BENTO ONBOARDING */}
      <section className={styles.section} style={{ paddingBottom: '12rem', paddingTop: '4rem' }}>
        <div className={styles.container}>
          <div className={styles.bentoContainer}>
            <FadeIn direction="up">
              <div className={styles.bentoGridTop}>
                
                <div 
                  className={styles.bentoCard}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
                    const relativeY = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--glow-x', `${relativeX}%`);
                    e.currentTarget.style.setProperty('--glow-y', `${relativeY}%`);
                    e.currentTarget.style.setProperty('--glow-intensity', '1');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.setProperty('--glow-intensity', '0');
                  }}
                >
                  <h3 className={styles.bentoTitle}>L'immersion totale.</h3>
                  <p className={styles.bentoText}>
                    Nous analysons en profondeur votre métier, vos concurrents et vos objectifs structurels avant de concevoir votre stratégie digitale.
                  </p>
                </div>

                <div 
                  className={styles.bentoCard}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
                    const relativeY = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--glow-x', `${relativeX}%`);
                    e.currentTarget.style.setProperty('--glow-y', `${relativeY}%`);
                    e.currentTarget.style.setProperty('--glow-intensity', '1');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.setProperty('--glow-intensity', '0');
                  }}
                >
                  <div className={styles.bentoStatTitle}>98%</div>
                  <div className={styles.bentoStatSubtitle}>Taux de satisfaction</div>
                </div>

              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.2}>
              <div className={styles.bentoGridBottom}>
                
                <div 
                  className={styles.bentoCard}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
                    const relativeY = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--glow-x', `${relativeX}%`);
                    e.currentTarget.style.setProperty('--glow-y', `${relativeY}%`);
                    e.currentTarget.style.setProperty('--glow-intensity', '1');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.setProperty('--glow-intensity', '0');
                  }}
                >
                  <RefreshCcw size={32} className={styles.bentoIconTop} />
                  <h3 className={styles.bentoTitle} style={{ fontSize: '1.8rem' }}>Transparence absolue</h3>
                  <p className={styles.bentoText}>Aucune zone d'ombre. Un suivi clair, régulier et un accès permanent à l'avancée concrète de votre projet.</p>
                </div>

                <div 
                  className={styles.bentoCard}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
                    const relativeY = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--glow-x', `${relativeX}%`);
                    e.currentTarget.style.setProperty('--glow-y', `${relativeY}%`);
                    e.currentTarget.style.setProperty('--glow-intensity', '1');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.setProperty('--glow-intensity', '0');
                  }}
                >
                  <div className={styles.bentoFlexRow}>
                    <div style={{ maxWidth: '75%' }}>
                      <h3 className={styles.bentoActionTitle} style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}>
                        Prêt à <span style={{ fontStyle: 'italic', background: 'linear-gradient(90deg, #60a5fa 0%, #ffffff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>transformer votre présence</span> ?
                      </h3>
                      <p className={styles.bentoText}>Rejoignez les dizaines d'entreprises et d'indépendants locaux qui ont confié leur croissance à MV Agency.</p>
                    </div>
                    <button className={styles.bentoButton} aria-label="Passer à l'action">
                      <ArrowRight size={24} />
                    </button>
                  </div>
                </div>

              </div>
            </FadeIn>
          </div>
        </div>
      </section>

    </main>
  );
}
