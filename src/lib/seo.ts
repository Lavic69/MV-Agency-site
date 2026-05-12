/**
 * Constantes SEO centralisées + schémas Schema.org réutilisables.
 * Source unique de vérité pour : URL site, email, branding, données structurées,
 * mentions légales, CGV, politique de confidentialité.
 *
 * ⚠️ Mettre à jour ce fichier en cas de :
 *   - Changement de domaine ou d'adresse
 *   - Modification de la forme juridique (passage micro → SASU)
 *   - Ajout de profils sociaux (LinkedIn, Clutch, etc.)
 */

export const SITE_URL = "https://mvagency.ai";
export const SITE_NAME = "MV Agency";
export const SITE_TAGLINE = "Création de site web & IA pour TPE/PME";
export const SITE_DESCRIPTION =
  "MV Agency conçoit des sites web performants et intègre des solutions d'intelligence artificielle pour les TPE, PME et indépendants. Basée à La Réunion, active en Belgique et en France.";

export const CONTACT_EMAIL = "contact@mvagency.ai";
export const FOUNDER_NAME = "Victor Marchetti";
export const FOUNDER_FULL_NAME = "Victor Pierre Alexandre Marchetti";
export const FOUNDER_ROLE = "Fondateur";

export const LOCALE = "fr_FR";

/**
 * Image OG globale — référencée depuis tous les `metadata.openGraph.images`
 * pour garantir que chaque page sert le même visuel social.
 * (Le fichier `src/app/opengraph-image.tsx` n'est appliqué par Next que sur la
 * route `/`. Pour les sous-routes, il faut le référencer explicitement ici.)
 */
export const OG_IMAGE: {
  url: string;
  width: number;
  height: number;
  alt: string;
} = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — Création de site web & IA pour TPE/PME`,
};

/**
 * Données légales — micro-entreprise immatriculée au RCS Saint-Denis de La Réunion.
 * Sources : extrait Kbis 2025A00241, Synthèse Guichet Unique J00120928718 (validée 31/01/2025).
 * Adresse publique volontairement réduite à la commune (siège = domicile de l'entrepreneur).
 * L'adresse complète reste consultable au RCS conformément à l'obligation de publicité légale.
 */
export const LEGAL = {
  legalName: `${FOUNDER_FULL_NAME}`,
  commercialName: SITE_NAME,
  legalForm: "Entrepreneur Individuel — Micro-entreprise",
  siren: "940 349 921",
  siret: "940 349 921 00012",
  ape: "6201Z",
  apeLabel: "Programmation informatique",
  rcs: "RCS Saint Denis de La Réunion",
  rcsManagementNumber: "2025A00241",
  registrationDate: "2025-01-31",
  activityStartDate: "2025-01-27",
  // Adresse publique (commune uniquement) — domicile du dirigeant non divulgué
  addressLocality: "Saint-Denis",
  postalCode: "97400",
  addressRegion: "La Réunion",
  addressCountry: "FR",
  publicAddress: "97400 Saint-Denis, La Réunion, France",
  phone: "+262693465749",
  phoneDisplay: "+262 693 46 57 49",
  vatNotice: "TVA non applicable, art. 293 B du CGI",
  vatNumber: null, // franchise en base
  taxRegime: "Régime spécial BNC",
  publicationDirector: FOUNDER_FULL_NAME,
} as const;

/**
 * Hébergeur — déclaration LCEN (loi 2004-575).
 */
export const HOST = {
  name: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  url: "https://vercel.com",
} as const;

/**
 * Date de la dernière révision des documents légaux affichée en pied de page.
 * Format ISO ; affichage formaté côté composant.
 */
export const LEGAL_LAST_UPDATED = "2026-05-08";

// Zones d'activité pour LocalBusiness / Service.areaServed
export const AREAS_SERVED = [
  { type: "AdministrativeArea", name: "La Réunion", code: "FR-RE" },
  { type: "Country", name: "Belgique", code: "BE" },
  { type: "Country", name: "France", code: "FR" },
] as const;

/**
 * Schéma Organization — identité globale de l'entreprise.
 * À injecter dans le layout racine (présent sur toutes les pages).
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: LEGAL.legalName,
  alternateName: LEGAL.commercialName,
  taxID: LEGAL.siren,
  vatID: LEGAL.vatNumber ?? undefined,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/Logo_Rond_MV_V2.svg`,
    width: 512,
    height: 512,
  },
  description: SITE_DESCRIPTION,
  founder: {
    "@type": "Person",
    name: FOUNDER_NAME,
    jobTitle: FOUNDER_ROLE,
    url: `${SITE_URL}/a-propos`,
  },
  foundingDate: LEGAL.registrationDate,
  contactPoint: {
    "@type": "ContactPoint",
    email: CONTACT_EMAIL,
    telephone: LEGAL.phone,
    contactType: "customer service",
    availableLanguage: ["French"],
    areaServed: ["FR", "BE", "RE"],
  },
  sameAs: [
    "https://www.linkedin.com/company/mv-ai-agency",
    // TODO: ajouter Clutch / Malt quand profils créés
  ],
} as const;

