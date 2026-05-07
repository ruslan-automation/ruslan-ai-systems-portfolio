const formatter = new Intl.DateTimeFormat("ru-RU", {
  timeZone: "Europe/Moscow",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function update() {
  const el = document.querySelector("[data-clock]");
  if (!el) return;
  el.textContent = formatter.format(new Date());
}

function scheduleNextTick() {
  const now = new Date();
  const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
  setTimeout(() => {
    update();
    scheduleNextTick();
  }, msUntilNextMinute);
}

update();
scheduleNextTick();
