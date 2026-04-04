import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | MV Agency',
  description: 'Découvrez comment nous propulsons les PME.',
};

export default function ServicesPage() {
  return (
    <main className="container" style={{ padding: "6rem 2rem", minHeight: "80vh" }}>
      <h1 className="neon-text" style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>Nos Services</h1>
      <p style={{ fontSize: "1.2rem", color: "var(--accent)", maxWidth: "700px", marginBottom: "4rem" }}>
        Découvrez comment nous propulsons les PME et professions libérales avec des solutions web et de l'intelligence artificielle.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        {[
          { title: "Création Web Vitesse Réacteur", desc: "Des sites web vitrines ultra-performants en Next.js, conçus spécifiquement pour le référencement naturel et la conversion client." },
          { title: "Intégration d'IA", desc: "Automatisez vos prises de rendez-vous, qualifiez vos prospects et optimisez vos processus avec l'intelligence artificielle sur-mesure." },
          { title: "Stratégie CRO (Conversion)", desc: "Un accompagnement pointu pour comprendre, analyser et corriger les points de fuite de votre site actuel pour maximiser votre ROI." }
        ].map((s, i) => (
          <div key={i} style={{ backgroundColor: "var(--secondary)", padding: "2rem", borderRadius: "8px", border: "1px solid var(--accent)" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--text-light)" }}>{s.title}</h3>
            <p style={{ color: "var(--accent)" }}>{s.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <Link href="/offres" tabIndex={-1} style={{ textDecoration: 'none' }}>
           <Button variant="outline">Voir nos offres & packs</Button>
        </Link>
      </div>
    </main>
  );
}
