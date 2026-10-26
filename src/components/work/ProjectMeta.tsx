import { contextLabel, statusLabel, type Project } from '@/content';
import { formatYears } from '@/lib/format';
import { StatusDot } from '../ui/Tag';

const liveStatuses = new Set<Project['status']>(['live', 'production', 'in-use']);

/** "2026 — · Startup · ● Live" — the one-line facts above a project title. */
export function ProjectMeta({ project, index }: { project: Project; index?: number }) {
  const live = liveStatuses.has(project.status);
  return (
    <p className="mono" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem 0.9rem', color: 'var(--fg-3)' }}>
      {index !== undefined && <span style={{ color: 'var(--accent)' }}>{String(index + 1).padStart(2, '0')}</span>}
      <span>{formatYears(project.period)}</span>
      <span>{project.org && project.context === 'work' ? project.org : contextLabel[project.context]}</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: live ? 'var(--fg)' : undefined }}>
        <StatusDot tone={live ? 'ok' : project.status === 'building' ? 'accent' : 'muted'} pulse={live || project.status === 'building'} />
        {statusLabel[project.status]}
      </span>
    </p>
  );
}
