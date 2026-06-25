# Shubham Sharma — Premium Creative Developer Portfolio

A cinematic, dark-themed creative developer portfolio inspired by jakebogan.com. Built as a high-performance edge-rendered SPA with React, GSAP, Lenis smooth scrolling and Framer Motion.

## Project Overview

- **Name**: Premium Creative Developer Portfolio
- **Goal**: Demonstrate a SaaS-level, cinematic personal-brand site with oversized typography, scroll storytelling and a custom motion system.
- **Persona**: *Shubham Sharma* — independent design engineer (India → Worldwide).

## Currently Completed Features

| Feature | Implementation |
| --- | --- |
| **Custom cursor** | `src/client/components/CustomCursor.tsx` — dot + lerping ring, blends with elements, picks up `data-cursor` labels |
| **Cinematic preloader** | `src/client/components/Preloader.tsx` — 0 → 100 counter, scaling progress bar, masked exit reveal |
| **Lenis smooth inertia scroll** | `src/client/hooks/useLenis.ts` — synced with GSAP ScrollTrigger via `gsap.ticker` |
| **Oversized hero typography** | `clamp(4rem, 16vw, 20rem)` display headings, masked word-by-word reveal on load |
| **Scroll-triggered text reveals** | `SplitReveal` component + section-level masked word stagger using `expo.out` easing |
| **Section pinning + horizontal scroll** | `Projects` section uses `ScrollTrigger.pin` with horizontal `x` tween for 6 project cards |
| **3D card hover effects** | `tilt-card` with `rotateX/rotateY` perspective transforms + dynamic radial-gradient shine layer |
| **Magnetic buttons** | `MagneticButton` component — GSAP `elastic.out` return, sub-pixel cursor tracking |
| **Page transition + preloader exit** | Full-screen `expo.inOut` mask sweeps off-canvas after load |
| **Cinematic marquee bands** | Auto-scrolling horizontal track between sections, accent-color variant |
| **Manifesto word-color scrub** | About section uses `scrub: 1` ScrollTrigger to fade words from `rgba(255,255,255,0.15)` → `#fff` |
| **Dark theme & noise overlay** | `#0a0a0a` base, accent `#e8ff00`, fixed SVG turbulence noise at 4% opacity for grain |
| **Responsive design** | Mobile drawer nav, fluid type (`clamp`), grid collapses to single column < `md` |
| **SEO optimization** | Full OG + Twitter card meta, JSON-LD `Person` schema, semantic landmarks, `noscript` fallback |
| **Reusable components** | `MagneticButton`, `SplitReveal`, `CustomCursor`, `Preloader`, `Marquee` |

## Functional Entry URIs

| Path | Method | Description |
| --- | --- | --- |
| `/` | GET | Serves the full HTML shell with OG/Twitter meta, JSON-LD schema, and loads the React client bundle |
| `/static/client.js` | GET | The compiled React + GSAP + Lenis client bundle |
| `/static/client.css` | GET | The compiled Tailwind + custom stylesheet |
| `/static/favicon.svg` | GET | App icon |
| `/api/health` | GET | Lightweight JSON health-check endpoint `{ ok: true, time: ISO }` |

## Tech Stack

- **Framework**: Hono (edge) for the HTML shell + API, React 19 for the client
- **Build**: Vite 6 — dual build (`vite.client.config.ts` for the React bundle, `vite.config.ts` for the Hono worker)
- **Styling**: Tailwind CSS 3, custom CSS for cursor / 3D cards / marquee
- **Motion**: GSAP 3 (+ ScrollTrigger), Framer Motion, Lenis 1.3
- **Deployment**: Cloudflare Pages (Workers runtime)
- **Language**: TypeScript across server + client

## Data Architecture

This portfolio is a **content-on-the-fly** site — no database, no persistence layer. Project case-study data lives in `src/client/sections/Projects.tsx` as a typed array (`Project[]`). The Hono server only emits a static HTML shell and a JSON `/api/health` endpoint. If a future CMS is needed, swap the in-file array for a Cloudflare KV or D1 binding (see `wrangler.jsonc` for placeholder bindings).

## Project Structure

