import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — Parlons de votre projet",
  description:
    "Prenez rendez-vous avec Victor Marchetti, fondateur de MV Agency. Échange de 30 minutes gratuit pour discuter de votre projet web ou IA. Réponse sous 24h ouvrées.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact MV Agency — Réservez un appel découverte",
    description:
      "Discutons de votre projet digital ou IA. Rendez-vous de 30 minutes sans engagement.",
    url: `${SITE_URL}/contact`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact MV Agency",
    description:
      "Réservez un appel découverte de 30 minutes pour votre projet web ou IA.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
