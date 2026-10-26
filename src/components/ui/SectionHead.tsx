import { pad2 } from '@/lib/format';
import styles from './SectionHead.module.css';
import { Reveal } from './Reveal';

interface SectionHeadProps {
  index: number;
  label: string;
  /** Serif statement. Wrap one word in <em> for emphasis. */
  children: React.ReactNode;
  aside?: React.ReactNode;
  id?: string;
}

/** "01 — Work" eyebrow + serif statement: how every section opens. */
export function SectionHead({ index, label, children, aside, id }: SectionHeadProps) {
  return (
    <Reveal className={styles.head}>
      <p className={`mono ${styles.eyebrow}`}>
        <span className={styles.index}>{pad2(index)}</span>
        <span className={styles.rule} aria-hidden />
        {label}
      </p>
      <div className={styles.row}>
        <h2 id={id} className={`display ${styles.title}`}>
          {children}
        </h2>
        {aside && <div className={styles.aside}>{aside}</div>}
      </div>
    </Reveal>
  );
}
