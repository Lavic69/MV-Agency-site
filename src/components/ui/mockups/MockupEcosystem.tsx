"use client";

import React, { useEffect, useState, useRef } from 'react';
import { FaDesktop, FaRobot, FaBolt, FaGraduationCap } from 'react-icons/fa';

export const MockupEcosystem = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Logical dimensions where everything fits perfectly
  const LOGICAL_WIDTH = 550;
  const LOGICAL_HEIGHT = 450;

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        // Scale down if parent is smaller than logical width, but don't scale up infinitely
        const newScale = Math.min(1, parentWidth / LOGICAL_WIDTH);
        setScale(newScale);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0c',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
        // Dynamic height based on scale to avoid empty space
        height: `${LOGICAL_HEIGHT * scale}px`,
        overflow: 'hidden'
      }}
    >
      <div 
        style={{ 
          position: 'relative', 
          width: LOGICAL_WIDTH, 
          height: LOGICAL_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        
        {/* Background glow in center */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(10,10,10,0) 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        {/* SVG Circuit Path & Glowing Cursor */}
        <svg viewBox={`0 0 ${LOGICAL_WIDTH} ${LOGICAL_HEIGHT}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          
          {/* Default track */}
          <circle cx={LOGICAL_WIDTH/2} cy={LOGICAL_HEIGHT/2} r="130" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4,8" />
          
          {/* Hidden explicit path for the animation to follow precisely */}
          <path id="orbit" d={`M ${LOGICAL_WIDTH/2} ${LOGICAL_HEIGHT/2 - 130} A 130 130 0 1 1 ${LOGICAL_WIDTH/2} ${LOGICAL_HEIGHT/2 + 130} A 130 130 0 1 1 ${LOGICAL_WIDTH/2} ${LOGICAL_HEIGHT/2 - 130}`} fill="none" stroke="none" />
          
          {/* Glowing particle orbiting */}
          <circle r="6" fill="#60a5fa" filter="drop-shadow(0 0 8px #60a5fa)">
            <animateMotion dur="6s" repeatCount="indefinite">
              <mpath href="#orbit" />
            </animateMotion>
          </circle>

          {/* Slight glowing trail effect (second particle trailing) */}
          <circle r="3" fill="rgba(96, 165, 250, 0.5)">
            <animateMotion dur="6s" repeatCount="indefinite" begin="-0.2s">
              <mpath href="#orbit" />
            </animateMotion>
          </circle>
          
          {/* Center visual core */}
          <circle cx={LOGICAL_WIDTH/2} cy={LOGICAL_HEIGHT/2} r="28" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <circle cx={LOGICAL_WIDTH/2} cy={LOGICAL_HEIGHT/2} r="8" fill="#60a5fa" filter="drop-shadow(0 0 12px #60a5fa)">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
          </circle>

        </svg>

        {/* --- The 4 Pillars Nodes --- */}

        {/* Top: Web */}
        <div style={{ position: 'absolute', top: LOGICAL_HEIGHT/2 - 130, left: LOGICAL_WIDTH/2, transform: 'translate(-50%, -50%)', zIndex: 2 }}>
          <div style={{ position: 'relative', width: 48, height: 48, borderRadius: '50%', background: '#111827', border: '1px solid rgba(59, 130, 246, 0.4)', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)' }}>
            <FaDesktop />
            <span style={{ position: 'absolute', bottom: '100%', marginBottom: '14px', left: '50%', transform: 'translateX(-50%)', color: 'var(--text-light)', fontWeight: 'bold', fontSize: '1rem', whiteSpace: 'nowrap' }}>Développement Web</span>
          </div>
        </div>

        {/* Right: IA */}
        <div style={{ position: 'absolute', top: LOGICAL_HEIGHT/2, left: LOGICAL_WIDTH/2 + 130, transform: 'translate(-50%, -50%)', zIndex: 2 }}>
          <div style={{ position: 'relative', width: 52, height: 52, borderRadius: '50%', background: '#111827', border: '1px solid rgba(168, 85, 247, 0.4)', color: '#d8b4fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', boxShadow: '0 0 15px rgba(168, 85, 247, 0.2)' }}>
            <FaRobot />
            <span style={{ position: 'absolute', left: '100%', marginLeft: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)', fontWeight: 'bold', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>Intelligence<br/>Artificielle</span>
          </div>
        </div>

        {/* Bottom: Automatisation */}
        <div style={{ position: 'absolute', top: LOGICAL_HEIGHT/2 + 130, left: LOGICAL_WIDTH/2, transform: 'translate(-50%, -50%)', zIndex: 2 }}>
          <div style={{ position: 'relative', width: 48, height: 48, borderRadius: '50%', background: '#111827', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 0 15px rgba(16, 185, 129, 0.2)' }}>
            <FaBolt />
            <span style={{ position: 'absolute', top: '100%', marginTop: '14px', left: '50%', transform: 'translateX(-50%)', color: 'var(--text-light)', fontWeight: 'bold', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>Automatisation</span>
          </div>
        </div>

        {/* Left: Formation */}
        <div style={{ position: 'absolute', top: LOGICAL_HEIGHT/2, left: LOGICAL_WIDTH/2 - 130, transform: 'translate(-50%, -50%)', zIndex: 2 }}>
          <div style={{ position: 'relative', width: 48, height: 48, borderRadius: '50%', background: '#111827', border: '1px solid rgba(251, 146, 60, 0.4)', color: '#fdba74', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 0 15px rgba(251, 146, 60, 0.2)' }}>
            <FaGraduationCap />
            <span style={{ position: 'absolute', right: '100%', marginRight: '16px', top: '50%', transform: 'translateY(-50%)', textAlign: 'right', color: 'var(--text-light)', fontWeight: 'bold', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>Formation<br/>& Autonomie</span>
          </div>
        </div>

      </div>
    </div>
  );
};
