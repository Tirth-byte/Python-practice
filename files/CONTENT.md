# PyLearn — Seed Content

Real content for the whole site. Put structured data in `/data/*.ts` and use this
copy verbatim (edit freely). No lorem ipsum anywhere.

---

## Brand copy

- **Tagline:** Learn Python, properly.
- **Hero headline:** Python that finally makes sense — taught your way.
- **Hero subcopy:** Two paths, one platform. Whether you're starting from zero or
  levelling up to real engineering, PyLearn teaches, tests, and lets you build —
  all in the browser, nothing to install.
- **Hero CTAs:** `Start learning free` · `Browse courses`
- **Trust row:** 12,000+ learners · 4.8 average rating · No card required
- **CTA band:** Your first program is ten minutes away. — `Create free account`

## Two tracks (landing + signup)

- **School level** — *Start from zero.* Plain language, animations and small
  games, less code and more intuition. Koji walks you through every step.
- **Graduate level** — *Give me the real thing.* Proper terminology, Python vs C,
  IDEs and lots of hands-on coding. Built for CS students and career switchers.

## How it works (numbered)

1. **Learn a topic** — a short explainer from Koji, one clear example.
2. **Practice** — a quick quiz after every topic; earn XP, keep your streak.
3. **Build a project** — apply what you learned, solo or with a friend.
4. **Level up** — unlock the next module; climb the weekly leaderboard.

---

## Courses (catalog + detail)

### Course 1 — Introduction to Programming
- **slug:** `introduction-to-programming`
- **level:** Both tracks · **lessons:** 4 · **duration:** ~1.5h · **price:** Free
- **rating:** 4.9 (1,204) · **promise:** Understand how programs actually think —
  before you write a single line.
- **What you'll learn:** what a program is (Input → Process → Output) · why
  computers do exactly what you say · why Python (vs C) · what IDEs are and when
  to use them.
- **Requirements:** none — a laptop and curiosity.
- **Curriculum (Section 1: Foundations):**
  1. What is a program? *(6 min · lesson)*
  2. The computer only does what you say *(7 min · lesson)*
  3. Why Python? Python vs C *(8 min · graduate)*
  4. Platforms & IDEs *(9 min · graduate)* + **Module test** to unlock Module 2.

### Course 2 — Introduction to Python
- **slug:** `introduction-to-python`
- **level:** Both tracks · **lessons:** 7 · **duration:** ~3h · **price:** Free
- **rating:** 4.8 (2,536) · **promise:** Write, run and reason about real Python —
  from `print()` to conditionals.
- **What you'll learn:** print & output · variables · data types · input ·
  operators · strings · if / elif / else.
- **Curriculum (Section 1: Python basics):**
  1. `print()` and output *(current)*
  2. Variables
  3. Data types
  4. `input()`
  5. Operators
  6. Strings
  7. Conditionals (if / elif / else) + **Module test.**

(Optional "coming soon" cards for the catalog: *Loops & Iteration*, *Functions*,
*Lists & Dictionaries*, *Intro to AI/ML with Python* — greyed, "Coming soon".)

---

## Lesson content (for the player) — use track-aware bodies

### Lesson: `print()` and output — Lecture 6
- **School body:** `print()` is how the computer talks to you. Whatever you put
  inside the quotes, it shows on the screen. The words always go inside `" "` —
  change them below and run it to see what happens.
- **Graduate body:** `print()` sends output to standard output — the simplest way
  to display text or values. Text goes in quotes (a string); numbers and
  expressions don't need quotes, Python evaluates them first. Pass several items
  separated by commas, and `sep=` controls what joins them.
- **Starter code:**
  ```python
  print("Hello, world")
  print("Sum is", 2 + 3)
  print("A", "B", sep="-")
  ```
- **Objective:** Print text and values to the console using `print()`.
- **Example box:** `print("Hello!")` → `Hello!`

### Lesson: Variables
- **School:** A variable is a labelled box where you keep a value. Give the box a
  name, put something in it, use it later.
- **Graduate:** A variable is a name that refers to a value in memory. `=` is
  assignment, not equality. Names start with a letter/underscore, no spaces,
  case-sensitive; a variable can be reassigned and can hold different types.
- **Starter:** `name = "Tirth"` / `age = 19` / `print(name, age)`

