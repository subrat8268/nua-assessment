import { useEffect } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import styles from './CartDrawer.module.scss';
import { useCart } from '../../stores/CartContext';
import { useToast } from '../../stores/ToastContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: Props) {
  const { items, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleRemove = (productId: number, color: string, size: string, title: string) => {
    removeFromCart(productId, color, size);
    addToast(`${title} (${color} / ${size}) removed from cart.`, 'info');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      <div className={styles.drawer} role="dialog" aria-label="Shopping Cart">
        <div className={styles.header}>
          <h2>Your Cart ({cartCount})</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        <div className={styles.content}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <ShoppingBag size={48} className={styles.emptyIcon} />
              <p>Your cart is empty.</p>
              <button className={styles.continueBtn} onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className={styles.itemList}>
              {items.map((item) => (
                <li key={`${item.productId}-${item.color}-${item.size}`} className={styles.cartItem}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className={styles.itemImage} 
                    width={80}
                    height={80}
                    loading="lazy"
                  />
                  <div className={styles.itemDetails}>
                    <h4 className={styles.itemTitle}>{item.title}</h4>
                    <p className={styles.itemVariant}>
                      {item.color} / {item.size}
                    </p>
                    <div className={styles.itemControls}>
                      <div className={styles.qtyControls}>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        className={styles.removeBtn}
                        onClick={() => handleRemove(item.productId, item.color, item.size, item.title)}
                      >
                        <Trash2 size={14} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                  <div className={styles.itemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.total}>
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <p className={styles.shippingNote}>Shipping & taxes calculated at checkout</p>
            <button className={styles.checkoutBtn}>Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );
}