/**
 * Schéma ProfessionalService (LocalBusiness) — présence géographique.
 * Utile pour le SEO local et les AI Overviews Google.
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/Logo_Rond_MV_V2.svg`,
  image: `${SITE_URL}/opengraph-image`,
  description: SITE_DESCRIPTION,
  telephone: LEGAL.phone,
  email: CONTACT_EMAIL,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: LEGAL.addressLocality,
    postalCode: LEGAL.postalCode,
    addressRegion: LEGAL.addressRegion,
    addressCountry: LEGAL.addressCountry,
  },
  areaServed: AREAS_SERVED.map((area) => ({
    "@type": area.type,
    name: area.name,
  })),
  founder: {
    "@type": "Person",
    name: FOUNDER_NAME,
  },
  knowsAbout: [
    "Création de site web",
    "Développement Next.js",
    "Intelligence artificielle pour TPE",
    "Automatisation IA",
    "SEO",
    "Agents IA",
  ],
} as const;

/**
 * Schéma Person — pour la page /a-propos (E-E-A-T expertise/experience).
 */
export const founderPersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/a-propos#person`,
  name: FOUNDER_NAME,
  jobTitle: FOUNDER_ROLE,
  worksFor: {
    "@id": `${SITE_URL}/#organization`,
  },
  url: `${SITE_URL}/a-propos`,
  description:
    "Victor Marchetti, fondateur de MV Agency. Spécialiste création de site web et intégration IA pour TPE et PME.",
  knowsAbout: [
    "Next.js",
    "React",
    "Intelligence artificielle générative",
    "Automatisation",
    "Conception web",
    "E-business",
  ],
  nationality: { "@type": "Country", name: "France" },
} as const;

/* -------------------------------------------------------------------------- */
/*  Schémas par page : Service / Offer / FAQ / Breadcrumb                     */
/* -------------------------------------------------------------------------- */

/**
 * Catalogue des 4 services exposés sur /services.
 * Chaque entrée devient un Schema.org `Service` distinct, rattaché à
 * `provider` = Organization. Les types `serviceType` aident les AI Overviews
 * à classer correctement l'offre.
 */
export const SERVICES: ReadonlyArray<{
  name: string;
  serviceType: string;
  description: string;
  url: string;
}> = [
  {
    name: "Création de site web",
    serviceType: "Web Design and Development",
    description:
      "Sites vitrines premium en Next.js, e-commerce, refontes et landing pages de conversion. SEO optimisé à la racine, design responsive, identité visuelle sur-mesure.",
    url: `${SITE_URL}/services#creation-web`,
  },
  {
    name: "Automatisation",
    serviceType: "Business Process Automation",
    description:
      "Connexion entre vos outils via n8n et Make, automatisation CRM et processus de vente, emailing dynamique, déclencheurs d'événements pour libérer du temps opérationnel.",
    url: `${SITE_URL}/services#automatisation`,
  },
  {
    name: "Intégration d'intelligence artificielle",
    serviceType: "Artificial Intelligence Consulting",
    description:
      "Déploiement d'agents IA et de chatbots souverains, automatisation augmentée par l'IA, génération de contenu assistée. Architecture sécurisée pour garantir la confidentialité.",
    url: `${SITE_URL}/services#ia`,
  },
  {
    name: "Formation et accompagnement",
    serviceType: "Professional Training",
    description:
      "Formation à l'utilisation de votre site, aux outils d'automatisation et aux usages de l'IA en entreprise. Sessions pédagogiques pour rendre vos équipes autonomes.",
    url: `${SITE_URL}/services#formation`,
  },
];

/**
 * Liste des 3 packs commerciaux exposés sur /offres.
 * Pas de prix affiché — `Offer.price` est volontairement omis (cf. FAQ "Pourquoi
 * pas de prix ?"). On utilise `priceSpecification.priceCurrency: EUR` + `availability`
 * pour garder un Offer sémantiquement valide sans engager un prix public.
 */
