"use client"

import React, { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { motion, useAnimation, useInView } from "framer-motion"
import styles from "./AnimatedTestimonials.module.css"

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

export interface AnimatedTestimonialsProps {
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
  autoRotateInterval?: number
  showVerifiedBadge?: boolean
  trustedCompanies?: string[]
  trustedCompaniesTitle?: string
}

export function AnimatedTestimonials({
  title = "Loved by Developers",
  subtitle = "See what others are saying about our premium starter template",
  testimonials = [],
  autoRotateInterval = 6000,
  showVerifiedBadge = true,
  trustedCompanies = [],
  trustedCompaniesTitle = "Trusted by teams at these companies and more",
}: AnimatedTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, autoRotateInterval)

    return () => clearInterval(interval)
  }, [testimonials.length, autoRotateInterval])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className={styles.header}
        >
          <motion.h2 variants={itemVariants} className={styles.title}>
            {title}
          </motion.h2>
          <motion.p variants={itemVariants} className={styles.subtitle}>
            {subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className={styles.contentGrid}
        >
          <motion.div variants={itemVariants} className={styles.cardArea}>
            <div className={styles.quoteIconWrapper}>
              <Quote className={styles.quoteIcon} strokeWidth={1} />
            </div>

            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={styles.card}
                style={{
                  opacity: index === activeIndex ? 1 : 0,
                  transform: index === activeIndex ? "translateX(0)" : "translateX(100px)",
                  pointerEvents: index === activeIndex ? "auto" : "none",
                  transition: "all 0.5s ease"
                }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.userInfo}>
                    <img src={testimonial.avatar} alt={testimonial.name} className={styles.avatar} />
                    <div>
                      <h4 className={styles.userName}>{testimonial.name}</h4>
                      <p className={styles.userRole}>
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <div className={styles.stars}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className={styles.star} />
                    ))}
                  </div>
                </div>

                <div className={styles.separator} />

                <p className={styles.content}>"{testimonial.content}"</p>

                {showVerifiedBadge && (
                  <div className={styles.verified}>Client vérifié</div>
                )}
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className={styles.navigation}>
            <button
              onClick={handlePrev}
              className={styles.navButton}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className={styles.dots}>
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.dot} ${index === activeIndex ? styles.dotActive : styles.dotInactive}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveIndex(index)
                    }
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className={styles.navButton}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </motion.div>

        {trustedCompanies.length > 0 && (
          <motion.div variants={itemVariants} className={styles.logosArea}>
            <h3 className={styles.logosTitle}>{trustedCompaniesTitle}</h3>
            <div className={styles.logosList}>
              {trustedCompanies.map((company) => (
                <div key={company} className={styles.logoItem}>
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
