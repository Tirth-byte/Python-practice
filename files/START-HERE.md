# START HERE — Building PyLearn with Claude Code

This folder is a build kit. Read order for Claude Code:
`DESIGN-SYSTEM.md` → `PAGES.md` → `CONTENT.md`. This file gives you the stack,
setup, and the exact prompts to paste, in order.

---

## The stack (already decided — don't re-litigate)

- **Next.js 15** (App Router) + **TypeScript** + **React 19**
- **Tailwind CSS v4** with CSS-variable tokens from `DESIGN-SYSTEM.md`
- **shadcn/ui** as the base, **restyled** to our tokens (never default look)
- **Fraunces + Inter + JetBrains Mono** via `next/font/google`
- **motion** (Framer Motion) for subtle animation · **lucide-react** for icons
- **Auth.js (NextAuth v5)** credentials provider + local seed users (demo-ready,
  swappable for a real backend later)
- **CodeMirror 6** (`@codemirror/lang-python`) + **Pyodide** for the in-lesson
  Python runner (runs in the browser)
- Seed data in `/data/*.ts` — no backend needed for the demo. (Production target
  is the FastAPI/SQLAlchemy backend from the project plan.)

## Setup (run these first)

```bash
npx create-next-app@latest pylearn --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"
cd pylearn
npx shadcn@latest init
npm i motion lucide-react next-auth@beta
npm i @codemirror/lang-python @codemirror/state @codemirror/view codemirror
# Pyodide is loaded from CDN at runtime in the code editor component.
mkdir -p docs && mv /path/to/these/*.md docs/
```

Then open Claude Code in the repo and run the phases below.

## Project structure to aim for

```
src/
  app/
    (marketing)/            # navbar layout: /, /courses, /courses/[slug], /pricing, /about
    (app)/                  # sidebar layout: /dashboard, /learn/..., /practice, etc.
    (auth)/                 # /login, /signup, /forgot-password
    api/auth/[...nextauth]/
  components/ui/            # restyled shadcn primitives
  components/               # Logo, CourseCard, AppSidebar, CodeEditor, Koji, ...
  data/                     # courses.ts, lessons.ts, quizzes.ts, users.ts, ...
  lib/                      # auth.ts, utils.ts, pyodide.ts
  styles/globals.css        # tokens + base
docs/                       # these files
```

---

## How to drive Claude Code

Paste one phase at a time. After each, review against the **Definition of done**
before moving on. Always keep Claude pointed at the docs.

### Phase 0 — Foundation & design tokens
> Read `docs/DESIGN-SYSTEM.md` fully. Set up the design system: put all colour,
> type, spacing, radius and shadow tokens as CSS variables in `globals.css` and
> wire them into Tailwind. Load Fraunces, Inter and JetBrains Mono with
> `next/font`. Configure shadcn to use these tokens (override the default theme).
> Build a small `/style-guide` page that renders every token, button variant,
> the `CourseCard`, `ProgressRing`, `StatPill`, form fields and the `Koji`
> mascot SVG, so I can eyeball the system. Follow the "reject list" strictly.

### Phase 1 — App shells & navigation
> Read `docs/PAGES.md`. Build the three layouts: `(marketing)` with the sticky
> `MarketingNavbar` + rich `Footer`; `(app)` with `AppSidebar` + `AppTopbar`
> (streak/XP pills, avatar); `(auth)` minimal split layout. Add the `Koji` logo
> lockup. Stub every route so navigation works. Make it responsive (sidebar
> collapses to a drawer on mobile).

### Phase 2 — Landing page
> Build `/` exactly per the landing sketch in `docs/PAGES.md`, using copy from
> `docs/CONTENT.md`. Asymmetric hero, two-tracks split, numbered how-it-works,
> featured curriculum row, dark code-in-browser teaser, testimonials, CTA band.
> Add subtle `motion` scroll-in (respect `prefers-reduced-motion`). No symmetric
> 3-card hero, no gradients — editorial and dense.

### Phase 3 — Auth
> Implement `/signup` (2 steps incl. the School/Graduate track question),
> `/login`, `/forgot-password` per `docs/PAGES.md`. Wire Auth.js v5 credentials
> against `data/users.ts`, JWT session, middleware protecting all `(app)` routes,
> and a persisted demo user. Real inline validation and error states. Google/
> GitHub buttons as OAuth placeholders.

### Phase 4 — Catalog & course detail
> Build `/courses` (filters, search, responsive `CourseCard` grid) and
> `/courses/[slug]` in the Udemy layout: dark hero band, sticky enrol card,
> what-you'll-learn grid, `CurriculumAccordion`, requirements, reviews, related
> courses. Use the seed courses in `docs/CONTENT.md`.

### Phase 5 — Dashboard & the course player
> Build `/dashboard` (continue card, stat cards, module path with progress rings
> + topic rows) and the core `/learn/[course]/[lesson]` player per `docs/PAGES.md`:
> curriculum sidebar, track-aware lesson body, tabs, prev/next. Then build the
> `CodeEditor`: CodeMirror 6 with Python + a custom dark theme matching the
> `--code-*` tokens, a Run button that loads Pyodide lazily and streams
> stdout/stderr into an `OutputConsole`, plus Reset. Lesson text and code depth
> switch on the user's track.

### Phase 6 — Practice, projects, community, leaderboard, profile
> Build `/practice` (quiz runner from the quiz bank), `/projects` (project picker
> with the completion gate + solo/with-a-friend), `/community` (composer + feed +
> right rail), `/leaderboard` (weekly, current user highlighted), `/profile` +
> `/settings` (incl. switch track). All from `docs/CONTENT.md`.

### Phase 7 — Polish pass
> Do a polish pass against `docs/DESIGN-SYSTEM.md` §7 and §8: hover/focus states
> everywhere, skeletons + designed empty states, keyboard nav, contrast, mobile
> layouts, 404/error pages, metadata + OG tags, and a `prefers-reduced-motion`
> check. Walk every page and fix anything that reads as a default/AI template.

---

## Definition of done (per page)

- Matches the sketch and uses real content — no lorem ipsum, no emoji in chrome.
- Fraunces on display headings; ink primary buttons; gold used only as accent.
- Hover + focus + loading + empty states exist.
- Responsive at 375 / 768 / 1280.
- Nothing on the reject list in `DESIGN-SYSTEM.md` §8.

## If it still looks "AI-made", check these first

1. Are headings actually Fraunces, or did Inter sneak in?
2. Is the background warm paper (`--paper`), not pure white/grey?
3. Are buttons ink-filled, with gold reserved for accents only?
4. Is the hero asymmetric with real density — not centered + three cards?
5. Are you leaning on hairline borders instead of drop shadows?
6. Did shadcn defaults get overridden, or are they showing through?
