# PyLearn — Design System

This file is the source of truth for how PyLearn looks. If a screen doesn't
follow this, it's wrong. The goal is a **premium, editorial, human-designed**
course platform — Udemy-level completeness, but with its own identity.

---

## 0. The one rule

Every choice below exists to avoid the "AI-generated site" look. That look comes
from: default shadcn styling, the Inter-everything + purple-gradient combo,
three identical centered feature cards, glassmorphism, emoji headings, and pure
`#FFFFFF` on `#000000`. **We reject all of that.** PyLearn is warm, inked,
editorial, and confident.

---

## 1. Brand

- **Name:** PyLearn
- **Tagline:** *Learn Python, properly.*
- **Voice:** clear, encouraging, a little opinionated. Never salesy or cutesy.
- **Mascot:** **Koji**, a small friendly python. Built as an SVG component
  (rounded green coil, head, two eyes with white glints, tiny tongue). Used as
  the logo mark and as a guide in lessons. Never clip-art, never an emoji.
- **Two learner tracks** run through the whole product: **School** (plain,
  example-first) and **Graduate** (precise, terminology-first). Chosen at signup.

---

## 2. Colour

Warm paper light theme for the marketing + app chrome; a dark surface only for
the code editor and course player. This split is deliberate and reads as Udemy.

```css
:root {
  /* Surfaces — warm, never pure white */
  --paper:        #FAF8F3;  /* page background */
  --surface:      #FFFFFF;  /* cards */
  --surface-sink: #F3EFE6;  /* insets, subtle sections */
  --line:         #E7E2D6;  /* hairline borders */
  --line-strong:  #D8D2C3;

  /* Ink — text */
  --ink:          #1A1712;  /* primary text + primary buttons */
  --ink-2:        #55503F;  /* body secondary */
  --ink-3:        #857F6C;  /* muted / captions */

  /* Signature accent — gold. Highlights only, not big fills of text. */
  --gold:         #E0A82E;
  --gold-soft:    #F7EDD2;  /* tinted backgrounds */
  --gold-ink:     #7A5A12;  /* gold text that stays readable on paper */

  /* Support */
  --green:        #2E7D5B;  /* success, "completed", correct */
  --green-soft:   #E3F0E9;
  --red:          #C4452F;  /* errors, wrong answers */
  --blue:         #2F6BD6;  /* secondary links / school-track accent */

  /* Dark surfaces — editor & player */
  --code-bg:      #14171C;
  --code-surface: #1B1F26;
  --code-line:    #2A303A;
  --code-text:    #E6E9EF;
  --code-muted:   #8A93A2;
}
```

**Usage rules**
- **Primary button = solid ink** (`--ink`) with `--paper` text. This is the
  premium tell. Gold is *not* the primary button colour.
- **Gold** is for: the logo accent, progress bars/rings, XP + streak, "PRO" /
  level badges, and small highlight underlines. Sparingly.
- Text is `--ink` / `--ink-2`, never pure black. Backgrounds warm, never `#fff`
  for the whole page.
- Green only means success/done. Red only means error. Don't decorate with them.

---

## 3. Type

Deliberate pairing. The serif display is the single biggest "designed, not AI"
signal — use it.

- **Display / big headings:** **Fraunces** (variable, optical size). Weights
  500–600. Use for the hero headline, page titles, section titles, course
  titles on detail pages. Slightly tight letter-spacing.
- **UI / body:** **Inter**. Everything else — nav, buttons, paragraphs, labels,
  cards.
- **Code:** **JetBrains Mono**. Editor, output, inline code.

Load with `next/font/google` and expose as CSS vars `--font-fraunces`,
`--font-inter`, `--font-mono`.

