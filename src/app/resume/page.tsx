import type { Metadata } from 'next';
import Link from 'next/link';
import { awards, education, experience, flagshipProjects, profile, selectedProjects, skillGroups } from '@/content';
import { formatPeriod, telHref } from '@/lib/format';
import { site } from '@/lib/site';
import { PrintButton } from './PrintButton';
import styles from './resume.module.css';

export const metadata: Metadata = {
  title: 'Résumé',
  description: `${profile.name} — résumé. ${site.description}`,
  alternates: { canonical: '/resume' },
};

/** Generated from the same content as the site, so it can never drift. Print → Save as PDF. */
export default function ResumePage() {
  const roles = experience.filter((e) => e.kind !== 'campus');
  const campus = experience.filter((e) => e.kind === 'campus');
  const featured = [...flagshipProjects, ...selectedProjects.slice(0, 3)];
  const host = site.url.replace(/^https?:\/\//, '');

  return (
    <div className={styles.screen}>
      <div className={styles.toolbar}>
        <Link href="/" className={styles.back}>
          ← {host}
        </Link>
        <PrintButton />
      </div>

      <article className={styles.paper}>
        <header className={styles.head}>
          <div>
            <h1>{profile.name}</h1>
            <p className={styles.role}>{profile.role}</p>
          </div>
          <ul className={styles.contact}>
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={telHref(profile.phone.primary)}>{profile.phone.primary}</a>
            </li>
            <li>
              Alt. <a href={telHref(profile.phone.alternate.number)}>{profile.phone.alternate.number}</a>
            </li>
            <li>
              <a href={site.url}>{host}</a>
            </li>
            {profile.links.slice(0, 2).map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.href.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '')}</a>
              </li>
            ))}
            <li>{profile.location}</li>
          </ul>
        </header>

        <p className={styles.summary}>{profile.intro}</p>

        <section>
          <h2>Experience</h2>
          {roles.map((e) => (
            <div key={e.id} className={styles.entry}>
              <div className={styles.entryHead}>
                <h3>
                  {e.role} · <strong>{e.org}</strong>
                  {e.orgNote && <span> — {e.orgNote}</span>}
                </h3>
                <span>
                  {formatPeriod(e.period)} · {e.mode}
                </span>
              </div>
              <ul>
                {e.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Selected projects</h2>
          {featured.map((p) => (
            <div key={p.slug} className={styles.entry}>
              <div className={styles.entryHead}>
                <h3>
                  <strong>{p.name}</strong> — {p.tagline}
                </h3>
                <span>{p.links?.[0] ? <a href={p.links[0].href}>{p.links[0].label}</a> : p.award ?? ''}</span>
              </div>
              <p>{p.summary}</p>
              <p className={styles.stack}>{p.stack.slice(0, 8).join(' · ')}</p>
            </div>
          ))}
        </section>

        <div className={styles.columns}>
          <section>
            <h2>Skills</h2>
            <dl className={styles.skills}>
              {skillGroups.map((g) => (
                <div key={g.id}>
                  <dt>{g.label}</dt>
                  <dd>{g.skills.map((s) => s.name).join(', ')}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div>
            <section>
              <h2>Education</h2>
              {education.map((ed) => (
                <div key={ed.school} className={styles.entry}>
                  <h3>
                    <strong>{ed.credential}</strong>
                  </h3>
                  <p>
                    {ed.school} · {formatPeriod(ed.period)}
                  </p>
                </div>
              ))}
            </section>
            <section>
              <h2>Recognition</h2>
              <ul className={styles.awards}>
                {awards.map((a) => (
                  <li key={a.title + a.detail}>
                    <strong>{a.title}</strong> — {a.detail}
                    {a.year && ` (${a.year})`}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2>Leadership</h2>
              <ul className={styles.awards}>
                {campus.map((e) => (
                  <li key={e.id}>
                    <strong>{e.role}</strong>, {e.org} ({formatPeriod(e.period)})
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
