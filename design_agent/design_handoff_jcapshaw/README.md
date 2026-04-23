# Handoff: jcapshaw.com — Personal Engineering Blog

## Overview

A personal blog and practice site for Jason Capshaw — independent systems architect
working with B2B industrial and electrical distributors. The aesthetic is a
**dark editorial engineering notebook**: serif-forward long-form reading,
monospace meta, marginalia, inline schematic diagrams, subtle graph-paper
undertones. The voice is quiet, senior, text-driven — a writerly site, not a
portfolio marketing site.

Structure is a multi-page SPA with:
- **Home** (two variants: sparse editorial / dense index)
- **Writing** (archive with filter + search)
- **Post** detail (long-form reading view with footnotes, code blocks, inline diagrams, reading progress, related essays)
- **Speaking** index + **Talk** detail pages
- **Projects** index + **Case Study** detail pages
- **About**, **Now**, **Subscribe**, **404**
- Global **search overlay** (⌘K) across essays, talks, and case studies
- **Tweaks panel** exposing theme, density, accent color, typography, and home-variant toggles

---

## About the Design Files

The files in this bundle are **design references created in HTML** — a
self-contained prototype demonstrating intended look, typography, spacing,
interactions, and information architecture. They are **not** production code
to copy directly.

The task is to **recreate these HTML designs in the target codebase's existing
environment** using its established patterns and libraries — or, if no
environment exists yet, to choose an appropriate framework (Next.js + MDX is
a natural fit for a content-driven engineering blog) and implement the designs
there.

The prototype currently uses:
- React 18 via CDN + Babel in-browser transpile (**not** suitable for production)
- Inline CSS variables + hash-based routing
- Fake in-memory data (`window.SITE_DATA`)

A production rewrite should use:
- A real build step (Next.js, Astro, SvelteKit, or similar)
- MDX or a headless CMS for authoring
- Real routing (Next.js App Router or equivalent)
- Static generation for post/talk/case pages
- A font loader with subsetting (Spectral + JetBrains Mono)

---

## Fidelity

**High-fidelity (hifi).** Final colors, typography, spacing, layout, and
interactions are specified exactly. Use the hex values, font stacks, and
spacing scales from the Design Tokens section verbatim. Copy text in the
mocks is placeholder essay/case content — replace with real content during
production.

---

## Screens / Views

### 1. TopBar (global)
- **Layout:** 3-column grid — brand (left), primary nav (center), utility icons (right). Height ~60px. Sticky top with `backdrop-filter: blur(14px)` + 88% bg.
- **Components:**
  - **Monogram**: 30×30 square, 1px border `--rule-strong`, serif "jc" text at 14px, with a small `--accent`-colored triangle in the bottom-right corner (created via layered linear-gradient backgrounds)
  - **Brand text**: name at 17px serif, sub "Systems · B2B Distribution" in 10px mono uppercase `--ink-faint`
  - **Nav**: Writing · Work · About · Speaking · Now · Subscribe. 11.5px mono, letter-spacing 0.08em. Active state: `--ink` color, 1px accent underline (scaleX transition on hover)
  - **Icons (right)**: search (⌘K), theme toggle. 30×30 square buttons, 1px `--rule` border, hover brightens border + ink.
- **Responsive:** below 720px, hide center nav; keep brand + icons only

### 2. Home — Sparse (default)
- **Layout:** Centered editorial hero + featured essay + recent writing list + topic grid
- **Hero section:**
  - Padding: 14vh top, 10vh bottom, centered
  - H1: 30-44px serif 500-weight, `letter-spacing: -0.02em`, max 18ch wide
  - Sub: 15.5px `--ink-dim`, max 52ch, line-height 1.6
  - Ornament: 28px horizontal line with `--accent` dots at each end
- **Featured essay block:** eyebrow label → 24-32px serif headline → 52ch dek → "Read essay · X min" link with accent underline
- **Recent writing:** 4 rows, each `post-row`:
  - Grid: 1fr auto, gap 40px, 1px bottom border
  - Title: 18px serif 500
  - Excerpt: 14.5px `--ink-dim` max 60ch
  - Meta (right): date + read-time + topic in 12px mono
  - Hover: `--hl` background bleeds ±16px horizontally
- **Topic grid:** 2×2 grid, 1px internal rules, 28px padding per cell

### 3. Home — Dense (Tweaks variant)
- **Layout:** Two-column dense index: essays (1.5fr) | topics + recent talks (1fr)
- Statement header (2fr / 1fr): left h1 display, right mono meta lines (essay/talk counts, region, practice age)
- Item rows: serif 14.5px title left, 10px mono date right, 1px dotted bottom

