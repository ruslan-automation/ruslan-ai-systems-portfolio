(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = matchMedia('(max-width: 640px)');
  const connection = navigator.connection;
  const icon = (button, name, label) => {
    button.querySelector('use').setAttribute('href', `assets/icons/lucide.svg#${name}`);
    button.setAttribute('aria-label', label);
    button.title = label;
  };

  document.querySelectorAll('[data-knowledge-film], [data-knowledge-preview], [data-project-film], [data-project-preview]').forEach(frame => {
    const preview = frame.matches('[data-knowledge-preview], [data-project-preview]');
    const video = frame.querySelector('video');
    const play = frame.querySelector(preview ? '.knowledge-preview-toggle' : '.knowledge-film-play');
    const sound = frame.querySelector('.knowledge-film-sound');
    const fallback = preview ? null : frame.parentElement.querySelector('.knowledge-film-error');
    let inView = false, userPaused = false, systemPause = false;
    let blocked = false, failed = false, pending = false, explicitPlayback = false;

    const selectFormat = () => {
      if (preview || !video.paused || video.currentTime > 0) return;
      const format = narrow.matches ? 'portrait' : 'landscape';
      const source = video.dataset[`${format}Src`];
      if (video.getAttribute('src') !== source) video.src = source;
      video.poster = video.dataset[`${format}Poster`];
      frame.classList.toggle('is-portrait', narrow.matches);
      fallback.querySelector('a').href = source;
    };
    const update = () => {
      const paused = video.paused || video.ended;
      play.hidden = failed || (!preview && !paused);
      icon(play, paused ? 'play' : 'pause', preview
        ? (paused ? 'Воспроизвести превью' : 'Приостановить превью')
        : (video.ended ? 'Смотреть снова' : 'Смотреть ролик'));
      if (sound) {
        const muted = video.muted || video.volume === 0;
        icon(sound, muted ? 'volume-x' : 'volume-2', muted ? 'Включить звук' : 'Выключить звук');
        sound.setAttribute('aria-pressed', String(!muted));
      }
    };
    const pauseForVisibility = () => {
      if (!video.paused) {
        systemPause = true;
        video.pause();
      }
    };
    const start = async (manual = false) => {
      if (failed || pending) return;
      if (manual) {
        userPaused = false;
        blocked = false;
        explicitPlayback = true;
        if (video.ended) video.currentTime = 0;
      }
      if (preview && !video.getAttribute('src')) video.src = video.dataset.src;
      selectFormat();
      pending = true;
      try {
        await video.play();
        if (document.hidden || !inView || userPaused) pauseForVisibility();
      } catch (error) {
        if (error.name === 'NotAllowedError') blocked = true;
      } finally {
        pending = false;
        update();
      }
    };
    const reconcile = () => {
      if (document.hidden || !inView) pauseForVisibility();
      else if (!userPaused && !blocked && !failed && !video.ended &&
        (explicitPlayback || (!motion.matches && !connection?.saveData))) start();
    };

    selectFormat();
    video.muted = true;
    video.controls = !preview;
    if (sound) sound.hidden = false;
    update();

    play.addEventListener('click', () => {
      if (video.paused || video.ended) start(true);
      else { userPaused = true; video.pause(); }
    });
    sound?.addEventListener('click', () => {
      if (video.muted || video.volume === 0) { video.muted = false; video.volume = 1; }
      else video.muted = true;
    });
    video.addEventListener('play', () => { userPaused = false; update(); });
    video.addEventListener('pause', () => {
      // A visitor's pause survives scrolling; an offscreen pause may resume.
      if (!systemPause && inView && !document.hidden && !video.ended) userPaused = true;
      systemPause = false;
      update();
    });
    video.addEventListener('ended', update);
    video.addEventListener('volumechange', update);
    video.addEventListener('error', () => {
      failed = true;
      if (fallback) fallback.hidden = false;
      if (sound) sound.hidden = true;
      update();
    });

    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= .35;
      reconcile();
    }, {threshold: [0, .35]}).observe(video);
    document.addEventListener('visibilitychange', reconcile);
    narrow.addEventListener('change', selectFormat);
    const preferencesChanged = () => {
      if (motion.matches || connection?.saveData) { explicitPlayback = false; pauseForVisibility(); }
      else reconcile();
    };
    motion.addEventListener('change', preferencesChanged);
    connection?.addEventListener('change', preferencesChanged);
  });
})();
