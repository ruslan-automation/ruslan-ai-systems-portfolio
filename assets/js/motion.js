const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

/* ----------------------------------------------------------------
   Reveal on scroll
---------------------------------------------------------------- */
const reveals = document.querySelectorAll(".reveal");

if (reduceMotion) {
  reveals.forEach((el) => el.classList.add("is-in"));
} else {
  reveals.forEach((el) => {
    if (el.hasAttribute("data-reveal-eager")) {
      requestAnimationFrame(() => el.classList.add("is-in"));
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -33% 0px" },
  );

  reveals.forEach((el) => {
    if (!el.hasAttribute("data-reveal-eager")) observer.observe(el);
  });

  /* Fallback: anything already in viewport at load — fire immediately.
     Helps cases where IntersectionObserver hasn't ticked yet (printing,
     fullPage screenshots, very fast first paint). */
  const eagerCheck = () => {
    const vh = window.innerHeight;
    reveals.forEach((el) => {
      if (el.classList.contains("is-in")) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) {
        el.classList.add("is-in");
      }
    });
  };
  requestAnimationFrame(() => requestAnimationFrame(eagerCheck));
}

/* ----------------------------------------------------------------
   Sticky nav state
---------------------------------------------------------------- */
const nav = document.querySelector(".site-nav");
const heroMotionItems = document.querySelectorAll(".hero-mask");
const footerRevealStage = document.querySelector("[data-footer-reveal]");
const footerRevealTarget = footerRevealStage?.querySelector(".site-footer");
let lastScrollY = window.scrollY;
let scrollFrame = 0;

const updateHeroScroll = (scrollY) => {
  if (reduceMotion || !heroMotionItems.length) return;
  const shift = Math.min(240, scrollY * 0.34);
  heroMotionItems.forEach((el) => {
    const depth = Number.parseFloat(el.style.getPropertyValue("--depth")) || 0.5;
    el.style.setProperty("--hero-shift-x", `${(shift * depth).toFixed(2)}px`);
  });
};

const updateFooterReveal = (scrollY) => {
  if (!footerRevealTarget) return;
  if (reduceMotion) {
    footerRevealTarget.style.setProperty("--footer-reveal-y", "0px");
    return;
  }

  const viewportH = Math.max(1, window.innerHeight);
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewportH);
  const distanceFromBottom = Math.max(0, maxScroll - scrollY);
  const maxShift = Math.min(300, Math.max(160, viewportH * 0.4));
  const revealRatio = Math.min(1, distanceFromBottom / viewportH);
  const y = -maxShift * revealRatio;

  footerRevealTarget.style.setProperty("--footer-reveal-y", `${y.toFixed(2)}px`);
};

const onScroll = () => {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    const currentY = window.scrollY;
    const delta = currentY - lastScrollY;

    if (nav) {
      nav.classList.toggle("is-scrolled", currentY > 8);
      if (currentY <= 24) {
        nav.classList.remove("is-nav-tucked");
      }
      if (Math.abs(delta) > 3) {
        nav.classList.toggle("is-nav-tucked", delta > 0 && currentY > 48);
      }
    }

    updateHeroScroll(currentY);
    updateFooterReveal(currentY);
    lastScrollY = currentY;
    scrollFrame = 0;
  });
};
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();

/* ----------------------------------------------------------------
   Smooth scroll (Lenis) — optional
---------------------------------------------------------------- */
const lenisDisabled = new URLSearchParams(location.search).has("nolenis");
let lenisController = null;

if (!reduceMotion && !lenisDisabled) {
  try {
    const { default: Lenis } = await import("https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.mjs");
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });
    lenisController = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -56, duration: 1.1 });
      });
    });
  } catch (err) {
    /* Lenis is enhancement only — fall back to native smooth scroll. */
  }
}

window.addEventListener("portfolio:modal-open", () => {
  lenisController?.stop();
});

window.addEventListener("portfolio:modal-close", () => {
  lenisController?.start();
});

/* ----------------------------------------------------------------
   Magnetic CTA
---------------------------------------------------------------- */
if (!reduceMotion && finePointer) {
  document.querySelectorAll(".magnetic").forEach((el) => {
    let frame = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.18;
      const y = (e.clientY - r.top - r.height / 2) * 0.18;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.transform = "";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
  });
}

/* ----------------------------------------------------------------
   Works rail: slow marquee + drag
---------------------------------------------------------------- */
const rail = document.querySelector(".rail");

if (rail) {
  const originals = Array.from(rail.children);
  originals.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.classList.remove("reveal");
    clone.classList.add("is-in");
    clone.setAttribute("aria-hidden", "true");
    clone.querySelectorAll("a, button, input, textarea, select, [tabindex]").forEach((el) => {
      el.tabIndex = -1;
    });
    rail.appendChild(clone);
  });

  let frame = 0;
  let lastTime = performance.now();
  let isPointerDown = false;
  let isDragging = false;
  let isHovering = false;
  let suppressClick = false;
  let startX = 0;
  let startScrollLeft = 0;

  const loopWidth = () => Math.max(1, rail.scrollWidth / 2);

  const normalizeScroll = () => {
    const width = loopWidth();
    if (rail.scrollLeft >= width) rail.scrollLeft -= width;
    if (rail.scrollLeft < 0) rail.scrollLeft += width;
  };

  const tick = (time) => {
    const delta = Math.min(64, time - lastTime);
    lastTime = time;
    if (!reduceMotion && !isPointerDown && !isDragging && !isHovering) {
      rail.scrollLeft += delta * 0.045;
      normalizeScroll();
    }
    frame = requestAnimationFrame(tick);
  };

  const stopDrag = (e) => {
    isPointerDown = false;
    if (!isDragging) return;
    isDragging = false;
    rail.classList.remove("is-dragging");
    if (e?.pointerId != null && rail.hasPointerCapture(e.pointerId)) {
      rail.releasePointerCapture(e.pointerId);
    }
  };

  rail.addEventListener("mouseenter", () => {
    isHovering = true;
  });

  rail.addEventListener("mouseleave", () => {
    isHovering = false;
  });

  rail.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    isPointerDown = true;
    isDragging = false;
    suppressClick = false;
    startX = e.clientX;
    startScrollLeft = rail.scrollLeft;
  });

  rail.addEventListener("pointermove", (e) => {
    const distance = e.clientX - startX;
    if (!isPointerDown) return;
    if (!isDragging && Math.abs(distance) <= 8) return;
    if (!isDragging) {
      isDragging = true;
      rail.classList.add("is-dragging");
      rail.setPointerCapture(e.pointerId);
    }
    suppressClick = true;
    rail.scrollLeft = startScrollLeft - distance;
    normalizeScroll();
    e.preventDefault();
  });

  rail.addEventListener("pointerup", stopDrag);
  rail.addEventListener("pointercancel", stopDrag);

  rail.addEventListener(
    "click",
    (e) => {
      if (!suppressClick) return;
      e.preventDefault();
      e.stopPropagation();
      suppressClick = false;
    },
    true,
  );

  rail.addEventListener("focusin", () => {
    isHovering = true;
  });

  rail.addEventListener("focusout", () => {
    isHovering = false;
  });

  frame = requestAnimationFrame(tick);
  window.addEventListener("beforeunload", () => cancelAnimationFrame(frame));
}
