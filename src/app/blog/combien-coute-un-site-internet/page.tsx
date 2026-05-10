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
  Diagram,
} from "@/components/blog";
import { Button } from "@/components/ui/Button";
import {
  SITE_URL,
  buildArticleSchema,
  buildFaqPageSchema,
  buildBreadcrumbSchema,
  type FaqItem,
} from "@/lib/seo";
import { getArticleBySlug, getArticleNumber, PILLAR_LABEL } from "@/app/blog/_articles";
import styles from "@/components/blog/Article.module.css";

const SLUG = "combien-coute-un-site-internet";
const _ARTICLE = getArticleBySlug(SLUG);
if (!_ARTICLE) {
  throw new Error(`[blog] No article found for slug "${SLUG}". Check src/app/blog/_articles.ts.`);
}
const ARTICLE = _ARTICLE;
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: ARTICLE.title,
  description: ARTICLE.description,
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    type: "article",
    title: ARTICLE.title,
    description: ARTICLE.description,
    url: URL,
    publishedTime: ARTICLE.publishedAt,
    modifiedTime: ARTICLE.updatedAt,
  },
  twitter: {
    card: "summary_large_image",
    title: ARTICLE.title,
    description: ARTICLE.description,
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Accueil", url: SITE_URL },
  { name: "Blog", url: `${SITE_URL}/blog` },
  { name: ARTICLE.title, url: URL },
]);

