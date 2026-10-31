/**
 * Builds the GitHub profile README and its graphics from src/content:
 *   README.md, profile/banner-{dark,light}.svg, profile/cards/<slug>-{dark,light}.svg
 *
 * Run with `npm run profile` after editing content. Needs network access for the font subsets.
 */
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { flagshipProjects } from '../../src/content';
import { site } from '../../src/lib/site';
import { inlineFontCss } from './fonts';
import { banner, card, type ThemeName } from './graphics';
import { readme } from './readme';
import { FONT_PLACEHOLDER } from './svg';

const root = join(import.meta.dirname, '..', '..');
const out = join(root, 'profile');
const themes: ThemeName[] = ['dark', 'light'];

async function main() {
  // Render everything first: rendering records which glyphs each font needs.
  const files = new Map<string, string>();
  for (const theme of themes) {
    files.set(join(out, `banner-${theme}.svg`), banner(theme));
    flagshipProjects.forEach((p, i) => files.set(join(out, 'cards', `${p.slug}-${theme}.svg`), card(p, i, theme)));
  }

  const fontCss = await inlineFontCss();

  await rm(out, { recursive: true, force: true });
  await mkdir(join(out, 'cards'), { recursive: true });
  for (const [path, svg] of files) await writeFile(path, svg.replace(FONT_PLACEHOLDER, fontCss));
  await writeFile(join(root, 'README.md'), readme(site.url));

  const kb = [...files.values()].reduce((n, s) => n + s.length + fontCss.length, 0) / 1024;
  console.log(`Wrote README.md and ${files.size} graphics (${kb.toFixed(0)} KB) to profile/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
