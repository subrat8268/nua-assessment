import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import styles from './ProductPage.module.scss';
import { useProduct } from '../hooks/useProduct';
import { useURLState } from '../hooks/useURLState';
import { Header } from '../components/Header/Header';
import { Loader } from '../components/Loader/Loader';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { ProductInfoPanel } from '../components/ProductInfoPanel/ProductInfoPanel';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import { CartDrawer } from '../components/CartDrawer/CartDrawer';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '1', 10);
  
  const { product, loading, error } = useProduct(productId);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const defaultColor = product?.variants?.[0]?.color?.name || '';
  const defaultSize = product?.variants?.[0]?.sizes?.find(s => s.stock > 0)?.label || '';

  const [colorParam, setColorParam] = useURLState('color', '');
  const [sizeParam, setSizeParam] = useURLState('size', '');

  const selectedColor = colorParam || defaultColor;
  const selectedSize = sizeParam || defaultSize;

  const selectedVariant = product?.variants?.find(v => v.color.name === selectedColor) || product?.variants?.[0];

  useEffect(() => {
    if (product && !colorParam && defaultColor) {
      setColorParam(defaultColor);
    }
    if (product && !sizeParam && defaultSize) {
      setSizeParam(defaultSize);
    }
  }, [product, colorParam, sizeParam, defaultColor, defaultSize, setColorParam, setSizeParam]);

  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);

  if (isNaN(productId)) {
    return <Navigate to="/product/1" replace />;
  }

  return (
    <>
      <div onClickCapture={(e) => {
        const target = e.target as HTMLElement;
        const btn = target.closest('button[aria-label="Open cart"]');
        if (btn) {
          e.stopPropagation();
          handleCartOpen();
        }
      }}>
        <Header />
      </div>

      <main className={styles.main}>
        {loading && <Loader />}
        
        {error && (
          <ErrorBoundary 
            message={error} 
            onRetry={() => window.location.reload()} 
          />
        )}
        
        {product && selectedVariant && !loading && !error && (
          <div className={styles.container}>
            <div className={styles.topSection}>
              <div className={styles.galleryColumn}>
                <ImageGallery 
                  images={selectedVariant.images.length > 0 ? selectedVariant.images : [product.image]} 
                  productTitle={product.title} 
                />
              </div>
              <div className={styles.infoColumn}>
                <ProductInfoPanel 
                  product={product}
                  selectedVariant={selectedVariant}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                  onColorChange={setColorParam}
                  onSizeChange={setSizeParam}
                />
              </div>
            </div>

            <div className={styles.bottomSection}>
              <ProductDetails product={product} />
            </div>
          </div>
        )}
      </main>

      <CartDrawer isOpen={isCartOpen} onClose={handleCartClose} />
    </>
  );
}
