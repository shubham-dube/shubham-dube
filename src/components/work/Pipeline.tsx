import type { PipelineStep } from '@/content';
import { pad2 } from '@/lib/format';
import styles from './Pipeline.module.css';

/** A numbered left-to-right flow (stacked on phones) with a live signal along the rail. */
export function Pipeline({ title, steps }: { title: string; steps: PipelineStep[] }) {
  return (
    <figure className={styles.pipeline}>
      <figcaption className="mono">{title}</figcaption>
      <ol className={styles.steps} style={{ '--n': steps.length } as React.CSSProperties}>
        {steps.map((s, i) => (
          <li key={s.label} className={styles.step}>
            <span className={`mono ${styles.num}`}>{pad2(i + 1)}</span>
            <span className={styles.node} aria-hidden />
            <span className={`display ${styles.label}`}>{s.label}</span>
            <span className={styles.detail}>{s.detail}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
