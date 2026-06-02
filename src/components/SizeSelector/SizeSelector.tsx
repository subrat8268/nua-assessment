import styles from './SizeSelector.module.scss';
import type { SizeOption } from '../../types';

interface Props {
  sizes: SizeOption[];
  selectedSize: string;
  onSelect: (sizeLabel: string) => void;
}

export function SizeSelector({ sizes, selectedSize, onSelect }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.label}>
          Size: <span className={styles.selectedName}>{selectedSize || 'Select a size'}</span>
        </h3>
        {/* Optional size guide link could go here */}
      </div>
      <div className={styles.sizeList} role="radiogroup" aria-label="Select size">
        {sizes.map((size) => {
          const isSelected = size.label === selectedSize;
          const isSoldOut = size.stock === 0;
          const isLowStock = size.stock > 0 && size.stock <= 5;

          return (
            <button
              key={size.label}
              className={`${styles.sizeBtn} ${isSelected ? styles.selected : ''} ${isSoldOut ? styles.soldOut : ''}`}
              onClick={() => !isSoldOut && onSelect(size.label)}
              disabled={isSoldOut}
              role="radio"
              aria-checked={isSelected}
              aria-disabled={isSoldOut}
            >
              <span className={styles.sizeLabel}>{size.label}</span>
              {isLowStock && !isSoldOut && (
                <span className={styles.stockWarning}>Only {size.stock} left</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
