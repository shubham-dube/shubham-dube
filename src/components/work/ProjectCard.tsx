import Link from 'next/link';
import { Poster } from '@/components/posters/Poster';
import { Tag } from '@/components/ui/Tag';
import type { Project } from '@/content';
import { formatYears } from '@/lib/format';
import styles from './ProjectCard.module.css';

/** A compact card for grids. Links to the case study, or to the project itself if there isn't one. */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const href = project.caseStudy ? `/work/${project.slug}` : project.links?.[0]?.href;
  const external = href ? /^https?:/.test(href) : false;
  const inner = (
    <>
      <div className={styles.visual}>
        <Poster project={project} index={index} />
      </div>
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.name}>{project.name}</h3>
          <span className={`mono ${styles.year}`}>{formatYears(project.period)}</span>
        </div>
        <p className={styles.tagline}>{project.tagline}</p>
        <div className={styles.tags}>
          {project.award ? <Tag tone="accent">★ {project.award.split(' · ')[0]}</Tag> : null}
          {project.metrics?.[0] && (
            <Tag>
              {project.metrics[0].value} {project.metrics[0].label.toLowerCase()}
            </Tag>
          )}
        </div>
      </div>
    </>
  );

  if (!href) return <article className={styles.card}>{inner}</article>;
  return (
    <article className={styles.card}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
          {inner}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <Link href={href} className={styles.link}>
          {inner}
        </Link>
      )}
    </article>
  );
}
