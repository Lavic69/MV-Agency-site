"use client";

import React, { useState } from 'react';
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

const CATEGORIES = ["Tout", "Intelligence Artificielle", "Développement Web", "SaaS", "Outils"];

export const BlogClient: React.FC<BlogClientProps> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState("Tout");

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Tout" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
          <div className={styles.filterList}>
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                className={`${styles.filterPill} ${activeCategory === cat ? styles.filterPillActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
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
