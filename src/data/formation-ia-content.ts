/**
 * Contenu factorisé des pages Formation IA.
 * Une seule source de vérité pour Réunion + Belgique.
 *
 * Édition : un changement dans `common` se propage aux deux pages.
 * Différences territoriales : dans `reunion` et `belgique` (TerritoireContent).
 */

export type Territoire = "reunion" | "belgique";

export interface TerritoireContent {
  slug: string;
  nom: string;
  prefix: string; // "à la" | "en"
  villes: string[];
  faqZone: string;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  choices: { label: string; points: number }[];
}

export interface DiagnosticProfile {
  scoreMin: number;
  scoreMax: number;
  name: string;
  message: string;
}

export interface MethodPhase {
  num: number;
  title: string;
  durationLabel: string;
  deliverable: string;
  body: string;
}

export interface Pillar {
  icon: string; // lucide icon name
  title: string;
  body: string;
}

export interface FormationFaqItem {
  question: string;
  /**
   * If empty string (""), the renderer MUST substitute `territoires[t].faqZone`
   * for the active territory. Treat "" as a sentinel for territory-aware answers.
   */
  answer: string;
  territoireOverride?: Partial<Record<Territoire, string>>;
}

export interface CannedSector {
  id: string;
  keywords: string[];
  axes: [string, string, string];
}

