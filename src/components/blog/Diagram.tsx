import React from "react";
import styles from "./Diagram.module.css";

export type DiagramNode = {
  label: string;
  num?: string;
  sub?: string;
};

type LinearDiagram = {
  variant: "linear";
  nodes: DiagramNode[];
  caption?: string;
};

type CircularDiagram = {
  variant: "circular";
  centerLabel: string;
  nodes: DiagramNode[]; // 4 max — placés N/E/S/O
  caption?: string;
};

type HierarchyDiagram = {
  variant: "hierarchy";
  root: DiagramNode;
  children: DiagramNode[];
  caption?: string;
};

export type FunnelRow = { label: string; value: string };

type FunnelDiagram = {
  variant: "funnel";
  rows: FunnelRow[]; // 3-5 max
  caption?: string;
};

export type QuadrantCell = { title: string; description: string; highlight?: boolean };

type QuadrantDiagram = {
  variant: "quadrant";
  xLabels: [string, string];
  yLabels: [string, string];
  cells: [QuadrantCell, QuadrantCell, QuadrantCell, QuadrantCell]; // top-left, top-right, bottom-left, bottom-right
  caption?: string;
};

type DiagramProps = (LinearDiagram | CircularDiagram | HierarchyDiagram | FunnelDiagram | QuadrantDiagram) & {
  showLabel?: boolean; // défaut: true
};

const FUNNEL_ROW_CLASSES = [
  styles.funRow1,
  styles.funRow2,
  styles.funRow3,
  styles.funRow4,
  styles.funRow5,
];

const CIRCULAR_POSITION_CLASSES = [
  styles.circNodeTop,
  styles.circNodeRight,
  styles.circNodeBottom,
  styles.circNodeLeft,
];

export const Diagram: React.FC<DiagramProps> = (props) => {
  const showLabel = props.showLabel !== false;

  return (
    <figure className={styles.wrap}>
      {showLabel && <div className={styles.label}>— variant: &quot;{props.variant}&quot;</div>}

      {props.variant === "linear" && (
        <div className={styles.linear}>
          {props.nodes.map((node, i) => (
            <React.Fragment key={i}>
              <div className={`${styles.linNode} ${i % 2 === 1 ? styles.linNodeAlt : ""}`}>
                {node.num && <div className={styles.linNodeNum}>{node.num}</div>}
                <div className={styles.linNodeLabel}>{node.label}</div>
              </div>
              {i < props.nodes.length - 1 && <div className={styles.linArrow} aria-hidden="true">→</div>}
            </React.Fragment>
          ))}
        </div>
      )}

      {props.variant === "circular" && (
        <div className={styles.circular}>
          <svg className={styles.circSvg} viewBox="0 0 400 280" aria-hidden="true">
            <circle cx="200" cy="140" r="100" fill="none" stroke="rgba(96,165,250,0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>
          {props.nodes.slice(0, 4).map((node, i) => (
            <div key={i} className={`${styles.circNode} ${CIRCULAR_POSITION_CLASSES[i]}`}>
              {node.num && <div className={styles.circNodeNum}>{node.num}</div>}
              <div className={styles.circNodeLabel}>{node.label}</div>
            </div>
          ))}
          <div className={styles.circCenter}>
            <div className={styles.circCenterText}>{props.centerLabel}</div>
          </div>
        </div>
      )}

      {props.variant === "hierarchy" && (
        <div className={styles.hierarchy}>
          <div className={styles.hierRow}>
            <div className={`${styles.hierNode} ${styles.hierNodeRoot}`}>
              <div className={styles.hierNodeLabel}>{props.root.label}</div>
              {props.root.sub && <div className={styles.hierNodeSub}>{props.root.sub}</div>}
            </div>
          </div>
          <div className={`${styles.hierRow} ${styles.hierRowChildren}`}>
            {props.children.map((child, i) => (
              <div key={i} className={styles.hierNode}>
                <div className={styles.hierNodeLabel}>{child.label}</div>
                {child.sub && <div className={styles.hierNodeSub}>{child.sub}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {props.variant === "funnel" && (
        <div className={styles.funnel}>
          {props.rows.slice(0, 5).map((row, i) => (
            <div key={i} className={`${styles.funRow} ${FUNNEL_ROW_CLASSES[i]}`}>
              <div className={styles.funContent}>
                <div className={styles.funLabel}>{row.label}</div>
                <div className={styles.funValue}>{row.value}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {props.variant === "quadrant" && (
        <div className={styles.quadrant}>
          <div className={styles.quadCorner}></div>
          <div className={styles.quadXLabel}>{props.xLabels[0]}</div>
          <div className={styles.quadXLabel}>{props.xLabels[1]}</div>

          <div className={styles.quadYLabel}>{props.yLabels[0]}</div>
          <div className={`${styles.quadCell} ${props.cells[0].highlight ? styles.quadCellHighlight : ""}`}>
            <div className={styles.quadTitle}>{props.cells[0].title}</div>
            <div className={styles.quadDesc}>{props.cells[0].description}</div>
          </div>
          <div className={`${styles.quadCell} ${props.cells[1].highlight ? styles.quadCellHighlight : ""}`}>
            <div className={styles.quadTitle}>{props.cells[1].title}</div>
            <div className={styles.quadDesc}>{props.cells[1].description}</div>
          </div>

          <div className={styles.quadYLabel}>{props.yLabels[1]}</div>
          <div className={`${styles.quadCell} ${props.cells[2].highlight ? styles.quadCellHighlight : ""}`}>
            <div className={styles.quadTitle}>{props.cells[2].title}</div>
            <div className={styles.quadDesc}>{props.cells[2].description}</div>
          </div>
          <div className={`${styles.quadCell} ${props.cells[3].highlight ? styles.quadCellHighlight : ""}`}>
            <div className={styles.quadTitle}>{props.cells[3].title}</div>
            <div className={styles.quadDesc}>{props.cells[3].description}</div>
          </div>
        </div>
      )}

      {props.caption && <figcaption className={styles.caption}>{props.caption}</figcaption>}
    </figure>
  );
};
