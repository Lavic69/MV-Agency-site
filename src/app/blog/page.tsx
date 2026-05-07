import React from 'react';
import { Metadata } from 'next';
import { FadeIn } from '@/components/ui/FadeIn';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL, buildBreadcrumbSchema } from '@/lib/seo';
import { BlogClient } from './BlogClient';
import { getPublishedArticles, PILLAR_LABEL } from './_articles';

export const metadata: Metadata = {
  title: 'Blog & Actualités | MV Agency',
  description:
    "Articles approfondis sur la création de sites web, l'intelligence artificielle pour PME, le SEO et le marketing digital — par Victor Marchetti.",
  alternates: { canonical: '/blog' },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Accueil', url: SITE_URL },
  { name: 'Blog', url: `${SITE_URL}/blog` },
]);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

export default function BlogPage() {
  // Le registre est statique côté server — on le mappe au format attendu par BlogClient.
  const posts = getPublishedArticles().map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.description,
    date: formatDate(article.publishedAt),
    cover: article.cover,
    category: PILLAR_LABEL[article.pillar],
  }));

  return (
    <main style={{ paddingBottom: '5rem', minHeight: '100vh', position: 'relative' }}>
      <JsonLd data={breadcrumbSchema} />

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
