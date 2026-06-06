# Deploy to Vercel from GitHub

## Overview
Link your existing GitHub repository to Vercel and configure the TanStack Start project to build for Vercel's serverless environment instead of Cloudflare Workers.

## Changes Required

### 1. Make Build Target-Agnostic (`vite.config.ts`)
The project currently forces the Cloudflare plugin on every `vite build`. We need to make this conditional so Vercel builds produce a standard Node.js server output.

- Change the `useCloudflare` condition from `command === "build"` to also require a Cloudflare-specific signal (e.g. `!process.env.VERCEL && command === "build"`).
- This preserves Cloudflare builds when desired, but lets Vercel builds fall back to TanStack Start's default Nitro/Node.js output.

### 2. Verify / Adjust Build Output (`package.json`)
- Keep `"build": "vite build"` as the build command.
- TanStack Start's default output goes to `.output/`. We'll configure Vercel to serve from the correct directory.

### 3. Environment Variables to Configure in Vercel Dashboard
These must be copied from your Lovable project (or `.env`) into Vercel's project settings:

| Variable | Value (from your `.env`) |
|----------|--------------------------|
| `VITE_SUPABASE_URL` | `https://pcxvjvcccpvaxiuzucju.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_of4DzbxjW3M_HFERUtc59A_4Yk2rV1Y` |
| `VITE_SUPABASE_PROJECT_ID` | `pcxvjvcccpvaxiuzucju` |
| `SUPABASE_URL` | `https://pcxvjvcccpvaxiuzucju.supabase.co` |
| `SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_of4DzbxjW3M_HFERUtc59A_4Yk2rV1Y` |

> **Note:** `SUPABASE_SERVICE_ROLE_KEY` is server-only. If you add it, mark it as secret in Vercel.

## Vercel Dashboard Setup Steps

1. Go to [vercel.com/new](https://vercel.com/new) and **Import Git Repository**
2. Select your GitHub repo
3. Configure:
   - **Framework Preset:** `Other` (TanStack Start is not in Vercel's preset list yet)
   - **Build Command:** `vite build`
   - **Output Directory:** `.output/public` (TanStack Start default) OR leave empty and let TanStack Start handle it
   - **Install Command:** `bun install` (or `npm install`)
4. Add all Environment Variables listed above
5. Click **Deploy**

## What Stays the Same
- Your Supabase backend (Lovable Cloud) remains the data layer — no migration needed.
- All existing routes, pages, and components work unchanged.
- The project will still use SSR via TanStack Start's Nitro engine, just running on Vercel's serverless functions instead of Cloudflare Workers.

## Verification After Deploy
- Confirm the landing page (`/`) loads.
- Confirm dynamic routes (e.g. `/editors/daniel-cooper`) load without 404s.
- Confirm dark mode and Supabase contact form submissions still work.

## Optional: Add `vercel.json`
If routing issues appear (e.g. 404s on refresh for non-root paths), a `vercel.json` with rewrites may be needed to forward all requests to the SSR handler.
