import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { profile } from '@/content';
import { telHref } from '@/lib/format';
import styles from './Footer.module.css';
import { Mark } from './Mark';

const siteLinks = [
  { href: '/#work', label: 'Work' },
  { href: '/work', label: 'All projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#about', label: 'About' },
  { href: '/resume', label: 'Résumé' },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Mark size={28} />
            <p>
              <strong>{profile.name}</strong>
              <span>{profile.role}</span>
            </p>
          </div>

          <nav className={styles.cols} aria-label="Footer">
            <div>
              <p className="mono">Site</p>
              <ul>
                {siteLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mono">Elsewhere</p>
              <ul>
                {profile.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mono">Contact</p>
              <ul>
                <li>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </li>
                <li>
                  <a href={telHref(profile.phone.primary)}>{profile.phone.primary}</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <p className={`display ${styles.wordmark}`} aria-hidden>
          dubey<em>.app</em>
        </p>

        <div className={`mono ${styles.bottom}`}>
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Designed and built by hand · Next.js, CSS and one shader</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </Container>
    </footer>
  );
}
