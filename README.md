# Ruslan Zaynullin Portfolio

Live site: https://ruslanzaynullin.ru/

## Publication

This repository is the source of the live GitHub Pages site. Pages publishes
the root of `main` in `ruslan-automation/ruslan-ai-systems-portfolio`.
The similarly named Next.js folders and the Astro concept lab are separate
experiments, not the deployment source for this domain.

The October 5, 2026 release publishes the approved local design using plain
HTML, CSS and JavaScript. The homepage follows this order: introduction,
about/skills/portrait, main film, anonymized experience, process, four demos,
contacts. It uses locally hosted Onest with Cyrillic and two demo columns on
desktop. Experience descriptions remain anonymized.

- `index.html`: four featured demos, contact details and accessible film dialog.
- `assets/css/portfolio.css`: responsive neutral/blue design and local Onest.
- `assets/js/portfolio.js`: navigation and video controls; no external runtime dependencies.
- `media/hero-bitrix-16x9-v10.mp4`: 32-second main film for desktop, with music.
- `media/hero-bitrix-9x16-v10.mp4`: separately composed portrait film for widths up to 640px.
- `media/hero-bitrix-ru-v10.vtt`: optional Russian descriptive captions.
- `assets/licenses/`: licenses for Onest, retained Manrope, Lucide and music.

Full films use five different user-selected Mixkit tracks. Attribution is not
required for their use in website videos:

| Film | Current MP4 versions | Music | Excerpt |
| --- | --- | --- | --- |
| Main | `hero-bitrix-{16x9,9x16}-v10.mp4` | Curiosity | 5-37s |
| Documents | `knowledge-dynamic-{16x9,9x16}-v6.mp4` | Hazy After Hours | 14-39s |
| Kitchen consultant | `consultant-film-{landscape,portrait}-v7.mp4` | New York | 10-32s |
| Kitchen questionnaire | `questionnaire-film-{landscape,portrait}-v6.mp4` | Green Chair RnB | 14-36s |
| Voice administrator | `voice-film-{landscape,portrait}-v5.mp4` | R&B vibes 1 | 10-36s |

Excerpts, sources and license details are listed in
`assets/licenses/video-music-selected-20261005.md` and
`assets/licenses/video-music-beat-swap-20261005.md`. Music starts at video time
zero, using the specified position in each track. The main and documents films
are gently retimed to selected beats; interface effects follow the visible
actions. Music speed and pitch are unchanged. The other three video streams
are retained. The voice film uses music and effects without the private voice track.
Four homepage teasers remain silent. Older published media, their CC BY license
records and case pages are retained for existing links and rollback.

The hero plays silently by default, stops outside the viewport, and respects
reduced-motion and data-saving preferences. It loops the complete film.
The format is selected when the page opens; rotating a phone does not interrupt
playback or load another video. The dialog plays the same complete film and
includes a text alternative. Browser autoplay policies may require a tap.
The former clinic film, poster and captions are retained for old links and rollback.

The October 4 release changed the main film. The October 5 release includes
the new design, updated full demo soundtracks and the dynamic documents film.
The later October 5 soundtrack update publishes the user's selection, including
the main track starting at 14 seconds. The previous release is `80fd3b3`.
The newest October 5 release swaps the main/documents soundtracks and aligns
selected transitions and actions to the rhythm. It also publishes the approved
About, experience and contact copy and the synchronized resume HTML/PDF.
The resume period stays 2026 without a month. Its previous release is `d7ccdf5`.
Source projects, private voice editions and intermediate renders are kept in
the local editing archive. `_config.yml` excludes development files from Pages.

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
Rollback should revert only the relevant publication commit, not unrelated work.
