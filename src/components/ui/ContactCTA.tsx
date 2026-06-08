"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";
import { trackEvent, EVENTS, type CtaLocation } from "@/lib/analytics";

type ContactCTAProps = {
  /** Position du CTA sur la page (la page vient de usePathname). */
  location: CtaLocation;
  /**
   * Destination — /contact par défaut. Si le lien pointe ailleurs, fournir
   * `onTrack` pour éviter d'émettre `contact_cta_clicked` à tort.
   */
  href?: string;
  variant?: "primary" | "outline" | "magic";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  /** Style appliqué au Button. */
  style?: React.CSSProperties;
  /** Style appliqué au Link wrapper (textDecoration:'none' déjà inclus). */
  wrapperStyle?: React.CSSProperties;
  /** className appliqué au Button interne (pas au Link wrapper). Pour le layout de l'élément externe, utiliser `wrapperStyle`. */
  className?: string;
  /** Action additionnelle au clic (ex: fermer le menu mobile). */
  onClick?: () => void;
  /**
   * Remplace l'event par défaut (contact_cta_clicked). Utilisé par les CTA
   * packs qui émettent pack_selected à la place.
   */
  onTrack?: () => void;
};

export function ContactCTA({
  location,
  href = "/contact",
  variant = "primary",
  size = "md",
  children,
  style,
  wrapperStyle,
  className,
  onClick,
  onTrack,
}: ContactCTAProps) {
  const pathname = usePathname();

  const handleClick = () => {
    if (onTrack) {
      onTrack();
    } else {
      trackEvent(EVENTS.CONTACT_CTA_CLICKED, { location, page: pathname });
    }
    onClick?.();
  };

  return (
    <Link
      href={href}
      tabIndex={-1}
      onClick={handleClick}
      style={{ textDecoration: "none", ...wrapperStyle }}
    >
      <Button variant={variant} size={size} style={style} className={className}>
        {children}
      </Button>
    </Link>
  );
}
