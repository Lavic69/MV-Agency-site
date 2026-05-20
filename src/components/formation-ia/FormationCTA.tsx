import { Button } from "@/components/ui/Button";
import { formationIACommon } from "@/data/formation-ia-content";

export function FormationCTA() {
  const c = formationIACommon.ctaFinal;
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div
        className="rounded-3xl border border-[var(--primary-500)]/40 p-10 md:p-16 text-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(var(--primary-500-rgb,99,102,241), 0.18) 0%, rgba(255,255,255,0.02) 100%)",
        }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6">{c.title}</h2>
        <p className="text-lg text-white/75 leading-relaxed mb-10 max-w-2xl mx-auto">
          {c.body}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href={c.primary.href} variant="primary" size="lg">
            {c.primary.label}
          </Button>
          {c.secondary && (
            <Button href={c.secondary.href} variant="outline" size="lg">
              {c.secondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
