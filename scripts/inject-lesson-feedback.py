#!/usr/bin/env python3
"""
Inject the end-of-lesson "Was this helpful?" feedback widget into every lesson
page (idempotent). The widget is wired and the vote recorded by analytics.js
(the .lesson-fb-btn click route -> lesson_feedback event, localStorage-guarded to
one vote per reader); styling lives in docs/assets/tokens.css.

Scope: docs/**/lessons/*.html. Inserted just before the lesson's </main>.
Re-run after adding a lesson:

    python3 scripts/inject-lesson-feedback.py
"""
import os, glob

ROOT = os.path.join(os.path.dirname(__file__), '..', 'docs')
WIDGET = (
    '<div class="lesson-fb" aria-live="polite">\n'
    '  <span class="lesson-fb-q">Was this lesson helpful?</span>\n'
    '  <button type="button" class="lesson-fb-btn" data-rating="up" aria-label="Yes, this lesson was helpful">\U0001f44d Yes</button>\n'
    '  <button type="button" class="lesson-fb-btn" data-rating="down" aria-label="No, this lesson was not helpful">\U0001f44e No</button>\n'
    '  <span class="lesson-fb-thanks">Thanks &mdash; noted.</span>\n'
    '</div>\n'
)


def main():
    changed = 0
    for path in glob.glob(os.path.join(ROOT, '**', 'lessons', '*.html'), recursive=True):
        s = open(path, encoding='utf-8').read()
        if 'class="lesson-fb"' in s:        # idempotent
            continue
        if '</main>' not in s:
            print('  SKIP (no </main>):', os.path.relpath(path, ROOT))
            continue
        out = s.replace('</main>', WIDGET + '</main>', 1)
        open(path, 'w', encoding='utf-8').write(out)
        changed += 1
        print('  +feedback', os.path.relpath(path, ROOT))
    print('\n%d lesson(s) updated.' % changed)


if __name__ == '__main__':
    main()
