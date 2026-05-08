import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { BELGIUM_SVG_INNER, BELGIUM_SVG_VIEWBOX } from "./belgique-svg-content";
import styles from "./BelgiqueMap.module.css";

/**
 * Layout hybride : carte SVG de la Belgique au centre + cards flottantes autour
 * (Flandre Nord / Brabant wallon Est / Wallonie Sud / Bruxelles Ouest).
 *
 * Même pattern que /agence-web-la-reunion/ReunionMap : on évite la galère de
 * pointer des pins exacts SUR la carte (transforms internes Wikimedia, etc.)
 * en mettant les villes dans des cards SATELLITES autour de la carte. La carte
 * reste un visuel "voici la Belgique" — les cards listent les zones réelles.
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
            viewBox={BELGIUM_SVG_VIEWBOX}
            xmlns="http://www.w3.org/2000/svg"
            className={styles.mapSvg}
            aria-label="Carte de la Belgique"
            dangerouslySetInnerHTML={{ __html: BELGIUM_SVG_INNER }}
          />
          <div className={styles.mapBadge}>
            <span className={styles.mapBadgeCode}>BE</span>
            <span className={styles.mapBadgeRegion}>Belgique</span>
          </div>
        </div>
      </div>
    </div>
  );
}