export interface FormationIACommon {
  hero: {
    h1: string;
    /** Lead fragment of the H1 (no strikethrough). */
    h1Main: string;
    /** Trailing fragment of the H1 (rendered with animated strikethrough). */
    h1Strike: string;
    sub: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    badge: string;
  };
  diagnostic: {
    title: string;
    intro: string;
    questions: DiagnosticQuestion[];
    profiles: DiagnosticProfile[];
  };
  differentiation: {
    title: string;
    intro: string;
    cards: { title: string; body: string }[];
  };
  method: {
    title: string;
    intro: string;
    phases: MethodPhase[];
  };
  roiCalculator: {
    title: string;
    intro: string;
    sliders: { id: string; label: string; min: number; max: number; default: number }[];
    recuperablePct: number; // 0.6
    resultLabel: string;
    subtext: string;
    cta: { label: string; href: string };
  };
  caseStudy: {
    title: string;
    avant: string;
    intervention: string;
    apres: string;
  };
  beforeAfter: {
    title: string;
    workflowName: string;
    before: { duree: string; outils: string[]; quality: string };
    after: { duree: string; outils: string[]; quality: string };
  };
  pillars: {
    title: string;
    intro: string;
    items: Pillar[];
  };
  forWhom: {
    title: string;
    personas: { label: string; body: string }[];
  };
  miniAudit: {
    title: string;
    intro: string;
    placeholder: string;
    sectors: CannedSector[];
    defaultAxes: [string, string, string];
    ctaAfter: { label: string; href: string };
  };
  faq: {
    title: string;
    items: FormationFaqItem[];
  };
  ctaFinal: {
    title: string;
    body: string;
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
}

// VICTOR TO FILL: Calendly URL once available. Currently fallback to /contact.
const CALENDLY_URL = "/contact"; // VICTOR TO FILL: replace with Calendly link

export const formationIACommon: FormationIACommon = {
  hero: {
    h1: "Déployez l'IA dans votre équipe, avec une méthode, pas un cours ChatGPT.",
    h1Main: "Déployez l'IA dans votre équipe, avec une méthode,",
    h1Strike: "pas un cours ChatGPT.",
    sub: "Audit de votre écosystème, sélection des bons outils, formation intra-entreprise en présentiel.",
    ctaPrimary: { label: "Réserver l'appel gratuit", href: CALENDLY_URL },
    ctaSecondary: { label: "Voir notre méthode", href: "#methode" },
    badge: "Audit gratuit · 30 min",
  },
  diagnostic: {
    title: "Où en êtes-vous avec l'IA ?",
    intro: "4 questions pour situer votre maturité IA et identifier la prochaine étape concrète.",
    questions: [
      {
        id: "usage",
        question: "Vos équipes utilisent-elles déjà l'IA ?",
        choices: [
          { label: "Pas du tout", points: 0 },
          { label: "Occasionnellement", points: 1 },
          { label: "Régulièrement, sans méthode", points: 3 },
          { label: "Oui, de manière structurée", points: 4 },
        ],
      },
      {
        id: "mapping",
        question: "Avez-vous identifié les tâches répétitives où l'IA pourrait aider ?",
        choices: [
          { label: "Non, jamais réfléchi", points: 0 },
          { label: "Quelques-unes, dans un coin de la tête", points: 2 },
          { label: "Beaucoup, mais sans plan", points: 3 },
          { label: "Cartographie complète existante", points: 4 },
        ],
      },
      {
        id: "frein",
        question: "Quel est le frein principal en interne ?",
        choices: [
          { label: "Manque de compétences", points: 1 },
          { label: "Méfiance des équipes", points: 2 },
          { label: "Manque de temps", points: 3 },
          { label: "Manque de méthode", points: 4 },
        ],
      },
      {
        id: "stack",
        question: "Votre stack outils actuelle ?",
        choices: [
          { label: "Basique (mail, Office)", points: 1 },
          { label: "SaaS modernes (Notion, Slack…)", points: 2 },
          { label: "Avancée (no-code, automations)", points: 3 },
          { label: "Hybride avancée (custom + IA déjà)", points: 4 },
        ],
      },
    ],
    profiles: [
      {
        scoreMin: 0,
        scoreMax: 4,
        name: "Curieux non équipé",
        message:
          "Vous démarrez. Bonne nouvelle : on commence par l'audit. Vous repartez avec un plan IA clair en 1 journée, sans surcharger vos équipes.",
      },
      {
        scoreMin: 5,
        scoreMax: 9,
        name: "En exploration",
        message:
          "Vous testez. Il vous manque une méthode pour passer du gadget au gain réel. Notre audit + formation structure tout ça en moins d'une semaine.",
      },
      {
        scoreMin: 10,
        scoreMax: 13,
        name: "Pratiquant désordonné",
        message:
          "Votre équipe utilise déjà l'IA, mais en silos. On audite l'existant et on consolide en process partagés et outils harmonisés.",
      },
      {
        scoreMin: 14,
        scoreMax: 16,
        name: "Avancé",
        message:
          "Vous êtes en avance sur 90 % des PME. On apporte des automatisations sur-mesure (n8n, MCP, agents Claude) et la formation aux niveaux suivants.",
      },
    ],
  },
  differentiation: {
    title: "Pas une formation ChatGPT de plus.",
    intro: "Trois choses qui changent tout.",
    cards: [
      {
        title: "On commence par auditer",
        body: "Avant de former, on regarde **votre** quotidien. Pas de cours générique, un plan calibré sur vos process.",
      },
      {
        title: "On choisit VOS outils",
        body: "Pas forcément ChatGPT. Claude, n8n, Make, MCP, Notion AI, selon ce que vous avez et ce que vous voulez.",
      },
      {
        title: "On forme sur VOS cas réels",
        body: "Vos vrais documents, vos vrais workflows. Pas de slides bidons, pas de jargon.",
      },
    ],
  },
  method: {
    title: "Notre méthode en 3 phases",
    intro: "De l'état des lieux à l'autonomie complète de vos équipes.",
    phases: [
      {
        num: 1,
        title: "Audit IA sur site",
        durationLabel: "1 jour sur place",
        deliverable: "Cartographie outils + process + opportunités IA priorisées",
        body: "On vient chez vous. On observe ce qui prend du temps, ce qui se répète, ce qui agace. On rentre avec un rapport clair des 5 à 10 leviers IA prioritaires pour votre activité.",
      },
      {
        num: 2,
        title: "Sélection des outils",
        durationLabel: "Recommandation incluse",
        deliverable: "Stack IA adaptée à votre écosystème actuel",
        body: "Pas de dogme. On choisit selon ce que vous avez déjà : Claude, n8n, Make, GPT custom, MCP, Notion AI… On vous explique pourquoi chaque outil, ce qu'il coûte, ce qu'il rapporte.",
      },
      {
        num: 3,
        title: "Formation intra-entreprise",
        durationLabel: "1 à 3 jours en présentiel",
        deliverable: "Vos équipes autonomes + suivi 3 mois inclus",
        body: "Présentiel chez vous, sur vos vrais cas d'usage. Pas de slides bidons, pas de jargon. Vos équipes manipulent, comprennent, repartent autonomes. Suivi : 1 visio/mois pendant 3 mois.",
      },
    ],
  },
  roiCalculator: {
    title: "Combien de temps votre équipe pourrait récupérer ?",
    intro: "Ajustez les sliders selon votre réalité. On calcule une projection conservatrice (60 % de récupération).",
    sliders: [
      { id: "emails", label: "Heures/sem sur emails et messages", min: 0, max: 15, default: 5 },
      { id: "reporting", label: "Heures/sem sur reporting et synthèses", min: 0, max: 10, default: 3 },
      { id: "recherche", label: "Heures/sem sur recherche d'information", min: 0, max: 8, default: 2 },
      { id: "repetitif", label: "Heures/sem sur tâches répétitives", min: 0, max: 12, default: 4 },
    ],
    recuperablePct: 0.6,
    resultLabel:
      "Avec une formation IA bien déployée, votre équipe pourrait récupérer **~{mensuelLabel}** par personne et par mois.",
    subtext: "Sur un audit MV Agency, on identifie les automatisations qui réalisent ce gain. Ce qu'on ne peut pas automatiser, on le dit.",
    cta: { label: "Voir comment on y arrive", href: CALENDLY_URL },
  },
  caseStudy: {
    title: "Un cas concret",
    avant:
      "Un dirigeant de PME, déjà à l'aise avec l'IA, voulait passer à la vitesse supérieure et structurer l'usage de Claude pour lui et son équipe — suite au boom récent.",
    intervention:
      "Mini-audit léger (le niveau client était déjà bon), puis formation complète sur Claude : les bases (prompts, limites, fonctionnement), l'exploration de Claude Code (écarté pour leur cas), et surtout le branchement de Claude sur leur écosystème via plugins / MCP.",
    apres:
      "Trois résultats mesurés :\n\n1. **Production documentaire accélérée** — Excel, Word, présentations : gain de temps massif et qualité supérieure.\n2. **Tracking digital intégré** — plugins/MCP connectés à Claude pour le suivi des stats web + réseaux et la production d'audits directement depuis l'IA.\n3. **Volet comptable partiellement automatisé** — réduction des frais d'expert-comptable.\n\nL'accompagnement s'est poursuivi sur plusieurs mois au-delà du suivi 3 mois inclus.",
  },
  beforeAfter: {
    title: "Avant / après IA, sur un workflow type",
    workflowName: "Produire un compte-rendu de réunion + le diffuser",
    before: {
      duree: "1h45",
      outils: ["Notes manuelles", "Word", "Mail", "OneDrive"],
      quality: "Variable selon fatigue, action items oubliés",
    },
    after: {
      duree: "12 min",
      outils: ["Claude (transcription + structuration auto)"],
      quality: "Structuré, action items extraits, diffusion automatique",
    },
  },
  pillars: {
    title: "Pourquoi MV Agency",
    intro: "Quatre raisons concrètes de nous choisir pour votre formation IA.",
    items: [
      {
        icon: "Wrench",
        title: "On s'adapte à votre écosystème",
        body: "On apprend vos outils. On ne vous force pas à changer de stack pour faire plaisir à notre vendeur préféré.",
      },
      {
        icon: "MapPin",
        title: "On vient chez vous",
        body: "Présentiel à la Réunion et en Belgique. Visio possible pour les modules de suivi.",
      },
      {
        icon: "GraduationCap",
        title: "On pratique l'IA chaque jour",
        body: "Ce site, nos process internes, nos automatisations. La preuve par la pratique, pas la théorie.",
      },
      {
        icon: "MessageCircle",
        title: "Pédagogie sans jargon",
        body: "On explique tout de A à Z. Les équipes non-tech sont les bienvenues — et souvent celles qui progressent le plus.",
      },
    ],
  },
  forWhom: {
    title: "Pour qui ?",
    personas: [
      { label: "PME 10-50 salariés", body: "Dirigeants qui voient l'IA partout, sentent qu'ils ratent quelque chose, veulent une vraie stratégie." },
      { label: "Cabinets / professions libérales", body: "Avocats, experts-comptables, médecins, kinés. Gain de temps sur les tâches répétitives métier." },
      { label: "ETI / grands comptes", body: "Déploiement par département (marketing, RH, ops). Formation par batch." },
      { label: "Indépendants en croissance", body: "Vous êtes seul·e ou en mini-équipe, l'IA peut multiplier votre capacité opérationnelle." },
    ],
  },
  miniAudit: {
    title: "Un mini audit IA en 10 secondes",
    intro: "Décrivez votre activité en une phrase. On vous propose 3 axes IA actionnables immédiatement.",
    placeholder: "Ex : Je dirige une pharmacie de 8 collaborateurs à Saint-Denis…",
    // VICTOR TO FILL: refine the 3 axes per sector with Victor's input.
    sectors: [
      {
        id: "commerce",
        keywords: ["boutique", "vente", "magasin", "e-commerce", "retail", "shop"],
        axes: [
          "Automatiser les réponses aux questions clients récurrentes (livraison, dispo, retours).",
          "Générer les fiches produits + descriptions SEO en masse depuis un tableur.",
          "Synthétiser les avis clients mensuels en un brief actionnable pour l'équipe.",
        ],
      },
      {
        id: "sante",
        keywords: ["médecin", "pharmacie", "cabinet médical", "kiné", "ostéo", "infirmier", "santé"],
        axes: [
          "Pré-trier les messages patients hors-RDV (administratif / urgence / question simple).",
          "Aider à la rédaction des comptes-rendus de consultation à partir de notes vocales.",
          "Veille réglementaire automatisée + alertes sur les nouvelles recommandations HAS.",
        ],
      },
      {
        id: "juridique",
        keywords: ["avocat", "notaire", "juriste", "cabinet d'avocats", "droit"],
        axes: [
          "Résumé d'arrêts longs en 5 points clés pour gagner sur la veille.",
          "Première rédaction de courriers types (mise en demeure, relance) à valider.",
          "Recherche de jurisprudence sur un cas, ressortie en bullet points avec sources.",
        ],
      },
      {
        id: "immobilier",
        keywords: ["agence immobilière", "immobilier", "syndic", "agent immobilier"],
        axes: [
          "Générer des descriptions de biens à partir d'une fiche technique + photos.",
          "Qualifier les leads entrants automatiquement (urgence, budget, type recherché).",
          "Synthèse hebdomadaire du marché local pour vos newsletters propriétaires.",
        ],
      },
      {
        id: "services-pro",
        keywords: ["conseil", "consulting", "freelance", "agence", "consultant"],
        axes: [
          "Pré-rédaction de propositions commerciales à partir d'un brief court.",
          "Veille concurrentielle automatisée sur 5 acteurs de votre marché.",
          "Synthèse des notes de réunion + extraction des action items.",
        ],
      },
      {
        id: "restauration",
        keywords: ["restaurant", "café", "traiteur", "bar", "brasserie"],
        axes: [
          "Génération hebdomadaire des posts réseaux sociaux à partir du menu.",
          "Réponses aux avis Google/TripAdvisor en personnalisé et en quelques minutes.",
          "Calcul d'aide à la décision menu : marge, popularité, saisonnalité.",
        ],
      },
      {
        id: "btp",
        keywords: ["bâtiment", "construction", "artisan", "chantier", "BTP", "maçon", "électricien", "plombier"],
        axes: [
          "Devis chiffrés rapides à partir d'une visite + photos.",
          "Comptes-rendus de chantier auto à partir de notes vocales de fin de journée.",
          "Suivi des normes (DTU, NF) avec alertes IA sur les évolutions.",
        ],
      },
      {
        id: "transport",
        keywords: ["transport", "logistique", "livraison", "fret"],
        axes: [
          "Optimisation des tournées en intégrant trafic + contraintes client.",
          "Réponses automatiques aux questions de suivi de livraison clients.",
          "Synthèse mensuelle des indicateurs flotte pour le pilotage.",
        ],
      },
      {
        id: "tourisme",
        keywords: ["hôtel", "tourisme", "gîte", "location", "tour-opérateur"],
        axes: [
          "Réponses multilingues aux demandes d'info séjour (FR / EN / NL / DE).",
          "Génération d'itinéraires personnalisés selon profil voyageur.",
          "Synthèse hebdomadaire des avis pour ajuster l'offre.",
        ],
      },
      {
        id: "agro",
        keywords: ["agriculture", "agroalimentaire", "exploitation", "ferme", "viticole"],
        axes: [
          "Veille marché + cours des matières premières automatisée.",
          "Documentation traçabilité simplifiée par dictée + IA.",
          "Réponses aux demandes B2B (cahiers des charges) accélérées.",
        ],
      },
    ],
    defaultAxes: [
      "Automatiser les emails et messages récurrents pour libérer 4-8 h par semaine et par personne.",
      "Synthétiser et structurer vos documents (PDF, notes, comptes-rendus) en quelques secondes.",
      "Mettre en place une veille intelligente sur vos sujets clés, livrée en un brief par semaine.",
    ],
    ctaAfter: { label: "Audit complet sur votre activité — RDV gratuit", href: CALENDLY_URL },
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        question: "Combien ça coûte ?",
        answer: "Sur devis après l'appel découverte gratuit. On ne facture jamais à l'aveugle. Le périmètre dépend de la taille de votre équipe et des objectifs.",
      },
      {
        question: "Combien de temps dure une formation ?",
        answer: "Audit : 1 jour sur place. Formation : 1 à 3 jours selon le périmètre. Suivi : 3 mois inclus (1 session visio/mois).",
      },
      {
        question: "On part de zéro avec l'IA, c'est possible ?",
        answer: "Oui. Plus de 50 % de nos formations démarrent là. Notre méthode est calibrée pour les équipes non-tech.",
      },
      {
        question: "Quels outils IA vous utilisez ?",
        answer: "Claude (Anthropic) en principal, ChatGPT, n8n, Make, MCP, Notion AI, Custom GPTs. On choisit selon votre stack existante, pas l'inverse.",
      },
      {
        question: "Où intervenez-vous ?",
        // answer: "" sentinel — renderer substitutes territoires[t].faqZone
        answer: "",
      },
      {
        question: "Présentiel uniquement ?",
        answer: "Le cœur de la formation est en présentiel chez vous. Le suivi mensuel est en visio. Des modules visio ponctuels sont possibles si pertinent.",
      },
      // VICTOR TO FILL: financement OPCO/CPF (Réunion) / Forem-Bruxelles Formation (Belgique).
    ],
  },
  ctaFinal: {
    title: "On commence par un appel gratuit, sans engagement",
    body: "30 minutes pour comprendre votre contexte. Vous repartez avec 3 pistes IA concrètes, qu'on travaille ensemble ou pas.",
    primary: { label: "Réserver l'appel", href: CALENDLY_URL },
    secondary: { label: "Ou écrivez-nous", href: "mailto:contact@mvagency.ai" },
  },
};

