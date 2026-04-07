import React from 'react';

export const MockupWeb = () => {
  return (
    <div style={{
      width: '100%',
      height: '300px',
      backgroundColor: '#1e1e24',
      borderRadius: '8px',
      border: '1px solid rgba(255,255,255,0.1)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    }}>
      {/* Browser Bar */}
      <div style={{
        height: '30px',
        backgroundColor: '#2b2b36',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        gap: '6px'
      }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
      </div>
      
      {/* Scrollable Content */}
      <div style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="scroll-animation">
          {/* Header */}
          <div style={{ height: '40px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 1rem', justifyContent: 'space-between' }}>
            <div style={{ width: '80px', height: '14px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '40px', height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
              <div style={{ width: '40px', height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
            </div>
          </div>
          {/* Hero */}
          <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'rgba(37, 99, 235, 0.05)' }}>
            <div style={{ width: '60%', height: '24px', backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '6px', margin: '0 auto 1rem auto' }} />
            <div style={{ width: '40%', height: '12px', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '4px', margin: '0 auto 2rem auto' }} />
            <div style={{ width: '100px', height: '30px', backgroundColor: '#3b82f6', borderRadius: '15px', margin: '0 auto' }} />
          </div>
          {/* Features Grid */}
          <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ height: '80px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: '#3b82f6', borderRadius: '4px', marginBottom: '8px' }} />
                <div style={{ width: '70%', height: '8px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '4px', marginBottom: '4px' }} />
                <div style={{ width: '50%', height: '8px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px' }} />
              </div>
            ))}
          </div>
          {/* Footer */}
          <div style={{ height: '60px', backgroundColor: '#151515', marginTop: '1rem' }} />
        </div>
      </div>
      <style>{`
        .scroll-animation {
          animation: webScroll 12s ease-in-out infinite alternate;
          width: 100%;
        }
        @keyframes webScroll {
          0%, 15% { transform: translateY(0); }
          85%, 100% { transform: translateY(-160px); }
        }
      `}</style>
    </div>
  );
};
