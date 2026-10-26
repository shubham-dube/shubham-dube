import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { experience, projectBySlug } from '@/content';
import { formatPeriod } from '@/lib/format';
import styles from './Experience.module.css';

const kindLabel = { founder: 'Founder', internship: 'Internship', campus: 'Campus' } as const;

export function Experience() {
  return (
    <section id="experience" className={styles.section} aria-labelledby="exp-title">
      <Container>
        <SectionHead
          index={2}
          label="Experience"
          id="exp-title"
          aside="Remote roles with teams in India and South Africa, and a company of my own."
        >
          Where I have <em>shipped.</em>
        </SectionHead>

        <ol className={styles.list}>
          {experience.map((e, i) => (
            <Reveal as="li" key={e.id} className={styles.item} data-kind={e.kind} delay={i * 40}>
              <div className={styles.when}>
                <p className="mono">{formatPeriod(e.period)}</p>
                <p className={`mono ${styles.kind}`}>
                  {kindLabel[e.kind]} · {e.mode}
                </p>
              </div>

              <div className={styles.what}>
                <h3 className={styles.role}>
                  <span className="display">{e.org}</span>
                  <span className={styles.title}>{e.role}</span>
                </h3>
                {e.orgNote && <p className={`mono ${styles.note}`}>{e.orgNote}</p>}
                <p className={styles.summary}>{e.summary}</p>
                <ul className={styles.highlights}>
                  {e.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.side}>
                {e.projects.length > 0 && (
                  <div>
                    <p className={`mono ${styles.sideLabel}`}>Built here</p>
                    <ul className={styles.projects}>
                      {e.projects.map((slug) => {
                        const p = projectBySlug(slug)!;
                        return (
                          <li key={slug}>
                            <Link href={`/work/${slug}`}>
                              {p.name} <span aria-hidden>→</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                {e.stack.length > 0 && <p className={`mono ${styles.stack}`}>{e.stack.join(' · ')}</p>}
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
