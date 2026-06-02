import styles from './ColorSwatch.module.scss';
import type { ColorOption } from '../../types';

interface Props {
  colors: ColorOption[];
  selectedColor: string;
  onSelect: (colorName: string) => void;
}

export function ColorSwatch({ colors, selectedColor, onSelect }: Props) {
  return (
    <div className={styles.container}>
      <h3 className={styles.label}>
        Color: <span className={styles.selectedName}>{selectedColor}</span>
      </h3>
      <div className={styles.swatchList} role="radiogroup" aria-label="Select color">
        {colors.map((color) => {
          const isSelected = color.name === selectedColor;
          return (
            <button
              key={color.name}
              className={`${styles.swatch} ${isSelected ? styles.selected : ''}`}
              style={{ backgroundColor: color.hex }}
              onClick={() => onSelect(color.name)}
              role="radio"
              aria-checked={isSelected}
              aria-label={`Color ${color.name}`}
              title={color.name}
            />
          );
        })}
      </div>
    </div>
  );
}
