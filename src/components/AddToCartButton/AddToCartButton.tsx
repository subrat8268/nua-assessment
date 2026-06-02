import { useState } from 'react';
import { useToast } from '../../stores/ToastContext';
import styles from './AddToCartButton.module.scss';

interface Props {
  onAdd: () => void;
  disabled: boolean;
  text?: string;
}

export function AddToCartButton({ onAdd, disabled, text = 'Add to Cart' }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToast();

  const handleClick = async () => {
    if (disabled || isLoading) return;
    setIsLoading(true);
    setFailed(false);
    setSuccess(false);
    
    await new Promise(res => setTimeout(res, 800));
    
    if (Math.random() < 0.2) {
      setFailed(true);
      setIsLoading(false);
      addToast('Connection timeout. Failed to add item to cart.', 'error');
      return;
    }
    
    onAdd();
    setSuccess(true);
    setIsLoading(false);
    addToast('Item added to cart successfully!', 'success');
    
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  const buttonClass = `${styles.button} ${
    isLoading ? styles.loading : success ? styles.success : failed ? styles.error : ''
  }`;

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {isLoading && (
        <span className={styles.loaderContent}>
          <span className={styles.spinner} />
          <span>Adding...</span>
        </span>
      )}
      {success && <span>Added!</span>}
      {failed && <span>Try again</span>}
      {!isLoading && !success && !failed && <span>{text}</span>}
    </button>
  );
}
