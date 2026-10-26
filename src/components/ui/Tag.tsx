import clsx from 'clsx';
import styles from './Tag.module.css';

export function Tag({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'accent' | 'ok' }) {
  return <span className={clsx('mono', styles.tag, styles[tone])}>{children}</span>;
}

/** A live / status dot with an optional pulse. */
export function StatusDot({ pulse = false, tone = 'ok' }: { pulse?: boolean; tone?: 'ok' | 'accent' | 'muted' }) {
  return <span className={clsx(styles.dot, styles[`dot-${tone}`], pulse && styles.pulse)} aria-hidden />;
}
