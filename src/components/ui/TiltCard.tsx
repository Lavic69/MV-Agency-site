"use client";
import React, { useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  maxTilt?: number;
}

export function TiltCard({ children, style, maxTilt = 12 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = -(y - 0.5) * maxTilt;
    const rotateY = (x - 0.5) * maxTilt;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    el.style.transition = "transform 0.08s ease-out";
    el.style.boxShadow = "0 20px 50px rgba(0,0,0,0.4)";
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    el.style.transition = "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)";
    el.style.boxShadow = "none";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
