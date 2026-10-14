# Grandma Garden Watch

ระบบติดตามและช่วยตัดสินใจดูแลสวน — a Thai-first smart agricultural monitoring and irrigation decision-support frontend.

Inspired by a grandmother's small garden in Maha Chana Chai, Yasothon, Thailand. She grows chili peppers, long beans, lime trees, and household vegetables, but must travel from home to see whether watering is needed. The garden may have no electricity or internet.

The long-term goal is to make environmental information easier to understand: when the garden may need attention, whether a visit may be useful, whether rain is expected, and how conditions change over time. The project also serves as a university admission portfolio and potential technology competition entry.

**Current status: Phase 1 — frontend foundation. All readings, forecasts, activity logs, and recommendations are fictional demonstration data. They are not current observations or instructions to water.** Satellite imagery cannot directly measure soil moisture of individual vegetables; future outputs will support decisions rather than guarantee irrigation advice.

## Implemented pages

| Route        | Features                                                                                                          |
| ------------ | ----------------------------------------------------------------------------------------------------------------- |
| `/`          | Garden overview, sample weather, simulated recommendation, rainfall chart, forecast, and fictional activity log   |
| `/garden`    | Demo garden information, crops, coordinates, and an illustrated map placeholder                                   |
| `/weather`   | Fictional temperature, humidity, rainfall, rain probability, five-day forecast, and responsive rainfall chart     |
| `/analytics` | Switchable historical weather charts, irrigation and vegetation placeholders, and Thai NDVI/NDMI/ET0 explanations |
| `/settings`  | Interactive demonstration fields, crop selections, alert toggles, reset, and planned source statuses              |

Shared features include a collapsible desktop sidebar, mobile overlay drawer, active-page highlights, prominent demo notices, keyboard focus states, accessible chart data tables, reduced-motion support, and loading/error/not-found pages. The fictional scenario is fixed at **8 October 2026**, not the current date. Coordinates **15.52891, 104.24190** are test coordinates and are not the actual garden. Roads and boundaries in the map are illustrative. The actual garden area is unknown and is displayed as **ยังไม่ได้ระบุขนาดพื้นที่**.

The desktop sidebar collapses to 72px with icon labels shown as hover/keyboard-focus tooltips. Its display preference is stored under `grandma-garden-watch.sidebar-collapsed` in `localStorage`; server rendering starts expanded, and the saved preference is restored after hydration. If storage is blocked or full, toggling still works for the current session. This preference does not persist garden data or settings.

On mobile, navigation opens in a native modal dialog with a close button, backdrop dismissal, Escape support, focus containment/restoration, and background scroll locking. Selecting a route or resizing to desktop closes the drawer. Charts and grids adapt to the available content width. Typography uses installed Thai-friendly fonts with a clear title/heading/body/label hierarchy; no new font or icon packages were added.

## Technology

Current: Next.js App Router, React, strict TypeScript, Tailwind CSS, Recharts, Lucide React, ESLint, and npm. Exact dependency versions are recorded in `package-lock.json`.

TypeScript is pinned to the compatible 6.x series because the current TypeScript ESLint parser does not yet support 7.x. ESLint 9 is retained for compatibility with the Next.js React/accessibility plugins, which do not currently declare ESLint 10 support.

Planned: Supabase/PostgreSQL, Leaflet, Open-Meteo, Sentinel Hub, Vercel hosting, and continued GitHub version control. None of the planned data services are connected in this version.

## Install and run

Use Node.js 20.9 or later and npm. From the repository root:

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). On Windows, if PowerShell disallows `npm.ps1`, run `npm.cmd ci` and `npm.cmd run dev` instead. No environment variables, API keys, database, or account are required. UI fonts use the local system font stack; no external font service is required.

Check the project:

```sh
npm run lint
npm run typecheck
npm run build
```

Run the production build locally after building:

```sh
npm run start
```

## Project structure

```text
src/
  app/          # Routes, layout, global styles, metadata, and fallback states
  components/   # Shared navigation, cards, indicators, and illustrations
  features/     # Forecast, chart, and interactive settings components
  data/         # Dedicated fictional demonstration fixtures
  services/     # Typed garden-data adapter
  types/        # Domain interfaces
  lib/          # Shared Thai strings and locale utilities
```

Pages obtain a typed `GardenSnapshot` through `gardenDataService`. The mock adapter supplies the dedicated fixtures. Real sources can later implement an evolved service contract while preserving presentation components. Interactive settings use component state only; leaving the page or reloading clears changes. They do not modify the rest of the application, persist to storage, or send alerts.

## Limits and roadmap

Phase 1 intentionally includes no authentication, database tables, external maps, satellite/weather API calls, irrigation algorithms, machine learning, or background jobs. Soil moisture, satellite indices, water demand, and irrigation risk remain unavailable rather than displaying fabricated calculated values. Full English translation is a future task; shared navigation and locale formatting have an extension point.

Dependency audit currently reports five high-severity entries in the development-only `eslint-config-next` → `fast-glob` → `micromatch` → `braces` chain (nested-pattern denial of service). The suggested automatic fix downgrades the lint configuration to Next.js 14, so it has not been applied. Recheck when compatible patched tooling is available; avoid feeding untrusted glob patterns into development tools.

`npm audit --omit=dev` reports zero production dependency vulnerabilities at the time of this implementation.

## Verification

`npm run lint`, `npm run typecheck`, and `npm run build` pass. UI-refinement production-browser checks cover all five pages at 320, 390, 768, 1024, and 1440 pixels, expanded/collapsed sidebar sizing, active navigation, keyboard toggling, hover/focus tooltips, preference restoration and cross-tab updates, mobile drawer dismissal, Tab/Shift+Tab focus containment/restoration, scroll locking, and resizing from mobile to desktop. Blocked, read-only, and invalid browser storage states were tested. Charts still render and switch metrics, chart tables still display the data, and settings reset still works. No horizontal page overflow, browser exceptions, or hydration errors were observed. The earlier Phase 1 checks also covered coordinate validation, temporary settings, the 404 page, and absence of external API requests.

Browser checks used local Chrome. Thai layouts were visually reviewed at desktop and mobile widths; physical Android/iOS devices and elderly-user usability review remain to be tested. The drawer uses native HTML dialog support in modern browsers. A saved desktop preference may apply just after the initial expanded server render; unavailable browser storage means the preference cannot survive a reload.

1. **Validate the foundation:** review Thai readability and workflows with the gardener on a real mobile device; confirm garden details and privacy preferences.
2. **Weather integration:** add a typed Open-Meteo adapter with timestamps, source attribution, missing/stale/error states, and explicit separation from demo mode.
3. **Garden management:** introduce Leaflet boundaries and multiple gardens, then Supabase/PostgreSQL persistence and authentication with access controls.
4. **Satellite exploration:** assess spatial resolution and cloud limitations for the actual plot before showing Sentinel indices with observation dates and uncertainty.
5. **Decision-support research:** implement and validate agricultural calculations against field observations, crop stages, soils, and local conditions.
6. **Deployment and portfolio:** document evaluation results and deploy to Vercel only when explicitly authorized.

Do not treat demonstration advice as a reason to water or delay watering. Inspect actual plants and soil before making irrigation decisions.

See [AGENTS.md](AGENTS.md) for contributor conventions. The original repository history and [MIT license](LICENSE) are preserved. This project has not been deployed or automatically pushed to GitHub.

The **Human-in-the-Loop Development Rules** in AGENTS.md require Thai communication and explicit clarification/approval for uncertain or out-of-scope decisions. Routine implementation within an approved task may continue independently.
