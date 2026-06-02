import styles from './Loader.module.scss';

export function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.gallerySkeleton}></div>
      <div className={styles.infoSkeleton}>
        <div className={styles.line} style={{ width: '80%', height: '32px' }}></div>
        <div className={styles.line} style={{ width: '40%', height: '24px' }}></div>
        <div className={styles.line} style={{ width: '100%', height: '80px', marginTop: '24px' }}></div>
        <div className={styles.line} style={{ width: '60%', height: '40px', marginTop: '24px' }}></div>
        <div className={styles.line} style={{ width: '100%', height: '48px', marginTop: '40px' }}></div>
      </div>
    </div>
  );
}
