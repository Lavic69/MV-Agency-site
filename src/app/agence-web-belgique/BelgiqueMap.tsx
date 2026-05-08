import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./BelgiqueMap.module.css";

/**
 * Carte stylisée de la Belgique avec 4 cards satellites listant les zones
 * d'intervention (Bruxelles / Wallonie / Flandre / Brabant wallon).
 *
 * Le SVG est une approximation graphique de la forme du pays — pas une carte
 * géographique stricte. Objectif : indicateur visuel + cohérence brand.
 */

type ZoneKey = "nord" | "est" | "sud" | "ouest";

const ZONES: Record<ZoneKey, { label: string; primary: string; others: ReadonlyArray<string> }> = {
  nord: {
    label: "Flandre",
    primary: "Anvers",
    others: ["Gand", "Bruges", "Louvain", "Hasselt"],
  },
  est: {
    label: "Brabant wallon",
    primary: "Wavre",
    others: ["Louvain-la-Neuve", "Nivelles", "Ottignies"],
  },
  sud: {
    label: "Wallonie",
    primary: "Namur",
    others: ["Liège", "Charleroi", "Mons", "Tournai"],
  },
  ouest: {
    label: "Bruxelles-Capitale",
    primary: "Bruxelles",
    others: ["Schaerbeek", "Ixelles", "Anderlecht", "Uccle"],
  },
};

const ICONS = {
  nord: ArrowUp,
  est: ArrowRight,
  sud: ArrowDown,
  ouest: ArrowLeft,
} as const;

export function BelgiqueMap() {
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

        <div className={styles.mapCenter} style={{ gridArea: "center" }}>
          <svg
            viewBox="0 0 320 280"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.mapSvg}
            aria-label="Carte stylisée de la Belgique"
          >
            <defs>
              <linearGradient id="belgique-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1A1F4B" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.65" />
              </linearGradient>
            </defs>

            {/* Outline approximative de la Belgique : nord large (Flandre) → sud effilé (Wallonie) */}
            <path
              d="M 80 65
                 L 145 50
                 L 200 55
                 L 240 70
                 L 265 95
                 L 280 130
                 L 270 165
                 L 245 195
                 L 215 220
                 L 175 235
                 L 130 230
                 L 95 215
                 L 75 185
                 L 60 150
                 L 65 110
                 Z"
              fill="url(#belgique-fill)"
              stroke="rgba(96, 165, 250, 0.9)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Bruxelles-Capitale (point principal, plus gros + label) */}
            <g>
              <circle cx="155" cy="125" r="8" fill="#60A5FA" stroke="#FFFFFF" strokeWidth="2" />
              <circle
                cx="155"
                cy="125"
                r="14"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="1.5"
                opacity="0.5"
              />
              <text
                x="170"
                y="120"
                fontSize="13"
                fontWeight="700"
                fill="#FFFFFF"
                fontFamily="system-ui, sans-serif"
              >
                Bruxelles
              </text>
            </g>

            {/* Liège (est) */}
            <g>
              <circle cx="225" cy="140" r="5" fill="#FFFFFF" />
              <text
                x="232"
                y="143"
                fontSize="11"
                fill="#E0E7FF"
                fontFamily="system-ui, sans-serif"
              >
                Liège
              </text>
            </g>

            {/* Namur (sud-centre) */}
            <g>
              <circle cx="170" cy="170" r="5" fill="#FFFFFF" />
              <text
                x="178"
                y="173"
                fontSize="11"
                fill="#E0E7FF"
                fontFamily="system-ui, sans-serif"
              >
                Namur
              </text>
            </g>

            {/* Charleroi (sud-ouest) */}
            <g>
              <circle cx="135" cy="180" r="5" fill="#FFFFFF" />
              <text
                x="62"
                y="183"
                fontSize="11"
                fill="#E0E7FF"
                fontFamily="system-ui, sans-serif"
              >
                Charleroi
              </text>
            </g>

            {/* Anvers (nord) */}
            <g>
              <circle cx="160" cy="80" r="5" fill="#FFFFFF" />
              <text
                x="168"
                y="83"
                fontSize="11"
                fill="#E0E7FF"
                fontFamily="system-ui, sans-serif"
              >
                Anvers
              </text>
            </g>

            {/* Gand (nord-ouest) */}
            <g>
              <circle cx="115" cy="90" r="5" fill="#FFFFFF" />
              <text
                x="60"
                y="93"
                fontSize="11"
                fill="#E0E7FF"
                fontFamily="system-ui, sans-serif"
              >
                Gand
              </text>
            </g>
          </svg>

          <div className={styles.mapBadge}>
            <span className={styles.mapBadgeCode}>BE</span>
            <span className={styles.mapBadgeRegion}>Belgique</span>
          </div>
        </div>
      </div>
    </div>
  );
}
