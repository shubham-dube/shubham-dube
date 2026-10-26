# dubey.app

Shubham Dubey's portfolio: Next.js 16 (App Router, fully static), TypeScript, CSS Modules on a token-based design system, plus one WebGL2 shader.

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # typecheck + lint + tests + production build
```

## Editing content (no code changes needed)
Everything shown on the site and on the printable résumé comes from `src/content/`:

| File | What it holds |
|---|---|
| `profile.ts` | Name, headline, about, contact details, social links |
| `highlights.ts` | The proof numbers under the hero |
| `projects.ts` | Every project. `tier` decides placement (`flagship` gets a big feature on the home page, `selected` goes in the home grid, `archive` appears on /work only). A `caseStudy` gives it a `/work/[slug]` page |
| `experience.ts` | Roles, newest first; `projects` links to project slugs |
| `skills.ts` | Skill groups with honest levels |
| `recognition.ts` | Awards and education |

The types live in `src/content/schema.ts`. `src/content/content.test.ts` guards the house rules: unique slugs, valid cross-references, a case study for every flagship, no percentages, no private details, https links only.

**Adding a screenshot:** put the image in `public/work/` and set `cover: '/work/name.png'` on the project. It replaces the drawn poster.

## Structure
- `DESIGN.md`: the design system (principles, tokens, type roles, signature pieces)
- `src/styles/tokens.css`: every raw value; components use semantic tokens only
- `src/components/ui`: primitives · `site`: header, footer, theme · `hero`: the 3D form · `home`: home sections · `work`: cards, case study, index · `posters`: SVG project posters
- `src/app/(site)`: pages with site chrome · `src/app/resume`: print-first résumé (Print → Save as PDF)

## The hero shader
`components/hero/liquid-shader.ts` (GLSL) and `liquid-renderer.ts` (loop and guards). It loads after first paint, caps the device pixel ratio at 1.5, drops resolution when frames are slow, pauses off-screen and in hidden tabs, draws one still frame under reduced motion, and leaves a CSS orb in place if WebGL2 is unavailable.
