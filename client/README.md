# React Blogify — Client

🔗 **Live:** [react-blogify-client.vercel.app](https://react-blogify-client.vercel.app/)

React 19 + TypeScript + Vite front end for the [React Blogify](../README.md) platform.
Feature-driven, with all server state through TanStack Query and forms via React-Hook-Form + Zod.

## Stack

- **React 19** · **TypeScript** · **Vite** · **Tailwind v4**
- **React Router v7** — route-level code splitting (`lazy` per page)
- **TanStack Query v5** — all server state (queries, mutations, cache invalidation)
- **React-Hook-Form + Zod** — typed forms and validation
- **Axios** — single instance, `baseURL` `/api/v1`, `withCredentials` for cookie auth
- **react-toastify** — notifications

## Architecture

```
src/
  app/          main.tsx · providers (QueryClient, Auth) · router (lazy routes)
  features/     auth · blog · profile · search   ← mirror backend modules 1:1
    <feature>/  *.api.ts · *.schema.ts · components/ · hooks/ · pages/
  components/
    layout/     Header · Footer · MainLayout · NotFoundPage
    ui/         Field · Loader · Skeleton · EmptyState · ErrorMessage
  hooks/        useDebounce · useDocumentTitle
  lib/          axios · queryKeys · cn · formClasses
  types/  utils/  styles/
```

No cross-feature imports — shared logic lives in `components/ui`, `hooks/`, or `lib/`.
Every data view defines explicit loading (skeletons), empty, and error states.

## Auth & same-origin cookies

Auth uses HTTP-only JWT cookies, so the API must be **same-origin** with the app. The client
only ever calls `/api/v1` on its own origin:

- **Dev** — `vite.config.ts` proxies `/api` → the API (`VITE_PROXY_TARGET`, defaults to the deployed server).
- **Prod** — `vercel.json` rewrites `/api/*` → the deployed API.

No env var is required; `VITE_API_URL` defaults to `/api/v1`. See [`DEPLOYMENT.md`](./DEPLOYMENT.md).

## Local development

```bash
npm install
cp .env.example .env      # optional — defaults work out of the box
npm run dev               # http://localhost:5173
npm run build             # tsc --noEmit && vite build
npm run typecheck         # tsc --noEmit
npm run lint              # eslint
```

The backend API lives in [`../server`](../server). See the [root README](../README.md) to run
the full stack.
