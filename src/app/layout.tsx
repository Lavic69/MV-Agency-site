import type { Metadata, Viewport } from "next";
import { Darker_Grotesque, DM_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import LiquidEther from "@/components/ui/LiquidEther";
import {
  SITE_URL,
  SITE_NAME,
  LOCALE,
  FOUNDER_NAME,
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
    template: `%s · ${SITE_NAME}`,
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
    // L'image est générée automatiquement via src/app/opengraph-image.tsx
    // Next.js injecte les balises <meta property="og:image:*" /> seul.
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | L'art du web, la puissance de l'IA`,
    description:
      "Concevoir, expliquer, propulser votre présence digitale avec l'Intelligence Artificielle.",
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

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    // TODO: ajouter public/apple-icon.png (180×180) puis décommenter
    // apple: "/apple-icon.png",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
            iterationsPoisson={8}
            resolution={0.35}
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
      </body>
    </html>
  );
}
