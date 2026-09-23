(() => {
  const video = document.querySelector("#hero-video");
  const pauseButton = document.querySelector("#hero-pause");
  const soundButton = document.querySelector("#hero-sound");
  const dialog = document.querySelector("#film-dialog");
  const fullFilm = document.querySelector("#full-film");
  const filmOpen = document.querySelector(".film-open");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const filmUrl = "media/clinic-lead-film.mp4";
  let userPaused = false;
  let explicitPlayback = false;
  let inView = true;
  let resumeAfterDialog = false;

  const icon = (button, name, label) => {
    button
      .querySelector("use")
      .setAttribute("href", `assets/icons/lucide.svg#${name}`);
    button.setAttribute("aria-label", label);
    button.title = label;
  };
  const playHero = () => {
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
  // Keep the embedded end titles in the full film, clear of the hero heading.
  video.addEventListener("timeupdate", () => {
    video.classList.toggle("is-loop-ending", video.currentTime >= 15.2);
    if (video.currentTime >= 15.9) video.currentTime = 0;
  });
  pauseButton.addEventListener("click", () => {
    if (video.paused) {
      userPaused = false;
      explicitPlayback = true;
      playHero();
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
      playHero();
  };
  new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
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
})();
