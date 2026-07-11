# Client deployment (Vercel)

The client is a static Vite build. Auth uses HTTP-only JWT cookies, so the API
must be **same-origin** with the app — otherwise the cookies are third-party and
modern browsers block them. We achieve this with a proxy in both environments:

- **Dev:** `vite.config.ts` proxies `/api` → the API (`VITE_PROXY_TARGET`,
  defaults to the deployed server).
- **Prod:** `vercel.json` rewrites `/api/*` → `https://react-blogify-server.vercel.app/api/*`.

The browser only ever talks to its own origin (`/api/v1`), so the JWT cookies
stay first-party. `axios` defaults its `baseURL` to `/api/v1`, so **no client
env var is required** on Vercel.

## Import as a new Vercel project

1. Vercel → New Project → import this repo.
2. **Root Directory:** `client`
3. Framework preset: **Vite** (Build `npm run build`, Output `dist`).
4. Env vars: none required. (Optionally `VITE_API_URL=/api/v1`.)
5. Deploy. `vercel.json` handles the `/api` rewrite and SPA fallback.

## After the client is live

The server already sets cookies as `SameSite=None; Secure`, which works for
both the proxy and any direct cross-site call — no server change is required.

For defence-in-depth (direct cross-origin API calls from a browser), set the
server project's `CLIENT_URL` env var to the deployed client origin and
redeploy the server. Not needed for the proxied same-origin flow.
