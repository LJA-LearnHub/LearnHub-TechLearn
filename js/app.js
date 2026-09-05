/* =========================================================================
   PathLearn — app logic
   You shouldn't need to edit this file to add your own content — see
   js/data.js for that. This file just renders whatever is in COURSE_DATA
   and runs the lesson mechanics.
   ========================================================================= */

(function () {
  "use strict";

  const STORAGE_KEY = "pathlearn_progress_v1";
  const THEME_KEY = "pathlearn_theme";
  const HEARTS_START = 3;
  const XP_PER_LESSON = 10;
  const XP_PERFECT_BONUS = 5;
  const DAILY_XP_GOAL = 30;
  const GOAL_RING_CIRCUMFERENCE = 263.9; // 2 * PI * r(42), precomputed for the SVG ring
  const TIPS = [
    "Consistency beats cramming — a little each day adds up more than one long session.",
    "Got something wrong? Take a moment to reread the explanation before moving on.",
    "Saying answers out loud, even quietly, helps them stick.",
    "Revisiting a completed lesson is a great way to keep a skill sharp.",
    "Pick one time of day for practice — habits stick better with a routine.",
  ];

  /* ---------------------------------------------------------------------
     Elements
     --------------------------------------------------------------------- */
  const el = {
    courseTitle: document.getElementById("course-title"),
    streakCount: document.getElementById("streak-count"),
    xpCount: document.getElementById("xp-count"),
    unitPill: document.getElementById("unit-pill"),
    resetBtn: document.getElementById("reset-progress-btn"),
    themeToggleBtn: document.getElementById("theme-toggle-btn"),

    pathContainer: document.getElementById("path-container"),
    pathSvg: document.getElementById("path-svg"),

    goalRingFill: document.getElementById("goal-ring-fill"),
    goalXpToday: document.getElementById("goal-xp-today"),
    goalCaption: document.getElementById("goal-caption"),
    weekStrip: document.getElementById("week-strip"),
    courseProgressFill: document.getElementById("course-progress-fill"),
    courseProgressLabel: document.getElementById("course-progress-label"),
    tipText: document.getElementById("tip-text"),

    lessonOverlay: document.getElementById("lesson-overlay"),
    lessonCloseBtn: document.getElementById("lesson-close-btn"),
    lessonProgressFill: document.getElementById("lesson-progress-fill"),
    lessonHearts: document.getElementById("lesson-hearts"),
    lessonBody: document.getElementById("lesson-body"),
    lessonFooter: document.getElementById("lesson-footer"),
    lessonActionBtn: document.getElementById("lesson-action-btn"),

    feedbackRow: document.getElementById("feedback-row"),
    feedbackIcon: document.getElementById("feedback-icon"),
    feedbackTitle: document.getElementById("feedback-title"),
    feedbackExplain: document.getElementById("feedback-explain"),

    completeOverlay: document.getElementById("complete-overlay"),
    completeXp: document.getElementById("complete-xp"),
    completeAccuracy: document.getElementById("complete-accuracy"),
    completeContinueBtn: document.getElementById("complete-continue-btn"),

    heartsOverlay: document.getElementById("hearts-overlay"),
    heartsRetryBtn: document.getElementById("hearts-retry-btn"),
    heartsExitBtn: document.getElementById("hearts-exit-btn"),
  };

  /* ---------------------------------------------------------------------
     Theme (dark is default; "light" is opt-in and remembered)
     --------------------------------------------------------------------- */
  function getTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function applyThemeIcon() {
    const dark = getTheme() === "dark";
    el.themeToggleBtn.textContent = dark ? "🌙" : "☀️";
    el.themeToggleBtn.title = dark ? "Switch to light mode" : "Switch to dark mode";
  }

  function toggleTheme() {
    const next = getTheme() === "dark" ? "light" : "dark";
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    applyThemeIcon();
  }

  el.themeToggleBtn.addEventListener("click", toggleTheme);

  /* ---------------------------------------------------------------------
     Progress state (persisted to localStorage)
     --------------------------------------------------------------------- */
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return Object.assign({ completed: [], xp: 0, streak: 0, lastVisit: null, activityDates: [], todayXP: 0, todayDate: null }, parsed);
      }
    } catch (e) {
      console.warn("Could not read saved progress, starting fresh.", e);
    }
    return { completed: [], xp: 0, streak: 0, lastVisit: null, activityDates: [], todayXP: 0, todayDate: null };
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  let state = loadState();

  // Keeps state.todayXP scoped to the calendar day, resetting it when a new
  // day starts. Safe to call anytime (e.g. right before rendering the ring).
  function ensureTodayBucket() {
    const today = new Date().toDateString();
    if (state.todayDate !== today) {
      state.todayDate = today;
      state.todayXP = 0;
    }
  }

  // Called when a lesson is completed (not on every page visit) so the
  // streak and activity log reflect actual practice, not just opening the app.
  function bumpStreak() {
    const today = new Date().toDateString();

    if (!state.activityDates.includes(today)) {
      state.activityDates.push(today);
      if (state.activityDates.length > 60) state.activityDates.shift();
    }

    if (state.lastVisit === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (state.lastVisit === yesterday.toDateString()) {
      state.streak += 1;
    } else {
      state.streak = 1;
    }
    state.lastVisit = today;
  }

  // For display only: if the saved streak has lapsed (no activity today or
  // yesterday), show 0 without permanently resetting the stored value until
  // the person actually completes a new lesson.
  function computeDisplayStreak() {
    if (!state.lastVisit) return 0;
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (state.lastVisit === today || state.lastVisit === yesterday.toDateString()) {
      return state.streak;
    }
    return 0;
  }

  /* ---------------------------------------------------------------------
     Flatten course data into a single ordered lesson list, and figure
     out unlocked/current/completed status for each lesson.
     --------------------------------------------------------------------- */
  function flattenLessons() {
    const flat = [];
    COURSE_DATA.units.forEach((unit, unitIndex) => {
      unit.lessons.forEach((lesson, lessonIndex) => {
        flat.push({ unit, unitIndex, lesson, lessonIndex });
      });
    });
    return flat;
  }

  function getLessonStatus(flat) {
    // returns a map lessonId -> "completed" | "current" | "locked"
    const map = {};
    let currentAssigned = false;
    for (const item of flat) {
      const isDone = state.completed.includes(item.lesson.id);
      if (isDone) {
        map[item.lesson.id] = "completed";
      } else if (!currentAssigned) {
        map[item.lesson.id] = "current";
        currentAssigned = true;
      } else {
        map[item.lesson.id] = "locked";
      }
    }
    return map;
  }

  /* ---------------------------------------------------------------------
     Render the path
     --------------------------------------------------------------------- */
  function renderPath() {
    const flat = flattenLessons();
    const statusMap = getLessonStatus(flat);

    // clear everything except the svg element
    el.pathContainer.querySelectorAll(".unit-banner, .node-row").forEach(n => n.remove());

    let globalIndex = 0;

    COURSE_DATA.units.forEach((unit) => {
      const unitDone = unit.lessons.filter(l => state.completed.includes(l.id)).length;
      const unitPct = unit.lessons.length ? Math.round((unitDone / unit.lessons.length) * 100) : 0;
      const decoEmoji = unit.accent === "orange" ? "🧡" : "💙";

      const banner = document.createElement("div");
      banner.className = `unit-banner accent-${unit.accent === "orange" ? "orange" : "blue"}`;
      banner.dataset.unitId = unit.id;
      banner.innerHTML = `
        <div class="unit-banner-content">
          <div class="unit-banner-label">Section</div>
          <div class="unit-banner-title">${escapeHtml(unit.title)}</div>
          ${unit.description ? `<div class="unit-banner-desc">${escapeHtml(unit.description)}</div>` : ""}
          <div class="unit-banner-progress">
            <div class="unit-progress-track"><div class="unit-progress-fill" style="width:${unitPct}%"></div></div>
            <div class="unit-progress-label">${unitDone}/${unit.lessons.length}</div>
          </div>
        </div>
        <div class="unit-banner-decoration">${decoEmoji}</div>
      `;
      el.pathContainer.appendChild(banner);

      unit.lessons.forEach((lesson) => {
        const status = statusMap[lesson.id]; // completed | current | locked
        const offset = Math.round(Math.sin(globalIndex * 0.9) * 78);
        globalIndex++;

        const row = document.createElement("div");
        row.className = "node-row";
        row.style.setProperty("--offset", offset + "px");

        const isCheckpoint = !!lesson.checkpoint;
        const icon = status === "locked" ? "🔒" : (status === "completed" ? "✓" : lesson.icon || "📘");

        row.innerHTML = `
          <button class="path-node ${status} ${isCheckpoint ? "checkpoint" : ""}"
                  data-lesson-id="${lesson.id}"
                  ${status === "locked" ? "disabled" : ""}
                  aria-label="${escapeHtml(lesson.title || "Lesson")}">
            <span class="node-icon">${icon}</span>
          </button>
          ${status === "current" ? `<div class="start-bubble">START</div>` : ""}
        `;

        el.pathContainer.appendChild(row);
      });
    });

    // wire up clicks
    el.pathContainer.querySelectorAll(".path-node").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        const lessonId = btn.dataset.lessonId;
        const found = flat.find(f => f.lesson.id === lessonId);
        if (found) openLesson(found.lesson);
      });
    });

    updateHeaderStats();
    requestAnimationFrame(drawConnectors);
  }

  function escapeHtml(str) {
    const d = document.createElement("div");
    d.textContent = str == null ? "" : String(str);
    return d.innerHTML;
  }

  function updateHeaderStats() {
    el.courseTitle.textContent = COURSE_DATA.courseTitle || "PathLearn";
    el.streakCount.textContent = computeDisplayStreak();
    el.xpCount.textContent = state.xp || 0;
  }

  /* Draw the dotted connector line through node centers */
  function drawConnectors() {
    const containerRect = el.pathContainer.getBoundingClientRect();
    const nodes = [...el.pathContainer.querySelectorAll(".path-node")];
    if (nodes.length < 2) {
      el.pathSvg.innerHTML = "";
      el.pathSvg.setAttribute("height", el.pathContainer.scrollHeight);
      return;
    }

    const points = nodes.map((n) => {
      const r = n.getBoundingClientRect();
      return {
        x: r.left - containerRect.left + r.width / 2,
        y: r.top - containerRect.top + r.height / 2,
        traveled: n.classList.contains("completed") || n.classList.contains("current"),
      };
    });

    el.pathSvg.setAttribute("width", containerRect.width);
    el.pathSvg.setAttribute("height", el.pathContainer.scrollHeight);
    el.pathSvg.style.height = el.pathContainer.scrollHeight + "px";

    let svgContent = "";
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const midX = (p0.x + p1.x) / 2;
      const midY = (p0.y + p1.y) / 2;
      const cls = p0.traveled ? "seg-done" : "seg-todo";
      svgContent += `<path d="M ${p0.x} ${p0.y} Q ${p0.x} ${midY} ${midX} ${midY} T ${p1.x} ${p1.y}" class="${cls}"/>`;
    }
    el.pathSvg.innerHTML = svgContent;
  }

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawConnectors, 120);
  });
  window.addEventListener("load", () => requestAnimationFrame(drawConnectors));

  /* Sticky "current unit" pill updates on scroll */
  function setupUnitPillObserver() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const unit = COURSE_DATA.units.find(u => u.id === entry.target.dataset.unitId);
            if (unit) el.unitPill.textContent = unit.title;
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    document.querySelectorAll(".unit-banner").forEach(b => io.observe(b));
  }

  /* ---------------------------------------------------------------------
     Lesson session
     --------------------------------------------------------------------- */
  let session = null;

  function openLesson(lesson) {
    session = {
      lesson,
      index: 0,
      hearts: HEARTS_START,
      correctCount: 0,
      total: lesson.exercises.length,
      selection: null, // holds current in-progress answer state per exercise
    };
    el.lessonOverlay.hidden = false;
    document.body.style.overflow = "hidden";
    renderExercise();
  }

  function closeLesson() {
    el.lessonOverlay.hidden = true;
    document.body.style.overflow = "";
    session = null;
  }

  el.lessonCloseBtn.addEventListener("click", () => {
    if (!session) return;
    const sure = session.index === 0 || confirm("Leave this lesson? Your progress in it won't be saved.");
    if (sure) closeLesson();
  });

  function renderHearts() {
    let html = "";
    for (let i = 0; i < HEARTS_START; i++) {
      html += i < session.hearts ? "❤️" : `<span class="heart-lost">❤️</span>`;
    }
    el.lessonHearts.innerHTML = html;
  }

  function renderProgress() {
    const pct = Math.min(100, Math.round((session.index / session.total) * 100));
    el.lessonProgressFill.style.width = pct + "%";
  }

  function renderExercise() {
    const ex = session.lesson.exercises[session.index];
    session.selection = null;
    el.feedbackRow.hidden = true;
    el.lessonFooter.classList.remove("state-correct", "state-incorrect");
    renderHearts();
    renderProgress();
    setActionButton("Check", true, false);

    if (ex.type === "multiple-choice") {
      renderMultipleChoice(ex);
    } else if (ex.type === "type-answer") {
      renderTypeAnswer(ex);
    } else if (ex.type === "match-pairs") {
      renderMatchPairs(ex);
    } else {
      el.lessonBody.innerHTML = `<p>Unknown exercise type: ${escapeHtml(ex.type)}</p>`;
    }
  }

  function setActionButton(label, disabled, isError) {
    el.lessonActionBtn.textContent = label;
    el.lessonActionBtn.disabled = disabled;
    el.lessonActionBtn.classList.toggle("state-incorrect", !!isError);
  }

  /* ---- Multiple choice ---- */
  function renderMultipleChoice(ex) {
    el.lessonBody.innerHTML = `
      <div class="exercise-kicker">Select the correct answer</div>
      <div class="exercise-question">${escapeHtml(ex.question)}</div>
      <div class="options-grid" id="options-grid"></div>
    `;
    const grid = document.getElementById("options-grid");
    ex.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.type = "button";
      btn.textContent = opt;
      btn.dataset.index = i;
      btn.addEventListener("click", () => {
        grid.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        session.selection = i;
        setActionButton("Check", false, false);
      });
      grid.appendChild(btn);
    });

    el.lessonActionBtn.onclick = () => {
      if (session.selection == null) return;
      const correct = session.selection === ex.correctIndex;
      grid.querySelectorAll(".option-btn").forEach((b, i) => {
        if (i === ex.correctIndex) b.classList.add("correct-reveal");
        else if (i === session.selection && !correct) b.classList.add("incorrect-reveal");
        b.disabled = true;
      });
      handleAnswerResult(correct, ex.explanation);
    };
  }

  /* ---- Type answer ---- */
  function renderTypeAnswer(ex) {
    el.lessonBody.innerHTML = `
      <div class="exercise-kicker">Type your answer</div>
      <div class="exercise-question">${escapeHtml(ex.question)}</div>
      <input type="text" class="type-answer-input" id="type-input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type here..." aria-label="Your answer">
      ${ex.hint ? `<div class="type-answer-hint">Hint: ${escapeHtml(ex.hint)}</div>` : ""}
    `;
    const input = document.getElementById("type-input");
    input.disabled = false;
    input.readOnly = false;

    const updateAnswerState = () => {
      session.selection = input.value;
      setActionButton("Check", input.value.trim().length === 0, false);
    };
    input.addEventListener("input", updateAnswerState);
    input.addEventListener("change", updateAnswerState);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !el.lessonActionBtn.disabled) el.lessonActionBtn.click();
    });
    requestAnimationFrame(() => input.focus());

    el.lessonActionBtn.onclick = () => {
      const raw = input.value.trim().toLowerCase();
      const accepted = ex.accepted.map(a => a.trim().toLowerCase());
      const correct = accepted.includes(raw);
      input.classList.add(correct ? "correct-reveal" : "incorrect-reveal");
      input.disabled = true;
      const explanation = correct ? ex.explanation : (ex.explanation || `Correct answer: ${ex.accepted[0]}`);
      handleAnswerResult(correct, explanation, correct ? null : `Correct answer: ${ex.accepted[0]}`);
    };
  }

  /* ---- Match pairs ---- */
  function renderMatchPairs(ex) {
    const leftItems = ex.pairs.map((p, i) => ({ text: p.left, pairIndex: i }));
    const rightItems = shuffle(ex.pairs.map((p, i) => ({ text: p.right, pairIndex: i })));

    el.lessonBody.innerHTML = `
      <div class="exercise-kicker">${escapeHtml(ex.instruction || "Match the pairs")}</div>
      <div class="match-columns">
        <div class="match-col" id="match-left"></div>
        <div class="match-col" id="match-right"></div>
      </div>
    `;
    const leftCol = document.getElementById("match-left");
    const rightCol = document.getElementById("match-right");

    let pickedLeft = null;
    let pickedRight = null;
    let matchedCount = 0;
    let mistakeMade = false;
    setActionButton("Check", true, false); // disabled; auto-advances on completion

    function makeBtn(item, side) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "match-btn";
      btn.textContent = item.text;
      btn.dataset.pairIndex = item.pairIndex;
      btn.addEventListener("click", () => {
        if (btn.classList.contains("matched")) return;
        if (side === "left") {
          if (pickedLeft) pickedLeft.classList.remove("selected");
          pickedLeft = btn;
        } else {
          if (pickedRight) pickedRight.classList.remove("selected");
          pickedRight = btn;
        }
        btn.classList.add("selected");

        if (pickedLeft && pickedRight) {
          const isMatch = pickedLeft.dataset.pairIndex === pickedRight.dataset.pairIndex;
          if (isMatch) {
            pickedLeft.classList.remove("selected");
            pickedRight.classList.remove("selected");
            pickedLeft.classList.add("matched");
            pickedRight.classList.add("matched");
            matchedCount++;
            pickedLeft = null;
            pickedRight = null;
            if (matchedCount === ex.pairs.length) {
              setTimeout(() => handleAnswerResult(!mistakeMade, ex.explanation), 350);
            }
          } else {
            mistakeMade = true;
            const wrongL = pickedLeft, wrongR = pickedRight;
            wrongL.classList.add("wrong-flash");
            wrongR.classList.add("wrong-flash");
            setTimeout(() => {
              wrongL.classList.remove("selected", "wrong-flash");
              wrongR.classList.remove("selected", "wrong-flash");
            }, 400);
            pickedLeft = null;
            pickedRight = null;
          }
        }
      });
      return btn;
    }

    leftItems.forEach(item => leftCol.appendChild(makeBtn(item, "left")));
    rightItems.forEach(item => rightCol.appendChild(makeBtn(item, "right")));

    el.lessonActionBtn.onclick = null;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* ---- Shared answer handling ---- */
  function handleAnswerResult(correct, explanation, overrideExplain) {
    if (correct) session.correctCount++;
    else session.hearts--;

    showFeedback(correct, explanation, overrideExplain);
  }

  function showFeedback(correct, explanation, overrideExplain) {
    el.feedbackRow.hidden = false;
    el.lessonFooter.classList.remove("state-correct", "state-incorrect");
    el.lessonFooter.classList.add(correct ? "state-correct" : "state-incorrect");
    el.feedbackIcon.textContent = correct ? "✓" : "✕";
    el.feedbackTitle.textContent = correct ? pick(["Nice!", "Great job!", "Correct!", "Well done!"]) : "Not quite";
    el.feedbackExplain.textContent = overrideExplain || explanation || "";

    setActionButton("Continue", false, !correct);
    el.lessonActionBtn.onclick = () => {
      el.feedbackRow.hidden = true;
      el.lessonFooter.classList.remove("state-correct", "state-incorrect");
      advanceLesson();
    };
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function advanceLesson() {
    if (session.hearts <= 0) {
      el.heartsOverlay.hidden = false;
      return;
    }
    session.index++;
    if (session.index >= session.total) {
      finishLesson();
    } else {
      renderExercise();
    }
  }

  function finishLesson() {
    const accuracy = Math.round((session.correctCount / session.total) * 100);
    const perfect = session.correctCount === session.total;
    const xpEarned = XP_PER_LESSON + (perfect ? XP_PERFECT_BONUS : 0);

    if (!state.completed.includes(session.lesson.id)) {
      state.completed.push(session.lesson.id);
    }
    state.xp += xpEarned;
    ensureTodayBucket();
    state.todayXP += xpEarned;
    bumpStreak();
    saveState();

    el.completeXp.textContent = "+" + xpEarned;
    el.completeAccuracy.textContent = accuracy + "%";
    el.completeOverlay.hidden = false;
  }

  el.completeContinueBtn.addEventListener("click", () => {
    el.completeOverlay.hidden = true;
    closeLesson();
    renderPath();
    renderSideRail();
  });

  /* ---- Out of hearts ---- */
  el.heartsRetryBtn.addEventListener("click", () => {
    el.heartsOverlay.hidden = true;
    session.index = 0;
    session.hearts = HEARTS_START;
    session.correctCount = 0;
    renderExercise();
  });

  el.heartsExitBtn.addEventListener("click", () => {
    el.heartsOverlay.hidden = true;
    closeLesson();
  });

  /* ---------------------------------------------------------------------
     Side rail: daily goal ring, week strip, course progress, tip
     --------------------------------------------------------------------- */
  function renderGoalRing() {
    ensureTodayBucket();
    const pct = Math.min(100, Math.round((state.todayXP / DAILY_XP_GOAL) * 100));
    el.goalRingFill.style.strokeDashoffset = GOAL_RING_CIRCUMFERENCE * (1 - pct / 100);
    el.goalXpToday.textContent = state.todayXP;
    el.goalCaption.textContent = state.todayXP >= DAILY_XP_GOAL
      ? "Daily goal complete! 🎉"
      : `${DAILY_XP_GOAL - state.todayXP} XP to go today`;
  }

  function renderWeekStrip() {
    const today = new Date();
    const todayKey = today.toDateString();
    let html = "";
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toDateString();
      const active = state.activityDates.includes(key);
      const isToday = key === todayKey;
      const label = d.toLocaleDateString(undefined, { weekday: "narrow" });
      html += `
        <div class="week-day ${active ? "active" : ""} ${isToday ? "today" : ""}">
          <div class="week-dot">${active ? "🔥" : ""}</div>
          <div class="week-label">${escapeHtml(label)}</div>
        </div>`;
    }
    el.weekStrip.innerHTML = html;
  }

  function renderCourseProgress() {
    const flat = flattenLessons();
    const total = flat.length;
    const done = flat.filter(f => state.completed.includes(f.lesson.id)).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    el.courseProgressFill.style.width = pct + "%";
    el.courseProgressLabel.textContent = `${done} / ${total} lessons`;
  }

  function renderTip() {
    const dayIndex = Math.floor(Date.now() / 86400000);
    el.tipText.textContent = TIPS[dayIndex % TIPS.length];
  }

  function renderSideRail() {
    renderGoalRing();
    renderWeekStrip();
    renderCourseProgress();
    renderTip();
  }

  /* ---------------------------------------------------------------------
     Reset progress
     --------------------------------------------------------------------- */
  el.resetBtn.addEventListener("click", () => {
    if (!confirm("Reset all progress, XP, and streak? This can't be undone.")) return;
    localStorage.removeItem(STORAGE_KEY);
    state = loadState();
    renderPath();
    renderSideRail();
  });

  /* ---------------------------------------------------------------------
     Init
     --------------------------------------------------------------------- */
  function init() {
    applyThemeIcon();
    renderPath();
    renderSideRail();
    setupUnitPillObserver();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
