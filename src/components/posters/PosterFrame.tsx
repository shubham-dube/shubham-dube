import { useId } from 'react';
import styles from './Poster.module.css';

export const W = 800;
export const H = 500;

interface PosterFrameProps {
  code: string;
  label: string;
  status?: string;
  children: React.ReactNode;
}

/**
 * Shared grammar for every poster: surface, a faint 40px grid, corner
 * registration marks and two mono captions. Posters draw inside an 800×500 box.
 */
export function PosterFrame({ code, label, status, children }: PosterFrameProps) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={styles.poster} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <pattern id={`g${id}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" className={styles.grid} />
        </pattern>
        <radialGradient id={`v${id}`} cx="70%" cy="20%" r="90%">
          <stop offset="0" className={styles.glowStop} />
          <stop offset="1" stopOpacity="0" className={styles.glowStop} />
        </radialGradient>
      </defs>
      <rect width={W} height={H} className={styles.bg} />
      <rect width={W} height={H} fill={`url(#g${id})`} />
      <rect width={W} height={H} fill={`url(#v${id})`} />
      {[
        [24, 24],
        [W - 24, 24],
        [24, H - 24],
        [W - 24, H - 24],
      ].map(([x, y]) => (
        <path key={`${x}${y}`} d={`M${x - 5} ${y}h10M${x} ${y - 5}v10`} className={styles.reg} />
      ))}
      <text x="44" y="52" className={styles.cap}>
        {code} · {label}
      </text>
      {status && (
        <text x={W - 44} y="52" textAnchor="end" className={styles.cap}>
          {status}
        </text>
      )}
      {children}
    </svg>
  );
}
