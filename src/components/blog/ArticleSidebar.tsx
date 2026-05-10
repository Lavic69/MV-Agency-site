"use client";

import React, { useEffect, useState } from "react";
import type { TocItem } from "@/app/blog/_articles";
import styles from "./Article.module.css";

interface ArticleSidebarProps {
  tocItems: TocItem[];
  takeaways: string[];
}

export const ArticleSidebar: React.FC<ArticleSidebarProps> = ({ tocItems, takeaways }) => {
  const [activeId, setActiveId] = useState<string | null>(tocItems[0]?.id ?? null);

  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // On garde la dernière section qui passe en "intersecting" — la plus haute visible.
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          // Trier par position verticale et prendre la première (la plus haute dans le viewport).
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(visible[0].target.id);
        }
      },
      {
        threshold: [0, 0.5, 1],
        rootMargin: "-30% 0px -50% 0px",
      }
    );

    const targets: HTMLElement[] = [];
    for (const item of tocItems) {
      const el = document.getElementById(item.id);
      if (el) {
        observer.observe(el);
        targets.push(el);
      }
    }

    return () => {
      for (const el of targets) observer.unobserve(el);
      observer.disconnect();
    };
  }, [tocItems]);

  if (tocItems.length === 0 && takeaways.length === 0) return null;

  const tocSection = tocItems.length > 0 && (
    <nav aria-label="Sommaire de l'article">
      <div className={styles.sidebarLabel}>— Sommaire</div>
      <ul className={styles.tocList}>
        {tocItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`${styles.tocItem} ${activeId === item.id ? styles.tocItemActive : ""}`}
              aria-current={activeId === item.id ? "location" : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  const takeawaysSection = takeaways.length > 0 && (
    <div>
      <div className={styles.sidebarLabel}>— À retenir</div>
      <ul className={styles.takeawaysList}>
        {takeaways.map((item, i) => (
          <li className={styles.takeawayItem} key={i}>
            <span className={styles.takeawayBullet} aria-hidden="true">{i + 1}</span>
            {/* Safe: takeaways come from the trusted internal registry _articles.ts (no user input). */}
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    </div>
  );

  const desktopAside = (
    <aside className={`${styles.sidebar} ${styles.sidebarDesktop}`} aria-label="Sommaire et points à retenir">
      {tocSection}
      {tocSection && takeawaysSection && <div className={styles.sidebarSep} aria-hidden="true" />}
      {takeawaysSection}
    </aside>
  );

  const mobileDetails = (
    <details className={styles.sidebarMobile}>
      <summary className={styles.sidebarMobileSummary}>— Sommaire & retenir</summary>
      <div className={styles.sidebarMobileContent}>
        {tocSection}
        {tocSection && takeawaysSection && <div className={styles.sidebarSep} aria-hidden="true" />}
        {takeawaysSection}
      </div>
    </details>
  );

  return (
    <>
      {desktopAside}
      {mobileDetails}
    </>
  );
};
