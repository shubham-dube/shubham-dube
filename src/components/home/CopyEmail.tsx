'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import styles from './Contact.module.css';

/** The email as a big link, with a one-click copy beside it. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className={styles.email}>
      <a href={`mailto:${email}`} className={`display ${styles.emailLink}`}>
        {email}
      </a>
      <button type="button" className={styles.copy} onClick={copy} aria-label={copied ? 'Email copied' : 'Copy email address'}>
        <Icon name={copied ? 'check' : 'copy'} />
        <span className="mono">{copied ? 'Copied' : 'Copy'}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </div>
  );
}
