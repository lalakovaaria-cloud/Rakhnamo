# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Rakhnamo is a mobile-first education guide for applicants in Tajikistan, covering roadmaps, scholarships, and documents. The UI is Russian/Tajik language, targeting a `max-w-sm` phone layout.

## Commands

All commands run from the `application/` directory:

```bash
cd application

npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build (outputs to out/ for static export)
npm run lint     # ESLint
```

No tests exist in this project.

## Architecture

The app is a Next.js 16 / React 19 / Tailwind 4 static site deployed to GitHub Pages via `.github/workflows/nextjs.yml`. The build runs `npx next build` in `application/` and uploads `application/out/` as the Pages artifact.

**Routing** — all pages live in `application/app/` using the Next.js App Router:

| Route | Description |
|---|---|
| `/` | Role selection: Applicant or Mentor |
| `/home` | Applicant dashboard (2×2 tile grid + mentor catalog link) |
| `/roadmap` | Step-by-step application roadmap |
| `/scholarships` | Scholarship listings |
| `/documents` | Required document checklist |
| `/deadlines` | Application deadlines |
| `/mentors` | Mentor catalog (hardcoded list) |
| `/mentor-panel` | Mentor's own stats dashboard |

**Styling** — Tailwind 4 utility classes plus inline `style` props for brand colors. Core palette:
- Background: `#0b1220` (dark navy)
- Card surface: `#162032`
- Accent green→teal: `linear-gradient(135deg, #22c55e, #14b8a6)`
- Accent amber→orange: `linear-gradient(135deg, #f59e0b, #ea580c)`
- Muted text: `#8b9bb4`

**Data** — all content (mentor profiles, scholarship info, etc.) is currently hardcoded as static arrays inside each page file. There is no backend or external data source.

**Layout** — `app/layout.tsx` wraps everything in a centered `max-w-sm` column with the dark background, using Inter font with `latin` + `cyrillic` subsets.

Every page uses `"use client"` directive.

## Active Technologies
- TypeScript (React 19 / Next.js 16) + Tailwind 4, inline `style` props (no component library) (001-frontend-redesign)
- N/A — all data hardcoded as static arrays in page files (001-frontend-redesign)
- TypeScript 5 / React 19 / Next.js 16 + React Context API (built-in) — no new packages (006-add-i18n)
- `localStorage` (browser key `rakhnamo_lang`) (006-add-i18n)

## Recent Changes
- 001-frontend-redesign: Added TypeScript (React 19 / Next.js 16) + Tailwind 4, inline `style` props (no component library)
