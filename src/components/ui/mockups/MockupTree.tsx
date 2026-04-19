"use client";

import React from 'react';
import { FaPlay, FaCheck, FaGraduationCap } from 'react-icons/fa';

export const MockupTree = () => {
  return (
    <div style={{
      width: '100%',
      height: '300px',
      backgroundColor: '#0a0a0c',
      borderRadius: '8px',
      border: '1px solid rgba(255,255,255,0.05)',
      padding: '2rem',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      overflow: 'hidden'
    }}>
      
      {/* SVG Animation Path (Straight vertical line in the back) */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <line
          x1="63.5" y1="68" x2="63.5" y2="232"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          className="circuit-path"
          x1="63.5" y1="68" x2="63.5" y2="232"
          stroke="#3b82f6"
          strokeWidth="4"
          strokeLinecap="round"
          filter="drop-shadow(0 0 6px rgba(59, 130, 246, 0.9))"
        />
      </svg>

      <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', gap: '2rem', marginLeft: '0.4rem' }}>
        
        {/* Step 1 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#1e3a8a', border: '2px solid rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)' }}>
            <FaPlay color="var(--text-light)" size={16} style={{ marginLeft: '4px' }} />
          </div>
          <div style={{ zIndex: 2 }}>
            <div style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>Vidéos Loom</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Guides étape par étape</div>
          </div>
        </div>

        {/* Step 2 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div className="icon-step-2" style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#111827', border: '2px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, transition: 'all 0.3s ease' }}>
            <FaCheck color="var(--text-light)" size={20} />
          </div>
          <div style={{ zIndex: 2 }}>
            <div style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>Espace Notion</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Ressources partagées</div>
          </div>
        </div>

        {/* Step 3 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div className="icon-step-3" style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#111827', border: '2px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, transition: 'all 0.3s ease' }}>
            <FaGraduationCap color="var(--text-light)" size={24} />
          </div>
          <div style={{ zIndex: 2 }}>
            <div style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>Autonomie</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Vous gérez votre site</div>
          </div>
        </div>

      </div>

      <style>{`
        .circuit-path {
          stroke-dasharray: 164;
          stroke-dashoffset: 164;
          animation: traceStraight 3s ease-in-out infinite alternate;
        }

        @keyframes traceStraight {
          0% { stroke-dashoffset: 164; }
          100% { stroke-dashoffset: 0; }
        }
        
        .icon-step-2 {
          animation: pulseGlow2 3s ease-in-out infinite alternate;
        }
        
        .icon-step-3 {
          animation: pulseGlow3 3s ease-in-out infinite alternate;
        }
        
        @keyframes pulseGlow2 {
          0%, 35% { border-color: transparent; box-shadow: none; background-color: #111827; transform: scale(1); }
          55%, 100% { border-color: rgba(59, 130, 246, 0.5); box-shadow: 0 0 15px rgba(59, 130, 246, 0.4); background-color: #1e3a8a; transform: scale(1.05); }
        }

        @keyframes pulseGlow3 {
          0%, 80% { border-color: transparent; box-shadow: none; background-color: #111827; transform: scale(1); }
          100% { border-color: rgba(59, 130, 246, 0.5); box-shadow: 0 0 15px rgba(59, 130, 246, 0.4); background-color: #1e3a8a; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};
