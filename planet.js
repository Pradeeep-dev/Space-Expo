/* ================================================================
   planet.js — Solar System Scroll Animation Engine
   Designed by Pradeep S

   HOW THE SCROLL MATH WORKS
   ──────────────────────────
   Each planet has a "window" defined by an IN_START and OUT_END scroll
   position (in pixels). Within that window we calculate two ratios:

     • fadeInRatio  → 0→1  as scroll goes from IN_START  to IN_END
     • fadeOutRatio → 0→1  as scroll goes from OUT_START to OUT_END

   Those ratios drive:
     • opacity  : simple lerp from 0→1 (in) and 1→0 (out)
     • scale    : zooms from a tiny dot → full size → oversized (leaving)
     • translateX: slides off to one side while fading out

   TO ADJUST SCROLL MATH:
   ──────────────────────
   • SECTION_HEIGHT  : px per planet section (travel + card time)
   • OVERLAP_PX      : how many px the fade-in overlaps before IN_END
   • FADE_ZONE_PX    : how many px the exit fade spans
   • EXIT_TRANSLATE_X: how far (px) the planet slides sideways on exit
   • ENTRY_SCALE_MIN : starting scale for the arriving planet (tiny dot)
   • PEAK_SCALE      : maximum scale when planet is fully centred
   • EXIT_SCALE_BOOST: scale multiplier as planet leaves (zooms past camera)
   ================================================================ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────────────────────
     ① TUNEABLE CONSTANTS  ← adjust these to taste
  ────────────────────────────────────────────────────────────── */

  // Total pixel height assigned to each planet "zone" (card + travel spacer)
  // This should roughly match the actual DOM height of one section.
  // Measured automatically below; this is the fallback.
  const FALLBACK_SECTION_HEIGHT = 1100; // px

  // How many px before a section's centre does the next planet start fading in?
  const OVERLAP_PX = 300; // px — overlap between fade-out of old and fade-in of new

  // How many px does the fade-out span?
  const FADE_ZONE_PX = 450; // px

  // How far does the departing planet translate sideways (px)?
  // Alternates left/right for visual variety.
  const EXIT_TRANSLATE_X = 380; // px

  // Entry: planet scales up from this tiny value to PEAK_SCALE
  const ENTRY_SCALE_MIN = 0.04;

  // Peak scale when planet is fully centred on screen
  const PEAK_SCALE = 1.0;

  // When the planet exits it overshoots slightly (zooms past the camera)
  const EXIT_SCALE_BOOST = 1.35;

  /* ──────────────────────────────────────────────────────────────
     ② GATHER DOM REFERENCES
  ────────────────────────────────────────────────────────────── */

  const planetImgs   = Array.from(document.querySelectorAll('.planet-img'));
  const planetSects  = Array.from(document.querySelectorAll('.planet-section'));
  const heroSection  = document.getElementById('hero');

  /* ──────────────────────────────────────────────────────────────
     ③ BUILD THE SCROLL TRIGGER TABLE
     We read real DOM offsets after the page loads so we aren't
     hard-coding pixel positions that break if the layout changes.
     The trigger table is rebuilt on resize too.
  ────────────────────────────────────────────────────────────── */

  /*
    triggers[i] = {
      inStart  : scroll Y where planet[i] begins fading in
      inEnd    : scroll Y where planet[i] is fully visible (opacity 1, scale PEAK)
      outStart : scroll Y where planet[i] starts fading out
      outEnd   : scroll Y where planet[i] is fully gone
      exitDir  : +1 = slide right, -1 = slide left
    }
  */
  let triggers = [];

  function buildTriggers() {
    triggers = [];

    // Snapshot scroll position so getBoundingClientRect is meaningful
    const currentScroll = window.scrollY || window.pageYOffset;

    planetSects.forEach(function (sect, i) {
      const rect = sect.getBoundingClientRect();

      /*
        sectTop = absolute Y of the TOP of this section relative to document.
        sectionMid = the scroll position at which the section's top reaches
                     the vertical midpoint of the viewport  (vh * 0.5).
        This is where we want the planet to be FULLY visible (opacity 1).
      */
      const sectTop    = rect.top + currentScroll;
      const sectionMid = sectTop - window.innerHeight * 0.4;

      /*
        IN window : from (sectionMid - OVERLAP_PX) to sectionMid
        OUT window: from (sectionMid + FADE_ZONE_PX * 0.15) to
                         (sectionMid + FADE_ZONE_PX * 0.15 + FADE_ZONE_PX)
      */
      const inEnd    = sectionMid;
      const inStart  = inEnd - OVERLAP_PX;
      const outStart = inEnd  + FADE_ZONE_PX * 0.2;
      const outEnd   = outStart + FADE_ZONE_PX;

      /*
        MERCURY (i===0): We do NOT want it visible on the hero.
        We delay it until the hero has scrolled fully out of view.
        Hero is 100vh, so fade Mercury in as scrollY goes from
        (vh * 0.4) → (vh * 0.85), then let the normal exit logic run.
      */
      let adjustedInStart, adjustedInEnd;
      if (i === 0) {
        adjustedInStart = window.innerHeight * 0.40; // start appearing after 40% of hero scrolled
        adjustedInEnd   = window.innerHeight * 0.85; // fully visible once hero is 85% scrolled away
      } else {
        adjustedInStart = inStart;
        adjustedInEnd   = inEnd;
      }

      /*
        exitDir: the direction the planet slides when exiting.
        planet-right lives on the right → slides further right (+1)
        planet-left  lives on the left  → slides further left  (-1)
        Default to even/odd fallback if class is missing.
      */
      /*
        FIX: use planetImgs[i] — NOT `img` (which was undefined and caused a
        ReferenceError that silently killed the entire buildTriggers() function,
        leaving triggers=[] and all planets stuck at opacity:0 forever).
      */
      const thisImg = planetImgs[i];
      let exitDir;
      if (thisImg && thisImg.classList.contains('planet-right')) {
        exitDir = +1;   // slides right (off the right edge)
      } else if (thisImg && thisImg.classList.contains('planet-left')) {
        exitDir = -1;   // slides left (off the left edge)
      } else {
        exitDir = (i % 2 === 0) ? +1 : -1; // fallback
      }

      triggers.push({
        inStart  : adjustedInStart,
        inEnd    : adjustedInEnd,
        outStart : outStart,
        outEnd   : outEnd,
        exitDir  : exitDir
      });
    });
  }

  /* ──────────────────────────────────────────────────────────────
     ④ CLAMP HELPER
     Keeps a value between [min, max].
  ────────────────────────────────────────────────────────────── */
  function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  /* ──────────────────────────────────────────────────────────────
     ⑤ LINEAR INTERPOLATION
     lerp(a, b, t) → value between a and b at fractional position t
  ────────────────────────────────────────────────────────────── */
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /* ──────────────────────────────────────────────────────────────
     ⑥ EASING FUNCTIONS
     easeInOut gives a smooth S-curve to the animation.
  ────────────────────────────────────────────────────────────── */
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function easeInCubic(t) {
    return t * t * t;
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  /* ──────────────────────────────────────────────────────────────
     ⑦ CORE SCROLL HANDLER
     This fires on every scroll event. For each of the 8 planets
     it calculates the correct opacity, scale, and translateX.
  ────────────────────────────────────────────────────────────── */
  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    planetImgs.forEach(function (img, i) {
      const t = triggers[i];
      if (!t) return;

      let opacity    = 0;
      let scale      = ENTRY_SCALE_MIN;
      let translateX = 0;

      /*
        PHASE A — FADING IN
        scrollY goes from t.inStart (ratio=0) → t.inEnd (ratio=1)
        During this phase:
          opacity   : 0 → 1
          scale     : ENTRY_SCALE_MIN → PEAK_SCALE
          translateX: 0  (planet comes straight in from centre)
      */
      if (scrollY >= t.inStart && scrollY <= t.inEnd) {
        // Prevent division by zero
        const range = t.inEnd - t.inStart || 1;
        const rawT  = (scrollY - t.inStart) / range;
        const easedT = easeOutCubic(clamp(rawT, 0, 1));

        opacity    = lerp(0, 1, easedT);
        scale      = lerp(ENTRY_SCALE_MIN, PEAK_SCALE, easedT);
        translateX = 0;
      }

      /*
        PHASE B — FULLY VISIBLE
        Between t.inEnd and t.outStart the planet sits at full opacity.
      */
      else if (scrollY > t.inEnd && scrollY <= t.outStart) {
        opacity    = 1;
        scale      = PEAK_SCALE;
        translateX = 0;
      }

      /*
        PHASE C — FADING OUT
        scrollY goes from t.outStart (ratio=0) → t.outEnd (ratio=1)
        During this phase:
          opacity   : 1 → 0
          scale     : PEAK_SCALE → EXIT_SCALE_BOOST  (zooms toward camera)
          translateX: 0 → EXIT_TRANSLATE_X × exitDir (slides to one side)
      */
      else if (scrollY > t.outStart && scrollY <= t.outEnd) {
        const range  = t.outEnd - t.outStart || 1;
        const rawT   = (scrollY - t.outStart) / range;
        const easedT = easeInCubic(clamp(rawT, 0, 1));

        opacity    = lerp(1, 0, easedT);
        scale      = lerp(PEAK_SCALE, EXIT_SCALE_BOOST, easedT);
        translateX = lerp(0, EXIT_TRANSLATE_X * t.exitDir, easedT);
      }

      /*
        PHASE D — GONE (before or after window)
        Before the planet's window: it's a tiny invisible dot.
        After the planet's window: it's gone and off to one side.
      */
      else if (scrollY < t.inStart) {
        opacity    = 0;
        scale      = ENTRY_SCALE_MIN;
        translateX = 0;
      } else {
        // scrollY > t.outEnd — fully exited
        opacity    = 0;
        scale      = EXIT_SCALE_BOOST;
        translateX = EXIT_TRANSLATE_X * t.exitDir;
      }

      /* Apply computed values to the DOM */
      img.style.opacity   = opacity.toFixed(4);
      img.style.transform = `scale(${scale.toFixed(4)}) translateX(${translateX.toFixed(1)}px)`;

      /* Toggle glow class when planet is clearly visible */
      if (opacity > 0.5) {
        img.classList.add('is-active');
      } else {
        img.classList.remove('is-active');
      }
    });
  }

  /* ──────────────────────────────────────────────────────────────
     ⑧ PARALLAX ON NEBULA BLOBS
     Subtle parallax gives the space background extra depth.
  ────────────────────────────────────────────────────────────── */
  const nebula1 = document.getElementById('nebula-1');
  const nebula2 = document.getElementById('nebula-2');
  const nebula3 = document.getElementById('nebula-3');

  function onScrollParallax() {
    const scrollY = window.scrollY || window.pageYOffset;

    // Each nebula moves at a different rate (depth simulation)
    if (nebula1) nebula1.style.transform = `translateY(${scrollY * 0.08}px)`;
    if (nebula2) nebula2.style.transform = `translateY(${-scrollY * 0.05}px)`;
    if (nebula3) nebula3.style.transform = `translateY(${scrollY * 0.03}px)`;
  }

  /* ──────────────────────────────────────────────────────────────
     ⑨ requestAnimationFrame THROTTLE
     Batches scroll events to the display refresh rate for
     buttery-smooth animation without jank.
  ────────────────────────────────────────────────────────────── */
  let rafPending = false;

  function scheduleUpdate() {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(function () {
        onScroll();
        onScrollParallax();
        rafPending = false;
      });
    }
  }

  /* ──────────────────────────────────────────────────────────────
     ⑩ RESIZE HANDLER
     Rebuilds trigger positions when the viewport size changes.
  ────────────────────────────────────────────────────────────── */
  let resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      buildTriggers();
      scheduleUpdate();
    }, 150); // debounce 150ms
  }

  /* ──────────────────────────────────────────────────────────────
     ⑪ INITIALISE
     Wait for DOM images to load so getBoundingClientRect() is accurate.
  ────────────────────────────────────────────────────────────── */
  function init() {
    // Build the trigger table from actual DOM positions
    buildTriggers();

    // Run once on load so the first planet appears correctly
    scheduleUpdate();

    // Attach scroll listener
    window.addEventListener('scroll', scheduleUpdate, { passive: true });

    // Rebuild on resize
    window.addEventListener('resize', onResize, { passive: true });

    console.log(
      '%c🚀 Solar System · Scroll Journey initialised',
      'color:#7b61ff; font-family:monospace; font-size:13px'
    );
    console.log('%c  8 planets · triggers built:', 'color:#00d4ff; font-size:11px', triggers);
  }

  /* Run after fonts + images are ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      /* Give images a beat to layout before measuring */
      requestAnimationFrame(function () {
        requestAnimationFrame(init);
      });
    });
  } else {
    requestAnimationFrame(function () {
      requestAnimationFrame(init);
    });
  }

})(); // end IIFE
