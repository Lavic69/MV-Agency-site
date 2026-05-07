import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { REUNION_SVG_INNER } from "./reunion-svg-content";
import styles from "./ReunionMap.module.css";

/**
 * Layout hybride : carte SVG de La Réunion au centre + cards flottantes autour
 * (Nord / Est / Sud / Ouest) listant les communes desservies.
 *
 * On évite la galère de calibrer des pins SUR la carte (transforms internes
 * du SVG Wikimedia, etc.) en mettant les villes dans des cards SATELLITES
 * autour de la carte. La carte reste un simple visuel "voici La Réunion".
 */

type Zone = {
  label: string;
  primary: string;
  others: ReadonlyArray<string>;
};

type ZoneKey = "nord" | "est" | "sud" | "ouest";

const ZONES: Record<ZoneKey, Zone> = {
  nord: {
    label: "Nord",
    primary: "Saint-Denis",
    others: ["Sainte-Marie", "Sainte-Suzanne"],
  },
  est: {
    label: "Est",
    primary: "Saint-Benoît",
    others: ["Saint-André", "Sainte-Rose", "Bras-Panon"],
  },
  sud: {
    label: "Sud",
    primary: "Saint-Pierre",
    others: ["Saint-Louis", "Saint-Joseph", "Saint-Philippe", "Le Tampon"],
  },
  ouest: {
    label: "Ouest",
    primary: "Saint-Paul",
    others: ["Le Port", "La Possession", "Saint-Leu"],
  },
};

const ICONS: Record<ZoneKey, typeof ArrowUp> = {
  nord: ArrowUp,
  est: ArrowRight,
  sud: ArrowDown,
  ouest: ArrowLeft,
};

export function ReunionMap() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.layoutGrid}>
        {(Object.keys(ZONES) as ZoneKey[]).map((key) => {
          const zone = ZONES[key];
          const Icon = ICONS[key];
          return (
            <article
              key={key}
              className={styles.zoneCard}
              style={{ gridArea: key }}
            >
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

        {/* Centre : carte SVG de La Réunion (juste le contour, pas de pins) */}
        <div className={styles.mapCenter} style={{ gridArea: "center" }}>
          <svg
            viewBox="0 0 1037 964"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Carte de La Réunion"
            className={styles.mapSvg}
            dangerouslySetInnerHTML={{ __html: REUNION_SVG_INNER }}
          />
          <div className={styles.mapBadge}>
            <span className={styles.mapBadge974}>974</span>
            <span className={styles.mapBadgeRegion}>La Réunion</span>
          </div>
        </div>
      </div>
    </div>
  );
}
