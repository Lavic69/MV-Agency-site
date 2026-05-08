import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { BRUXELLES_SVG_INNER, BRUXELLES_SVG_VIEWBOX } from "./bruxelles-svg-content";
import styles from "./BruxellesMap.module.css";

/**
 * Layout cards-par-cardinaux pour les 19 communes de Bruxelles-Capitale.
 *
 * Même pattern que /agence-web-la-reunion/ReunionMap : carte SVG centrée
 * (Wikimedia Commons "Brussels-Capital Region blank.svg", CC-BY-SA) +
 * 4 cards satellites (Nord/Est/Sud/Ouest) regroupant les 19 communes.
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
    others: ["Molenbeek-Saint-Jean", "Ville de Bruxelles"],
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

        <div className={styles.mapCenter} style={{ gridArea: "center" }}>
          <svg
            viewBox={BRUXELLES_SVG_VIEWBOX}
            xmlns="http://www.w3.org/2000/svg"
            className={styles.mapSvg}
            aria-label="Carte des 19 communes de la Région de Bruxelles-Capitale"
            dangerouslySetInnerHTML={{ __html: BRUXELLES_SVG_INNER }}
          />
          <div className={styles.mapBadge}>
            <span className={styles.mapBadgeCode}>1000</span>
            <span className={styles.mapBadgeRegion}>Bruxelles-Capitale</span>
          </div>
        </div>
      </div>
    </div>
  );
}
