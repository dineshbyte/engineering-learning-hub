#!/usr/bin/env python3
"""
Inject the closing "These notes reflect my current understanding…" meta-note as the
last element of every lesson (idempotent). Styling lives in docs/assets/lesson.css
(.lesson-endnote). Inserted just before the lesson's </main>.

Scope: docs/**/lessons/*.html. Re-run after adding a lesson:

    python3 scripts/inject-lesson-endnote.py
"""
import os, glob

ROOT = os.path.join(os.path.dirname(__file__), '..', 'docs')
NOTE = ('<p class="lesson-endnote">These notes reflect my current understanding and are '
        'updated as I learn, build, and discover better explanations.</p>\n')


def main():
    changed = 0
    # every teaching page: /lessons/ files PLUS the single-page tracks' fundamentals
    # and deep-dive pages (Distributed Systems, Storage Engines, Transactions, etc.)
    targets = set()
    for pat in ('**/lessons/*.html', '**/*-fundamentals.html', '**/*-deep-dive.html'):
        targets.update(glob.glob(os.path.join(ROOT, pat), recursive=True))
    for path in sorted(targets):
        s = open(path, encoding='utf-8').read()
        if 'class="lesson-endnote"' in s:        # idempotent
            continue
        if '</main>' not in s:
            print('  SKIP (no </main>):', os.path.relpath(path, ROOT))
            continue
        out = s.replace('</main>', NOTE + '</main>', 1)
        open(path, 'w', encoding='utf-8').write(out)
        changed += 1
        print('  +endnote', os.path.relpath(path, ROOT))
    print('\n%d lesson(s) updated.' % changed)


if __name__ == '__main__':
    main()
