"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const defaultOffresSteps = [
  {
    num: "01",
    title: "Découverte & Stratégie",
    text: "Nous analysons votre audience, vos défis, et concevons une proposition de valeur alignée à 100% avec vos KPI de croissance."
  },
  {
    num: "02",
    title: "Design & Développement",
    text: "Construction de votre plateforme avec un design premium, des technologies ultra-rapides et un SEO codé à la racine."
  },
  {
    num: "03",
    title: "Automatisation & IA",
    text: "Branchement de l'intelligence artificielle pour vous faire gagner des heures de travail en orchestrant vos flux de données."
  },
  {
    num: "04",
    title: "Lancement & Formation",
    text: "Mise en ligne, tests de conversion, et session de formation vidéo pour vous rendre totalement automone."
  }
];

export interface TimelineStep {
  num: string;
  title: string;
  text: string;
}

export interface TimelineProps {
  steps: TimelineStep[];
}

export const Timeline = ({ steps }: TimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 80%"]
  });

  // Hauteur de la barre bleue pleine qui "s'écoule"
  const glowHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Opacité du bout de la barre pour effet laser
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="timeline-container">
      {/* Background Line (Trunk) */}
      <div className="timeline-line">
        <motion.div 
          className="timeline-glow" 
          style={{ height: glowHeight, opacity }}
        >
          {/* Fading dot at the bottom of the glowing line */}
          <div className="timeline-dot" />
        </motion.div>
      </div>

      {/* Timeline Nodes */}
      <div className="timeline-content">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={index} className={`timeline-item ${isEven ? 'timeline-left' : 'timeline-right'}`}>
              
              <div className="timeline-point" />

              <motion.div 
                className="timeline-card-wrapper"
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              >
                <div 
                  className="timeline-card magic-glow-card"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // Gradient hover position
                    const relativeX = (x / rect.width) * 100;
                    const relativeY = (y / rect.height) * 100;
                    e.currentTarget.style.setProperty('--glow-x', `${relativeX}%`);
                    e.currentTarget.style.setProperty('--glow-y', `${relativeY}%`);
                    e.currentTarget.style.setProperty('--glow-intensity', '1');
                    e.currentTarget.style.setProperty('--glow-radius', '300px');
                    
                    // Tilt effect
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -4;
                    const rotateY = ((x - centerX) / centerX) * 4;
                    e.currentTarget.style.transform = `perspective(1000px) translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.setProperty('--glow-intensity', '0');
                    e.currentTarget.style.transform = `perspective(1000px) translateY(0px) rotateX(0deg) rotateY(0deg)`;
                  }}
                >
                  <div className="card-number">{step.num}</div>
                  <h4 className="card-title">{step.title}</h4>
                  <p className="card-text">{step.text}</p>
                </div>
              </motion.div>
              
            </div>
          );
        })}
      </div>

      <style>{`
        .timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 4rem 0;
        }

        /* The central grey line */
        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(-50%);
        }

        /* The animated neon laser line */
        .timeline-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(180deg, transparent, #3b82f6);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
        }

        .timeline-dot {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%) translateY(50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 10px #fff, 0 0 20px #3b82f6, 0 0 40px #3b82f6;
        }

        .timeline-content {
          display: flex;
          flex-direction: column;
          gap: 6rem; /* Huge vertical gap for scrolling */
        }

        .timeline-item {
          display: flex;
          align-items: center;
          position: relative;
          width: 100%;
        }

        .timeline-left {
          justify-content: flex-start;
        }
        .timeline-right {
          justify-content: flex-end;
        }

        /* Static dots on the line for each node */
        .timeline-point {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #111827;
          border: 2px solid rgba(255,255,255,0.2);
          z-index: 2;
        }

        .timeline-card-wrapper {
          width: 45%;
          position: relative;
        }

        .timeline-card {
          position: relative;
          background: rgba(10, 10, 10, 0.5); /* Matching Bento */
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px; /* Slightly rounder like bento */
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 0;
          width: 100%;
          --glow-intensity: 0;
          transition: transform 0.2s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          transform-style: preserve-3d;
        }

        .timeline-card:hover {
          box-shadow: 0 4px 20px rgba(37, 99, 235, 0.15), 0 0 30px rgba(37, 99, 235, 0.1);
          border-color: rgba(37, 99, 235, 0.3);
        }

        .timeline-card::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 2px;
          background: radial-gradient(
            var(--glow-radius, 300px) circle at var(--glow-x, 50%) var(--glow-y, 50%),
            rgba(37, 99, 235, calc(var(--glow-intensity) * 0.8)) 0%,
            rgba(37, 99, 235, calc(var(--glow-intensity) * 0.4)) 30%,
            transparent 60%
          );
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          opacity: 1;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        /* Connecting small horizontal line between dot and card */
        .timeline-card-wrapper::before {
          content: "";
          position: absolute;
          top: 50%;
          width: calc(11.11% - 8px); /* 50% - 45% = 5% of container roughly */
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-50%);
        }
        
        .timeline-left .timeline-card-wrapper::before {
          right: -11.11%;
        }
        
        .timeline-right .timeline-card-wrapper::before {
          left: -11.11%;
        }

        .card-number {
          font-size: 5rem;
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(37, 99, 235, 0.5);
          background: linear-gradient(180deg, rgba(37, 99, 235, 0.8) 0%, rgba(37, 99, 235, 0.1) 100%);
          -webkit-background-clip: text;
          line-height: 1;
          margin-bottom: 1rem;
          position: absolute;
          top: -30px;
          left: 1.5rem;
          filter: drop-shadow(0 4px 10px rgba(37, 99, 235, 0.3));
        }
        
        .timeline-right .card-number {
          left: auto;
          right: 2rem;
        }

        .card-title {
          font-size: 1.3rem;
          color: var(--text-light);
          margin-bottom: 1rem;
          font-weight: 700;
          position: relative;
          z-index: 1;
        }

        .card-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
          line-height: 1.6;
          position: relative;
          z-index: 1;
        }

        /* Mobile layout: line on the left instead of center */
        @media (max-width: 768px) {
          .timeline-line, .timeline-point {
            left: 20px;
          }
          
          .timeline-content {
            gap: 3rem;
          }
          
          .timeline-left, .timeline-right {
            justify-content: flex-end;
          }
          
          .timeline-card-wrapper {
            width: calc(100% - 60px); 
          }
          
          .timeline-card-wrapper::before {
             display: none;
          }
          
          .card-number {
            left: 1rem;
            right: auto;
          }
        }
      `}</style>
    </div>
  );
};
