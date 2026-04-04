import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.logo}>MV Agency</span>
          <p className={styles.slogan}>Concevoir, expliquer, propulser votre présence digitale.</p>
        </div>
        <div className={styles.links}>
          <div className={styles.column}>
            <h4>Agence</h4>
            <Link href="/services">Services</Link>
            <Link href="/offres">Offres</Link>
            <Link href="/a-propos">À propos</Link>
          </div>
          <div className={styles.column}>
            <h4>Légal</h4>
            <Link href="/mentions-legales">Mentions Légales</Link>
            <Link href="/politique-de-confidentialite">Confidentialité</Link>
            <Link href="/cgv">CGV</Link>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} MV Agency. Tous droits réservés.</p>
      </div>
    </footer>
  );
};
