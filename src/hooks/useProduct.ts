import { useState, useEffect } from 'react';
import type { Product, EnrichedProduct } from '../types';
import { mockVariants, mockSpecs } from '../data/mockVariants';

export function useProduct(productId: number) {
  const [product, setProduct] = useState<EnrichedProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }
        const data: Product = await res.json();
        
        if (isMounted) {
          // Augment with mock data
          const variants = mockVariants[productId] || [];
          setProduct({
            ...data,
            variants,
            specs: mockSpecs
          });
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  return { product, loading, error };
}
