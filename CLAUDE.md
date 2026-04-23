# jcapshaw.com

Personal publishing platform for Jason Capshaw — practitioner writing on B2B distribution, digital commerce architecture, enterprise systems, and applied AI.

## Architecture

- **Framework:** Next.js 16 with App Router
- **Content:** `.mdx` files with gray-matter frontmatter, rendered as real MDX with globally registered article components
- **Styling:** Vanilla CSS with CSS custom properties (no Tailwind, no CSS modules)
- **Design:** Dark editorial engineering notebook — serif-forward long-form reading, monospace meta, subtle graph-paper undertones. Spectral (serif) + JetBrains Mono via `next/font/google`. Brass accent (`#c8a75e`), warm-black bg, light mode via `prefers-color-scheme`.
- **Deployment:** Static generation (SSG) for all content

## Project Structure

```
src/
  app/
    page.tsx              # Homepage — hero + recent writing
    rss.xml/route.ts      # RSS feed
    writing/
      page.tsx            # Writing index — all essays + field notes
      [slug]/page.tsx     # Individual article pages
    about/page.tsx        # Background and contact
    speaking/page.tsx     # Speaking & advisory offerings
    now/page.tsx          # /now page (what I'm working on)
  lib/
    content.ts            # MDX file reading + frontmatter parsing
    site.ts               # Canonical site metadata
  components/
    Header.tsx            # Site navigation
    Footer.tsx            # Site footer
    mdx/                  # Interactive MDX article components
  content/
    essays/               # Long-form essays (.mdx)
    field-notes/          # Shorter field notes (.mdx)
```

## Content Format

Content files use frontmatter like:
```yaml
---
title: "Article Title"
excerpt: "Short description for listing pages"
date: "YYYY-MM-DD"
published: true
---
```

Notes:
- Slugs are derived from filenames and must be unique across both `essays/` and `field-notes/`
- `published: false` excludes a post from both indexes and direct routes
- MDX content can use the globally registered `Callout`, `Disclosure`, `Switcher`, `Pane`, `PullQuote`, `Diagram`, `PipelineDiagram`, `ShapesMatrix`, and `OwnershipDiagram` components without imports
- `import` and `export` statements inside article files are not supported
- Diagrams sit on a graph-paper grid with a mono header (§ title + FIG NN) and optional caption/legend

## Content Pillars

1. B2B distribution and industrial commerce
2. Digital commerce architecture (platforms, data, search)
3. Enterprise systems strategy (ERP, integration, build vs buy)
4. Applied AI (practical, not hype)

## Design Principles

- Writing is the main destination, not a secondary feature
- Minimal chrome — let the content breathe; 1px rules, sharp corners (2px radius max), no pill shapes
- Fast page loads, no unnecessary JavaScript
- Dark-first; light mode supported via `prefers-color-scheme`
- Mobile-responsive (720px breakpoint); typography-first approach with `--col` (640px) / `--col-wide` (880px) reading columns
- Design tokens live in `src/app/globals.css` (`--bg`, `--ink`, `--accent`, `--rule`, `--rhythm`, etc.)
