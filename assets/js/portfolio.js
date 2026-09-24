(() => {
  const video = document.querySelector("#story-video");
  const pauseButton = document.querySelector("#film-pause");
  const soundButton = document.querySelector("#film-sound");
  const dialog = document.querySelector("#film-dialog");
  const fullFilm = document.querySelector("#full-film");
  const filmOpen = document.querySelector(".film-open");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const filmUrl = "media/clinic-lead-film.mp4";
  let userPaused = false;
  let explicitPlayback = false;
  let inView = false;
  let resumeAfterDialog = false;

  const icon = (button, name, label) => {
    button
      .querySelector("use")
      .setAttribute("href", `assets/icons/lucide.svg#${name}`);
    button.setAttribute("aria-label", label);
    button.title = label;
  };
  const playInline = () => {
    if (!video.getAttribute("src")) video.src = filmUrl;
    return video.play().catch(() => {});
  };
  const updatePlayback = () => {
    const paused = video.paused || video.ended;
    icon(
      pauseButton,
      paused ? "play" : "pause",
      paused ? "Воспроизвести видео" : "Приостановить видео",
    );
  };
  document.querySelector(".film-controls").hidden = false;
  filmOpen.hidden = false;
  video.loop = true;
  video.muted = true;
  video.addEventListener("play", updatePlayback);
  video.addEventListener("pause", updatePlayback);
  video.addEventListener("ended", updatePlayback);
  video.addEventListener("error", updatePlayback);
  pauseButton.addEventListener("click", () => {
    if (video.paused) {
      userPaused = false;
      explicitPlayback = true;
      playInline();
    } else {
      userPaused = true;
      video.pause();
    }
  });
  soundButton.addEventListener("click", () => {
    video.muted = !video.muted;
    soundButton.setAttribute("aria-pressed", String(!video.muted));
    icon(
      soundButton,
      video.muted ? "volume-x" : "volume-2",
      video.muted ? "Включить звук" : "Выключить звук",
    );
  });
  const reconcilePlayback = () => {
    if (document.hidden || !inView || dialog.open) video.pause();
    else if (
      !userPaused &&
      (explicitPlayback || (!motion.matches && !navigator.connection?.saveData))
    )
      playInline();
  };
  new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.1;
      reconcilePlayback();
    },
    { threshold: 0.1 },
  ).observe(video);
  document.addEventListener("visibilitychange", reconcilePlayback);
  motion.addEventListener("change", () => {
    if (motion.matches) {
      explicitPlayback = false;
      video.pause();
    } else reconcilePlayback();
  });

  filmOpen.addEventListener("click", () => {
    resumeAfterDialog = !video.paused;
    video.pause();
    dialog.showModal();
    document.body.classList.add("modal-open");
    if (!fullFilm.getAttribute("src")) fullFilm.src = filmUrl;
    fullFilm.currentTime = 0;
    fullFilm.play().catch(() => {});
  });
  document
    .querySelector("#film-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom)
    )
      dialog.close();
  });
  dialog.addEventListener("close", () => {
    fullFilm.pause();
    document.body.classList.remove("modal-open");
    if (resumeAfterDialog) reconcilePlayback();
    filmOpen.focus({ preventScroll: true });
  });

  const menuButton = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector("#mobile-nav");
  document.querySelector(".site-header").dataset.enhanced = "true";
  const closeMenu = () => {
    mobileNav.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    icon(menuButton, "menu", "Открыть меню");
  };
  menuButton.hidden = false;
  menuButton.addEventListener("click", () => {
    const open = mobileNav.hidden;
    mobileNav.hidden = !open;
    menuButton.setAttribute("aria-expanded", String(open));
    icon(
      menuButton,
      open ? "x" : "menu",
      open ? "Закрыть меню" : "Открыть меню",
    );
  });
  mobileNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileNav.hidden) {
      closeMenu();
      menuButton.focus();
    }
  });
  matchMedia("(min-width:641px)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });

  const revealTargets = [...document.querySelectorAll("[data-reveal]")];
  if (!motion.matches) {
    const reveal = (element) => {
      element.classList.add("is-visible");
      revealObserver.unobserve(element);
    };
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    revealTargets.forEach((element) => {
      element.style.setProperty(
        "--reveal-delay",
        `${element.dataset.delay || 0}ms`,
      );
      element.classList.add("reveal-pending");
    });
    requestAnimationFrame(() => {
      revealTargets.forEach((element) => revealObserver.observe(element));
    });
    document.addEventListener("focusin", (event) => {
      const target = event.target.closest(".reveal-pending");
      if (target) reveal(target);
    });
    motion.addEventListener("change", () => {
      if (motion.matches) {
        revealObserver.disconnect();
        revealTargets.forEach((element) =>
          element.classList.remove("reveal-pending"),
        );
      }
    });
  }

  const process = document.querySelector("#process");
  const steps = [...process.querySelectorAll("li")];
  const contact = document.querySelector("#contact");
  let processInView = false;
  let contactInView = false;
  let stepIndex = 0;
  let stepTimer = null;
  const showStep = () => {
    steps.forEach((step, index) => {
      step.classList.toggle("is-active", index === stepIndex);
      step.classList.toggle("is-complete", index < stepIndex);
    });
  };
  const reconcileMotion = () => {
    const enabled = !motion.matches && !document.hidden && !dialog.open;
    contact.classList.toggle("is-moving", enabled && contactInView);
    if (enabled && processInView && stepIndex < steps.length - 1) {
      if (stepTimer === null) {
        stepTimer = setInterval(() => {
          stepIndex += 1;
          showStep();
          if (stepIndex === steps.length - 1) {
            clearInterval(stepTimer);
            stepTimer = null;
          }
        }, 1400);
      }
    } else {
      clearInterval(stepTimer);
      stepTimer = null;
    }
  };
  showStep();
  const motionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === process) processInView = entry.isIntersecting;
        if (entry.target === contact) contactInView = entry.isIntersecting;
      });
      reconcileMotion();
    },
    { threshold: 0.15 },
  );
  motionObserver.observe(process);
  motionObserver.observe(contact);
  document.addEventListener("visibilitychange", reconcileMotion);
  motion.addEventListener("change", reconcileMotion);
  filmOpen.addEventListener("click", reconcileMotion);
  dialog.addEventListener("close", reconcileMotion);
  reconcileMotion();
})();
