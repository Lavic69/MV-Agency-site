"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

/**
 * Rend le markdown gras inline (`**texte**`) en `<strong>` pour éviter
 * d'afficher les astérisques en clair. Les réponses FAQ stockent du gras
 * pour mettre en valeur les termes clés ; le JSON-LD le strippe de son côté
 * via `stripMarkdown` (cf. buildFaqPageSchema).
 */
const renderAnswer = (answer: string) =>
  answer.split(/(\*\*.+?\*\*)/g).map((part, i) => {
    const bold = part.match(/^\*\*(.+?)\*\*$/);
    return bold ? (
      <strong key={i} style={{ color: "var(--text-light)", fontWeight: 600 }}>
        {bold[1]}
      </strong>
    ) : (
      part
    );
  });

const AccordionItem = ({ question, answer, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
      <button 
        onClick={onClick} 
        style={{ 
          width: "100%", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          padding: "1.5rem 0", 
          background: "none", 
          border: "none", 
          color: "var(--text-light)", 
          fontSize: "1.2rem", 
          fontFamily: "var(--font-heading)",
          fontWeight: 600,
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ display: "inline-block", color: "var(--primary)", fontSize: "1.5rem" }}
        >
          +
        </motion.span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: "1.5rem", color: "var(--accent)", lineHeight: 1.6 }}>
              {renderAnswer(answer)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
