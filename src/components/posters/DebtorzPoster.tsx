import s from './Poster.module.css';
import { stack } from './layout';
import { PosterFrame } from './PosterFrame';

const bubbles = [
  { mine: false, text: 'Can you share the ledger?', w: 220 },
  { mine: true, text: 'Sent — 3 invoices attached', w: 230 },
  { mine: false, text: 'Payment goes out Friday', w: 210 },
  { mine: true, text: 'Noted. Reminder paused.', w: 206, queued: true },
];

const donut = [
  { v: 0.42, o: 1 },
  { v: 0.27, o: 0.6 },
  { v: 0.19, o: 0.35 },
  { v: 0.12, o: 0.18 },
];

const TAU = Math.PI * 2;
const donutArcs = stack(donut, (d) => d.v * TAU, -Math.PI / 2);

function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p = (a: number) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1} ${y1}`;
}

/** Local-first chat about an account, beside the book by department. */
export function DebtorzPoster() {
  return (
    <PosterFrame code="DZ-08" label="Local-first chat" status="On Google Play">
      <rect x="70" y="92" width="330" height="352" rx="22" className={s.panel} />
      <text x="96" y="126" className={s.tSm}>
        Mehta Steels · account
      </text>
      {bubbles.map((b, i) => {
        const x = b.mine ? 376 - b.w : 94;
        const y = 150 + i * 66;
        return (
          <g key={i}>
            <rect x={x} y={y} width={b.w} height="44" rx="14" className={b.mine ? s.accentSoft : s.soft} />
            <text x={x + 16} y={y + 27} className={s.t}>
              {b.text}
            </text>
            {b.mine && (
              <text x={x + b.w - 8} y={y + 60} textAnchor="end" className={s.tSm}>
                {b.queued ? 'Queued · offline' : '✓✓ Read'}
              </text>
            )}
          </g>
        );
      })}

      <g>
        {donutArcs.map((d, i) => (
          <path
            key={i}
            d={arc(590, 250, 104, d.start + 0.03, d.start + d.v * TAU - 0.03)}
            stroke="var(--accent)"
            strokeOpacity={d.o}
            strokeWidth="22"
            fill="none"
          />
        ))}
        <text x="590" y="256" textAnchor="middle" className={s.tLg}>
          62
        </text>
        <text x="590" y="282" textAnchor="middle" className={s.tSm}>
          Open accounts
        </text>
        <text x="590" y="414" textAnchor="middle" className={s.tSm}>
          By department · live
        </text>
      </g>
    </PosterFrame>
  );
}
