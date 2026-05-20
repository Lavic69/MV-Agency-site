import {
  Wrench,
  MapPin,
  GraduationCap,
  MessageCircle,
  Building2,
  Briefcase,
  Network,
  Sparkles,
} from "lucide-react";
import { formationIACommon } from "@/data/formation-ia-content";
import styles from "./WhyUsPillars.module.css";

const iconMap = {
  Wrench,
  MapPin,
  GraduationCap,
  MessageCircle,
} as const;

const personaIconMap = {
  Building2,
  Briefcase,
  Network,
  Sparkles,
} as const;

type IconKey = keyof typeof iconMap;
type PersonaIconKey = keyof typeof personaIconMap;

export function WhyUsPillars() {
  const pillars = formationIACommon.pillars;
  const forWhom = formationIACommon.forWhom;

  return (
    <section className={styles.section}>
      {/* Pour qui ? */}
      <div className={`${styles.block} ${styles.blockForWhom}`}>
        <span className={styles.eyebrow}>{forWhom.eyebrow}</span>
        <h2 className={styles.title}>{forWhom.title}</h2>
        <div className={styles.personaRow}>
          {forWhom.personas.map((persona) => {
            const PersonaIcon =
              personaIconMap[persona.icon as PersonaIconKey] ?? Building2;
            return (
              <article key={persona.label} className={styles.personaCard}>
                <PersonaIcon
                  size={32}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className={styles.personaIcon}
                />
                <h3 className={styles.personaTitle}>{persona.label}</h3>
                <p className={styles.personaBody}>{persona.body}</p>
              </article>
            );
          })}
        </div>
      </div>

      {/* Pourquoi MV Agency */}
      <div className={`${styles.block} ${styles.blockWhyUs}`}>
        <span className={styles.eyebrow}>{pillars.eyebrow}</span>
        <h2 className={styles.title}>{pillars.title}</h2>
        <p className={styles.intro}>{pillars.intro}</p>
        <div className={styles.pillarGrid}>
          {pillars.items.map((item) => {
            const Icon = iconMap[item.icon as IconKey] ?? Wrench;
            return (
              <article key={item.title} className={styles.pillarCard}>
                <span className={styles.iconBadge}>
                  <Icon size={32} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className={styles.pillarTitle}>{item.title}</h3>
                <p className={styles.pillarBody}>{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
