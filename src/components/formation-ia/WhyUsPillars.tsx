import { Wrench, MapPin, GraduationCap, MessageCircle } from "lucide-react";
import { formationIACommon } from "@/data/formation-ia-content";
import styles from "./WhyUsPillars.module.css";

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
    <section className={styles.section}>
      {/* Pour qui ? */}
      <div className={styles.block}>
        <h2 className={styles.title}>{forWhom.title}</h2>
        <div className={styles.grid}>
          {forWhom.personas.map((persona) => (
            <article key={persona.label} className={styles.card}>
              <h3 className={styles.cardTitle}>{persona.label}</h3>
              <p className={styles.cardBody}>{persona.body}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Pourquoi MV Agency */}
      <div className={styles.block}>
        <h2 className={styles.title}>{pillars.title}</h2>
        <p className={styles.intro}>{pillars.intro}</p>
        <div className={styles.grid}>
          {pillars.items.map((item) => {
            const Icon = iconMap[item.icon as IconKey] ?? Wrench;
            return (
              <article key={item.title} className={styles.card}>
                <span className={styles.iconBadge}>
                  <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