export const territoires: Record<Territoire, TerritoireContent> = {
  reunion: {
    slug: "la-reunion",
    nom: "La Réunion",
    prefix: "à",
    villes: ["Saint-Denis", "Saint-Pierre", "Saint-Paul", "Le Tampon", "Le Port"],
    faqZone:
      "Saint-Denis, Saint-Pierre, Saint-Paul, Le Tampon, et tout le reste de l'île. On se déplace partout à la Réunion.",
    metaTitle: "Formation IA à la Réunion — Audit + formation sur-mesure | MV Agency",
    metaDescription:
      "Formation IA à la Réunion : audit de votre écosystème, sélection des outils, formation intra-entreprise en présentiel. RDV gratuit.",
    canonical: "/formation-ia-la-reunion",
  },
  belgique: {
    slug: "belgique",
    nom: "Belgique",
    prefix: "en",
    villes: ["Bruxelles", "Liège", "Charleroi", "Namur", "Mons", "Anvers", "Gand"],
    faqZone:
      "Bruxelles, Wallonie (Liège, Charleroi, Namur, Mons…), Flandres. On se déplace partout en Belgique.",
    metaTitle: "Formation IA en Belgique — Audit + formation sur-mesure | MV Agency",
    metaDescription:
      "Formation IA en Belgique : audit de votre écosystème, sélection des outils, formation intra-entreprise en présentiel. RDV gratuit.",
    canonical: "/formation-ia-belgique",
  },
};

