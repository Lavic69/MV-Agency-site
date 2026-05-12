import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { founderPersonSchema, SITE_URL, buildBreadcrumbSchema, OG_IMAGE } from "@/lib/seo";
import AProposClient from "./AProposClient";

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Accueil", url: SITE_URL },
  { name: "À propos", url: `${SITE_URL}/a-propos` },
]);

export const metadata: Metadata = {
  title: "À propos — Qui est derrière MV Agency",
  description:
    "Victor Marchetti, fondateur de MV Agency. Agence web & IA pour PME à La Réunion, Belgique et France. Approche pédagogique, sans jargon.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    type: "profile",
    title: "À propos de MV Agency — Victor Marchetti, fondateur",
    description:
      "L'histoire et la mission de MV Agency, l'agence digitale qui rend le web et l'IA accessibles aux TPE/PME.",
    url: `${SITE_URL}/a-propos`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos de MV Agency",
    description:
      "Victor Marchetti, fondateur de MV Agency — agence web & IA pour TPE/PME.",
    images: [OG_IMAGE.url],
  },
};

export default function AProposPage() {
  return (
    <>
      <JsonLd data={founderPersonSchema} />
      <JsonLd data={breadcrumbSchema} />
      <AProposClient />
    </>
  );
}
