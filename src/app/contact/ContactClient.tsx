"use client";

import React, { useEffect } from 'react';
import { FadeIn } from '@/components/ui/FadeIn';
import { Mail, Zap } from 'lucide-react';
import Cal, { getCalApi } from "@calcom/embed-react";
import { CONTACT_EMAIL } from '@/lib/seo';
import styles from './Contact.module.css';

export default function ContactClient() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        "styles": {
          "branding": {
            "brandColor": "#ffffff"
          }
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    })();
  }, []);

  return (
    <main style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className={styles.container}>
        
        {/* Left Column */}
        <div className={styles.leftCol}>
          <FadeIn direction="up">
            <span className={styles.badge}>Parlons de votre projet</span>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.1}>
            <h1 className={styles.title}>
              Construisons le <span style={{ fontStyle: 'italic', background: 'linear-gradient(90deg, #60a5fa 0%, #ffffff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', paddingRight: '0.1em' }}>futur</span> ensemble.
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className={styles.subtitle}>
              Nous accompagnons les professionnels et les fondateurs avec sincérité, pour concevoir des solutions digitales intuitives, performantes et qui vous ressemblent vraiment.
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
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80" alt="Client 1" style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #222', position: 'relative', zIndex: 4, objectFit: 'cover' }} />
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" alt="Client 2" style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #222', position: 'relative', zIndex: 3, marginLeft: '-10px', objectFit: 'cover' }} />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Client 3" style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #222', position: 'relative', zIndex: 2, marginLeft: '-10px', objectFit: 'cover' }} />
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Client 4" style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #222', position: 'relative', zIndex: 1, marginLeft: '-10px', objectFit: 'cover' }} />
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', letterSpacing: '0.3px', fontFamily: 'var(--font-body)' }}>
                Ils nous ont <strong style={{ color: 'var(--text-light)', fontWeight: '500' }}>rejoint.</strong>
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Right Column */}
        <FadeIn direction="left" delay={0.3} className={styles.rightCol}>
          <div style={{ width: '100%', height: '600px', borderRadius: '24px', overflow: 'hidden', background: 'rgba(20, 20, 20, 0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Cal 
              calLink="victor-marchetti/30min"
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ layout: 'month_view', theme: 'dark' }}
            />
          </div>
        </FadeIn>

      </div>
    </main>
  );
}
