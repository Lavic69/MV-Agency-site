import { Wrench, MapPin, GraduationCap, MessageCircle } from "lucide-react";
import { formationIACommon } from "@/data/formation-ia-content";

const iconMap = {
  Wrench,
  MapPin,
  GraduationCap,
  MessageCircle,
} as const;

type IconKey = keyof typeof iconMap;

export function WhyUsPillars() {
  const pillars = formationIACommon.pillars;
  const forWhom = formationIACommon.forWhom;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 space-y-24">
      {/* Pour qui ? */}
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
          {forWhom.title}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {forWhom.personas.map((persona) => (
            <article
              key={persona.label}
              className="rounded-2xl bg-white/[0.03] border border-white/10 p-6"
            >
              <h3 className="text-lg font-semibold mb-3">{persona.label}</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {persona.body}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Pourquoi MV Agency */}
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          {pillars.title}
        </h2>
        <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
          {pillars.intro}
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.items.map((item) => {
            const Icon = iconMap[item.icon as IconKey] ?? Wrench;
            return (
              <article
                key={item.title}
                className="rounded-2xl bg-white/[0.03] border border-white/10 p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-500)]/15 text-[var(--primary-400)] mb-4">
                  <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
