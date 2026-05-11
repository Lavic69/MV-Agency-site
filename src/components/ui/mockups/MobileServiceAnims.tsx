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
import { Bot, Sparkles, MousePointer2 } from "lucide-react";

/* ============================================================
   1. CRÉATION WEB — drag & drop d'éléments dans un canvas browser
   Animation : un block coloré est "dragged" depuis l'extérieur du canvas
   vers une zone cible à l'intérieur, accompagné d'un cursor pointer.
   Loop infinie.
   ============================================================ */
export const MobileWebAnim = () => (
  <div className="msa-card msa-web">
    {/* Browser canvas avec topbar + grid background */}
    <div className="msa-web-canvas">
      <div className="msa-web-topbar">
        <span className="msa-web-dot" style={{ background: "#ff5f56" }} />
        <span className="msa-web-dot" style={{ background: "#ffbd2e" }} />
        <span className="msa-web-dot" style={{ background: "#27c93f" }} />
      </div>
      <div className="msa-web-stage">
        {/* Zone cible : pointillé where the block will drop */}
        <div className="msa-web-drop-target" />
        {/* Blocks déjà placés (statiques) */}
        <div className="msa-web-placed msa-web-placed-1" />
        <div className="msa-web-placed msa-web-placed-2" />
        {/* Block animé : drag depuis l'extérieur droit vers la drop target */}
        <div className="msa-web-drag-block" />
        {/* Cursor qui suit le block */}
        <div className="msa-web-cursor">
          <MousePointer2 size={14} fill="white" stroke="#000" />
        </div>
      </div>
    </div>
    <style jsx>{`
      .msa-card {
        width: 100%;
        max-width: 320px;
        height: 140px;
      }
      .msa-web-canvas {
        width: 100%;
        height: 100%;
        background: #15151a;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        display: flex;
        flex-direction: column;
      }
      .msa-web-topbar {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 7px 10px;
        background: rgba(0, 0, 0, 0.5);
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        flex-shrink: 0;
      }
      .msa-web-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
      }
      .msa-web-stage {
        position: relative;
        flex: 1;
        padding: 10px;
        background-image:
          linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
        background-size: 14px 14px;
      }
      /* Block déjà placé en haut */
      .msa-web-placed-1 {
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        height: 14px;
        background: linear-gradient(90deg, #2563eb, #60a5fa);
        border-radius: 4px;
      }
      /* Block déjà placé en bas gauche */
      .msa-web-placed-2 {
        position: absolute;
        bottom: 10px;
        left: 10px;
        width: 80px;
        height: 22px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 4px;
      }
      /* Drop target : zone pointillée où le block va se déposer */
      .msa-web-drop-target {
        position: absolute;
        bottom: 10px;
        right: 10px;
        width: 90px;
        height: 22px;
        border: 1.5px dashed rgba(96, 165, 250, 0.35);
        border-radius: 4px;
        animation: msa-web-target 3s ease-in-out infinite;
      }
      @keyframes msa-web-target {
        0%, 50%, 100% { border-color: rgba(96, 165, 250, 0.35); background: transparent; }
        60%, 75% { border-color: rgba(96, 165, 250, 0.7); background: rgba(96, 165, 250, 0.08); }
      }
      /* Block en cours de drag : part de l'extérieur droit, va dans drop target */
      .msa-web-drag-block {
        position: absolute;
        bottom: 10px;
        width: 90px;
        height: 22px;
        background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%);
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.45);
        animation: msa-web-drag 3s ease-in-out infinite;
      }
      @keyframes msa-web-drag {
        0% {
          right: -100px;
          opacity: 0;
          transform: scale(0.9) rotate(-2deg);
        }
        15% {
          right: 60px;
          opacity: 1;
          transform: scale(1.05) rotate(-2deg);
        }
        50%, 75% {
          right: 10px;
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        90%, 100% {
          right: 10px;
          opacity: 0.5;
          transform: scale(1) rotate(0deg);
        }
      }
      /* Cursor qui suit le block en mouvement */
      .msa-web-cursor {
        position: absolute;
        bottom: 18px;
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3;
        animation: msa-web-cursor 3s ease-in-out infinite;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6));
      }
      @keyframes msa-web-cursor {
        0% { right: -80px; opacity: 0; }
        15% { right: 70px; opacity: 1; }
        50%, 75% { right: 16px; opacity: 1; }
        90% { right: 16px; opacity: 1; }
        100% { right: -80px; opacity: 0; }
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
          <span className="msa-wf-label">Webhook</span>
        </div>
      </div>
      <div className="msa-wf-connector msa-wf-connector-1" />
      <div className="msa-wf-cell">
        <div className="msa-wf-node msa-wf-node-ai" style={{ background: "#2563eb" }}>
          <FaBrain size={16} color="#fff" />
          <span className="msa-wf-label">OpenAI</span>
        </div>
      </div>
      <div className="msa-wf-connector msa-wf-connector-2" />
      <div className="msa-wf-cell">
        <div className="msa-wf-node" style={{ background: "#22c55e" }}>
          <FaEnvelope size={16} color="#fff" />
          <span className="msa-wf-label">Email</span>
        </div>
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
        position: relative;
        width: 38px;     /* explicite = largeur de l'icon, pas du label */
        flex-shrink: 0;
      }
      .msa-wf-node {
        position: relative;
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
      /* Label en position: absolute pour qu'il ne pousse pas la cell wider que l'icon
         → garantit que le connector flex:1 connecte exactement icon-to-icon */
      .msa-wf-label {
        position: absolute;
        top: calc(100% + 6px);
        left: 50%;
        transform: translateX(-50%);
        font-size: 9px;
        color: rgba(255, 255, 255, 0.55);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        white-space: nowrap;
      }
      /* Connecteur dashed CSS — auto-ajusté à la largeur disponible via flex:1.
         repeating-linear-gradient construit le dashed pattern ; background-position
         anime via keyframes pour effet "flux de données". align-self: center
         + cell-height=icon-height = connector parfaitement aligné au milieu de l'icon. */
      .msa-wf-connector {
        flex: 1;
        height: 3px;
        align-self: center;
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
   3. AGENTS IA — génération de texte progressive
   Chat bubble avec réponse de l'IA qui se révèle caractère par caractère
   via clip-path (compatible variable-width fonts) + cursor "|" qui clignote
   ============================================================ */
export const MobileIAAnim = () => (
  <div className="msa-card msa-ia">
    <div className="msa-ia-header">
      <div className="msa-ia-icon">
        <Bot size={14} />
      </div>
      <span className="msa-ia-name">Agent IA</span>
      <Sparkles size={12} className="msa-ia-sparkle" />
    </div>
    {/* Question utilisateur (statique) */}
    <div className="msa-ia-user-msg">
      <span>Rédige un titre SEO</span>
    </div>
    {/* Réponse IA générée progressivement */}
    <div className="msa-ia-bot-msg">
      <div className="msa-ia-typewriter">
        <span className="msa-ia-text">Boostez votre SEO grâce à l&apos;IA générative</span>
        <span className="msa-ia-cursor">|</span>
      </div>
    </div>
    <style jsx>{`
      .msa-card {
        width: 100%;
        max-width: 320px;
        height: 140px;
        background: linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(10,10,10,0.95) 100%);
        border: 1px solid rgba(167, 139, 250, 0.2);
        border-radius: 10px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
      }
      .msa-ia-header {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .msa-ia-icon {
        width: 22px;
        height: 22px;
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
        font-weight: 700;
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
      /* Message utilisateur (bulle alignée droite) */
      .msa-ia-user-msg {
        align-self: flex-end;
        background: rgba(96, 165, 250, 0.15);
        border: 1px solid rgba(96, 165, 250, 0.25);
        border-radius: 10px 10px 0 10px;
        padding: 5px 9px;
        max-width: 70%;
      }
      .msa-ia-user-msg span {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.9);
        line-height: 1.3;
      }
      /* Réponse IA (bulle gauche) */
      .msa-ia-bot-msg {
        align-self: flex-start;
        background: rgba(167, 139, 250, 0.1);
        border-left: 2px solid #a78bfa;
        border-radius: 0 8px 8px 8px;
        padding: 6px 9px;
        max-width: 90%;
        overflow: hidden;
      }
      .msa-ia-typewriter {
        position: relative;
        font-size: 10.5px;
        line-height: 1.4;
        color: rgba(255, 255, 255, 0.95);
        font-weight: 500;
        display: flex;
        align-items: flex-end;
        white-space: nowrap;
      }
      /* Le texte est révélé progressivement via clip-path : inset clipe par la
         droite, animation de 100% → 0% révèle le texte de gauche à droite */
      .msa-ia-text {
        display: inline-block;
        clip-path: inset(0 100% 0 0);
        animation: msa-ia-type 5s steps(30) infinite;
      }
      @keyframes msa-ia-type {
        0% { clip-path: inset(0 100% 0 0); }
        50%, 75% { clip-path: inset(0 0 0 0); }
        88%, 100% { clip-path: inset(0 100% 0 0); }
      }
      /* Cursor qui clignote, simule la frappe d'un IA en cours de génération */
      .msa-ia-cursor {
        display: inline-block;
        color: #a78bfa;
        font-weight: 700;
        margin-left: 1px;
        animation: msa-ia-blink 0.6s step-end infinite;
      }
      @keyframes msa-ia-blink {
        0%, 50% { opacity: 1; }
        50.01%, 100% { opacity: 0; }
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

    {/* 4 pillar nodes — chaque icon est suivi de son label positionné dessous,
        comme un pair vertical (icon + caption) qui flotte aux 4 cardinaux du
        cercle. Évite les overflows latéraux qu'on avait avec les labels à côté. */}
    <div className="msa-eco-pillar msa-eco-pillar-top">
      <div className="msa-eco-node" style={{ borderColor: "rgba(59,130,246,0.45)", color: "#60a5fa" }}>
        <FaDesktop size={13} />
      </div>
      <span className="msa-eco-label">Dev Web</span>
    </div>

    <div className="msa-eco-pillar msa-eco-pillar-right">
      <div className="msa-eco-node" style={{ borderColor: "rgba(168,85,247,0.45)", color: "#d8b4fe" }}>
        <FaRobot size={13} />
      </div>
      <span className="msa-eco-label">IA</span>
    </div>

    <div className="msa-eco-pillar msa-eco-pillar-bottom">
      <div className="msa-eco-node" style={{ borderColor: "rgba(16,185,129,0.45)", color: "#34d399" }}>
        <FaBolt size={13} />
      </div>
      <span className="msa-eco-label">Automatisation</span>
    </div>

    <div className="msa-eco-pillar msa-eco-pillar-left">
      <div className="msa-eco-node" style={{ borderColor: "rgba(251,146,60,0.45)", color: "#fdba74" }}>
        <FaGraduationCap size={13} />
      </div>
      <span className="msa-eco-label">Formation</span>
    </div>

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
      /* Chaque pillar est un wrapper icon + label en colonne. Positionné
         absolument aux 4 cardinaux du cercle. Le wrapper est centré sur le
         point de l'orbital, ce qui garantit que label et icon restent dans
         le card sans débordement latéral. */
      .msa-eco-pillar {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        z-index: 2;
      }
      .msa-eco-node {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #111827;
        border: 1px solid transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 12px rgba(59, 130, 246, 0.18);
      }
      .msa-eco-label {
        font-size: 9.5px;
        font-weight: 700;
        color: var(--text-light);
        font-family: var(--font-heading);
        line-height: 1.15;
        white-space: nowrap;
        text-align: center;
      }
      /* Top pillar : centré horizontalement, au-dessus du centre du card */
      .msa-eco-pillar-top {
        top: 50%;
        left: 50%;
        transform: translate(-50%, calc(-50% - 78px - 18px));
      }
      /* Bottom pillar : centré horizontalement, en bas */
      .msa-eco-pillar-bottom {
        top: 50%;
        left: 50%;
        transform: translate(-50%, calc(-50% + 78px - 18px));
      }
      /* Right pillar : à droite du cercle, centré verticalement */
      .msa-eco-pillar-right {
        top: 50%;
        left: 50%;
        transform: translate(calc(-50% + 78px), calc(-50% - 18px));
      }
      /* Left pillar : à gauche du cercle, centré verticalement */
      .msa-eco-pillar-left {
        top: 50%;
        left: 50%;
        transform: translate(calc(-50% - 78px), calc(-50% - 18px));
      }
    `}</style>
  </div>
);
