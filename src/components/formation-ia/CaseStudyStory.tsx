import { formationIACommon } from "@/data/formation-ia-content";

/**
 * 3-block case study (Avant / Notre intervention / Après).
 * The `apres` body uses light markdown ("1. **Bold**") — rendered as
 * pre-wrapped text with bold spans. No markdown parser needed for V0.
 */
function renderBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-white">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export function CaseStudyStory() {
  const c = formationIACommon.caseStudy;
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
        {c.title}
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        <article className="rounded-2xl bg-white/[0.03] border border-white/10 p-8">
          <p className="text-xs uppercase tracking-widest text-[var(--primary-400)] mb-4">
            Avant
          </p>
          <p className="text-white/75 leading-relaxed">{c.avant}</p>
        </article>
        <article className="rounded-2xl bg-white/[0.03] border border-white/10 p-8">
          <p className="text-xs uppercase tracking-widest text-[var(--primary-400)] mb-4">
            Notre intervention
          </p>
          <p className="text-white/75 leading-relaxed">{c.intervention}</p>
        </article>
        <article className="rounded-2xl bg-white/[0.05] border border-[var(--primary-500)]/40 p-8">
          <p className="text-xs uppercase tracking-widest text-[var(--primary-400)] mb-4">
            Après
          </p>
          <div className="text-white/85 leading-relaxed whitespace-pre-line">
            {renderBold(c.apres)}
          </div>
        </article>
      </div>
    </section>
  );
}
