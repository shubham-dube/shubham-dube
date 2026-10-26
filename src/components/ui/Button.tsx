import clsx from 'clsx';
import Link from 'next/link';
import styles from './Button.module.css';
import { Icon, type IconName } from './Icon';

type Variant = 'primary' | 'ghost' | 'quiet';

interface ButtonLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  variant?: Variant;
  icon?: IconName;
  size?: 'md' | 'lg';
}

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/** A link that looks like a button. External links open in a new tab and say so. */
export function ButtonLink({ href, variant = 'ghost', icon, size = 'md', className, children, ...rest }: ButtonLinkProps) {
  const cls = clsx(styles.button, styles[variant], size === 'lg' && styles.lg, className);
  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {icon && (
        <span className={styles.icon}>
          <Icon name={icon} />
        </span>
      )}
    </>
  );
  if (isExternal(href)) {
    const newTab = href.startsWith('http');
    return (
      <a href={href} className={cls} {...(newTab && { target: '_blank', rel: 'noopener noreferrer' })} {...rest}>
        {content}
        {newTab && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
