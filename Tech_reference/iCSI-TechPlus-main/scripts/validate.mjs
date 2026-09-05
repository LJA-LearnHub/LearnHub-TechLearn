import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const ROOT = '/home/claude/build/TechPlus-StudyHub';
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

const errors = [];

const dom = new JSDOM(html, {
  url: 'http://localhost/',
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
  beforeParse(window) {
    window.scrollTo = () => {};
    window.onerror = (msg, src, line, col, err) => {
      errors.push(`window.onerror: ${msg} (line ${line})`);
    };
  },
  storageQuota: 10000000
});

const { window } = dom;

// Load each script manually in order since jsdom's <script src> loading of
// local files needs a real server; we fetch from disk and eval in-window.
function runScript(relPath) {
  const code = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
  window.eval(code);
}

try {
  runScript('assets/courses.js');
  runScript('assets/content.js');
  runScript('assets/flashcards.js');
  runScript('assets/voucher-plans.js');
  runScript('assets/app.js');
} catch (e) {
  console.error('FATAL during script load:', e);
  process.exit(1);
}

function assert(cond, msg) {
  if (!cond) errors.push('ASSERT FAILED: ' + msg);
}

const doc = window.document;

// ── 1. Dashboard rendered ──────────────────────────────
assert(doc.getElementById('v-home-inner').innerHTML.length > 100, 'dashboard rendered content');
assert(doc.querySelectorAll('.class-card').length === 6, 'dashboard shows 6 section cards, got ' + doc.querySelectorAll('.class-card').length);
assert(doc.getElementById('class-sidebar-head').innerHTML.includes('Tech+'), 'sidebar head shows Tech+');

// ── 2. Sidebar nav rendered with expected structure ────
const navGroups = doc.querySelectorAll('#class-nav > .nav-group');
assert(navGroups.length === 6, 'sidebar has 6 top-level nav groups, got ' + navGroups.length);
const navItems = doc.querySelectorAll('.nav-item');
assert(navItems.length === 294, 'sidebar has 294 total nav items, got ' + navItems.length);

// ── 3. Open a plain lesson (core concept) ──────────────
window.openItem('tech-01');
assert(window.document.querySelector('.view.active').id === 'v-lesson', 'opening a lesson shows v-lesson view');
assert(doc.getElementById('lesson-body-container').innerHTML.includes('lesson-title'), 'lesson title rendered');
window.markComplete('tech-01');
assert(doc.getElementById('nav-tech-01').classList.contains('completed'), 'tech-01 marked completed in nav');

// ── 4. Open a study-guide sub-lesson deep in a chapter group ──
window.openItem('tech-sg-05-01');
assert(window.document.querySelector('.view.active').id === 'v-lesson', 'opening a study guide sub-lesson shows v-lesson view');
assert(doc.getElementById('lesson-body-container').innerHTML.includes('Software Applications') || doc.getElementById('lesson-body-container').innerHTML.length > 50, 'chapter 5 sub-lesson content rendered');

// ── 5. Open a quiz, answer all questions, submit ───────
window.openItem('tech-q1');
assert(window.document.querySelector('.view.active').id === 'v-quiz', 'opening a quiz shows v-quiz view');
const quiz = window.COURSE.groups.flatMap(g=>g.units).flatMap(u=>u.items).find(i=>i.id==='tech-q1');
const numQ = quiz.questions.length;
assert(numQ > 0, 'tech-q1 has questions, got ' + numQ);
for (let i = 0; i < numQ; i++) {
  window.selectOpt(i, 0);
  if (i < numQ - 1) window.quizNav(1);
}
assert(doc.getElementById('quiz-submit-all').disabled === false, 'submit-all button enabled once every question answered');
window.submitAllQuiz();
assert(doc.getElementById('quiz-results-area').innerHTML.includes('qr-title'), 'quiz results rendered after submit');
assert(doc.querySelectorAll('.q-opt.correct, .q-opt.wrong').length > 0, 'answered options show correct/wrong styling');
window.markQuizComplete();
assert(doc.getElementById('nav-tech-q1').classList.contains('completed'), 'tech-q1 marked completed in nav');

