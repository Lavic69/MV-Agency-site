"use client";
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
  link?: string;
}
export interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}
export interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}
export interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) => {
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(() => testimonials[activeIndex], [activeIndex, testimonials]);

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 20000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, testimonialsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const offset = (index - activeIndex + testimonialsLength) % testimonialsLength;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;
    
    if (isActive) {
      return {
        zIndex: 3, opacity: 1, pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "transform 0.8s cubic-bezier(.4,2,.3,1), opacity 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2, opacity: 1, pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "transform 0.8s cubic-bezier(.4,2,.3,1), opacity 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2, opacity: 1, pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "transform 0.8s cubic-bezier(.4,2,.3,1), opacity 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1, opacity: 0, pointerEvents: "none",
      transform: `translateX(0px) translateY(0px) scale(0.7) rotateY(0deg)`,
      transition: "transform 0.8s cubic-bezier(.4,2,.3,1), opacity 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="testimonial-container">
      <div className="testimonial-grid">
        <div className="image-container" ref={imageContainerRef}>
          {testimonials.map((testimonial, index) => (
            <img
              key={testimonial.src}
              src={testimonial.src}
              alt={testimonial.name}
              className="testimonial-image"
              data-index={index}
              style={getImageStyle(index)}
            />
          ))}
        </div>
        <div className="testimonial-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 className="name" style={{ color: colorName, fontSize: fontSizeName }}>
                {activeTestimonial.name}
              </h3>
              <p className="designation" style={{ color: colorDesignation, fontSize: fontSizeDesignation }}>
                {activeTestimonial.designation}
              </p>
              <motion.p className="quote" style={{ color: colorTestimony, fontSize: fontSizeQuote }}>
                {activeTestimonial.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut", delay: 0.025 * i }}
                    style={{ display: "inline-block", marginRight: "4px" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1.5rem' }}>
            <AnimatePresence mode="wait">
              {activeTestimonial.link ? (
                <motion.div
                  key={activeIndex + "-link"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <a 
                    href={activeTestimonial.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                    tabIndex={-1}
                  >
                    <Button variant="outline" style={{ padding: '0.6rem 1.75rem', fontSize: '0.95rem' }}>
                      Voir le projet
                    </Button>
                  </a>
                </motion.div>
              ) : <div key="placeholder" />}
            </AnimatePresence>

            <div className="arrow-buttons" style={{ display: 'flex', gap: '0.5rem', margin: 0, padding: 0 }}>
              <button
                className="arrow-button prev-button"
                onClick={handlePrev}
                onMouseEnter={() => setHoverPrev(true)}
                onMouseLeave={() => setHoverPrev(false)}
                aria-label="Previous project"
                style={{ background: 'transparent', padding: '10px' }}
              >
                <ChevronLeft size={42} color={hoverPrev ? '#ffffff' : 'rgba(255,255,255,0.4)'} strokeWidth={1} style={{ transition: 'color 0.3s ease' }} />
              </button>
              <button
                className="arrow-button next-button"
                onClick={handleNext}
                onMouseEnter={() => setHoverNext(true)}
                onMouseLeave={() => setHoverNext(false)}
                aria-label="Next project"
                style={{ background: 'transparent', padding: '10px' }}
              >
                <ChevronRight size={42} color={hoverNext ? '#ffffff' : 'rgba(255,255,255,0.4)'} strokeWidth={1} style={{ transition: 'color 0.3s ease' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .testimonial-container {
          width: 100%;
          max-width: 56rem;
          padding: 2rem;
          margin: 0 auto;
        }
        .testimonial-grid {
          display: grid;
          gap: 5rem;
        }
        .image-container {
          position: relative;
          width: 100%;
          height: 24rem;
          perspective: 1000px;
        }
        .testimonial-image {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          /* Permet de faire redescendre lentement quand on arrête le survol */
          transition: object-position 2s ease-out !important;
        }
        .testimonial-image:hover {
          /* Descend tout en bas de la pleine page Screenshot quand on survole */
          object-position: bottom;
          /* Descend plus doucement (5s) pour simuler un scroll naturel */
          transition: object-position 5s ease-in-out !important;
        }
        .testimonial-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .name {
          font-weight: bold;
          margin-bottom: 0.25rem;
        }
        .designation {
          margin-bottom: 2rem;
        }
        .quote {
          line-height: 1.75;
        }
        .arrow-buttons {
          display: flex;
          gap: 0.5rem;
          padding-top: 3.5rem;
          margin-left: -10px; /* Align arrows visually with the text edge */
        }
        .arrow-button {
          width: auto;
          height: auto;
          border-radius: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: transparent;
          border: none;
        }
        @media (min-width: 768px) {
          .testimonial-grid {
            grid-template-columns: 1fr 1fr;
          }
          .arrow-buttons {
            padding-top: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CircularTestimonials;
