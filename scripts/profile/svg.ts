/**
 * Tiny helpers for building the profile SVGs as strings. Every piece of text
 * goes through `text()`, which records its characters per font so the build
 * can fetch font subsets that contain exactly those glyphs.
 */

export type FontRole = 'serif' | 'serifItalic' | 'sans' | 'sansMedium' | 'mono';

export const glyphs: Record<FontRole, Set<string>> = {
  serif: new Set(),
  serifItalic: new Set(),
  sans: new Set(),
  sansMedium: new Set(),
  mono: new Set(),
};

export function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const roleStyle: Record<FontRole, string> = {
  serif: "font-family:'Instrument Serif',Georgia,serif",
  serifItalic: "font-family:'Instrument Serif',Georgia,serif;font-style:italic",
  sans: "font-family:'Geist',system-ui,sans-serif",
  sansMedium: "font-family:'Geist',system-ui,sans-serif;font-weight:500",
  mono: "font-family:'Geist Mono',ui-monospace,monospace;text-transform:uppercase",
};

interface TextOpts {
  x: number;
  y: number;
  size: number;
  fill: string;
  role: FontRole;
  anchor?: 'start' | 'middle' | 'end';
  tracking?: number;
  opacity?: number;
}

export function text(content: string, o: TextOpts): string {
  const shown = o.role === 'mono' ? content.toUpperCase() : content;
  for (const ch of shown) glyphs[o.role].add(ch);
  const attrs = [
    `x="${o.x}"`,
    `y="${o.y}"`,
    `font-size="${o.size}"`,
    `fill="${o.fill}"`,
    o.anchor ? `text-anchor="${o.anchor}"` : '',
    o.tracking ? `letter-spacing="${o.tracking}"` : '',
    o.opacity !== undefined ? `fill-opacity="${o.opacity}"` : '',
    `style="${roleStyle[o.role]}"`,
  ];
  return `<text ${attrs.filter(Boolean).join(' ')}>${esc(shown)}</text>`;
}

/** Greedy word wrap by an average glyph width (em fraction), good enough for short copy. */
export function wrap(s: string, size: number, maxWidth: number, em = 0.5): string[] {
  const max = Math.floor(maxWidth / (size * em));
  const lines: string[] = [];
  let line = '';
  for (const word of s.split(/\s+/)) {
    if (line && (line + ' ' + word).length > max) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** A 40px hairline grid and corner registration marks, shared by every graphic. */
export function frame(w: number, h: number, line: string, mark: string, id: string): string {
  const marks = [
    [28, 28],
    [w - 28, 28],
    [28, h - 28],
    [w - 28, h - 28],
  ]
    .map(([x, y]) => `<path d="M${x - 6} ${y}h12M${x} ${y - 6}v12" stroke="${mark}" stroke-width="1.2"/>`)
    .join('');
  return `<defs><pattern id="grid-${id}" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="${line}" stroke-width="1"/></pattern></defs>
<rect width="${w}" height="${h}" fill="url(#grid-${id})"/>${marks}`;
}

export const FONT_PLACEHOLDER = '/*__FONTS__*/';
