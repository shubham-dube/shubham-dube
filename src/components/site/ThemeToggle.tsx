'use client';

import { Icon } from '@/components/ui/Icon';
import { useTheme } from '@/lib/use-theme';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === 'light' ? 'dark' : 'light';
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => setTheme(next)}
      aria-label={theme ? `Switch to ${next} theme` : 'Switch theme'}
      data-theme-state={theme ?? undefined}
    >
      <span className={styles.sun}>
        <Icon name="sun" />
      </span>
      <span className={styles.moon}>
        <Icon name="moon" />
      </span>
    </button>
  );
}
