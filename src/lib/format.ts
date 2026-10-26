import type { Period, YearMonth } from '@/content/schema';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatYearMonth(ym: YearMonth): string {
  const [y, m] = ym.split('-');
  return `${MONTHS[Number(m) - 1]} ${y}`;
}

/** "Jun 2026 — Present", "Apr 2026" (single month), "Jul — Oct 2024" (same year). */
export function formatPeriod({ start, end }: Period): string {
  if (!end) return `${formatYearMonth(start)} — Present`;
  if (start === end) return formatYearMonth(start);
  const [sy] = start.split('-');
  const [ey] = end.split('-');
  if (sy === ey) return `${MONTHS[Number(start.split('-')[1]) - 1]} — ${formatYearMonth(end)}`;
  return `${formatYearMonth(start)} — ${formatYearMonth(end)}`;
}

/** Year only, for compact indices: "2026", "2025 — 26". */
export function formatYears({ start, end }: Period): string {
  const sy = start.slice(0, 4);
  if (!end) return `${sy} —`;
  const ey = end.slice(0, 4);
  return sy === ey ? sy : `${sy} — ${ey.slice(2)}`;
}

/** tel: href from a display number. */
export function telHref(display: string): string {
  return `tel:${display.replace(/[^+\d]/g, '')}`;
}

export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}
