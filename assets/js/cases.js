const CDN = "https://ruslan-automation.github.io/portfolio/";

const POSTERS = {
  "voice_clinic_site_booking_demo.mp4": "assets/posters/voice.webp",
  "0317_ai_admin_dentistry_small_cover.mp4": "assets/posters/voice.webp",
  "bitrix_booking_yclients_demo.mp4": "assets/posters/crm.webp",
  "bitrix_telegram_ai_admin_demo.mp4": "assets/posters/crm.webp",
  "bitrix_demo_subtitled.mp4": "assets/posters/crm.webp",
  "miniapp_ai_copilot_demo.mp4": "assets/posters/miniapp.webp",
  "Китчен.mp4": "assets/posters/kitchen.webp",
  "0317 (2).mp4": "assets/posters/rag.webp",
  "Shorts HH2.mp4": "assets/posters/leads.webp",
  "Дизайн.mp4": "assets/posters/design.webp",
  "Neon.mp4": "assets/posters/neon.webp",
  "Бот вакансий.mp4": "assets/posters/vacancy.webp",
};

const asset = (file) =>
  CDN + encodeURIComponent(file).replace(/%2F/g, "/").replace(/%28/g, "(").replace(/%29/g, ")");
const posterFor = (file) => POSTERS[file] || "assets/posters/voice.webp";
const VERTICAL_VIDEO_FILES = new Set(["miniapp_ai_copilot_demo.mp4", "Shorts HH2.mp4", "Дизайн.mp4", "Neon.mp4"]);

