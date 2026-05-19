import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import {
  ArticleHeader,
  AnswerBlock,
  InlineCTA,
  FAQ,
  RelatedArticles,
  BreadcrumbTrail,
  PullQuote,
  ProcessSteps,
  ArticleSidebar,
  ComparisonTable,
  Callout,
} from "@/components/blog";
import { Button } from "@/components/ui/Button";
import {
  SITE_URL,
  buildArticleSchema,
  buildFaqPageSchema,
  buildBreadcrumbSchema,
  type FaqItem,
  OG_IMAGE,
} from "@/lib/seo";
import {
  getArticleBySlug,
  getArticleNumber,
  PILLAR_LABEL,
} from "@/app/blog/_articles";
import styles from "@/components/blog/Article.module.css";

const SLUG = "no-code-vs-code-entreprise";
const _ARTICLE = getArticleBySlug(SLUG);
if (!_ARTICLE) {
  throw new Error(`[blog] No article found for slug "${SLUG}". Check src/app/blog/_articles.ts.`);
}
const ARTICLE = _ARTICLE;
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: `${ARTICLE.title} — MV Agency`,
  description: ARTICLE.description,
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    type: "article",
    title: ARTICLE.title,
    description: ARTICLE.description,
    url: URL,
    publishedTime: ARTICLE.publishedAt,
    modifiedTime: ARTICLE.updatedAt,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: ARTICLE.title,
    description: ARTICLE.description,
    images: [OG_IMAGE.url],
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Accueil", url: SITE_URL },
  { name: "Blog", url: `${SITE_URL}/blog` },
  { name: ARTICLE.title, url: URL },
]);

const faqItems: FaqItem[] = [
  {
    question: "C'est quoi le no-code, vraiment ?",
    answer:
      "Le no-code, c'est l'ensemble des outils qui permettent de construire des applications, automatisations ou sites web sans écrire de code informatique. À la place, on assemble visuellement des briques fonctionnelles (formulaire, base de données, API, IA) dans une interface graphique. Make, n8n, Webflow, Airtable, Bubble et Notion sont les outils les plus matures en 2026. Le no-code n'est pas un sous-code : pour 70 % des projets PME, il est plus rapide, moins cher et tout aussi robuste.",
  },
  {
    question: "Quelle est la différence entre no-code et low-code ?",
    answer:
      "Le no-code n'utilise jamais de code (tout est visuel). Le low-code permet d'écrire des bouts de code (formules, scripts) quand on en a besoin, pour étendre les capacités de la plateforme. Bubble, Webflow et Airtable sont à mi-chemin : visuels par défaut mais autorisent des formules ou des snippets JavaScript. En pratique, la frontière est floue — l'important est de savoir si vous avez besoin de logique métier complexe.",
  },
  {
    question: "Quand faut-il absolument passer au code ?",
    answer:
      "Quatre situations rendent le code obligatoire : (1) volumes très élevés (plus de 100 000 utilisateurs actifs ou des millions de requêtes mensuelles), (2) intégrations complexes non-standard avec des systèmes legacy, (3) contraintes de performance ou de latence très strictes (trading, IoT temps réel), (4) propriété intellectuelle critique sur l'algorithme. Pour tout le reste — site vitrine, e-commerce, dashboards, automatisations métier — le no-code couvre 80-95 % des besoins.",
  },
  {
    question: "Combien de temps pour se former au no-code ?",
    answer:
      "Comptez 20-40 heures pour devenir opérationnel sur un outil (Make, Webflow, Airtable). 80-150 heures pour devenir vraiment autonome et concevoir des solutions complexes. La courbe d'apprentissage est 5 à 10 fois plus rapide que pour le code classique. Formats efficaces : tutoriels YouTube officiels (gratuits), cours en ligne payants spécialisés (LiveMentor, Maker's Den, OpenClassrooms), bootcamps intensifs orientés no-code.",
  },
  {
    question: "Le no-code va-t-il mourir avec l'IA ?",
    answer:
      "Non, l'IA renforce le no-code. ChatGPT et Claude peuvent maintenant générer des configurations Make ou n8n à partir d'une description en français — c'est l'IA qui rédige les workflows complexes. Les plateformes no-code intègrent l'IA générative directement (Notion AI, Airtable AI). Résultat : le no-code devient plus puissant, pas obsolète. Le code natif sera réservé à des cas vraiment complexes ou ultra-performants.",
  },
  {
    question: "MV Agency forme-t-elle au no-code ?",
    answer:
      "Oui. Le pack Performance IA de MV Agency inclut une formation pratique de votre équipe sur les outils no-code utilisés dans le projet (typiquement n8n + Airtable + ChatGPT). La formation se fait en sessions de 2 heures sur le projet réel, pas sur un exemple théorique. Objectif : votre équipe devient autonome pour ajouter de nouveaux workflows sans dépendre d'un prestataire.",
  },
];

