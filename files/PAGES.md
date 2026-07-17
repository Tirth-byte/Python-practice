# PyLearn — Pages, Flows & Components

Every route to build, what's on it, and how auth works. Layouts are sketched in
ASCII so intent is unambiguous. Styling comes from `DESIGN-SYSTEM.md`; copy comes
from `CONTENT.md`. Don't use placeholder text.

---

## Routes

**Public (marketing + auth)**
- `/` — Landing
- `/courses` — Catalog
- `/courses/[slug]` — Course detail (Udemy-style)
- `/pricing` — Pricing
- `/about` — About
- `/login`, `/signup`, `/forgot-password` — Auth

**Authenticated (the app)**
- `/dashboard` — Learner home
- `/my-learning` — Enrolled courses + progress
- `/learn/[course]/[lesson]` — Course player (the core screen)
- `/practice` — Quizzes
- `/projects` — Project picker by level
- `/community` — LinkedIn-style feed
- `/leaderboard` — Rankings
- `/profile`, `/settings`

Use **route groups**: `(marketing)` with the top navbar, `(app)` with the
sidebar shell. Auth pages get a minimal centered layout.

---

## Auth (make it real-feeling, demo-ready)

Use **Auth.js (NextAuth v5)** with a **credentials provider** backed by a local
seed (`/data/users.ts`) so it works with no backend. Session via JWT. Structure
it so a real DB/FastAPI backend can be swapped in later (their production plan).

- **/signup** — 2 steps in one page:
  1. name, email, password (+ Google / GitHub buttons, wired as visual OAuth
     placeholders or real if easy).
  2. **Track question:** "How should we teach you?" → School / Graduate (two
     selectable cards, same as the desktop onboarding). Store on the user.
  On success → `/dashboard`.
- **/login** — email + password, "remember me", social buttons, link to signup +
  forgot password. Show inline errors.
- **/forgot-password** — email field → success state ("check your inbox"). Mock.
- Protect all `(app)` routes with middleware; unauthenticated → `/login`.
- Persist a demo user so refresh keeps you logged in.

Auth pages: split layout — left = form (surface, hairline card), right = a
branded panel (paper-sink, Koji, a rotating one-line testimonial, subtle
gold accents). Not a bare centered box.

---

## `/` Landing

Dense and editorial, in this order:

```
┌───────────────────────────────────────────────────────────┐
│ NAVBAR (sticky)                                            │
├───────────────────────────────────────────────────────────┤
│ HERO  (asymmetric)                                         │
│  left ~55%: eyebrow · Fraunces headline · subcopy ·        │
│             [Start learning free] (ink)  [Browse courses]  │
│             trust row: "12k learners · 4.8★ · no card"     │
│  right:     product visual — a stylised lesson/coding      │
│             card + Koji + a small XP/streak cluster        │
├───────────────────────────────────────────────────────────┤
│ LOGO/PROOF strip (muted): "used by students at …"          │
├───────────────────────────────────────────────────────────┤
│ TWO TRACKS  (split section)                                │
│   School card  |  Graduate card — explain the difference   │
├───────────────────────────────────────────────────────────┤
│ HOW IT WORKS  (numbered 01–04, editorial, not 3 cards)     │
│   Learn a topic → Practice → Build a project → Keep streak │
├───────────────────────────────────────────────────────────┤
│ FEATURED CURRICULUM  (course cards row, link to /courses)  │
├───────────────────────────────────────────────────────────┤
│ CODE-IN-BROWSER teaser (dark band): mini editor mock +     │
│   "runs in your browser, nothing to install (Pyodide)"     │
├───────────────────────────────────────────────────────────┤
│ TESTIMONIALS  (Fraunces quotes, avatars)                   │
├───────────────────────────────────────────────────────────┤
│ CTA band (gold-soft): "Start today" + [Sign up]            │
├───────────────────────────────────────────────────────────┤
│ FOOTER (rich, multi-column)                                │
└───────────────────────────────────────────────────────────┘
```

---

## `/courses` Catalog

- Page header: title + one line + a search input.
- Left (or top on mobile): filters — level (School/Graduate/All), topic,
  duration, free/paid. Category chips row.
- Grid of **course cards** (responsive 1→2→3 cols). Sort dropdown.
- Uses the seed courses from `CONTENT.md`.

## `/courses/[slug]` Course detail (Udemy layout)

