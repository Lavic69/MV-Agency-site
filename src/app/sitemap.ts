import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Sitemap dynamique. Chaque entrée est typée et la structure permet d'ajouter
 * facilement les futures sources :
 *   - Articles MDX sous `content/blog/**` (à brancher quand la stack contenu existe)
 *   - Pages géo (`/agence-web-la-reunion`, etc.) — à ajouter dès création
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
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Sources dynamiques — à brancher quand disponibles :
  // const blogEntries = await getBlogPosts().then(posts => posts.map(...));
  // const geoEntries = GEO_PAGES.map(...);

  return [...staticEntries];
}
