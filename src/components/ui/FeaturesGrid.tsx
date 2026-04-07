import React from 'react';
import styles from './FeaturesGrid.module.css';
import { FaDesktop, FaPenNib, FaChartLine, FaBolt, FaSitemap, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

const features = [
  {
    icon: <FaDesktop />,
    title: "Développement Web High-End",
    description: "Sites vitrines et plateformes SaaS développées avec les technologies web les plus puissantes (Next.js) pour une rapidité fulgurante.",
    points: ["Performance Core Web Vitals", "Architecture évolutive"]
  },
  {
    icon: <FaPenNib />,
    title: "UI/UX Design Éditorial",
    description: "Conception d'interfaces minimalistes et immersives, basées sur une hiérarchie visuelle forte et une psychologie utilisateur éprouvée.",
    points: ["Design System sur mesure", "Prototypage Haute Fidélité"]
  },
  {
    icon: <FaChartLine />,
    title: "Stratégie & SEO",
    description: "Positionnement de marque et optimisation technique pour garantir une visibilité pérenne et maximale sur les moteurs de recherche.",
    points: ["Audit Sémantique Profond", "Netlinking Premium"]
  },
  {
    icon: <FaBolt />,
    title: "Automatisation Workflow",
    description: "Libérez votre temps en automatisant vos processus métiers critiques grâce à des intégrations d'API robustes et intelligentes.",
    points: ["Intégration CRM / ERP", "Pipelines de données"]
  },
  {
    icon: <FaSitemap />,
    title: "Écosystèmes E-commerce",
    description: "Déploiement de boutiques en ligne haute performance maximisant le panier moyen et la fidélisation client.",
    points: ["Shopify / Headless Commerce", "Optimisation CRO"]
  },
  {
    icon: <FaShieldAlt />,
    title: "Maintenance & Sécurité",
    description: "Surveillance 24/7 et mises à jour continues pour garantir l'intégrité et la disponibilité de votre infrastructure numérique.",
    points: ["Backups Sécurisés Quotidiens", "Protection Avancée"]
  }
];

export const FeaturesGrid = () => {
  return (
    <div className={styles.gridContainer}>
      {features.map((feat, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.iconWrapper}>{feat.icon}</div>
          <h3 className={styles.title}>{feat.title}</h3>
          <p className={styles.description}>{feat.description}</p>
          <ul className={styles.pointsList}>
            {feat.points.map((point, idx) => (
              <li key={idx}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
