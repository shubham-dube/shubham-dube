import s from './Poster.module.css';
import { stack } from './layout';
import { PosterFrame } from './PosterFrame';

const steps = [
  { x: 110, when: '−3 D', ch: 'E', name: 'Email' },
  { x: 250, when: 'DUE', ch: 'W', name: 'WhatsApp' },
  { x: 390, when: '+7 D', ch: 'S', name: 'SMS' },
  { x: 530, when: '+14 D', ch: 'C', name: 'Call' },
];

const aging = [
  { w: 236, o: 0.22, label: 'Current' },
  { w: 150, o: 0.4, label: '1–30' },
  { w: 112, o: 0.6, label: '31–60' },
  { w: 80, o: 0.8, label: '61–90' },
  { w: 62, o: 1, label: '90+' },
];

const agingBar = stack(aging, (a) => a.w, 80);

/** A reminder cadence running to "Paid", over the aging of the book. */
export function CreditouchPoster() {
  return (
    <PosterFrame code="CT-01" label="Receivables" status="Building">
      <text x="80" y="118" className={s.tSm}>
        Reminder schedule · enterprise
      </text>
      <line x1="110" y1="190" x2="690" y2="190" className={`${s.stroke}`} />
      <line x1="110" y1="190" x2="690" y2="190" className={`${s.strokeAccent} ${s.flow}`} strokeOpacity="0.7" />
      {steps.map((st) => (
        <g key={st.x}>
          <text x={st.x} y="152" textAnchor="middle" className={s.tSm}>
            {st.when}
          </text>
          <circle cx={st.x} cy="190" r="20" className={s.panel} />
          <text x={st.x} y="195" textAnchor="middle" className={s.t}>
            {st.ch}
          </text>
          <text x={st.x} y="236" textAnchor="middle" className={s.t}>
            {st.name}
          </text>
        </g>
      ))}
      <circle cx="690" cy="190" r="24" className={s.accent} />
      <path d="M680 190.5l7 7 13-14" fill="none" stroke="var(--accent-fg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="690" y="152" textAnchor="middle" className={s.tSm}>
        Paid
      </text>

      <text x="80" y="312" className={s.tSm}>
        Outstanding
      </text>
      <text x="80" y="356" className={s.tLg}>
        48.2 L
      </text>
      <text x="720" y="356" textAnchor="end" className={s.t}>
        142 debtors · 6 promises due
      </text>
      {agingBar.map((a) => (
        <g key={a.label}>
          <rect x={a.start} y="380" width={a.w - 3} height="26" rx="4" className={s.accent} fillOpacity={a.o} />
          <text x={a.start} y="430" className={s.tSm}>
            {a.label}
          </text>
        </g>
      ))}
    </PosterFrame>
  );
}
