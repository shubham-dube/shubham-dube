/**
 * The single entry point for content. Pages import from here, never from the
 * data files directly, so lookups and ordering rules live in one place.
 */
import { experience } from './experience';
import { highlights } from './highlights';
import { profile } from './profile';
import { projects } from './projects';
import { awards, education } from './recognition';
import type { Domain, Project } from './schema';
import { skillGroups, skillLevelLabel } from './skills';

export { awards, education, experience, highlights, profile, projects, skillGroups, skillLevelLabel };
export type * from './schema';

/** Newest first — for the archive index. */
export const projectsByDate = [...projects].sort((a, b) => b.period.start.localeCompare(a.period.start));

export const flagshipProjects = projects.filter((p) => p.tier === 'flagship');
export const selectedProjects = projects.filter((p) => p.tier === 'selected');

/** Projects that get their own /work/[slug] page. */
export const caseStudies = projects.filter((p): p is Project & { caseStudy: NonNullable<Project['caseStudy']> } =>
  Boolean(p.caseStudy),
);

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Previous / next case study, wrapping around — for the footer of a case study. */
export function adjacentCaseStudies(slug: string) {
  const i = caseStudies.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  const n = caseStudies.length;
  return { prev: caseStudies[(i - 1 + n) % n], next: caseStudies[(i + 1) % n] };
}

export const domainLabel: Record<Domain, string> = {
  founder: 'Founder',
  backend: 'Backend',
  mobile: 'Mobile',
  ai: 'AI',
  web: 'Web',
  security: 'Security',
  data: 'Data',
  systems: 'Systems',
};

export const statusLabel: Record<Project['status'], string> = {
  live: 'Live',
  production: 'In production',
  'in-use': 'In use',
  complete: 'Complete',
  building: 'Building',
  archived: 'Archived',
};

export const contextLabel: Record<Project['context'], string> = {
  founder: 'Startup',
  product: 'Own product',
  work: 'Work',
  personal: 'Personal',
  hackathon: 'Hackathon',
  academic: 'Academic',
};
