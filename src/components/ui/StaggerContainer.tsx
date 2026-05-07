"use client";
import React from "react";
import { motion, cubicBezier, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.21, 0.47, 0.32, 0.98),
    },
  },
};

type DivProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export const StaggerContainer = ({ children, className = "", style }: DivProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "", style }: DivProps) => {
  return (
    <motion.div variants={itemVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
};
