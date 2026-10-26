import clsx from 'clsx';
import Link from 'next/link';
import styles from './ArrowLink.module.css';
import { Icon } from './Icon';

/** Inline text link with an arrow; external links get ↗ and open in a new tab. */
export function ArrowLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const external = /^https?:/.test(href);
  const cls = clsx(styles.link, className);
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        <span>{children}</span>
        <Icon name="arrowUpRight" size={14} />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      <span>{children}</span>
      <Icon name="arrowRight" size={14} />
    </Link>
  );
}
