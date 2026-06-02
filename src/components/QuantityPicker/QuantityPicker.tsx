import { Minus, Plus } from 'lucide-react';
import styles from './QuantityPicker.module.scss';

interface Props {
  quantity: number;
  maxStock: number;
  onChange: (qty: number) => void;
  disabled?: boolean;
}

export function QuantityPicker({ quantity, maxStock, onChange, disabled = false }: Props) {
  const handleDecrement = () => {
    if (quantity > 1) onChange(quantity - 1);
  };

  const handleIncrement = () => {
    if (quantity < maxStock) onChange(quantity + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      if (val >= 1 && val <= maxStock) {
        onChange(val);
      } else if (val > maxStock) {
        onChange(maxStock);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.label}>Quantity</h3>
      <div className={`${styles.picker} ${disabled ? styles.disabled : ''}`}>
        <button
          className={styles.btn}
          onClick={handleDecrement}
          disabled={disabled || quantity <= 1}
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </button>
        <input
          type="number"
          className={styles.input}
          value={quantity}
          onChange={handleInputChange}
          disabled={disabled}
          min={1}
          max={maxStock}
          aria-label="Quantity"
        />
        <button
          className={styles.btn}
          onClick={handleIncrement}
          disabled={disabled || quantity >= maxStock}
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}
