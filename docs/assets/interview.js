/* ==========================================================================
   interview.js — auto-enhances any <div data-interview> into a tabbed panel.
   Pairs with interview.css. Progressive enhancement:
     - reads child elements carrying data-level ("core" | "senior" | "staff"
       | "design"), preserving document order;
     - builds a tab per level that actually has content, in canonical order;
     - "design" renders to the right as a separate axis (not a harder level).
   With JS off, the authored flat list is shown as-is (see interview.css).
   To add a question: drop another <details class="iq" data-level="…"> into
   the block — no markup or script changes needed.
   ========================================================================== */
(function () {
    var LABELS = {core: 'Core', senior: 'Senior', staff: 'Staff', design: 'System Design'};
    var ORDER = ['core', 'senior', 'staff', 'design'];

    function enhance(root) {
        var items = Array.prototype.slice.call(root.querySelectorAll(':scope > [data-level]'));
        if (!items.length) return;

        var byLevel = {};
        items.forEach(function (el) {
            var lv = el.getAttribute('data-level');
            (byLevel[lv] = byLevel[lv] || []).push(el);
        });
        var levels = ORDER.filter(function (l) {
            return byLevel[l];
        });
        if (levels.length < 2) return; // one level (or none) — leave the flat list alone

        var panel = document.createElement('div');
        panel.className = 'iqpanel';
        var tabs = document.createElement('div');
        tabs.className = 'iqtabs';
        tabs.setAttribute('role', 'tablist');
        tabs.setAttribute('aria-label', 'Interview level');
        panel.appendChild(tabs);

        var groups = {};
        levels.forEach(function (lv) {
            var g = document.createElement('div');
            g.className = 'iqgroup';
            g.setAttribute('data-group', lv);
            byLevel[lv].forEach(function (el) {
                g.appendChild(el);
            }); // moves the node
            groups[lv] = g;
            panel.appendChild(g);
        });

        function select(lv) {
            Array.prototype.forEach.call(tabs.children, function (b) {
                var on = b.getAttribute('data-tab') === lv;
                b.classList.toggle('is-active', on);
                b.setAttribute('aria-selected', on ? 'true' : 'false');
            });
            levels.forEach(function (l) {
                groups[l].hidden = (l !== lv);
            });
        }

        levels.forEach(function (lv) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'iqtab' + (lv === 'design' ? ' design' : '');
            b.setAttribute('data-tab', lv);
            b.setAttribute('role', 'tab');
            b.textContent = LABELS[lv] || lv;
            b.addEventListener('click', function () {
                select(lv);
            });
            tabs.appendChild(b);
        });

        root.appendChild(panel);
        root.classList.add('is-enhanced');
        select(levels[0]);
    }

    function init() {
        document.querySelectorAll('[data-interview]').forEach(enhance);
    }

    if (document.readyState !== 'loading') init();
    else document.addEventListener('DOMContentLoaded', init);
})();
