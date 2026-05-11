"use client";

/**
 * Animations mobile-only pour les 4 service blocks de /services.
 *
 * Inspirées des MockupWeb/Workflow/IA/Tree desktop mais en versions stripped
 * down : largeur 100% du card mobile (~310px), hauteur ~120px, CSS-animated
 * (pas de SVG complexe ni de logique de scale dynamique).
 *
 * Désactivées sur desktop par les wrappers .mobileOnly dans services/page.tsx.
 */

import React from "react";
import { FaPlay, FaCheck, FaGraduationCap, FaGlobe, FaBrain, FaEnvelope, FaDesktop, FaRobot, FaBolt } from "react-icons/fa";
import { Bot, Sparkles } from "lucide-react";

/* ============================================================
   1. CRÉATION WEB — mini browser + skeleton lines
   ============================================================ */
export const MobileWebAnim = () => (
  <div className="msa-card msa-web">
    <div className="msa-web-topbar">
      <span className="msa-web-dot" style={{ background: "#ff5f56" }} />
      <span className="msa-web-dot" style={{ background: "#ffbd2e" }} />
      <span className="msa-web-dot" style={{ background: "#27c93f" }} />
      <span className="msa-web-url" />
    </div>
    <div className="msa-web-body">
      <div className="msa-web-heading" />
      <div className="msa-web-line msa-pulse" style={{ width: "75%" }} />
      <div className="msa-web-line msa-pulse" style={{ width: "55%", animationDelay: "0.2s" }} />
      <div className="msa-web-line msa-pulse" style={{ width: "85%", animationDelay: "0.4s" }} />
    </div>
    <style jsx>{`
      .msa-card {
        width: 100%;
        max-width: 320px;
        height: 140px;
        background: #15151a;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
      }
      .msa-web-topbar {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 10px;
        background: rgba(0, 0, 0, 0.4);
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }
      .msa-web-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
      .msa-web-url {
        flex: 1;
        height: 12px;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 4px;
        margin-left: 6px;
      }
      .msa-web-body {
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .msa-web-heading {
        height: 14px;
        width: 50%;
        background: linear-gradient(90deg, #2563eb 0%, #60a5fa 100%);
        border-radius: 4px;
        margin-bottom: 4px;
      }
      .msa-web-line {
        height: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
      }
      @keyframes msa-pulse {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 1; }
      }
      .msa-pulse {
        animation: msa-pulse 2s ease-in-out infinite;
      }
    `}</style>
  </div>
);

/* ============================================================
   2. AUTOMATISATION — 3 nodes + connecteurs dashed animés
   Refonte du cordon : flex-grow + repeating-linear-gradient pour que les
   dashed lines remplissent EXACTEMENT le gap entre nodes (vs SVG fixed coords
   qui se désalignaient à largeurs variables).
   ============================================================ */
