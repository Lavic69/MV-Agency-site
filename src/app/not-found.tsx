"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import styles from "./NotFound.module.css";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.glowBackground} />
      
      <motion.div 
        className={styles.contentBlock}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ position: 'relative', display: 'inline-block' }}
        >
          <h1 className={styles.errorCode}>
            404
          </h1>
        </motion.div>
        
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Page Introuvable
        </motion.h2>
        
        <motion.p 
          className={styles.description}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Il semblerait que vous vous soyez égaré en dehors de notre écosystème. 
          Rassurez-vous, l'intelligence artificielle est là pour vous guider vers le bon chemin.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/">
            <Button variant="primary" className={styles.staticButton}>
              <ArrowLeft size={20} />
              {"Retour à l'accueil"}
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
