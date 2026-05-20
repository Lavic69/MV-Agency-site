import { Accordion } from "@/components/ui/accordion";
import {
  formationIACommon,
  territoires,
  type Territoire,
} from "@/data/formation-ia-content";

interface Props {
  territoire: Territoire;
}

/**
 * FAQ section for Formation IA pages.
 *
 * Implements the FAQ sentinel pattern: when an item's `answer` is "",
 * substitute `territoires[territoire].faqZone` for the active territory.
 * The `territoireOverride` map takes precedence if provided.
 */
export function FormationFAQ({ territoire }: Props) {
  const c = formationIACommon.faq;
  const t = territoires[territoire];

  const items = c.items.map((item) => {
    const override = item.territoireOverride?.[territoire];
    if (override) {
      return { question: item.question, answer: override };
    }
    if (item.answer === "") {
      return { question: item.question, answer: t.faqZone };
    }
    return { question: item.question, answer: item.answer };
  });

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
        {c.title}
      </h2>
      <Accordion items={items} />
    </section>
  );
}
