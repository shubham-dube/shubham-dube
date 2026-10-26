import s from './Poster.module.css';
import { PosterFrame } from './PosterFrame';

const code = [
  'PROCEDURE DIVISION.',
  '    PERFORM INIT-FILES.',
  '    PERFORM CALC-INTEREST',
  "        UNTIL WS-EOF = 'Y'.",
  '    STOP RUN.',
  'CALC-INTEREST.',
  '    COMPUTE WS-INT =',
  '        WS-BAL * WS-RATE.',
];

/** Plain-English questions answered from a graph of legacy code. */
export function CodescrybePoster() {
  return (
    <PosterFrame code="CS-06" label="GraphRAG" status="Runner-up · 2025">
      <rect x="56" y="92" width="350" height="340" rx="14" className={s.panel} />
      <text x="80" y="124" className={s.tSm}>
        LOANS.cbl
      </text>
      <rect x="66" y="216" width="330" height="28" className={s.accentSoft} />
      <rect x="66" y="216" width="3" height="28" className={s.accent} />
      {code.map((l, i) => (
        <text key={i} x="80" y={170 + i * 30} className={s.code} xmlSpace="preserve">
          <tspan className={s.fg3}>{String(i + 1).padStart(2, ' ')} </tspan>
          {l}
        </text>
      ))}

      <rect x="470" y="96" width="270" height="44" rx="22" className={s.soft} />
      <text x="492" y="123" className={s.t}>
        Where is interest calculated?
      </text>

      <rect x="440" y="164" width="300" height="148" rx="14" className={s.panel} />
      <text x="462" y="194" className={s.t}>
        <tspan className={s.fg}>CALC-INTEREST</tspan> in LOANS.cbl,
      </text>
      <text x="462" y="216" className={s.t}>
        called from the main loop until EOF.
      </text>
      {[
        [490, 270, 'MAIN'],
        [590, 250, 'CALC-INTEREST'],
        [700, 280, 'WS-RATE'],
      ].map(([x, y, l], i, arr) => (
        <g key={l}>
          {i > 0 && <line x1={arr[i - 1][0]} y1={arr[i - 1][1]} x2={x} y2={y} className={s.strokeAccent} strokeWidth="1.5" />}
          <circle cx={x} cy={y} r="6" className={s.accent} />
          <text x={x as number} y={(y as number) + 22} textAnchor="middle" className={s.tSm}>
            {l}
          </text>
        </g>
      ))}
      {['COBOL', 'C/C++', 'JAVA', 'PERL', 'SHELL', 'SAS'].map((l, i) => (
        <text key={l} x={440 + i * 52} y="370" className={s.tSm}>
          {l}
        </text>
      ))}
    </PosterFrame>
  );
}
