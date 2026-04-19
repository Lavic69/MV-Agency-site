"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';
import styles from './Header.module.css';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <Image src="/Logo_Rond_MV_V2.svg" alt="MV Agency Logo" width={36} height={36} className={styles.logoImage} />
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
            <Button variant="magic" className={styles.headerButton}>Réserver un appel</Button>
          </Link>
        </div>

        {/* Bouton Hamburger pour mobile */}
        <button 
          className={styles.mobileMenuButton} 
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      </header>

      {/* OVERLAY DU MENU MOBILE */}
      <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuTitle}>Navigation</div>
        <nav className={styles.mobileNav}>
          <Link href="/" className={styles.mobileNavLink} onClick={closeMenu}>Accueil</Link>
          <Link href="/services" className={styles.mobileNavLink} onClick={closeMenu}>Services</Link>
          <Link href="/offres" className={styles.mobileNavLink} onClick={closeMenu}>Offres & Packs</Link>
          <Link href="/a-propos" className={styles.mobileNavLink} onClick={closeMenu}>À propos</Link>
          <Link href="/blog" className={styles.mobileNavLink} onClick={closeMenu}>Ressources</Link>
        </nav>
        
        <div className={styles.mobileMenuFooter}>
          <Link href="/contact" onClick={closeMenu} style={{ width: '100%', textDecoration: 'none' }}>
            <Button variant="primary" style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem' }}>
              Discuter de votre projet
            </Button>
          </Link>
          <a href="mailto:contact@mv-agency.com" className={styles.contactEmail} style={{ marginTop: '1rem' }}>
            contact@mv-agency.com
          </a>
        </div>
      </div>
    </>
  );
};
