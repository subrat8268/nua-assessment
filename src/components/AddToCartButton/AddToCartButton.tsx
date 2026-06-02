import { useState } from 'react';
import styles from './AddToCartButton.module.scss';

interface Props {
  onAdd: () => void;
  disabled: boolean;
  text?: string;
}

export function AddToCartButton({ onAdd, disabled, text = 'Add to Cart' }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleClick = async () => {
    if (disabled || status === 'loading') return;

    setStatus('loading');

    // Mock async delay (1 second)
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 10% chance of random failure to demonstrate error state
          if (Math.random() < 0.1) {
            reject(new Error('Network error'));
          } else {
            resolve(true);
          }
        }, 1000);
      });

      onAdd();
      setStatus('success');
      
      // Reset after success
      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

  return (
    <button
      className={`${styles.button} ${styles[status]}`}
      onClick={handleClick}
      disabled={disabled || status === 'loading'}
    >
      {status === 'idle' && <span>{text}</span>}
      {status === 'loading' && <span className={styles.spinner} />}
      {status === 'success' && <span>Added to Cart ✓</span>}
      {status === 'error' && <span>Failed. Try again</span>}
    </button>
  );
}
