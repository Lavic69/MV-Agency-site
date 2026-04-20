"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

  // Si c'est une string simple, on l'anime mot par mot (Effet premium "SplitText")
  if (typeof children === "string") {
    const words = children.split(" ");
    return (
      <span ref={ref} style={{ display: inline ? "inline-flex" : "flex", flexWrap: "wrap", columnGap: "0.22em", rowGap: "0em", justifyContent: justify, verticalAlign: inline ? "bottom" : "baseline" }}>
        {words.map((word, i) => (
          <span key={i} style={{ overflow: "hidden", display: "inline-block", paddingBottom: "0.15em", marginBottom: "-0.15em" }}>
            <motion.span
              initial={{ y: "150%", opacity: 0, filter: "blur(12px)" }}
              animate={isInView ? { y: 0, opacity: 1, filter: "blur(0px)" } : { y: "150%", opacity: 0, filter: "blur(12px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.15 }}
              style={{ display: "inline-block", transformOrigin: "top" }}
              className={wordClassName}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    );
  }

  // Fallback pour les éléments JSX complexes
  return (
    <span ref={ref} style={{ overflow: "hidden", display: inline ? "inline-block" : "block", paddingBottom: "0.15em", marginBottom: "-0.15em", verticalAlign: inline ? "bottom" : "baseline" }}>
      <motion.span
        initial={{ y: "150%", opacity: 0, filter: "blur(12px)" }}
        animate={isInView ? { y: 0, opacity: 1, filter: "blur(0px)" } : { y: "150%", opacity: 0, filter: "blur(12px)" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
        style={{ display: inline ? "inline-block" : "block", transformOrigin: "top" }}
      >
        {children}
      </motion.span>
    </span>
  );
};
