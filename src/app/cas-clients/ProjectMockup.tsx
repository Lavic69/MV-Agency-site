import React from 'react';
import styles from './ProjectMockup.module.css';

interface ProjectMockupProps {
  desktopSrc: string;
  hasMobile?: boolean;
  hasWebApp?: boolean;
  mobileSrc?: string;
  webAppSrc?: string;
  projectName: string;
}

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
          <img src={desktopSrc} alt={`${projectName} Desktop`} className={styles.screenImage} />
        </div>
      </div>

      {hasMobile && (
        <div className={styles.mobileFrame}>
          <div className={styles.mobileNotch}></div>
          <img src={mobileSrc || desktopSrc} alt={`${projectName} Mobile`} className={styles.screenImage} style={{ objectPosition: 'center top' }} />
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
            <img src={webAppSrc || desktopSrc} alt={`${projectName} SaaS Area`} className={styles.screenImage} style={{ objectFit: 'contain', objectPosition: 'center top' }} />
          </div>
        </div>
      )}
    </div>
  );
};
