# athmanebenarous.com

Source for [athmanebenarous.com](https://athmanebenarous.com): a static [Astro](https://astro.build) site with no framework runtime and one small script.

## Run it

Requires Node 22.12 or newer.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve dist/
npm run check     # type-check content, pages and scripts
```

## Where things live

| To change | Edit |
| --- | --- |
| Hero, education, skills, contact | `src/content/profile/profile.yaml` |
| A job | `src/content/experience/<slug>.md` |
| A case study (`/work/<slug>`) | `src/content/work/<slug>.md` |
| A paper (`/research#<slug>`) | `src/content/papers/<slug>.md`, PDF in `public/papers/` |
| A project | `src/content/projects/<slug>.md` |
| CVs | `public/cv.pdf`, `public/cv-fr.pdf` |
| Colors and fonts | `src/styles/tokens.css` |

Every content file is checked against the schema in `src/content.config.ts` at build time, so a typo in a date or a missing field fails the build instead of shipping.

Case-study diagrams are written as `<!-- diagram: name | caption -->` in the Markdown and defined in `src/lib/diagrams.mjs`.

Maintenance notes (hosting, previews, rollback): [MAINTAINING.md](MAINTAINING.md). The old site lives on the `legacy` branch.
