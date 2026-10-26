import type { SkillLevel } from '@/content';
import { skillLevelLabel } from '@/content';
import styles from './Meter.module.css';

const steps: Record<SkillLevel, number> = { working: 1, proficient: 2, strong: 3 };

/** Three-step skill meter. The level is also given in text for screen readers. */
export function Meter({ level }: { level: SkillLevel }) {
  const n = steps[level];
  return (
    <span className={styles.meter} title={skillLevelLabel[level]}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={styles.pip} data-on={i <= n || undefined} />
      ))}
      <span className="sr-only">{skillLevelLabel[level]}</span>
    </span>
  );
}
