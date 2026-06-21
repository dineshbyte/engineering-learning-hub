// Reading-progress bar for lesson pages.
// Fills #reading-progress as the reader scrolls: width = scrolled / scrollable.
// rAF-throttled, passive listeners, no dependencies. Degrades to nothing if the
// element is absent (e.g. non-lesson pages that happen to load this).
(function () {
  var bar = document.getElementById('reading-progress');
  if (!bar) return;

  var ticking = false;
  function set() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    if (pct < 0) pct = 0; else if (pct > 100) pct = 100;
    bar.style.width = pct.toFixed(2) + '%';
    ticking = false;
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(set); }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  set();
})();