// ---------------------------------------------------------------------------
// Pure helpers (no React) — used by interactive modules.
// ---------------------------------------------------------------------------

/** Compute the diagnostic profile for a given score. */
export function diagnosticProfile(score: number): DiagnosticProfile {
  if (!Number.isFinite(score) || score < 0 || score > 16) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(`[formation-ia] diagnosticProfile received out-of-range score: ${score}`);
    }
    // Still return a sensible default for prod resilience, but log in dev.
    return formationIACommon.diagnostic.profiles[0];
  }
  for (const p of formationIACommon.diagnostic.profiles) {
    if (score >= p.scoreMin && score <= p.scoreMax) return p;
  }
  // Fallback (should not happen if questions configured correctly)
  return formationIACommon.diagnostic.profiles[0];
}

/** Compute ROI given an object of slider values. */
export function computeROI(
  values: Record<string, number>,
  recuperablePct = formationIACommon.roiCalculator.recuperablePct
): { mensuelH: number; mensuelLabel: string } {
  const safe = Object.values(values).filter(
    (v) => Number.isFinite(v) && v >= 0
  );
  const totalHebdo = safe.reduce((a, b) => a + b, 0);
  const recuperableHebdo = totalHebdo * recuperablePct;
  const mensuelH = Math.round(recuperableHebdo * 4);
  const jours = Math.round((mensuelH / 7) * 10) / 10;
  const mensuelLabel = `${mensuelH} h/mois, soit ~${jours} jours de travail`;
  return { mensuelH, mensuelLabel };
}

