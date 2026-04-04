import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos | MV Agency',
  description: 'Rendre le digital accessible, intelligent et durable.',
};

export default function AProposPage() {
  return (
    <main className="container" style={{ padding: "6rem 2rem", minHeight: "80vh" }}>
      <h1 className="neon-text" style={{ fontSize: "3.5rem", marginBottom: "2rem" }}>À propos de MV Agency</h1>
      
      <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: "1 1 500px" }}>
          <p style={{ fontSize: "1.2rem", color: "var(--text-light)", marginBottom: "1.5rem" }}>
            Notre mission : <strong>Concevoir, expliquer, propulser votre présence digitale.</strong>
          </p>
          <p style={{ fontSize: "1.1rem", color: "var(--accent)", marginBottom: "1rem" }}>
            Notre vision est de rendre le digital accessible, intelligent et durable pour les PME et les professions libérales.
          </p>
          <p style={{ fontSize: "1.1rem", color: "var(--accent)", marginBottom: "2rem" }}>
            Chez MV Agency, nous croyons que la technologie (comme l'Intelligence Artificielle) ne doit pas être une contrainte complexe, mais le meilleur outil de croissance pour votre activité locale ou nationale. Nous privilégions la <em>clarté</em> dans nos process, l'<em>innovation</em>, la <em>proximité</em> humaine et visons l'<em>excellence</em>.
          </p>
          <Link href="/contact" tabIndex={-1} style={{ textDecoration: 'none' }}>
            <Button variant="primary">Discutons de votre projet</Button>
          </Link>
        </div>
        <div style={{ flex: "1 1 400px", backgroundColor: "var(--secondary)", borderRadius: "8px", border: "1px solid var(--accent)", minHeight: "350px", display: "flex", alignItems: "center", justifyContent: "center" }}>
           <span style={{ color: "var(--accent)" }}>[Photo MV Agency]</span>
        </div>
      </div>
    </main>
  );
}
