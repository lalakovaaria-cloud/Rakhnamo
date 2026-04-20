# Rakhnamo — Education Guide for Applicants in Tajikistan

> **Rakhnamo** (рахнамо — "guide" in Tajik) is a mobile-first web app that helps applicants from Tajikistan find scholarships, track deadlines, prepare documents, and navigate the entire application process step by step.

---

## Features

- **Scholarship catalog** — local and international programs with deadlines, descriptions, and document requirements
- **Application tracker** — 4 stages: Preparation → Documents Sent → Under Review → Decision Received
- **Document checklist** — mark ready documents and uploaded files directly inside each application
- **Deadlines** — all upcoming deadlines in one place
- **Roadmap** — step-by-step guide through the application process
- **Mentor catalog** — browse mentors and get in touch
- **Mentor panel** — personal dashboard for mentors
- **Multilingual** — Russian, Tajik, and English (language preference saved in `localStorage`)
- **Offline-ready** — all data stored locally, no backend required

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript 5 |
| Styling | Tailwind CSS 4, inline `style` props |
| i18n | React Context API (no third-party libraries) |
| Storage | `localStorage` (backend in progress) |
| Deploy | GitHub Pages (static export) |

---

## Quick Start

```bash
# 1. Enter the application directory
cd application

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

App will be available at `http://localhost:3000`.

---

## Commands

All commands run from the `application/` directory:

```bash
npm run dev      # Dev server with hot reload
npm run build    # Production build → outputs to out/
npm run lint     # ESLint check
```

---

## Project Structure

```
rakhnamo/
├── application/              # Next.js application
│   ├── app/                  # App Router (pages)
│   │   ├── page.tsx          # Role selection (applicant / mentor)
│   │   ├── home/             # Applicant dashboard
│   │   ├── scholarships/     # Scholarship catalog and detail pages
│   │   ├── applications/     # Application detail with stage tracker
│   │   ├── documents/        # Document checklist
│   │   ├── deadlines/        # Upcoming deadlines
│   │   ├── roadmap/          # Step-by-step roadmap
│   │   ├── mentors/          # Mentor catalog
│   │   ├── mentor-panel/     # Mentor dashboard
│   │   └── components/       # Shared components (BottomNav, AppHeader…)
│   ├── lib/
│   │   ├── scholarships.ts   # All scholarship data (hardcoded)
│   │   ├── types.ts          # Domain types (User, Scholarship, Application…)
│   │   ├── storage.ts        # CRUD operations via localStorage
│   │   └── i18n/             # Translations (ru, en, tg) + LanguageContext
│   └── public/               # Static assets
├── backend/
│   ├── models.go             # Go models (Users, Scholarships, Applications)
│   ├── schema.sql            # SQL schema for Supabase
│   ├── seed.go               # Database seed data
│   └── api.md                # REST API contract
├── specs/                    # Feature specs with checklists
├── grants.md                 # Source data: scholarship catalog
└── CLAUDE.md                 # Guide for Claude Code
```

---

## Routes

| Path | Description |
|---|---|
| `/` | Role selection: Applicant or Mentor |
| `/home` | Dashboard with scholarship catalog and active applications |
| `/scholarships` | Full scholarship listing |
| `/scholarships/[id]` | Scholarship detail page |
| `/applications/[id]` | Application tracker (stages, documents, files) |
| `/documents` | General document checklist |
| `/deadlines` | Upcoming deadlines |
| `/roadmap` | Step-by-step application roadmap |
| `/mentors` | Mentor catalog |
| `/mentor-panel` | Mentor dashboard |
| `/onboarding` | New user onboarding |

---

## Localization

The app supports three languages. Language is toggled via `LanguageSwitcher` and persisted in `localStorage` under the key `rakhnamo_lang`.

```
lib/i18n/
├── ru.ts     # Russian (default)
├── tg.ts     # Tajik
├── en.ts     # English
└── index.tsx # LanguageProvider + useTranslation hook
```

To add a new translation key: add it to `ru.ts`, then mirror it in `tg.ts` and `en.ts`.

---

## Data Storage

All data is currently stored in `localStorage` via `lib/storage.ts`:

- **User** — name, city, UUID
- **Applications** — stages, document checklist, uploaded files
- **Saved scholarships** — list of IDs

Scholarship content is hardcoded in `lib/scholarships.ts`. A Go backend (`backend/`) and SQL schema (`backend/schema.sql`) are prepared for future Supabase integration.

---

## Backend API (in progress)

Base URL: `https://api.rakhnamo.app/v1`  
Auth: Supabase JWT (`Authorization: Bearer <token>`)

| Method | Path | Description |
|---|---|---|
| `POST` | `/users` | Create or update user profile |
| `GET` | `/scholarships` | List scholarships |
| `GET` | `/scholarships/:id` | Get scholarship details |
| `GET` | `/applications` | Get user's applications |
| `POST` | `/applications` | Submit an application |
| `PATCH` | `/applications/:id/stage` | Advance to next stage |
| `DELETE` | `/applications/:id` | Withdraw application |
| `GET` | `/saved` | Get saved scholarships |
| `POST` | `/saved/:id` | Save a scholarship |

Full contract — [`backend/api.md`](backend/api.md).

---

## Deployment

The app deploys automatically to **GitHub Pages** via GitHub Actions on every push to `main`.

Build process: `npx next build` in `application/` → static export to `application/out/`.

---

## Color Palette

| Role | Value |
|---|---|
| Background | `#0b1220` |
| Card surface | `#162032` |
| Accent (green → teal) | `linear-gradient(135deg, #22c55e, #14b8a6)` |
| Accent (amber → orange) | `linear-gradient(135deg, #f59e0b, #ea580c)` |
| Muted text | `#8b9bb4` |

---

## License

MIT — see [LICENSE](LICENSE).
