"use client";

import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  decimals = 0, 
  prefix = "", 
  suffix = "" 
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 70,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest: number) => {
      if (ref.current) {
        // Remplacement du point décimal par une virgule pour la locale française
        const formatted = latest.toFixed(decimals).replace('.', ',');
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
    
    return () => unsubscribe();
  }, [springValue, prefix, suffix, decimals]);

  // Valeur initiale statique pour éviter les soucis d'hydratation (SSR = 0)
  return <span ref={ref}>{prefix}{(0).toFixed(decimals).replace('.', ',')}{suffix}</span>;
};