// ── 6. Open the study-guide chapter review quiz (nested inside a unit) ──
window.openItem('tech-sg-01-31');
const loc = window.findItemLocation('tech-sg-01-31');
assert(loc && loc.group.id === 'guide', 'chapter review quiz resolves to guide group, got ' + (loc && loc.group.id));

// ── 7. Open flashcards, answer through a couple cards ──
window.openItem('tech-gimkit-flashcards');
assert(window.document.querySelector('.view.active').id === 'v-flashcards', 'opening flashcards shows v-flashcards view');
assert(doc.getElementById('flash-progress').textContent.includes('of 127'), 'flashcard deck reports 127 cards, got "' + doc.getElementById('flash-progress').textContent + '"');
assert(doc.getElementById('flash-progress').textContent.includes('Card 1'), 'flashcards start at card 1');
window.document.getElementById('flash-yes').click();
assert(doc.getElementById('flash-progress').textContent.includes('Card 2'), 'flashcard advanced to card 2 after answering');

// ── 8. Open a voucher study plan & its paired exam ─────
window.openItem('tech-voucher-study-01');
assert(window.document.querySelector('.view.active').id === 'v-lesson', 'voucher study plan opens as lesson view');
window.openItem('tech-gimkit-40');
assert(window.document.querySelector('.view.active').id === 'v-quiz', 'voucher exam opens as quiz view');
assert(doc.getElementById('quiz-body-container').innerHTML.includes('Before you start'), 'voucher exam shows voucher callout block');

// ── 9. Reference / cram sheet lesson with fixed guide links ──
window.openItem('tech-study-full-guide');
const fullGuideHtml = doc.getElementById('lesson-body-container').innerHTML;
assert(fullGuideHtml.includes('docs/guides/techplus-study-guide.html'), 'full guide lesson links to the extracted Tech+-only guide');
assert(!fullGuideHtml.includes('every track in LearnHub'), 'full guide lesson text no longer references other LearnHub tracks');

window.openItem('tech-study-posttest-review');
const posttestHtml = doc.getElementById('lesson-body-container').innerHTML;
assert(posttestHtml.includes('docs/guides/techplus-study-guide.html'), 'posttest review links to the extracted Tech+-only guide');

// ── 10. goHome / dashboard progress reflects completions ──
window.goHome();
assert(window.document.querySelector('.view.active').id === 'v-home', 'goHome returns to dashboard');
assert(doc.getElementById('v-home-inner').innerHTML.includes('%'), 'dashboard shows a progress percentage');

// ── 11. Search/filter sidebar ──────────────────────────
const searchInput = doc.getElementById('lesson-search');
searchInput.value = 'motherboard';
window.filterLessonNav();
const visibleAfterSearch = [...doc.querySelectorAll('.nav-item')].filter(n => !n.classList.contains('hidden'));
assert(visibleAfterSearch.length > 0 && visibleAfterSearch.length < 294, 'search filters nav down to a subset, got ' + visibleAfterSearch.length);
searchInput.value = '';
window.filterLessonNav();

// ── 12. Theme toggle ───────────────────────────────────
window.toggleTheme();
assert(window.document.documentElement.getAttribute('data-theme') === 'dark', 'theme toggle switches to dark');
window.toggleTheme();
assert(!window.document.documentElement.getAttribute('data-theme'), 'theme toggle switches back to light');

// ── 13. All 294 items are individually resolvable & openable ──
let openFailures = 0;
for (const item of window.allItems()) {
  try {
    window.openItem(item.id);
    const activeView = window.document.querySelector('.view.active').id;
    const expected = { lesson: 'v-lesson', 'study-plan': 'v-lesson', quiz: 'v-quiz', flashcards: 'v-flashcards' }[item.type];
    if (activeView !== expected) { openFailures++; errors.push(`item ${item.id} (${item.type}) opened wrong view: ${activeView}`); }
  } catch (e) {
    openFailures++;
    errors.push(`item ${item.id} (${item.type}) threw: ${e.message}`);
  }
}
console.log('Exercised all', window.allItems().length, 'items individually —', openFailures, 'failures');

// ── Report ──────────────────────────────────────────────
if (errors.length) {
  console.log('\n❌ VALIDATION FAILED —', errors.length, 'issue(s):');
  errors.forEach(e => console.log(' -', e));
  process.exit(1);
} else {
  console.log('\n✅ All validation checks passed.');
}
