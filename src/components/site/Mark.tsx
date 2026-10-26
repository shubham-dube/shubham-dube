import styles from './Mark.module.css';

/** The brand mark: a tiny echo of the hero form, an orb with an ember core. */
export function Mark({ size = 22 }: { size?: number }) {
  return <span className={styles.mark} style={{ width: size, height: size }} aria-hidden />;
}
