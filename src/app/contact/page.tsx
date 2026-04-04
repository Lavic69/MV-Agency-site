import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | MV Agency',
  description: 'Planifions un échange pour votre projet.',
};

export default function ContactPage() {
  return (
    <main className="container" style={{ padding: "6rem 2rem", minHeight: "80vh", textAlign: "center" }}>
      <h1 className="neon-text" style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>Contactez-nous</h1>
      <p style={{ fontSize: "1.2rem", color: "var(--accent)", maxWidth: "600px", margin: "0 auto", marginBottom: "3rem" }}>
        Prêt à propulser votre présence digitale ? Réservez un appel gratuit pour auditer votre besoin.
      </p>
      
      <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "var(--secondary)", padding: "3rem", borderRadius: "8px", border: "1px solid var(--accent)" }}>
         <h3 style={{ marginBottom: "2rem", fontSize: "1.5rem" }}>Planifions un échange</h3>
         <div style={{ border: "2px dashed var(--accent)", padding: "4rem 2rem", borderRadius: "8px" }}>
            <p style={{ color: "var(--accent)", marginBottom: "1rem" }}>[Intégration Calendly / Formulaire]</p>
            <p style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>En attendant, écrivez à : <strong style={{ color: "var(--primary)" }}>contact@mvagency.fr</strong></p>
            <p style={{ fontSize: "0.9rem", color: "var(--text-light)", marginTop: "0.5rem" }}>Tel : <strong>04 70 63 64 52</strong></p>
         </div>
      </div>
    </main>
  );
}
