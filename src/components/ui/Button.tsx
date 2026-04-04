import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  const variantClass = styles[variant] || styles.primary;
  return (
    <button className={`${styles.button} ${variantClass} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};
