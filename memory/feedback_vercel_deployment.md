---
name: Vercel deployment fix
description: How to fix 404 NOT_FOUND on Vercel when app is in a subdirectory
type: project
---

When deploying to Vercel with the Next.js app in a subdirectory (`application/`), setting Root Directory alone is not enough. Must also manually set **Framework Preset = Next.js** in Vercel Settings → General, otherwise Vercel doesn't detect the framework and returns 404 NOT_FOUND.

**Why:** Vercel doesn't auto-detect the framework when Root Directory is changed — it needs to be set explicitly.

**How to apply:** When troubleshooting Vercel 404 errors for this project, check Framework Preset first.