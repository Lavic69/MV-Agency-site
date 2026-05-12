import React from "react";
import { Metadata } from "next";
import { TextReveal } from "@/components/ui/TextReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, buildBreadcrumbSchema, OG_IMAGE } from "@/lib/seo";
import { formatDateMono } from "@/lib/formatDate";
import { BlogClient } from "./BlogClient";
import {
  getPublishedArticles,
  getArticleNumber,
  PILLAR_LABEL,
} from "./_articles";

export const metadata: Metadata = {
  title: "Blog MV Agency : web, IA & SEO pour PME ambitieuses",
  description:
    "Articles approfondis sur la création de sites web, l'intelligence artificielle pour PME, le SEO et le marketing digital — par Victor Marchetti.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog MV Agency — Web, IA, SEO pour PME",
    description:
      "Articles approfondis sur la création de sites web, l'IA pour PME, le SEO et le marketing digital — par Victor Marchetti.",
    url: `${SITE_URL}/blog`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog MV Agency",
    description: "Ressources web, IA et SEO pour PME — par Victor Marchetti.",
    images: [OG_IMAGE.url],
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Accueil", url: SITE_URL },
  { name: "Blog", url: `${SITE_URL}/blog` },
]);

export default function BlogPage() {
  const posts = getPublishedArticles().map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.description,
    date: formatDateMono(article.publishedAt),
    num: getArticleNumber(article.slug),
    keyword: article.keyword,
    category: PILLAR_LABEL[article.pillar],
    readingTime: article.readingTime ?? 8,
  }));

  return (
    <main style={{ paddingBottom: "5rem", minHeight: "100vh", position: "relative" }}>
      <JsonLd data={breadcrumbSchema} />

      <section style={{ minHeight: "40vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10rem 2rem 3rem 2rem", textAlign: "center" }}>
        <StaggerContainer style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <StaggerItem>
            <span style={{ fontFamily: "'SF Mono', Menlo, monospace", fontSize: "0.6875rem", color: "var(--primary)", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "0.875rem" }}>
              — Ressources
            </span>
          </StaggerItem>
          <StaggerItem>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, margin: "0 0 1.5rem 0", lineHeight: 1.1, fontFamily: "var(--font-heading)" }}>
              <TextReveal delay={0.1} inline>Bibliothèque</TextReveal>{' '}
              <TextReveal delay={0.5} inline wordClassName="globalGradientWordItalic">d’Actualités</TextReveal>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p style={{ fontSize: "1.1rem", color: "var(--text-secondary, #B5B7BC)", lineHeight: 1.6, margin: 0, maxWidth: "600px" }}>
              Plongez dans nos réflexions sur l’IA, le design d’interfaces, et l’écosystème digital qui bouscule les codes de demain.
            </p>
          </StaggerItem>
        </StaggerContainer>
      </section>

      <BlogClient posts={posts} />
    </main>
  );
}
