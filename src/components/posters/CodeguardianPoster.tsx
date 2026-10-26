import s from './Poster.module.css';
import { PosterFrame } from './PosterFrame';

type N = { id: string; x: number; y: number; label: string; taint?: boolean };

const nodes: N[] = [
  { id: 'src', x: 120, y: 170, label: 'req.query.id', taint: true },
  { id: 'parse', x: 300, y: 230, label: 'parseInput()', taint: true },
  { id: 'build', x: 480, y: 170, label: 'buildQuery()', taint: true },
  { id: 'sink', x: 660, y: 250, label: 'db.exec()', taint: true },
  { id: 'auth', x: 170, y: 340, label: 'auth()' },
  { id: 'log', x: 360, y: 380, label: 'logger.info()' },
  { id: 'cache', x: 560, y: 380, label: 'cache.get()' },
  { id: 'render', x: 420, y: 110, label: 'render()' },
];

const edges: [string, string][] = [
  ['src', 'parse'],
  ['parse', 'build'],
  ['build', 'sink'],
  ['src', 'auth'],
  ['parse', 'log'],
  ['build', 'render'],
  ['build', 'cache'],
  ['auth', 'log'],
  ['cache', 'sink'],
];

const at = (id: string) => nodes.find((n) => n.id === id)!;

/** A taint path from user input to a database sink, confirmed by exploitation. */
export function CodeguardianPoster() {
  return (
    <PosterFrame code="CG-05" label="Taint analysis" status="Complete">
      {edges.map(([a, b]) => {
        const p = at(a);
        const q = at(b);
        const taint = p.taint && q.taint;
        return (
          <line
            key={a + b}
            x1={p.x}
            y1={p.y}
            x2={q.x}
            y2={q.y}
            className={taint ? `${s.strokeAccent} ${s.flow}` : `${s.stroke} ${s.dash}`}
          />
        );
      })}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r={n.taint ? 9 : 6} className={n.taint ? s.accent : s.panel} />
          {n.taint && <circle cx={n.x} cy={n.y} r="18" className={s.accentSoft} />}
          <text x={n.x} y={n.y + (n.y > 300 ? 30 : -24)} textAnchor="middle" className={n.taint ? s.t : s.tSm}>
            {n.label}
          </text>
        </g>
      ))}
      <rect x="560" y="290" width="186" height="34" rx="17" className={s.panel} />
      <circle cx="580" cy="307" r="5" className={s.ok} />
      <text x="594" y="311" className={s.tSm}>
        Confirmed · SQL injection
      </text>
      <text x="44" y="456" className={s.tSm}>
        Exploit replayed in shadow environment · merge blocked
      </text>
    </PosterFrame>
  );
}
