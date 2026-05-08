import React from "react";
import styles from "./Article.module.css";

interface StickyTakeawaysProps {
  takeaways: string[];
  /**
   * Si vrai (par défaut), le composant est rendu en sidebar sticky sur desktop.
   * Sur mobile (< 900px), il bascule automatiquement en bloc statique
   * via la media query CSS.
   */
  asSidebar?: boolean;
}

export const StickyTakeaways: React.FC<StickyTakeawaysProps> = ({ takeaways, asSidebar = true }) => {
  if (takeaways.length === 0) return null;
  return (
    <aside
      className={asSidebar ? styles.takeawaysSticky : styles.takeawaysStatic}
      aria-label="À retenir"
    >
      <div className={styles.takeawaysLabel}>— À retenir</div>
      <ul className={styles.takeawaysList}>
        {takeaways.map((item, i) => (
          <li className={styles.takeawayItem} key={i}>
            <span className={styles.takeawayBullet} aria-hidden="true">{i + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    </aside>
  );
};
