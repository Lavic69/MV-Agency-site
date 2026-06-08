"use client";

import React from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type EventProps = Record<string, string | number | boolean | null | undefined>;

type TrackedLinkProps = {
  href: string;
  /** Nom de l'event (utiliser EVENTS.*). */
  event: string;
  eventProps?: EventProps;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Action additionnelle au clic. */
  onClick?: () => void;
} & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick" | "style" | "className"
>;

/**
 * Lien (interne, mailto, tel ou externe) qui émet un event au clic.
 * Permet d'instrumenter un lien rendu dans une page Server Component sans la
 * convertir en client : seul ce composant est "use client".
 */
export function TrackedLink({
  href,
  event,
  eventProps,
  children,
  className,
  style,
  onClick,
  ...rest
}: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent(event, eventProps);
    onClick?.();
  };

  const isInternal = href.startsWith("/");

  if (isInternal) {
    return (
      <Link href={href} className={className} style={style} onClick={handleClick} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} style={style} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
