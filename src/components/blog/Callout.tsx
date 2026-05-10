import React from "react";
import { AlertTriangle, Lightbulb, Info } from "lucide-react";
import styles from "./Article.module.css";

export type CalloutVariant = "warning" | "tip" | "info";

interface CalloutProps {
  variant: CalloutVariant;
  label?: string;
  children: React.ReactNode;
}

const VARIANT_CONFIG: Record<CalloutVariant, { Icon: React.ComponentType<{ size?: number; className?: string }>; defaultLabel: string; className: string; labelClassName: string }> = {
  warning: {
    Icon: AlertTriangle,
    defaultLabel: "PIÈGE À ÉVITER",
    className: "calloutWarn",
    labelClassName: "calloutLabelWarn",
  },
  tip: {
    Icon: Lightbulb,
    defaultLabel: "ASTUCE",
    className: "calloutTip",
    labelClassName: "calloutLabelTip",
  },
  info: {
    Icon: Info,
    defaultLabel: "À NOTER",
    className: "calloutInfo",
    labelClassName: "calloutLabelInfo",
  },
};

export const Callout: React.FC<CalloutProps> = ({ variant, label, children }) => {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.Icon;
  return (
    <aside className={`${styles.callout} ${styles[config.className]}`}>
      <Icon size={18} className={styles.calloutIcon} aria-hidden="true" />
      <div className={styles.calloutContent}>
        <div className={`${styles.calloutLabel} ${styles[config.labelClassName]}`}>— {label ?? config.defaultLabel}</div>
        <div className={styles.calloutText}>{children}</div>
      </div>
    </aside>
  );
};