export const MobileWorkflowAnim = () => (
  <div className="msa-card msa-workflow">
    <div className="msa-wf-row">
      <div className="msa-wf-cell">
        <div className="msa-wf-node" style={{ background: "#8b5cf6" }}>
          <FaGlobe size={16} color="#fff" />
        </div>
        <span className="msa-wf-label">Webhook</span>
      </div>
      <div className="msa-wf-connector msa-wf-connector-1" />
      <div className="msa-wf-cell">
        <div className="msa-wf-node msa-wf-node-ai" style={{ background: "#2563eb" }}>
          <FaBrain size={16} color="#fff" />
        </div>
        <span className="msa-wf-label">OpenAI</span>
      </div>
      <div className="msa-wf-connector msa-wf-connector-2" />
      <div className="msa-wf-cell">
        <div className="msa-wf-node" style={{ background: "#22c55e" }}>
          <FaEnvelope size={16} color="#fff" />
        </div>
        <span className="msa-wf-label">Email</span>
      </div>
    </div>
    <style jsx>{`
      .msa-card {
        width: 100%;
        max-width: 320px;
        height: 140px;
        background: #111216;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        padding: 18px 14px;
        display: flex;
        align-items: center;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        background-image: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.04) 1px, transparent 0);
        background-size: 16px 16px;
      }
      .msa-wf-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0;
        width: 100%;
      }
      .msa-wf-cell {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
      }
      .msa-wf-node {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
      }
      .msa-wf-node-ai {
        animation: msa-float 2.5s ease-in-out infinite alternate;
      }
      @keyframes msa-float {
        from { transform: translateY(0); }
        to { transform: translateY(-4px); }
      }
      .msa-wf-label {
        font-size: 9px;
        color: rgba(255, 255, 255, 0.55);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        white-space: nowrap;
      }
      /* Connecteur dashed CSS — auto-ajusté à la largeur disponible via flex:1.
         repeating-linear-gradient construit le dashed pattern ; background-position
         anime via keyframes pour effet "flux de données". */
      .msa-wf-connector {
        flex: 1;
        height: 3px;
        align-self: flex-start;
        margin-top: 18px;
        border-radius: 2px;
        background-image: repeating-linear-gradient(
          to right,
          currentColor 0,
          currentColor 6px,
          transparent 6px,
          transparent 12px
        );
        background-size: 24px 100%;
        animation: msa-flow 1.2s linear infinite;
      }
      .msa-wf-connector-1 {
        color: #2563eb;
        box-shadow: 0 0 8px rgba(37, 99, 235, 0.4);
      }
      .msa-wf-connector-2 {
        color: #22c55e;
        box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
        animation-delay: 0.4s;
      }
      @keyframes msa-flow {
        from { background-position: 0 0; }
        to { background-position: 24px 0; }
      }
    `}</style>
  </div>
);

/* ============================================================
   3. AGENTS IA — chat bubble + typing dots + sparkle
   ============================================================ */
export const MobileIAAnim = () => (
  <div className="msa-card msa-ia">
    <div className="msa-ia-header">
      <div className="msa-ia-icon">
        <Bot size={14} />
      </div>
      <span className="msa-ia-name">Agent Support</span>
      <Sparkles size={12} className="msa-ia-sparkle" />
    </div>
    <div className="msa-ia-bubble">
      <div className="msa-ia-text-line" style={{ width: "85%" }} />
      <div className="msa-ia-text-line" style={{ width: "60%" }} />
    </div>
    <div className="msa-ia-typing">
      <span className="msa-ia-dot" />
      <span className="msa-ia-dot" />
      <span className="msa-ia-dot" />
    </div>
    <style jsx>{`
      .msa-card {
        width: 100%;
        max-width: 320px;
        height: 140px;
        background: linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(10,10,10,0.95) 100%);
        border: 1px solid rgba(167, 139, 250, 0.2);
        border-radius: 10px;
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
      }
      .msa-ia-header {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .msa-ia-icon {
        width: 24px;
        height: 24px;
        border-radius: 6px;
        background: rgba(167, 139, 250, 0.15);
        color: #a78bfa;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .msa-ia-name {
        color: #a78bfa;
        font-size: 11px;
        font-weight: 600;
        flex: 1;
      }
      .msa-ia-sparkle {
        color: #60a5fa;
        animation: msa-spark 2s ease-in-out infinite;
      }
      @keyframes msa-spark {
        0%, 100% { transform: scale(1); opacity: 0.5; }
        50% { transform: scale(1.3); opacity: 1; }
      }
      .msa-ia-bubble {
        background: rgba(167, 139, 250, 0.08);
        border-left: 2px solid #a78bfa;
        border-radius: 6px;
        padding: 8px 10px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .msa-ia-text-line {
        height: 6px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 3px;
      }
      .msa-ia-typing {
        display: flex;
        gap: 5px;
        padding: 0 4px;
      }
      .msa-ia-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #a78bfa;
        animation: msa-bounce 1.4s ease-in-out infinite;
      }
      .msa-ia-dot:nth-child(2) { animation-delay: 0.2s; }
      .msa-ia-dot:nth-child(3) { animation-delay: 0.4s; }
      @keyframes msa-bounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
        30% { transform: translateY(-5px); opacity: 1; }
      }
    `}</style>
  </div>
);

/* ============================================================
   4. FORMATION — timeline verticale 3 étapes
   ============================================================ */
