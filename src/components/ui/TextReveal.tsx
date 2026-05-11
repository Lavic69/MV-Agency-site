"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  inline?: boolean;
  wordClassName?: string;
  justify?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({ children, delay = 0, inline = false, wordClassName = "", justify = "center" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();

  const initial = prefersReducedMotion ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" };
  const animate = prefersReducedMotion
    ? { opacity: 1, filter: "blur(0px)" }
    : isInView
    ? { opacity: 1, filter: "blur(0px)" }
    : { opacity: 0, filter: "blur(10px)" };

  if (typeof children === "string") {
    const words = children.split(" ");
    return (
      <span ref={ref} style={{ display: inline ? "inline-flex" : "flex", flexWrap: "wrap", columnGap: "0.22em", rowGap: "0em", justifyContent: justify, verticalAlign: inline ? "bottom" : "baseline" }}>
        {words.map((word, i) => (
          <span key={i} style={{ display: "inline-block" }}>
            <motion.span
              initial={initial}
              animate={animate}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: prefersReducedMotion ? 0 : delay + i * 0.08 }}
              style={{ display: "inline-block" }}
              className={wordClassName}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    );
  }

  return (
    <span ref={ref} style={{ display: inline ? "inline-block" : "block", verticalAlign: inline ? "bottom" : "baseline" }}>
      <motion.span
        initial={initial}
        animate={animate}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: prefersReducedMotion ? 0 : delay }}
        style={{ display: inline ? "inline-block" : "block" }}
      >
        {children}
      </motion.span>
    </span>
  );
};