```
┌───────────────────────────── dark hero band ──────────────┐
│ breadcrumb · category                                     │
│ H1 course title (Fraunces) · one-line promise             │
│ rating ★ · learners · last updated · level chip           │
│ "Created by PyLearn / Koji"                                │
│                              ┌── sticky enrol card ──┐     │
│ (left column continues       │ price/Free            │     │
│  below on light bg)          │ [Enrol now] (gold)    │     │
│                              │ includes: lessons,    │     │
│                              │ projects, certificate │     │
│                              └───────────────────────┘     │
├───────────────────────────────────────────────────────────┤
│ WHAT YOU'LL LEARN  (2-col checklist grid)                  │
│ CURRICULUM  (accordion: sections → lessons, durations,     │
│   preview + lock icons, total counts)                      │
│ REQUIREMENTS · DESCRIPTION                                 │
│ REVIEWS  (rating summary + individual reviews)            │
│ RELATED COURSES  (card row)                                │
└───────────────────────────────────────────────────────────┘
```
The enrol card is sticky on scroll (desktop). Enrol → `/learn/...`.

---

## `/dashboard` Learner home

Reuse the desktop app's structure, upgraded:
- Greeting + streak line.
- "Continue where you left off" hero card + Resume.
- Three stat cards: streak, XP, rank.
- "Your path": module cards with progress rings + topic rows (done / current /
  next / locked), each linking into the player.
- A small "Community highlights" or "Recommended project" rail.

## `/learn/[course]/[lesson]` Course player — THE core screen

```
┌── app top bar: breadcrumb · progress · streak/XP · avatar ─┐
├────────────┬──────────────────────────────────────────────┤
│ CURRICULUM │  LESSON MAIN                                  │
│ sidebar    │  ┌ lecture eyebrow · H2 title · track chip ┐  │
│ (sections, │  │ lesson body — SWITCHES BY TRACK          │  │
│ lessons,   │  │ (school vs graduate copy) + example box  │  │
│ checks,    │  └──────────────────────────────────────────┘  │
│ current    │  ┌ CODING WINDOW (dark) ────────────────────┐ │
│ highlighted│  │ CodeMirror (Python) · [Run] (green) ·     │ │
│ collapsible│  │ [Reset] · OUTPUT console (real Pyodide)   │ │
│            │  └──────────────────────────────────────────┘  │
│            │  tabs: Overview · Resources · Transcript ·    │
│            │        Q&A                                    │
│            │  footer: [← Prev]   [Take the quiz →] [Next]  │
└────────────┴──────────────────────────────────────────────┘
```
- **Code runs in-browser via Pyodide.** Use **CodeMirror 6** (`@codemirror/lang-python`)
  with a custom dark theme matching `--code-*`. Load Pyodide lazily; show a
  "Run" spinner on first load; capture stdout/stderr into the console.
- Track (school/graduate) comes from the user; body text and code depth change.
- Resources tab lists videos/PDFs/links per the plan.

## `/practice` Quizzes
- List of quizzes by module → a quiz runner: one question at a time, 4 options,
  submit → correct/incorrect + explanation + XP, progress bar, results screen.

## `/projects` Project picker
- Cards of projects tagged by level and required topics. Each: brief, resources,
  "Build solo" or "Build with a friend" (both must be users + have completed the
  required topics — show that gate in the UI). Submit-code state.

## `/community` Feed (LinkedIn-style)
- Composer ("share what you built"), a feed of posts (avatar, name, level badge,
  text, optional code/image, likes + comments), a right rail (top builders,
  suggested connections). Mock data.

## `/leaderboard`
- Weekly tab, ranked rows, current user highlighted, medals for top 3, "resets
  Monday" note. Filter: friends / global.

## `/profile` & `/settings`
- Profile: avatar, name, level/XP, streak calendar heatmap, badges, completed
  courses, projects.
- Settings: account, **switch track**, notifications, theme, danger zone.

---

## Component inventory (build once, reuse)

`Logo` (Koji SVG + wordmark) · `Button` (primary/secondary/ghost/gold) ·
`Input`, `Label`, `Field` · `Card` · `CourseCard` · `Rating` ·
`LevelChip` / `Badge` · `ProgressBar`, `ProgressRing` · `StatPill` (XP/streak) ·
`CurriculumAccordion`, `LessonRow` · `CodeEditor` (CodeMirror) ·
`OutputConsole` · `QuizCard` · `MarketingNavbar`, `AppSidebar`, `AppTopbar` ·
`Footer` · `Avatar` · `Tabs` · `Modal`/`Dialog` · `Toast` · `Skeleton` ·
`EmptyState` · `SectionEyebrow` · `Koji` (mascot, sizeable).

Keep components in `/components/ui` (primitives) and `/components/*` (composed).
