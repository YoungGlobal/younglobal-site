/* ============================================================
   MAIN.JS
   Handles three things only:
   1. Auto-set copyright year in footer
   2. Scroll reveal — adds .is-visible to .js-reveal elements
   3. Respects reduced motion at the JS level
   Wrapped in IIFE to prevent global variable leaks.
============================================================ */

(() => {
  'use strict';

  /* ============================================================
     1. COPYRIGHT YEAR
     Finds the <span id="year"> in the footer and sets it.
     Never needs to be touched again.
  ============================================================ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());


  /* ============================================================
     2. SCROLL REVEAL SETUP
     Grab all elements marked for scroll reveal.
     If none exist on the page, stop here.
  ============================================================ */
  const revealEls = document.querySelectorAll('.js-reveal');
  if (!revealEls.length) return;


  /* ============================================================
     3. REDUCED MOTION CHECK
     If the user has enabled "reduce motion" in their OS settings,
     skip all animation and make everything visible immediately.
     CSS handles the visual side — this handles the JS side.
  ============================================================ */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }


  /* ============================================================
     4. INTERSECTION OBSERVER
     Watches each .js-reveal element.
     When 15% of the element enters the viewport,
     adds .is-visible which triggers the CSS fade transition.
     Once revealed, stops watching — no re-animation on scroll back.
  ============================================================ */
  if ('IntersectionObserver' in window) {

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {

          /* Only act when element is entering view */
          if (!entry.isIntersecting) return;

          /* Trigger the CSS transition */
          entry.target.classList.add('is-visible');

          /* Stop watching this element */
          observer.unobserve(entry.target);
        });
      },
      /* Trigger when 15% of the element is visible */
      { threshold: 0.15 }
    );

    /* Attach observer to every .js-reveal element */
    revealEls.forEach((el) => observer.observe(el));

  } else {

    /* ============================================================
       FALLBACK
       Very old browsers that don't support IntersectionObserver.
       Just make everything visible immediately.
    ============================================================ */
    revealEls.forEach((el) => el.classList.add('is-visible'));

  }

})();