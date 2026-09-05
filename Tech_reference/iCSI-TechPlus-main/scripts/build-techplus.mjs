/**
 * TechPlus StudyHub — build script
 * ---------------------------------
 * Regenerates assets/courses.js, assets/content.js, and
 * docs/guides/techplus-study-guide.html from the original multi-course
 * LearnHub export.
 *
 * This project was split off from the full LearnHub (HTML/CSS/JS/Python/
 * SQL/Network+/Security+/PenTest+/Tech+) to be a single-purpose Tech+
 * (FC0-U71) study tool. If the upstream LearnHub curriculum for Tech+
 * ever gets updated, drop the refreshed multi-course files in `source/`
 * (same three filenames as below) and re-run this script to regenerate
 * everything here without hand-editing.
 *
 * Usage:
 *   node scripts/build-techplus.mjs
 *
 * Reads:
 *   source/original-courses.js   (window.COURSES = [...])
 *   source/original-content.js   (window.LEARN_HUB_CONTENT = {...})
 *   source/original-full.html    (multi-subject combined study guide)
 *
 * Writes:
 *   assets/courses.js
 *   assets/content.js
 *   docs/guides/techplus-study-guide.html
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'source');

function loadWindowVar(file, varName) {
  const code = fs.readFileSync(path.join(SRC, file), 'utf8');
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(code, ctx);
  return ctx.window[varName];
}

// ── 1. Load originals ──────────────────────────────────────────────
const COURSES = loadWindowVar('original-courses.js', 'COURSES');
const CONTENT = loadWindowVar('original-content.js', 'LEARN_HUB_CONTENT');

const tech = COURSES.find(c => c.id === 'tech');
if (!tech) throw new Error('Could not find the "tech" course in source/original-courses.js');

const byId = {};
for (const u of tech.units) byId[u.items[0].id] = u.items[0];
const need = id => {
  const item = byId[id];
  if (!item) throw new Error('Missing expected Tech+ item: ' + id);
  return item;
};

// ── 2. Regroup the flat 294-item unit list into a real hierarchy ──
// The original export gives every item its own top-level "unit" —
// fine for short courses, unusable for a 294-item cert prep course.
// Group into: Core Concepts / Study Guide chapters / Practice Quizzes /
// Voucher Exam Prep / Flashcards / Reference.

const CHAPTER_TITLES = {};
for (let c = 1; c <= 12; c++) {
  const cc = String(c).padStart(2, '0');
  const overview = CONTENT['tech-sg-' + cc + '-01'] || '';
  const m = overview.match(/<h1>Lesson \d+:\s*([^<]*)<\/h1>/);
  CHAPTER_TITLES[c] = m ? m[1].trim() : ('Chapter ' + c);
}

// -- Core Concepts (tech-01..tech-24) --
const coreUnits = [];
for (let i = 1; i <= 24; i++) {
  const id = 'tech-' + String(i).padStart(2, '0');
  coreUnits.push({ title: need(id).title, items: [need(id)] });
}

// -- Full Study Guide, 12 chapters --
const guideUnits = [];
for (let c = 1; c <= 12; c++) {
  const cc = String(c).padStart(2, '0');
  const prefix = 'tech-sg-' + cc + '-';
  const chapterItems = tech.units
    .map(u => u.items[0])
    .filter(it => it.id.startsWith(prefix));
  guideUnits.push({
    title: 'Chapter ' + c + ': ' + CHAPTER_TITLES[c],
    items: chapterItems
  });
}

// -- Practice Quizzes --
const conceptQuizItems = [];
for (let i = 1; i <= 13; i++) conceptQuizItems.push(need('tech-q' + i));

const quizBankItems = [];
for (let i = 14; i <= 49; i++) quizBankItems.push(need('tech-q' + i));

const extraPracticeIds = [
  'tech-gimkit-01', 'tech-gimkit-02', 'tech-gimkit-03', 'tech-gimkit-04',
  'tech-gimkit-34', 'tech-gimkit-35', 'tech-gimkit-36',
  'tech-gimkit-37', 'tech-gimkit-38', 'tech-gimkit-39',
  'tech-capstone'
];
const extraPracticeItems = extraPracticeIds.map(need);

const quizUnits = [
  { title: 'Concept Quizzes', items: conceptQuizItems },
  { title: 'Quiz Bank (36 sets)', items: quizBankItems },
  { title: 'Extra Practice Sets', items: extraPracticeItems }
];

// -- Voucher Exam Prep --
const examUnits = [1, 2, 3].map(n => {
  const nn = String(n).padStart(2, '0');
  return {
    title: 'Voucher Test ' + nn,
    items: [need('tech-voucher-study-' + nn), need('tech-gimkit-' + (39 + n))]
  };
});

// -- Flashcards --
const flashUnits = [
  { title: 'Tech+ Flashcards', items: [need('tech-gimkit-flashcards')] }
];

// -- Reference & Cram Sheets --
const referenceUnits = [
  {
    title: 'Cram Sheets & Reference',
    items: [
      need('tech-study-weighted-cram'),
      need('tech-study-full-guide'),
      need('tech-study-posttest-review')
    ]
  }
];

const COURSE = {
  id: 'tech',
  name: 'Tech+',
  section: 'CompTIA Tech+ (FC0-U71)',
  difficulty: 'Certification',
  description: tech.description,
  emoji: tech.emoji,
  color: tech.color,
  groups: [
    { id: 'core', title: 'Core IT Concepts', subtitle: '24 short lessons covering exam foundations', units: coreUnits },
    { id: 'guide', title: 'Full Study Guide', subtitle: '12 chapters, cover to cover', units: guideUnits },
    { id: 'quizzes', title: 'Practice Quizzes', subtitle: '60 quizzes across every domain', units: quizUnits },
    { id: 'exams', title: 'Voucher Exam Prep', subtitle: '3 full practice exams + study plans', units: examUnits },
    { id: 'flashcards', title: 'Flashcards', subtitle: '127 IT acronyms & terms', units: flashUnits },
    { id: 'reference', title: 'Reference', subtitle: 'Cram sheets & the full written guide', units: referenceUnits }
  ]
};

// Sanity check: every original tech item must appear exactly once.
{
  const originalIds = tech.units.map(u => u.items[0].id).sort();
  const newIds = COURSE.groups.flatMap(g => g.units).flatMap(u => u.items).map(i => i.id).sort();
  if (originalIds.length !== newIds.length) {
    throw new Error(`Item count mismatch: source has ${originalIds.length}, regrouped has ${newIds.length}`);
  }
  for (let i = 0; i < originalIds.length; i++) {
    if (originalIds[i] !== newIds[i]) throw new Error('Item id mismatch during regroup: ' + originalIds[i] + ' vs ' + newIds[i]);
  }
}

fs.writeFileSync(
  path.join(ROOT, 'assets', 'courses.js'),
  '// Auto-generated by scripts/build-techplus.mjs — do not hand-edit.\n' +
  'window.COURSE = ' + JSON.stringify(COURSE, null, 2) + ';\n'
);
console.log('Wrote assets/courses.js —', COURSE.groups.flatMap(g => g.units).flatMap(u => u.items).length, 'items in', COURSE.groups.length, 'groups');

// ── 3. Filter content.js down to Tech+ lesson/study-plan bodies ───
const neededContentIds = COURSE.groups
  .flatMap(g => g.units).flatMap(u => u.items)
  .filter(it => it.type === 'lesson' || it.type === 'study-plan')
  .map(it => it.id);

const newContent = {};
for (const id of neededContentIds) {
  if (!(id in CONTENT)) throw new Error('Missing content for ' + id);
  newContent[id] = CONTENT[id];
}

// Fix the two guide links that pointed at multi-course guide files
// that no longer exist in this project.
newContent['tech-study-full-guide'] =
  '<h2>Complete FC0-U71 Study Guide</h2>\n' +
  '<p>This is the full written study guide for the CompTIA Tech+ (FC0-U71) exam — all twelve chapters as one long-form reference you can read top to bottom or search with Ctrl/Cmd+F.</p>\n' +
  '<div class="lesson-callout"><p><strong>Tip:</strong> For day-to-day study, work through the Full Study Guide chapters and quizzes in the sidebar instead. Open this when you want a single consolidated reference — e.g. the night before an exam.</p></div>\n' +
  '<p><a href="docs/guides/techplus-study-guide.html" target="_blank" rel="noopener">Open the full study guide in a new tab →</a></p>';

newContent['tech-study-posttest-review'] =
  '<h2>Post-test review</h2>\n' +
  '<p>Focused notes for revisiting weak areas after a voucher attempt. Cross-reference any domain you scored low on against the matching chapter in the full study guide.</p>\n' +
  '<p><a href="docs/guides/techplus-study-guide.html" target="_blank" rel="noopener">Open the full study guide in a new tab →</a></p>';

fs.writeFileSync(
  path.join(ROOT, 'assets', 'content.js'),
  '// Auto-generated by scripts/build-techplus.mjs — do not hand-edit.\n' +
  'window.LEARN_HUB_CONTENT = ' + JSON.stringify(newContent, null, 2) + ';\n'
);
console.log('Wrote assets/content.js —', Object.keys(newContent).length, 'lesson/study-plan bodies');

// ── 4. Extract the Tech+ section of the combined study guide ──────
const fullHtml = fs.readFileSync(path.join(SRC, 'original-full.html'), 'utf8');
const startMarker = '<h1 id="comptia-tech-fc0-u71-complete-study-guide">';
const endMarker = '<h1 id="comptia-network-n10-009-complete-study-guide">';
const startIdx = fullHtml.indexOf(startMarker);
const endIdx = fullHtml.indexOf(endMarker);
if (startIdx === -1 || endIdx === -1) throw new Error('Could not locate Tech+ section markers in original-full.html');
let techSection = fullHtml.slice(startIdx, endIdx).trim();
// original file uses CRLF; normalize
techSection = techSection.replace(/\r\n/g, '\n');

// Pull out the section h2 headings to build a short in-page table of contents.
const tocMatches = [...techSection.matchAll(/<h2 id="([^"]*)">([^<]*)<\/h2>/g)];
const tocHtml = tocMatches.map(m => `<li><a href="#${m[1]}">${m[2]}</a></li>`).join('\n');

const guideDoc = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CompTIA Tech+ (FC0-U71) — Complete Study Guide</title>
<link rel="stylesheet" href="guide.css">
</head>
<body>
<p><a href="../../index.html">← Back to Tech+ StudyHub</a></p>
<h2 id="table-of-contents">On this page</h2>
<ol>
${tocHtml}
</ol>
<hr>
${techSection}
</body>
</html>
`;

fs.writeFileSync(path.join(ROOT, 'docs', 'guides', 'techplus-study-guide.html'), guideDoc);
console.log('Wrote docs/guides/techplus-study-guide.html —', tocMatches.length, 'sections,', Buffer.byteLength(guideDoc), 'bytes');

console.log('\nDone. Run `node scripts/verify.mjs` to sanity-check the build.');
