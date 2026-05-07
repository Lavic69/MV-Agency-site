"use client";
import React from "react";
import {
  LayoutDashboard,
  TrendingUp,
  Link2,
  Gift,
  FolderOpen,
  Receipt,
  UserCircle,
  Download,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { icon: <LayoutDashboard size={15} />, label: "Dashboard", active: true },
  { icon: <TrendingUp size={15} />, label: "Avancement du projet" },
  { icon: <Link2 size={15} />, label: "Connexions" },
  { icon: <Gift size={15} />, label: "Welcome Pack" },
  { icon: <FolderOpen size={15} />, label: "Ressources" },
  { icon: <Receipt size={15} />, label: "Factures" },
];

const invoices = [
  { label: "Pack Starter — Site Web", amount: "1 200 €", status: "Payée" },
  { label: "Module IA Chatbot", amount: "800 €", status: "Payée" },
  { label: "Formation & Autonomie", amount: "350 €", status: "En cours" },
];

export function MockupHub() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "560px",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(37,99,235,0.15)",
        display: "flex",
        fontFamily: "var(--font-body), Inter, sans-serif",
        fontSize: "13px",
        userSelect: "none",
      }}
    >
      {/* ── SIDEBAR ── */}
      <div
        style={{
          width: "180px",
          flexShrink: 0,
          background: "linear-gradient(160deg, #1a2d52 0%, #0f1c36 100%)",
          display: "flex",
          flexDirection: "column",
          padding: "20px 0",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "0 16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "6px",
              background: "#2563EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "12px",
              color: "#fff",
              letterSpacing: "-0.5px",
            }}
          >
            MV
          </div>
          <span
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "-0.3px",
            }}
          >
            MV Hub
          </span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 8px" }}>
          {navItems.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                padding: "8px 10px",
                borderRadius: "8px",
                marginBottom: "2px",
                background: item.active
                  ? "rgba(37,99,235,0.25)"
                  : "transparent",
                color: item.active
                  ? "#93c5fd"
                  : "rgba(255,255,255,0.5)",
                cursor: "default",
                transition: "all 0.2s",
              }}
            >
              {item.icon}
              <span style={{ fontSize: "12px", fontWeight: item.active ? 600 : 400 }}>
                {item.label}
              </span>
            </div>
          ))}
        </nav>

        {/* Account */}
        <div
          style={{
            margin: "0 8px",
            padding: "10px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <UserCircle size={16} color="#fff" />
          </div>
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: "11px",
                whiteSpace: "nowrap",
              }}
            >
              Jean Dupont
            </div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px" }}>
              Client
            </div>
          </div>
        </div>
      </div>

      {/* ── DASHBOARD ── */}
      <div
        style={{
          flex: 1,
          background: "#07090f",
          padding: "20px 18px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          minWidth: 0,
        }}
      >
        {/* Header */}
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: "16px", letterSpacing: "-0.3px" }}>
            Bienvenue, Jean 👋
          </div>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", marginTop: "2px" }}>
            Tableau de bord — Projet en cours
          </div>
        </div>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>

          {/* Card 1 — Progress */}
          <div style={cardStyle}>
            <div style={cardLabelStyle}>Avancement du projet</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px", margin: "8px 0 6px" }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: "22px" }}>68</span>
              <span style={{ color: "#60a5fa", fontWeight: 700, fontSize: "14px" }}>%</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: "99px", height: "5px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: "68%",
                  borderRadius: "99px",
                  background: "linear-gradient(90deg, #2563eb, #60a5fa)",
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px" }}>Phase : Développement</span>
              <span style={{ color: "#60a5fa", fontSize: "10px", fontWeight: 600 }}>J+15</span>
            </div>
          </div>

          {/* Card 2 — Connexions */}
          <div style={cardStyle}>
            <div style={cardLabelStyle}>Connexions requises</div>
            <div style={{ display: "flex", gap: "6px", marginTop: "10px", flexWrap: "wrap" }}>
              {[
                { name: "Analytics", color: "#f97316", letter: "GA" },
                { name: "Stripe", color: "#635bff", letter: "St" },
                { name: "Notion", color: "#fff", letter: "N" },
              ].map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "6px",
                    padding: "4px 7px",
                  }}
                >
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "3px",
                      background: c.color === "#fff" ? "#222" : c.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "7px",
                      fontWeight: 800,
                      color: "#fff",
                    }}
                  >
                    {c.letter}
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "10px" }}>{c.name}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f97316" }} />
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px" }}>2 en attente</span>
            </div>
          </div>

          {/* Card 3 — Factures */}
          <div style={cardStyle}>
            <div style={cardLabelStyle}>Factures récentes</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
              {invoices.map((inv, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {inv.label}
                  </span>
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 600,
                      padding: "2px 6px",
                      borderRadius: "99px",
                      background: inv.status === "Payée" ? "rgba(16,185,129,0.15)" : "rgba(251,191,36,0.15)",
                      color: inv.status === "Payée" ? "#34d399" : "#fbbf24",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {inv.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4 — Welcome Pack */}
          <div style={{ ...cardStyle, justifyContent: "space-between" }}>
            <div>
              <div style={cardLabelStyle}>Welcome Pack</div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px", marginTop: "4px", lineHeight: 1.5 }}>
                Guide de démarrage, accès &amp; ressources clés
              </div>
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "#2563EB",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "7px 12px",
                fontSize: "11px",
                fontWeight: 600,
                cursor: "default",
                width: "100%",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <Download size={12} />
              Télécharger
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "12px",
  padding: "14px",
  display: "flex",
  flexDirection: "column",
};

const cardLabelStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.45)",
  fontSize: "10px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};
