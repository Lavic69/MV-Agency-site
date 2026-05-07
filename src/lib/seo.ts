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
export const LEGAL_LAST_UPDATED = "2026-05-07";

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
