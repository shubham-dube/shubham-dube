import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { awards, education, profile } from '@/content';
import { formatPeriod } from '@/lib/format';
import styles from './About.module.css';

export function About() {
  const school = education[0];
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <Container>
        <SectionHead index={4} label="About" id="about-title">
          I validate first, then build the <em>whole thing.</em>
        </SectionHead>

        <div className={styles.layout}>
          <Reveal className={styles.card}>
            <dl className={styles.facts}>
              <div>
                <dt className="mono">Name</dt>
                <dd>{profile.fullName}</dd>
              </div>
              <div>
                <dt className="mono">Based in</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt className="mono">Studying</dt>
                <dd>
                  {school.credential}
                  <span>
                    {school.school} · {formatPeriod(school.period)}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="mono">Speaks</dt>
                <dd>{profile.languages.join(' · ')}</dd>
              </div>
              <div>
                <dt className="mono">Drawn to</dt>
                <dd>{profile.interests.join(' · ')}</dd>
              </div>
              <div>
                <dt className="mono">Work style</dt>
                <dd>Remote first · happy to relocate anywhere in India or abroad</dd>
              </div>
            </dl>
          </Reveal>

          <div className={styles.story}>
            {profile.about.map((para, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className={i === 0 ? styles.lead : undefined}>{para}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className={styles.recognition}>
          <h3 className="mono">Recognition</h3>
          <ul>
            {awards.map((a, i) => (
              <Reveal as="li" key={a.title + a.detail} delay={i * 40} className={styles.award}>
                <span className={`mono ${styles.year}`}>{a.year ?? ''}</span>
                <span className={`display ${styles.awardTitle}`}>{a.title}</span>
                <span className={styles.awardDetail}>
                  {a.project ? (
                    <Link href={`/work/${a.project}`} className={styles.awardLink}>
                      {a.detail}
                    </Link>
                  ) : (
                    a.detail
                  )}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