### 4. Archive (/writing)
- **Header:** H1 "Writing" 32-42px, lede 15px `--ink-dim`
- **Filters row:** topic chips + search input with ⌘F kbd pill. Chips: 11px mono, 5/10px padding, 1px border; active = `--hl` bg + accent color
- **Year groups:** 48px thin mono year label, then a list of `post-row` entries under it

### 5. Post Detail (/post/:slug)
- **Reading progress bar** (2px, fixed top, `--accent` fill)
- **Reading meter** (fixed top-right, shows at scrollY > 280): % + mini-bar + "X min left"
- **Header:** centered, meta line (date · read · topic) in 12px mono with • dividers, H1 32-46px 500-weight max 20ch, dek 16.5px `--ink-dim` max 54ch, byline "— Jason Capshaw" in 11px mono uppercase
- **Prose body:**
  - 17px serif, line-height 1.7
  - First-paragraph drop cap: 3.2em serif `--accent`
  - H2: 24px serif + mono section number prefix
  - Blockquote: 2px left border `--accent-soft`, italic
  - Code blocks: `--bg-elev` bg, 13px mono, uppercase head with expand/collapse button, max-height 180px collapsed → 1200px expanded
  - Pull quote: 22px serif italic, 3px `--accent` left border
  - Callout: 2-col grid (80px label / 1fr body), 10px uppercase mono label in `--accent`
- **Inline diagrams:** see Diagram Primitives section below
- **Footnotes:**
  - Inline `sup.fn-ref` 10px mono accent
  - Hover popover: 300px card with `--bg-elev` + `--rule-strong` border
  - Bottom of post: numbered `notes-list` with counter-based numbers, 1px dotted row dividers
- **Post-nav:** 2-col grid of prev/next cards with 1px rules and hover `--bg-elev`
- **Related essays:** 3-col grid, each card has accent topic label, serif 16px title, 10px mono date/read

### 6. Speaking Index (/speaking)
- Editorial intro section (eyebrow, H1, lede)
- Talk list: each row grid of `120px 1fr auto`:
  - Date (mono 11px)
  - Title (20px serif) + venue (mono 11px uppercase) + abstract (60ch serif)
  - Assets (right-aligned mono 10px): slides / recording availability in accent when yes, faint when no; duration

### 7. Talk Detail (/talk/:slug)
- Head section: when-line, H1, venue line, abstract
- 4-col meta grid: Audience | Duration | Slides | Recording, separated by 1px internal rules
- Slide thumbnail strip: 6-col grid of 16/9 tiles with diagonal-stripe background + slide number + label
- Sections (160px / 1fr two-col): Abstract, Related essays, Booking

### 8. Case Study Detail (/case/:slug)
- Head: accent client line (client · meta), H1 28-42px, summary 17px
- Outcomes row: `auto-fit, minmax(140px, 1fr)` grid, each cell has big serif accent metric + mono uppercase label
- Narrative sections (160px / 1fr): Period, Stack (mono), Problem, Approach, What I'd do differently

### 9. About (/about)
- Two-col: 200px portrait placeholder (diagonal hatching pattern) / 1fr body
- Body: large H1, serif paragraphs `--ink-dim`
- Speaking mini-list below with grid (90px / 1fr / auto)

### 10. Projects (/projects)
- List of `project-row`: index (mono 11px) / name + desc / stack (mono uppercase) / status badge
- Status colors: live = #9eb98f, wip = `--accent`, archive = `--ink-faint`

### 11. Now / Uses (/now)
- Each section: 160px mono label / 1fr body
- "Uses" list: 2-col grid (140px key / 1fr value), 14px serif

### 12. Subscribe (/subscribe)
- Centered editorial block: eyebrow, H1, lede, email form, then 3-col feed options grid (RSS, Atom, JSON Feed or similar)

### 13. 404 (/not-found)
- Centered min-70vh: err code (13px mono 0.3em accent), large ¶ glyph (120px serif `--ink-faint`), H1, p, Front-page/Archive/Subscribe links, trace line with generated hex ID + ISO timestamp

