import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/Button';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <Image src="/logo.svg" alt="MV Agency Logo" width={80} height={80} className={styles.logoImage} />
            <span>MV Agency</span>
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/services" className={styles.navLink}>Services</Link>
          <Link href="/offres" className={styles.navLink}>Offres & Packs</Link>
          <Link href="/a-propos" className={styles.navLink}>À propos</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
        </nav>
        <div className={styles.cta}>
          <Link href="/contact" tabIndex={-1}>
            <Button variant="primary">Réserver un appel</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
