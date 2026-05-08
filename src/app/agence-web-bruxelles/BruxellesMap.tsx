import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./BruxellesMap.module.css";

/**
 * Layout cards-par-cardinaux pour les 19 communes de Bruxelles-Capitale.
 *
 * Même pattern que /agence-web-la-reunion/ReunionMap : 4 cards satellites
 * autour d'un visuel central (badge Région-Capitale 1000), chaque card
 * regroupe les communes par orientation géographique.
 *
 * Groupes :
 *  - Nord : Schaerbeek, Evere, Jette, Koekelberg, Ganshoren, Berchem
 *  - Est  : Saint-Josse, Etterbeek, Woluwe-Saint-Lambert, Woluwe-Saint-Pierre,
 *           Auderghem, Watermael-Boitsfort
 *  - Sud  : Ixelles, Saint-Gilles, Uccle, Forest
 *  - Ouest : Anderlecht, Molenbeek-Saint-Jean
 *  - Centre : Ville de Bruxelles
 */

type ZoneKey = "nord" | "est" | "sud" | "ouest";

const ZONES: Record<ZoneKey, { label: string; primary: string; others: ReadonlyArray<string> }> = {
  nord: {
    label: "Nord",
    primary: "Schaerbeek",
    others: ["Evere", "Jette", "Koekelberg", "Ganshoren", "Berchem-Sainte-Agathe"],
  },
  est: {
    label: "Est",
    primary: "Etterbeek",
    others: [
      "Saint-Josse-ten-Noode",
      "Woluwe-Saint-Lambert",
      "Woluwe-Saint-Pierre",
      "Auderghem",
      "Watermael-Boitsfort",
    ],
  },
  sud: {
    label: "Sud",
    primary: "Ixelles",
    others: ["Saint-Gilles", "Uccle", "Forest"],
  },
  ouest: {
    label: "Ouest",
    primary: "Anderlecht",
    others: ["Molenbeek-Saint-Jean"],
  },
};

const ICONS = {
  nord: ArrowUp,
  est: ArrowRight,
  sud: ArrowDown,
  ouest: ArrowLeft,
} as const;

export function BruxellesMap() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.layoutGrid}>
        {(Object.keys(ZONES) as ZoneKey[]).map((key) => {
          const zone = ZONES[key];
          const Icon = ICONS[key];
          return (
            <article key={key} className={styles.zoneCard} style={{ gridArea: key }}>
              <div className={styles.zoneHeader}>
                <span className={styles.zoneIcon}>
                  <Icon size={14} strokeWidth={2.25} />
                </span>
                <span className={styles.zoneLabel}>{zone.label}</span>
              </div>
              <div className={styles.zoneBody}>
                <div className={styles.zonePrimary}>{zone.primary}</div>
                <ul className={styles.zoneCities}>
                  {zone.others.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}

        {/* Centre : pastille Ville de Bruxelles */}
        <div className={styles.mapCenter} style={{ gridArea: "center" }}>
          <svg
            viewBox="0 0 240 240"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.mapSvg}
            aria-label="Région de Bruxelles-Capitale"
          >
            <defs>
              <radialGradient id="bxl-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.5" />
                <stop offset="60%" stopColor="#2563EB" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#1A1F4B" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="bxl-region-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1A1F4B" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.85" />
              </linearGradient>
            </defs>

            {/* Glow extérieur */}
            <circle cx="120" cy="120" r="115" fill="url(#bxl-glow)" />

            {/* Forme stylisée de la Région-Capitale (hexagone irrégulier) */}
            <path
              d="M 80 50
                 L 165 45
                 L 200 95
                 L 195 165
                 L 145 205
                 L 75 200
                 L 45 145
                 L 50 90
                 Z"
              fill="url(#bxl-region-fill)"
              stroke="rgba(96, 165, 250, 0.7)"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Pin Ville de Bruxelles (centre) */}
            <g>
              <circle
                cx="120"
                cy="120"
                r="22"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="1.5"
                opacity="0.45"
              />
              <circle cx="120" cy="120" r="10" fill="#60A5FA" stroke="#FFFFFF" strokeWidth="2.5" />
              <text
                x="120"
                y="155"
                fontSize="14"
                fontWeight="700"
                fill="#FFFFFF"
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
              >
                Ville de Bruxelles
              </text>
              <text
                x="120"
                y="172"
                fontSize="10"
                fontWeight="500"
                fill="#9CA3AF"
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
              >
                centre historique
              </text>
            </g>
          </svg>

          <div className={styles.mapBadge}>
            <span className={styles.mapBadgeCode}>1000</span>
            <span className={styles.mapBadgeRegion}>Bruxelles-Capitale</span>
          </div>
        </div>
      </div>
    </div>
  );
}