/** Detect the sector for the mini-audit from a free-text input. */
export function detectSector(input: string): CannedSector | null {
  const text = input.toLowerCase();
  for (const sector of formationIACommon.miniAudit.sectors) {
    if (sector.keywords.some((kw) => text.includes(kw))) return sector;
  }
  return null;
}

// Dev-mode invariant assertions (silent in production).
if (process.env.NODE_ENV !== "production") {
  // Diagnostic profile bands must cover 0..16 exhaustively, no overlap.
  const profiles = formationIACommon.diagnostic.profiles;
  for (let s = 0; s <= 16; s++) {
    const matches = profiles.filter((p) => s >= p.scoreMin && s <= p.scoreMax);
    if (matches.length !== 1) {
      // eslint-disable-next-line no-console
      console.warn(`[formation-ia] diagnostic score ${s} matches ${matches.length} profiles`);
    }
  }
  // ROI helper sanity-check.
  const roi = computeROI({ a: 5, b: 3, c: 2, d: 4 });
  if (roi.mensuelH <= 0) {
    // eslint-disable-next-line no-console
    console.warn(`[formation-ia] computeROI returned non-positive value`);
  }
  // Reminder: Calendly URL still placeholder.
  if (CALENDLY_URL === "/contact") {
    // eslint-disable-next-line no-console
    console.warn("[formation-ia] CALENDLY_URL still placeholder (/contact). VICTOR TO FILL.");
  }
}
