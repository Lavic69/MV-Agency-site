import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, buildBreadcrumbSchema } from "@/lib/seo";
import { getPublishedArticles } from "../blog/_articles";

export const metadata: Metadata = {
  title: "Plan du site",
  description:
    "Plan du site MV Agency : navigation complète, pages services, offres, blog, cas clients, pages locales et mentions légales.",
  alternates: { canonical: "/plan-du-site" },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Accueil", url: SITE_URL },
  { name: "Plan du site", url: `${SITE_URL}/plan-du-site` },
]);

type SectionLink = { href: string; label: string; description?: string };
type Section = { title: string; links: SectionLink[] };

const sections: Section[] = [
  {
    title: "Pages principales",
    links: [
      { href: "/", label: "Accueil", description: "L'art du web, la puissance de l'IA" },
      { href: "/services", label: "Services", description: "Les 4 piliers de notre accompagnement" },
      { href: "/offres", label: "Offres & Packs", description: "Fondation, Croissance, Performance IA" },
      { href: "/a-propos", label: "À propos", description: "Qui est derrière MV Agency" },
      { href: "/contact", label: "Contact", description: "Réserver un appel découverte" },
    ],
  },
  {
    title: "Réalisations",
    links: [
      { href: "/cas-clients", label: "Cas clients", description: "Nos projets et leurs résultats" },
    ],
  },
  {
    title: "Blog & Ressources",
    links: [
      { href: "/blog", label: "Blog & Actualités", description: "Articles sur le web, l'IA et le SEO" },
    ],
  },
  {
    title: "Pages locales — Zones d'intervention",
    links: [
      {
        href: "/agence-web-la-reunion",
        label: "Agence web & IA à La Réunion (974)",
        description: "Saint-Denis, Saint-Pierre, Saint-Paul, Le Port — toute l'île",
      },
    ],
  },
  {
    title: "Légal",
    links: [
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
      { href: "/cgv", label: "Conditions Générales de Vente" },
    ],
  },
];

const articles = getPublishedArticles();

export default function PlanDuSitePage() {
  return (
    <main
      style={{
        maxWidth: "880px",
        margin: "0 auto",
        padding: "8rem 1.5rem 5rem",
        position: "relative",
      }}
    >
      <JsonLd data={breadcrumbSchema} />

      <header style={{ textAlign: "center", marginBottom: "4rem" }}>
        <span
          style={{
            display: "inline-block",
            fontSize: "0.85rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "var(--primary)",
            marginBottom: "1rem",
          }}
        >
          Navigation
        </span>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            fontWeight: 700,
            margin: "0 0 1rem 0",
            lineHeight: 1.1,
          }}
        >
          Plan du site
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.05rem",
            lineHeight: 1.6,
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          L'intégralité des pages publiques du site MV Agency, organisées par section
          pour faciliter votre navigation.
        </p>
      </header>

      {sections.map((section) => (
        <section key={section.title} style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.5rem",
              fontWeight: 600,
              margin: "0 0 1.5rem 0",
              paddingBottom: "0.75rem",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {section.title}
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {section.links.map((link) => (
              <li key={link.href} style={{ marginBottom: "1rem" }}>
                <Link
                  href={link.href}
                  style={{
                    display: "block",
                    color: "var(--text-light)",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "1rem",
                    lineHeight: 1.4,
                  }}
                >
                  {link.label}
                </Link>
                {link.description && (
                  <span
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.9rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {link.description}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}

      {articles.length > 0 && (
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.5rem",
              fontWeight: 600,
              margin: "0 0 1.5rem 0",
              paddingBottom: "0.75rem",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            Articles de blog
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {articles.map((article) => (
              <li key={article.slug} style={{ marginBottom: "1rem" }}>
                <Link
                  href={`/blog/${article.slug}`}
                  style={{
                    display: "block",
                    color: "var(--text-light)",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "1rem",
                    lineHeight: 1.4,
                  }}
                >
                  {article.title}
                </Link>
                <span
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    lineHeight: 1.5,
                  }}
                >
                  {article.description}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p
        style={{
          marginTop: "4rem",
          padding: "1.5rem",
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "0.75rem",
          color: "var(--text-muted)",
          fontSize: "0.9rem",
          lineHeight: 1.6,
        }}
      >
        Ce plan du site est la version humaine. La{" "}
        <a href="/sitemap.xml" style={{ color: "var(--primary)" }}>
          version XML pour les moteurs de recherche
        </a>{" "}
        est mise à jour automatiquement.
      </p>
    </main>
  );
}
