import s from './Poster.module.css';
import { PosterFrame } from './PosterFrame';

const messy = [150, 90, 170, 120, 60, 160, 140, 80, 175, 110, 150, 70, 130];

/** An untidy résumé on the left, the same facts in the company template on the right. */
export function CvmorphPoster() {
  return (
    <PosterFrame code="CV-04" label="Résumé engine" status="In daily use">
      <g transform="rotate(-5 200 270)">
        <rect x="90" y="96" width="220" height="330" rx="10" className={s.panel} />
        <rect x="110" y="118" width="44" height="44" rx="22" className={s.soft} />
        {messy.map((w, i) => (
          <rect key={i} x={110 + (i % 4 === 0 ? 0 : 8)} y={182 + i * 17} width={w} height="6" rx="3" className={s.fg3} fillOpacity={0.35 + (i % 3) * 0.15} />
        ))}
      </g>

      {[0, 1, 2].map((i) => (
        <path key={i} d={`M330 ${200 + i * 50} C 380 ${200 + i * 50}, 400 ${180 + i * 60}, 450 ${180 + i * 60}`} className={`${s.strokeAccent} ${s.flow}`} strokeWidth="1.5" />
      ))}

      <rect x="470" y="86" width="250" height="350" rx="10" className={s.panel} />
      <rect x="470" y="86" width="250" height="58" rx="10" className={s.accent} />
      <rect x="470" y="124" width="250" height="20" className={s.accent} />
      <text x="492" y="122" fill="var(--accent-fg)" fontSize="11" letterSpacing="1.2">
        CANDIDATE PROFILE
      </text>
      {['Summary', 'Experience', 'Skills'].map((h, i) => (
        <g key={h}>
          <text x="492" y={180 + i * 82} className={s.tSm}>
            {h}
          </text>
          {[176, 150, 120].slice(0, i === 2 ? 2 : 3).map((w, j) => (
            <rect key={j} x="492" y={192 + i * 82 + j * 14} width={w} height="5" rx="2.5" className={s.fg2} fillOpacity="0.4" />
          ))}
        </g>
      ))}
      {['DOCX', 'PDF', 'DRIVE'].map((c, i) => (
        <g key={c}>
          <rect x={492 + i * 66} y="398" width="58" height="22" rx="11" className={s.soft} />
          <text x={521 + i * 66} y="413" textAnchor="middle" className={s.tSm}>
            {c}
          </text>
        </g>
      ))}
    </PosterFrame>
  );
}