export const MobileFormationAnim = () => (
  <div className="msa-card msa-formation">
    <div className="msa-form-line" />
    <div className="msa-form-line-fill" />
    <div className="msa-form-step">
      <div className="msa-form-circle msa-form-circle-active">
        <FaPlay size={9} color="#fff" />
      </div>
      <span className="msa-form-label">Vidéos Loom</span>
    </div>
    <div className="msa-form-step">
      <div className="msa-form-circle msa-form-circle-mid">
        <FaCheck size={11} color="#fff" />
      </div>
      <span className="msa-form-label">Espace Notion</span>
    </div>
    <div className="msa-form-step">
      <div className="msa-form-circle">
        <FaGraduationCap size={11} color="rgba(255,255,255,0.5)" />
      </div>
      <span className="msa-form-label">Autonomie</span>
    </div>
    <style jsx>{`
      .msa-card {
        width: 100%;
        max-width: 320px;
        height: 140px;
        background: #0a0a0c;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        padding: 14px 18px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
      }
      .msa-form-line {
        position: absolute;
        left: 30px;
        top: 22px;
        bottom: 22px;
        width: 3px;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 2px;
      }
      .msa-form-line-fill {
        position: absolute;
        left: 30px;
        top: 22px;
        width: 3px;
        background: var(--primary-500);
        border-radius: 2px;
        box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
        animation: msa-form-fill 3s ease-in-out infinite;
      }
      @keyframes msa-form-fill {
        0% { height: 0; }
        100% { height: calc(100% - 44px); }
      }
      .msa-form-step {
        display: flex;
        align-items: center;
        gap: 12px;
        position: relative;
        z-index: 2;
      }
      .msa-form-circle {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #111827;
        border: 2px solid transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .msa-form-circle-active {
        background: #1e3a8a;
        border-color: rgba(59, 130, 246, 0.5);
        box-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
      }
      .msa-form-circle-mid {
        background: #111827;
        border-color: rgba(59, 130, 246, 0.4);
        animation: msa-form-pulse 2.5s ease-in-out infinite;
      }
      @keyframes msa-form-pulse {
        0%, 100% { box-shadow: 0 0 0 rgba(59, 130, 246, 0); }
        50% { box-shadow: 0 0 12px rgba(59, 130, 246, 0.5); border-color: #60a5fa; }
      }
      .msa-form-label {
        color: var(--text-light);
        font-size: 12px;
        font-weight: 600;
      }
    `}</style>
  </div>
);

/* ============================================================
   5. ECOSYSTEM HERO — mini version animée du MockupEcosystem desktop
   Cercle orbital dashed + 4 nodes (Dev Web / IA / Auto / Formation) +
   particle qui orbite + core central pulsing. Inspiré du desktop mais
   redimensionné pour mobile (stage 280×280, orbit r=70, labels compacts).
   ============================================================ */