const faqItems: FaqItem[] = [
  {
    question: "Quel est le prix moyen d'un site internet vitrine en 2026 ?",
    answer:
      "Pour un site vitrine professionnel de 5 à 7 pages, comptez entre 1 900 € et 4 000 € selon le degré de personnalisation du design, le CMS choisi, et le niveau d'optimisation SEO à la racine. En dessous de 1 500 €, on parle généralement de templates pré-faits avec personnalisation limitée. Au-dessus de 4 000 €, on entre sur des architectures sur-mesure avec automatisations.",
  },
  {
    question: "Combien coûte un site e-commerce en 2026 ?",
    answer:
      "Un site e-commerce sur-mesure démarre autour de 6 000 € et peut monter à 15 000 € ou plus selon le nombre de produits, les passerelles de paiement, les intégrations CRM/ERP et les automatisations. Sur Shopify ou WooCommerce avec un thème personnalisé, on peut descendre à 3 500-5 000 € pour un catalogue simple.",
  },
  {
    question: "Quels sont les coûts cachés d'un site internet ?",
    answer:
      "Les principaux coûts récurrents sont le nom de domaine (10-50 €/an), l'hébergement (60-300 €/an pour un site vitrine, plus pour de l'e-commerce), les licences logicielles éventuelles (thèmes, plugins, API IA), la maintenance technique (mises à jour, sécurité, sauvegardes) et la production de contenu (textes, photos, vidéos). Certaines agences facturent aussi des frais de licence sur leur propre code — chez MV Agency, vous êtes propriétaire à 100 % à la livraison.",
  },
  {
    question: "Pourquoi un site Next.js coûte-t-il plus cher qu'un site WordPress ?",
    answer:
      "Un site Next.js demande des compétences de développement plus pointues qu'un site WordPress assemblé avec des plugins. Le tarif est donc supérieur sur la création initiale, mais les bénéfices à long terme sont significatifs : performance (Core Web Vitals supérieurs, score Lighthouse autour de 95-100), sécurité (architecture découplée, pas de plugins vulnérables), pérennité (le code reste valide 5 à 10 ans sans dette technique). Le retour sur investissement se mesure sur la durée.",
  },
  {
    question: "Faut-il un acompte pour démarrer un projet de site web ?",
    answer:
      "Oui, c'est la pratique standard. Chez MV Agency, l'acompte est de 30 % à la commande, le solde à la livraison ou selon un échéancier convenu au devis. L'acompte sécurise le démarrage des travaux et engage les deux parties. Aucun acompte n'est demandé tant que le devis n'est pas signé.",
  },
  {
    question: "Combien de temps pour créer un site internet ?",
    answer:
      "Un site vitrine classique prend 3 à 4 semaines de la signature du devis à la mise en ligne. Un site avec automatisations clés (CRM, emailing, chatbot IA) compte 5 à 6 semaines. Pour un e-commerce ou une plateforme sur-mesure, comptez 6 à 8 semaines. Les délais dépendent en grande partie de la rapidité avec laquelle vous fournissez les contenus (textes, images, validations).",
  },
  {
    question: "Pourquoi MV Agency n'affiche pas ses prix exacts en ligne ?",
    answer:
      "Parce qu'un site pour un dentiste n'a pas le même périmètre qu'un site e-commerce, et que vendre un pack catalogue qui ne correspond pas à votre réalité serait malhonnête. Nous proposons trois packs avec des tarifs de départ — Fondation, Croissance, Performance IA — mais le périmètre exact se cadre lors d'un appel découverte gratuit de 30 minutes. Aucun coût caché, aucun devis surprise, aucun engagement.",
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
    "prix site internet",
    "tarif site web 2026",
    "coût site vitrine",
    "prix site e-commerce",
    "création site internet prix",
    "agence web tarif",
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
        readingTime={ARTICLE.readingTime ?? 12}
      />

      <div className={styles.articleLayout}>
        <ArticleSidebar tocItems={ARTICLE.tocItems} takeaways={ARTICLE.takeaways} />

        <div className={styles.articleContent}>
          <AnswerBlock>
            Un site internet professionnel coûte entre <strong>1 500 € et 8 000 €</strong> en
            2026 selon trois facteurs principaux : le <strong>type de site</strong>{" "}
            (vitrine, automatisé, e-commerce), le <strong>degré de personnalisation</strong>{" "}
            (template vs design sur-mesure) et la <strong>stack technique</strong>{" "}
            (WordPress vs Next.js). Une vitrine premium démarre à 1 900 €, un site avec
            automatisations à 4 000 €, un e-commerce sur-mesure à 6 000 €. Au-delà de
            l&apos;investissement initial, le vrai coût se mesure sur 3 ans : un site mal conçu
            coûte le double en maintenance et refonte. Cet article détaille les fourchettes
            par type de projet, les cinq variables qui font bouger le prix, et la fourchette
            de coûts récurrents (domaine, hébergement, maintenance) à anticiper.
          </AnswerBlock>

          <article>
            <h2 id="de-quoi-parle-t-on">De quoi parle-t-on quand on dit « site internet » ?</h2>
            <p>
              Le mot « site » couvre des réalités très différentes, et c&apos;est précisément
              pour ça qu&apos;il est difficile d&apos;annoncer un prix unique. Un site vitrine de cinq
              pages pour un cabinet dentaire, une boutique e-commerce avec deux mille
              références, et une plateforme SaaS B2B sur-mesure n&apos;ont rien à voir techniquement
              — ni en délai, ni en prix.
            </p>
            <p>
              Avant toute estimation, il faut classer le projet dans une de ces grandes
              familles :
            </p>
            <ul>
              <li>
                <strong>Site vitrine premium</strong> : 5 à 10 pages, présentation de
                l&apos;entreprise et des services, formulaire de contact, optimisation SEO de
                base. Pas d&apos;espace client, pas de paiement.
              </li>
              <li>
                <strong>Site vitrine + automatisations</strong> : la même chose plus une
                intégration CRM, un chatbot IA, un système de prise de rendez-vous, des
                emails déclenchés automatiquement.
              </li>
              <li>
                <strong>E-commerce</strong> : catalogue produits, panier, paiement
                sécurisé, gestion des commandes, suivi de livraison.
              </li>
              <li>
                <strong>Plateforme sur-mesure</strong> : application web avec gestion
                d&apos;utilisateurs, base de données complexe, fonctionnalités métier
                spécifiques (réservation, marketplace, SaaS).
              </li>
            </ul>
            <p>
              Chaque famille a son propre intervalle de prix, qu&apos;on détaille section après
              section.
            </p>

            <h2 id="site-vitrine">Combien coûte un site vitrine en 2026 ?</h2>
            <p>
              Pour un site vitrine professionnel, la fourchette réaliste en 2026 est de{" "}
              <strong>1 900 € à 4 000 €</strong>. En dessous de 1 500 €, on entre dans les
              territoires des templates pré-faits avec personnalisation très limitée — c&apos;est
              parfois suffisant pour démarrer mais ça vieillit vite et la cohérence visuelle
              n&apos;est pas toujours au rendez-vous.
            </p>
            <p>
              Chez MV Agency, on propose trois packs avec des périmètres clairement définis.
              Voici comment ils se comparent :
            </p>

            <ComparisonTable
              columns={["Fondation", "Croissance", "Performance IA"]}
              rows={[
                { feature: "Pages incluses", values: ["jusqu'à 5", "jusqu'à 10", "illimité"] },
                { feature: "Design responsive sur-mesure", values: [true, true, true] },
                { feature: "SEO racine + Analytics", values: [true, true, true] },
                { feature: "Chatbot IA intelligent", values: [false, true, true], highlight: true },
                { feature: "Génération contenu IA", values: [false, true, true] },
                { feature: "E-commerce ou SaaS", values: [false, false, true] },
                { feature: "Tarif de départ", values: ["1 900 €", "4 000 €", "6 000 €"] },
              ]}
              caption="Comparatif des 3 packs MV Agency (2026)"
            />

            <h2 id="automatisations-ia">Combien coûte un site avec automatisations ou IA ?</h2>
            <p>
              Quand on ajoute des automatisations sérieuses (CRM, emailing déclenché,
              chatbot IA, contenu assisté par intelligence artificielle), la fourchette
              monte naturellement. Le pack <strong>Croissance digitale</strong> de MV Agency
              démarre à 4 000 € et structure votre acquisition de A à Z : site avancé
              jusqu&apos;à 10 pages, SEO profond, landing page de conversion, automatisations
              clés en main, chatbot IA intelligent, génération de contenu assistée et
              formation marketing.
            </p>
            <p>
              La différence avec une vitrine simple n&apos;est pas seulement esthétique. Une
              automatisation bien conçue peut représenter <strong>4 à 8 heures gagnées
              chaque semaine</strong> sur des tâches répétitives — saisie de leads,
              relances, qualification. Sur 12 mois, ce gain rentabilise l&apos;investissement
              plus rapidement qu&apos;un site purement décoratif.
            </p>

            <StatHighlight
              value="94%"
              label="Première impression"
              description="des visiteurs jugent la crédibilité d'un site sur son design en moins de 50 ms."
              source="Stanford Web Credibility Project, 2024"
            />

            <h2 id="e-commerce">Combien coûte un site e-commerce en 2026 ?</h2>
            <p>
              Pour un e-commerce sur-mesure, la fourchette de départ est de <strong>6 000 €
              à 15 000 €</strong>, voire au-delà selon la complexité du catalogue, les
              intégrations CRM/ERP, les passerelles de paiement multiples ou les
              fonctionnalités d&apos;abonnement. Le pack <strong>Performance IA</strong> de
              MV Agency, qui démarre à 6 000 €, couvre l&apos;e-commerce ou la plateforme
              sur-mesure avec un écosystème IA complet et des automatisations avancées.
            </p>
            <p>
              Pour des projets plus simples sur Shopify ou WooCommerce avec un thème
              personnalisé, on peut descendre à 3 500 à 5 000 € — mais le coût technique
              diminué se compense souvent par des frais de plateforme récurrents (Shopify
              facture entre 36 € et 432 € par mois selon le plan).
            </p>

            <InlineCTA
              title="Pas encore sûr du périmètre ?"
              text="On cadre ensemble en 30 minutes. Appel offert, sans engagement, pour identifier ce qui aurait du sens dans votre cas."
              ctaLabel="Réserver un appel offert"
              href="/contact"
            />

            <h2 id="5-facteurs">Quels sont les 5 facteurs qui font varier le prix ?</h2>
            <p>
              À périmètre fonctionnel équivalent, cinq variables expliquent l&apos;essentiel des
              écarts de prix entre devis :
            </p>
            <ol>
              <li>
                <strong>Le nombre de pages</strong> — chaque page rédigée et designée prend
                du temps. Passer de 5 à 15 pages double souvent l&apos;effort sans doubler
                forcément la valeur.
              </li>
              <li>
                <strong>Le degré de personnalisation visuelle</strong> — un design 100 %
                sur-mesure (illustrations, micro-interactions, mockups) coûte
                significativement plus qu&apos;un thème adapté.
              </li>
              <li>
                <strong>La stack technique choisie</strong> — Next.js demande plus de
                compétences que WordPress, mais offre des performances et une sécurité
                supérieures. Le bon choix dépend du contexte.
              </li>
              <li>
                <strong>Les intégrations tierces</strong> — connecter un CRM, un outil
                d&apos;emailing, un système de paiement, une API IA, chacune de ces
                intégrations ajoute du temps de développement et de tests.
              </li>
              <li>
                <strong>La rédaction et la production de contenu</strong> — fournir vos
                textes et images réduit le coût. Si l&apos;agence doit les produire (copywriting,
                shooting photo, vidéo), comptez 500 à 3 000 € additionnels.
              </li>
            </ol>

            <h2 id="couts-recurrents">Quels sont les coûts récurrents à prévoir ?</h2>
            <p>
              Au-delà du devis initial, votre site génère des frais récurrents annuels qu&apos;il
              faut intégrer dans votre plan financier :
            </p>
            <ul>
              <li>
                <strong>Nom de domaine</strong> — entre 10 € et 50 € par an selon
                l&apos;extension et le registrar.
              </li>
              <li>
                <strong>Hébergement</strong> — 60 à 300 € par an pour un site vitrine
                (Vercel, Netlify, OVH), bien plus pour de l&apos;e-commerce avec trafic.
              </li>
              <li>
                <strong>Licences logicielles</strong> — thèmes WordPress premium, plugins,
                API IA (OpenAI, Anthropic) : variable selon les choix techniques.
              </li>
              <li>
                <strong>Maintenance technique</strong> — mises à jour de sécurité,
                sauvegardes, monitoring. À budgéter à 50-150 € par mois pour un site qui
                tourne en production.
              </li>
              <li>
                <strong>Production de contenu</strong> — si vous publiez régulièrement
                (blog SEO, articles métier), prévoyez du temps interne ou un budget de
                rédaction.
              </li>
            </ul>
            <PullQuote>
              Sur 3 ans, les coûts récurrents totalisent souvent l&apos;équivalent d&apos;un tiers à
              la moitié du devis initial — un détail que les comparaisons rapides oublient.
            </PullQuote>

            <h2 id="moins-cher">Pourquoi le « moins cher » coûte souvent le plus cher ?</h2>
            <p>
              Le piège classique : choisir le devis le plus bas et payer la différence en
              maintenance, refonte ou perte d&apos;opportunité.
            </p>

            <Callout variant="warning" label="PIÈGE FRÉQUENT">
              Trois schémas reviennent chez les clients qui ont déjà eu une mauvaise expérience : <strong>site illisible sur mobile</strong> six mois après la livraison, <strong>refonte intégrale après deux ans</strong> faute d&apos;optimisation, <strong>licence d&apos;utilisation</strong> facturée chaque année sur le code de l&apos;agence. Comparez le coût total sur 3 ans, pas le devis seul, et vérifiez qui détient la propriété du code à la livraison.
            </Callout>

            <h2 id="devis-fiable">Comment obtenir un devis fiable en 4 étapes ?</h2>
            <p>
              La méthode qui fonctionne, peu importe l&apos;agence, tient en quatre étapes.
              Avant de les détailler, voici le workflow type d&apos;un projet web bien cadré :
            </p>

            <Diagram
              variant="linear"
              nodes={[
                { num: "01", label: "Brief" },
                { num: "02", label: "Devis" },
                { num: "03", label: "Design" },
                { num: "04", label: "Dev" },
                { num: "05", label: "Live" },
              ]}
              caption="Workflow d'un projet web type"
            />

            <p>
              Aucune des 4 étapes ne demande d&apos;expertise technique, mais toutes sont
              indispensables pour comparer des devis qui veulent dire la même chose.
            </p>

            <ProcessSteps
              steps={[
                {
                  title: "Préparer un brief court mais précis",
                  description:
                    "Objectif principal, public cible, fonctionnalités attendues, inspirations visuelles, deadline souhaitée.",
                },
                {
                  title: "Demander 3 devis comparables",
                  description:
                    "Mêmes spécifications à chaque agence pour éviter les pommes vs poires.",
                },
                {
                  title: "Comparer le coût total sur 3 ans",
                  description:
                    "Pas seulement le devis initial — inclure maintenance, hébergement, licences récurrentes.",
                },
                {
                  title: "Vérifier la propriété du code",
                  description:
                    "Le code doit vous appartenir 100 % à la livraison. Pas de licence d'utilisation cachée.",
                },
              ]}
            />

            <p>
              Chez MV Agency, l&apos;appel découverte de 30 minutes sert exactement à ça : on
              cadre ensemble le périmètre, on identifie ce qui apporte de la valeur, on
              écarte ce qui n&apos;en apporte pas. Vous repartez avec une fourchette de prix
              précise et un calendrier de livraison réaliste, sans avoir à signer quoi que
              ce soit.
            </p>
          </article>

          <FAQ items={faqItems} title="Vos questions sur le prix d'un site internet" />

          <RelatedArticles currentSlug={SLUG} pillar={ARTICLE.pillar} />

          <section className={styles.ctaFinal}>
            <h2 className={styles.ctaFinalTitle}>
              Prêt à cadrer votre <span className="globalGradientWord">projet</span> ?
            </h2>
            <p className={styles.ctaFinalText}>
              30 minutes offertes pour échanger sur votre projet et obtenir une fourchette
              de prix précise. Sans engagement, sans devis surprise.
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
