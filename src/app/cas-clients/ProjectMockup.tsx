import React from 'react';
import Image from 'next/image';
import styles from './ProjectMockup.module.css';

interface ProjectMockupProps {
  desktopSrc: string;
  hasMobile?: boolean;
  hasWebApp?: boolean;
  mobileSrc?: string;
  webAppSrc?: string;
  projectName: string;
}

// Tailles approximatives utilisées par le navigateur en CSS — guide pour le srcset
// généré par next/image. Optimisé desktop (≤ 1200px) + mobile (≤ 480px).
const DESKTOP_SIZES = "(max-width: 768px) 100vw, 60vw";
const MOBILE_SIZES = "(max-width: 768px) 30vw, 15vw";
const SAAS_SIZES = "(max-width: 768px) 65vw, 40vw";

export const ProjectMockup: React.FC<ProjectMockupProps> = ({ desktopSrc, hasMobile, hasWebApp, mobileSrc, webAppSrc, projectName }) => {
  return (
    <div className={styles.mockupContainer}>
      <div className={styles.desktopFrame} style={{ transform: (!hasMobile && !hasWebApp) ? 'rotateY(-8deg) rotateX(2deg)' : 'rotateY(-12deg) rotateX(4deg)' }}>
        <div className={styles.browserHeader}>
          <div className={`${styles.dot} ${styles.dotRed}`}></div>
          <div className={`${styles.dot} ${styles.dotYellow}`}></div>
          <div className={`${styles.dot} ${styles.dotGreen}`}></div>
        </div>
        <div className={styles.screenContent}>
          <Image
            src={desktopSrc}
            alt={`${projectName} Desktop`}
            className={styles.screenImage}
            fill
            sizes={DESKTOP_SIZES}
          />
        </div>
      </div>

      {hasMobile && (
        <div className={styles.mobileFrame}>
          <div className={styles.mobileNotch}></div>
          <Image
            src={mobileSrc || desktopSrc}
            alt={`${projectName} Mobile`}
            className={styles.screenImage}
            fill
            sizes={MOBILE_SIZES}
            style={{ objectPosition: 'center top' }}
          />
        </div>
      )}

      {hasWebApp && (
        <div className={styles.saasFrame}>
          <div className={styles.browserHeader}>
            <div className={`${styles.dot} ${styles.dotRed}`}></div>
            <div className={`${styles.dot} ${styles.dotYellow}`}></div>
            <div className={`${styles.dot} ${styles.dotGreen}`}></div>
          </div>
          <div className={styles.screenContent}>
            <Image
              src={webAppSrc || desktopSrc}
              alt={`${projectName} SaaS Area`}
              className={styles.screenImage}
              fill
              sizes={SAAS_SIZES}
              style={{ objectFit: 'contain', objectPosition: 'center top' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
