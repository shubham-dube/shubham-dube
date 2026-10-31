import { contextLabel, highlights, profile, statusLabel, type Project } from '../../src/content';
import { formatYears } from '../../src/lib/format';
import { esc, FONT_PLACEHOLDER, frame, text, wrap } from './svg';

export type ThemeName = 'dark' | 'light';

interface Theme {
  bg: string;
  surface: string;
  fg: string;
  fg2: string;
  fg3: string;
  line: string;
  lineStrong: string;
  accent: string;
  ok: string;
  orbBase: [string, string];
}

/** Mirrors src/styles/tokens.css. */
export const themes: Record<ThemeName, Theme> = {
  dark: {
    bg: '#0a0a0c',
    surface: '#0f0f12',
    fg: '#edebe6',
    fg2: '#a6a49e',
    fg3: '#75736e',
    line: 'rgba(237,235,230,0.06)',
    lineStrong: 'rgba(237,235,230,0.14)',
    accent: '#ff6b3d',
    ok: '#5ee6a8',
    orbBase: ['#3b44b0', '#0c0c12'],
  },
  light: {
    bg: '#f3f1ec',
    surface: '#faf9f6',
    fg: '#121110',
    fg2: '#55534e',
    fg3: '#6f6c66',
    line: 'rgba(18,17,16,0.07)',
    lineStrong: 'rgba(18,17,16,0.16)',
    accent: '#d9461a',
    ok: '#138a5b',
    orbBase: ['#8d97ff', '#2a2a36'],
  },
};

function svg(w: number, h: number, body: string, rawTitle: string): string {
  const title = esc(rawTitle);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}">
