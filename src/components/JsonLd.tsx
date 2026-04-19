/**
 * Composant helper pour injecter un bloc JSON-LD (Schema.org) dans le <head> virtuel
 * de Next.js via le streaming SSR. Fonctionne en Server Component.
 *
 * Utilisation :
 *   <JsonLd data={organizationSchema} />
 *
 * Référence : https://schema.org/docs/gs.html
 */

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Next.js 16 : suppressHydrationWarning n'est pas requis pour les scripts JSON-LD
      // car ils ne contiennent pas de code exécutable.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
