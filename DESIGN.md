# Design system — "Quiet Precision"

The site should feel like a well-made instrument. It is calm, exact and warm, with one beautiful
moving object. Everything else gets out of the way of the work.

## Principles
1. **The work is the hero.** Decoration exists only where it explains something: a poster that
   shows what a project does, or a diagram of how it works.
2. **One moment of wonder.** The 3D form in the hero is the only heavy visual. Everywhere else,
   motion is short (≤ 600 ms), purposeful and switched off by `prefers-reduced-motion`.
3. **Editorial hierarchy.** A serif display face for voice, a grotesk for reading, mono for facts
   (dates, indices, metrics). Each type role is used only for that job.
4. **Hairlines, not boxes.** Structure comes from 1 px rules and space. Surfaces are flat, with at
   most one level of elevation.
5. **One accent.** *Ember* marks the single most important thing in a view: live status, the
   primary action, the active item. It is never used for decoration.
6. **Honest content.** Only real numbers. No percentages. Ratings only for skills that hold up in
   an interview.

## Tokens (`src/styles/tokens.css`)
Components use semantic tokens only (`--fg`, `--surface`, `--accent`), never raw values.

| Group | Tokens |
|---|---|
| Colour | `--bg`, `--surface`, `--surface-2`, `--fg`, `--fg-2`, `--fg-3`, `--line`, `--line-strong`, `--accent`, `--accent-fg`, `--accent-soft`, `--ok` |
| Type | `--font-display` (Instrument Serif), `--font-sans` (Geist), `--font-mono` (Geist Mono); fluid sizes `--t-mono`, `--t-sm`, `--t-base`, `--t-lg`, `--t-xl`, `--t-2xl`, `--t-3xl`, `--t-hero` |
| Space | `--s-1` … `--s-12` (4 px base, then a geometric scale), `--section` (vertical rhythm), `--gutter` |
| Shape | `--r-sm` 6, `--r-md` 12, `--r-lg` 20, `--r-pill` |
| Motion | `--ease-out` (expo-ish), `--ease-in-out`, `--d-fast` 160 ms, `--d-base` 320 ms, `--d-slow` 600 ms |
| Layout | `--max` 1320 px, 12-column grid inside `Container` |

Themes: dark by default, light follows the system setting or the toggle (`data-theme` on `<html>`,
set before paint). Both themes are first class. Text contrast is at least 4.5:1, and ember is used
only for large text or for non-text marks.

## Type roles
- **Display** (serif, 400, tight leading −0.02em): the hero name, section statements, case-study titles.
  Italic is used for one emphasised word per heading.
- **Sans** (Geist): body copy at 16–18 px, line height 1.6, measure ≤ 68ch.
- **Mono** (uppercase, +0.08em, 11–12 px): eyebrows, indices (`01`), dates, stack tags, metric labels.

## Components (`src/components/ui`)
`Container` · `Section` (index + eyebrow + statement) · `Button` (primary / ghost / link) · `Tag` ·
`Meter` (3-step skill level) · `Reveal` (in-view fade) · `Metric` (value + label) · `ArrowLink`.

## Signature pieces
- **Hero form** (`components/hero/LiquidForm`) is a raymarched liquid-metal shape in one WebGL2
  fragment shader, with no 3D library. It renders at a capped resolution, scales itself down when
  frames are slow, pauses off-screen and in hidden tabs, and draws one still frame under reduced
  motion. It falls back to a CSS glow when WebGL is missing.
- **Project posters** (`components/posters`) are drawn in SVG/CSS. Each one is a small diagram of
  what the project actually does: reminder cadences, API calls, waveforms, a taint graph. They share
  one visual grammar (hairlines, mono labels, one ember mark). A real screenshot can replace a
  poster later through `project.cover`.
- **Pipelines** are each case study's architecture, drawn from data as a numbered flow.

## Layout
- Container max 1320 px. Gutters are 16 px on phones and 32–48 px on desktop. The page never scrolls
  sideways at 390 px.
- Sections open with `01 — Label` in mono, followed by a serif statement.
- Case studies use a two-column layout (sticky facts on the left, story on the right) that stacks
  below 900 px.

## Content rules
- No percentage figures anywhere (a test enforces this).
- Money in lakhs, written as "5 LPA", only if it is ever needed.
- The alternate phone number is the co-founder's (Nandini Raj).
- No father's number, home address or stipends on the public site.
