/**
 * Constantes SEO centralisées + schémas Schema.org réutilisables.
 * Source unique de vérité pour : URL site, email, branding, données structurées.
 *
 * ⚠️ Mettre à jour ce fichier en cas de :
 *   - Changement de domaine
 *   - Ajout du SIRET / forme juridique (après immatriculation définitive)
 *   - Ajout de profils sociaux (LinkedIn, Clutch, etc.)
 */

export const SITE_URL = "https://mvagency.ai";
export const SITE_NAME = "MV Agency";
export const SITE_TAGLINE = "Création de site web & IA pour TPE/PME";
export const SITE_DESCRIPTION =
  "MV Agency conçoit des sites web performants et intègre des solutions d'intelligence artificielle pour les TPE, PME et indépendants. Basée à La Réunion, active en Belgique et en France.";

export const CONTACT_EMAIL = "contact@mvagency.ai";
export const FOUNDER_NAME = "Victor Marchetti";
export const FOUNDER_ROLE = "Fondateur";

export const LOCALE = "fr_FR";

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
  legalName: "MV Agency", // TODO: remplacer par la dénomination officielle après immatriculation
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.svg`,
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
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    email: CONTACT_EMAIL,
    contactType: "customer service",
    availableLanguage: ["French"],
    areaServed: ["FR", "BE", "RE"],
  },
  sameAs: [
    // TODO: ajouter au fur et à mesure
    // "https://www.linkedin.com/company/mv-agency",
    // "https://clutch.co/profile/mv-agency",
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
  logo: `${SITE_URL}/logo.svg`,
  image: `${SITE_URL}/opengraph-image`,
  description: SITE_DESCRIPTION,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    addressCountry: "FR",
    addressRegion: "La Réunion",
    // TODO: préciser ville + code postal si adresse pro dédiée
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
