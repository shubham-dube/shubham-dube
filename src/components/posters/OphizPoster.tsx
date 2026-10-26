import s from './Poster.module.css';
import { PosterFrame } from './PosterFrame';

const rows = [
  { k: 'Basic', w: 150 },
  { k: 'HRA', w: 74 },
  { k: 'Special', w: 52 },
  { k: 'PF', w: 34, deduct: true },
  { k: 'ESIC', w: 14, deduct: true },
];

/** A payslip built from attendance, and the scale it runs at. */
export function OphizPoster() {
  return (
    <PosterFrame code="OP-09" label="Payroll" status="In production">
      <rect x="70" y="92" width="350" height="352" rx="14" className={s.panel} />
      <text x="94" y="126" className={s.tSm}>
        Payslip · draft
      </text>
      <text x="396" y="126" textAnchor="end" className={s.tSm}>
        26 / 26 payable days
      </text>
      {rows.map((r, i) => (
        <g key={r.k}>
          <text x="94" y={176 + i * 40} className={s.t}>
            {r.k}
          </text>
          <rect x="190" y={166 + i * 40} width="206" height="10" rx="5" className={s.soft} />
          <rect x="190" y={166 + i * 40} width={r.w} height="10" rx="5" className={r.deduct ? s.fg3 : s.fg2} fillOpacity={r.deduct ? 0.7 : 0.6} />
        </g>
      ))}
      <line x1="94" y1="376" x2="396" y2="376" className={s.stroke} />
      <text x="94" y="414" className={s.t}>
        <tspan className={s.fg}>Net pay</tspan>
      </text>
      <rect x="190" y="404" width="206" height="10" rx="5" className={s.accent} />

      <text x="470" y="250" className={s.tXl}>
        10,000+
      </text>
      <text x="474" y="284" className={s.tSm}>
        Employees · many tenants
      </text>
      {['Draft', 'Finalise', 'Payslips'].map((c, i) => (
        <g key={c}>
          <rect x={472 + i * 94} y="330" width="82" height="30" rx="15" className={i === 1 ? s.accentSoft : s.soft} />
          <text x={513 + i * 94} y="349" textAnchor="middle" className={s.tSm}>
            {c}
          </text>
        </g>
      ))}
    </PosterFrame>
  );
}
