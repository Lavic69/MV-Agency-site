import type { Metadata, Viewport } from "next";
import { Darker_Grotesque, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Clarity } from "@/components/analytics/Clarity";
import LiquidEther from "@/components/ui/LiquidEtherDesktopOnly";
import {
  SITE_URL,
  SITE_NAME,
  LOCALE,
  FOUNDER_NAME,
  OG_IMAGE,
  organizationSchema,
  localBusinessSchema,
} from "@/lib/seo";
import "./globals.css";

const darkerGrotesque = Darker_Grotesque({
  variable: "--font-darker-grotesque",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Copywriting premium conservé du travail Gemini,
// enrichi avec les compléments techniques SEO (metadataBase, canonical, robots, etc.)
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} | L'art du web, la puissance de l'IA`,
    // Pas de template auto : chaque page définit son <title> complet
    // (avec "— MV Agency" inline) pour contrôler précisément la longueur SEO.
    template: `%s`,
  },
  description:
    "Création de sites web premium et intégration d'Intelligence Artificielle (IA) sur-mesure pour PME et startups. L'alliance parfaite entre design de haut vol et ingénierie de pointe.",

  applicationName: SITE_NAME,
  authors: [{ name: FOUNDER_NAME, url: `${SITE_URL}/a-propos` }],
  creator: FOUNDER_NAME,
  publisher: SITE_NAME,
  category: "technology",

  keywords: [
    "Agence web",
    "Intelligence Artificielle",
    "Création site web PME",
    "Développement SaaS",
    "Agent IA",
    "Web design premium",
    "Agence web La Réunion",
    "Agence web Belgique",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | L'art du web, la puissance de l'IA`,
    description:
      "Concevoir, expliquer, propulser votre présence digitale avec l'Intelligence Artificielle de nouvelle génération.",
    images: [OG_IMAGE],
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | L'art du web, la puissance de l'IA`,
    description:
      "Concevoir, expliquer, propulser votre présence digitale avec l'Intelligence Artificielle.",
    images: [OG_IMAGE.url],
    // TODO: ajouter @handle quand compte X créé
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Note : icônes générées dynamiquement par src/app/icon.tsx + src/app/apple-icon.tsx
  // (Next 16 file-based metadata) — aucune référence manuelle nécessaire ici.
  icons: {
    icon: "/Logo_Rond_MV_V2.svg",
    shortcut: "/Logo_Rond_MV_V2.svg",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Vérifications de propriété — à remplir dans .env Vercel après création des comptes
  // (Google Search Console + Bing Webmaster Tools, tous deux gratuits).
  verification: {
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } }
      : {}),
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${darkerGrotesque.variable} ${dmSans.variable}`}>
      <body
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        suppressHydrationWarning
      >
        {/* JSON-LD global : identité Organization + présence LocalBusiness */}
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />

        {/* GLOBAL BACKGROUND ANIMATION FOR ALL PAGES */}
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
          <LiquidEther
            colors={['#1A1F4B', '#2563EB', '#4F46E5']}
            mouseForce={20}
            cursorSize={80}
            isViscous={false}
            iterationsPoisson={4}
            resolution={0.2}
            isBounce={false}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        <Header />
        <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>{children}</div>
        <Footer />

        {/* Mesure d'audience — Vercel Analytics & Speed Insights : sans cookies,
            sans bandeau de consentement, gratuits jusqu'à 50k events/mois. */}
        <Analytics />
        <SpeedInsights />

        {/* Microsoft Clarity — chargé uniquement si NEXT_PUBLIC_CLARITY_ID est défini
            ET si l'utilisateur a accepté les cookies (cf. ConsentBanner). Désactivé
            par défaut tant qu'aucun bandeau de consentement n'est en place. */}
        <Clarity />
      </body>
    </html>
  );
}
