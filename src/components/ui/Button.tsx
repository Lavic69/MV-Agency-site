import React from 'react';
import styles from './Button.module.css';

type CommonButtonProps = {
  variant?: 'primary' | 'outline' | 'magic';
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = CommonButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonButtonProps | 'href'> & {
  href?: undefined;
};

type ButtonAsLink = CommonButtonProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonButtonProps | 'href'> & {
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...rest }) => {
  const variantClass = styles[variant] || styles.primary;
  const buttonClass = `${styles.button} ${variantClass} ${className || ''}`;

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
              <span className={styles.charVisible}>{char === ' ' ? ' ' : char}</span>
              <span className={styles.charHidden}>{char === ' ' ? ' ' : char}</span>
            </span>
          ))}
        </span>
      );
    }
    return child;
  });

  // Render as <a> when href is provided
  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    if (variant === 'primary' || variant === 'magic') {
      return (
        <a href={href} className={buttonClass} {...anchorRest}>
          <span className={styles.primaryContent}>{animatedText}</span>
        </a>
      );
    }
    return (
      <a href={href} className={buttonClass} {...anchorRest}>
        {animatedText}
      </a>
    );
  }

  // Default: render as <button>
  const buttonRest = rest as ButtonAsButton;
  if (variant === 'primary' || variant === 'magic') {
    return (
      <button className={buttonClass} {...buttonRest}>
        <span className={styles.primaryContent}>{animatedText}</span>
      </button>
    );
  }

  return (
    <button className={buttonClass} {...buttonRest}>
      {animatedText}
    </button>
  );
};
