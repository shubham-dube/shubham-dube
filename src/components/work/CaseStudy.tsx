import Link from 'next/link';
import { Poster } from '@/components/posters/Poster';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Metric } from '@/components/ui/Metric';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import { adjacentCaseStudies, domainLabel, statusLabel, type CaseStudy as CaseStudyData, type Project } from '@/content';
import { formatPeriod, pad2 } from '@/lib/format';
import styles from './CaseStudy.module.css';
import { Pipeline } from './Pipeline';
import { ProjectMeta } from './ProjectMeta';

interface Props {
  project: Project;
  caseStudy: CaseStudyData;
}

export function CaseStudy({ project, caseStudy: cs }: Props) {
  const adjacent = adjacentCaseStudies(project.slug)!;
  const sections = [
    { id: 'problem', label: 'The problem' },
    { id: 'built', label: 'What I built' },
    cs.pipeline && { id: 'how', label: 'How it works' },
    cs.timeline && { id: 'timeline', label: 'Timeline' },
    { id: 'outcome', label: 'Outcome' },
    { id: 'stack', label: 'Stack' },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <article className={styles.page}>
      <Container>
        <header className={styles.header}>
          <Link href="/#work" className={`mono ${styles.back}`}>
            <Icon name="arrowLeft" size={14} /> All work
          </Link>
          <ProjectMeta project={project} />
          <h1 className={`display ${styles.title}`}>{project.name}</h1>
          <p className={styles.tagline}>{project.tagline}</p>
        </header>

        <Reveal className={styles.hero}>
          <Poster project={project} priority />
        </Reveal>

        <dl className={styles.facts}>
          <div>
            <dt className="mono">Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt className="mono">Team</dt>
            <dd>{project.team}</dd>
          </div>
          <div>
            <dt className="mono">When</dt>
            <dd>
              {formatPeriod(project.period)}
              {project.org && project.context === 'work' && <span> · at {project.org}</span>}
            </dd>
          </div>
          <div>
            <dt className="mono">Status</dt>
            <dd>
              {statusLabel[project.status]} · {project.domains.map((d) => domainLabel[d]).join(', ')}
            </dd>
          </div>
          {project.links && (
            <div>
              <dt className="mono">Links</dt>
              <dd className={styles.factLinks}>
                {project.links.map((l) => (
                  <ArrowLink key={l.href} href={l.href}>
                    {l.label}
                  </ArrowLink>
                ))}
              </dd>
            </div>
          )}
        </dl>

        <div className={styles.layout}>
          <nav className={styles.toc} aria-label="On this page">
            <p className="mono">On this page</p>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    <span className="mono">{pad2(i + 1)}</span> {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.content}>
            <section id="problem" className={styles.section}>
              <h2 className="mono">The problem</h2>
              <Reveal>
                <p className={styles.lead}>{cs.problem}</p>
              </Reveal>
              {project.award && (
                <div>
                  <Tag tone="accent">★ {project.award}</Tag>
                </div>
              )}
            </section>

            <section id="built" className={styles.section}>
              <h2 className="mono">What I built</h2>
              <ol className={styles.features}>
                {cs.built.map((f, i) => (
                  <Reveal as="li" key={f.title} className={styles.feature} delay={(i % 2) * 80}>
                    <span className={`mono ${styles.featureNum}`}>{pad2(i + 1)}</span>
                    <h3 className="display">{f.title}</h3>
                    <p>{f.body}</p>
                  </Reveal>
                ))}
              </ol>
            </section>

            {cs.pipeline && (
              <section id="how" className={styles.section}>
                <h2 className="mono">How it works</h2>
                <Reveal>
                  <Pipeline {...cs.pipeline} />
                </Reveal>
              </section>
            )}

            {cs.timeline && (
              <section id="timeline" className={styles.section}>
                <h2 className="mono">Timeline</h2>
                <ol className={styles.timeline}>
                  {cs.timeline.map((t, i) => (
                    <Reveal as="li" key={t.when} delay={i * 50}>
                      <span className="mono">{t.when}</span>
                      <p>{t.what}</p>
                    </Reveal>
                  ))}
                </ol>
              </section>
            )}

            <section id="outcome" className={styles.section}>
              <h2 className="mono">Outcome</h2>
              {project.metrics && (
                <div className={styles.metrics}>
                  {project.metrics.map((m) => (
                    <Metric key={m.label} {...m} size="lg" />
                  ))}
                </div>
              )}
              <ul className={styles.outcome}>
                {cs.outcome.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
              {cs.note && <p className={styles.note}>{cs.note}</p>}
            </section>

            <section id="stack" className={styles.section}>
              <h2 className="mono">Stack</h2>
              <ul className={styles.stack}>
                {project.stack.map((s) => (
                  <li key={s}>
                    <Tag>{s}</Tag>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <nav className={styles.pager} aria-label="More case studies">
          <Link href={`/work/${adjacent.prev.slug}`} className={styles.pagerLink}>
            <span className="mono">← Previous</span>
            <span className="display">{adjacent.prev.name}</span>
          </Link>
          <Link href={`/work/${adjacent.next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
            <span className="mono">Next →</span>
            <span className="display">{adjacent.next.name}</span>
          </Link>
        </nav>
      </Container>
    </article>
  );
}
