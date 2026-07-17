# PyLearn — Complete Project Documentation

*Written in plain language. If you have never seen this project before, start at the top and read down. You should not need to be a developer to follow it.*

**Last updated:** 17 July 2026

---

## Table of contents

1. [What is PyLearn?](#1-what-is-pylearn)
2. [The big idea: two tracks, one platform](#2-the-big-idea-two-tracks-one-platform)
3. [How the whole thing fits together](#3-how-the-whole-thing-fits-together)
4. [The tech stack — what we used and why](#4-the-tech-stack--what-we-used-and-why)
5. [Every folder and file, explained](#5-every-folder-and-file-explained)
6. [The features, one by one](#6-the-features-one-by-one)
7. [How the Python code runner works](#7-how-the-python-code-runner-works)
8. [How login and accounts work](#8-how-login-and-accounts-work)
9. [Where the data lives](#9-where-the-data-lives)
10. [The design system](#10-the-design-system)
11. [How to run the project](#11-how-to-run-the-project)
12. [Known limitations and honest warnings](#12-known-limitations-and-honest-warnings)
13. [What to build next](#13-what-to-build-next)
14. [Glossary](#14-glossary)

---

## 1. What is PyLearn?

PyLearn is a **website for learning the Python programming language**. Think of it as a mix of Udemy (a course marketplace) and Duolingo (streaks, XP, levels), but built specifically for Python.

The single most important thing about it: **you can write and run real Python code directly in your web browser.** You do not install Python. You do not install an editor. You open the site, type code, press Run, and the answer appears. That removes the biggest reason beginners quit — they spend their first three hours fighting installation instead of learning.

The project currently is a **fully working demo/prototype**. All the screens are real, the code runner genuinely runs Python, login genuinely works. What it does *not* have yet is a real production database — more on that honestly in [section 12](#12-known-limitations-and-honest-warnings).

**The tagline the project uses:** *"Learn Python, properly. Two paths, one platform. From zero to real engineering, all in the browser."*

---

## 2. The big idea: two tracks, one platform

This is the concept that makes PyLearn different from every other Python course, so it is worth understanding before anything technical.

A 14-year-old school student and a 22-year-old engineering graduate both want to learn "Python loops". But they need **completely different explanations**:

| | **School track** | **Graduate track** |
|---|---|---|
| Who it's for | School students, absolute beginners | College students, career switchers, job seekers |
| Tone | Friendly, story-based, lots of analogies | Direct, technical, industry-focused |
| Depth | "A loop repeats something" | "Loops, iterators, and time complexity" |
| Goal | Curiosity and confidence | Employability and real engineering |

So when a user signs up, PyLearn asks one question: **"Are you a school student or a graduate?"** From that point on, **the same lesson shows different text and different starter code** depending on which track you chose.

**How this is built:** every lesson in the data has two body fields — `schoolBody` and `graduateBody` (see [src/data/courses.ts](pylearn/src/data/courses.ts)). The lesson page reads the logged-in user's `track` and shows the matching one. Your track is stored on your account and you can switch it any time in Settings.

**Why this is a good design:** you write and maintain **one course structure**, not two whole websites. The curriculum, the progress tracking, the code editor, the quizzes — all shared. Only the *explanation text* forks. That's a huge saving in effort for a large gain in relevance.

---

## 3. How the whole thing fits together

Here is the entire system in one picture:

```
                    ┌─────────────────────────────────────┐
                    │          YOUR WEB BROWSER           │
                    │                                     │
  You type code ───►│  ┌───────────┐    ┌──────────────┐  │
                    │  │ CodeMirror│    │   Pyodide    │  │
  You see output ◄──│  │ (editor)  │───►│ (Python that │  │
                    │  └───────────┘    │  runs HERE)  │  │
                    │                   └──────────────┘  │
                    │  ┌───────────────────────────────┐  │
                    │  │ localStorage: your XP, streak,│  │
                    │  │ level, completed lessons      │  │
                    │  └───────────────────────────────┘  │
                    └──────────────┬──────────────────────┘
                                   │ (login only)
                                   ▼
                    ┌─────────────────────────────────────┐
                    │       NEXT.JS SERVER                │
                    │                                     │
                    │  Auth.js checks your password       │
                    │  Middleware guards private pages    │
                    │  Renders the pages                  │
                    │                                     │
                    │  ┌───────────────────────────────┐  │
                    │  │ users-db.json  (the "database")│ │
                    │  │ courses.ts, quizzes.ts (content)│ │
                    │  └───────────────────────────────┘  │
                    └─────────────────────────────────────┘
```

**The key insight:** almost everything happens **in the browser**. The server is only really needed to check your password and hand you the pages. Python runs in the browser. Your XP is saved in the browser. This is why the project needs no expensive backend to demo — and why it loads fast and costs almost nothing to host.

The site is split into **three zones**, each with its own look:

| Zone | Pages | What it looks like |
|---|---|---|
| **Marketing** | `/`, `/courses`, `/courses/[slug]`, `/pricing`, `/about` | Top navbar + big footer. Public — anyone can see it. This is the "sales" side. |
| **App** | `/dashboard`, `/learn/...`, `/practice`, `/projects`, `/community`, `/leaderboard`, `/profile`, `/settings` | Left sidebar + top bar with your streak and XP. **Login required.** This is the "product" side. |
| **Auth** | `/login`, `/signup`, `/forgot-password` | Minimal, distraction-free. The doorway between the two. |

**Why split them?** Because a visitor and a student want opposite things. A visitor needs navigation, persuasion, and a price. A student needs the noise gone and their lesson in front of them. Two layouts, two mindsets. In the code this is done with **Next.js route groups** — the folders `(marketing)`, `(app)`, `(auth)`. The brackets mean "this folder groups pages together and gives them a shared layout, but the folder name does **not** appear in the URL." So `(app)/dashboard/page.tsx` is served at `/dashboard`, not `/app/dashboard`. It's a way to share a layout without polluting the URL.

---

## 4. The tech stack — what we used and why

This is the heart of the document. For each tool: what it is, why we picked it, and what it gets us.

### 4.1 Next.js 16 (the framework)

**What it is:** the framework that runs the whole website. It handles routing (which URL shows which page), rendering, the build, and the small amount of server code we have.

**Why we used it:** in Next.js, **your folder structure *is* your URL structure**. A file at `src/app/(app)/dashboard/page.tsx` automatically becomes the page at `/dashboard`. There is no routing configuration file to maintain, and it can never drift out of sync with reality.

It also lets frontend and backend live in **one project**. Our login API sits at [src/app/api/auth/register/route.ts](pylearn/src/app/api/auth/register/route.ts) — right next to the pages that call it. One repository, one language, one deploy.

**The advantage:** speed of development. A solo developer can build both halves of a real product without running two servers, two repos, or two languages.

**The specific version note:** we're on the **App Router** (the modern Next.js system), which gives us route groups, layouts, and Server Components.

### 4.2 React 19 (the UI library)

**What it is:** the library that turns data into what you see on screen.

**Why we used it:** React lets you build the interface out of **components** — small, self-contained, reusable pieces. Our [CourseCard.tsx](pylearn/src/components/CourseCard.tsx) is written once and used on the homepage, the catalog, and the dashboard. Fix a bug in it once, it's fixed in all three places.

React is also **declarative**: you describe what the screen should look like for a given state ("if `isRunning` is true, show a spinner"), and React works out how to update the actual page. You never manually touch the DOM. Far fewer bugs.

**The advantage:** reusability, and the largest ecosystem in frontend — every problem we hit has a well-documented answer.

### 4.3 TypeScript (the safety net)

**What it is:** JavaScript with types added. You declare what shape your data has, and the editor checks your work as you type.

**Why we used it:** look at this from [src/data/courses.ts](pylearn/src/data/courses.ts):

```ts
export interface Lesson {
  id: string;
  title: string;
  track: "both" | "school" | "graduate";
  schoolBody: string;
  graduateBody: string;
  // ...
}
```

That `track` line is doing real work. It says a track can be **only** one of those three exact words. Type `"student"` by mistake and your editor underlines it in red *immediately* — not at 2am when a user hits the bug.

**The advantage:** bugs get caught while you're writing, not after shipping. And it acts as free documentation — you never have to guess what fields a lesson has, the interface tells you. On a project this size, with lessons, courses, quizzes, projects and users all having distinct shapes, this pays for itself many times over.

We run it in `strict` mode (see [tsconfig.json](pylearn/tsconfig.json)) — the most thorough setting.

### 4.4 Tailwind CSS v4 (the styling)

**What it is:** a styling system where you apply small utility classes directly in your markup: `className="flex items-center gap-4 rounded-lg"`.

**Why we used it:** the traditional way is to write CSS in separate files with invented class names like `.course-card-wrapper-inner`. Two problems: naming things is genuinely hard, and those files only ever grow — nobody dares delete old CSS in case something still uses it.

With Tailwind, the style is right there on the element. Delete the element, the style is gone. No orphaned CSS, ever.

**The advantage:** you style without leaving the file, there's no naming debate, and the final CSS bundle only contains classes you actually used.

**How we made it *ours*:** the real trick is in [src/app/globals.css](pylearn/src/app/globals.css). Instead of using Tailwind's default colours (which is exactly why so many sites look identical and "AI-made"), we defined **design tokens** — named variables for our own palette:

```css
--paper:  #FFFFFF;   /* page background */
--ink:    #1C1D1F;   /* primary text and buttons */
--gold:   #A435F0;   /* the signature accent (purple) */
--code-bg:#1C1D1F;   /* the dark editor background */
```

Then we wire those into Tailwind via the `@theme` block, so we write `bg-paper` and `text-ink` instead of `bg-white` and `text-gray-900`. **The benefit:** to rebrand the entire site, you change about six lines in one file. Every button, card, and border across every page updates at once.

### 4.5 Pyodide (the star of the show)

**What it is:** the actual, real Python interpreter (CPython) compiled to **WebAssembly** so it runs inside a web browser.

**Why we used it — and why it matters so much:** normally, running a student's Python code means sending it to your server. That is a nightmare:

- **It's a security hole.** You're running untrusted code from strangers on your machine. Someone submits `import os; os.system("rm -rf /")` and you have a very bad day. Doing it safely needs containers, sandboxing, resource limits — serious infrastructure.
- **It costs money.** Every Run click burns server CPU. 1,000 students clicking Run = 1,000 executions you pay for.
- **It's slow.** Every run is a round trip over the network.

Pyodide makes all three problems vanish:

- **Security:** the code runs in *the student's own browser tab*, inside the browser's sandbox — the same sandbox that stops any random website from reading your files. A student can only ever hurt their own tab. **We do not need a sandbox because the browser already is one.**
- **Cost:** zero. Their laptop does the work, not our server. This scales to a million students for the same hosting bill.
- **Speed:** no network round trip. Press Run, get the answer.
- **Bonus:** it works **offline** once loaded.

**How we made it fast:** Pyodide is a big download (several MB — it's a whole Python). Two things make that acceptable, both in [src/lib/pyodide.ts](pylearn/src/lib/pyodide.ts):

1. **It's a singleton.** We load it exactly once and cache the instance in a variable. Every later run reuses it instantly. There's even a `loadPromise` guard so that if two things ask for Python *while it's still loading*, they both wait on the same download instead of starting a second one.
2. **It's lazy and pre-warmed.** It is only fetched on pages that have an editor — never on the homepage — and on those pages it starts downloading the moment the editor appears, in the background, while the student is still reading the lesson. By the time they press Run, it's usually ready.

**The trade-off, stated honestly:** the first load on a lesson page is a multi-megabyte download, and on slow connections that's a real wait. We accept it because the alternative — server execution — costs money forever and is a security liability forever. This cost is paid once, by the browser cache.

### 4.6 CodeMirror 6 (the editor)

**What it is:** the text editor component where students type their Python.

**Why we used it:** a plain `<textarea>` is a miserable place to write code — no colours, no line numbers, no indent handling. Students would blame *themselves* for how bad it feels.

We considered Monaco (the editor inside VS Code) but chose CodeMirror 6 because it is **much smaller**, and we're already asking the browser to download Pyodide. Every megabyte matters. CodeMirror 6 is also modular — we import only the Python language support (`@codemirror/lang-python`), not fifty languages we'll never use.

**How we integrated it** (see [src/components/CodeEditor.tsx](pylearn/src/components/CodeEditor.tsx)): we wrote a **custom theme** matching our `--code-*` tokens, so the editor looks like part of PyLearn rather than a component bolted on. The cursor is our purple. The selection is our purple at 25% opacity. Details like that are the difference between "a website with an editor in it" and "a coding platform".

Note that CodeMirror is loaded with **dynamic imports** (`await import(...)`) inside a `useEffect`. That's deliberate: it keeps the editor out of the main bundle *and* out of server rendering, since it needs a real browser to exist.

### 4.7 Auth.js / NextAuth v5 (login)

**What it is:** the library that handles sign-up, log-in, and sessions.

**Why we used it:** authentication is the classic "looks easy, is not" problem. Session tokens, cookie security flags, CSRF protection, expiry — get any one wrong and you have a breach. This is not a wheel you reinvent. Auth.js is the standard, battle-tested answer for Next.js.

**The advantage beyond safety:** it's **pluggable**. Today we use a Credentials provider (email + password). Adding "Sign in with Google" later is roughly a config block, not a rewrite. The rest of the app doesn't know or care where the user came from.

**Why JWT sessions:** we chose `strategy: "jwt"` (see [src/auth.ts](pylearn/src/auth.ts)). Your session lives in a signed cookie rather than a database table. That means **checking whether you're logged in requires zero database lookups** — the server just verifies the signature. Fast, and it fits a project without a real database.

We also extended the token so it carries your **`track`**, in the `jwt` and `session` callbacks. That's the small hack that makes the two-track system work everywhere: any page can read `session.user.track` instantly, with no lookup, and show the right lesson body.

### 4.8 Middleware (the bouncer)

[src/middleware.ts](pylearn/src/middleware.ts) is a single file that runs **before every page request**. It has a list of private routes, and its whole job is: *if you're asking for one of these and you're not logged in, bounce you to `/login`.*

**Why this matters:** the alternative is a login check pasted at the top of every single protected page. Nine pages, nine chances to forget one — and the one you forget is a data leak. One file, one list, one place to look. It also preserves where you were going (`callbackUrl`), so after logging in you land on the page you actually wanted.

### 4.9 Motion / Framer Motion (animation)

**What it is:** the animation library.

**Why we used it:** motion is the difference between a page that feels alive and one that feels like a PDF. Subtle scroll-in effects signal quality.

**Used carefully:** the rule is *subtle*. No bouncing, no spinning. And we respect `prefers-reduced-motion` — for users who've told their operating system that animation makes them ill (a real medical need for some people with vestibular disorders), we turn it off. **An accessibility requirement, not a nicety.**

### 4.10 lucide-react (icons)

Clean, consistent, open-source icons delivered as React components. **Why:** they're SVGs, so they're sharp at any size and take our text colour automatically. And because they're all drawn by the same hand on the same grid, the interface looks coherent — mixing icon sets is one of those things that looks subtly *wrong* without anyone being able to say why. We import only the icons we use, so the bundle stays small.

### 4.11 The fonts

Three fonts, each with a job:

- **Outfit** — display headings. Gives headings personality so the site doesn't look like a default template. (Historical note: the design doc specifies *Fraunces*, and the CSS variable is still called `--font-fraunces`, but it currently maps to Outfit. The variable name is a leftover.)
- **Inter** — body text. Designed specifically for screens; supremely readable at small sizes.
- **JetBrains Mono** — code. Monospaced (every character the same width, so code lines up) and built to distinguish the characters that matter in code: `0` vs `O`, `1` vs `l` vs `I`. In a Python lesson, confusing those two is a bug the student can't see.

**Why three:** heading / body / code are three different reading tasks. One font can't be best at all three.

---

## 5. Every folder and file, explained

```
PROJECT-Pylearn/
├── files/                    # The original build-kit docs (the spec)
└── pylearn/                  # The actual application
    ├── docs/                 # Same four docs, copied in for reference
    │   ├── START-HERE.md     # Stack decisions + the build phases
    │   ├── DESIGN-SYSTEM.md  # Colours, type, spacing, the "reject list"
    │   ├── PAGES.md          # A sketch of every page
    │   └── CONTENT.md        # All real copy and seed course content
    ├── public/               # Static images and SVGs
    ├── .env                  # Secrets — AUTH_SECRET, NEXTAUTH_URL. Never commit.
    ├── package.json          # The dependency list
    ├── tsconfig.json         # TypeScript settings (strict mode, the @/* alias)
    └── src/
        ├── auth.ts           # Auth.js config: providers, JWT + session callbacks
        ├── middleware.ts     # The route bouncer
        ├── app/
        │   ├── layout.tsx    # The root shell wrapping every page
        │   ├── globals.css   # ★ Design tokens live here
        │   ├── (marketing)/  # Public pages — navbar + footer layout
        │   ├── (app)/        # Private pages — sidebar layout
        │   ├── (auth)/       # Login / signup — minimal layout
        │   ├── style-guide/  # An internal page showing every component
        │   └── api/auth/     # register, verify, and the NextAuth handler
        ├── components/
        │   ├── ui/           # The primitives: Button, Input
        │   ├── CodeEditor.tsx    # ★ The biggest, most important component
        │   ├── Koji.tsx          # The mascot
        │   ├── AppSidebar.tsx    # Left nav for logged-in users
        │   ├── AppTopbar.tsx     # Streak + XP pills, avatar
        │   ├── MarketingNavbar.tsx, Footer.tsx, Logo.tsx
        │   └── CourseCard.tsx, Progress.tsx, Rating.tsx, StatPill.tsx
        ├── data/
        │   ├── courses.ts    # ★ All courses, sections, lessons (both tracks)
        │   ├── quizzes.ts    # The question bank
        │   ├── projects.ts   # Practice projects
        │   ├── users.ts      # Seed users
        │   └── users-db.json # The fake "database" file
        └── lib/
            ├── pyodide.ts    # ★ Loads Python, runs code, streams output
            └── user.ts       # ★ XP, levels, streaks, progress (localStorage)
```

**A note on `src/app/page.tsx` vs `src/app/(marketing)/page.tsx`:** both exist. The route-group one is the live homepage; the root one is a leftover from `create-next-app`. Worth cleaning up.

**The `@/*` alias:** in `tsconfig.json` we map `@/` to `src/`. So instead of `import { Button } from "../../../components/ui/Button"` you write `import { Button } from "@/components/ui/Button"`. It works identically from any depth, and it doesn't break when you move a file.

---

## 6. The features, one by one

### Landing page (`/`)
The sales pitch: asymmetric hero, the two-tracks split, a numbered "how it works", featured courses, a dark code-in-browser teaser, testimonials, and a call to action. Deliberately **not** the standard centred-hero-plus-three-cards layout — the design doc explicitly bans that as the thing that makes a site look machine-generated.

### Course catalog (`/courses`) and detail (`/courses/[slug]`)
The catalog has search, filters, and a responsive grid of `CourseCard`s. The detail page follows the Udemy layout — dark hero band, sticky enrol card, what-you'll-learn grid, an expandable curriculum accordion, requirements, reviews, related courses. **Why copy Udemy's layout?** Because millions of learners already know how to read it. Familiarity is a feature: an unfamiliar layout means the user spends effort learning your page instead of judging your course.

The `[slug]` in the folder name is a **dynamic route** — one file serves every course. `/courses/introduction-to-programming` and `/courses/anything-else` both render `[slug]/page.tsx`, which looks up the right course by its slug. Add a course to the data, and its page exists.

### Sign-up (`/signup`)
Two steps. Step one takes your name, email, password. **Step two asks the track question** — the single most important question on the site, given its own screen so nobody rushes past it.

### Dashboard (`/dashboard`)
Your home base once logged in: a "continue where you left off" card, stat cards, and the module path with progress rings.

### The course player (`/learn/[course]/[lesson]`) — the core of the product
Two dynamic segments, so one file serves every lesson of every course. Curriculum sidebar, **track-aware lesson body** (this is where `schoolBody` / `graduateBody` gets chosen), tabs, prev/next, and the embedded code editor. This is where students spend their time; everything else exists to get them here.

### Practice (`/practice`)
A quiz runner over the bank in [src/data/quizzes.ts](pylearn/src/data/quizzes.ts). Note that every question carries a **`why`** field, not just an `answer`. That's a teaching decision: telling someone they're wrong teaches nothing; telling them *why* is the entire point.

### Projects (`/projects`)
Real builds — a number guessing game, a tip calculator. Each declares what it `requires` (`["Variables", "input()", "Conditionals"]`), which powers a **completion gate**: you can't start a project until you've learned its prerequisites. **Why gate it?** Because a beginner thrown at a project they aren't ready for concludes they're bad at programming, and leaves. The gate protects their confidence.

### Community (`/community`) and Leaderboard (`/leaderboard`)
A composer and feed, and a weekly leaderboard with the current user highlighted. **Why:** learning alone is the most common reason people quit. The leaderboard is weekly on purpose — an all-time board is demoralising for newcomers who can never catch up, but everyone starts Monday at zero.

### Profile and Settings
Your progress, plus the ability to **switch track**. Important: someone who starts on the school track and outgrows it should be able to move up without losing their history. That's why the `jwt` callback has a `trigger === "update"` branch — it lets the track change take effect in your session immediately, without logging out.

### Gamification: XP, levels, streaks
All in [src/lib/user.ts](pylearn/src/lib/user.ts). Finish a lesson → **30 XP**. Finish a project → **100 XP** (projects are harder and more valuable). Every **150 XP** is a level.

**Why gamify:** learning to code has a brutal dropout rate, and the cause is almost never difficulty — it's that progress is invisible. You feel like you're getting nowhere. XP and levels make invisible progress **visible**. The streak exploits a real psychological effect: once you have a 12-day streak, you don't want to be the person who broke it at 12.

There's a nice detail in `saveLocalProfile`: after saving, it fires a custom browser event (`pylearn_user_update`). Any component listening will re-read and update. **Why:** so when you finish a lesson, the XP pill in the top bar updates *instantly*, without a refresh. It's a lightweight way to keep the whole UI in sync without a state-management library.

---

## 7. How the Python code runner works

Step by step, from lesson-open to output:

1. **You open a lesson.** The `CodeEditor` mounts. Its `useEffect` immediately calls `loadPyodide()` in the background — Python starts downloading while you read.
2. **CodeMirror initialises.** Dynamically imported (browser-only), styled with our custom purple theme, loaded with the lesson's `starterCode`.
3. **You type.** Standard editor behaviour: syntax colours, line numbers, undo history.
4. **You press Run.** `runPythonCode(code, onStdout, onStderr)` is called.
5. **Output is redirected.** This is the clever bit. Before running, we call `py.setStdout({ batched: ... })` and `py.setStderr(...)`, handing Python callbacks instead of a terminal. So when your Python does `print("hello")`, that text is **routed into React state** and rendered into the on-page console.
6. **The code runs** via `runPythonAsync` — the async version, so a slow line doesn't freeze the browser tab.
7. **Errors are caught.** A Python error isn't a crash; it's caught, formatted, and shown in the console the way a real terminal would. Learning to read a traceback is part of learning Python — we don't hide them.

**Why the singleton pattern matters here:** Python boots once per session, not once per Run. First run has a wait; every run after is instant.

---

## 8. How login and accounts work

**Signing up:**
1. You submit the form → `POST /api/auth/register`
2. The route reads [users-db.json](pylearn/src/data/users-db.json), checks the email isn't taken, appends you, writes the file back.
3. You're redirected to log in.

**Logging in:**
1. You submit → Auth.js `authorize()` runs (in [src/auth.ts](pylearn/src/auth.ts))
2. It calls `POST /api/auth/verify` with your credentials.
3. That route finds a matching user and returns it **without the password field** — a deliberate `const { password: _, ...userWithoutPassword } = user` so a password can never leak out in a response.
4. Auth.js builds a **JWT**, stuffing your `id` and `track` into it, and sets it as a signed cookie.
5. Every later request: middleware verifies the cookie signature. No database hit.

**Visiting a protected page while logged out:** middleware catches it, redirects to `/login?callbackUrl=<where you wanted to go>`, and after login you land there.

---

## 9. Where the data lives

Three separate stores, each for a reason:

| What | Where | Why there |
|---|---|---|
| **Course content** (courses, lessons, quizzes, projects) | TypeScript files in [src/data/](pylearn/src/data/) | It's read-only and never changes at runtime. Putting it in code means it's type-checked, version-controlled, and needs no database. |
| **User accounts** (email, password, track) | [users-db.json](pylearn/src/data/users-db.json) | Must survive a server restart and be shared across users. A JSON file is the simplest thing that works for a demo. |
| **Progress** (XP, level, streak, completed lessons) | Browser `localStorage` | Changes constantly, only matters to you. Keeping it in the browser means instant updates with zero server traffic. |

**Why not a real database?** Because for a demo it's pure overhead — a server to run, a schema to migrate, credentials to manage, a cost to pay. This project can be cloned and run by anyone in two minutes with no setup. That is worth a lot at this stage. The plan (per [START-HERE.md](pylearn/docs/START-HERE.md)) is a FastAPI + SQLAlchemy backend in production, and the code is structured so that swap is contained: `getDbUsers`/`saveDbUsers` in the API routes, and the functions in `lib/user.ts`.

---

## 10. The design system

[docs/DESIGN-SYSTEM.md](pylearn/docs/DESIGN-SYSTEM.md) is the rulebook, and it's unusually opinionated — in a good way. It includes a **"reject list"**: things you are not allowed to do because they're what makes a site look machine-generated.

**The rules that matter:**

- **Paper, not white.** The background is a considered surface, not a default.
- **Ink-filled buttons.** Primary buttons are near-black (`--ink`). Purple (`--gold`) is an **accent only** — never a button fill. Accents work by scarcity; the moment everything is purple, nothing stands out.
- **Hairlines, not shadows.** Borders (`--line`) instead of drop shadows. Editorial, print-like, denser.
- **Asymmetry.** No centred hero with three equal cards. That exact layout is the visual signature of a template.
- **Real content, no lorem ipsum, no emoji in the chrome.**

**Why be this strict:** the difference between a product that feels professional and one that feels generated is not talent — it's *constraints*. Defaults are what everyone else does. The reject list is what stops you drifting back to them at 1am.

The docs even include a debugging checklist for when it still looks AI-made: *Are headings actually the display font, or did Inter sneak in? Is the background paper or pure white? Did shadcn defaults show through?*

**A definition-of-done applies per page:** matches the sketch, real content, hover + focus + loading + empty states all exist, responsive at 375 / 768 / 1280px, nothing from the reject list. **Empty states are on that list deliberately** — the first thing a new user sees is an empty dashboard, and if that's a blank rectangle you've made a terrible first impression at the exact moment it matters most.

---

## 11. How to run the project

**You need:** Node.js 20+ and npm.

```bash
cd pylearn
npm install          # install dependencies (once)
npm run dev          # start the dev server
```

Open **http://localhost:3000**.

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload — the one you'll use |
| `npm run build` | Production build; also type-checks everything |
| `npm run start` | Serve the production build |
| `npm run lint` | Check code quality with ESLint |

**Demo logins** (from [users-db.json](pylearn/src/data/users-db.json)) — all use the password `password`:

- `aditi@pylearn.dev` — school track, level 7
- `shivam@pylearn.dev` — graduate track, level 9

**Environment variables** (in `.env`): `AUTH_SECRET` (the key that signs session cookies — must be secret) and `NEXTAUTH_URL` (the site's base URL).

**Note:** the first lesson page you open will take a few seconds to download Pyodide, and it needs an internet connection the first time (it's fetched from a CDN). After that it's cached.

**A useful page:** visit `/style-guide` to see every colour token, button variant, and component rendered on one page. It's how you eyeball the design system without hunting through the app.

---

## 12. Known limitations and honest warnings

This section exists so nobody is surprised. **This project is a demo, and these are the things that must be fixed before real users touch it.**

### 🔴 Passwords are stored in plain text
Look at [users-db.json](pylearn/src/data/users-db.json) — the passwords are just sitting there readable, and `verify/route.ts` compares them with `u.password === password`. **This is the single most serious issue in the codebase.** If this file leaked, every account is compromised — and because people reuse passwords, their *other* accounts too.

**The fix:** hash passwords with bcrypt or argon2 before storing, and compare hashes. Non-negotiable before launch.

### 🔴 A JSON file is not a database
`users-db.json` breaks in several ways under real use:
- **Race conditions.** Two people signing up at the same instant can read the same file, and one write silently erases the other's account.
- **It doesn't survive deployment.** On Vercel and most modern hosts the filesystem is read-only or ephemeral — every sign-up would vanish on the next deploy.
- **It doesn't scale.** The whole file is read into memory on every login.

**The fix:** a real database (Postgres via Prisma, or the planned FastAPI + SQLAlchemy backend).

### 🟠 Progress lives only in the browser
Your XP and streak are in `localStorage`. Clear your browser data and **your progress is gone**. Log in on your phone and you start from zero. **The fix:** move progress to the server, keyed to your user account.

### 🟠 Auth calls itself over HTTP
In `authorize()`, the server makes a `fetch` to its *own* `/api/auth/verify` endpoint. It works, but it's a needless network round trip to talk to yourself, and it means auth breaks if `NEXTAUTH_URL` is wrong. **The fix:** call the verification logic as a direct function.

### 🟡 `any` types in places
There are `as any` casts around the session and Pyodide objects. Understandable (Pyodide has no types), but each one is a hole in the safety net TypeScript is providing.

### 🟡 Pyodide's first load is heavy
Several MB on the first lesson page. A conscious trade-off (see [4.5](#45-pyodide-the-star-of-the-show)), but on a slow connection it's a real wait, and it needs internet the first time.

### 🟡 OAuth buttons are placeholders
The Google/GitHub buttons on login are UI only — they aren't wired to anything yet.

---

## 13. What to build next

**Before anything else — the security work:**
1. **Hash the passwords.** Nothing else matters until this is done.
2. **Move to a real database.** Postgres + Prisma, or the planned FastAPI/SQLAlchemy backend.
3. **Move progress to the server** so it follows the user across devices.

**Then, the product work:**
4. **Automated tests** for the code runner and the XP logic — the two places a bug quietly corrupts a student's experience.
5. **Real lesson checking.** Right now `expectedOutput` compares text. A proper test-case runner ("your function must return 4 for input 2") would be far stronger.
6. **Wire up the OAuth buttons.**
7. **Rate-limit the register endpoint** — it's currently wide open to being spammed.
8. **Delete the leftover `src/app/page.tsx`** so there's one obvious homepage.
9. **Rename `--font-fraunces`** to match the font it actually loads.

---

## 14. Glossary

| Term | Plain meaning |
|---|---|
| **Framework** | A pre-built structure for an app so you don't start from nothing. Next.js is ours. |
| **Component** | A reusable piece of interface, e.g. `CourseCard`. Write once, use everywhere. |
| **Route** | A URL. `/dashboard` is a route. |
| **Route group** | A folder in brackets like `(app)` that shares a layout without appearing in the URL. |
| **Dynamic route** | A folder in square brackets like `[slug]` — one file that serves many URLs. |
| **Middleware** | Code that runs before a page loads. Ours is the login bouncer. |
| **JWT** | JSON Web Token — a signed pass proving who you are, so the server needn't look you up. |
| **localStorage** | A small storage box in your browser. Survives closing the tab, but only on that device. |
| **WebAssembly (Wasm)** | A format that lets languages like C and Python run at near-native speed in a browser. What makes Pyodide possible. |
| **Design token** | A named value like `--ink` for a colour, so the design can change in one place. |
| **stdout / stderr** | Where a program's normal output and its errors go. We redirect both into the on-page console. |
| **Singleton** | A thing created only once and reused. Pyodide is one. |
| **Hashing** | A one-way scramble for passwords. You can check a guess against it, but can't reverse it. |
| **Seed data** | Fake starter content so an app has something to show on day one. |
| **Slug** | The URL-friendly name of a thing, e.g. `introduction-to-programming`. |
| **Sandbox** | A locked room where untrusted code can run without touching anything important. |

---

## In one paragraph

**PyLearn is a Python learning platform built with Next.js 16, React 19, TypeScript and Tailwind v4, whose defining feature is that real Python runs in the student's own browser via Pyodide — which makes code execution free, instant, and safe by construction rather than by infrastructure. Its second defining feature is the two-track system: one curriculum that tells its lessons differently to a school student than to a graduate. Everything else — the XP, the streaks, the gated projects, the leaderboard — exists to solve the real problem with learning to code, which was never difficulty. It was quitting.**
