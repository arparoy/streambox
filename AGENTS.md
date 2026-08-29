# StreamBox — Base44 Dev Notes

## What this is
A fully static Next.js 15 (App Router) movie catalog. All content comes from local JSON
(`data/movies.json`, `data/random.json`) — **no backend, no database, no API calls**.

## Secrets
None. The app is fully static — no backend, database, or external API. All Gemini /
AI-Studio references and unused dependencies have been removed.

## Running
```
docker compose -f docker-compose.base44.yml up -d --build
```
- Base image: `node:22-slim` (runtime only — source is bind-mounted, NOT baked in).
- On start it runs `npm install` then `next dev` (live reload via HMR).
- Web entry point is host port 3000.

## Preview origin
The preview is served through an external hostname derived from `BASE44_PUBLIC_HOST_SUFFIX`.
`next.config.ts` sets `allowedDevOrigins` from that var so Next doesn't block the preview
origin's dev-asset/HMR requests. Do NOT hardcode the suffix — it changes when the env is
recreated.

## Verifying it works
- `curl -sf -H "Host: 3000-${BASE44_PUBLIC_HOST_SUFFIX}" http://localhost:3000/` returns
  the page (contains "StreamBox" / "Latest Releases" / "Trending").
- A `_next/static/...` asset request with the same Host header returns 200.
- `docker compose -f docker-compose.base44.yml logs web` shows `next dev` compiling pages.

## Notes
- `next.config.ts` has a `DISABLE_HMR` branch that disables webpack file watching; we do
  NOT set it, so live reload stays on for edits.
- `output: 'standalone'` is set but irrelevant in dev mode.
