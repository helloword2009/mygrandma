# Grandma Garden Watch — contributor instructions

## Purpose and phase

Build a Thai-first garden monitoring and irrigation decision-support application for an elderly gardener in Maha Chana Chai, Yasothon. The garden may have no electricity or internet. This repository currently implements **Phase 1: frontend foundation using fictional demonstration data**. It is also a university portfolio project.

Do not implement authentication, Supabase/database access, external weather/satellite/map APIs, irrigation calculations, machine learning, or background jobs during Phase 1 unless the user explicitly expands scope. Do not deploy, push, or alter Git history without explicit authorization. Preserve the original MIT LICENSE.

## Stack and conventions

- Next.js App Router, React, strict TypeScript, Tailwind CSS with the PostCSS plugin, Recharts, and Lucide icons. Use the committed npm lockfile.
- Supabase/PostgreSQL, Leaflet, Open-Meteo, Sentinel Hub, and Vercel are future integrations, not current dependencies or connected services.
- Keep code, names, and comments in English. Visible product text should be friendly, clear Thai. Keep language-specific formatting and shared strings in `src/lib/locale.ts` so English can be added later.
- Prefer server components; use client components only for navigation state, charts, and form interaction. Avoid unnecessary dependencies and abstractions.
- Keep components focused and typed. Format JSX for readability. No `any`, hardcoded credentials, fake working controls, or false real-time claims.

## Architecture

- `src/app`: five routes, root layout, styles, metadata, and loading/error/not-found states.
- `src/components`: reusable shell, cards, indicators, informational notes, and code-native decorative illustrations.
- `src/features`: interactive weather, analytics, and settings features.
- `src/types`: domain interfaces, including provenance and demonstration mode.
- `src/data`: all fictional garden/weather/history/recommendation fixtures.
- `src/services`: typed data adapter consumed by pages. Real adapters should replace the mock through a deliberate contract update without moving data fetching into presentation components.
- `src/lib`: shared language and formatting utilities. Do not create empty directories or unused scaffolding.

## Security

Do not request database passwords or add secret keys to source. `.env` and `.env.*` stay ignored (an example file may contain only placeholders). Future privileged keys must remain server-only. Client bundles may contain only intentional public configuration. Add proper validation and error handling before connecting any persistence or external data source.

## UI and accessibility

Use forest green, light green, soft off-white, warm yellow, and dark slate. Keep rounded cards, restrained shadows, clear hierarchy, readable Thai text, and adequate contrast. Build mobile-first with desktop sidebar and accessible mobile navigation. Use semantic HTML, visible focus rings, correctly labeled fields, keyboard-operable controls, sufficiently large touch areas, active-route indications, reduced-motion support, and text/table equivalents for charts.

Every route must prominently label **ข้อมูลตัวอย่าง**. Every demonstration recommendation must independently say it is simulated. Fixed scenario dates must not imply freshness. Settings changes affect only the current form and must not claim permanent saving or actual alerts. Unimplemented data must display its real status, not invented readings.

## Future satellite integration and agricultural limitations

Never claim satellite observations directly measure soil moisture of individual vegetables. NDVI relates to vegetation greenness; NDMI relates to canopy water and is not a direct soil measurement. ET0 is reference evapotranspiration, not an irrigation prescription. These indices have no computed values in Phase 1.

Future satellite work must account for spatial resolution, mixed pixels, cloud cover, acquisition timestamps, small plot size, and uncertainty. Keep acquisition/observation time separate from retrieval time; missing or stale data must be visible. Validate any irrigation model with garden context and ground observations. Recommendations are decision support, never guaranteed instructions.

The demonstration coordinate `15.52891, 104.24190` is not the grandmother's actual garden. Map boundaries, roads, forecasts, and activity logs are fictional illustrations. The actual garden area is unknown.

## Workflow

Inspect existing files and Git changes before editing. Do not recreate completed work or overwrite unrelated files. Install with `npm ci` after dependencies are established; on Windows use `npm.cmd` if PowerShell blocks `npm.ps1`. Run `npm run lint`, `npm run typecheck`, and `npm run build`; fix introduced errors. Check navigation, charts, settings behavior, and layout at mobile/tablet/desktop sizes when a browser is available. Keep README current and report remaining limitations truthfully. Do not commit generated build output, logs, environment secrets, or local screenshots.

## Human-in-the-Loop Development Rules

The project owner has final decision-making authority. Apply these rules to all future work in this repository:

1. **Ask when uncertain.** Stop and request clarification before acting on uncertainty about requirements, implementation, design, architecture, expected behavior, security, or project direction. Do not guess intentions or treat unclear instructions as authorization.
2. **Stay within the approved scope.** Obtain explicit permission before architectural or technology changes, unnecessary dependency installation, removing functionality, modifying unrelated components, database/API changes, new features, major UI/UX decisions, changed requirements, deployment, commits/pushes, or destructive operations. The existing phase and security restrictions above still apply.
3. **Present meaningful options.** When requirements leave an important choice between reasonable approaches, explain what each does, its advantages, disadvantages, and project impact. Recommend an option if helpful, but wait for the owner's choice before implementing it.
4. **Never infer approval.** Silence is not approval. Permission for one task does not authorize unrelated actions, and prior approval does not automatically authorize future major changes.
5. **Handle unexpected problems carefully.** For dependency conflicts, security warnings, breaking changes, architectural limitations, unclear requirements, or errors requiring major changes, explain the problem and impact in Thai, present solutions and a recommendation, and ask which solution the owner prefers. Wait before changing the agreed approach. Minor errors introduced by the current work may be fixed when behavior and architecture remain within the approved scope.
6. **Do not ask about trivial authorized work.** Routine spacing changes within approved design rules, syntax or TypeScript fixes caused by current edits, formatting, and small refactors preserving external behavior may proceed independently. If uncertainty affects functionality, architecture, security, user experience, or project direction, ask first.
7. **Communicate in Thai.** Use simple Thai for progress updates, questions, explanations, and final reports. Technical terms may remain in English; code and comments follow the English conventions above. Explain why a requested decision matters without unnecessary complexity.
8. **Pause affected work for approval.** Do not proceed with an approval-dependent task or interpret elapsed time as permission. Continue only independently authorized work that cannot interfere with the pending decision. If these instructions conflict with a current request or another project rule, explain the conflict and ask before changing the affected work.

For the approved sidebar UI, `localStorage` may store only the navigation display preference. This does not authorize persisting garden settings. The garden area is unknown: display `ยังไม่ได้ระบุขนาดพื้นที่`, never an invented measurement. Coordinates remain explicitly labeled as test coordinates.
