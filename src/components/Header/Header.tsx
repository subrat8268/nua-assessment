import { ShoppingCart } from 'lucide-react';
import styles from './Header.module.scss';
import { useCart } from '../../stores/CartContext';

export function Header() {
  const { cartCount } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          Summit Gear Co.
        </div>
        <button className={styles.cartBtn} aria-label="Open cart">
          <ShoppingCart size={24} />
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}
