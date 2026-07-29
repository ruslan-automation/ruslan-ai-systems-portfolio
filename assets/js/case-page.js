import { PROJECTS, VERTICAL_VIDEO_FILES, asset, posterFor } from "./cases.js";

const root = document.getElementById("caseRoot");
const projectId = document.body.dataset.project;
const project = PROJECTS[projectId];

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderList = (items) =>
  (items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");

const renderRoute = (items) =>
  (items || [])
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join('<i aria-hidden="true"></i>');

const renderVideo = (video) => {
  if (!video) return "";
  const orientation = VERTICAL_VIDEO_FILES.has(video.file) ? " case-video--vertical" : "";
  return `
    <figure class="case-video${orientation}">
      <video controls preload="metadata" poster="${posterFor(video.file)}" playsinline>
        <source src="${asset(video.file)}" type="video/mp4">
      </video>
      <figcaption>
        <h2>${escapeHtml(video.title || "Демонстрация")}</h2>
        ${video.note ? `<p>${escapeHtml(video.note)}</p>` : ""}
      </figcaption>
    </figure>`;
};

if (!project || !root) {
  document.body.innerHTML = `
    <main class="case-error">
      <p>Кейс не найден.</p>
      <a href="/">Вернуться в портфолио</a>
    </main>`;
} else {
  const secondary = (project.secondary || []).map(renderVideo).join("");
  const route = renderRoute(project.route);

  root.innerHTML = `
    <header class="case-hero">
      <div class="case-hero-copy">
        <span class="case-kicker">${escapeHtml(project.badge || "Кейс")}</span>
        <h1>${escapeHtml(project.title)}</h1>
        <p class="case-lead">${escapeHtml(project.lead)}</p>
        ${route ? `<div class="case-route" aria-label="Маршрут проекта">${route}</div>` : ""}
        <div class="case-actions">
          <a class="btn primary" href="https://t.me/RuslanFZ" target="_blank" rel="noopener">
            Обсудить похожий проект <span class="btn-arrow" aria-hidden="true">↗</span>
          </a>
          <a class="btn ghost" href="/#works">Все работы</a>
        </div>
      </div>
      <div class="case-index" aria-hidden="true">${String(Object.keys(PROJECTS).indexOf(projectId) + 1).padStart(2, "0")}</div>
    </header>

    <section class="case-media-band" aria-label="Видео проекта">
      <div class="case-media-grid${project.secondary?.length ? "" : " case-media-grid--single"}">
        ${renderVideo(project.video)}
        ${secondary}
      </div>
    </section>

    <section class="case-details">
      <div class="case-detail case-detail--role">
        <span class="case-detail-label">Роль в проекте</span>
        <p>${escapeHtml(project.role)}</p>
      </div>
      <div class="case-detail">
        <span class="case-detail-label">Что внутри</span>
        <ul>${renderList(project.highlights)}</ul>
      </div>
      <div class="case-detail">
        <span class="case-detail-label">Архитектура</span>
        <ul>${renderList(project.architecture)}</ul>
      </div>
      <div class="case-detail case-detail--stack">
        <span class="case-detail-label">Инструменты</span>
        <ul class="chips">${renderList(project.stack)}</ul>
      </div>
    </section>

    <section class="case-footer-cta">
      <p>Нужен похожий сценарий для заявок, записи или работы с клиентами?</p>
      <a href="https://t.me/RuslanFZ" target="_blank" rel="noopener">Написать в Telegram <span aria-hidden="true">↗</span></a>
    </section>`;
}
