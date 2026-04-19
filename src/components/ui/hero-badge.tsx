"use client";

import React from 'react';
import { motion, useAnimation, type Variants } from "framer-motion";
import Link from "next/link";

interface HeroBadgeProps {
  href?: string;
  text: React.ReactNode;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const ease = [0.16, 1, 0.3, 1];

const iconAnimationVariants: Variants = {
  initial: { rotate: 0 },
  hover: { rotate: -15, scale: 1.1 },
};

export default function HeroBadge({
  href,
  text,
  icon,
  endIcon,
  className = '',
  style = {},
  onClick,
}: HeroBadgeProps) {
  const controls = useAnimation();

  const BadgeWrapper = href ? Link : motion.button;
  const wrapperProps = href ? { href } : { onClick };

  return (
    // @ts-ignore
    <BadgeWrapper
      {...wrapperProps}
      className={`${href || onClick ? "cursor-pointer" : ""} ${className}`}
      style={{ display: 'inline-block', textDecoration: 'none', border: 'none', background: 'none', padding: 0, ...style }}
    >
      <motion.div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 16px',
          borderRadius: '999px',
          border: '1px solid rgba(96, 165, 250, 0.3)',
          backgroundColor: 'rgba(96, 165, 250, 0.08)',
          fontSize: '0.85rem',
          color: 'var(--text-light)',
          fontFamily: 'var(--font-body)',
          transition: 'all 0.3s ease',
          boxShadow: '0 0 15px rgba(96, 165, 250, 0.15)'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        onHoverStart={() => controls.start("hover")}
        onHoverEnd={() => controls.start("initial")}
        whileHover={{
          borderColor: 'rgba(96, 165, 250, 0.6)',
          backgroundColor: 'rgba(96, 165, 250, 0.2)',
          boxShadow: '0 0 25px rgba(96, 165, 250, 0.3)'
        }}
      >
        {icon && (
          <motion.div
            style={{ color: '#60A5FA', display: 'flex', alignItems: 'center' }}
            variants={iconAnimationVariants}
            initial="initial"
            animate={controls}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {icon}
          </motion.div>
        )}
        <span style={{ fontWeight: '500' }}>{text}</span>
        {endIcon && (
          <motion.div style={{ color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center' }}>
            {endIcon}
          </motion.div>
        )}
      </motion.div>
    </BadgeWrapper>
  );
}
