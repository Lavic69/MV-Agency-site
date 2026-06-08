"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";
import { trackEvent, EVENTS, type CtaLocation } from "@/lib/analytics";

type EventProps = Record<string, string | number | boolean | null | undefined>;

type ContactCTAProps = {
  /** Position du CTA sur la page (la page vient de usePathname). */
  location: CtaLocation;
  /**
   * Destination — /contact par défaut. Si le lien pointe ailleurs, fournir
   * `eventName` pour éviter d'émettre `contact_cta_clicked` à tort.
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
  /** Action additionnelle au clic (ex: fermer le menu mobile). Réservé aux appelants client. */
  onClick?: () => void;
  /**
   * Remplace l'event par défaut (contact_cta_clicked) par `eventName`+`eventProps`.
   * Props sérialisables → utilisable depuis un Server Component (ex: les CTA
   * packs de /offres qui émettent `pack_selected`).
   */
  eventName?: string;
  eventProps?: EventProps;
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
  eventName,
  eventProps,
}: ContactCTAProps) {
  const pathname = usePathname();

  const handleClick = () => {
    if (eventName) {
      trackEvent(eventName, eventProps);
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
