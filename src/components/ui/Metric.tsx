import styles from './Metric.module.css';

export function Metric({ value, label, size = 'md' }: { value: string; label: string; size?: 'md' | 'lg' }) {
  return (
    <div className={styles.metric} data-size={size}>
      <span className={`display ${styles.value}`}>{value}</span>
      <span className={`mono ${styles.label}`}>{label}</span>
    </div>
  );
}
