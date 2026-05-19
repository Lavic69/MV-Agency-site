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

const SLUG = "seo-marketing-pme-guide";
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
    question: "C'est quoi la différence entre SEO et marketing digital ?",
    answer:
      "Le SEO (référencement naturel) est une discipline du marketing digital, pas un synonyme. Le marketing digital regroupe tous les canaux numériques d'acquisition : SEO, publicité payante (Google Ads, Meta), réseaux sociaux, email, contenu, automatisation. Le SEO en est le pilier le moins cher au lead sur 12 mois, mais le plus long à activer (3 à 6 mois avant les premiers résultats sérieux).",
  },
  {
    question: "Combien de temps pour ranker sur Google quand on est une PME ?",
    answer:
      "Comptez 3 à 6 mois pour les premières positions sur des mots-clés longue traîne (peu de concurrence), 9 à 18 mois pour des keywords commerciaux à fort volume. Le délai dépend du domaine (un site neuf met plus longtemps qu'un site avec 2 ans d'historique), du rythme de publication (2 articles par semaine accélère 3x les résultats vs 1 par mois) et de la qualité des backlinks acquis.",
  },
  {
    question: "Faut-il faire du SEO ou du Google Ads en priorité ?",
    answer:
      "Les deux. Le Google Ads sécurise du trafic dès le premier jour mais s'arrête le jour où vous coupez le budget. Le SEO prend 6 mois à se mettre en route mais devient gratuit et cumulatif. La stratégie MV Agency : Ads en bottom-funnel (intent transactionnel direct) pendant les 6 premiers mois pour amorcer la conversion, puis bascule progressive vers le SEO qui prend le relais sur les mêmes keywords à un coût par lead 3 à 5 fois inférieur.",
  },
  {
    question: "Combien coûte le marketing digital pour une TPE ou PME ?",
    answer:
      "Pour une TPE de moins de 10 salariés, comptez 500 à 1 500 € par mois en externalisation (SEO + GBP + contenu). Pour une PME de 10 à 50 salariés visant une croissance sérieuse, la fourchette monte à 1 500 à 4 000 € par mois (ajout de réseaux sociaux pilotés et publicité ciblée). Au-delà, on entre dans des équipes hybrides interne + agence avec des budgets de 4 000 à 10 000 € par mois.",
  },
  {
    question: "Comment savoir si mon agence SEO travaille vraiment ?",
    answer:
      "Quatre signaux objectifs : un reporting mensuel avec positions Google Search Console (pas juste « du trafic »), une roadmap éditoriale partagée avec dates et keywords cibles, des backlinks acquis tracés (qui, quand, quel domain authority) et une augmentation du nombre de pages indexées chaque trimestre. Si l'agence vous parle uniquement de « visibilité » sans chiffres, c'est un drapeau rouge.",
  },
  {
    question: "L'IA va-t-elle tuer le SEO en 2026 ?",
    answer:
      "Non, l'IA transforme le SEO, elle ne le supprime pas. Les AI Overviews de Google (anciennement SGE) et les réponses de ChatGPT, Claude et Perplexity citent des sources web — ces sources sont sélectionnées sur les mêmes critères que le SEO classique (autorité, fraîcheur, structure de contenu, données structurées). La discipline évolue vers le GEO (Generative Engine Optimization), mais les fondamentaux restent : contenu utile, balisage propre, autorité externe.",
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
    "agence référencement naturel",
    "SEO PME",
    "marketing digital PME",
    "référencement naturel TPE",
    "stratégie SEO 2026",
    "agence SEO marketing",
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
            Le marketing digital pour une PME en 2026 repose sur{" "}
            <strong>cinq piliers</strong>{" "}: <strong>SEO technique et éditorial</strong>,{" "}
            <strong>Google Business Profile</strong>{" "}(visibilité locale + AI Overviews),{" "}
            <strong>contenu evergreen</strong>{" "}(blog et guides),{" "}
            <strong>réseaux sociaux ciblés</strong>{" "}(LinkedIn B2B, Instagram local) et{" "}
            <strong>IA + automatisation</strong>{" "}(qualification de leads, génération
            de contenu, suivi). Sans contenu, pas de SEO ; sans SEO, le contenu reste
            invisible. Sur 12 mois, le trafic organique coûte{" "}
            <strong>3 à 5 fois moins cher au lead</strong>{" "}qu&apos;une stratégie
            uniquement payante. Le ticket d&apos;entrée d&apos;un accompagnement
            sérieux démarre à <strong>500-1 500 € par mois</strong>{" "}pour une TPE et
            monte à <strong>1 500-4 000 € par mois</strong>{" "}pour une PME en croissance.
            Les premiers résultats sérieux arrivent entre le mois 4 et le mois 9 selon
            le rythme de production (2 articles par semaine décollent 3 fois plus vite
            qu&apos;1 par mois). Cet article détaille les cinq piliers, les trois
            erreurs qui coulent 80 % des PME, la méthode MV Agency en six étapes, les
            fourchettes de coûts réelles par taille d&apos;entreprise et les quatre
            KPIs qui permettent de mesurer le ROI sans boîte noire.
          </AnswerBlock>

          <article>
            <h2 id="c-est-quoi">SEO et marketing digital — c&apos;est quoi en 2 minutes ?</h2>
            <p>
              Le <strong>marketing digital</strong>, c&apos;est l&apos;ensemble des
              canaux numériques utilisés pour faire venir des clients vers votre
              entreprise : moteurs de recherche, réseaux sociaux, publicité en ligne,
              email, contenu, recommandations IA. Le <strong>SEO</strong>{" "}
              <em>(Search Engine Optimization, ou référencement naturel)</em>{" "}en est
              <strong>un pilier — pas un synonyme</strong>.
            </p>
            <p>
              Dit autrement : le marketing digital, c&apos;est la maison. Le SEO,
              c&apos;est les fondations. Vous pouvez monter une maison sans fondations
              solides (Google Ads, réseaux sociaux payants), mais elle s&apos;effondre
              dès que vous coupez le budget.
            </p>
            <PullQuote attribution="Observation MV Agency, accompagnements 2024-2026">
              Sur les PME que nous accompagnons, environ 80 % du trafic mature provient
              du SEO et du Google Business Profile. Les 20 % restants sont les réseaux
              sociaux et la publicité.
            </PullQuote>
            <p>
              Pourquoi la confusion persiste ? Pour deux raisons. D&apos;un côté,{" "}
              <strong>les agences se vendent en SEO</strong>{" "}alors qu&apos;elles font
              en réalité du marketing digital généraliste. De l&apos;autre,{" "}
              <strong>les outils SaaS se vendent en marketing digital</strong>{" "}alors
              qu&apos;ils ne couvrent qu&apos;une brique (Mailchimp = email,
              Hootsuite = social, etc.). La vérité : un SEO sans le reste ne convertit
              pas ; un marketing digital sans SEO coûte une fortune.
            </p>

            <h2 id="5-piliers">Quels sont les 5 piliers du marketing digital en 2026 ?</h2>
            <p>
              Sur les six dernières années d&apos;accompagnement de PME francophones,
              cinq piliers reviennent systématiquement comme moteurs de croissance
              digitale. Aucun ne fonctionne seul. Chacun amplifie les autres.
            </p>

            <h3>1. SEO technique + contenu éditorial</h3>
            <p>
              Le SEO 2026 est un mélange de qualité technique (Core Web Vitals,
              données structurées, indexation propre) et de production éditoriale
              régulière (2 articles par semaine est le rythme minimum pour qu&apos;un
              site neuf décolle en 6 mois). Sans contenu, Google n&apos;a rien à
              indexer. Sans technique, le contenu n&apos;est pas crawlé.
            </p>

            <h3>2. Google Business Profile (GBP)</h3>
            <p>
              C&apos;est <strong>la brique la plus rentable</strong>{" "}pour une PME
              locale en 2026. Une fiche GBP optimisée capte le pack Maps Google, les
              avis clients étoilés et alimente les <strong>AI Overviews</strong>{" "}de
              Google (les réponses générées par IA en haut des SERPs). Une fiche GBP
              avec 30+ avis 5 étoiles bat un site web mal référencé sur 80 % des
              requêtes locales.
            </p>

            <h3>3. Contenu evergreen (blog, guides, ressources)</h3>
            <p>
              Un <strong>article evergreen</strong>{" "}(qui reste utile 2 ans après sa
              publication) attire du trafic mois après mois sans nouveau coût. Sur 24
              articles publiés en 12 mois, les 5 meilleurs représentent 60 % du
              trafic. C&apos;est la logique <strong>hub & spokes</strong>{" "}: un article
              pilier (hub) sur le sujet principal, 5-10 articles satellites (spokes)
              sur les sous-questions, tous reliés entre eux.
            </p>

            <h3>4. Réseaux sociaux ciblés</h3>
            <p>
              <strong>LinkedIn pour le B2B</strong>{" "}(décideurs de PME, dirigeants,
              acheteurs IT), <strong>Instagram et TikTok pour le B2C local</strong>{" "}
              (restaurants, commerces, artisans). Le reste (Twitter/X, Facebook
              organique) est en déclin pour la conversion. Le but n&apos;est pas
              d&apos;être partout, mais d&apos;être <strong>présent et constant</strong>{" "}
              là où votre cible passe ses journées.
            </p>

            <h3>5. IA + automatisation</h3>
            <p>
              L&apos;IA en 2026 sert quatre choses concrètes en marketing PME : la{" "}
              <strong>qualification de leads</strong>{" "}entrants (chatbot 24/7),
              l&apos;<strong>accélération de la production de contenu</strong>{" "}
              (brouillons d&apos;articles, idées, structures), l&apos;
              <strong>automatisation du suivi</strong>{" "}(emails personnalisés post-
              formulaire) et le <strong>reporting consolidé</strong>{" "}(connecteurs
              entre GSC, GA4, Ads, CRM). Pour aller plus loin, voir notre{" "}
              <a href="/blog/ia-automatisation-pme-guide">guide IA et automatisation
              pour PME</a>.
            </p>

            <h2 id="3-erreurs">Pourquoi 80 % des PME ratent-elles leur SEO ?</h2>
            <p>
              Sur 100 PME qui démarrent un projet SEO, environ 80 abandonnent ou
              n&apos;obtiennent jamais de résultats. Trois erreurs reviennent
              systématiquement.
            </p>

            <h3>Erreur 1 — Rédiger ce qu&apos;on veut, pas ce que les clients cherchent</h3>
            <p>
              <strong>« On va écrire un article sur notre nouvelle offre. »</strong>{" "}
              Mauvaise approche. Les clients ne tapent pas le nom de votre offre dans
              Google — ils tapent le <strong>problème</strong>{" "}qu&apos;ils essaient
              de résoudre. La première étape d&apos;un SEO sérieux, c&apos;est la{" "}
              <strong>recherche keyword</strong>{" "}: volumes, intents, difficulté. Sans
              ça, vous produisez du contenu invisible.
            </p>

            <h3>Erreur 2 — Focus technique sans contenu (ou inverse)</h3>
            <p>
              Un site ultra-rapide avec un Lighthouse à 100 mais sans aucun contenu
              utile, c&apos;est une <strong>Ferrari sans essence</strong>. Un site
              avec 200 articles mais qui charge en 8 secondes sur mobile, c&apos;est
              un <strong>tracteur dans un Grand Prix</strong>. Les deux échouent.
              Google récompense les sites qui ont à la fois la technique propre{" "}
              <em>et</em>{" "}le contenu profond.
            </p>

            <h3>Erreur 3 — Abandon après 3 mois</h3>
            <p>
              Le SEO se mesure sur <strong>6 à 18 mois</strong>, pas en semaines.
              Beaucoup de dirigeants coupent le projet au mois 3 parce qu&apos;ils ne
              voient pas encore de leads. C&apos;est la phase où Google indexe et
              évalue le site — les positions sérieuses arrivent <strong>après le mois
              6</strong>. Les PME qui ranquent en 2026 sont celles qui ont tenu 12
              mois de production continue.
            </p>

            <InlineCTA
              title="Audit SEO offert"
              text="Vous voulez savoir où vous en êtes avant d'investir ? MV Agency offre un audit SEO + marketing digital de 30 minutes, sans engagement. Vous repartez avec 3 actions concrètes à mener cette semaine."
              ctaLabel="Réserver l'audit"
              href="/contact"
            />

            <h2 id="methode-mv">C&apos;est quoi la méthode MV Agency en 6 étapes ?</h2>
            <p>
              Voici la méthode que nous appliquons avec chaque PME que nous
              accompagnons. Elle est volontairement <strong>séquentielle</strong>{" "}: on
              ne passe à l&apos;étape N+1 que quand l&apos;étape N est solide.
            </p>

            <ProcessSteps
              steps={[
                {
                  title: "Audit (technique + sémantique + concurrence)",
                  description: "On évalue l'état technique du site (Core Web Vitals, indexation, schemas), on cartographie les keywords sur lesquels les concurrents rankent, et on identifie les gaps. Livrable : un rapport de 15 pages avec priorités classées.",
                },
                {
                  title: "Cartographie keywords (volume × intent × difficulté)",
                  description: "Recherche complète des mots-clés que cherchent vos clients. Pour chaque keyword : volume mensuel, intent (info/transactionnel), difficulté (KD), priorité P1/P2/P3. C'est la base éditoriale pour 12 mois.",
                },
                {
                  title: "Architecture du site (silos, hubs, spokes)",
                  description: "Organisation des pages par thématique (silos), avec un article HUB par catégorie et 5-10 spokes interconnectés. Cette structure est ce que Google récompense en 2026.",
                },
                {
                  title: "Production éditoriale (rythme 2 articles/sem)",
                  description: "Production des articles selon le calendrier établi. Chaque article suit la structure GEO (AnswerBlock citable, H2 en questions, FAQ, données structurées). Rythme cible : 2 par semaine pour décoller en 6 mois.",
                },
                {
                  title: "SEO local + GBP (citations, NAP, reviews)",
                  description: "Optimisation de la fiche Google Business Profile, cohérence NAP (Name, Address, Phone) sur tous les annuaires, sollicitation d'avis clients. C'est la brique qui débloque le pack Maps Google.",
                },
                {
                  title: "IA + mesure (automatisation tracking, ajustement mensuel)",
                  description: "Mise en place des automatisations IA (chatbot qualification, scoring leads, reporting consolidé GSC/GA4/Ads/CRM) et revue mensuelle des KPIs avec ajustements éditoriaux sur les articles sous-performants.",
                },
              ]}
            />

            <h2 id="combien-ca-coute">Combien ça coûte ?</h2>
            <p>
              Voici les fourchettes réelles 2026 pour <strong>externaliser le
              marketing digital</strong>{" "}d&apos;une PME francophone. Ces chiffres
              correspondent à un accompagnement sérieux, pas à des prestations « SEO
              à 200 € par mois » qui n&apos;existent pas vraiment.
            </p>

            <ComparisonTable
              columns={["TPE (1-10 salariés)", "PME (10-50 salariés)", "ETI (50-250 salariés)"]}
              rows={[
                {
                  feature: "Budget mensuel",
                  values: ["500-1 500 €", "1 500-4 000 €", "4 000-10 000 €"],
                },
                {
                  feature: "Ce qui est couvert",
                  values: [
                    "SEO + GBP + 4 articles/mois",
                    "SEO + GBP + 8 articles/mois + LinkedIn + Ads",
                    "Stack complète + équipe hybride agence/interne",
                  ],
                },
                {
                  feature: "Délai premiers résultats",
                  values: ["6-9 mois", "4-7 mois", "3-6 mois"],
                },
              ]}
              caption="Fourchettes d'externalisation marketing digital — agence sérieuse, France/Belgique, 2026."
            />

            <Callout variant="info">
              <strong>Pourquoi ces fourchettes ?</strong>{" "}Le marketing digital est
              une <strong>discipline du temps long</strong>. Un consultant senior
              coûte 90 à 150 € de l&apos;heure. Pour produire 8 articles SEO + piloter
              une fiche GBP + lancer des campagnes Ads, il faut 30 à 50 heures par
              mois. C&apos;est ce qui explique le plancher autour de 1 500 € pour une
              PME. En dessous, vous achetez une signature, pas du travail.
            </Callout>

            <h2 id="roi">Comment mesurer le ROI du marketing digital ?</h2>
            <p>
              Le marketing digital se pilote avec des chiffres, pas avec des
              impressions. Voici les <strong>quatre KPIs à suivre</strong>{" "}chaque
              mois pour savoir si l&apos;investissement paie.
            </p>

            <StatHighlight
              value="× 3"
              label="TRAFIC ORGANIQUE EN 12 MOIS"
              description="Croissance cible visée pour une PME qui démarre une stratégie SEO sérieuse, observée sur les accompagnements MV Agency 2024-2026."
              source="Observation MV Agency"
            />
            <StatHighlight
              value="3-5×"
              label="CAC SEO VS CAC ADS"
              description="Sur une PME mature (12 mois de SEO), le coût d'acquisition par lead via le trafic organique est 3 à 5 fois inférieur à celui d'une campagne Google Ads équivalente."
              source="Ratio observé MV Agency"
            />

            <h3>KPI 1 — Trafic organique vs payant (CAC vs CPC)</h3>
            <p>
              Comparez le <strong>coût par lead organique</strong>{" "}(budget total
              SEO ÷ leads issus de Google organique) au <strong>coût par lead
              payant</strong>{" "}(budget Ads ÷ leads issus de Google Ads). Sur une PME
              mature, le SEO est <strong>3 à 5 fois moins cher au lead</strong>. Si
              ce ratio n&apos;évolue pas après 9 mois, il y a un problème de stratégie
              ou d&apos;exécution.
            </p>

            <h3>KPI 2 — Positions sur les keywords star</h3>
            <p>
              Listez vos <strong>10 keywords commerciaux prioritaires</strong>{" "}et
              suivez leur évolution dans Google Search Console. Une bonne stratégie
              fait remonter au moins 6 d&apos;entre eux en page 1 sur 6 mois.
            </p>

            <h3>KPI 3 — Time to lead et time to conversion</h3>
            <p>
              Combien de temps entre la première visite et la prise de contact ?
              Entre la prise de contact et la signature ? Ces deux délais raccourcissent
              quand le funnel est bien optimisé. C&apos;est le signal qu&apos;on ne
              capte plus seulement du trafic, mais le bon trafic.
            </p>

            <h3>KPI 4 — Notoriété (avis Google + mentions externes)</h3>
            <p>
              Nombre d&apos;avis Google, score moyen, mentions de la marque dans la
              presse, sur LinkedIn, dans les annuaires sectoriels (Clutch, Sortlist,
              DesignRush). C&apos;est le signal <strong>E-E-A-T</strong>{" "}que Google
              et les IA utilisent pour vous citer dans les AI Overviews.
            </p>

            <PullQuote>
              MV Agency partage ces 4 KPIs avec ses clients dans un dashboard partagé
              mis à jour chaque mois. Pas de boîte noire, pas de jargon — juste les
              chiffres qui décident.
            </PullQuote>

            <p>
              Vous voulez piloter votre marketing digital avec cette rigueur ?{" "}
              <a href="/contact">Réservez un appel découverte de 30 minutes</a>. On
              regarde votre situation, on identifie les 2-3 leviers prioritaires, et
              vous repartez avec un plan d&apos;action — qu&apos;on travaille ensemble
              ou pas.
            </p>
          </article>

          <FAQ items={faqItems} title="Vos questions sur le SEO et le marketing digital" />

          <RelatedArticles currentSlug={SLUG} pillar={ARTICLE.pillar} />

          <section className={styles.ctaFinal}>
            <h2 className={styles.ctaFinalTitle}>
              Prêt à lancer votre <span className="globalGradientWord">stratégie</span> ?
            </h2>
            <p className={styles.ctaFinalText}>
              30 minutes offertes pour échanger sur votre marketing digital et identifier
              les 2-3 leviers prioritaires. Sans engagement, sans pitch commercial.
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
