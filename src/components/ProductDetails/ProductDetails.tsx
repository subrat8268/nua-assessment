import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, FileText, Sliders, MessageSquare } from 'lucide-react';
import styles from './ProductDetails.module.scss';
import type { EnrichedProduct } from '../../types';
import { mockReviews } from '../../data/mockReviews';

interface Props {
  product: EnrichedProduct;
}

export function ProductDetails({ product }: Props) {
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [isMobile, setIsMobile] = useState(false);
  const [expandedSection, setExpandedSection] = useState<'description' | 'specs' | 'reviews' | null>('description');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderDescription = () => (
    <div className={styles.content}>
      <p>{product.description}</p>
    </div>
  );

  const renderSpecs = () => (
    <div className={styles.content}>
      <table className={styles.specsTable}>
        <tbody>
          {product.specs.map((spec, i) => (
            <tr key={i}>
              <th>{spec.label}</th>
              <td>{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderReviews = () => (
    <div className={styles.content}>
      <div className={styles.reviewsSummary}>
        <div className={styles.ratingNumber}>{product.rating.rate.toFixed(1)}</div>
        <div className={styles.ratingStars}>
          {'★'.repeat(Math.round(product.rating.rate))}
          {'☆'.repeat(5 - Math.round(product.rating.rate))}
        </div>
        <div className={styles.ratingCount}>Based on {product.rating.count} reviews</div>
      </div>
      
      <div className={styles.reviewList}>
        {mockReviews.map(review => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <span className={styles.reviewAuthor}>{review.author}</span>
              {review.verified && <span className={styles.verifiedBadge}>Verified Buyer</span>}
              <span className={styles.reviewDate}>{review.date}</span>
            </div>
            <div className={styles.reviewStars}>
              {'★'.repeat(review.rating)}
              {'☆'.repeat(5 - review.rating)}
            </div>
            <h4 className={styles.reviewTitle}>{review.title}</h4>
            <p className={styles.reviewBody}>{review.body}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className={styles.accordionContainer}>
        <div className={styles.accordionSection}>
          <button 
             className={styles.accordionHeader}
             onClick={() => setExpandedSection(expandedSection === 'description' ? null : 'description')}
             aria-expanded={expandedSection === 'description'}
          >
            <span className={styles.accordionTitle}>
              <FileText size={18} />
              Description
            </span>
            <span className={styles.accordionIcon}>
              {expandedSection === 'description' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          </button>
          {expandedSection === 'description' && renderDescription()}
        </div>

        <div className={styles.accordionSection}>
          <button 
             className={styles.accordionHeader}
             onClick={() => setExpandedSection(expandedSection === 'specs' ? null : 'specs')}
             aria-expanded={expandedSection === 'specs'}
          >
            <span className={styles.accordionTitle}>
              <Sliders size={18} />
              Specifications
            </span>
            <span className={styles.accordionIcon}>
              {expandedSection === 'specs' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          </button>
          {expandedSection === 'specs' && renderSpecs()}
        </div>

        <div className={styles.accordionSection}>
          <button 
             className={styles.accordionHeader}
             onClick={() => setExpandedSection(expandedSection === 'reviews' ? null : 'reviews')}
             aria-expanded={expandedSection === 'reviews'}
          >
            <span className={styles.accordionTitle}>
              <MessageSquare size={18} />
              Reviews ({product.rating.count})
            </span>
            <span className={styles.accordionIcon}>
              {expandedSection === 'reviews' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          </button>
          {expandedSection === 'reviews' && renderReviews()}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabList} role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'description'}
          className={`${styles.tabBtn} ${activeTab === 'description' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('description')}
        >
          <FileText size={16} />
          <span>Description</span>
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'specs'}
          className={`${styles.tabBtn} ${activeTab === 'specs' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('specs')}
        >
          <Sliders size={16} />
          <span>Specifications</span>
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'reviews'}
          className={`${styles.tabBtn} ${activeTab === 'reviews' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          <MessageSquare size={16} />
          <span>Reviews ({product.rating.count})</span>
        </button>
      </div>

      <div className={styles.tabPanel} role="tabpanel">
        {activeTab === 'description' && renderDescription()}
        {activeTab === 'specs' && renderSpecs()}
        {activeTab === 'reviews' && renderReviews()}
      </div>
    </div>
  );
}
