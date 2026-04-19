import React from 'react';
import { MousePointer2 } from 'lucide-react';

export const MockupWeb = () => {
  return (
    <div style={{
      width: '100%',
      height: '420px',
      backgroundColor: '#1e1e24',
      borderRadius: '8px',
      border: '1px solid rgba(255,255,255,0.1)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      position: 'relative'
    }}>
      {/* Editor Top Bar */}
      <div style={{
        height: '35px',
        backgroundColor: '#15151a',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        gap: '8px'
      }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
        <div style={{ marginLeft: '16px', color: '#888', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>WEB BUILDER</div>
      </div>
      
      {/* Editor Workspace */}
      <div style={{ display: 'flex', flex: 1, position: 'relative', overflow: 'hidden' }}>
        
        {/* Left Sidebar (Elements) */}
        <div style={{ width: '60px', backgroundColor: '#111', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 2 }}>
          <div style={{ width: '100%', height: '30px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
          <div className="sidebar-target" style={{ width: '100%', height: '30px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
          <div style={{ width: '100%', height: '30px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
          <div style={{ width: '100%', height: '30px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
        </div>

        {/* Center Canvas */}
        <div style={{ flex: 1, backgroundColor: '#f5f5f5', position: 'relative', overflow: 'hidden' }}>
           {/* Canvas Header */}
           <div style={{ height: '40px', backgroundColor: 'var(--text-light)', borderBottom: '1px solid #eaeaea', display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between' }}>
             <div style={{ width: '60px', height: '12px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
             <div style={{ width: '100px', height: '12px', backgroundColor: '#f0f0f0', borderRadius: '4px' }} />
           </div>
           
           {/* Canvas Content */}
           <div style={{ padding: '20px' }}>
             <div style={{ width: '100%', height: '80px', backgroundColor: 'var(--text-light)', borderRadius: '8px', border: '1px solid #eaeaea', marginBottom: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40%', height: '14px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
                <div style={{ width: '20%', height: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }} />
             </div>
             
             {/* Dropped Element Layer */}
             <div className="dropped-element" style={{ width: '100%', height: '120px', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '2px dashed #3b82f6', borderRadius: '8px', opacity: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="dropped-content" style={{ width: '0%', height: '8px', backgroundColor: '#3b82f6', borderRadius: '4px' }} />
             </div>
           </div>
        </div>

        {/* Right Sidebar (Properties) */}
        <div style={{ width: '90px', backgroundColor: '#111', borderLeft: '1px solid rgba(255,255,255,0.05)', padding: '12px', zIndex: 2 }}>
           <div style={{ width: '100%', height: '14px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px', marginBottom: '16px' }} />
           <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginBottom: '8px' }} />
           <div style={{ width: '100%', height: '20px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '16px' }} />
           <div style={{ width: '100%', height: '25px', backgroundColor: '#3b82f6', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', marginBottom: '16px' }} />
           <div className="property-target" style={{ width: '100%', height: '25px', backgroundColor: '#22c55e', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', opacity: 0.3 }} />
        </div>

        {/* Animated Mouse Cursor */}
        <div className="animated-cursor" style={{ position: 'absolute', zIndex: 50, top: '70%', left: '70%', textShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
           <MousePointer2 size={24} color="var(--text-light)" fill="#2563eb" style={{ transform: 'rotate(-15deg)' }} />
           {/* Click effect circle */}
           <div className="click-ripple" style={{ position: 'absolute', top: '2px', left: '2px', width: '20px', height: '20px', backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '50%', transform: 'scale(0)', opacity: 0 }} />
        </div>
        
        {/* Animated dragging element duplicate */}
        <div className="dragging-element" style={{ position: 'absolute', zIndex: 40, width: '40px', height: '30px', backgroundColor: 'rgba(59, 130, 246, 0.4)', border: '1px solid #3b82f6', borderRadius: '4px', top: '55px', left: '10px', opacity: 0 }} />

      </div>
      <style>{`
        /* Mouse movement */
        .animated-cursor {
          animation: mouseMove 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes mouseMove {
          0%, 5% { transform: translate(0, 0); } 
          15% { transform: translate(-230px, -180px); } 
          18% { transform: translate(-230px, -180px) scale(0.9); } 
          22% { transform: translate(-230px, -180px); } 
          35% { transform: translate(-100px, -60px); } 
          38% { transform: translate(-100px, -60px) scale(0.9); } 
          42% { transform: translate(-100px, -60px); } 
          60% { transform: translate(75px, -30px); } 
          63% { transform: translate(75px, -30px) scale(0.9); } 
          67%, 85% { transform: translate(75px, -30px); }
          95%, 100% { transform: translate(0, 0); } 
        }
        
        .click-ripple {
          animation: ripple 8s infinite;
        }
        @keyframes ripple {
          0%, 17% { opacity: 0; transform: scale(0); }
          18% { opacity: 1; transform: scale(1); }
          19%, 37% { opacity: 0; transform: scale(2.5); }
          38% { opacity: 1; transform: scale(1); }
          39%, 62% { opacity: 0; transform: scale(2.5); }
          63% { opacity: 1; transform: scale(1); }
          64%, 100% { opacity: 0; transform: scale(2.5); }
        }

        /* Dragging ghost */
        .dragging-element {
          animation: dragMove 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes dragMove {
          0%, 20% { opacity: 0; transform: translate(0, 0); }
          22% { opacity: 1; transform: translate(0, 0); box-shadow: 0 4px 10px rgba(0,0,0,0.5); } 
          35% { opacity: 1; transform: translate(130px, 120px); } 
          38% { opacity: 0; transform: translate(130px, 120px) scale(1.1); } 
          100% { opacity: 0; }
        }

        /* Dropped target canvas block */
        .dropped-element {
          animation: appearCanvas 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes appearCanvas {
          0%, 37% { opacity: 0; background-color: transparent; border-color: transparent; }
          38%, 63% { opacity: 1; background-color: rgba(59, 130, 246, 0.05); border-color: rgba(59, 130, 246, 0.5); }
          64%, 90% { opacity: 1; background-color: rgba(34, 197, 94, 0.08); border-color: rgba(34, 197, 94, 0.3); border-radius: 8px; } 
          91%, 100% { opacity: 0;}
        }
        
        .dropped-content {
          animation: appearContent 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes appearContent {
           0%, 38% { width: 0%; background-color: #3b82f6; }
           45%, 63% { width: 60%; background-color: #3b82f6; }
           64%, 90% { width: 80%; background-color: #22c55e; }
           91%, 100% { width: 0%; }
        }
        
        .property-target {
           animation: propertyHighlight 8s infinite;
        }
        @keyframes propertyHighlight {
           0%, 62% { opacity: 0.3; }
           63%, 90% { opacity: 1; border-color: var(--text-light); box-shadow: 0 0 10px rgba(34, 197, 94, 0.5); }
           91%, 100% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};
