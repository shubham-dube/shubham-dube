'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './LiquidForm.module.css';

/**
 * The hero's 3D form. The renderer module loads after first paint, and the CSS
 * glow underneath stays as the fallback if WebGL2 is unavailable or fails.
 */
export function LiquidForm() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    import('./liquid-renderer')
      .then(({ LiquidRenderer }) => {
        if (disposed) return;
        const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
        const renderer = new LiquidRenderer(canvas, { still });
        const themeWatch = new MutationObserver(renderer.syncTheme);
        themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        cleanup = () => {
          themeWatch.disconnect();
          renderer.destroy();
        };
        requestAnimationFrame(() => setReady(true));
      })
      .catch(() => {
        /* No WebGL2 or a compile error: the CSS fallback is already showing. */
      });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className={styles.stage} aria-hidden>
      <div className={styles.fallback} data-hidden={ready || undefined} />
      <canvas ref={ref} className={styles.canvas} data-ready={ready || undefined} />
    </div>
  );
}
