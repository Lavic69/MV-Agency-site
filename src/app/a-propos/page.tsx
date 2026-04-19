import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { founderPersonSchema, SITE_URL } from "@/lib/seo";
import AProposClient from "./AProposClient";

export const metadata: Metadata = {
  title: "À propos — Qui est derrière MV Agency",
  description:
    "Victor Marchetti, fondateur de MV Agency. Agence web & IA pour TPE, PME et indépendants à La Réunion, en Belgique et en France. Approche pédagogique, sans jargon.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    type: "profile",
    title: "À propos de MV Agency — Victor Marchetti, fondateur",
    description:
      "L'histoire et la mission de MV Agency, l'agence digitale qui rend le web et l'IA accessibles aux TPE/PME.",
    url: `${SITE_URL}/a-propos`,
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos de MV Agency",
    description:
      "Victor Marchetti, fondateur de MV Agency — agence web & IA pour TPE/PME.",
  },
};

export default function AProposPage() {
  return (
    <>
      <JsonLd data={founderPersonSchema} />
      <AProposClient />
    </>
  );
}
