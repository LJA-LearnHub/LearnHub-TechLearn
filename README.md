# PathLearn

A Duolingo-style study app: a winding lesson path down the middle of the
screen, click-to-open lessons, hearts, XP, streaks, and progress saved in
the browser. Blue and orange themed. No build tools, no dependencies —
just HTML, CSS, and JS.

## Running it

Open `index.html` in a browser. That's it.

If you want a local server instead of opening the file directly (optional,
but avoids occasional browser quirks with local files), from this folder:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Adding your own content

Everything you need to edit lives in **`js/data.js`**. You do not need to
touch `index.html`, `css/style.css`, or `js/app.js` to add units, lessons,
or questions — those files just render whatever is in `data.js`.

Open `js/data.js` and you'll see:

```js
window.COURSE_DATA = {
  courseTitle: "PathLearn",
  units: [
    {
      id: "unit-1",
      title: "Unit 1: Everyday Greetings",
      description: "Say hello, introduce yourself, and be polite.",
      accent: "blue",           // "blue" or "orange" — banner color
      lessons: [
        {
          id: "u1-l1",
          title: "Basic Greetings",
          icon: "👋",
          exercises: [ /* ... */ ]
        }
      ]
    }
  ]
};
```

- **Units** become the colored banners on the path, and hold a list of lessons.
- **Lessons** become the circular nodes on the path. Give each one a unique `id`.
- **Exercises** are the questions inside a lesson.

Lessons unlock in order — the first lesson is always open, and each one
unlocks once the lesson before it is completed. That order is just the
order things appear in the `units` / `lessons` arrays, top to bottom.

### The three exercise types

**Multiple choice**
```js
{
  type: "multiple-choice",
  question: "Which word means 'hello'?",
  options: ["Adiós", "Hola", "Gracias", "Por favor"],
  correctIndex: 1,
  explanation: "Hola is the everyday greeting for 'hello'." // optional
}
```

**Type the answer**
```js
{
  type: "type-answer",
  question: "Type the word for 'thank you' in Spanish.",
  accepted: ["gracias"],   // list multiple spellings if you want to accept more than one
  hint: "Starts with a G", // optional
  explanation: "..."       // optional
}
```

**Match the pairs**
```js
{
  type: "match-pairs",
  instruction: "Match each word to its translation",
  pairs: [
    { left: "Hello", right: "Hola" },
    { left: "Goodbye", right: "Adiós" }
  ]
}
```

Mix and match these freely within a lesson — a lesson's `exercises` array
can contain any combination, in any order.

### Marking a lesson as a checkpoint

Add `checkpoint: true` to a lesson to make its node bigger, as a way to
flag a bigger "test" lesson (like a milestone review). Mechanically it
works exactly like any other lesson.

### Adding a whole new unit

Copy one of the unit objects inside the `units:` array, paste it as a new
entry, and change its `id`, `title`, and `lessons`. That's the whole
process — no other file needs to change.

## Side rail (wide screens)

On screens 1000px and wider, a stats rail appears to the right of the
path: a daily XP goal ring, a 7-day activity strip, overall course
progress, and a rotating tip. It's purely a nice-to-have for filling out
wider layouts — on narrower screens it's hidden and the path stays
centered on its own, same as before.

The daily goal is 30 XP by default; change `DAILY_XP_GOAL` near the top
of `js/app.js` if you want a different target.

## How progress is tracked

Progress (completed lessons, XP, streak, and daily activity) is saved in
the browser's `localStorage`, keyed per-browser/device — there's no
account system or server. Use the ⟲ button in the top-right corner to
wipe progress and start over (useful while you're testing your own
content).

The streak only advances when you complete a lesson that day (not just
from opening the page), and it'll show as reset if a day was missed —
consistent with how most habit-streak features work.

If you ever change a lesson's `id` in `data.js`, the app will treat it as
a brand-new lesson (previous progress on the old id just won't match
anymore).

## File overview

```
index.html      Page structure and all overlay markup
css/style.css   Theme (colors, fonts) and all visual styling
js/data.js      <- YOUR CONTENT GOES HERE
js/app.js       Rendering + lesson mechanics (shouldn't need edits)
```

## Dark mode

Dark mode is the default appearance. There's a 🌙/☀️ button next to the
reset button in the top-right — click it to switch to light mode. The
choice is remembered in the browser (`localStorage`), so it stays put on
your next visit.

## Customizing the look

`css/style.css` starts with a block of CSS variables (`:root { ... }`)
for colors and fonts — this is the dark theme (the default). Right below
it, `:root[data-theme="light"] { ... }` holds the light theme overrides.
Adjust `--blue`, `--orange`, and their `-dark` / `-pale` variants in
either block to shift that theme's palette; everything else in the
stylesheet references those variables. Note that `-dark` variants (e.g.
`--orange-dark`) double as the 3D button shadow color, so keep them
darker than the base color in both themes, or the pressed-button bevel
effect will look inverted.

## Notes on the mechanics

- 5 hearts per lesson attempt; a wrong answer costs a heart, running out
  sends you to a retry screen (the lesson doesn't lose your overall
  progress from earlier attempts — only that in-progress run resets).
- 10 XP per completed lesson, +5 bonus for a perfect run.
- Streak increments once per calendar day you complete at least one lesson.
