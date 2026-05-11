import React from 'react';
import { FaGlobe, FaBrain, FaEnvelope } from 'react-icons/fa';

export const MockupWorkflow = () => {
  return (
    <div className="mockup-workflow-scaler">
    <div style={{
      width: '100%',
      height: '300px',
      backgroundColor: '#111216', // Dark background for n8n style
      borderRadius: '8px',
      border: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
      backgroundSize: '24px 24px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    }}>
      
      {/* SVG Connections with animated dash */}
      <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }} className="workflow-svg">
        {/* Line 1 -> 2 (Webhook to OpenAI) — desktop coords */}
        <path className="path-1 path-desktop" d="M 120 95 C 160 95, 160 175, 220 175" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
        <path className="path-1 path-desktop data-flow" d="M 120 95 C 160 95, 160 175, 220 175" fill="none" stroke="#2563eb" strokeWidth="3" />

        {/* Line 2 -> 3 (OpenAI to Email) — desktop coords */}
        <path className="path-2 path-desktop" d="M 300 175 C 340 175, 340 75, 400 75" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
        <path className="path-2 path-desktop data-flow-2" d="M 300 175 C 340 175, 340 75, 400 75" fill="none" stroke="#22c55e" strokeWidth="3" />

        {/* Mobile : nodes plus rapprochés (Email à left:250 au lieu de 380, AI à left:140) */}
        <path className="path-1 path-mobile" d="M 120 95 C 140 95, 140 175, 160 175" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
        <path className="path-1 path-mobile data-flow" d="M 120 95 C 140 95, 140 175, 160 175" fill="none" stroke="#2563eb" strokeWidth="3" />
        <path className="path-2 path-mobile" d="M 240 175 C 260 175, 260 65, 280 65" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
        <path className="path-2 path-mobile data-flow-2" d="M 240 175 C 260 175, 260 65, 280 65" fill="none" stroke="#22c55e" strokeWidth="3" />
      </svg>

      {/* Node 1: Webhook */}
      <div className="node node-webhook" style={{ top: '65px', left: '20px' }}>
        <div style={{ backgroundColor: '#8b5cf6', padding: '12px', borderRadius: '12px 0 0 12px', display: 'flex', alignItems: 'center' }}>
          <FaGlobe color="var(--text-light)" size={20} />
        </div>
        <div style={{ padding: '0 15px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-light)' }}>Webhook</span>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>Trigger</span>
        </div>
      </div>

      {/* Node 2: AI */}
      <div className="node node-ai floating" style={{ top: '145px', left: '200px' }}>
        <div style={{ backgroundColor: '#2563eb', padding: '12px', borderRadius: '12px 0 0 12px', display: 'flex', alignItems: 'center' }}>
          <FaBrain color="var(--text-light)" size={20} />
        </div>
        <div style={{ padding: '0 15px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-light)' }}>OpenAI</span>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>Process Data</span>
        </div>
      </div>

      {/* Node 3: Email */}
      <div className="node node-email" style={{ top: '45px', left: '380px' }}>
        <div style={{ backgroundColor: '#22c55e', padding: '12px', borderRadius: '12px 0 0 12px', display: 'flex', alignItems: 'center' }}>
          <FaEnvelope color="var(--text-light)" size={20} />
        </div>
        <div style={{ padding: '0 15px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-light)' }}>Email</span>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>Send Result</span>
        </div>
      </div>

      <style>{`
        .node {
          position: absolute;
          display: flex;
          background: #1e2028;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          height: 70px;
          min-width: 150px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          transform: scale(0.85);
          transform-origin: left top;
          z-index: 10;
        }
        
        .floating {
          animation: floatNode 4s ease-in-out infinite alternate;
        }

        .data-flow {
          stroke-dasharray: 10 10;
          animation: flowAnim 1s linear infinite;
        }
        
        .data-flow-2 {
          stroke-dasharray: 10 10;
          animation: flowAnim 1s linear infinite;
          animation-delay: 0.5s;
        }

        @keyframes flowAnim {
          from { stroke-dashoffset: 20; }
          to { stroke-dashoffset: 0; }
        }
        
        @keyframes floatNode {
          0% { transform: scale(0.85) translateY(0px); }
          100% { transform: scale(0.85) translateY(-5px); }
        }

        .mockup-workflow-scaler {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        /* Desktop : paths desktop visibles, mobile cachés */
        .path-mobile { display: none; }
        .path-desktop { display: block; }

        /* Mobile : on repositionne Node 3 (Email) plus à gauche pour qu'il rentre
           dans le viewport, plutôt que de scale-down agressivement. */
        @media (max-width: 767px) {
          .mockup-workflow-scaler {
            transform-origin: top center;
            transform: scale(0.95);
            margin-bottom: -4%;
          }
          .node-email {
            left: 250px !important;
            top: 35px !important;
          }
          .node-ai {
            left: 140px !important;
          }
          .path-mobile { display: block; }
          .path-desktop { display: none; }
        }
        @media (max-width: 480px) {
          .mockup-workflow-scaler {
            transform: scale(0.85);
            margin-bottom: -12%;
          }
          .node-email {
            left: 240px !important;
            top: 30px !important;
          }
          .node-ai {
            left: 130px !important;
          }
        }
      `}</style>
    </div>
    </div>
  );
};
