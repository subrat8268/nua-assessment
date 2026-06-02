import styles from './ErrorBoundary.module.scss';

interface Props {
  message?: string;
  onRetry?: () => void;
}

export function ErrorBoundary({ message = 'Something went wrong', onRetry }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>!</div>
      <h2 className={styles.title}>Oops!</h2>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.button} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
