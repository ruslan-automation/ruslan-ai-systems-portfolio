# Ruslan Zaynullin Portfolio

Live site: https://ruslanzaynullin.ru/

## Publication

This repository is the source of the live GitHub Pages site. Pages publishes
the root of `main` in `ruslan-automation/ruslan-ai-systems-portfolio`.
The similarly named Next.js folders and the Astro concept lab are separate
experiments, not the deployment source for this domain.

The September 23, 2026 homepage release uses plain HTML, CSS and JavaScript:

- `index.html`: four featured demos, contact details and accessible film dialog.
- `assets/css/portfolio.css`: responsive neutral/blue design and local Manrope.
- `assets/js/portfolio.js`: navigation and video controls; no external runtime dependencies.
- `media/clinic-lead-film.mp4`: the complete existing film with audio and end titles.
- `media/clinic-lead-ru.vtt`: optional Russian descriptive captions.
- `assets/licenses/`: licenses for Manrope and the vendored Lucide icons.

The hero plays silently by default, stops outside the viewport, and respects
reduced-motion and data-saving preferences. It loops before the embedded end
titles to keep them clear of the homepage heading. The dialog plays the complete
film and includes a text alternative. Browser autoplay policies may require a tap.

## Exactly Four Featured Demos

| Scenario | Entry |
| --- | --- |
| Own knowledge base / RAG | https://t.me/Ragdemonstrationbot |
| Kitchen consultant | https://t.me/Consultkitchenbot?start=consult |
| Kitchen questionnaire | https://t.me/Kitchendemobot?start=quiz |
| Voice administrator | https://t.me/RZAutomationBot |

Shared portfolio entries:

- Telegram: https://t.me/RZAutomationBot
- MAX: https://max.ru/se13981254_1_bot
- Voice web fallback: https://demo.ruslanzaynullin.ru/demo/voice/

MAX is a menu of ordinary links, not four native MAX applications. The voice
scenario is selected in the common Telegram bot, not a separate voice bot.
Limits are displayed next to each demo. The preview illustrations are labeled
educational examples, not recordings or production results. No live bot,
customer data, quota, or backend deployment is changed by this site release.

Existing `cases/` pages and their CSS/JavaScript/media are retained for incoming
links and historical context. They are not additional homepage demo entries.

## Verification

Use a local HTTP preview for external SVG symbols and video. Check 320, 390,
768, 1440 and 1920 pixel viewports, all four detail disclosures, mobile menu,
keyboard focus, film pause/sound/dialog controls and reduced-motion behavior.
After publishing, repeat against the public domain and click every external
button. Opening the correct Telegram/MAX landing page does not by itself prove
native mobile-app handoff or real microphone behavior on a physical phone.

The last pre-refresh revision is `11db59ecf481de8e7fdc01714d6eaf5dfdeaa063`.
Rollback should revert only the homepage release commit, not unrelated work.
