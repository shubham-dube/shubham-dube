'use client';

import { useClock } from '@/lib/use-clock';

export function LocalTime({ timeZone }: { timeZone: string }) {
  const time = useClock(timeZone);
  if (!time) return null;
  return (
    <span className="mono" style={{ color: 'var(--fg-3)', marginLeft: '0.5em' }}>
      <time suppressHydrationWarning>{time}</time> IST
    </span>
  );
}
