# source/

This folder is where you drop refreshed multi-course LearnHub exports if the
upstream Tech+ curriculum ever changes, so `scripts/build-techplus.mjs` can
regenerate this project's `assets/courses.js`, `assets/content.js`, and
`docs/guides/techplus-study-guide.html` without any hand-editing.

Place these three files here (same names the multi-course LearnHub export
already uses):

- `original-courses.js`  (`window.COURSES = [...]`, all courses)
- `original-content.js`  (`window.LEARN_HUB_CONTENT = {...}`, all lesson bodies)
- `original-full.html`   (the combined multi-subject study guide document)

Then run:

```
node scripts/build-techplus.mjs
```

This folder is intentionally empty in the shipped project (those files are
large and specific to your upstream LearnHub source tree, not to this
Tech+-only app).
