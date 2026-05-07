"use client";
import React, { useEffect, useRef } from "react";

export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

// Injecte le keyframe CSS une seule fois dans le <head>
let keyframeInjected = false;
function injectKeyframe() {
  if (keyframeInjected || typeof document === "undefined") return;
  keyframeInjected = true;
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes scrollUp {
      0%   { transform: translateY(0); }
      100% { transform: translateY(-33.333%); }
    }
    .testimonials-track {
      animation: scrollUp var(--scroll-duration, 18s) linear infinite;
      will-change: transform;
    }
    .testimonials-track:hover {
      animation-play-state: paused;
    }
  `;
  document.head.appendChild(style);
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    injectKeyframe();
  }, []);

  // On triplique pour que le scroll soit totalement invisible au reset
  const tripled = [...props.testimonials, ...props.testimonials, ...props.testimonials];
  const durationSeconds = props.duration ?? 18;

  return (
    <div
      className={props.className}
      style={{ width: "100%", maxWidth: "320px", display: "flex", overflow: "hidden" }}
    >
      <div
        ref={trackRef}
        className="testimonials-track"
        style={
          {
            "--scroll-duration": `${durationSeconds}s`,
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            paddingBottom: "1.5rem",
            width: "100%",
          } as React.CSSProperties
        }
      >
        {tripled.map(({ text, image, name, role }, i) => (
          <div
            key={i}
            style={{
              padding: "2rem",
              borderRadius: "1.5rem",
              border: "1px solid rgba(255,255,255,0.05)",
              backgroundColor: "#0A0A0A",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.5)",
              width: "100%",
              flexShrink: 0,
            }}
          >
            <div style={{ color: "var(--text-light)", lineHeight: 1.6, fontSize: "0.95rem" }}>
              &ldquo;{text}&rdquo;
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1.5rem" }}>
              <img
                width={40}
                height={40}
                src={image}
                alt={name}
                style={{ height: "40px", width: "40px", borderRadius: "50%", objectFit: "cover" }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.25,
                    color: "var(--text-light)",
                    fontSize: "1rem",
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    lineHeight: 1.25,
                    opacity: 0.6,
                    letterSpacing: "-0.01em",
                    fontSize: "0.85rem",
                    color: "var(--accent)",
                    marginTop: "0.25rem",
                  }}
                >
                  {role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
