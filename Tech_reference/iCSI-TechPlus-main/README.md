# Tech+ StudyHub

A single-purpose study tool for the **CompTIA Tech+ (FC0-U71)** exam, split
off from the original multi-course LearnHub (which also covered HTML, CSS,
JavaScript, Python, SQL, Network+, Security+, and PenTest+).

## Quick start

Serve over HTTP (required — `file://` will not load the JS assets correctly):

```
python -m http.server 8765
```

Open [http://localhost:8765](http://localhost:8765).

## What changed from LearnHub

This isn't just LearnHub with other courses hidden — the whole shell was
redesigned around having exactly one course:

- **No course switcher.** The home screen is a Tech+ dashboard: overall
  progress, a "continue where you left off" card, voucher-attempt history,
  and quick-jump cards into each major section.
- **Sidebar is always the Tech+ curriculum**, not a "pick a class" list —
  it's visible on every screen, including the dashboard.
- **294 items were regrouped into a real hierarchy.** The original export
  gave almost every lesson/quiz its own top-level sidebar entry, which is
  fine for a 20-item course and unusable for a 294-item one. This build
  groups everything into 6 sections, with the 12 study-guide chapters each
  collapsing their ~9–31 sub-lessons under one chapter heading (auto-titled
  from the lesson content itself, e.g. *"Chapter 5: Software Applications"*):

  | Section | Contents |
  |---|---|
  | Core IT Concepts | 24 short foundational lessons |
  | Full Study Guide | 12 chapters, ~188 sub-lessons + 12 chapter-review quizzes |
  | Practice Quizzes | Concept quizzes (13), quiz bank (36 sets), extra practice sets (11) |
  | Voucher Exam Prep | 3 full practice exams, each paired with its study plan |
  | Flashcards | 127 IT acronyms & terms |
  | Reference | Cram sheet, full written guide, post-test review |

- **Removed the starter-file download system** — that only applied to the
  coding courses (HTML/CSS/JS practice labs); Tech+ has no code-practice
  lessons, so it was dead weight here.
- **The "open full guide" links now go somewhere real.** In the original
  export these pointed at `docs/guides/Study.html` and
  `docs/guides/techplus_study_guide.html` — neither of which existed in this
  project. The Tech+ section was extracted out of the old combined
  `full.html` (which held 13 different subject guides in one file) into its
  own standalone page, `docs/guides/techplus-study-guide.html`, with a
  generated table of contents, and both lesson links were repointed at it.

## Rebuild content from source

If the upstream LearnHub Tech+ curriculum changes, drop a fresh multi-course
export in `source/` (see `source/README.md` for the exact filenames) and run:

```
node scripts/build-techplus.mjs
```

This regenerates:

| File | Contents |
|------|----------|
| `assets/courses.js` | Tech+ course structure (groups → chapters/units → items) |
| `assets/content.js` | Tech+ lesson & study-plan bodies |
| `docs/guides/techplus-study-guide.html` | Standalone extracted Tech+ study guide |

Not rebuilt (hand-maintained app shell):

| File | Contents |
|------|----------|
| `index.html` | Page structure |
| `assets/app.css` | Styles, including dark mode |
| `assets/app.js` | Navigation, dashboard, quizzes, flashcards, progress, keyboard shortcuts |
| `assets/flashcards.js` | Tech+ flashcard deck (127 terms) — unchanged from LearnHub |
| `assets/voucher-plans.js` | Voucher cram plans (3 tests) — unchanged from LearnHub |

Run `node scripts/validate.mjs` (needs `npm install jsdom` first) after any
rebuild — it drives the actual app in a headless DOM: opens every one of the
294 items, answers and submits a quiz, runs a flashcard round, checks the
voucher-exam flow, and confirms the guide links resolve. It's the same check
used to validate this build before delivery.

## Features

- **Dashboard:** overall progress, resume card, voucher-attempt history,
  quick-jump section cards
- **Study Guide:** 12 collapsible chapters, auto-titled from content
- **Quizzes:** one question at a time, flag for review, check all at the end;
  scores saved locally (last 10 attempts per quiz)
- **Voucher Exam Prep:** each practice exam paired with its study plan and a
  cram-by-domain breakdown shown alongside the exam
- **Flashcards:** 127 IT acronyms, two-pass review (misses repeat)
- **Progress:** stored in `localStorage` under `th_progress` (legacy
  `lh_progress` synced on first load)
- **Keyboard:** `←`/`→` prev/next item (or prev/next quiz question), `/`
  focus search, `Esc` to go home or close the mobile drawer
- **Dark mode:** toggle in the top bar

## Known content gaps

- The quiz bank (`tech-q1`–`tech-q49`) and GimKit-style practice sets contain
  originally-written questions, not real CompTIA exam questions. If you
  supply actual practice questions later, they can be swapped into
  `source/original-content.js`/`original-courses.js` and re-filtered through
  `build-techplus.mjs`, or added directly to `assets/courses.js`.
