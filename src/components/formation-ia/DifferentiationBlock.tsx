import { formationIACommon } from "@/data/formation-ia-content";

export function DifferentiationBlock() {
  const c = formationIACommon.differentiation;
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
        {c.title}
      </h2>
      <div className="text-lg text-white/75 leading-relaxed whitespace-pre-line">
        {c.body.split(/\*\*(.+?)\*\*/g).map((part, i) =>
          i % 2 === 1 ? (
            <strong key={i} className="text-white">
              {part}
            </strong>
          ) : (
            part
          )
        )}
      </div>
    </section>
  );
}
