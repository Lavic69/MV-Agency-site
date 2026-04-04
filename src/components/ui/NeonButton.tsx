import React from 'react';
import { motion } from 'framer-motion';
import styles from './NeonButton.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'solid' | 'ghost';
  size?: 'defaultSize' | 'sm' | 'lg';
  neon?: boolean;
  animatedBorder?: boolean;
}

export const NeonButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', neon = true, animatedBorder = false, size = 'defaultSize', variant = 'default', children, ...props }, ref) => {
    
    const classes = [
      styles.btn,
      styles[variant],
      styles[size],
      className
    ].filter(Boolean).join(' ');

    return (
      <button className={classes} ref={ref} {...props}>
        {neon && <span className={styles.neonTop} />}
        
        {animatedBorder && (
          <div className={styles.animatedBorderMask}>
            <motion.div
              className={styles.animatedTrace}
              animate={{
                offsetDistance: ["0%", "100%"],
              }}
              style={{
                width: 30,
                offsetPath: `rect(0 auto auto 0 round 9999px)`,
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "linear",
              }}
            />
          </div>
        )}

        <span className={styles.content}>{children}</span>
        {neon && <span className={styles.neonBottom} />}
      </button>
    );
  }
);

NeonButton.displayName = 'NeonButton';
