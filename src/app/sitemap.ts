import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getPublishedArticles } from "./blog/_articles";

/**
 * Sitemap dynamique.
 *
 * Sources :
 *  - Routes statiques principales (table ci-dessous)
 *  - Articles de blog : itération sur le registre `_articles.ts`
 *
 * À ajouter dès création :
 *  - Pages géo (`/agence-web-la-reunion`, etc.)
 *
 * Les pages légales restent en `noindex` côté metadata et n'apparaissent donc pas ici.
 */

type SitemapEntry = MetadataRoute.Sitemap[number];

const STATIC_ROUTES: ReadonlyArray<{
  path: string;
  changeFrequency: SitemapEntry["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/offres", changeFrequency: "monthly", priority: 0.9 },
  { path: "/cas-clients", changeFrequency: "weekly", priority: 0.85 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/a-propos", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/agence-web-la-reunion", changeFrequency: "monthly", priority: 0.95 },
  { path: "/plan-du-site", changeFrequency: "monthly", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = getPublishedArticles().map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Pages géo — à brancher quand les premières pages seront créées :
  // const geoEntries = GEO_PAGES.map(...);

  return [...staticEntries, ...blogEntries];
}
