import s from './Poster.module.css';
import { PosterFrame } from './PosterFrame';
import { qrModules } from './qr';

const CELL = 12;
const spark = [22, 30, 26, 44, 38, 52, 47, 60, 56, 72, 64, 78];

/** The printable QR on the machine, and what scanning it opens. */
export function AssetcopPoster() {
  const grid = qrModules(1407);
  return (
    <PosterFrame code="AC-07" label="Asset lifecycle" status="On Google Play">
      <rect x="76" y="104" width={21 * CELL + 40} height={21 * CELL + 40} rx="14" className={s.panel} />
      {grid.flatMap((row, r) =>
        row.map((on, c) =>
          on ? <rect key={`${r}-${c}`} x={96 + c * CELL} y={124 + r * CELL} width={CELL - 1} height={CELL - 1} rx="2" className={s.fg} fillOpacity="0.85" /> : null,
        ),
      )}
      <rect x={96 + 8 * CELL} y={124 + 8 * CELL} width={CELL * 5} height={CELL * 5} rx="6" className={s.accent} />
      <text x="76" y="430" className={s.tSm}>
        Scan · AC-UNIT-014
      </text>

      <path d="M378 230h40" className={`${s.strokeAccent} ${s.flow}`} />

      <rect x="430" y="104" width="310" height="292" rx="14" className={s.panel} />
      <text x="454" y="138" className={s.tSm}>
        Asset
      </text>
      <text x="454" y="180" className={s.tLg} fontSize="34">
        Compressor 14
      </text>
      {[
        ['Session', '3h 12m · running'],
        ['Next service', '12 Nov'],
        ['Thread', '4 invoices · 2 logs'],
      ].map(([k, v], i) => (
        <g key={k}>
          <line x1="454" y1={206 + i * 38} x2="716" y2={206 + i * 38} className={s.stroke} />
          <text x="454" y={230 + i * 38} className={s.tSm}>
            {k}
          </text>
          <text x="716" y={230 + i * 38} textAnchor="end" className={s.t}>
            {v}
          </text>
        </g>
      ))}
      <polyline
        points={spark.map((v, i) => `${454 + i * 23.8},${380 - v * 0.6}`).join(' ')}
        className={s.strokeAccent}
        strokeLinejoin="round"
      />
    </PosterFrame>
  );
}
