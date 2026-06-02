import { useState } from 'react';
import styles from './ProductInfoPanel.module.scss';
import type { EnrichedProduct, ProductVariant } from '../../types';
import { ColorSwatch } from '../ColorSwatch/ColorSwatch';
import { SizeSelector } from '../SizeSelector/SizeSelector';
import { QuantityPicker } from '../QuantityPicker/QuantityPicker';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { useCart } from '../../stores/CartContext';

interface Props {
  product: EnrichedProduct;
  selectedVariant: ProductVariant;
  selectedColor: string;
  selectedSize: string;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
}

export function ProductInfoPanel({
  product,
  selectedVariant,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const brand = product.title.split('-')[0].trim() || 'Summit Gear Co.';
  const name = product.title.includes('-') ? product.title.split('-')[1].trim() : product.title;
  
  const currentSizeOption = selectedVariant.sizes.find(s => s.label === selectedSize);
  const maxStock = currentSizeOption ? currentSizeOption.stock : 0;
  const isSoldOut = maxStock === 0;

  const currentPrice = product.price;
  const originalPrice = selectedVariant.originalPrice;
  const isOnSale = !!originalPrice && originalPrice > currentPrice;

  // Handle color change: reset quantity, clear size if not available in new color
  const handleColorChange = (newColor: string) => {
    onColorChange(newColor);
    setQuantity(1);
    
    // Check if current size exists in new variant
    const newVariant = product.variants.find(v => v.color.name === newColor);
    if (newVariant && !newVariant.sizes.find(s => s.label === selectedSize)) {
      // If the currently selected size doesn't exist for the new color, select the first available size
      const firstAvailable = newVariant.sizes.find(s => s.stock > 0);
      onSizeChange(firstAvailable ? firstAvailable.label : newVariant.sizes[0].label);
    }
  };

  const handleSizeChange = (newSize: string) => {
    onSizeChange(newSize);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      title: product.title,
      image: selectedVariant.images[0] || product.image,
      color: selectedColor,
      size: selectedSize,
      price: currentPrice,
      quantity,
      maxStock
    });
  };

  // Generate delivery estimate date (e.g., 3 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const deliveryString = deliveryDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className={styles.container}>
      <div className={styles.brand}>{brand}</div>
      <h1 className={styles.title}>{name}</h1>
      
      <div className={styles.priceContainer}>
        <span className={`${styles.price} ${isOnSale ? styles.salePrice : ''}`}>
          ${currentPrice.toFixed(2)}
        </span>
        {isOnSale && (
          <>
            <span className={styles.originalPrice}>${originalPrice.toFixed(2)}</span>
            <span className={styles.saleBadge}>Sale</span>
          </>
        )}
      </div>

      <div className={styles.divider} />

      <ColorSwatch 
        colors={product.variants.map(v => v.color)}
        selectedColor={selectedColor}
        onSelect={handleColorChange}
      />

      <SizeSelector 
        sizes={selectedVariant.sizes}
        selectedSize={selectedSize}
        onSelect={handleSizeChange}
      />

      <div className={styles.actions}>
        <QuantityPicker 
          quantity={quantity}
          maxStock={maxStock}
          onChange={setQuantity}
          disabled={isSoldOut || !selectedSize}
        />

        <AddToCartButton 
          onAdd={handleAddToCart}
          disabled={isSoldOut || !selectedSize}
          text={isSoldOut ? 'Sold Out' : 'Add to Cart'}
        />
      </div>

      {!isSoldOut && (
        <div className={styles.deliveryInfo}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
          <p>Order within <strong>14 hrs</strong> for delivery by <strong>{deliveryString}</strong></p>
        </div>
      )}
    </div>
  );
}
