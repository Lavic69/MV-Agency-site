"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BlogPost {
  num: string;
  tag: string;
  tagColor: string;
  title: string;
  date: string;
  slug: string;
  readTime: string;
}

const posts: BlogPost[] = [
  {
    num: "01",
    tag: "Méthode",
    tagColor: "#2563EB",
    title: "Notre méthode J0–J30 : comment on accueille un nouveau client",
    date: "Mai 2025",
    slug: "/blog",
    readTime: "6 min",
  },
  {
    num: "02",
    tag: "Web",
    tagColor: "#10b981",
    title: "Pourquoi votre site ne convertit pas (et comment y remédier)",
    date: "Avr. 2025",
    slug: "/blog",
    readTime: "5 min",
  },
  {
    num: "03",
    tag: "IA",
    tagColor: "#f97316",
    title: "L'IA en 2025 : ce qu'on observe vraiment chez nos clients TPE/PME",
    date: "Avr. 2025",
    slug: "/blog",
    readTime: "7 min",
  },
  {
    num: "04",
    tag: "Automatisation",
    tagColor: "#8b5cf6",
    title: "5 tâches répétitives à déléguer à une machine dès maintenant",
    date: "Mar. 2025",
    slug: "/blog",
    readTime: "4 min",
  },
];

function BlogRow({ post, index }: { post: BlogPost; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={post.slug}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(1rem, 3vw, 2rem)",
          padding: "1.6rem 1.2rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "10px",
          cursor: "pointer",
          transition: "background 0.25s ease",
          background: hovered
            ? "rgba(37,99,235,0.06)"
            : "transparent",
          position: "relative",
        }}
      >
        {/* Number */}
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            fontWeight: 800,
            color: hovered ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.08)",
            lineHeight: 1,
            minWidth: "3rem",
            transition: "color 0.25s ease",
            letterSpacing: "-0.03em",
            flexShrink: 0,
          }}
        >
          {post.num}
        </span>

        {/* Tag */}
        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "4px 10px",
            borderRadius: "999px",
            background: `${post.tagColor}22`,
            color: post.tagColor,
            border: `1px solid ${post.tagColor}44`,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {post.tag}
        </span>

        {/* Title */}
        <span
          style={{
            flex: 1,
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            background: hovered
              ? "linear-gradient(90deg, #fff 0%, #60a5fa 100%)"
              : "none",
            WebkitBackgroundClip: hovered ? "text" : "unset",
            WebkitTextFillColor: hovered ? "transparent" : "var(--text-light)",
            backgroundClip: hovered ? "text" : "unset",
            color: hovered ? "transparent" : "var(--text-light)",
            transition: "color 0.25s ease",
          }}
        >
          {post.title}
        </span>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.2rem",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.25)",
              fontSize: "0.8rem",
              whiteSpace: "nowrap",
            }}
          >
            {post.readTime}
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "0.8rem",
              whiteSpace: "nowrap",
            }}
          >
            {post.date}
          </span>
          <ArrowRight
            size={16}
            style={{
              color: hovered ? "#60a5fa" : "rgba(255,255,255,0.2)",
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              transition: "transform 0.25s ease, color 0.25s ease",
            }}
          />
        </div>
      </div>
    </Link>
  );
}

export function BlogPreview() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }}>
      {posts.map((post, i) => (
        <BlogRow key={i} post={post} index={i} />
      ))}

      {/* Last separator */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />

      {/* CTA */}
      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <Link
          href="/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#60a5fa",
            fontSize: "0.95rem",
            fontWeight: 600,
            textDecoration: "none",
            letterSpacing: "0.01em",
            transition: "gap 0.2s ease",
          }}
        >
          Lire tous nos articles
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
