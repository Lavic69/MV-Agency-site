"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  formationIACommon,
  generateMiniAuditReport,
  miniAuditTeamSizes,
  miniAuditPains,
  miniAuditLevels,
  miniAuditGoals,
  type MiniAuditAnswers,
  type MiniAuditTeamSize,
  type MiniAuditPain,
  type MiniAuditLevel,
  type MiniAuditGoal,
} from "@/data/formation-ia-content";
import styles from "./MiniAuditIA.module.css";

/**
 * MiniAuditIA V2: 5-question quiz mini-audit.
 *
 * Q1: dropdown (sector). Q2-Q5: button choices (team size, pain, level, goal).
 * Multi-step like DiagnosticIA: one question at a time with progress.
 * On completion, generateMiniAuditReport() produces a tailored mini-report
 * (profil, 3 axes, outils, gain). All client-side, no API calls.
 */

type StepIndex = 0 | 1 | 2 | 3 | 4;

interface PartialAnswers {
  sectorId?: string;
  teamSize?: MiniAuditTeamSize;
  pain?: MiniAuditPain;
  level?: MiniAuditLevel;
  goal?: MiniAuditGoal;
}

export function MiniAuditIA() {
  const c = formationIACommon.miniAudit;

  const [step, setStep] = useState<StepIndex>(0);
  const [answers, setAnswers] = useState<PartialAnswers>({});
  const [draftSector, setDraftSector] = useState<string>("");

  const total = 5;
  const done = step >= total;
  const isComplete =
    !!answers.sectorId &&
    !!answers.teamSize &&
    !!answers.pain &&
    !!answers.level &&
    !!answers.goal;

  function advance() {
    setStep((s) => (Math.min(s + 1, total) as StepIndex));
  }

  function submitSector() {
    if (!draftSector) return;
    setAnswers((prev) => ({ ...prev, sectorId: draftSector }));
    advance();
  }

  function choose<K extends keyof PartialAnswers>(
    key: K,
    value: NonNullable<PartialAnswers[K]>
  ) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    advance();
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setDraftSector("");
  }

  return (
    <div className={styles.shell}>
      <div className={styles.card}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>{c.eyebrow}</span>
          <h2 className={styles.title}>{c.title}</h2>
          <p className={styles.intro}>{c.intro}</p>
        </header>

        {done && isComplete ? (
          <MiniAuditReport
            answers={answers as MiniAuditAnswers}
            ctaHref={c.ctaAfter.href}
            ctaLabel={c.ctaAfter.label}
            onReset={reset}
          />
        ) : (
          <>
            <div
              className={styles.progress}
              aria-live="polite"
              aria-atomic="true"
            >
              Question {step + 1} / {total}
            </div>

            {step === 0 && (
              <>
                <h3 className={styles.question}>
                  Dans quel secteur évoluez-vous ?
                </h3>
                <label htmlFor="mini-audit-sector" className={styles.srOnly}>
                  Secteur d&apos;activité
                </label>
                <select
                  id="mini-audit-sector"
                  className={styles.select}
                  value={draftSector}
                  onChange={(e) => setDraftSector(e.target.value)}
                >
                  <option value="" disabled>
                    Choisir un secteur
                  </option>
                  {c.sectorOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className={styles.nextRow}>
                  <Button
                    type="button"
                    onClick={submitSector}
                    aria-disabled={!draftSector}
                    disabled={!draftSector}
                  >
                    Suivant
                  </Button>
                </div>
              </>
            )}

            {step === 1 && (
              <ChoiceQuestion
                title="Combien de personnes dans votre équipe ?"
                options={miniAuditTeamSizes}
                onChoose={(v) => choose("teamSize", v)}
              />
            )}

            {step === 2 && (
              <ChoiceQuestion
                title="Quelle tâche vous prend le plus de temps ?"
                options={miniAuditPains}
                onChoose={(v) => choose("pain", v)}
              />
            )}

            {step === 3 && (
              <ChoiceQuestion
                title="Votre niveau actuel avec l'IA ?"
                options={miniAuditLevels}
                onChoose={(v) => choose("level", v)}
              />
            )}

            {step === 4 && (
              <ChoiceQuestion
                title="Quel est votre objectif n°1 ?"
                options={miniAuditGoals}
                onChoose={(v) => choose("goal", v)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  ChoiceQuestion: shared button-list question for Q2-Q5                   */
/* ------------------------------------------------------------------------ */

interface ChoiceQuestionProps<T extends string> {
  title: string;
  options: { value: T; label: string }[];
  onChoose: (value: T) => void;
}

function ChoiceQuestion<T extends string>({
  title,
  options,
  onChoose,
}: ChoiceQuestionProps<T>) {
  return (
    <>
      <h3 className={styles.question}>{title}</h3>
      <div className={styles.choices} role="radiogroup" aria-label={title}>
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={false}
            className={styles.choice}
            onClick={() => onChoose(opt.value)}
          >
            <span className={styles.dot} aria-hidden="true" />
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------------ */
/*  MiniAuditReport: final rendered card with profil/axes/outils/gain       */
/* ------------------------------------------------------------------------ */

interface MiniAuditReportProps {
  answers: MiniAuditAnswers;
  ctaHref: string;
  ctaLabel: string;
  onReset: () => void;
}

function MiniAuditReport({
  answers,
  ctaHref,
  ctaLabel,
  onReset,
}: MiniAuditReportProps) {
  const report = generateMiniAuditReport(answers);

  return (
    <div className={styles.report}>
      <section className={styles.reportBlock}>
        <p className={styles.reportLabel}>Profil détecté</p>
        <p className={styles.reportProfil}>{report.profil}</p>
      </section>

      <section className={styles.reportBlock}>
        <p className={styles.reportLabel}>3 axes prioritaires pour vous</p>
        <ul className={styles.axesList}>
          {report.axes.map((axe, i) => (
            <li key={i} className={styles.axe}>
              {axe}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.reportBlock}>
        <p className={styles.reportLabel}>
          Outils que nous activerions sur votre cas
        </p>
        <ul className={styles.tools}>
          {report.outils.map((tool) => (
            <li key={tool} className={styles.tool}>
              {tool}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.reportBlock}>
        <p className={styles.reportLabel}>Estimation de gain potentiel</p>
        <p className={styles.gain}>{report.gain}</p>
      </section>

      <div className={styles.ctaRow}>
        <Button href={ctaHref}>
          {ctaLabel}
        </Button>
        <button type="button" onClick={onReset} className={styles.reset}>
          Refaire l&apos;audit
        </button>
      </div>

      <p className={styles.honesty}>
        Ceci est un échantillon basé sur 5 questions. L&apos;audit complet
        (gratuit, 30 min) ira beaucoup plus loin sur votre cas précis.
      </p>
    </div>
  );
}
