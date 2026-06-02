import { useState, useRef, useEffect } from 'react';
import styles from './ImageGallery.module.scss';

interface Props {
  images: string[];
  productTitle: string;
}

export function ImageGallery({ images, productTitle }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  // Reset to first image when images array changes (e.g., color change)
  useEffect(() => {
    setSelectedIndex(0);
  }, [images]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const selectedImage = images[selectedIndex] || images[0];

  return (
    <div className={styles.container}>
      <div 
        className={styles.mainImageContainer}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          ref={imageRef}
          src={selectedImage}
          alt={productTitle}
          className={`${styles.mainImage} ${isZooming ? styles.hidden : ''}`}
        />
        {isZooming && (
          <div
            className={styles.zoomedImage}
            style={{
              backgroundImage: `url(${selectedImage})`,
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`
            }}
          />
        )}
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnailsContainer}>
          <div className={styles.thumbnails} ref={thumbsRef} role="tablist">
            {images.map((img, index) => (
              <button
                key={`${img}-${index}`}
                role="tab"
                aria-selected={index === selectedIndex}
                className={`${styles.thumbnailBtn} ${index === selectedIndex ? styles.active : ''}`}
                onClick={() => setSelectedIndex(index)}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} className={styles.thumbnailImg} />
              </button>
            ))}
          </div>
          {/* Mobile dots indicator */}
          <div className={styles.dots} aria-hidden="true">
            {images.map((_, index) => (
              <div 
                key={index} 
                className={`${styles.dot} ${index === selectedIndex ? styles.activeDot : ''}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
