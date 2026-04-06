# jcapshaw.com

Personal publishing platform for Jason Capshaw. The site is a static Next.js
16 build for essays and field notes on B2B distribution, commerce
architecture, enterprise systems, and applied AI.

## Stack

- Next.js 16 App Router
- File-based content from `src/content`
- Gray-matter frontmatter + `remark` HTML rendering
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
- `.mdx` is used as the source extension, but content is rendered as markdown-only through `remark`.
- `published: false` excludes a post from list pages, RSS, and direct routes.

## Deployment

The site is designed for static generation. `npm run build` produces a fully
pre-rendered output, including article pages generated from the content
filesystem and the RSS feed.
