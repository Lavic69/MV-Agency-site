import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/FadeIn';
import { BlogClient } from './BlogClient';
import styles from './Blog.module.css';

export const metadata: Metadata = {
  title: 'Blog & Actualités | MV Agency',
  description: 'Découvrez nos derniers articles, conseils en stratégie digitale, et nos analyses sur les IA génératives.',
};

// Tableau de test pour le "CMS IA".
// Vous n'aurez qu'à me donner un texte et une image, je l'ajouterai ici.
const posts = [
  {
    slug: 'claude-skills-guide',
    title: 'Claude Skills Guide',
    excerpt: 'Chargez des dossiers complets d\'instructions à la demande pour donner à Claude les bons workflows et règles métiers selon la tâche.',
    date: 'Apr 11, 2026',
    cover: '/projects/stark-nine.png',
    category: 'Intelligence Artificielle'
  },
  {
    slug: 'idea-to-saas',
    title: 'Idea to SaaS in 48 Hours',
    excerpt: 'Un guide étape par étape expliquant comment utiliser nos agents IA pour abstraire toute la logique technique de votre MVP SaaS.',
    date: 'Apr 03, 2026',
    cover: '/projects/hosan.png',
    category: 'SaaS'
  },
  {
    slug: 'pourquoi-integrer-ia-pme',
    title: 'Pourquoi intégrer l\'IA en 2026 ?',
    excerpt: 'Découvrez les cas d\'usage les plus rentables pour automatiser vos tâches rébarbatives et vous concentrer sur la vraie valeur ajoutée.',
    date: 'Mar 28, 2026',
    cover: '/projects/lataniers.png',
    category: 'Intelligence Artificielle'
  }
];

export default function BlogPage() {
  return (
    <main style={{ paddingBottom: '5rem', minHeight: '100vh', position: 'relative' }}>
      
      {/* SECTION HERO */}
      <section style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '10rem', paddingBottom: '3rem', textAlign: 'center', padding: '10rem 2rem 3rem 2rem' }}>
        <FadeIn delay={0.1} direction="up">
          <span style={{ fontSize: '0.85rem', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>Ressources</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, margin: '0 0 1.5rem 0', lineHeight: 1.1, fontFamily: 'var(--font-heading)' }}>
            Bibliothèque d'Actualités
          </h1>
        </FadeIn>
        <FadeIn delay={0.3} direction="up" style={{ maxWidth: '600px' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            Plongez dans nos réflexions sur l'IA, le design d'interfaces, et l'écosystème digital qui bouscule les codes de demain.
          </p>
        </FadeIn>
      </section>

      {/* COMPOSANT INTERACTIF : RECHERCHE + FILTRES + GRILLE */}
      <BlogClient posts={posts} />

    </main>
  );
}