export const MobileEcosystemAnim = () => (
  <div className="msa-card msa-eco">
    {/* SVG : cercle orbital + particle qui orbite + core central */}
    <svg className="msa-eco-svg" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
      {/* Glow radial center */}
      <defs>
        <radialGradient id="msa-eco-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(59,130,246,0.18)" />
          <stop offset="70%" stopColor="rgba(10,10,10,0)" />
        </radialGradient>
      </defs>
      <circle cx="140" cy="140" r="120" fill="url(#msa-eco-glow)" />

      {/* Orbital dashed circle */}
      <circle
        cx="140"
        cy="140"
        r="78"
        fill="none"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="1.5"
        strokeDasharray="3 5"
      />

      {/* Hidden path pour animateMotion */}
      <path
        id="msa-eco-orbit"
        d="M 140 62 A 78 78 0 1 1 140 218 A 78 78 0 1 1 140 62"
        fill="none"
        stroke="none"
      />

      {/* Glowing particle orbitant */}
      <circle r="4.5" fill="#60a5fa" filter="drop-shadow(0 0 6px #60a5fa)">
        <animateMotion dur="8s" repeatCount="indefinite">
          <mpath href="#msa-eco-orbit" />
        </animateMotion>
      </circle>
      <circle r="2.5" fill="rgba(96, 165, 250, 0.5)">
        <animateMotion dur="8s" repeatCount="indefinite" begin="-0.3s">
          <mpath href="#msa-eco-orbit" />
        </animateMotion>
      </circle>

      {/* Center core */}
      <circle cx="140" cy="140" r="20" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <circle cx="140" cy="140" r="6" fill="#60a5fa" filter="drop-shadow(0 0 10px #60a5fa)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>

    {/* 4 pillar nodes positionnés en absolu sur le stage */}
    <div className="msa-eco-node msa-eco-top" style={{ borderColor: "rgba(59,130,246,0.45)", color: "#60a5fa" }}>
      <FaDesktop size={13} />
    </div>
    <span className="msa-eco-label msa-eco-label-top">Développement Web</span>

    <div className="msa-eco-node msa-eco-right" style={{ borderColor: "rgba(168,85,247,0.45)", color: "#d8b4fe" }}>
      <FaRobot size={13} />
    </div>
    <span className="msa-eco-label msa-eco-label-right">Intelligence Artificielle</span>

    <div className="msa-eco-node msa-eco-bottom" style={{ borderColor: "rgba(16,185,129,0.45)", color: "#34d399" }}>
      <FaBolt size={13} />
    </div>
    <span className="msa-eco-label msa-eco-label-bottom">Automatisation</span>

    <div className="msa-eco-node msa-eco-left" style={{ borderColor: "rgba(251,146,60,0.45)", color: "#fdba74" }}>
      <FaGraduationCap size={13} />
    </div>
    <span className="msa-eco-label msa-eco-label-left">Formation</span>

    <style jsx>{`
      .msa-card.msa-eco {
        width: 100%;
        max-width: 320px;
        height: 280px;
        margin: 0 auto;
        background: #0a0a0c;
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 16px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      }
      .msa-eco-svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 280px;
        height: 280px;
        z-index: 1;
      }
      .msa-eco-node {
        position: absolute;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #111827;
        border: 1px solid transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        box-shadow: 0 0 12px rgba(59, 130, 246, 0.18);
      }
      /* Positions calc: centre du card = (50%, 50%), orbit r=78 (en stage 280)
         → top node y = 50% - 78px = -78 from center. En translate: -78px sur Y */
      .msa-eco-top {
        top: 50%;
        left: 50%;
        transform: translate(-50%, calc(-50% - 78px));
      }
      .msa-eco-right {
        top: 50%;
        left: 50%;
        transform: translate(calc(-50% + 78px), -50%);
      }
      .msa-eco-bottom {
        top: 50%;
        left: 50%;
        transform: translate(-50%, calc(-50% + 78px));
      }
      .msa-eco-left {
        top: 50%;
        left: 50%;
        transform: translate(calc(-50% - 78px), -50%);
      }
      .msa-eco-label {
        position: absolute;
        font-size: 10px;
        font-weight: 700;
        color: var(--text-light);
        font-family: var(--font-heading);
        line-height: 1.15;
        z-index: 2;
        pointer-events: none;
      }
      /* Top label : au-dessus du top node */
      .msa-eco-label-top {
        top: 50%;
        left: 50%;
        transform: translate(-50%, calc(-50% - 112px));
        text-align: center;
        white-space: nowrap;
      }
      /* Bottom label : en-dessous du bottom node */
      .msa-eco-label-bottom {
        top: 50%;
        left: 50%;
        transform: translate(-50%, calc(-50% + 100px));
        text-align: center;
        white-space: nowrap;
      }
      /* Right label : à droite du right node, max-width pour éviter overflow */
      .msa-eco-label-right {
        top: 50%;
        left: 50%;
        transform: translate(calc(-50% + 100px), -50%);
        text-align: left;
        max-width: 60px;
        white-space: normal;
      }
      /* Left label : à gauche du left node */
      .msa-eco-label-left {
        top: 50%;
        left: 50%;
        transform: translate(calc(-50% - 100px - 56px), -50%);
        text-align: right;
        max-width: 56px;
        white-space: normal;
      }
    `}</style>
  </div>
);
