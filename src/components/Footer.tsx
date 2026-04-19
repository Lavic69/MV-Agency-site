import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { Button } from './ui/Button';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGlow}></div>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.brandPanel}>
            <Link href="/" className={styles.logoLink}>
              <Image src="/icon-logo.svg" alt="MV Agency Logo" width={48} height={48} className={styles.logoImage} />
              <span className={styles.logoText}>MV Agency</span>
            </Link>
            <p className={styles.slogan}>Concevoir, expliquer, propulser votre présence digitale.<br /><strong>L'IA en plus.</strong></p>
            <div className={styles.contactInfo}>
              <a href="mailto:contact@mv-agency.com">contact@mv-agency.com</a>
              <p>Saint-Denis, La Réunion &bull; Belgique</p>
            </div>
          </div>

          <div className={styles.linksPanel}>
            <div className={styles.column}>
              <h4 className={styles.colTitle}>Agence</h4>
              <Link href="/services" className={styles.link}>Services</Link>
              <Link href="/offres" className={styles.link}>Offres & Packs</Link>
              <Link href="/a-propos" className={styles.link}>À propos</Link>
              <Link href="/contact" className={styles.link}>Contact</Link>
            </div>
            <div className={styles.column}>
              <h4 className={styles.colTitle}>Ressources</h4>
              <Link href="/cas-clients" className={styles.link}>Cas clients</Link>
              <Link href="/blog" className={styles.link}>Blog & Actualités</Link>
            </div>
            <div className={styles.column}>
              <h4 className={styles.colTitle}>Légal</h4>
              <Link href="/mentions-legales" className={styles.link}>Mentions Légales</Link>
              <Link href="/politique-de-confidentialite" className={styles.link}>Confidentialité</Link>
              <Link href="/cgv" className={styles.link}>CGV</Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p className={styles.copyright}>&copy; {new Date().getFullYear()} MV Agency. Tous droits réservés.</p>
          <div className={styles.socials}>
            <a href="#" aria-label="LinkedIn"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
            <a href="#" aria-label="Twitter"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
            <a href="#" aria-label="Instagram"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069v-2.163zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.947.072s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
