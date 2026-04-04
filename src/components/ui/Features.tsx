"use client";

import React from "react";
import styles from "./Features.module.css";
import { Globe, Sparkles, Plus, ArrowUp, Target, CalendarCheck } from "lucide-react";

export default function FeaturesSection() {
    return (
        <div className={styles.section}>
            <div className={styles.grid}>
                {/* BLOC 1 : CREATION WEB */}
                <div className={`${styles.card} ${styles.groupHoverTranslate}`}>
                    <div className={styles.iconWrapper}>
                        <Globe size={24} />
                    </div>
                    <h3 className={styles.cardTitle}>Création de sites web</h3>
                    <p className={styles.cardText}>
                        Des plateformes modernes, sur-mesure (Webflow, WordPress, Odoo) et spécialement conçues pour convertir vos visiteurs en clients.
                    </p>
                    <BrowserIllustration />
                </div>

                {/* BLOC 2 : IA & AUTOMATISATION */}
                <div className={`${styles.card} ${styles.groupHoverTranslate}`}>
                    <div className={styles.iconWrapper}>
                        <Sparkles size={24} />
                    </div>
                    <h3 className={styles.cardTitle}>IA & Automatisation</h3>
                    <p className={styles.cardText}>
                        Des agents conversationnels intelligents et des automatisations no-code pour vous faire gagner des heures sur vos tâches répétitives.
                    </p>
                    <AIAssistantIllustration />
                </div>

                {/* BLOC 3 : FORMATION & ACCOMPAGNEMENT */}
                <div className={`${styles.card} ${styles.groupHoverTranslate}`}>
                    <div className={styles.iconWrapper}>
                        <CalendarCheck size={24} />
                    </div>
                    <h3 className={styles.cardTitle}>Formation & Pédagogie</h3>
                    <p className={styles.cardText}>
                        Nous ne vous laissons pas seul avec un produit brut. Nous vous formons et vous accompagnons pour une autonomie totale.
                    </p>
                    <MeetingIllustration />
                </div>
            </div>
        </div>
    );
}

const BrowserIllustration = () => {
    return (
        <div className={`${styles.illustrationCard} ${styles.translateTarget}`} aria-hidden>
            {/* Browser top bar */}
            <div style={{ display: 'flex', gap: '5px', marginBottom: '14px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
            </div>
            {/* Browser content wireframe */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ width: '100%', height: '35px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ flex: 2, height: '45px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}></div>
                    <div style={{ flex: 1, height: '45px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}></div>
                </div>
            </div>
        </div>
    );
}

const AIAssistantIllustration = () => {
    return (
        <div className={`${styles.illustrationCard} ${styles.translateTarget}`} style={{ paddingBottom: '1.25rem' }} aria-hidden>
            <div style={{ width: '100%' }}>
                <Sparkles size={16} color="#B19EEF" strokeWidth={2.5} />
                <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#e5e7eb', lineHeight: 1.4 }}>
                    Analyse ma boîte mail, pré-rédige les réponses et automatise ma prise de RDV.
                </p>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', margin: '1rem -1rem -1.25rem -1rem', padding: '0.75rem 1rem' }}>
                <div style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '0.75rem' }}>Demander à l'assistant IA</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <Plus size={14} color="#9ca3af" />
                        </div>
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <Target size={14} color="#9ca3af" />
                        </div>
                    </div>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <ArrowUp size={16} color="#fff" strokeWidth={3} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const MeetingIllustration = () => {
    const MESCHAC_AVATAR = 'https://avatars.githubusercontent.com/u/47919550?v=4';
    const BERNARD_AVATAR = 'https://avatars.githubusercontent.com/u/31113941?v=4';
    const THEO_AVATAR = 'https://avatars.githubusercontent.com/u/68236786?v=4';

    return (
        <div className={`${styles.illustrationCard} ${styles.translateTarget}`} aria-hidden>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                   <div style={{ marginBottom: '4px', fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>Formation IA & Outils</div>
                   <div style={{ display: 'flex', gap: '8px', fontSize: '0.8rem' }}>
                       <span style={{ color: '#9ca3af' }}>14:30 - 15:45</span>
                   </div>
                </div>
                <div style={{ backgroundColor: 'rgba(37,99,235,0.15)', color: '#60a5fa', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>
                    MEET
                </div>
            </div>
            
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ display: 'flex' }}>
                    {[
                        { src: MESCHAC_AVATAR, alt: 'Team' },
                        { src: BERNARD_AVATAR, alt: 'Team' },
                        { src: THEO_AVATAR, alt: 'Team' },
                    ].map((avatar, index) => (
                        <div key={index} style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#000', border: '2px solid #111', marginLeft: index !== 0 ? '-8px' : '0' }}>
                            <img style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} src={avatar.src} alt={avatar.alt} />
                        </div>
                    ))}
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 500 }}>
                    Point Stratégique
                </div>
            </div>
        </div>
    );
}
