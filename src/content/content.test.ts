import { describe, expect, it } from 'vitest';
import { awards, education, experience, highlights, profile, projects, skillGroups } from './index';

/** Every string anywhere in a value, depth-first. */
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

const all = { highlights, profile, projects, experience, skillGroups, awards, education };

describe('content integrity', () => {
  it('has unique project slugs that are URL-safe', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('only references projects that exist', () => {
    const slugs = new Set(projects.map((p) => p.slug));
    for (const e of experience) for (const s of e.projects) expect(slugs, `${e.id} → ${s}`).toContain(s);
    for (const a of awards) if (a.project) expect(slugs, a.title).toContain(a.project);
  });

  it('gives every flagship a full case study', () => {
    for (const p of projects.filter((x) => x.tier === 'flagship')) {
      expect(p.caseStudy, p.slug).toBeDefined();
      expect(p.caseStudy!.built.length, p.slug).toBeGreaterThanOrEqual(3);
    }
  });

  it('keeps taglines short enough for one line on cards', () => {
    for (const p of projects) expect(p.tagline.length, p.slug).toBeLessThanOrEqual(70);
  });

  it('never shows a percentage (house rule)', () => {
    for (const s of strings(all)) expect(s, s).not.toMatch(/%|per ?cent|percentile/i);
  });

  it('never publishes private details', () => {
    const text = strings(all).join('\n');
    expect(text).not.toMatch(/98724|Dashmesh|stipend|₹/i);
  });

  it('uses https for every external link', () => {
    const links = [...profile.links, ...projects.flatMap((p) => p.links ?? [])];
    for (const l of links) expect(l.href, l.label).toMatch(/^https:\/\//);
  });

  it('orders periods correctly', () => {
    for (const p of [...projects, ...experience]) {
      if (p.period.end) expect(p.period.end >= p.period.start, JSON.stringify(p.period)).toBe(true);
    }
  });
});
