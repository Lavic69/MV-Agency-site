import React from 'react';
import { Metadata } from 'next';
import { FadeIn } from '@/components/ui/FadeIn';
import { TextReveal } from '@/components/ui/TextReveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { realizations } from '@/data/projects';
import { ProjectMockup } from './ProjectMockup';
import styles from './CasClients.module.css';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL, buildBreadcrumbSchema, OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: 'Cas clients & réalisations web & IA pour PME — MV Agency',
  description: 'Découvrez nos réalisations, sites vitrines, applications web IA et le ROI généré pour nos clients.',
  alternates: { canonical: '/cas-clients' },
  openGraph: {
    type: 'website',
    title: 'Cas clients — Réalisations MV Agency',
    description: 'Sites premium, applications IA et automatisations livrés pour des PME et startups. Projets concrets, ROI mesuré.',
    url: `${SITE_URL}/cas-clients`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cas clients — MV Agency',
    description: 'Sites premium et apps IA livrés pour PME et startups. Projets concrets, ROI mesurés.',
    images: [OG_IMAGE.url],
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Accueil', url: SITE_URL },
  { name: 'Cas clients', url: `${SITE_URL}/cas-clients` },
]);

export default function CasClientsPage() {
  return (
    <main style={{ paddingBottom: '5rem', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <JsonLd data={breadcrumbSchema} />
      
      {/* SECTION HERO */}
      <section style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'clamp(6rem, 15vw, 12rem) clamp(1rem, 5vw, 2rem) 4rem clamp(1rem, 5vw, 2rem)' }}>
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 700, margin: '0 0 1.5rem 0', lineHeight: 1.1, fontFamily: 'var(--font-heading)' }}>
            <TextReveal inline>Ce que l'on</TextReveal>{' '}
            <TextReveal inline wordClassName="globalGradientWordItalic" delay={0.3}>construit</TextReveal>
          </h1>
        <div className="heroReveal heroRevealDelay1" style={{ maxWidth: '600px' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            L'alliance parfaite entre une direction artistique affûtée et une ingénierie de pointe.
          </p>
        </div>
        
        {/* KPI STATS */}
        <FadeIn delay={0.5} direction="up">
          <div className={styles.statsContainer}>
            <div className={styles.statBox}>
              <div className={styles.statNumber}><AnimatedCounter value={10} prefix="+" /></div>
              <div className={styles.statLabel}>Projets Livrés</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNumber}><AnimatedCounter value={7} /></div>
              <div className={styles.statLabel}>Formations dispensées</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNumber}><AnimatedCounter value={100} suffix="%" /></div>
              <div className={styles.statLabel}>Clients satisfaits</div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* SECTION LISTE DES PROJETS */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)', marginTop: 'clamp(2rem, 5vw, 4rem)' }}>
        <StaggerContainer>
          {realizations.map((project, idx) => (
            <StaggerItem key={project.name}>
              <div className={styles.caseRow}>
                <div className={styles.caseMockup}>
                  <FadeIn delay={0.1} direction="up">
                    <ProjectMockup 
                      desktopSrc={project.src}
                      hasMobile={project.hasMobile}
                      hasWebApp={project.hasWebApp}
                      mobileSrc={project.mobileSrc}
                      webAppSrc={(project as any).webAppSrc}
                      projectName={project.name}
                    />
                  </FadeIn>
                </div>
                <div className={styles.caseInfo}>
                  <FadeIn delay={0.2} direction="up">
                    <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--primary)', fontWeight: 600 }}>{project.designation}</span>
                    <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0 1.5rem 0', fontFamily: 'var(--font-heading)' }}>
                      <TextReveal inline justify="flex-start">{project.name}</TextReveal>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                      <TextReveal inline justify="flex-start">{project.quote}</TextReveal>
                    </p>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }} tabIndex={-1}>
                      <Button variant="outline" size="sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        Voir le projet <ArrowRight size={18} style={{ strokeWidth: 2.5, transform: 'translateY(1px)' }} />
                      </Button>
                    </a>
                  </FadeIn>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* SECTION CTA FINAL METHODOLOGIE */}
      <section style={{ maxWidth: '800px', margin: 'clamp(4rem, 10vw, 8rem) auto 4rem auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 5vw, 2rem)', backgroundColor: 'rgba(10, 10, 10, 0.4)', borderRadius: '2rem', border: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center' }}>
        <FadeIn direction="up">
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
            <TextReveal inline>Prêt à rejoindre</TextReveal>{' '}
            <TextReveal delay={0.4} inline wordClassName="globalGradientWordItalic">l'excellence ?</TextReveal>
          </h2>
          <p style={{ color: 'var(--text-secondary)', margin: '0 auto 2rem auto', maxWidth: '500px', lineHeight: 1.6, fontSize: '1.1rem' }}>
            Découverte stratégique, maquettage haute-fidélité, développement next-gen et intégration IA. Lancez votre propre plateforme dès aujourd'hui.
          </p>
          <a href="/contact" style={{ textDecoration: 'none' }}>
            <Button variant="primary">Discuter de votre projet</Button>
          </a>
        </FadeIn>
      </section>

    </main>
  );
}