### 14. Search Overlay (⌘K)
- Fixed full-screen, `color-mix(in oklab, var(--bg) 90%, transparent)` + 8px backdrop-blur
- 720px inner container, 60px top margin
- Search head: flex row, 1px rule-strong border, `--bg-elev` bg, 18px serif input, Esc close button
- Meta line (mono 10px): match count | scope
- Result rows: kind label (accent mono) → title (16px serif) → excerpt (13.5px serif dim) → highlight matches with `<mark>`
- Hint bar: ↵ open · Esc close · ⌘K toggle (with kbd-style borders)

### 15. Tweaks Panel (bottom-right, opens via host)
- Fixed 280px panel, `--bg-elev`, 1px `--rule-strong` border
- Rows: Theme (Dark/Light), Density (Compact/Normal/Spacious), Accent (5 swatches: brass, oxblood, verdigris, indigo, paper), Typography (Spectral/EB Garamond/Fraunces), Homepage (Sparse/Dense)

---

## Diagram Primitives (inline, used in essays)

Every diagram sits on a graph-paper grid (32×32 layered linear-gradient on `--rule` lines) with a mono header row (§ title + FIG NN label).

Implemented primitives (see `diagrams.jsx` + `diagrams.css`):
1. **PipelineDiagram** — horizontal flow of boxes (supplier feeds → stage → normalize → canonical → consumers) with arrows and a bottom "AUDIT TRAIL" ribbon + "RULE v3" annotation
2. **ShapesMatrix** — 2×2 matrix plotting Shape A/B/C/D by detectability × cost, with dashed callout circles
3. **OwnershipDiagram** — radial: empty center "CATALOG · UNOWNED" with 5 department nodes spoked around it

Each diagram has optional caption + legend rows (1px dashed rule dividers, 10px mono items).

Build additional ones as needed for future essays: sequence diagrams, state machines, bar charts. CSS hooks (`.diagram svg .bar`, `.bar-axis`) are already in place.

---

## Interactions & Behavior

- **Routing:** hash-based (`#/`) in the prototype. Replace with real router in production (Next.js file-based routing recommended).
- **Theme persistence:** `localStorage` keys — `jc-theme`, `jc-density`, `jc-accent`, `jc-typo`, `jc-home`
- **Search:** client-side, case-insensitive substring match across posts/talks/caseStudies. For real content volume use Fuse.js or a proper index.
- **Reading progress:** scroll listener on post pages; shows meter after 280px scroll
- **Hover previews:** `mouseenter`/`mouseleave` on elements with `data-preview-title` attrs; 320px card, 80ms hide debounce
- **Keyboard shortcuts:** ⌘K or Ctrl+K toggles search; Esc closes
- **Transitions:**
  - Page fade-in: 360ms ease, 8px translateY
  - Stagger children: 40ms incremental delay
  - Link underline: transform scaleX 200ms ease
  - Row hover: background 160ms ease
  - Theme/accent change: 240ms ease

---

## State Management

- `theme`, `density`, `accent`, `typography`, `homeVariant` → global, persisted to localStorage, applied via `data-*` attrs + CSS vars on `<html>`
- `route` → derived from `location.hash`
- `searchOpen`, `tweaksOpen` → UI ephemeral
- `progress`, `showMeter` → per-post scroll state
- Content data is loaded synchronously; in production, fetch post list at build time and stream individual post MDX

---

## Design Tokens

### Colors — Dark (default)
```
--bg:          #0a0908
--bg-elev:     #111110
--ink:         #e8e4dc
--ink-dim:     #a39e93
--ink-faint:   #6b6660
--rule:        #232220
--rule-strong: #3a3834
--accent:      #c8a75e   (aged brass)
--accent-soft: #8a7645
--hl:          rgba(200, 167, 94, 0.12)
```

### Colors — Light
```
--bg:          #f4f0e8
--bg-elev:     #ebe6dc
--ink:         #1a1918
--ink-dim:     #5a544c
--ink-faint:   #928b80
--rule:        #d6cfc2
--rule-strong: #b8b0a1
--accent:      #8a6a1f
--accent-soft: #a88a3a
--hl:          rgba(138, 106, 31, 0.1)
```

### Accent palette (swappable via Tweaks)
```
brass     #c8a75e / #8a7645
oxblood   #b86a5e / #7a463e
verdigris #7ca98c / #4f7058
indigo    #8998c9 / #5a6589
paper     #d6cfbf / #9a9485
```

### Typography
- **Serif:** Spectral (primary), EB Garamond, Fraunces — 300/400/500/600 + italic
- **Mono:** JetBrains Mono — 400/500/600
- **Sans:** Inter Tight (reserved; not currently used in body)

Base: 17px / 1.6 serif. `font-feature-settings: "kern", "liga", "onum"` (old-style figures).

