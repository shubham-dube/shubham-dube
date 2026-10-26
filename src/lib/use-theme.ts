'use client';

import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => mo.disconnect();
}

const read = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

/** The theme lives on <html data-theme> (set before paint in the layout); this mirrors it. */
export function useTheme() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, read, () => null);
  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private mode: the choice just won't persist */
    }
  }, []);
  return { theme, setTheme };
}
