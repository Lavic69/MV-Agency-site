import styles from "./BruxellesMap.module.css";

/**
 * Carte stylisée de la Région de Bruxelles-Capitale avec ses 19 communes.
 *
 * Disposition approximative basée sur la géographie réelle :
 *  - Centre : Ville de Bruxelles
 *  - Nord : Schaerbeek, Evere, Saint-Josse, Jette, Koekelberg, Ganshoren, Berchem
 *  - Est : Etterbeek, Ixelles, Woluwe-Saint-Lambert, Woluwe-Saint-Pierre, Auderghem, Watermael-Boitsfort
 *  - Sud : Uccle, Forest, Saint-Gilles
 *  - Ouest : Anderlecht, Molenbeek-Saint-Jean
 *
 * Le SVG est une approximation graphique de la forme de la Région-Capitale —
 * pas une carte stricte. Objectif : indicateur visuel + cohérence brand.
 */

type Commune = {
  name: string;
  cx: number;
  cy: number;
  highlight?: boolean;
};

const COMMUNES: ReadonlyArray<Commune> = [
  // Centre
  { name: "Bruxelles", cx: 200, cy: 200, highlight: true },

  // Nord (haut)
  { name: "Jette", cx: 145, cy: 130 },
  { name: "Ganshoren", cx: 110, cy: 145 },
  { name: "Berchem", cx: 90, cy: 165 },
  { name: "Koekelberg", cx: 130, cy: 175 },
  { name: "Schaerbeek", cx: 230, cy: 145 },
  { name: "Evere", cx: 270, cy: 130 },
  { name: "Saint-Josse", cx: 215, cy: 175 },

  // Est (droite)
  { name: "Woluwe-S-L", cx: 305, cy: 175 },
  { name: "Woluwe-S-P", cx: 320, cy: 215 },
  { name: "Etterbeek", cx: 255, cy: 215 },
  { name: "Auderghem", cx: 305, cy: 255 },
  { name: "Watermael", cx: 280, cy: 285 },
  { name: "Ixelles", cx: 230, cy: 240 },

  // Sud (bas)
  { name: "Saint-Gilles", cx: 195, cy: 250 },
  { name: "Forest", cx: 180, cy: 290 },
  { name: "Uccle", cx: 220, cy: 320 },

  // Ouest (gauche)
  { name: "Molenbeek", cx: 155, cy: 200 },
  { name: "Anderlecht", cx: 115, cy: 235 },
];

export function BruxellesMap() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mapContainer}>
        <svg
          viewBox="0 0 400 380"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.mapSvg}
          aria-label="Carte stylisée des 19 communes de la Région de Bruxelles-Capitale"
        >
          <defs>
            <linearGradient id="bxl-region-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1A1F4B" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.35" />
            </linearGradient>
            <radialGradient id="bxl-center-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Forme stylisée de la Région-Capitale (hexagone irrégulier) */}
          <path
            d="M 110 110
               L 250 100
               L 320 140
               L 350 220
               L 300 320
               L 200 350
               L 110 320
               L 70 230
               L 80 150
               Z"
            fill="url(#bxl-region-fill)"
            stroke="rgba(96, 165, 250, 0.6)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Glow autour du centre (Ville de Bruxelles) */}
          <circle cx="200" cy="200" r="55" fill="url(#bxl-center-glow)" />

          {/* 19 commune dots + labels */}
          {COMMUNES.map((c) => (
            <g key={c.name}>
              {c.highlight && (
                <circle
                  cx={c.cx}
                  cy={c.cy}
                  r="11"
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
              )}
              <circle
                cx={c.cx}
                cy={c.cy}
                r={c.highlight ? 6 : 4}
                fill={c.highlight ? "#60A5FA" : "#FFFFFF"}
                stroke={c.highlight ? "#FFFFFF" : "none"}
                strokeWidth={c.highlight ? 2 : 0}
              />
              <text
                x={c.cx}
                y={c.cy - 9}
                fontSize={c.highlight ? 12 : 9.5}
                fontWeight={c.highlight ? 700 : 500}
                fill={c.highlight ? "#FFFFFF" : "#E0E7FF"}
                fontFamily="system-ui, sans-serif"
                textAnchor="middle"
              >
                {c.name}
              </text>
            </g>
          ))}
        </svg>

        <div className={styles.mapBadge}>
          <span className={styles.mapBadgeCode}>1000</span>
          <span className={styles.mapBadgeRegion}>Bruxelles-Capitale</span>
        </div>
      </div>

      <p className={styles.mapCaption}>
        Les 19 communes de la Région de Bruxelles-Capitale sont toutes desservies, plus le
        Brabant wallon en extension naturelle (Wavre, Louvain-la-Neuve, Nivelles).
      </p>
    </div>
  );
}
