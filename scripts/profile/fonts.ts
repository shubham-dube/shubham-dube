import { glyphs, type FontRole } from './svg';

// A desktop Chrome user agent makes Google Fonts answer with woff2.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const families: { query: string; roles: FontRole[] }[] = [
  { query: 'Instrument+Serif:ital@0;1', roles: ['serif', 'serifItalic'] },
  { query: 'Geist:wght@400;500', roles: ['sans', 'sansMedium'] },
  { query: 'Geist+Mono', roles: ['mono'] },
];

/**
 * @font-face rules with every font inlined as a data URI, subset to exactly the
 * glyphs the graphics use. SVGs shown as <img> can't load external fonts, so
 * this is the only way the README renders in the site's typefaces.
 */
export async function inlineFontCss(): Promise<string> {
  const parts: string[] = [];
  for (const fam of families) {
    const chars = [...new Set(fam.roles.flatMap((r) => [...glyphs[r]]))].join('');
    if (!chars) continue;
    const url = `https://fonts.googleapis.com/css2?family=${fam.query}&text=${encodeURIComponent(chars)}`;
    const css = await (await fetch(url, { headers: { 'User-Agent': UA } })).text();
    if (!css.includes('@font-face')) throw new Error(`No fonts returned for ${fam.query}`);
    let out = css;
    for (const [, src] of css.matchAll(/url\((https:[^)]+)\)/g)) {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`Font download failed: ${res.status} ${src}`);
      const b64 = Buffer.from(await res.arrayBuffer()).toString('base64');
      out = out.replace(src, `data:font/woff2;base64,${b64}`);
    }
    // Drop unicode-range: the subset already limits glyphs, and some renderers mishandle it.
    parts.push(out.replace(/\s*unicode-range:[^;]+;/g, '').replace(/\s+/g, ' ').trim());
  }
  return parts.join(' ');
}
