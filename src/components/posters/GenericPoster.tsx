import type { Domain, Project } from '@/content/schema';
import s from './Poster.module.css';
import { PosterFrame } from './PosterFrame';

/** A small line glyph per domain, drawn in a 120×120 box. */
function Glyph({ domain }: { domain: Domain }) {
  switch (domain) {
    case 'ai':
      return (
        <g>
          {[18, 36, 54].map((r) => (
            <circle key={r} cx="60" cy="60" r={r} className={s.stroke} />
          ))}
          {[0, 1, 2, 3, 4].map((i) => {
            const a = (i / 5) * Math.PI * 2 - 0.4;
            return <circle key={i} cx={60 + Math.cos(a) * 36} cy={60 + Math.sin(a) * 36} r="4" className={i === 1 ? s.accent : s.fg2} />;
          })}
        </g>
      );
    case 'mobile':
      return (
        <g>
          <rect x="34" y="6" width="52" height="108" rx="12" className={s.strokeFg} />
          <rect x="44" y="24" width="32" height="40" rx="4" className={s.accentSoft} />
          <rect x="44" y="72" width="32" height="5" rx="2.5" className={s.fg3} />
          <rect x="44" y="84" width="22" height="5" rx="2.5" className={s.fg3} />
        </g>
      );
    case 'web':
      return (
        <g>
          <rect x="6" y="18" width="108" height="84" rx="8" className={s.strokeFg} />
          <line x1="6" y1="36" x2="114" y2="36" className={s.stroke} />
          <circle cx="18" cy="27" r="3" className={s.accent} />
          <rect x="20" y="50" width="48" height="36" rx="4" className={s.accentSoft} />
          <rect x="76" y="50" width="26" height="6" rx="3" className={s.fg3} />
          <rect x="76" y="62" width="20" height="6" rx="3" className={s.fg3} />
        </g>
      );
    case 'systems':
    case 'security':
      return (
        <g>
          <rect x="6" y="18" width="108" height="84" rx="8" className={s.strokeFg} />
          <path d="M24 46l14 12-14 12" className={s.strokeAccent} />
          <rect x="46" y="66" width="34" height="5" rx="2.5" className={s.fg2} />
        </g>
      );
    case 'data':
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <ellipse key={i} cx="60" cy={26 + i * 32} rx="44" ry="12" className={i === 0 ? s.strokeAccent : s.strokeFg} />
          ))}
        </g>
      );
    default:
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <rect key={i} x="14" y={14 + i * 34} width="92" height="24" rx="6" className={i === 1 ? s.accentSoft : s.panel} />
          ))}
        </g>
      );
  }
}

/** For projects without a bespoke poster: name, domain glyph and stack, same grammar. */
export function GenericPoster({ project, index }: { project: Project; index: number }) {
  const domain = project.domains[0];
  return (
    <PosterFrame code={`P-${String(index + 1).padStart(2, '0')}`} label={domain} status={project.period.start.slice(0, 4)}>
      <g transform="translate(620 96)">
        <Glyph domain={domain} />
      </g>
      <text x="44" y="380" className={s.tXl} fontSize={Math.min(76, Math.round(1250 / project.name.length))}>
        {project.name}
      </text>
      <text x="46" y="428" className={s.tSm}>
        {project.stack.slice(0, 5).join(' · ')}
      </text>
    </PosterFrame>
  );
}
