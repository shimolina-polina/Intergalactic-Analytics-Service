import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'disabled' | 'download' | 'clear';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: ButtonVariant;
}

export default function Button ({
  text,
  onClick,
  variant = 'primary',
} : ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      type='button'
      disabled={variant === 'disabled'}
    >
      {text}
    </button>
  );
};

