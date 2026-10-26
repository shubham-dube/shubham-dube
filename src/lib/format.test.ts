import { describe, expect, it } from 'vitest';
import { formatPeriod, formatYears, telHref } from './format';

describe('formatPeriod', () => {
  it('handles open, single-month, same-year and multi-year periods', () => {
    expect(formatPeriod({ start: '2026-06' })).toBe('Jun 2026 — Present');
    expect(formatPeriod({ start: '2026-04', end: '2026-04' })).toBe('Apr 2026');
    expect(formatPeriod({ start: '2024-07', end: '2024-10' })).toBe('Jul — Oct 2024');
    expect(formatPeriod({ start: '2025-01', end: '2026-05' })).toBe('Jan 2025 — May 2026');
  });
});

describe('formatYears', () => {
  it('compacts years', () => {
    expect(formatYears({ start: '2026-06' })).toBe('2026 —');
    expect(formatYears({ start: '2025-01', end: '2026-05' })).toBe('2025 — 26');
    expect(formatYears({ start: '2024-03', end: '2024-03' })).toBe('2024');
  });
});

it('builds tel hrefs', () => {
  expect(telHref('+91 76878 77772')).toBe('tel:+917687877772');
});
