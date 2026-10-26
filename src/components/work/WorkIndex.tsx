'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { domainLabel, type Domain, type Project } from '@/content';
import { formatYears } from '@/lib/format';
import styles from './WorkIndex.module.css';

/**
 * The full archive as a filterable index. Rows link to the case study when there
 * is one, otherwise to the project's first public link.
 */
export function WorkIndex({ projects }: { projects: Project[] }) {
  const [domain, setDomain] = useState<Domain | 'all'>('all');

  const domains = useMemo(() => {
    const counts = new Map<Domain, number>();
    for (const p of projects) for (const d of p.domains) counts.set(d, (counts.get(d) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [projects]);

  const shown = domain === 'all' ? projects : projects.filter((p) => p.domains.includes(domain));

  return (
    <div>
      <div className={styles.filters} role="group" aria-label="Filter by area">
        <button type="button" className={clsx(styles.chip)} aria-pressed={domain === 'all'} onClick={() => setDomain('all')}>
          All <span>{projects.length}</span>
        </button>
        {domains.map(([d, n]) => (
          <button key={d} type="button" className={styles.chip} aria-pressed={domain === d} onClick={() => setDomain(d)}>
            {domainLabel[d]} <span>{n}</span>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} projects
      </p>

      <ol className={styles.rows}>
        {shown.map((p) => {
          const href = p.caseStudy ? `/work/${p.slug}` : p.links?.[0]?.href;
          const content = (
            <>
              <span className={`mono ${styles.year}`}>{formatYears(p.period)}</span>
              <span className={styles.name}>
                <span className="display">{p.name}</span>
                <span className={styles.tagline}>{p.tagline}</span>
              </span>
              <span className={`mono ${styles.domains}`}>{p.domains.map((d) => domainLabel[d]).join(' · ')}</span>
              <span className={`mono ${styles.go}`} aria-hidden>
                {p.caseStudy ? 'Case study →' : href ? 'Visit ↗' : '—'}
              </span>
            </>
          );
          return (
            <li key={p.slug}>
              {!href ? (
                <div className={styles.row}>{content}</div>
              ) : p.caseStudy ? (
                <Link href={href} className={styles.row}>
                  {content}
                </Link>
              ) : (
                <a href={href} className={styles.row} target="_blank" rel="noopener noreferrer">
                  {content}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