<title>${title}</title>
<style>${FONT_PLACEHOLDER}</style>
${body}
</svg>
`;
}

// ── The orb ────────────────────────────────────────────────────────────────

/** A closed, smooth blob through n points (Catmull-Rom → cubic Bézier). Same command shape for every seed, so SMIL can morph between them. */
function blob(cx: number, cy: number, r: number, seed: number, n = 8): string {
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + 0.13 * Math.sin(seed * 1.7 + i * 2.1) + 0.07 * Math.cos(seed * 0.9 + i * 3.3);
    return [cx + Math.cos(a) * r * k, cy + Math.sin(a) * r * k];
  });
  const f = (v: number) => v.toFixed(1);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + 'Z';
}

/** The site's liquid-metal form, approximated in layered gradients, slowly morphing. */
function orb(t: Theme, cx: number, cy: number, r: number, id: string): string {
  const shapes = [0, 1.3, 2.9, 4.2].map((s) => blob(cx, cy, r, s));
  const values = [...shapes, shapes[0]].join(';');
  const anim = `<animate attributeName="d" dur="18s" repeatCount="indefinite" values="${values}" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"/>`;
  const layer = (fill: string, extra = '') => `<path d="${shapes[0]}" fill="${fill}" ${extra}>${anim}</path>`;
  return `<defs>
  <radialGradient id="ob-${id}" cx="45%" cy="40%" r="70%"><stop offset="0" stop-color="${t.orbBase[0]}"/><stop offset="1" stop-color="${t.orbBase[1]}"/></radialGradient>
  <radialGradient id="oe-${id}" cx="78%" cy="80%" r="60%"><stop offset="0" stop-color="${t.accent}"/><stop offset="0.55" stop-color="${t.accent}" stop-opacity="0.35"/><stop offset="1" stop-color="${t.accent}" stop-opacity="0"/></radialGradient>
  <radialGradient id="oh-${id}" cx="30%" cy="24%" r="34%"><stop offset="0" stop-color="#fff" stop-opacity="0.95"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.25"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <radialGradient id="oc-${id}" cx="15%" cy="70%" r="45%"><stop offset="0" stop-color="#7f8cff" stop-opacity="0.55"/><stop offset="1" stop-color="#7f8cff" stop-opacity="0"/></radialGradient>
  <filter id="og-${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="48"/></filter>
</defs>
<g opacity="0.55" filter="url(#og-${id})">${layer(t.accent)}</g>
${layer(`url(#ob-${id})`)}
${layer(`url(#oc-${id})`)}
${layer(`url(#oe-${id})`)}
${layer(`url(#oh-${id})`)}
${layer('none', `stroke="#fff" stroke-opacity="0.18" stroke-width="1.5"`)}
<path d="M${cx - r * 0.62} ${cy - r * 0.28} Q ${cx - r * 0.35} ${cy - r * 0.78} ${cx + r * 0.18} ${cy - r * 0.72}" fill="none" stroke="#fff" stroke-opacity="0.75" stroke-width="3.5" stroke-linecap="round" filter="url(#os-${id})"/>
<defs><filter id="os-${id}"><feGaussianBlur stdDeviation="1.2"/></filter></defs>`;
}

// ── Banner ─────────────────────────────────────────────────────────────────

export function banner(name: ThemeName): string {
  const t = themes[name];
  const W = 1600;
  const H = 640;
  const [first, last] = profile.name.split(' ');
  const stats = highlights.slice(0, 4);
  const col = (W - 160) / stats.length;

  const body = `<defs><clipPath id="clip"><rect width="${W}" height="${H}" rx="28"/></clipPath></defs>
<g clip-path="url(#clip)">
<rect width="${W}" height="${H}" fill="${t.bg}"/>
${frame(W, H, t.line, t.fg3, 'b')}
${orb(t, 1225, 270, 205, 'b')}
<circle cx="88" cy="90" r="5" fill="${t.ok}"><animate attributeName="opacity" values="1;0.35;1" dur="2.4s" repeatCount="indefinite"/></circle>
${text(profile.availability.text, { x: 106, y: 96, size: 17, fill: t.fg2, role: 'mono', tracking: 2 })}
${text('dubey.app', { x: W - 80, y: 96, size: 17, fill: t.fg3, role: 'mono', tracking: 2, anchor: 'end' })}
${text(first, { x: 72, y: 290, size: 178, fill: t.fg, role: 'serif', tracking: -5 })}
${text(last, { x: 160, y: 420, size: 178, fill: t.fg2, role: 'serifItalic', tracking: -5 })}
${text(`${profile.role} · CrediTouch · COPIOUS`, { x: 80, y: 478, size: 17, fill: t.accent, role: 'mono', tracking: 2.4 })}
<line x1="80" y1="530" x2="${W - 80}" y2="530" stroke="${t.lineStrong}"/>
${stats
  .map((s, i) => {
    const x = 80 + i * col;
    return `${i ? `<line x1="${x - 24}" y1="556" x2="${x - 24}" y2="604" stroke="${t.line}"/>` : ''}
${text(s.value, { x, y: 586, size: 40, fill: t.fg, role: 'serif' })}
${text(s.label, { x, y: 612, size: 13, fill: t.fg3, role: 'mono', tracking: 1.6 })}`;
  })
  .join('\n')}
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="28" fill="none" stroke="${t.lineStrong}"/>
</g>`;
  return svg(W, H, body, `${profile.name} — ${profile.role}`);
}

// ── Project cards ──────────────────────────────────────────────────────────

const live = new Set<Project['status']>(['live', 'production', 'in-use']);

/** Approximate rendered width of mono text (Geist Mono ≈ 0.6em per glyph). */
const monoWidth = (s: string, size: number, tracking: number) => s.length * (size * 0.6 + tracking);

export function card(p: Project, index: number, name: ThemeName): string {
  const t = themes[name];
  const W = 800;
  const H = 460;
  const status = statusLabel[p.status];
  const statusColor = live.has(p.status) ? t.ok : p.status === 'building' ? t.accent : t.fg3;
  const statusX = W - 48 - monoWidth(status, 15, 1.6);
  const where = p.org && p.context === 'work' ? p.org : contextLabel[p.context];
  const tagline = wrap(p.tagline, 27, 700, 0.5);
  const proof = p.metrics?.[0] ? { value: p.metrics[0].value, label: p.metrics[0].label } : p.award ? { value: '★', label: p.award } : null;

  const body = `<defs>
  <clipPath id="c"><rect width="${W}" height="${H}" rx="24"/></clipPath>
  <radialGradient id="glow" cx="100%" cy="0%" r="75%"><stop offset="0" stop-color="${t.accent}" stop-opacity="0.16"/><stop offset="1" stop-color="${t.accent}" stop-opacity="0"/></radialGradient>
</defs>
<g clip-path="url(#c)">
<rect width="${W}" height="${H}" fill="${t.surface}"/>
${frame(W, H, t.line, t.fg3, 'c')}
<rect width="${W}" height="${H}" fill="url(#glow)"/>
${text(String(index + 1).padStart(2, '0'), { x: 48, y: 78, size: 15, fill: t.accent, role: 'mono', tracking: 1.6 })}
${text(`${p.period.end ? formatYears(p.period) : `${p.period.start.slice(0, 4)} — now`}  ·  ${where}`, { x: 92, y: 78, size: 15, fill: t.fg3, role: 'mono', tracking: 1.6 })}
<circle cx="${statusX - 14}" cy="73" r="4.5" fill="${statusColor}"/>
${text(status, { x: W - 48, y: 78, size: 15, fill: t.fg, role: 'mono', tracking: 1.6, anchor: 'end' })}
${text(p.name, { x: 44, y: 190, size: p.name.length > 12 ? 70 : 86, fill: t.fg, role: 'serif', tracking: -2 })}
${tagline.map((l, i) => text(l, { x: 48, y: 246 + i * 36, size: 27, fill: t.fg2, role: 'sans' })).join('\n')}
${
  proof
    ? `${text(proof.value, { x: 48, y: 352, size: 40, fill: t.fg, role: 'serif' })}
${text(proof.label, { x: 48 + Math.max(proof.value.length * 22, 30) + 18, y: 346, size: 14, fill: t.fg3, role: 'mono', tracking: 1.4 })}`
    : `${text('Role', { x: 48, y: 322, size: 13, fill: t.fg3, role: 'mono', tracking: 1.4 })}
${text(p.role, { x: 48, y: 354, size: 22, fill: t.fg, role: 'sans' })}`
}
<line x1="48" y1="384" x2="${W - 48}" y2="384" stroke="${t.lineStrong}"/>
${text(p.stack.slice(0, 4).join('  ·  '), { x: 48, y: 422, size: 14, fill: t.fg3, role: 'mono', tracking: 1.4 })}
${text('Case study →', { x: W - 48, y: 423, size: 18, fill: t.accent, role: 'sansMedium', anchor: 'end' })}
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="24" fill="none" stroke="${t.lineStrong}"/>
</g>`;
  return svg(W, H, body, `${p.name} — ${p.tagline}`);
}
