import { formationIACommon } from "@/data/formation-ia-content";

export function MethodTimeline() {
  const c = formationIACommon.method;
  return (
    <section id="methode" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
        {c.title}
      </h2>
      <p className="text-white/70 text-center mb-16 max-w-2xl mx-auto">
        {c.intro}
      </p>
      <ol className="grid gap-10 md:grid-cols-3 list-none p-0">
        {c.phases.map((p) => (
          <li
            key={p.num}
            className="relative rounded-2xl bg-white/[0.03] border border-white/10 p-8"
          >
            <span className="absolute -top-5 left-8 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-500)] text-white font-bold">
              {p.num}
            </span>
            <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
            <p className="text-sm text-[var(--primary-400)] mb-4">
              {p.durationLabel}
            </p>
            <p className="text-white/75 mb-4 leading-relaxed">{p.body}</p>
            <p className="text-xs text-white/50 italic">
              Livrable : {p.deliverable}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
