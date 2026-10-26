import s from './Poster.module.css';
import { PosterFrame } from './PosterFrame';

const BARS = 46;

/** A spoken sentence becoming a scoring event. */
export function TrippleDoublePoster() {
  return (
    <PosterFrame code="TD-03" label="Voice scoring" status="In production">
      {/* Court geometry, very faint. */}
      <path d="M140 500 A 260 260 0 0 1 660 500" className={s.stroke} />
      <path d="M300 500 A 100 100 0 0 1 500 500" className={s.stroke} />

      <text x="70" y="128" className={s.tSm}>
        Listening · local STT
      </text>
      {Array.from({ length: BARS }, (_, i) => {
        const h = 8 + Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21)) * 92 + (i % 3) * 4;
        const lit = i > 30;
        return (
          <rect
            key={i}
            x={70 + i * 7}
            y={230 - h / 2}
            width="3.5"
            height={h}
            rx="1.75"
            className={lit ? s.accent : s.fg3}
            fillOpacity={lit ? 1 : 0.55}
          />
        );
      })}
      <rect x="70" y="316" width="318" height="56" rx="28" className={s.panel} />
      <text x="96" y="349" className={s.t}>
        “Three from the corner, 23”
      </text>

      <path d="M402 230h44" className={`${s.strokeAccent} ${s.flow}`} />

      <rect x="460" y="110" width="280" height="262" rx="16" className={s.panel} />
      <text x="490" y="146" className={s.tSm}>
        Home
      </text>
      <text x="710" y="146" textAnchor="end" className={s.tSm}>
        Away
      </text>
      <text x="490" y="236" className={s.tXl}>
        86
      </text>
      <text x="710" y="236" textAnchor="end" className={s.tXl} fillOpacity="0.45">
        84
      </text>
      <line x1="600" y1="170" x2="600" y2="240" className={s.stroke} />
      <line x1="484" y1="270" x2="716" y2="270" className={s.stroke} />
      <rect x="484" y="296" width="134" height="48" rx="10" className={s.accentSoft} />
      <text x="502" y="326" className={s.t}>
        <tspan className={s.fg}>+3</tspan> · #23
      </text>
      <text x="716" y="326" textAnchor="end" className={s.tSm}>
        Q4 · 02:14
      </text>
    </PosterFrame>
  );
}
