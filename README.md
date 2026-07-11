# React Blogify

🔗 **Live:** [react-blogify-client.vercel.app](https://react-blogify-client.vercel.app/)

🔗 **API:** [react-blogify-server.vercel.app](https://react-blogify-server.vercel.app)

A full-stack blogging platform: write, publish, and browse blogs with rich profiles,
comments, likes, favourites, and search. Originally a 2024 React + `json-server`
assignment, rebuilt into a typed **MERN** stack — React 19 on the front end, an
Express 5 + MongoDB API on the back end — with HTTP-only cookie auth and Cloudinary media.

## Monorepo layout

```
client/   React 19 · TypeScript · Vite · Tailwind v4 — features mirror backend domains 1:1
server/   Express 5 · TypeScript · Mongoose — feature-driven API, JWT cookies, Cloudinary
```

Each side has its own detailed README: [`client/README.md`](./client/README.md) ·
[`server/README.md`](./server/README.md).

## Features

- **Auth** — register / login / logout with JWT access + refresh tokens in **HTTP-only cookies**; silent refresh, protected routes.
- **Blogs** — create, edit, and delete posts (author-only) with a thumbnail image, tags, and content.
- **Feed** — infinite-scroll blog list via the Intersection Observer API; a separate "popular blogs" panel.
- **Engagement** — like and favourite toggles, and threaded comments (delete your own).
- **Profiles** — public profile pages listing a user's blogs and favourites; edit your name, bio, and avatar.
- **Search** — debounced title search.
- **Every data view** defines explicit loading (skeletons), empty, and error states.

## Stack

|             |                                                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------- |
| **client/** | React 19 · TypeScript · Vite · Tailwind v4 · React Router v7 · TanStack Query v5 · React-Hook-Form + Zod · Axios |
| **server/** | Express 5 · TypeScript · Mongoose · MongoDB Atlas · JWT (HTTP-only cookie) · Zod · Cloudinary · Multer           |

## Architecture

- **Feature-driven** on both sides. The client's `features/` (auth, blog, profile, search)
  map 1:1 to the server's `modules/`. All server state flows through TanStack Query.
- **Layered modules** on the server: `route` (wiring) → `controller` (HTTP, never DB) →
  `service` (logic + DB) → `validation` (Zod) → `model` / `interface`.
- **Same-origin auth** — the client only ever calls `/api/v1` on its own origin (Vite proxy in
  dev, Vercel rewrite in prod), so the JWT cookies stay first-party. See
  [`client/DEPLOYMENT.md`](./client/DEPLOYMENT.md).
- **Uniform envelope** — every endpoint returns `{ statusCode, success, message, data }`.

## Running locally

```bash
git clone git@github.com:mahmud035/react-blogify.git
cd react-blogify
```

**Server** (port 3000):

```bash
cd server
cp .env.example .env      # set MONGODB_URI + JWT secrets (Cloudinary for media)
npm install
npm run dev
npm run seed              # optional: migrate database/db.json → Mongo (+ Cloudinary)
```

**Client** (port 5173):

```bash
cd client
npm install
npm run dev               # proxies /api → the deployed API by default
```

## Test account

```
Email:    mhpcse@gmail.com
Password: 11111111
```

The seed preserves the original bcrypt-hashed passwords, so this account works against a
freshly seeded database.

## Deployment

Both apps deploy to **Vercel** as separate projects (Root Directory `client` and `server`).
The client's `vercel.json` rewrites `/api/*` to the deployed API, keeping auth cookies
first-party. Details in each side's README and [`client/DEPLOYMENT.md`](./client/DEPLOYMENT.md).