```
webapp/
├── src/
│   ├── index.tsx                       # Hono server — HTML shell + SEO meta + /api/health
│   └── client/                         # React client app (built to public/static/client.js)
│       ├── main.tsx                    # React root mount
│       ├── App.tsx                     # Page composition + Lenis init
│       ├── styles.css                  # Tailwind + custom motion CSS
│       ├── hooks/
│       │   └── useLenis.ts             # Lenis ↔ GSAP ticker sync
│       ├── components/
│       │   ├── CustomCursor.tsx        # Dot + lerping ring + data-cursor labels
│       │   ├── MagneticButton.tsx      # GSAP-driven magnetic interaction
│       │   ├── Nav.tsx                 # Fixed nav + mobile drawer + smooth scroll
│       │   ├── Preloader.tsx           # 0→100 counter & masked exit
│       │   └── SplitReveal.tsx         # Masked word-reveal text helper
│       └── sections/
│           ├── Hero.tsx                # Oversized type, parallax scroll-out
│           ├── About.tsx               # Word-color scrub manifesto + stats
│           ├── Projects.tsx            # Pinned horizontal scroll, 3D tilt cards
│           ├── Services.tsx            # Grid of 3D hover cards + process
│           ├── Contact.tsx             # Mega CTA + live local time
│           ├── Marquee.tsx             # Auto-scrolling band (accent / dark)
│           └── Footer.tsx              # Mega wordmark reveal + sitemap
├── public/static/                      # Built assets served by Hono / CF Pages
├── ecosystem.config.cjs                # PM2 dev process definition
├── vite.config.ts                      # Hono server build
├── vite.client.config.ts               # React client build → public/static/
├── tailwind.config.js                  # Custom dark theme + type scale
├── tsconfig.json + tsconfig.client.json # Server (Hono JSX) + client (React JSX) configs
└── wrangler.jsonc                      # Cloudflare Pages config
```

## User Guide

1. Open the site — a 0→100 cinematic preloader plays once.
2. The custom cursor (dot + lerping ring) takes over on desktop. Hover any element with a `data-cursor` attribute to see a contextual label appear inside the ring.
3. Scroll naturally — Lenis provides smooth inertia. The first time you scroll past the **About** manifesto, words fade up from grey to white as a scrub.
4. The **Selected Work** section pins to the viewport while six project case studies scroll horizontally. The progress bar at the bottom tracks position. Hover any card for a 3D parallax tilt + shine.
5. **How I Work** has four cards with `rotateX/Y` perspective hover and a process timeline below.
6. **Get in touch** has magnetic buttons that pull toward the cursor. Live IST clock updates every 30s.
7. On mobile, the cursor is hidden, layout collapses to a single column, and a slide-out drawer handles navigation.

## Deployment

- **Platform**: Cloudflare Pages (Workers runtime, edge-rendered)
- **Status**: ✅ Running locally on port 3000 via PM2 (`pm2 list`)
- **Sandbox dev URL**: served by `wrangler pages dev` on `http://localhost:3000`
- **Production**: not yet deployed — run `npm run deploy` (requires Cloudflare API token)
- **Last Updated**: 2026-06-19

### Local Dev

```bash
# Build the React client + Hono worker
npm run build

# Start the local Cloudflare Pages dev server under PM2
pm2 start ecosystem.config.cjs

# Tail logs without blocking
pm2 logs webapp --nostream

# Stop
pm2 delete webapp
```

### Build Scripts

| Script | Action |
| --- | --- |
| `npm run build` | Builds React client → `public/static/client.{js,css}`, then Hono worker → `dist/_worker.js` |
| `npm run build:client` | Client only |
| `npm run build:server` | Server only |
| `npm run dev:sandbox` | Runs `wrangler pages dev dist` on port 3000 |
| `npm run deploy` | Builds + deploys to Cloudflare Pages |

## Features Not Yet Implemented

- **Individual case-study pages** — currently each card links nowhere; a `/work/[slug]` route + Hono dynamic handler would back the "View case" CTA.
- **CMS / Headless content** — project data is in-file; a Cloudflare KV or D1-backed read would enable non-code edits.
- **Contact form submission** — the newsletter input is presentational; wire to Resend / Loops via a `/api/subscribe` endpoint.
- **Real OG image** — `/static/og.png` referenced in meta tags is a placeholder, not yet rendered.
- **Page transitions between routes** — preloader + initial mount only; SPA route transitions to be added once case-study pages exist.
- **WebGL backgrounds** — currently CSS gradients + radial glows. A `react-three-fiber` canvas could be added behind the hero.
- **Real project imagery** — cards render type + gradient art; swap in real artwork once available.

## Recommended Next Steps

1. **Wire dynamic case studies** — define a `Case` type, add `/work/:slug` route in Hono, and split each project into its own scrollytelling page.
2. **Add Cloudflare KV binding** for newsletter signups (`/api/subscribe`) and feature-flag toggles.
3. **Generate `og.png`** with `@vercel/og` or a build-time Satori script for shareable previews.
4. **Add view transitions API** for smooth route changes once multi-page lands.
5. **Performance audit** — the bundle is ~370 KB minified (~122 KB gz). Consider code-splitting GSAP plugins per section.
6. **Accessibility pass** — current build respects `prefers-reduced-motion` via CSS; expand to disable Lenis when reduced-motion is requested.

## Notes

- **Why Hono + React, not Next.js 15?** This sandbox deploys to Cloudflare Pages where Hono is the lightest-weight server. The architecture preserves edge-rendered SEO meta + JSON-LD while letting all the cinematic motion run client-side. Migrating to Next.js 15 App Router later would only require relocating the client components and converting `src/index.tsx` to a layout.
- **Why no real Next.js features here?** No server actions, no route handlers beyond `/api/health` — by design, this is a single-page brand site.

---

© 2026 Shubham Sharma Studio · Crafted with cinema in mind.