### Size scale
```
H1 display:  clamp(32px, 4vw, 46px)     weight 500, letter-spacing -0.02em
H2:          24px                        weight 500, letter-spacing -0.01em
H3:          19px                        weight 500
Body:        17px                        line-height 1.7
Small serif: 13.5-14.5px                 line-height 1.55
Mono label:  10-11px                     letter-spacing 0.12-0.22em, uppercase
Eyebrow:     10.5px                      letter-spacing 0.22em, uppercase
```

### Spacing / density
```
--rhythm:     1.75rem (normal) / 1.25rem (compact) / 2.25rem (spacious)
--pad-x:      clamp(24px, 5vw, 56px)
--col:        640px (narrow reading)
--col-wide:   880px (default)
max-width (topbar / footer-inner): 1280px
```

### Borders / radii
- Border width: **1px** throughout (occasional 2px for emphasized blockquote/pullquote)
- Border radius: **2px** on chips, icon-btn, input wrappers. Most rules are **sharp corners**.
- Monogram + buttons: 2px radius max — deliberately editorial/architectural, never pill-shaped.

### Shadows
- Hover card: `0 20px 40px -20px rgba(0,0,0,0.6)`
- Footnote popover: `0 18px 36px -18px rgba(0,0,0,0.6)`
- Tweaks panel: `0 24px 48px -16px rgba(0,0,0,0.6)`

---

## Assets

- **Fonts:** Google Fonts (Spectral, EB Garamond, Fraunces, JetBrains Mono). In production, self-host via `next/font` or similar with subsetting.
- **No image assets yet.** Portrait, talk thumbnails, and diagram content are placeholder patterns (diagonal stripes, graph-paper grid, generated SVG). Swap in real assets when available.
- **Icons:** inline SVG (search glyph, sun, moon). Feel free to replace with Lucide or similar icon set.

---

## Responsive Behavior

Mobile breakpoint: **720px**.
- TopBar drops center nav, keeps brand + icons
- All 2-col grids collapse to 1-col (topic-grid, feed-options, post-nav, about-grid, project-row, now-section, footer-inner, dense-home)
- `talk-card` stacks; assets column wraps
- `slide-strip` drops from 6 to 3 columns
- Reading meter hides on mobile
- Diagrams' SVGs scale to max-width 100%

---

## Files

The prototype is split across source files and one compiled bundle:

- `jcapshaw.html` — the bundled, runnable preview. **Reference only** — do not ship.
- `styles.css` — core design tokens, layout, component styles
- `diagrams.css` — inline-diagram styling (graph-paper grids, SVG palette)
- `extras.css` — monogram, reading progress, related essays, talk/case-study pages, 404, search overlay, dense home
- `data.js` — placeholder content (posts, topics, projects, talks, caseStudies)
- `shell.jsx` — TopBar, Footer, theme/density/accent hooks, router hook, HoverPreview
- `pages.jsx` — Home (sparse), Archive, Projects, About, Now, Subscribe, TweaksPanel
- `post.jsx` — PostView + prose primitives (FootnoteRef, CodeBlock, PullQuote, Callout) + featured essay content + GenericBody template
- `diagrams.jsx` — PipelineDiagram, ShapesMatrix, OwnershipDiagram primitives
- `extras.jsx` — Monogram, SpeakingIndex, TalkDetail, CaseStudyDetail, NotFound, SearchOverlay, DenseHome
- `app.jsx` — root App component, router wiring

---

## Production Recommendations

1. **Framework:** Next.js (App Router) + MDX for posts. Each post is an `.mdx` file with frontmatter (date, topic, read, dek). Diagrams exposed as MDX components.
2. **Content model:** `content/posts/`, `content/talks/`, `content/case-studies/` directories. Frontmatter for structured fields; body in MDX.
3. **Search:** Fuse.js against a build-time generated JSON index.
4. **Fonts:** `next/font/google` for Spectral + JetBrains Mono with `display: swap` and preload the critical weights.
5. **Theme:** `next-themes` or bespoke with SSR-safe cookie fallback (prevent flash).
6. **RSS/Atom/JSON Feed:** generate at build time.
7. **Accessibility:** keyboard-trap the search overlay, add `aria-live` to result count, ensure focus rings are visible on all interactive elements (currently minimal).
8. **Analytics:** privacy-respecting (Plausible, Fathom, or self-hosted).

---

## Contact

Design questions → point back to the prototype. Content and brand voice are the author's; do not rewrite copy without approval.
