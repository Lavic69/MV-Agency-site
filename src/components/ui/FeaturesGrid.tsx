import React from 'react';
import styles from './FeaturesGrid.module.css';
import { FaDesktop, FaPenNib, FaChartLine, FaBolt, FaSitemap, FaShieldAlt, FaCheckCircle, FaRobot } from 'react-icons/fa';

const features = [
  {
    icon: <FaDesktop />,
    title: "Création Web",
    description: "Sites vitrines et plateformes sur-mesure développées avec les technologies web les plus puissantes (Next.js) pour une rapidité fulgurante.",
    points: ["Performance ultra-rapide", "Design sur-mesure"]
  },
  {
    icon: <FaBolt />,
    title: "Automatisation",
    description: "Libérez votre temps en automatisant vos processus métiers critiques grâce à des intégrations logicielles (Make, n8n) intelligentes.",
    points: ["Intégration CRM / Emails", "Pipelines de données"]
  },
  {
    icon: <FaRobot />,
    title: "Intégrations IA",
    description: "Connecter Claude, GPT et vos outils métier dans un workflow cohérent. Agents IA, LLM sur-mesure, automatisation intelligente.",
    points: ["Agents IA autonomes", "Génération de contenu"]
  },
  {
    icon: <FaCheckCircle />,
    title: "Formation",
    description: "Un accompagnement humain et pédagogique continu pour vous rendre totalement autonome sur vos nouveaux outils digitaux.",
    points: ["Vidéos Loom archivées", "Portail Notion privé"]
  },
  {
    icon: <FaChartLine />,
    title: "SEO / Performance",
    description: "Positionnement de marque et optimisation technique pour garantir une visibilité pérenne et maximale sur les moteurs de recherche.",
    points: ["Audit Sémantique", "Netlinking Premium"]
  },
  {
    icon: <FaPenNib />,
    title: "Conseil Stratégique",
    description: "Un vrai partenaire tech. Nous analysons vos besoins en profondeur pour vous proposer l'architecture la plus rentable.",
    points: ["Audit de l'existant", "Feuille de route technique"]
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
