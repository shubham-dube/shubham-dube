import s from './Poster.module.css';
import { PosterFrame } from './PosterFrame';

const json: [string, string, boolean?][] = [
  ['gstin', '"29ABCDE1234F1Z5"'],
  ['legal_name', '"Acme Traders"'],
  ['status', '"Active"', true],
  ['type', '"Regular"'],
  ['state', '"Karnataka"'],
];

/** A CAPTCHA solved without a human, and the clean JSON that comes back. */
export function GstverifyPoster() {
  const glyphs = ['x', '7', 'K', 'q', '2'];
  return (
    <PosterFrame code="GV-02" label="Public API" status="Live · 120+ users">
      <rect x="60" y="100" width="300" height="330" rx="14" className={s.panel} />
      <text x="84" y="134" className={s.tSm}>
        Portal CAPTCHA
      </text>
      <rect x="84" y="150" width="252" height="92" rx="8" className={s.soft} />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M92 ${178 + i * 22} C 160 ${150 + i * 30}, 240 ${220 - i * 20}, 330 ${170 + i * 18}`} className={s.stroke} />
      ))}
      {glyphs.map((g, i) => (
        <text
          key={i}
          x={120 + i * 44}
          y={210}
          className={s.tLg}
          transform={`rotate(${[-14, 9, -6, 16, -10][i]} ${120 + i * 44} 200)`}
          style={{ fontStyle: i % 2 ? 'italic' : 'normal' }}
        >
          {g}
        </text>
      ))}
      <text x="84" y="290" className={s.tSm}>
        ddocr
      </text>
      <line x1="84" y1="306" x2="336" y2="306" className={s.stroke} />
      <text x="84" y="346" className={s.code}>
        solved → x7Kq2
      </text>
      <circle cx="324" cy="342" r="12" className={s.accent} />
      <path d="M318 342.5l4 4 8-8" fill="none" stroke="var(--accent-fg)" strokeWidth="2" strokeLinecap="round" />
      <text x="84" y="398" className={s.tSm}>
        No human in the loop
      </text>

      <path d="M372 265h36" className={`${s.strokeAccent} ${s.flow}`} />
      <rect x="420" y="100" width="320" height="330" rx="14" className={s.panel} />
      <text x="444" y="134" className={s.tSm}>
        Response · 200 OK
      </text>
      <text x="444" y="180" className={s.code}>
        {'{'}
      </text>
      {json.map(([k, v, ok], i) => (
        <text key={k} x="462" y={210 + i * 32} className={s.code}>
          <tspan className={s.fg3}>&quot;{k}&quot;: </tspan>
          <tspan className={ok ? s.ok : s.fg}>{v}</tspan>
        </text>
      ))}
      <text x="444" y="390" className={s.code}>
        {'}'}
      </text>
    </PosterFrame>
  );
}
