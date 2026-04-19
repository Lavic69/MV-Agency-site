import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'magic';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  const variantClass = styles[variant] || styles.primary;

  // Animated text structure (letter by letter wave)
  const animatedText = React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return (
        <span className={styles.rollupWrapper}>
          {child.split('').map((char, i) => (
            <span 
              key={i} 
              className={styles.charWrapper} 
              style={{ transitionDelay: `${i * 0.02}s` }}
            >
              <span className={styles.charVisible}>{char === ' ' ? '\u00A0' : char}</span>
              <span className={styles.charHidden}>{char === ' ' ? '\u00A0' : char}</span>
            </span>
          ))}
        </span>
      );
    }
    return child;
  });

  if (variant === 'primary' || variant === 'magic') {
    return (
      <button className={`${styles.button} ${variantClass} ${className || ''}`} {...props}>
        <span className={styles.primaryContent}>{animatedText}</span>
      </button>
    );
  }

  return (
    <button className={`${styles.button} ${variantClass} ${className || ''}`} {...props}>
      {animatedText}
    </button>
  );
};
