import { ButtonLink } from '@/components/ui/Button';
import { StatusDot } from '@/components/ui/Tag';
import { experience, profile } from '@/content';
import styles from './Hero.module.css';
import { LiquidForm } from './LiquidForm';
import { LocalTime } from './LocalTime';

const current = experience.filter((e) => !e.period.end && e.kind !== 'campus');

export function Hero() {
  const [first, ...rest] = profile.name.split(' ');
  return (
    <section className={styles.hero} aria-labelledby="hero-name">
      <div className={styles.stage}>
        <LiquidForm />
      </div>

      <div className={styles.inner}>
        <p className={`mono ${styles.status}`}>
          <StatusDot pulse />
          {profile.availability.text}
        </p>

        <h1 id="hero-name" className={`display ${styles.name}`}>
          <span className={styles.line}>{first}</span>
          <span className={styles.line}>
            <em>{rest.join(' ')}</em>
          </span>
          <span className="sr-only">, {profile.role}</span>
        </h1>

        <div className={styles.bottom}>
          <div className={styles.lede}>
            <p className={`mono ${styles.role}`}>{profile.role}</p>
            <p className={styles.headline}>{profile.headline}</p>
            <div className={styles.ctas}>
              <ButtonLink href="#work" variant="primary" size="lg" icon="arrowRight">
                See the work
              </ButtonLink>
              <ButtonLink href="/resume" size="lg">
                Résumé
              </ButtonLink>
            </div>
          </div>

          <dl className={styles.meta}>
            <div className={styles.metaRow}>
              <dt className="mono">Now</dt>
              <dd>
                {current.map((e) => (
                  <span key={e.id} className={styles.now}>
                    {e.role} <span className={styles.at}>at</span> {e.org}
                  </span>
                ))}
              </dd>
            </div>
            <div className={styles.metaRow}>
              <dt className="mono">Based in</dt>
              <dd>
                {profile.location} <LocalTime timeZone={profile.timezone} />
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <a href="#proof" className={`mono ${styles.scroll}`} aria-label="Scroll to the highlights">
        <span className={styles.scrollTrack} aria-hidden>
          <span className={styles.scrollThumb} />
        </span>
        Scroll
      </a>
    </section>
  );
}
