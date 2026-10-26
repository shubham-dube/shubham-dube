import Link from 'next/link';
import { Poster } from '@/components/posters/Poster';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Metric } from '@/components/ui/Metric';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import type { Project } from '@/content';
import styles from './FlagshipCard.module.css';
import { ProjectMeta } from './ProjectMeta';

/** A flagship on the home page: a big poster and the story in brief. Sides alternate. */
export function FlagshipCard({ project, index }: { project: Project; index: number }) {
  const href = `/work/${project.slug}`;
  const primaryLink = project.links?.[0];
  return (
    <Reveal as="article" className={styles.card} data-flip={index % 2 === 1 || undefined} aria-labelledby={`fl-${project.slug}`}>
      <Link href={href} className={styles.visual} tabIndex={-1} aria-hidden>
        <Poster project={project} index={index} priority={index === 0} />
        <span className={`mono ${styles.cta}`}>Read the case study →</span>
      </Link>

      <div className={styles.body}>
        <ProjectMeta project={project} index={index} />
        <h3 id={`fl-${project.slug}`} className={`display ${styles.name}`}>
          <Link href={href}>{project.name}</Link>
        </h3>
        <p className={styles.tagline}>{project.tagline}</p>
        <p className={styles.summary}>{project.summary}</p>

        {project.metrics && (
          <div className={styles.metrics}>
            {project.metrics.map((m) => (
              <Metric key={m.label} {...m} />
            ))}
          </div>
        )}

        {project.award && (
          <div>
            <Tag tone="accent">★ {project.award}</Tag>
          </div>
        )}

        <p className={`mono ${styles.stack}`}>{project.stack.slice(0, 7).join(' · ')}</p>

        <div className={styles.links}>
          <ArrowLink href={href}>Case study</ArrowLink>
          {primaryLink && <ArrowLink href={primaryLink.href}>{primaryLink.label}</ArrowLink>}
        </div>
      </div>
    </Reveal>
  );
}
