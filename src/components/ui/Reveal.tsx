'use client';

import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import styles from './Reveal.module.css';

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  /** Stagger in ms, for items in a row. */
  delay?: number;
  as?: 'div' | 'li' | 'article' | 'section';
}

/**
 * Fades and lifts its content in once, the first time it scrolls into view.
 * Content is only hidden when JS is running (html.js), so nothing is lost without it.
 */
export function Reveal({ delay = 0, as = 'div', className, style, ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // The element type only changes semantics; refs and props are the same shape.
  const Tag = as as 'div';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.dataset.in = '';
            io.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={clsx(styles.reveal, className)}
      style={{ ...style, '--delay': `${delay}ms` } as React.CSSProperties}
      {...rest}
    />
  );
}