**Scale** (don't invent sizes outside this):

| token | px / line | use |
|-------|-----------|-----|
| display | 56 / 1.05 | hero (Fraunces) |
| h1 | 36 / 1.1 | page title (Fraunces) |
| h2 | 26 / 1.2 | section (Fraunces) |
| h3 | 19 / 1.3 | card title (Inter 600) |
| body | 16 / 1.6 | paragraphs (Inter) |
| small | 14 / 1.5 | meta, labels |
| micro | 12.5 / 1.4 | eyebrows, captions (uppercase, tracked) |

Eyebrow labels (e.g. `MODULE 02`) are micro, uppercase, `letter-spacing: 0.08em`,
colour `--ink-3` or `--gold-ink`.

---

## 4. Space, radius, shadow, motion

- **Spacing:** 4px base. Use 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96. Sections
  breathe (80–120px vertical on the landing page). Density is fine inside cards.
- **Radius:** `--r-sm: 8px`, `--r: 12px`, `--r-lg: 16px`, `--r-xl: 24px` (hero
  media, big cards). Pills use `9999px`. Be consistent.
- **Borders:** 1px hairline `--line` on almost everything. This is our texture —
  we lean on borders, not shadows.
- **Shadow:** almost none. One soft token for menus/modals/hover-lift only:
  `--shadow: 0 8px 30px rgba(26,23,18,0.08)`. No neon glows, no heavy drops.
- **Motion:** subtle. 150–200ms ease-out on hover/press. Cards lift 2px + border
  darkens on hover. Use `motion` (Framer Motion) for a gentle fade/slide-up on
  first scroll into sections (12px, staggered). Nothing bouncy or looping.

---

## 5. Component rules

Use **shadcn/ui as the base**, then restyle to the tokens above — never ship the
default shadcn look.

- **Buttons:** `primary` (ink fill), `secondary` (surface fill + hairline
  border), `ghost` (text only), `gold` (only for "Enrol" / key conversion CTAs).
  Height 44 default / 52 large. Weight 600.
- **Course card:** thumbnail (16:9, subtle gradient placeholder or illustration),
  category eyebrow, title (h3), short line, then a meta row: level chip, lesson
  count, rating stars + number, and either "Free" or price. Whole card is a
  hover-lift link. This is the Udemy workhorse — get it right.
- **Rating:** gold stars + numeric (e.g. `4.8`) + review count in `--ink-3`.
- **Curriculum accordion:** sections expand to show lessons; each lesson row has
  an icon (play / code / quiz), title, duration, and a lock or check. Preview
  lessons are clickable.
- **Progress:** thin gold bar (6px) and a gold ring for module completion.
- **XP / streak pills:** surface pill, hairline border, a small gold dot, value
  bold, label muted.
- **Nav (marketing):** left logo, center links (Courses, Tracks, Community,
  Pricing), right: Search, Log in (ghost), Sign up (ink). Sticky, paper bg,
  hairline bottom border, slight blur only when scrolled.
- **Nav (app):** left sidebar — logo, nav (Dashboard, My learning, Practice,
  Community, Leaderboard), track badge + user at the bottom. Top bar with
  breadcrumb + streak/XP pills + avatar.
- **Footer:** rich, multi-column (Product, Learn, Company, Legal), newsletter
  input, Koji + tagline, social. Udemy-style density, not a thin one-liner.
- **Forms:** labels above inputs, 1px border, focus ring in `--ink` (not blue
  default), inline validation, helper text in `--ink-3`.
- **Empty/loading states:** every list has a designed empty state and skeletons.

---

## 6. Layout principles (kill the AI look)

- **No symmetric 3-card hero.** The landing hero is asymmetric: headline + copy +
  CTAs on the left (~55%), a product visual / Koji / stat cluster on the right.
- **Vary section rhythm:** alternate full-bleed, boxed, and split layouts. Use an
  offset/overlap or a tilted card somewhere for personality.
- **Real density where Udemy has it:** course detail and catalog should feel
  content-rich (curriculum, what-you'll-learn grid, requirements, reviews,
  related courses), not three paragraphs and whitespace.
- **Editorial touches:** a thin gold underline under the active nav item; a
  quoted testimonial set in Fraunces; numbered section eyebrows.
- **Imagery:** if no photos, use tasteful gradient/duotone placeholders or simple
  line illustrations in brand colours — never stocky AI-art blobs.

---

## 7. Accessibility & polish checklist

- Contrast ≥ 4.5:1 for body text. Gold text uses `--gold-ink` on light.
- Every interactive element has a visible focus ring and a hover state.
- Full keyboard nav; `prefers-reduced-motion` disables the scroll animations.
- Responsive: mobile-first, real breakpoints (sidebar collapses to a bottom bar
  or drawer on mobile).
- Dark editor stays dark in both themes.

---

## 8. Reject list (if you see these, redo it)

- Inter used for headings (use Fraunces).
- Purple/violet gradients, or any multi-stop gradient button.
- Pure `#000` / `#fff`, or cold grey `#f5f5f5` backgrounds.
- Emoji in headings or as icons (use lucide-react).
- Three identical centered feature cards.
- Glassmorphism, neon glows, heavy drop shadows.
- Default shadcn button/card styling left unstyled.
- Lorem ipsum — use `CONTENT.md`.
