/* ==========================================================================
   analytics.js — single shared GA4 (gtag.js) module for StackDepth.

   One file, linked once per page (see scripts/inject-analytics.js). No build
   step, no SPA: every page is a fresh document load, so page_view fires once.

   Strategy: ONE delegated `document` click listener + a `toggle` listener +
   a debounced `#q` input drive ALL custom events, so this works across every
   template family (lessons, interview, reference, glossary, resources, roadmap,
   hub) WITHOUT modifying interview.js or any per-page inline script.

   - Enhanced Measurement is ON in the GA4 console (page_view, scrolls, outbound
     clicks, engagement). We set send_page_view:false and emit ONE enriched
     page_view to avoid double counting, and we do NOT add a generic outbound
     event (EM covers it) — only the semantic social_click / github_click.
   - Consent Mode v2 defaults to denied (cookieless pings still aggregate); a
     stored grant (localStorage 'sd:consent') is re-applied on load. A banner is
     available behind SHOW_BANNER but is OFF by default.
   - Production-only: nothing is sent off dineshbyte.github.io unless ?debug_mode=1.
   ========================================================================== */
(function () {
  'use strict';

  var MEASUREMENT_ID = 'G-5VXHVXESPR';
  var PROD_HOST = 'dineshbyte.github.io';
  var SHOW_BANNER = false; // flip to true to show a consent banner (see §7)

  /* --- 0. environment guard: never pollute prod data with dev traffic ------ */
  var debugMode = /[?&]debug_mode=1\b/.test(location.search);
  var isProd = (location.hostname === PROD_HOST);
  if (!isProd && !debugMode) {
    window.gtag = window.gtag || function () {}; // no-op so nothing throws
    return;
  }

  /* --- 1. gtag bootstrap + Consent Mode v2 defaults (before config) -------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });
  try {
    if (localStorage.getItem('sd:consent') === 'granted') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  } catch (e) { /* storage blocked — stay denied */ }

  // load the gtag.js library
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
  document.head.appendChild(s);

  gtag('js', new Date());

  /* --- 2. page context from the URL --------------------------------------- */
  var SLUGS = ['ai-agents', 'context-engineering', 'rest-api', 'bloom-filters',
    'distributed-systems', 'storage-engines', 'transactions-isolation',
    'streaming-event-driven', 'applied-systems-design'];

  function pageContext() {
    var p = location.pathname;
    var ctx = { page_type: 'hub', track: null, lesson_number: null };
    for (var i = 0; i < SLUGS.length; i++) {
      if (p.indexOf('/' + SLUGS[i] + '/') >= 0) { ctx.track = SLUGS[i]; break; }
    }
    if (/\/GLOSSARY\.html$/i.test(p)) ctx.page_type = 'glossary';
    else if (/\/RESOURCES\.html$/i.test(p)) ctx.page_type = 'resources';
    else if (/\/README\.html$/i.test(p)) ctx.page_type = 'roadmap';
    else if (/\/reference\//.test(p)) ctx.page_type = 'reference';
    else if (/\/interview\//.test(p)) ctx.page_type = 'interview';
    else if (/\/lessons\//.test(p)) ctx.page_type = 'lesson';
    else if (ctx.track) ctx.page_type = 'lesson'; // depth-2 fundamentals/deep-dive pages
    else ctx.page_type = 'hub';
    var m = p.match(/\/(\d{3,4})-/);
    if (m) ctx.lesson_number = parseInt(m[1], 10);
    return ctx;
  }
  var CTX = pageContext();

  /* --- 3. config + ONE enriched page_view (no double count vs EM) ---------- */
  gtag('config', MEASUREMENT_ID, {
    debug_mode: debugMode,
    send_page_view: false,
    page_type: CTX.page_type,
    track: CTX.track,
    lesson_number: CTX.lesson_number
  });
  gtag('event', 'page_view', {
    page_type: CTX.page_type,
    track: CTX.track,
    lesson_number: CTX.lesson_number
  });

  /* --- 4. helpers ---------------------------------------------------------- */
  function ev(name, params) {
    var base = { page_type: CTX.page_type, track: CTX.track };
    if (params) { for (var k in params) { if (params.hasOwnProperty(k)) base[k] = params[k]; } }
    gtag('event', name, base);
  }
  function txt(el) { return ((el && el.textContent) || '').replace(/\s+/g, ' ').trim().slice(0, 120); }

  /* --- 5. one delegated click router (first match wins) -------------------- */
  // The generic outbound rule is intentionally absent — Enhanced Measurement
  // already records "Outbound clicks". social_click / github_click are kept
  // because they're more useful (semantic) than the generic EM event.
  var ROUTES = [
    ['a.ritem', function (el) {
      ev('search_result_select', { link_text: txt(el.querySelector('.rt') || el), result_kind: txt(el.querySelector('.rkind')) });
    }],
    ['.nr-sugg button', function (el) { ev('search_suggestion_select', { suggestion: txt(el) }); }],
    ['.fchip[data-cat]', function (el) { ev('filter_select', { filter_category: el.getAttribute('data-cat') }); }],
    ['a.start[data-track]', function (el) {
      var tile = el.closest('.tile');
      var cont = !!(tile && tile.classList.contains('is-started'));
      ev(cont ? 'track_continue' : 'track_start', { track: el.getAttribute('data-track') });
    }],
    ['article.tile a:not(.start)', function (el) {
      ev('lesson_card_link', { link_url: el.getAttribute('href'), link_text: txt(el) });
    }],
    ['button.themebtn', function () {
      // inline onclick="toggleTheme()" has already flipped data-theme by now
      ev('theme_toggle', { theme: document.documentElement.getAttribute('data-theme') });
    }],
    ['a.ghbtn', function (el) { ev('github_click', { link_url: el.href }); }],
    ['a.soclink', function (el) { ev('social_click', { link_url: el.href, network: el.getAttribute('aria-label') || txt(el) }); }],
    ['#hubbar .pn a, .nav a', function (el) {
      var label = txt(el).toLowerCase();
      var dir = /prev|‹|←|⟵/.test(label) ? 'prev' : (/next|›|→|⟶/.test(label) ? 'next' : 'other');
      ev('lesson_nav_' + dir, { link_url: el.getAttribute('href') });
    }],
    ['#hubbar > a', function (el) { ev('back_to_hub', { link_url: el.getAttribute('href') }); }],
    ['.iqtab[data-tab]', function (el) { ev('interview_tab_select', { level: el.getAttribute('data-tab') }); }],
    ['.ltags .lt', function (el) { ev('tag_chip_click', { tag: txt(el) }); }],
    ['sup a[href^="#"]', function (el) { ev('footnote_click', { anchor: el.getAttribute('href') }); }],
    ['.qitem .opt', function (el) {
      var item = el.closest('.qitem');
      setTimeout(function () {
        var opts = Array.prototype.slice.call(item.querySelectorAll('.opt'));
        var idx = opts.indexOf(el);
        var want = parseInt(item.getAttribute('data-correct'), 10);
        var isCorrect = !isNaN(want) ? (idx === want) : el.classList.contains('correct');
        ev('quiz_answer', { lesson_number: CTX.lesson_number, is_correct: isCorrect, question_index: idx });
      }, 0);
    }]
  ];

  document.addEventListener('click', function (e) {
    if (!e.target || !e.target.closest) return;
    for (var i = 0; i < ROUTES.length; i++) {
      var el = e.target.closest(ROUTES[i][0]);
      if (el) { try { ROUTES[i][1](el); } catch (err) {} break; }
    }
  });

  /* --- 6. disclosure_open via the (non-bubbling) 'toggle' event ------------ */
  document.addEventListener('toggle', function (e) {
    var d = e.target;
    if (!d || d.nodeName !== 'DETAILS' || !d.open) return;
    if (d.matches('details.iq[data-level]')) {
      ev('disclosure_open', { disclosure_type: 'interview_question', level: d.getAttribute('data-level') });
    } else if (d.matches('details.mc')) {
      ev('disclosure_open', { disclosure_type: 'memory_check' });
    }
  }, true); // capture: 'toggle' does not bubble

  /* --- 7. debounced hub search (#q) — EM site-search can't see client search */
  var q = document.getElementById('q');
  if (q) {
    var timer;
    q.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var term = q.value.trim();
        if (term.length >= 2) ev('search', { search_term: term });
      }, 600);
    });
  }

  /* --- 8. optional consent banner (off by default) ------------------------ */
  if (SHOW_BANNER) {
    try {
      if (!localStorage.getItem('sd:consent')) {
        var mount = function () {
          var b = document.createElement('div');
          b.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:9999;padding:.8rem 1rem;' +
            'background:var(--card,#1c1a15);color:var(--ink,#e9e3d6);border-top:1px solid var(--line,#332f27);' +
            'font:14px ui-sans-serif,system-ui,sans-serif;display:flex;gap:.6rem;align-items:center;' +
            'flex-wrap:wrap;justify-content:center';
          b.innerHTML = 'StackDepth uses privacy-respecting analytics. ' +
            '<a href="/engineering-learning-hub/privacy.html" style="color:inherit;text-decoration:underline">Details</a> ' +
            '<button type="button" id="sdc-yes" style="cursor:pointer">Allow</button> ' +
            '<button type="button" id="sdc-no" style="cursor:pointer">No thanks</button>';
          var decide = function (v) {
            try { localStorage.setItem('sd:consent', v); } catch (e) {}
            if (v === 'granted') gtag('consent', 'update', { analytics_storage: 'granted' });
            b.parentNode && b.parentNode.removeChild(b);
          };
          document.body.appendChild(b);
          b.querySelector('#sdc-yes').onclick = function () { decide('granted'); };
          b.querySelector('#sdc-no').onclick = function () { decide('denied'); };
        };
        if (document.readyState !== 'loading') mount();
        else document.addEventListener('DOMContentLoaded', mount);
      }
    } catch (e) { /* storage blocked */ }
  }

  /* --- 9. lesson read / completion (lesson pages only) --------------------
     page_view = "opened". These approximate "actually read":
       lesson_read     → scrolled past 75%, OR engaged ~30s (covers short pages)
       lesson_complete → scrolled to ~90% (after real scrolling), OR clicked Next
     Each fires at most once per page load. */
  if (CTX.page_type === 'lesson') {
    var readSent = false, doneSent = false, scrolled = false;

    function scrollPct() {
      var h = document.documentElement;
      var docH = Math.max(h.scrollHeight, (document.body && document.body.scrollHeight) || 0);
      var seen = (window.scrollY || h.scrollTop || 0) + window.innerHeight;
      return docH > 0 ? seen / docH : 1;
    }
    function markRead(trigger) {
      if (readSent) return; readSent = true;
      ev('lesson_read', { lesson_number: CTX.lesson_number, trigger: trigger });
    }
    function markComplete(trigger) {
      if (doneSent) return; doneSent = true;
      markRead('via_complete');               // completion implies a read
      ev('lesson_complete', { lesson_number: CTX.lesson_number, trigger: trigger });
    }

    window.addEventListener('scroll', function () {
      scrolled = true;
      var p = scrollPct();
      if (p >= 0.75) markRead('scroll');
      if (p >= 0.90 && scrolled) markComplete('scroll');
    }, { passive: true });

    // time-based read fallback (long dwell, or pages too short to scroll)
    setTimeout(function () { markRead('time'); }, 30000);

    // clicking the Next pager completes the lesson
    document.addEventListener('click', function (e) {
      if (!e.target || !e.target.closest) return;
      var n = e.target.closest('#hubbar .pn a, .nav a');
      if (n && /next|›|→|⟶/.test(((n.textContent) || '').toLowerCase())) markComplete('next_click');
    });
  }
})();
