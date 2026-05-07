import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * robots.txt — autorise explicitement les principaux bots IA en plus de Googlebot.
 *
 * Bots IA listés (ordre = ordre du GEO_Plan §6) :
 *  - GPTBot, OAI-SearchBot      → ChatGPT crawler + ChatGPT search
 *  - ClaudeBot, anthropic-ai    → Anthropic crawlers (Claude)
 *  - PerplexityBot              → Perplexity
 *  - Google-Extended            → consent Gemini / Bard / AI Overviews
 *  - CCBot                      → Common Crawl (corpus utilisé par de nombreux LLMs)
 *  - Applebot-Extended          → Apple Intelligence
 *  - cohere-ai                  → Cohere
 *  - Bytespider                 → ByteDance / Doubao (refus possible si non souhaité)
 *
 * On définit une règle "*" et on liste chaque bot IA séparément avec `allow: /`
 * pour rendre l'autorisation explicite et auditable.
 */
export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "anthropic-ai",
    "Claude-Web",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "CCBot",
    "Applebot-Extended",
    "cohere-ai",
    "Meta-ExternalAgent",
    "Bytespider",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
      ...aiBots.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/private/"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
