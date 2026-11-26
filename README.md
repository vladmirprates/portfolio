> **Falante de Português?** Leia a [versão em português](README-pt.md).

# Vladmir Prates — Portfolio

Personal portfolio of Vladmir Prates, QA engineer in São Paulo.
Live at **https://vladmirprates.github.io/portfolio/**

Looking for the gamified version? See the [QA Character Sheet](https://vladmirprates.github.io/arpg-character/).

## Stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · Framer Motion · i18next (PT-BR / EN)

## Running locally

```bash
npm install
npm run dev       # dev server
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
npm run lint
```

## Editing content

All text, in both languages, lives in `public/locales/<lang>/translation.json`:

| Section | Key |
| --- | --- |
| Hero test-run card | `hero.spec` |
| Experience | `experience.items` |
| Skills | `skills.groups` |
| Projects | `projects.items` (an `images` list turns a project into the large featured one with a screenshot gallery) |
| Side quests | `side.items` |

Recommendations live in `testimonials.items`: a hand-picked selection from the QA Character Sheet's `src/data/recommendations.ts`. The first one is shown large; `highlight` (an exact phrase from the quote) is emphasised, and `translated` adds a "Translated" label. The button links to the full list on LinkedIn.

The language is picked from `?lang=pt|en`, then the visitor's last choice, then the browser language.

## Deploying

Every push to `master` runs `.github/workflows/deploy.yml`, which lints, builds and publishes `dist/` to GitHub Pages.
In the repository settings, **Pages → Source** must be set to **GitHub Actions**.
