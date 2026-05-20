import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { JsonLd } from "@/components/JsonLd";
import {
  SITE_URL,
  OG_IMAGE,
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  type FaqItem,
} from "@/lib/seo";
import {
  formationIACommon,
  territoires,
} from "@/data/formation-ia-content";
import { FormationHero } from "@/components/formation-ia/FormationHero";
import { DifferentiationBlock } from "@/components/formation-ia/DifferentiationBlock";
import { MethodTimeline } from "@/components/formation-ia/MethodTimeline";
import { CaseStudyStory } from "@/components/formation-ia/CaseStudyStory";
import { WhyUsPillars } from "@/components/formation-ia/WhyUsPillars";
import { FormationFAQ } from "@/components/formation-ia/FormationFAQ";
import { FormationCTA } from "@/components/formation-ia/FormationCTA";
import { FadeIn } from "@/components/ui/FadeIn";
import { TextReveal } from "@/components/ui/TextReveal";
import sections from "@/components/formation-ia/formation-ia-sections.module.css";

/* -------------------------------------------------------------------------- */
/*  Client components dynamically imported to defer their JS off the         */
/*  critical path. Next 16 does NOT allow `ssr: false` from a Server          */
/*  Component (docs: 01-app/02-guides/lazy-loading.md). Each target already   */
/*  carries `"use client"`, so a plain `dynamic()` still code-splits the      */
/*  bundle while keeping SSR/SEO intact.                                      */
/* -------------------------------------------------------------------------- */

const DiagnosticIA = dynamic(() =>
  import("@/components/formation-ia/DiagnosticIA").then((m) => ({
    default: m.DiagnosticIA,
  })),
);

const ROITimeCalculator = dynamic(() =>
  import("@/components/formation-ia/ROITimeCalculator").then((m) => ({
    default: m.ROITimeCalculator,
  })),
);

const BeforeAfterIA = dynamic(() =>
  import("@/components/formation-ia/BeforeAfterIA").then((m) => ({
    default: m.BeforeAfterIA,
  })),
);

const MiniAuditIA = dynamic(() =>
  import("@/components/formation-ia/MiniAuditIA").then((m) => ({
    default: m.MiniAuditIA,
  })),
);

const StickyCallCTA = dynamic(() =>
  import("@/components/formation-ia/StickyCallCTA").then((m) => ({
    default: m.StickyCallCTA,
  })),
);

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

const TERRITOIRE = "reunion" as const;
const t = territoires[TERRITOIRE];
const c = formationIACommon;
const PAGE_URL = `${SITE_URL}${t.canonical}`;

/* -------------------------------------------------------------------------- */
/*  Metadata                                                                  */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: t.canonical },
  openGraph: {
    type: "website",
    title: t.metaTitle,
    description: t.metaDescription,
    url: PAGE_URL,
    images: [OG_IMAGE],
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: t.metaTitle,
    description: t.metaDescription,
    images: [OG_IMAGE.url],
  },
};

/* -------------------------------------------------------------------------- */
/*  Structured data                                                           */
/* -------------------------------------------------------------------------- */

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Accueil", url: SITE_URL },
  { name: `Formation IA à ${t.nom}`, url: PAGE_URL },
]);

// Mirror the territoire-substitution logic from FormationFAQ so the JSON-LD
// FAQPage carries the same answers the user actually reads.
const faqItems: FaqItem[] = c.faq.items.map((item) => {
  const override = item.territoireOverride?.[TERRITOIRE];
  if (override) return { question: item.question, answer: override };
  if (item.answer === "")
    return { question: item.question, answer: t.faqZone };
  return { question: item.question, answer: item.answer };
});

const faqSchema = buildFaqPageSchema(faqItems, PAGE_URL);

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function FormationIAReunionPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <main>
        <FormationHero territoire={TERRITOIRE} />

        {/* Interactive: Diagnostic IA, title + intro live inside the card */}
        <FadeIn>
          <section className={sections.sectionNarrow}>
            <DiagnosticIA />
          </section>
        </FadeIn>

        <FadeIn>
          <DifferentiationBlock />
        </FadeIn>

        <FadeIn>
          <MethodTimeline />
        </FadeIn>

        {/* Interactive: ROI calculator, component owns its title + intro */}
        <FadeIn>
          <section className={sections.sectionWide}>
            <ROITimeCalculator />
          </section>
        </FadeIn>

        <FadeIn>
          <CaseStudyStory />
        </FadeIn>

        {/* Interactive: Before / after IA */}
        <FadeIn>
          <section className={sections.sectionWide}>
            <span className={sections.eyebrow}>{c.beforeAfter.eyebrow}</span>
            <h2 className={sections.title}>
              <TextReveal>{c.beforeAfter.title}</TextReveal>
            </h2>
            <BeforeAfterIA />
          </section>
        </FadeIn>

        <FadeIn>
          <WhyUsPillars />
        </FadeIn>

        {/* Interactive: Mini audit IA, title + intro live inside the card */}
        <FadeIn>
          <section className={sections.sectionNarrow}>
            <MiniAuditIA />
          </section>
        </FadeIn>

        <FadeIn>
          <FormationFAQ territoire={TERRITOIRE} />
        </FadeIn>

        <FadeIn>
          <FormationCTA />
        </FadeIn>
      </main>

      <StickyCallCTA />
    </>
  );
}
