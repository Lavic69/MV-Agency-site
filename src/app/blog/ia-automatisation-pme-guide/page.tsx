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
  StatHighlight,
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

const SLUG = "ia-automatisation-pme-guide";
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
    question: "L'IA générative est-elle vraiment utile pour une PME ?",
    answer:
      "Oui, à condition d'avoir des cas d'usage concrets et un cadre RGPD. En 2026, les cinq usages qui rentabilisent une PME sont : la qualification des leads entrants (chatbot 24/7), l'accélération de la production de contenu, la recherche dans la documentation interne, l'automatisation du suivi client (relances, emails) et la génération d'images marketing. Le gain typique est de 8 à 15 heures par semaine pour une équipe de 5 personnes, soit l'équivalent d'un mi-temps libéré pour du travail à plus forte valeur ajoutée.",
  },
  {
    question: "Quelle est la différence entre ChatGPT, Claude et Mistral ?",
    answer:
      "Ce sont trois modèles concurrents de LLM (Large Language Model). ChatGPT (OpenAI) est le plus connu et le plus polyvalent. Claude (Anthropic) est meilleur sur les tâches longues et le raisonnement nuancé, avec une politique de confidentialité plus stricte. Mistral est un modèle français, hébergé en Europe — choix privilégié pour les PME qui veulent une souveraineté de données complète. Tous trois sont accessibles via interface web et API. Le bon choix dépend du cas d'usage et des contraintes RGPD.",
  },
  {
    question: "Mes données vont-elles partir entraîner ChatGPT ?",
    answer:
      "Cela dépend du plan. ChatGPT gratuit utilise les conversations pour l'entraînement (sauf opt-out). ChatGPT Plus et Team n'utilisent pas vos données. ChatGPT Enterprise et l'API OpenAI ne les utilisent jamais. Même logique pour Claude (gratuit = entraînement, Pro et API = pas d'entraînement). Pour une PME qui traite des données clients, le minimum est un plan payant ; pour des données sensibles (médical, légal, RH), passez par l'API ou un modèle européen comme Mistral hébergé en France.",
  },
  {
    question: "Faut-il un développeur pour automatiser sa PME avec l'IA ?",
    answer:
      "Pas systématiquement. Les outils no-code comme n8n, Make ou Zapier permettent de connecter ChatGPT à votre CRM, votre messagerie ou votre site sans écrire une ligne de code. Pour 80 % des automatisations standard (qualifier un lead, résumer un email, générer un brouillon de réponse), un consultant no-code suffit. Le code devient nécessaire pour des intégrations complexes ou des volumes très élevés. Notre comparatif détaillé no-code vs code en entreprise est publié sur le blog MV Agency.",
  },
  {
    question: "Combien coûte un projet d'intégration IA pour une PME ?",
    answer:
      "Un premier projet d'intégration IA dans une PME (chatbot qualification + automatisation d'un workflow critique) se chiffre entre 3 000 € et 8 000 € en one-shot, plus 200 à 600 € par mois en abonnements (LLM API, outils no-code). Le ROI est généralement atteint en 3 à 6 mois si les cas d'usage sont bien choisis. MV Agency propose un pack Performance IA qui inclut le cadrage, le déploiement et la formation de l'équipe.",
  },
  {
    question: "L'IA va-t-elle remplacer mes employés ?",
    answer:
      "Pas dans une PME bien pilotée. L'IA en 2026 augmente les équipes existantes, elle ne les remplace pas. Un commercial qui utilise l'IA pour préparer ses rendez-vous traite 2 à 3 fois plus de prospects qu'avant. Un service client qui utilise un chatbot de qualification décharge 60 à 80 % des questions répétitives — ce qui libère du temps pour les conversations complexes. La logique n'est pas de remplacer, mais de libérer.",
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
    "IA pour PME",
    "automatisation IA",
    "intelligence artificielle PME",
    "automatisation entreprise IA",
    "ChatGPT PME",
    "agent IA entreprise",
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
        readingTime={ARTICLE.readingTime ?? 13}
      />

      <div className={styles.articleLayout}>
        <ArticleSidebar tocItems={ARTICLE.tocItems} takeaways={ARTICLE.takeaways} />

        <div className={styles.articleContent}>
          <AnswerBlock>
            L&apos;IA en PME en 2026, ce sont <strong>cinq cas d&apos;usage</strong>{" "}
            concrets : <strong>support client</strong>{" "}automatisé via chatbot,{" "}
            <strong>qualification des leads</strong>{" "}entrants,{" "}
            <strong>accélération de la production de contenu</strong>{" "}(brouillons,
            idées), <strong>recherche dans la documentation interne</strong>{" "}et{" "}
            <strong>automatisation des tâches répétitives</strong>{" "}(emails, suivi,
            reporting). Le gain de temps observé chez MV Agency est de{" "}
            <strong>8 à 15 heures par semaine</strong>{" "}sur une équipe de 5 personnes,
            soit l&apos;équivalent d&apos;un mi-temps libéré pour du travail à plus
            forte valeur ajoutée. Le ticket d&apos;entrée d&apos;une première
            intégration sérieuse est de <strong>3 000 € à 8 000 €</strong>{" "}en projet,
            plus <strong>200 à 600 € par mois</strong>{" "}en abonnements (LLM API + outils
            no-code). Le ROI est généralement atteint entre <strong>3 et 6 mois</strong>{" "}
            si les cas d&apos;usage sont bien choisis. Cet article détaille les cinq
            cas d&apos;usage, la cartographie des outils (ChatGPT, Claude, Mistral,
            Midjourney, n8n), les coûts réels par niveau d&apos;ambition, les quatre
            points RGPD à vérifier et un plan de démarrage en 30 jours.
          </AnswerBlock>

          <article>
            <h2 id="ia-2-minutes">C&apos;est quoi l&apos;IA en 2 minutes, pour un dirigeant non-tech ?</h2>
            <p>
              L&apos;<strong>intelligence artificielle générative</strong>{" "}— ChatGPT,
              Claude, Mistral, Midjourney — est une famille d&apos;outils qui sait{" "}
              <strong>produire du contenu nouveau</strong>{" "}à partir d&apos;une
              instruction écrite (un <em>prompt</em>). Texte, image, code, son,
              vidéo : tout peut être généré en quelques secondes.
            </p>
            <p>
              Pour une PME, ça veut dire <strong>trois choses</strong>{" "}très
              concrètes :
            </p>
            <ol>
              <li>
                <strong>Produire plus vite</strong>{" "}— un brouillon d&apos;email
                client passe de 15 minutes à 2 minutes. Un article de blog de 6 heures
                à 1h30. Un script vidéo de 2 heures à 20 minutes.
              </li>
              <li>
                <strong>Répondre 24/7</strong>{" "}— un chatbot bien configuré qualifie
                les leads et répond aux 80 % de questions répétitives sans humain. Vos
                équipes commencent leur journée avec un pipeline déjà trié.
              </li>
              <li>
                <strong>Automatiser ce qui était bloquant</strong>{" "}— résumés de
                réunions, classification d&apos;emails, suivi clients automatisé,
                relances commerciales personnalisées. Tout ce qui prenait un mi-temps
                tient maintenant en quelques workflows.
              </li>
            </ol>

            <PullQuote>
              L&apos;IA en PME, ce n&apos;est pas un futur lointain. C&apos;est un
              levier opérationnel disponible aujourd&apos;hui, avec un ticket
              d&apos;entrée à 3 000 € et un ROI mesurable en 3-6 mois.
            </PullQuote>

            <h2 id="5-cas-usage">Quels sont les 5 cas d&apos;usage IA qui marchent vraiment en PME ?</h2>
            <p>
              Sur les déploiements IA observés en PME francophones depuis 2024, cinq
              cas d&apos;usage reviennent systématiquement comme{" "}
              <strong>rentables et fiables</strong>.
              Les autres (créer une voix clonée, déployer un avatar 3D, générer des
              vidéos longues) sont encore expérimentaux et coûtent cher pour un ROI
              incertain.
            </p>

            <h3>1. Support client et qualification de leads</h3>
            <p>
              Un <strong>chatbot IA bien configuré</strong>{" "}qualifie 60 à 80 % des
              demandes entrantes : il pose les bonnes questions, comprend le contexte,
              oriente vers la bonne équipe ou la bonne ressource. Les conversations
              complexes sont escaladées vers un humain avec tout le contexte déjà
              collecté. Gain typique : un poste équivalent temps plein libéré pour 3
              personnes de support.
            </p>

            <h3>2. Production accélérée de contenu</h3>
            <p>
              Brouillons d&apos;articles de blog, posts LinkedIn, descriptions
              produits, scripts vidéo, réponses aux avis Google : l&apos;IA fait des
              premières versions cohérentes en quelques minutes. L&apos;humain
              relit, ajuste et publie. Gain typique : un article de blog professionnel
              passe de 6 heures à 1h30 de travail effectif.
            </p>

            <h3>3. Recherche dans la documentation interne</h3>
            <p>
              Vous avez 200 PDF, 50 contrats, 30 fiches techniques répartis dans
              Drive, Notion, Dropbox ? Un <strong>agent IA branché sur vos données</strong>{" "}
              (RAG : retrieval-augmented generation) permet de poser des questions en
              langage naturel et d&apos;obtenir des réponses citant les bons documents.
              Gain typique : 30 minutes par recherche évitées, multiplié par 10
              recherches par jour pour 5 personnes.
            </p>

            <h3>4. Automatisation des tâches répétitives</h3>
            <p>
              Classer un email, en extraire les infos clés, créer une tâche dans le
              CRM, envoyer une relance personnalisée 7 jours plus tard : tout ce
              workflow se construit en quelques heures dans n8n ou Make, avec
              ChatGPT ou Claude au cœur. Gain typique : 5 à 10 heures par semaine
              libérées sur une équipe commerciale de 3 personnes.
            </p>

            <h3>5. Génération d&apos;images et visuels marketing</h3>
            <p>
              <strong>Midjourney</strong>, <strong>Adobe Firefly</strong>{" "}ou la
              génération d&apos;images de Google : on produit des visuels marketing,
              des mockups, des illustrations de blog en quelques minutes. Coût d&apos;un
              visuel : 0,10 à 0,50 €. Coût d&apos;un freelance designer : 80 à 200 €.
              Gain typique : 200-500 € d&apos;économie par mois sur une PME qui
              communique activement.
            </p>

            <InlineCTA
              title="Pack Performance IA"
              text="MV Agency déploie un premier chantier IA (qualification + automatisation) en 4 à 6 semaines. ROI typique atteint sur 3-6 mois, avec formation incluse de votre équipe."
              ctaLabel="Découvrir le pack"
              href="/offres"
            />

            <h2 id="carte-outils">La carte des outils — qui fait quoi ?</h2>
            <p>
              Le paysage des outils IA en 2026 ressemble à un supermarché : trop de
              choix tue le choix. Voici la <strong>cartographie minimale</strong>{" "}
              qu&apos;une PME doit connaître pour décider intelligemment.
            </p>

            <ComparisonTable
              columns={["ChatGPT (OpenAI)", "Claude (Anthropic)", "Mistral (FR)"]}
              rows={[
                {
                  feature: "Force principale",
                  values: [
                    "Polyvalence, écosystème large",
                    "Raisonnement long et nuancé",
                    "Souveraineté UE + open-source",
                  ],
                },
                {
                  feature: "Hébergement données",
                  values: ["USA", "USA", "France/UE"],
                },
                {
                  feature: "Prix grand public",
                  values: ["20 €/mois (Plus)", "20 €/mois (Pro)", "Gratuit + payant"],
                },
                {
                  feature: "Idéal pour",
                  values: [
                    "Usage généraliste, intégrations",
                    "Tâches complexes, code, analyse",
                    "Conformité RGPD stricte",
                  ],
                },
              ]}
              caption="Les 3 LLM à connaître pour une PME francophone en 2026."
            />

            <h3>Les outils périphériques indispensables</h3>
            <ul>
              <li>
                <strong>n8n</strong>{" "}ou <strong>Make</strong>{" "}: orchestrateurs no-
                code qui connectent les LLM à votre CRM, votre messagerie, votre site.
                C&apos;est ce qui transforme un outil de chat en automatisation
                opérationnelle.
              </li>
              <li>
                <strong>Midjourney</strong>{" "}/ <strong>Adobe Firefly</strong>{" "}:
                génération d&apos;images. Midjourney est le plus puissant
                artistiquement, Firefly est plus sûr juridiquement (entraîné sur
                Adobe Stock).
              </li>
              <li>
                <strong>Perplexity</strong>{" "}: moteur de recherche IA qui cite ses
                sources. Indispensable pour les veilles concurrentielles et la
                recherche d&apos;informations factuelles.
              </li>
              <li>
                <strong>NotebookLM</strong>{" "}(Google) : transforme un corpus de
                documents en assistant interrogeable. Excellent pour la documentation
                interne d&apos;une PME.
              </li>
            </ul>

            <h2 id="combien-ca-coute">Combien ça coûte vraiment ?</h2>
            <p>
              Trois fourchettes selon l&apos;ambition du projet. Ces chiffres
              correspondent à des PME francophones réelles, pas à des estimations
              théoriques.
            </p>

            <ComparisonTable
              columns={["Niveau Découverte", "Niveau Déploiement", "Niveau Plateforme"]}
              rows={[
                {
                  feature: "Périmètre",
                  values: [
                    "1 cas d'usage (ex: chatbot site)",
                    "3-5 cas d'usage + intégrations CRM",
                    "Stack complète + agents custom",
                  ],
                },
                {
                  feature: "Budget initial",
                  values: ["1 500-3 000 €", "5 000-12 000 €", "15 000-40 000 €"],
                },
                {
                  feature: "Budget mensuel (LLM + outils)",
                  values: ["80-200 €", "300-700 €", "800-2 500 €"],
                },
                {
                  feature: "Délai déploiement",
                  values: ["2-3 semaines", "6-10 semaines", "3-6 mois"],
                },
              ]}
              caption="Fourchettes 2026 — projets IA en PME francophone. Hors équipe interne."
            />

            <Callout variant="warning">
              <strong>Le piège « ChatGPT gratuit suffira »</strong>. Un usage
              individuel d&apos;un dirigeant peut tenir avec un compte ChatGPT Plus à
              20 €/mois. Mais dès qu&apos;on parle d&apos;automatisation, de chatbot
              client ou de qualification de leads, il faut passer par l&apos;API et
              construire des workflows — c&apos;est là que le ticket monte. Sous-estimer
              cette étape conduit à des projets bricolés qui cassent dans 6 mois.
            </Callout>

            <h2 id="rgpd">RGPD et souveraineté : quels 4 points faut-il vérifier ?</h2>
            <p>
              Le RGPD reste la <strong>contrainte numéro un</strong>{" "}pour une PME
              francophone qui déploie l&apos;IA. Voici les 4 vérifications à faire
              avant tout déploiement.
            </p>

            <ProcessSteps
              steps={[
                {
                  title: "Vérifier où sont stockées vos données",
                  description: "ChatGPT Enterprise et l'API OpenAI sont hébergés aux USA. Le transfert UE → USA repose sur l'EU-US Data Privacy Framework (en vigueur depuis juillet 2023, mais encore contesté juridiquement). Claude est aux USA. Mistral est en France. Pour des données très sensibles (médical, RH, juridique), privilégiez un modèle européen ou un hébergement on-premise.",
                },
                {
                  title: "Confirmer que vos données ne servent pas à entraîner le modèle",
                  description: "Les plans payants (ChatGPT Plus/Team/Enterprise, Claude Pro, API OpenAI/Anthropic) garantissent que vos données ne nourrissent pas l'entraînement. Les versions gratuites ne donnent pas cette garantie.",
                },
                {
                  title: "Signer un DPA (Data Processing Agreement)",
                  description: "Tout fournisseur sérieux propose un DPA conforme RGPD à signer. OpenAI, Anthropic, Mistral, Google : tous le fournissent. Si votre prestataire IA ne peut pas vous le signer, fuyez.",
                },
                {
                  title: "Documenter le traitement dans votre registre",
                  description: "L'usage d'une IA générative entre dans votre registre RGPD au même titre que l'usage d'un CRM ou d'une régie publicitaire. Précisez la finalité, la base légale, la durée de conservation et les sous-traitants impliqués.",
                },
              ]}
            />

            <h2 id="demarrer-30-jours">Comment démarrer un projet IA en 30 jours ?</h2>
            <p>
              Vous pouvez avoir un premier chantier IA opérationnel en{" "}
              <strong>30 jours calendaires</strong>, sans tout révolutionner. Voici le
              plan que MV Agency utilise pour amorcer une PME sans casse.
            </p>

            <StatHighlight
              value="30 j"
              label="DU DÉCLIC AU PREMIER ROI"
              description="C'est le délai cible pour qu'une PME passe d'une discussion stratégique à un premier cas d'usage IA en production, mesurable et rentable."
            />

            <ProcessSteps
              steps={[
                {
                  title: "Semaine 1 — Cadrer le cas d'usage prioritaire",
                  description: "Atelier de 2 heures pour identifier le workflow le plus douloureux dans votre PME (lead non qualifié ? service client surchargé ? production de contenu lente ?). Choix d'un cas unique pour le premier sprint.",
                },
                {
                  title: "Semaine 2 — Choisir la stack et signer les contrats",
                  description: "Sélection du LLM (ChatGPT, Claude ou Mistral) selon contraintes RGPD, choix de l'orchestrateur (n8n ou Make), signature des DPA, ouverture des comptes payants.",
                },
                {
                  title: "Semaines 3-4 — Construire, tester, déployer",
                  description: "Implémentation du workflow IA (chatbot, automatisation ou autre), tests avec 5-10 cas réels, ajustements, mise en production avec monitoring. Formation de l'équipe sur 2 heures.",
                },
                {
                  title: "Semaine 5 (bonus) — Mesurer et itérer",
                  description: "Première revue mensuelle : combien d'heures économisées ? Combien de leads qualifiés en plus ? Quelles erreurs corriger ? Préparation du chantier IA n°2.",
                },
              ]}
            />

            <p>
              MV Agency propose ce démarrage <strong>en pack tout-compris</strong>{" "}à
              partir de 3 000 €, incluant le cadrage, la construction, la mise en
              production et la formation de votre équipe. Pour aller plus loin,
              consultez notre <a href="/blog/seo-marketing-pme-guide">guide SEO &
              marketing digital pour PME</a>{" "}— l&apos;IA et le marketing digital
              s&apos;amplifient mutuellement.
            </p>
          </article>

          <FAQ items={faqItems} title="Vos questions sur l'IA en PME" />

          <RelatedArticles currentSlug={SLUG} pillar={ARTICLE.pillar} />

          <section className={styles.ctaFinal}>
            <h2 className={styles.ctaFinalTitle}>
              Prêt à déployer votre premier <span className="globalGradientWord">chantier IA</span> ?
            </h2>
            <p className={styles.ctaFinalText}>
              30 minutes offertes pour cadrer votre cas d&apos;usage prioritaire et
              estimer le ROI. Sans engagement, sans pitch commercial.
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