export const PACKS: ReadonlyArray<{
  name: string;
  description: string;
  highlight: boolean;
}> = [
  {
    name: "Fondation digitale",
    description:
      "Créer votre présence en ligne professionnelle et performante : site vitrine premium jusqu'à 5 pages, design responsive, SEO de base, formulaire de contact, analytics, formation et support technique de lancement.",
    highlight: false,
  },
  {
    name: "Croissance digitale",
    description:
      "Générer des clients et structurer votre acquisition : site avancé jusqu'à 10 pages, SEO profond, landing page conversion, automatisations clés (emailing, CRM), chatbot IA, contenu assisté par IA, formation marketing et 1 session de suivi stratégique.",
    highlight: true,
  },
  {
    name: "Performance IA",
    description:
      "Automatiser et optimiser chaque processus : e-commerce ou plateforme sur-mesure, écosystème IA complet, automatisations avancées, formation et accompagnement renforcé.",
    highlight: false,
  },
];

/**
 * Construit un tableau de schémas `Service` Schema.org pour /services.
 */
export const servicesSchemas = SERVICES.map((service) => ({
  "@context": "https://schema.org" as const,
  "@type": "Service" as const,
  "@id": service.url,
  name: service.name,
  serviceType: service.serviceType,
  description: service.description,
  url: service.url,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: AREAS_SERVED.map((area) => ({
    "@type": area.type,
    name: area.name,
  })),
}));

/**
 * Catalogue d'offres exposé sur /offres — `OfferCatalog` agrégeant 3 `Offer`.
 * Chaque Offer renvoie vers la page contact comme `url` (point d'entrée
 * commercial unique tant qu'il n'y a pas de page produit dédiée).
 */
export const offerCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": `${SITE_URL}/offres#catalog`,
  name: "Packs MV Agency",
  url: `${SITE_URL}/offres`,
  itemListElement: PACKS.map((pack, index) => ({
    "@type": "Offer",
    "@id": `${SITE_URL}/offres#${pack.name.toLowerCase().replace(/\s+/g, "-")}`,
    position: index + 1,
    name: pack.name,
    description: pack.description,
    url: `${SITE_URL}/contact`,
    seller: { "@id": `${SITE_URL}/#organization` },
    availability: "https://schema.org/InStock",
    priceCurrency: "EUR",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "EUR",
      description: "Prix sur devis — périmètre cadré lors d'un appel de découverte de 30 minutes.",
    },
    areaServed: AREAS_SERVED.map((area) => ({
      "@type": area.type,
      name: area.name,
    })),
  })),
} as const;

export type FaqItem = { question: string; answer: string };

/**
 * Construit un schéma FAQPage à partir d'une liste de questions/réponses.
 * Strip les marqueurs Markdown gras (**texte**) qui peuvent apparaître dans
 * les `answer` côté UI mais qui n'ont rien à faire dans le JSON-LD.
 */
export function buildFaqPageSchema(items: ReadonlyArray<FaqItem>, pageUrl: string) {
  const stripMarkdown = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "$1");

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripMarkdown(item.answer),
      },
    })),
  } as const;
}

export type BreadcrumbItem = { name: string; url: string };

/**
 * Construit un schéma BreadcrumbList. Toujours commencer par l'entrée Accueil
 * pour signaler la hiérarchie complète.
 */
export function buildBreadcrumbSchema(items: ReadonlyArray<BreadcrumbItem>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  } as const;
}

export type ArticleSchemaInput = {
  /** URL canonique complète de l'article (ex: `${SITE_URL}/blog/<slug>`) */
  url: string;
  /** Titre H1 de l'article */
  title: string;
  /** Description courte / chapeau */
  description: string;
  /** ISO date YYYY-MM-DD */
  publishedAt: string;
  /** ISO date YYYY-MM-DD — peut être identique à publishedAt */
  updatedAt: string;
  /** URL absolue de l'image cover / OG */
  imageUrl: string;
  /** Mots-clés (tableau ou string CSV) — optionnel */
  keywords?: ReadonlyArray<string>;
};

/**
 * Construit un schéma Article Schema.org pour un article de blog.
 * `author` et `publisher` pointent par référence (`@id`) vers Person Victor
 * et Organization MV Agency déjà déclarés globalement, pour préserver
 * l'unité du knowledge graph.
 */
export function buildArticleSchema(input: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${input.url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
    headline: input.title,
    description: input.description,
    image: input.imageUrl,
    datePublished: input.publishedAt,
    dateModified: input.updatedAt,
    inLanguage: "fr-FR",
    author: { "@id": `${SITE_URL}/a-propos#person` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    ...(input.keywords?.length ? { keywords: input.keywords.join(", ") } : {}),
  } as const;
}
