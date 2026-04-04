"use client";
import React from "react";
import { motion } from "framer-motion";

export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className} style={{ width: "100%", maxWidth: "320px", display: "flex" }}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem", paddingBottom: "1.5rem", width: "100%" }}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div 
                  key={i}
                  style={{
                    padding: "2rem",
                    borderRadius: "1.5rem",
                    border: "1px solid rgba(255,255,255,0.05)",
                    backgroundColor: "#0A0A0A",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.5)",
                    width: "100%",
                  }}
                >
                  <div style={{ color: "var(--text-light)", lineHeight: 1.6, fontSize: "0.95rem" }}>"{text}"</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1.5rem" }}>
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      style={{ height: "40px", width: "40px", borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.25, color: "#fff", fontSize: "1rem" }}>{name}</div>
                      <div style={{ lineHeight: 1.25, opacity: 0.6, letterSpacing: "-0.01em", fontSize: "0.85rem", color: "var(--accent)", marginTop: "0.25rem" }}>{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