### Lesson: Data types
- **School:** int `5`, float `3.14`, str `"apple"`, bool `True/False`.
- **Graduate:** Python is dynamically typed — the type is inferred from the value;
  check with `type(x)`. `"5" + "5"` gives `"55"` (join) but `5 + 5` gives `10`.

(Keep the same School/Graduate pattern for input, operators, strings,
conditionals — content is in the project plan document.)

---

## Quiz bank (practice + end-of-lesson)

1. **Q:** What does `print("5" + "5")` display?
   **Options:** `10` · `"55"` · `55` · `Error` — **Answer:** `55`.
   **Why:** Two strings joined with `+` are glued together, so `"5" + "5"` is
   `55` as text, not `10`.
2. **Q:** What type does `input()` always return?
   **Options:** `int` · `str` · `bool` · depends — **Answer:** `str`.
   **Why:** `input()` always returns text; convert with `int()`/`float()` for math.
3. **Q:** Which checks if a number `n` is even?
   **Options:** `n / 2 == 0` · `n % 2 == 0` · `n // 2 == 0` · `n ** 2 == 0`
   **Answer:** `n % 2 == 0`. **Why:** `%` is the remainder; even numbers leave 0.
4. **Q:** What does `2 ** 3` equal? **Options:** `6 · 8 · 9 · 5` — **Answer:** `8`
   (`**` is power). 

---

## Projects (project picker)

- **Number Guessing Game** — *Beginner.* Requires: variables, input, conditionals.
  The computer picks a number; the player guesses with hi/lo hints.
- **Tip Calculator** — *Beginner.* Requires: variables, operators, input. Split a
  bill and compute tip per person.
- **Mad Libs Generator** — *Beginner.* Requires: strings, input. Fill a template
  with user words for a funny story.
- **Rock · Paper · Scissors** — *Intermediate.* Requires: conditionals, operators.
  Play against the computer, keep score.

Each project card: brief, required topics (with the completion gate), resources,
`Build solo` / `Build with a friend` (both must be PyLearn users who finished the
required topics).

---

## Testimonials

- "I bounced off Python twice. The school track finally made the *why* click —
  I built my first game in a week." — **Aditi M.**, first-year student.
- "The Python-vs-C breakdown is exactly what my degree skipped. Graduate track is
  the real deal." — **Shivam P.**, CS undergrad.
- "Running code in the browser with instant feedback kept my streak alive for 40
  days straight." — **Riya S.**, self-taught.

---

## Community feed (seed posts)

- **Aditi M.** · Level 7 — "Finished the Number Guessing project! Added a
  best-score tracker 🎯 feedback welcome." (12 likes, 3 comments)
- **Karan D.** · Level 4 — "Why does `input()` return a string even when I type a
  number? Took me an hour 😅" (community answers below)
- **Shivam P.** · Level 9 — "Graduate track, Module 2 done. The strings section's
  f-string examples are gold." (20 likes)

*(Emoji are allowed inside user-generated post text only — never in the UI chrome.)*

---

## Leaderboard (weekly)

| # | Name | XP |
|---|------|----|
| 1 | Aditi M. | 1,420 |
| 2 | Shivam P. | 1,180 |
| 3 | *You* | 640 |
| 4 | Riya S. | 610 |
| 5 | Karan D. | 540 |

---

## Auth microcopy

- **Signup title:** Create your free account · **sub:** Start learning in under a
  minute. No card needed.
- **Track step title:** How should we teach you? · **sub:** You can change this
  anytime in settings.
- **Login title:** Welcome back · **sub:** Pick up where Koji left off.
- **Forgot:** Reset your password · success: If that email exists, we've sent a
  reset link.
- **OAuth buttons:** Continue with Google · Continue with GitHub.

## Footer

Columns — **Product:** Courses, Tracks, Pricing, Projects. **Learn:** Roadmap,
Community, Leaderboard, Resources. **Company:** About, Blog, Careers, Contact.
**Legal:** Privacy, Terms. Newsletter: "Weekly Python tips from Koji."
Bottom line: © PyLearn. Learn Python, properly.

## Stat numbers (for landing clusters)

12,000+ learners · 4.8★ average · 40-day longest streak · 2 tracks · runs 100% in
the browser.
