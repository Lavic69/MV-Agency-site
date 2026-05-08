import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CoverKeyword } from "@/components/blog";
import { formatDateMono } from "@/lib/formatDate";
import {
  getPublishedArticles,
  getArticleNumber,
  PILLAR_LABEL,
} from "@/app/blog/_articles";
import styles from "./BlogPreview.module.css";

export function BlogPreview() {
  const articles = getPublishedArticles().slice(0, 4); // featured + 3 dans la liste

  if (articles.length === 0) {
    return (
      <div className={styles.wrap}>
        <p style={{ textAlign: "center", color: "var(--text-muted, #6B7280)", padding: "3rem 0" }}>
          Les premiers articles arrivent très bientôt.
        </p>
      </div>
    );
  }

  const [featured, ...rest] = articles;

  return (
    <div className={styles.wrap}>
      {/* Featured card */}
      <Link href={`/blog/${featured.slug}`} className={styles.featured}>
        <div className={styles.featuredCover}>
          <div className={styles.featuredPillar}>— {PILLAR_LABEL[featured.pillar]}</div>
          <div className={styles.featuredNum}>Nº {getArticleNumber(featured.slug)}</div>
          <CoverKeyword keyword={featured.keyword} size="md" />
        </div>
        <div className={styles.featuredInfo}>
          <span className={styles.featuredTag}>{PILLAR_LABEL[featured.pillar]}</span>
          <h3 className={styles.featuredTitle}>{featured.title}</h3>
          <div className={styles.featuredSep} aria-hidden="true" />
          <p className={styles.featuredExcerpt}>{featured.description}</p>
          <div className={styles.featuredMeta}>
            <span>{formatDateMono(featured.publishedAt)}</span>
            <span>·</span>
            <span>{featured.readingTime ?? 8} MIN DE LECTURE</span>
          </div>
        </div>
      </Link>

      {/* Liste à plat */}
      <div>
        {rest.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className={styles.listRow}>
            <div className={styles.listNum}>{getArticleNumber(article.slug)}</div>
            <div className={styles.listPill}>{PILLAR_LABEL[article.pillar]}</div>
            <div className={styles.listTitle}>{article.title}</div>
            <div className={styles.listMeta}>
              {article.readingTime ?? 8} MIN · {formatDateMono(article.publishedAt)}
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className={styles.ctaWrap}>
        <Link href="/blog" className={styles.ctaLink}>
          Lire tous nos articles
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
