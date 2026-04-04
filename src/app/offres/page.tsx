import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offres & Packs | MV Agency',
  description: 'Des solutions transparentes pour votre croissance digitale.',
};

export default function OffresPage() {
  return (
    <main className="container" style={{ padding: "6rem 2rem", minHeight: "80vh", textAlign: "center" }}>
      <h1 className="neon-text" style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>Offres & Packs</h1>
      <p style={{ fontSize: "1.2rem", color: "var(--accent)", maxWidth: "700px", margin: "0 auto", marginBottom: "4rem" }}>
        Des solutions transparentes. Choisissez le pack qui correspond à l'ambition de votre présence digitale.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
        {[
          { title: "Pack Décollage", price: "Sur mesure", desc: "Idéal pour lancer ou refondre un site vitrine percutant.", accent: false },
          { title: "Pack Propulsion", price: "Sur mesure", desc: "L'option parfaite pour les PME. Site avancé + Intégration IA basique.", accent: true },
          { title: "Pack IA Avancé", price: "Sur mesure", desc: "Pour automatiser et optimiser vos workflows d'entreprise à 100%.", accent: false }
        ].map((pack, i) => (
          <div key={i} style={{ 
            backgroundColor: "var(--bg-neutral)", 
            padding: "3rem 2rem", 
            borderRadius: "8px", 
            border: pack.accent ? "2px solid var(--primary)" : "1px solid var(--secondary)",
            minWidth: "300px",
            boxShadow: pack.accent ? "0 0 15px rgba(37, 99, 235, 0.2)" : "none"
          }}>
            <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>{pack.title}</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--primary)", marginBottom: "1rem" }}>{pack.price}</p>
            <p style={{ color: "var(--accent)", marginBottom: "2.5rem" }}>{pack.desc}</p>
            <Link href="/contact" tabIndex={-1} style={{ textDecoration: 'none' }}>
              <Button variant={pack.accent ? "primary" : "outline"}>Démarrer</Button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
