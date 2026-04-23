# jcapshaw.com

Personal publishing platform for Jason Capshaw. The site is a static Next.js
16 build for essays and field notes on B2B distribution, commerce
architecture, enterprise systems, and applied AI.

## Stack

- Next.js 16 App Router
- File-based content from `src/content`
- Gray-matter frontmatter + `next-mdx-remote` rendering for interactive MDX
- Vanilla CSS with shared design tokens in `src/app/globals.css`
- RSS feed at `/rss.xml`

## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Available scripts:

- `npm run dev` - local development
- `npm run lint` - ESLint
- `npm run build` - production build

## Content Model

Posts live in:

- `src/content/essays`
- `src/content/field-notes`

Each file uses frontmatter:

```yaml
---
title: "Article Title"
excerpt: "Short description for listing pages"
date: "YYYY-MM-DD"
published: true
---
```

Notes:

- Slugs come from filenames and must be unique across both content folders.
- Articles are real MDX and can use the globally registered components below.
- `import` and `export` statements inside article files are not supported; use the registered components directly.
- `published: false` excludes a post from list pages, RSS, and direct routes.

### Interactive Article Components

Articles can use these components directly without imports:

- `Callout`
- `Disclosure`
- `Switcher`
- `Pane`

Example:

```mdx
---
title: "Why ERP Boundaries Matter"
excerpt: "An interactive note on where commerce logic should live."
date: "2026-04-06"
published: true
---

<Callout title="Core idea">
The constraint is usually data ownership, not API availability.
</Callout>

<Disclosure title="Show the common failure mode">
Teams assume the commerce platform should own logic that still depends on ERP-native rules.
</Disclosure>

<Switcher>
  <Pane title="Vendor story">
  A clean composable stack solves the problem.
  </Pane>
  <Pane title="Operating reality">
  The integration boundary and pricing model usually decide the architecture first.
  </Pane>
</Switcher>
```

## Deployment

The site is designed for static generation. `npm run build` produces a fully
pre-rendered output, including article pages generated from the content
filesystem and the RSS feed.
