import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, buildBreadcrumbSchema, OG_IMAGE } from "@/lib/seo";
import ContactClient from "./ContactClient";

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Accueil", url: SITE_URL },
  { name: "Contact", url: `${SITE_URL}/contact` },
]);

export const metadata: Metadata = {
  title: "Contact MV Agency — Réservez votre appel découverte",
  description:
    "Réservez un appel découverte de 30 minutes avec Victor Marchetti pour votre projet web ou IA. Sans engagement. Réponse sous 24h ouvrées.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact MV Agency — Réservez un appel découverte",
    description:
      "Discutons de votre projet digital ou IA. Rendez-vous de 30 minutes sans engagement.",
    url: `${SITE_URL}/contact`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact MV Agency",
    description:
      "Réservez un appel découverte de 30 minutes pour votre projet web ou IA.",
    images: [OG_IMAGE.url],
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ContactClient />
    </>
  );
}
