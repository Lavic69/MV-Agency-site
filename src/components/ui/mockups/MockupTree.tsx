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
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    }}>
      
      {/* Vertical Line */}
      <div style={{
        position: 'absolute',
        left: '3.6rem',
        top: '3rem',
        bottom: '3rem',
        width: '2px',
        backgroundColor: 'rgba(255,255,255,0.1)'
      }}>
        {/* Animated Progress */}
        <div style={{
          width: '100%',
          backgroundColor: '#3b82f6',
          boxShadow: '0 0 10px #3b82f6',
          animation: 'fillProgress 6s infinite ease-in-out'
        }} className="progress-line" />
      </div>

      <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Step 1 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#1e3a8a', border: '2px solid #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }}>
            <FaPlay color="var(--text-light)" size={16} style={{ marginLeft: '4px' }} />
          </div>
          <div>
            <div style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>Vidéos Loom</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Guides étape par étape</div>
          </div>
        </div>

        {/* Step 2 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', opacity: 0.8 }} className="step-2">
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#111827', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaCheck color="var(--text-light)" size={20} />
          </div>
          <div>
            <div style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>Espace Notion</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Ressources partagées</div>
          </div>
        </div>

        {/* Step 3 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', opacity: 0.5 }} className="step-3">
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#111827', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaGraduationCap color="var(--text-light)" size={24} />
          </div>
          <div>
            <div style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>Autonomie</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Vous gérez votre site</div>
          </div>
        </div>

      </div>

      <style>{`
        .progress-line {
          height: 0%;
        }
        @keyframes fillProgress {
          0%, 10% { height: 0%; }
          45%, 55% { height: 50%; }
          90%, 100% { height: 100%; }
        }
        
        .step-2 {
          animation: wakeUp2 6s infinite ease-in-out;
        }
        .step-3 {
          animation: wakeUp3 6s infinite ease-in-out;
        }
        
        @keyframes wakeUp2 {
          0%, 35% { opacity: 0.5; filter: grayscale(1); }
          50%, 100% { opacity: 1; filter: grayscale(0); }
        }
        @keyframes wakeUp3 {
          0%, 80% { opacity: 0.5; filter: grayscale(1); }
          95%, 100% { opacity: 1; filter: grayscale(0); }
        }
      `}</style>
    </div>
  );
};
