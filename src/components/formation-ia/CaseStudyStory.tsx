import { formationIACommon } from "@/data/formation-ia-content";
import styles from "./CaseStudyStory.module.css";

/**
 * Case study: 2-column split layout.
 *
 * LEFT: a faux-screenshot of a Claude conversation, drawn purely in CSS
 * (no images). Decorative; conveys "this is what the client now does daily".
 *
 * RIGHT: three numbered narrative blocks (Avant / Notre intervention /
 * Après) stacked top-to-bottom, each prefixed with a primary-400 numeral.
 *
 * The mockup wraps below the narrative on mobile.
 */

const SECTION_TITLE = "Un cas client concret";
const SECTION_INTRO =
  "Un dirigeant de PME qui voulait passer la vitesse supérieure avec Claude.";

const BLOCK_LABELS = ["Avant", "Notre intervention", "Après"] as const;

function renderBold(text: string) {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );
}

function CaseStudyMockup() {
  return (
    <div
      className={styles.mockup}
      role="img"
      aria-label="Aperçu d'une conversation Claude utilisée au quotidien"
    >
      <div className={styles.mockupChrome}>
        <span className={styles.mockupDot} />
        <span className={styles.mockupDot} />
        <span className={styles.mockupDot} />
        <span className={styles.mockupTitle}>Claude</span>
      </div>
      <div className={styles.mockupBody}>
        <div className={`${styles.bubble} ${styles.bubbleUser}`}>
          <span className={styles.bubbleRole}>Vous</span>
          <span className={styles.bubbleText}>
            Génère un compte-rendu de la réunion de 14h.
          </span>
        </div>
        <div className={`${styles.bubble} ${styles.bubbleAi}`}>
          <span className={styles.bubbleRole}>Claude</span>
          <span className={styles.bubbleText}>
            Voici 3 points clés et 5 action items.
          </span>
        </div>
        <div className={styles.mockupHint} aria-hidden="true">
          ●●●
        </div>
      </div>
    </div>
  );
}

export function CaseStudyStory() {
  const c = formationIACommon.caseStudy;
  const blocks = [c.avant, c.intervention, c.apres];

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>{c.eyebrow}</span>
        <h2 className={styles.title}>{SECTION_TITLE}</h2>
        <p className={styles.intro}>{SECTION_INTRO}</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.mockupCol}>
          <CaseStudyMockup />
        </div>

        <ol className={styles.steps}>
          {blocks.map((body, i) => (
            <li key={BLOCK_LABELS[i]} className={styles.step}>
              <span className={styles.stepNum} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={styles.stepContent}>
                <p className={styles.stepLabel}>{BLOCK_LABELS[i]}</p>
                <div className={styles.stepBody}>{renderBold(body)}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
