"use client";

import React, { useEffect, useState } from 'react';
import { FadeIn } from '../FadeIn';
import { Bot, Cpu, Sparkles, Activity } from 'lucide-react';


export const MockupIA = () => {
  const [messages, setMessages] = useState<string[]>([]);
  
  useEffect(() => {
    const sequence = [
      "Analyse des requêtes entrantes...",
      "Agent Support : 3 tickets traités via base documentaire.",
      "Agent Vente : Lead 'Acme Corp' identifié. Préparation du brouillon d'email.",
      "Génération du contenu optimisé SEO en cours...",
      "Validation sémantique : 98% de correspondance.",
      "Synchronisation avec le CRM réseau..."
    ];
    let index = 0;
    const interval = setInterval(() => {
      setMessages(prev => {
        const next = [...prev, sequence[index]];
        if (next.length > 4) next.shift();
        return next;
      });
      index = (index + 1) % sequence.length;
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '380px',
      background: 'linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.95) 100%)',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.1)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      fontFamily: 'var(--font-body)'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color="var(--primary)" />
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>Cluster IA Autonome</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
        </div>
      </div>

      {/* Grid Canvas */}
      <div style={{ flex: 1, padding: '20px', display: 'flex', gap: '16px', position: 'relative' }}>
        
        {/* Agent 1 Panel */}
        <FadeIn direction="right" delay={0.2} style={{ flex: 1 }}>
          <div style={{ 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid rgba(96, 165, 250, 0.2)', 
            borderRadius: '12px', 
            padding: '12px', 
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ padding: '6px', background: 'rgba(96,165,250,0.1)', borderRadius: '8px' }}>
                <Bot size={16} color="#60A5FA" />
              </div>
              <span style={{ fontSize: '0.8rem', color: '#60A5FA', fontWeight: 500 }}>Agent Support</span>
              <Activity size={12} color="#60A5FA" className="pulseNode" style={{ marginLeft: 'auto' }} />
            </div>
            
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ padding: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', borderLeft: '2px solid #60A5FA' }}>
                Analyse sémantique mail reçus...
              </div>
              <div style={{ padding: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', borderLeft: '2px solid #60A5FA' }}>
                Génération de réponse RAG + Contexte
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Network link visual */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexDirection: 'column',
          gap: '8px' 
        }}>
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
          <Cpu size={20} color="var(--text-light)" />
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
        </div>

        {/* Agent 2 Panel */}
        <FadeIn direction="left" delay={0.4} style={{ flex: 1 }}>
          <div style={{ 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid rgba(167, 139, 250, 0.2)', 
            borderRadius: '12px', 
            padding: '12px', 
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ padding: '6px', background: 'rgba(167,139,250,0.1)', borderRadius: '8px' }}>
                <Bot size={16} color="#A78BFA" />
              </div>
              <span style={{ fontSize: '0.8rem', color: '#A78BFA', fontWeight: 500 }}>Agent Contenu</span>
              <Activity size={12} color="#A78BFA" className="pulseNode" style={{ marginLeft: 'auto' }} />
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
               <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                 <div style={{ width: '68%', height: '100%', background: '#A78BFA' }} className="loadingBar" />
               </div>
               <span style={{ fontSize: '0.65rem' }}>Génération d'article de blog optimisé...</span>
            </div>
          </div>
        </FadeIn>

      </div>

      {/* Terminal Output */}
      <div style={{
        marginTop: 'auto',
        background: 'rgba(0,0,0,0.6)',
        padding: '12px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        minHeight: '100px'
      }}>
        <div style={{ fontSize: '0.65rem', color: '#60A5FA', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Logs Système</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ 
              fontSize: '0.7rem', 
              color: i === messages.length - 1 ? '#fff' : 'var(--text-muted)',
              fontFamily: 'monospace',
              display: 'flex',
              gap: '8px'
            }}>
              <span style={{ color: '#27c93f' }}>{">_"}</span> {msg}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .pulseNode {
          animation: pulseAnim 2s infinite alternate;
        }
        @keyframes pulseAnim {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 1; }
        }
        .loadingBar {
          animation: loadAnim 3s ease-in-out infinite alternate;
        }
        @keyframes loadAnim {
          0% { width: 10%; }
          100% { width: 95%; }
        }
      `}</style>
    </div>
  );
};
