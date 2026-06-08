import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { CONTACT_EMAIL } from '@/lib/seo';
import { TrackedLink } from './ui/TrackedLink';
import { EVENTS } from '@/lib/analytics';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGlow}></div>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.brandPanel}>
            <Link href="/" className={styles.logoLink}>
              <Image src="/Logo_Rond_MV_V2.svg" alt="MV Agency Logo" width={48} height={48} className={styles.logoImage} />
              <span className={styles.logoText}>MV Agency</span>
            </Link>
            <p className={styles.slogan}>Concevoir, expliquer, propulser votre présence digitale.<br /><strong>L'IA en plus.</strong></p>
            <div className={styles.contactInfo}>
              <TrackedLink
                href={`mailto:${CONTACT_EMAIL}`}
                event={EVENTS.EMAIL_CLICKED}
                eventProps={{ location: 'footer' }}
              >
                {CONTACT_EMAIL}
              </TrackedLink>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Basé à La Réunion · Intervention France &amp; Belgique</p>
            </div>
          </div>

          <div className={styles.linksPanel}>
            <div className={styles.column}>
              <h3 className={styles.colTitle}>Agence</h3>
              <Link href="/services" className={styles.link}>Services</Link>
              <Link href="/offres" className={styles.link}>Offres &amp; Packs</Link>
              <Link href="/a-propos" className={styles.link}>À propos</Link>
              <TrackedLink
                href="/contact"
                event={EVENTS.CONTACT_CTA_CLICKED}
                eventProps={{ location: 'footer' }}
                className={styles.link}
              >
                Contact
              </TrackedLink>
            </div>
            <div className={styles.column}>
              <h3 className={styles.colTitle}>Ressources</h3>
              <Link href="/cas-clients" className={styles.link}>Cas clients</Link>
              <Link href="/blog" className={styles.link}>Blog &amp; Actualités</Link>
              <Link href="/plan-du-site" className={styles.link}>Plan du site</Link>
            </div>
            <div className={styles.column}>
              <h3 className={styles.colTitle}>Légal</h3>
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
            <a href="https://www.linkedin.com/company/mv-ai-agency" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
            <a href="https://www.facebook.com/profile.php?id=61590131930095" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
            <a href="https://www.instagram.com/mvagency.ai/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069v-2.163zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.947.072s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