const PROJECTS = {
  voiceSales: {
    badge: "Сложная интеграция",
    title: "Голосовой ИИ-администратор для клиники",
    lead: "Клиент звонит прямо с сайта. Агент уточняет услугу и время, проверяет свободные окна и доводит сценарий до записи в расписании и CRM.",
    route: ["Сайт", "Голос", "YCLIENTS", "Bitrix24", "Запись"],
    role: "Голосовой сценарий, FastAPI-контур, проверка слотов, CRM-интеграция и демонстрация записи с сайта.",
    highlights: [
      "Клиент запускает звонок прямо на сайте: ИИ-администратор ведёт диалог как сотрудник клиники.",
      "Голосовой контур держит контекст услуги, клиента, телефона и желаемого времени.",
      "После выбора времени система создаёт запись и передаёт данные в CRM готовый маршрут.",
    ],
    architecture: [
      "FastAPI отдаёт демо-страницу, голосовые маршруты и API записи поверх одной кодовой базы.",
      "Vapi и LLM обрабатывают голосовой диалог, короткие уточнения и контекст разговора.",
      "YCLIENTS API, Bitrix24 API и Postgres связывают расписание, CRM-статус и журнал действий.",
    ],
    stack: ["Python", "FastAPI", "Vapi", "OpenAI / LLM", "YCLIENTS API", "Bitrix24 API", "PostgreSQL"],
    video: {
      file: "voice_clinic_site_booking_demo.mp4",
      title: "Основной сценарий: звонок с сайта и запись",
      note: "Клиент звонит прямо на сайте клиники, ИИ уточняет услугу и время, после чего запись появляется в календаре.",
    },
    secondary: [
      {
        file: "0317_ai_admin_dentistry_small_cover.mp4",
        title: "Дополнительное демо: звонок и CRM-сценарий",
        note: "Технический сценарий голосового агента с проверкой слотов и фиксацией лида.",
      },
    ],
  },

  bitrixDispatcher: {
    badge: "Готово к внедрению",
    title: "CRM-автоматизация Bitrix24 + YCLIENTS + ЮKassa",
    lead: "Система ведёт клиента от сайта до онлайн-записи, оплаты и сделки в Bitrix24. Дополнительные сценарии показывают маршрутизацию обращений и ручную проверку спорных кейсов.",
    route: ["Сайт", "Запись", "Оплата", "Bitrix24", "Менеджер"],
    role: "Сквозной маршрут клиента: онлайн-запись, предоплата, сделка в CRM, уведомление и обработка спорных обращений.",
    highlights: [
      "Клиент выбирает услугу, специалиста и свободное время через YCLIENTS.",
      "Оплата проходит через тестовый контур ЮKassa, а Bitrix24 получает сделку со статусом оплаты.",
      "Заявка с сайта или чат-канала превращается в запись, ссылку на предоплату и сделку.",
    ],
    architecture: [
      "Публичная страница записи, YCLIENTS, ЮKassa и Bitrix24 связаны в один клиентский маршрут.",
      "В Bitrix24 менеджер видит этап клиента: новая запись, ожидание оплаты, оплаченная запись.",
      "FastAPI, Postgres, OpenRouter и Telegram дополняют сценарий журналом действий и повторной обработкой сбоев.",
    ],
    stack: ["FastAPI", "Bitrix24 Webhook", "YCLIENTS", "ЮKassa", "PostgreSQL", "OpenRouter", "Telegram"],
    video: {
      file: "bitrix_booking_yclients_demo.mp4",
      title: "Основной сценарий: онлайн-запись, оплата и сделка",
      note: "Клиент выбирает услугу и время, оплачивает через ЮKassa, а Bitrix24 получает сделку со статусом оплаты.",
    },
    secondary: [
      {
        file: "bitrix_telegram_ai_admin_demo.mp4",
        title: "Сценарий 2: Telegram ИИ-администратор",
        note: "Клиент переходит в чат-канал, выбирает процедуру и время, получает ссылку на предоплату.",
      },
      {
        file: "bitrix_demo_subtitled.mp4",
        title: "Сценарий 3: ИИ-диспетчер заявок",
        note: "Приём обращений из Telegram и веб-форм, ИИ-классификация и операторский контур.",
      },
    ],
  },

  miniAppCopilot: {
    badge: "Telegram Mini App",
    title: "База знаний для команды в Telegram Mini App",
    lead: "Сотрудник задаёт вопрос текстом или голосом, а ИИ ищет ответ в базе знаний, показывает подтверждение из источников и находит подходящие медиафайлы.",
    route: ["Вопрос", "RAG", "Источники", "Медиа", "Ответ"],
    role: "Интерфейс Telegram Mini App, серверная логика, поиск по базе знаний, загрузка материалов и командный контур.",
    highlights: [
      "Пользователь работает внутри Telegram Mini App: задаёт вопрос, получает ответ и видит источники.",
      "Система работает не только с текстом, но и с медиа: в демо видно поиск подходящего аудиофайла.",
      "Командный контур: приглашения сотрудников, роли, база знаний, админка и загрузка материалов.",
    ],
    architecture: [
      "React + Vite отвечает за Mini App интерфейс, отдельная админка закрывает операционные сценарии.",
      "FastAPI проверяет Telegram initData, держит сессии, отдаёт streaming-чаты и API для базы знаний.",
      "Фоновый обработчик, Redis, Qdrant, MinIO, PostgreSQL и Docker Compose собирают ingestion, хранение и поиск.",
    ],
    stack: ["React", "Vite", "Telegram Mini App", "FastAPI", "RAG", "Qdrant", "Redis", "MinIO", "PostgreSQL", "Docker"],
    video: {
      file: "miniapp_ai_copilot_demo.mp4",
      title: "Telegram Mini App: чат с базой знаний и поиск медиа",
      note: "Сотрудник задаёт вопрос, получает ответ с подтверждением из базы и находит медиафайл по смыслу.",
    },
  },

  kitchenSalesBot: {
    badge: "Сбор заявок",
    title: "Telegram-бот для заявок на кухни",
    lead: "Бот проводит клиента по короткому опросу, собирает заявку и передаёт её менеджеру через Google Sheets.",
    route: ["Квиз", "Данные", "Sheets", "Лид", "Догрев"],
    role: "Сценарий квиза, логика состояний, запись лида в Google Sheets и мягкий догрев после заявки.",
    highlights: [
      "Квиз собирает ключевые параметры кухни через inline-кнопки и не перегружает пользователя анкетой.",
      "Состояние диалога зашито в callback-данные, поэтому воронка работает через компактную логику состояний.",
      "После квиза бот сохраняет лид, отправляет уведомление и запускает мягкий догрев.",
    ],
    architecture: [
      "Telegram Trigger → Router → Parse Callback Data разбирают шаги квиза и действия пользователя.",
      "Обновление сообщения обновляет интерфейс внутри одного чата, чтобы бот ощущался как мини-приложение.",
      "Google Sheets хранит заявки, а ожидание + видео-сообщение подогревают клиента после отправки.",
    ],
    stack: ["n8n", "Telegram API", "Google Sheets", "HTTP Request", "логика состояний"],
    video: {
      file: "Китчен.mp4",
      title: "Квиз, таблица лидов и догрев в одном сценарии",
      note: "Бот проводит пользователя по квизу, кладёт лид в Google Sheets и запускает догрев.",
    },
  },

  neonBot: {
    badge: "Визуальный расчёт",
    title: "Бот для расчёта неоновых вывесок",
    lead: "Бот для заказа неоновых вывесок: помогает выбрать текст, размер и цвет, показывает пример будущей вывески и сразу считает примерную стоимость.",
    route: ["Telegram", "Параметры", "Расчёт", "Макет", "Ответ"],
    role: "Сценарий заказа, калькулятор стоимости, генерация визуального макета и отправка результата клиенту в Telegram.",
    highlights: [
      "Собирает параметры вывески и уточняет их, если клиент не дал всё сразу.",
      "Отдельный калькулятор считает цену, а сценарий генерации изображения собирает визуал.",
      "Есть русская и английская версия для разных рынков.",
    ],
    architecture: [
      "ИИ-агент в Telegram использует память и два инструмента: расчёт цены и генерацию изображения.",
      "Калькулятор считает цену по размерам, длине текста и цветам.",
      "Сценарий визуализации запускает KIE.ai и отправляет макет обратно в Telegram.",
    ],
    stack: ["n8n", "KIE.ai", "Gemini", "Telegram API", "ИИ-агент"],
    video: {
      file: "Neon.mp4",
      title: "От параметров заказа до визуализации вывески",
      note: "Видео показывает сбор параметров в Telegram и переход к визуальному макету для неоновой вывески.",
    },
  },

  vacancyBot: {
    badge: "Готово к внедрению",
    title: "Бот для поиска вакансий",
    lead: "Python-система для HH.ru: ищет вакансии, ИИ оценивает релевантность, генерирует сопроводительные письма и работает в автоматическом или ручном режиме на VPS.",
    route: ["HH.ru", "Скоринг", "Очередь", "Telegram", "Отклик"],
    role: "Поиск вакансий, оценка совпадения с профилем, очередь ручного подтверждения и управление откликами через Telegram.",
    highlights: [
      "Ищет вакансии на HH.ru каждые 30-60 минут и отбирает только подходящие.",
      "Считает ИИ-оценку и генерирует персонализированные сопроводительные письма через OpenRouter.",
      "Поддерживает автоматический и ручной режимы с очередью подтверждения в Telegram.",
    ],
    architecture: [
      "Python 3.10+ управляет процессом поиска, оценкой и статусами откликов.",
      "Playwright и парсинг HTML закрывают авторизацию, поиск и работу с динамическими страницами.",
      "OpenRouter, SQLite и Telegram Bot дают оценку, очередь откликов и контроль статусов на VPS.",
    ],
    stack: ["Python 3.10+", "Playwright", "OpenRouter", "SQLite", "Telegram Bot", "systemd"],
    video: {
      file: "Бот вакансий.mp4",
      title: "Видео работы бота по вакансиям",
      note: "Видео показывает, как бот ищет вакансии, оценивает совпадение и готовит отклики через Telegram.",
    },
  },

  designBot: {
    badge: "Голосовой помощник",
    title: "ИИ-консультант для мебельной студии",
    lead: "Telegram-сценарий понимает текст и голос, помогает выбрать мебель и записывает клиента на консультацию в Google Calendar.",
    route: ["Голос", "ИИ", "Уточнение", "Календарь", "Консультация"],
    role: "Голосовой контур, диалоговая память, инструмент календаря и запись на консультацию.",
    highlights: [
      "Система принимает голосовые сообщения и переводит их в текст.",
      "ИИ-агент уточняет стиль, цвета, конфигурацию и контактные данные.",
      "После выбора времени агент проверяет слот и создаёт запись в календаре.",
    ],
    architecture: [
      "Telegram Trigger делит поток на text и voice.",
      "ИИ-агент использует память и держит детали диалога.",
      "Google Calendar подключён как инструмент для записи.",
    ],
    stack: ["n8n", "Groq Whisper", "OpenRouter", "Google Calendar", "Telegram Bot"],
    video: {
      file: "Дизайн.mp4",
      title: "Голосовой ИИ-консультант с записью",
      note: "Ассистент общается в Telegram, понимает голос и переводит диалог в консультацию.",
    },
  },
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");
const modalClose = modal?.querySelector(".modal-close");
let lastFocus = null;
let lockedScrollY = 0;

const escapeHtml = (str) =>
  String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function renderVideo(video) {
  if (!video) return "";
  const isVertical = VERTICAL_VIDEO_FILES.has(video.file);
  const cls = isVertical ? "modal-video-card vertical-video" : "modal-video-card";
  const note = video.note ? `<p>${escapeHtml(video.note)}</p>` : "";
  return `
    <figure class="${cls}">
      <video controls preload="metadata" poster="${posterFor(video.file)}" playsinline>
        <source src="${asset(video.file)}" type="video/mp4">
      </video>
      <figcaption class="modal-video-caption">
        <h3>${escapeHtml(video.title || "Видео кейса")}</h3>
        ${note}
      </figcaption>
    </figure>`;
}

function renderModal(data) {
  const route = (data.route || []).map((s) => `<span>${escapeHtml(s)}</span>`).join('<i aria-hidden="true"></i>');
  const highlights = (data.highlights || []).map((s) => `<li>${escapeHtml(s)}</li>`).join("");
  const architecture = (data.architecture || []).map((s) => `<li>${escapeHtml(s)}</li>`).join("");
  const stack = (data.stack || []).map((s) => `<li>${escapeHtml(s)}</li>`).join("");
  const secondary = (data.secondary || []).map(renderVideo).join("");
  const mediaClass = data.secondary?.length ? "modal-media" : "modal-media modal-media--single";

  return `
    <div class="${mediaClass}">
      ${renderVideo(data.video)}
      ${secondary}
    </div>
    <div class="modal-copy">
      <span class="modal-kicker">${escapeHtml(data.badge || "Кейс")}</span>
      <h2 id="modalTitle">${escapeHtml(data.title)}</h2>
      <p class="modal-lead">${escapeHtml(data.lead)}</p>
      ${route ? `<div class="modal-route" aria-label="Маршрут проекта">${route}</div>` : ""}
      ${data.role ? `<div class="modal-section"><h3>Роль в проекте</h3><p style="font-size:14px;line-height:1.55;color:var(--text)">${escapeHtml(data.role)}</p></div>` : ""}
      ${highlights ? `<div class="modal-section"><h3>Что внутри</h3><ul>${highlights}</ul></div>` : ""}
      ${architecture ? `<div class="modal-section"><h3>Архитектура</h3><ul>${architecture}</ul></div>` : ""}
      ${stack ? `<ul class="modal-stack chips">${stack}</ul>` : ""}
      <div class="modal-actions">
        <a class="btn primary" href="https://t.me/RuslanFZ" target="_blank" rel="noopener">Обсудить похожий проект <span class="btn-arrow" aria-hidden="true">↗</span></a>
        <a class="btn ghost" href="https://github.com/ruslan-automation" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>`;
}

function openProject(id) {
  const data = PROJECTS[id];
  if (!data || !modal || !modalBody) return;
  lastFocus = document.activeElement;
  lockedScrollY = window.scrollY;
  modalBody.innerHTML = renderModal(data);
  modal.hidden = false;
  modal.scrollTop = 0;
  modalBody.scrollTop = 0;
  requestAnimationFrame(() => {
    modal.scrollTop = 0;
    modalBody.scrollTop = 0;
    modal.classList.add("is-open");
  });
  modal.setAttribute("aria-hidden", "false");
  document.documentElement.classList.add("is-modal-open");
  document.body.classList.add("is-modal-open");
  document.body.style.position = "fixed";
  document.body.style.top = `-${lockedScrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  window.dispatchEvent(new CustomEvent("portfolio:modal-open"));
  modalClose?.focus();
}

function closeProject() {
  if (!modal || !modalBody) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.documentElement.classList.remove("is-modal-open");
  document.body.classList.remove("is-modal-open");
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  window.scrollTo(0, lockedScrollY);
  window.dispatchEvent(new CustomEvent("portfolio:modal-close"));

  const finish = () => {
    modal.hidden = true;
    modalBody.innerHTML = "";
    modal.removeEventListener("transitionend", finish);
  };
  if (reduceMotion) finish();
  else setTimeout(finish, 280);

  if (lastFocus && typeof lastFocus.focus === "function") {
    lastFocus.focus({ preventScroll: true });
  }
}

window.addEventListener(
  "wheel",
  (e) => {
    if (!modal?.classList.contains("is-open")) return;
    const activeScroller = e.target.closest?.(".modal-copy");
    const modalCopy = modal.querySelector(".modal-copy");
    const modalBodyScroller = modal.querySelector(".modal-body");
    const overlayCanScroll = modal.scrollHeight > modal.clientHeight;
    const target =
      (activeScroller && activeScroller.scrollHeight > activeScroller.clientHeight ? activeScroller : null) ||
      (modalCopy && modalCopy.scrollHeight > modalCopy.clientHeight ? modalCopy : null) ||
      (modalBodyScroller && modalBodyScroller.scrollHeight > modalBodyScroller.clientHeight ? modalBodyScroller : null) ||
      (overlayCanScroll ? modal : null);

    e.preventDefault();
    e.stopPropagation();

    if (!target) return;

    target.scrollTop += e.deltaY;
  },
  { passive: false, capture: true },
);

document.addEventListener("click", (e) => {
  const trigger = e.target.closest("[data-case]");
  if (trigger) {
    e.preventDefault();
    openProject(trigger.dataset.case);
    return;
  }
  if (modal && e.target === modal) closeProject();
});

modalClose?.addEventListener("click", closeProject);

document.addEventListener("keydown", (e) => {
  if (!modal || !modal.classList.contains("is-open")) return;
  if (e.key === "Escape") {
    closeProject();
    return;
  }
  if (e.key === "Tab") {
    const focusable = modal.querySelectorAll(
      'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
