"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/FadeIn';
import styles from './Blog.module.css';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  cover: string;
  category: string;
}

interface BlogClientProps {
  posts: Post[];
}

const ALL_CATEGORY = "Tout";

export const BlogClient: React.FC<BlogClientProps> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);

  // Catégories dérivées des articles publiés — pas de hardcode.
  const categories = useMemo(
    () => [ALL_CATEGORY, ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );

  const hasPosts = posts.length > 0;

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === ALL_CATEGORY || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // État vide : aucun article publié dans le registre
  if (!hasPosts) {
    return (
      <section style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 2rem 4rem' }}>
        <FadeIn direction="up">
          <div
            style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              borderRadius: '1rem',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <p style={{ color: 'var(--text-light)', fontSize: '1.05rem', margin: '0 0 0.75rem' }}>
              Les premiers articles arrivent très bientôt.
            </p>
            <p style={{ color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
              En attendant, découvrez nos{' '}
              <Link href="/cas-clients" style={{ color: 'var(--primary)' }}>
                cas clients
              </Link>{' '}
              ou{' '}
              <Link href="/contact" style={{ color: 'var(--primary)' }}>
                réservez un appel offert
              </Link>
              .
            </p>
          </div>
        </FadeIn>
      </section>
    );
  }

  return (
    <>
      <FadeIn delay={0.4} direction="up" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchBar}>
            <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              type="text"
              placeholder="Rechercher un article..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className={styles.searchShortcut}>/</div>
          </div>
          {categories.length > 1 && (
            <div className={styles.filterList}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filterPill} ${activeCategory === cat ? styles.filterPillActive : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </FadeIn>

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem 2rem' }}>
        {filteredPosts.length > 0 ? (
          <div className={styles.postGrid}>
            {filteredPosts.map((post, idx) => (
              <FadeIn key={post.slug} delay={0.1 * idx} direction="up" style={{ height: '100%' }}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div className={styles.postCard}>
                    <div className={styles.imageWrapper}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.cover} alt={post.title} className={styles.cardImage} />
                    </div>
                    <div className={styles.cardContent}>
                      <h2 className={styles.cardTitle}>{post.title}</h2>
                      <div className={styles.titleSeparator}></div>
                      <p className={styles.cardExcerpt}>{post.excerpt}</p>
                      <div className={styles.datePill}>{post.date}</div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            Aucun article ne correspond à votre recherche.
          </div>
        )}
      </section>
    </>
  );
};
