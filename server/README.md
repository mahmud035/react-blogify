# React Blogify — Server (API)

Express 5 + TypeScript + MongoDB/Mongoose 9, feature-driven architecture.
Auth via HTTP-only cookie JWTs, media on Cloudinary, uniform response envelope.

## Response envelope

Every endpoint returns:

```json
{ "statusCode": 200, "success": true, "message": "…", "data": … }
```

Errors add an `errorSources: [{ path, message }]` array (and a `stack` outside production).

## Architecture

```
src/
  config/        env validation (Zod) + cached Mongo connection (serverless-safe)
  middlewares/   auth (cookie JWT), validateRequest (Zod), upload (multer→memory),
                 globalErrorHandler, notFound
  utils/         sendResponse, AppError, catchAsync, jwt, cloudinary
  modules/
    auth/        register · login · refresh · logout
    user/        User model + /profile endpoints
    blog/        Blog model + all blog endpoints
    search/      title search
  routes/        central router (mounted at /api/v1)
  app.ts         express app (no listen)   server.ts  local bootstrap
api/index.ts     Vercel serverless entry
scripts/         seed.ts (db.json → Mongo + images → Cloudinary), smoke.ts (E2E test)
```

Module pattern per feature: `*.route.ts` (wiring only) · `*.controller.ts` (HTTP, never DB) ·
`*.service.ts` (logic + DB) · `*.validation.ts` (Zod) · `*.model.ts` · `*.interface.ts`.

## API

Base path: `/api/v1`. 🔒 = requires auth cookie · 🔓 = enriched if authed.

| Method | Path | Auth | Body / Query |
|---|---|---|---|
| GET | `/health` | — | — |
| POST | `/auth/register` | — | `firstName, lastName, email, password` |
| POST | `/auth/login` | — | `email, password` |
| POST | `/auth/refresh-token` | cookie | — |
| POST | `/auth/logout` | — | — |
| GET | `/blogs` | — | `?page=1&limit=10` |
| POST | `/blogs` | 🔒 | multipart: `title, content, tags`, file `thumbnail` |
| GET | `/blogs/popular` | — | `?limit=5` |
| GET | `/blogs/favourites` | 🔒 | — |
| GET | `/blogs/:postId` | 🔓 | — (adds `isFavourite`, `isLiked`) |
| PATCH | `/blogs/:postId` | 🔒 author | multipart: fields + `thumbnail` |
| DELETE | `/blogs/:postId` | 🔒 author | — |
| POST | `/blogs/:postId/like` | 🔒 | — (toggle) |
| PATCH | `/blogs/:postId/favourite` | 🔒 | — (toggle) |
| POST | `/blogs/:postId/comment` | 🔒 | `content` |
| DELETE | `/blogs/:postId/comment/:commentId` | 🔒 author of comment/blog | — |
| GET | `/profile/:userId` | — | — (+ user's `blogs`, `favourites`) |
| PATCH | `/profile` | 🔒 | multipart: `firstName, lastName, bio`, file `avatar` |
| POST | `/profile/avatar` | 🔒 | multipart file `avatar` |
| GET | `/search` | — | `?q=term` |

## Environment

Copy `.env.example` → `.env`. Required: `MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`.
Cloudinary (`CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) is required only for media features.
`CLIENT_URL` is the allowed CORS origin.

## Local development

```bash
npm install
cp .env.example .env      # fill in secrets
npm run dev               # tsx watch → http://localhost:3000
npm run seed              # migrate db.json → Mongo (+ Cloudinary if configured)
npm run smoke             # E2E test against a running server
npm run build             # tsc typecheck/emit
```

## Deploy (Vercel)

Separate Vercel project with **Root Directory = `server`**. `vercel.json` uses an explicit
`builds` entry so Vercel builds only `api/index.ts` as a `@vercel/node` serverless function
(compiling TS and bundling `src/`) and routes every request to it — no build command or output
directory is needed.

1. New Project → import `mahmud035/react-blogify` → **Root Directory = `server`**.
   Framework Preset = Other. Leave Build Command / Output Directory empty (the `builds` config
   handles it).
2. Add env vars (Production): `NODE_ENV=production`, `MONGODB_URI` (Atlas), `JWT_ACCESS_SECRET`,
   `JWT_REFRESH_SECRET`, `JWT_ACCESS_EXPIRES_IN`, `JWT_REFRESH_EXPIRES_IN`,
   `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, and `CLIENT_URL`
   (the deployed client origin — set once the client is live in Phase 2).
3. Deploy. The Atlas DB is already seeded; re-run `MONGODB_URI="<atlas>" npm run seed` only to reset.
4. Smoke-test the deployment: `BASE_URL="https://<deployment>" npm run smoke`.

Cross-site cookies: production sets `SameSite=None; Secure`, so the API must be HTTPS and
`CLIENT_URL` must exactly match the client origin for `credentials` requests to work.
