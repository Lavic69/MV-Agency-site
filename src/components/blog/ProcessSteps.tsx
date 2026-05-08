import React from "react";
import styles from "./Article.module.css";

interface Step {
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: Step[];
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps }) => {
  return (
    <ol className={styles.steps} role="list">
      {steps.map((step, i) => (
        <li className={styles.stepRow} key={i}>
          <div className={styles.stepNum} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </div>
          <div className={styles.stepContent}>
            <h6 className={styles.stepTitle}>{step.title}</h6>
            <p className={styles.stepDesc}>{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
};
