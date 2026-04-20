"use client";

import React, { useEffect } from 'react';
import { FadeIn } from '@/components/ui/FadeIn';
import { TextReveal } from '@/components/ui/TextReveal';
import { Mail, Zap } from 'lucide-react';
import { CONTACT_EMAIL } from '@/lib/seo';
import styles from './Contact.module.css';
import { AvailabilityPill } from '@/components/ui/AvailabilityPill';

// Cal.com inline embed — snippet officiel vanilla JS
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cal?: any;
  }
}

export default function ContactClient() {
  useEffect(() => {
    /* eslint-disable @typescript-eslint/no-explicit-any, prefer-rest-params */
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement('script')).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ['initNamespace', namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');
    /* eslint-enable @typescript-eslint/no-explicit-any, prefer-rest-params */

    window.Cal('init', '30min', { origin: 'https://cal.com' });
    window.Cal.ns['30min']('inline', {
      elementOrSelector: '#mv-cal-inline',
      config: { layout: 'month_view', theme: 'dark' },
      calLink: 'victor-marchetti/30min',
    });
    window.Cal.ns['30min']('ui', {
      cssVarsPerTheme: {
        light: { 'cal-brand': '#2563EB' },
        dark: { 'cal-brand': '#60A5FA' },
      },
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
  }, []);

  return (
    <main style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className={styles.container}>
        
        {/* Left Column */}
        <div className={styles.leftCol}>
          <AvailabilityPill isContactPage={true} />
          
          <FadeIn direction="up">
            <h1 className={styles.title}>
              <TextReveal delay={0.1} inline>Construisons le</TextReveal>{' '}
              <TextReveal delay={0.4} inline>
                <span style={{ fontStyle: 'italic', background: 'linear-gradient(90deg, #60a5fa 0%, #ffffff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', paddingRight: '0.1em' }}>futur</span>
              </TextReveal>{' '}
              <TextReveal delay={0.6} inline>ensemble.</TextReveal>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className={styles.subtitle}>
              <TextReveal delay={0.8} inline justify="flex-start">Nous accompagnons les professionnels et les fondateurs avec sincérité, pour concevoir des solutions digitales intuitives, performantes et qui vous ressemblent vraiment.</TextReveal>
            </p>
          </FadeIn>

          <div className={styles.contactInfo}>
            <FadeIn direction="up" delay={0.3}>
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <Mail size={24} />
                </div>
                <div className={styles.infoText}>
                  <span className={styles.infoTitle}>Email</span>
                  <a href={`mailto:${CONTACT_EMAIL}`} className={styles.infoDetail} style={{ color: 'inherit', textDecoration: 'none' }}>{CONTACT_EMAIL}</a>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <Zap size={24} />
                </div>
                <div className={styles.infoText}>
                  <span className={styles.infoTitle}>Réactivité</span>
                  <span className={styles.infoDetail}>Réponse sous 24h ouvrées</span>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn direction="up" delay={0.5} className={styles.trustSection}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '6px 20px 6px 8px', 
              borderRadius: '999px', 
              border: '1px solid rgba(255,255,255,0.15)', 
              backgroundColor: 'rgba(10, 10, 10, 0.65)', 
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              marginTop: '1rem'
            }}>
              <div style={{ display: 'flex', marginLeft: '4px' }}>
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80" alt="Client 1" style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #222', position: 'relative', zIndex: 4, objectFit: 'cover', filter: 'grayscale(0.15) brightness(0.9)', opacity: 0.85 }} />
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" alt="Client 2" style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #222', position: 'relative', zIndex: 3, marginLeft: '-10px', objectFit: 'cover', filter: 'grayscale(0.15) brightness(0.9)', opacity: 0.85 }} />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Client 3" style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #222', position: 'relative', zIndex: 2, marginLeft: '-10px', objectFit: 'cover', filter: 'grayscale(0.15) brightness(0.9)', opacity: 0.85 }} />
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Client 4" style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #222', position: 'relative', zIndex: 1, marginLeft: '-10px', objectFit: 'cover', filter: 'grayscale(0.15) brightness(0.9)', opacity: 0.85 }} />
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', letterSpacing: '0.3px', fontFamily: 'var(--font-body)' }}>
                <strong style={{ color: 'var(--text-light)', fontWeight: '500' }}>10+ projets livrés</strong> · Web & IA
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Right Column */}
        <FadeIn direction="left" delay={0.3} className={styles.rightCol}>
          <div style={{ width: '100%', height: '600px', borderRadius: '24px', overflow: 'hidden', background: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.05)', colorScheme: 'dark' }}>
            <div
              id="mv-cal-inline"
              style={{ width: '100%', height: '100%', overflow: 'scroll' }}
            />
          </div>
        </FadeIn>

      </div>
    </main>
  );
}
