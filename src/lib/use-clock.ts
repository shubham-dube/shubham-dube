'use client';

import { useSyncExternalStore } from 'react';

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

/** Current time in a timezone, "14:05". Empty during SSR so markup matches. */
export function useClock(timeZone: string): string {
  return useSyncExternalStore(
    subscribe,
    () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }).format(new Date()),
    () => '',
  );
}
