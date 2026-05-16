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
import Image from "next/image";
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
  { node: <Image src="/tech/woocommerce.svg" width={158} height={32} style={{ height: 32, width: "auto" }} alt="WooCommerce" />, title: "WooCommerce" },
  { node: <Image src="/tech/prestashop.svg" width={64} height={55} style={{ height: 55, width: "auto" }} alt="PrestaShop" />, title: "PrestaShop" },
  { node: <SiFramer size={40} color="#0055FF" />, title: "Framer" },
  { node: <SiOdoo size={55} color="#714B67" />, title: "Odoo" },
  { node: <SiFigma size={40} color="var(--text-light)" />, title: "Figma" },
  { node: <Image src="/tech/n8n.svg" width={35} height={35} style={{ height: 35, width: "auto" }} alt="n8n" />, title: "n8n" },
];
