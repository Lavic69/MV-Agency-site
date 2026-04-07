"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}

export const FadeIn = ({ children, delay = 0, direction = "up", className = "" }: FadeInProps) => {
  const y = direction === "up" ? 50 : 0;
  const x = direction === "left" ? 50 : direction === "right" ? -50 : 0;
  
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
};
