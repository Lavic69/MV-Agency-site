"use client";

import React from 'react';
import { FadeIn } from '@/components/ui/FadeIn';
import { TextReveal } from '@/components/ui/TextReveal';
import { Timeline, TimelineStep } from '@/components/ui/Timeline';
import { Eye, Sparkles, Users, Award, ArrowRight, RefreshCcw, Quote } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
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
    text: "Pas de jargon. Si on parle technique, on explique d'abord."
  },
  {
    icon: <Sparkles size={24} />,
    title: "Innovation",
    text: "On teste chaque nouvelle IA avant de vous la proposer."
  },
  {
    icon: <Users size={24} />,
    title: "Proximité",
    text: "Un seul interlocuteur, du kick-off au lancement. Réponse sous 24h."
  },
  {
    icon: <Award size={24} />,
    title: "Excellence",
    text: "Code propre et design sur-mesure. Zéro site 'template'."
  }
];

export default function AProposClient() {
  return (
    <main style={{ width: '100%' }}>
      {/* GLOBAL LIQUID ETHER IS IN LAYOUT NOW */}

      {/* S1: HERO ÉDITORIAL LUXE */}
      <section className={styles.heroEditorial} style={{ background: 'transparent', borderBottom: 'none', display: 'flex', justifyContent: 'center', paddingTop: '10rem', paddingBottom: '3rem' }}>
        <div className={styles.container} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1000px',
            backgroundColor: 'rgba(10, 10, 12, 0.6)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            padding: 'clamp(3rem, 6vw, 6rem)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            overflow: 'hidden'
          }}>
            {/* Glowing orbs behind the text */}
            <div style={{ position: 'absolute', top: '-30%', left: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none' }} />

            <div style={{ position: 'absolute', top: '2rem', left: '2rem', opacity: 0.1, zIndex: 0 }}>
              <Quote size={100} style={{ transform: 'rotate(180deg)' }} />
            </div>

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <FadeIn direction="up">
                <h1 style={{ 
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  lineHeight: 1.1,
                  fontWeight: 700,
                  color: 'var(--text-light)',
                  margin: 0,
                  textAlign: 'center',
                  letterSpacing: '-0.02em'
                }}>
                  <TextReveal delay={0.1} inline>On ne vend pas du code.</TextReveal><br/>
                  <TextReveal delay={1.0} inline>On vend</TextReveal>{' '}
                  <TextReveal delay={1.3} inline>
                    <span style={{ 
                      fontStyle: 'italic',
                      background: 'linear-gradient(90deg, #60a5fa 0%, #ffffff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: 'transparent',
                      paddingRight: '0.1em'
                    }}>
                      l'autonomie
                    </span>
                    <span style={{ color: 'var(--text-light)', fontStyle: 'normal' }}>.</span>
                  </TextReveal>
                </h1>
              </FadeIn>
              
              <FadeIn direction="up" delay={0.8} style={{ alignSelf: 'center', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&q=80" 
                    alt="Victor Marchetti, Fondateur de MV Agency" 
                    style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', objectFit: 'cover' }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--text-light)', fontWeight: 600, fontSize: '1.1rem', lineHeight: 1.2 }}>Victor Marchetti</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontStyle: 'italic' }}>Fondateur de MV Agency</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

        </div>
      </section>

      {/* S2: L'HISTOIRE */}
      <section className={styles.section} style={{ background: 'transparent' }}>
        <div className={styles.container}>
          <FadeIn direction="up">
            <span className="eyebrow" style={{ textAlign: "center" }}>D'où vient MV Agency</span>
            <h2 className={styles.sectionTitleCenter} style={{ marginBottom: "4rem" }}>
              <TextReveal>La genèse de notre approche</TextReveal>
            </h2>
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
            <span className="eyebrow" style={{ textAlign: 'center' }}>Notre Mission</span>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <h2 className={styles.missionPhrase}>
              <TextReveal>Concevoir, expliquer, propulser.</TextReveal>
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
            <span className="eyebrow" style={{ textAlign: 'center' }}>Le Processus J0 à J30</span>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <h2 className={styles.sectionTitleCenter}>
              <TextReveal>Comment on travaille avec vous</TextReveal>
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
                  <div className={styles.bentoStatTitle} style={{ fontSize: '4rem', fontWeight: 900 }}>100%</div>
                  <div className={styles.bentoStatSubtitle}>des clients repartent formés et autonomes</div>
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
                  <p className={styles.bentoText}>Pas de surprise. On cadre le périmètre et le budget ensemble, par écrit, avant tout engagement.</p>
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
                        <TextReveal delay={0.1} inline>Prêt à transformer</TextReveal><br/>
                        <TextReveal delay={0.4} inline>
                          <span style={{ 
                            fontStyle: 'italic',
                            background: 'linear-gradient(90deg, #60a5fa 0%, #ffffff 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            color: 'transparent',
                            paddingRight: '0.1em'
                          }}>
                            votre présence
                          </span>
                        </TextReveal> ?
                      </h3>
                      <p className={styles.bentoText}>Rejoignez les dizaines d'entreprises et d'indépendants locaux qui ont confié leur croissance à MV Agency.</p>
                    </div>
                    <Link href="/contact" tabIndex={-1} style={{ textDecoration: 'none' }}>
                      <Button variant="primary" style={{ borderRadius: '999px', fontSize: '1.2rem', padding: '1rem 2rem', fontWeight: 600 }}>
                        Prendre rendez-vous
                      </Button>
                    </Link>
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