const faqPageSchema = buildFaqPageSchema(faqItems, URL);

const articleSchema = buildArticleSchema({
  url: URL,
  title: ARTICLE.title,
  description: ARTICLE.description,
  publishedAt: ARTICLE.publishedAt,
  updatedAt: ARTICLE.updatedAt,
  imageUrl: `${SITE_URL}/opengraph-image`,
  keywords: [
    "formation no code",
    "no-code vs code",
    "apprendre no code",
    "outils no code",
    "formation outils digitaux",
    "no code entreprise",
  ],
});

export default function Page() {
  return (
    <main className={styles.articleWrapper}>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqPageSchema} />

      <BreadcrumbTrail
        items={[
          { name: "Accueil", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: ARTICLE.title },
        ]}
      />

      <ArticleHeader
        pillarLabel={PILLAR_LABEL[ARTICLE.pillar]}
        num={getArticleNumber(SLUG)}
        keyword={ARTICLE.keyword}
        title={ARTICLE.title}
        publishedAt={ARTICLE.publishedAt}
        updatedAt={ARTICLE.updatedAt}
        readingTime={ARTICLE.readingTime ?? 10}
      />

      <div className={styles.articleLayout}>
        <ArticleSidebar tocItems={ARTICLE.tocItems} takeaways={ARTICLE.takeaways} />

        <div className={styles.articleContent}>
          <AnswerBlock>
            En 2026, le <strong>no-code</strong>{" "}suffit pour environ{" "}
            <strong>70 % des projets digitaux</strong>{" "}d&apos;une PME : sites vitrines,
            automatisations métier, MVP, dashboards internes, intégrations CRM. Le{" "}
            <strong>code natif</strong>{" "}reste obligatoire pour les volumes très
            élevés (&gt;100 000 utilisateurs actifs), les contraintes de performance
            strictes (latence sous les 100 ms) ou des intégrations système très
            spécifiques (ERP legacy, mainframes, équipements industriels). Les{" "}
            <strong>6 outils no-code à connaître</strong>{" "}sont Make, n8n, Webflow,
            Airtable, Bubble et Notion. La courbe d&apos;apprentissage est{" "}
            <strong>5 à 10 fois plus rapide</strong>{" "}que celle du code classique :
            comptez <strong>20-40 heures</strong>{" "}pour être opérationnel sur un outil
            et <strong>80-150 heures</strong>{" "}pour devenir vraiment autonome. Côté
            budget, un site vitrine no-code coûte 2 000-5 000 €, une automatisation
            métier 1 000-5 000 €, contre 3 à 5 fois plus en code custom. Cet article
            compare les deux approches sur 8 dimensions, détaille les cas d&apos;usage
            de chacune et donne les bonnes pistes de formation pour outiller votre
            équipe sans dépendre d&apos;un prestataire externe.
          </AnswerBlock>

          <article>
            <h2 id="la-confusion">No-code vs code : d&apos;où vient la confusion en 2026 ?</h2>
            <p>
              Le débat <strong>« faut-il coder ou non-coder ? »</strong>{" "}continue
              de polluer les discussions techniques en PME. Deux camps s&apos;opposent :
              les puristes du code qui considèrent le no-code comme du bricolage, et
              les évangélistes du no-code qui promettent que tout peut se faire sans
              développeur. Les deux ont tort.
            </p>
            <p>
              La vérité 2026 est <strong>plus pragmatique</strong>{" "}: ce sont deux
              approches complémentaires, qui répondent à des problèmes différents. Une
              PME bien outillée utilise <em>les deux</em>{" "}— no-code pour 70 % des
              workflows, code pour les 30 % restants où la complexité ou la
              performance l&apos;exigent.
            </p>

            <PullQuote>
              Le bon réflexe n&apos;est pas de choisir un camp, mais de savoir{" "}
              <em>quel outil</em>{" "}pour <em>quel problème</em>. Le no-code et le
              code sont complémentaires, pas concurrents.
            </PullQuote>

            <h2 id="tableau-comparatif">No-code vs code : que dit le comparatif sur 8 dimensions ?</h2>
            <p>
              Pour décider rationnellement, voici un comparatif honnête sur les 8
              critères qui comptent pour une PME.
            </p>

            <ComparisonTable
              columns={["No-code", "Code (sur-mesure)"]}
              rows={[
                {
                  feature: "Vitesse de mise en production",
                  values: ["⚡ 1 jour à 4 semaines", "🐢 6 semaines à 6 mois"],
                },
                {
                  feature: "Coût initial",
                  values: ["500 €-8 000 €", "5 000 €-100 000 €+"],
                },
                {
                  feature: "Coût récurrent (abonnements)",
                  values: ["50-500 €/mois", "Hébergement 10-200 €/mois"],
                },
                {
                  feature: "Scalabilité (jusqu'à X users)",
                  values: ["100 000 users en standard", "Illimité (selon archi)"],
                },
                {
                  feature: "Maintenance",
                  values: ["Faible — mises à jour automatiques", "Moyenne à forte"],
                },
                {
                  feature: "Contrôle technique",
                  values: ["Limité aux fonctions de l'outil", "Total"],
                },
                {
                  feature: "Dépendance fournisseur",
                  values: ["Forte (lock-in)", "Aucune si open-source"],
                },
                {
                  feature: "Compétence requise",
                  values: ["20-40 h de formation", "1-3 ans d'expérience dev"],
                },
              ]}
              caption="Comparatif no-code vs code sur 8 dimensions structurantes — 2026."
            />

            <Callout variant="info">
              <strong>Le lock-in n&apos;est pas une fatalité.</strong>{" "}Les plateformes
              no-code matures (n8n est open-source, Webflow exporte en HTML/CSS,
              Airtable exporte les données) limitent la dépendance. Le vrai
              lock-in vient de la logique métier complexe que vous reconstruisez
              <em>dans</em>{" "}l&apos;outil — pas de l&apos;outil lui-même.
            </Callout>

            <h2 id="no-code-suffit">Quand le no-code suffit-il largement ?</h2>
            <p>
              Voici les <strong>cinq cas d&apos;usage typiques</strong>{" "}où le no-code
              est non seulement suffisant, mais <em>plus pertinent</em>{" "}que le code
              sur-mesure.
            </p>

            <ol>
              <li>
                <strong>Site vitrine d&apos;entreprise</strong>{" "}— une PME qui veut
                un site présentation + blog + formulaire de contact n&apos;a aucun
                besoin de code custom. Webflow ou Framer livrent un résultat
                professionnel en 2-4 semaines pour 2 000-5 000 €.
              </li>
              <li>
                <strong>Automatisation des workflows métier</strong>{" "}— relier
                Gmail à un CRM, qualifier des leads avec ChatGPT, envoyer des
                relances automatiques. Make et n8n font ça en quelques heures
                de configuration, là où du code prendrait des semaines.
              </li>
              <li>
                <strong>MVP produit (test marché)</strong>{" "}— avant d&apos;investir
                des dizaines de milliers d&apos;euros en développement, testez votre
                idée avec Bubble ou Glide. Un MVP no-code se lance en 2-6 semaines
                pour 1 000-5 000 €.
              </li>
              <li>
                <strong>Dashboards et reporting interne</strong>{" "}— Notion, Airtable
                ou Coda combinés à Make font des dashboards consolidés (ventes,
                marketing, opérations) sans aucune ligne de code.
              </li>
              <li>
                <strong>Formulaires complexes et processus admin</strong>{" "}—
                onboarding client, devis automatisé, gestion de candidatures :
                tout passe par des outils comme Tally, Fillout, Typeform + Make.
              </li>
            </ol>

            <InlineCTA
              title="Audit no-code de votre PME"
              text="MV Agency analyse vos workflows actuels et identifie ceux qui peuvent passer en no-code. Vous repartez avec une liste priorisée et une estimation des gains de temps."
              ctaLabel="Réserver l'audit"
              href="/contact"
            />

            <h2 id="code-obligatoire">Quand le code reste-t-il obligatoire ?</h2>
            <p>
              Il existe des cas où le no-code casse. Connaître ces limites évite
              de s&apos;y enfermer.
            </p>

            <ul>
              <li>
                <strong>Très gros volumes</strong>{" "}— au-delà de 100 000-500 000
                utilisateurs actifs mensuels, les plateformes no-code deviennent
                soit chères, soit instables. C&apos;est le point où le code custom
                (Next.js, Rails, Django) reprend l&apos;avantage.
              </li>
              <li>
                <strong>Contraintes de performance strictes</strong>{" "}— applications
                temps réel (trading, IoT, jeux multi-joueurs) qui exigent moins de
                100 ms de latence. Le no-code n&apos;est pas conçu pour ça.
              </li>
              <li>
                <strong>Logique métier très complexe</strong>{" "}— algorithmes
                propriétaires, IA custom, simulations scientifiques, traitement
                d&apos;images massif. Le no-code n&apos;a pas les bons abstractifs.
              </li>
              <li>
                <strong>Intégrations système ultra-spécifiques</strong>{" "}— connecteurs
                vers des systèmes legacy (ERP des années 90, mainframes bancaires,
                équipements industriels propriétaires). Le code natif est souvent
                obligatoire pour exposer ces APIs.
              </li>
              <li>
                <strong>Propriété intellectuelle critique</strong>{" "}— quand
                l&apos;algorithme <em>est</em>{" "}le produit (search engine, ranking
                de recommandation, scoring de risque). Le no-code expose cette
                logique au fournisseur.
              </li>
            </ul>

            <h2 id="6-outils">Quels sont les 6 outils no-code à connaître en 2026 ?</h2>
            <p>
              Si vous deviez ne retenir que <strong>six outils</strong>{" "}pour outiller
              une PME en 2026, ce serait ceux-là.
            </p>

            <ProcessSteps
              steps={[
                {
                  title: "Make — automatisation visuelle multi-apps",
                  description: "Le plus accessible des orchestrateurs. On glisse-dépose des connecteurs (Gmail, Sheets, ChatGPT, Slack) et on construit des workflows. Idéal pour démarrer. Plan gratuit, payant à partir de 9 €/mois.",
                },
                {
                  title: "n8n — l'alternative open-source à Make",
                  description: "Même logique que Make, mais open-source et auto-hébergeable. Préféré quand on veut maîtriser ses données et personnaliser plus profondément. Gratuit en self-host, 24 €/mois en cloud managé.",
                },
                {
                  title: "Webflow — sites web professionnels sans code",
                  description: "Le standard pour les sites vitrine et marketing en 2026. Design pixel-perfect, animations, CMS intégré, SEO avancé. Plan gratuit + payant 14-39 €/mois selon les besoins.",
                },
                {
                  title: "Airtable — base de données + interface no-code",
                  description: "Le tableur dopé aux stéroïdes. On stocke données clients, projets, contenus dans une base relationnelle visuelle, puis on construit des interfaces personnalisées. Plan gratuit + payant 10-20 €/utilisateur/mois.",
                },
                {
                  title: "Bubble — applications web complètes sans code",
                  description: "Le plus puissant pour construire des applications web complexes (marketplaces, SaaS, dashboards interactifs) sans coder. Courbe d'apprentissage plus longue, mais résultat très professionnel. À partir de 29 €/mois.",
                },
                {
                  title: "Notion — documentation et knowledge management",
                  description: "L'outil collaboratif universel. Sert de wiki interne, de gestion de projet, de CRM léger, de portail client. Sa nouvelle IA générative en fait un assistant productif. Plan gratuit + payant 8-15 €/utilisateur/mois.",
                },
              ]}
            />

            <h2 id="se-former">Comment se former au no-code ?</h2>
            <p>
              La formation no-code se distingue de la formation code classique par
              sa <strong>rapidité</strong>{" "}et son <strong>orientation projet</strong>.
              On n&apos;apprend pas une syntaxe abstraite — on construit immédiatement
              un workflow utile.
            </p>

            <h3>Les 4 formats de formation qui marchent</h3>
            <ul>
              <li>
                <strong>Tutoriels officiels YouTube</strong>{" "}(gratuits) — chaque
                outil (Make, n8n, Webflow, Airtable, Bubble) a sa chaîne officielle
                avec 50-200 vidéos. Suffisant pour devenir opérationnel en 20-40
                heures. Le meilleur ROI possible.
              </li>
              <li>
                <strong>Cours en ligne payants</strong>{" "}— LiveMentor, OpenClassrooms,
                Udemy, Maker&apos;s Den. 100-500 € pour une formation structurée de
                30-60 heures avec exercices. Bien quand on a besoin d&apos;une
                certification ou d&apos;un cadre.
              </li>
              <li>
                <strong>Bootcamps intensifs</strong>{" "}orientés no-code et automatisation
                IA. 2 000-5 000 € pour 4-12 semaines à plein temps. Pour viser un
                changement de carrière, pas pour un dirigeant qui veut outiller son
                équipe rapidement.
              </li>
              <li>
                <strong>Formation sur projet réel avec MV Agency</strong>{" "}—
                votre équipe se forme <em>en construisant</em>{" "}votre vraie
                automatisation IA. 2-3 sessions de 2 heures, équipe autonome à la
                fin. Inclus dans le pack Performance IA.
              </li>
            </ul>

            <Callout variant="tip">
              <strong>Le meilleur format pour une PME</strong>{" "}: tutoriels gratuits
              + formation sur projet réel. Vous évitez les cours théoriques qui ne
              transposent pas et vous capitalisez immédiatement sur vos workflows
              métier. C&apos;est le format que MV Agency applique systématiquement.
            </Callout>

            <p>
              Pour aller plus loin, lisez aussi notre{" "}
              <a href="/blog/ia-automatisation-pme-guide">guide IA et automatisation
              pour PME</a>{" "}— le no-code et l&apos;IA sont les deux faces de la
              même médaille en 2026.
            </p>
          </article>

          <FAQ items={faqItems} title="Vos questions sur le no-code vs code" />

          <RelatedArticles currentSlug={SLUG} pillar={ARTICLE.pillar} />

          <section className={styles.ctaFinal}>
            <h2 className={styles.ctaFinalTitle}>
              Prêt à <span className="globalGradientWord">outiller</span> votre équipe ?
            </h2>
            <p className={styles.ctaFinalText}>
              30 minutes offertes pour identifier vos workflows à automatiser et
              choisir le bon mix no-code / code. Sans engagement, sans pitch.
            </p>
            <div className={styles.ctaFinalButtonWrap}>
              <Button variant="primary" href="/contact">Réserver un appel offert</Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
