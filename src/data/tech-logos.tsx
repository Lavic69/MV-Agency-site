import {
  SiNextdotjs,
  SiReact,
  SiVercel,
  SiFigma,
  SiFramer,
  SiWebflow,
  SiWordpress,
  SiStripe,
  SiOdoo,
  SiNotion,
  SiOpenai,
  SiAnthropic,
} from "react-icons/si";
import type { ReactNode } from "react";

export type TechLogo = { node: ReactNode; title: string };

/**
 * Logos tech utilisés dans <LogoLoop> sur les pages géo (france, belgique,
 * bruxelles, la-reunion). Couleurs en hex literal volontaire — ce sont les
 * couleurs officielles de chaque marque, pas du design system MV.
 */
export const techLogos: TechLogo[] = [
  { node: <SiNextdotjs size={40} color="var(--text-light)" />, title: "Next.js" },
  { node: <SiReact size={40} color="#61DAFB" />, title: "React" },
  { node: <SiAnthropic size={40} color="#d97757" />, title: "Claude AI" },
  { node: <SiOpenai size={40} color="var(--text-light)" />, title: "ChatGPT" },
  { node: <SiNotion size={40} color="var(--text-light)" />, title: "Notion" },
  { node: <SiVercel size={40} color="var(--text-light)" />, title: "Vercel" },
  { node: <SiStripe size={40} color="#635BFF" />, title: "Stripe" },
  { node: <SiWebflow size={40} color="#4353FF" />, title: "Webflow" },
  { node: <SiWordpress size={40} color="#21759b" />, title: "WordPress" },
  { node: <SiFramer size={40} color="#0055FF" />, title: "Framer" },
  { node: <SiOdoo size={55} color="#714B67" />, title: "Odoo" },
  { node: <SiFigma size={40} color="var(--text-light)" />, title: "Figma" },
  // eslint-disable-next-line @next/next/no-img-element
  { node: <img src="https://svgl.app/library/n8n.svg" style={{ height: 35, width: "auto" }} alt="n8n" />, title: "n8n" },
];
