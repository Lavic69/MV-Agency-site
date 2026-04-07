import type { Metadata } from "next";
import { Darker_Grotesque, DM_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import LiquidEther from "@/components/ui/LiquidEther";
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

export const metadata: Metadata = {
  title: "MV Agency | Création de site web & IA",
  description: "Concevoir, expliquer, propulser votre présence digitale. Nous rendons le digital accessible pour les PME.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${darkerGrotesque.variable} ${dmSans.variable}`}>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        
        {/* GLOBAL BACKGROUND ANIMATION FOR ALL PAGES */}
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
          <LiquidEther
            colors={['#1A1F4B', '#2563EB', '#4F46E5']} 
            mouseForce={20}
            cursorSize={100}
            isViscous
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
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
