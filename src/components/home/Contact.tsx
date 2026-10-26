import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { profile } from '@/content';
import { telHref } from '@/lib/format';
import styles from './Contact.module.css';
import { CopyEmail } from './CopyEmail';

export function Contact() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <Container>
        <Reveal className={styles.inner}>
          <p className={`mono ${styles.eyebrow}`}>
            <span>05</span> Contact
          </p>
          <h2 id="contact-title" className={`display ${styles.title}`}>
            Let’s build something <em>worth using.</em>
          </h2>
          <p className={styles.lede}>
            I’m looking for SDE, backend and AI roles, and I’m always glad to talk about receivables, AI or anything I’ve built.
          </p>

          <CopyEmail email={profile.email} />

          <dl className={styles.rows}>
            <div>
              <dt className="mono">Phone</dt>
              <dd>
                <a href={telHref(profile.phone.primary)}>{profile.phone.primary}</a>
                <span>WhatsApp too</span>
              </dd>
            </div>
            <div>
              <dt className="mono">Alternate</dt>
              <dd>
                <a href={telHref(profile.phone.alternate.number)}>{profile.phone.alternate.number}</a>
                <span>{profile.phone.alternate.label}</span>
              </dd>
            </div>
            <div>
              <dt className="mono">Elsewhere</dt>
              <dd className={styles.links}>
                {profile.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label} ↗
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
