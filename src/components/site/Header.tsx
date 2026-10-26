'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { profile } from '@/content';
import styles from './Header.module.css';
import { Mark } from './Mark';
import { ThemeToggle } from './ThemeToggle';

const nav = [
  { href: '/#work', label: 'Work' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation and on Escape; lock page scroll while it's open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={clsx(styles.header, (scrolled || open) && styles.scrolled)}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)} aria-label={`${profile.name}, home`}>
          <Mark />
          <span className={styles.name}>{profile.name}</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <Link href="/resume" className={styles.resume}>
            Résumé
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={clsx(styles.sheet, open && styles.sheetOpen)} hidden={!open}>
        <nav aria-label="Mobile">
          {[...nav, { href: '/work', label: 'All projects' }, { href: '/resume', label: 'Résumé' }].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`display ${styles.sheetLink}`}
              style={{ '--i': i } as React.CSSProperties}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a className={`mono ${styles.sheetMail}`} href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </div>
    </header>
  );
}
