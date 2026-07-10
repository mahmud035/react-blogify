/* eslint-disable no-console */
/**
 * End-to-end smoke test. Exercises every endpoint against a running server and
 * asserts status codes + the response envelope shape. Works locally or against
 * a deployed URL via BASE_URL.
 *
 *   npm run smoke                        # http://localhost:3000
 *   BASE_URL=https://api.example.com npm run smoke
 */

const BASE = (process.env.BASE_URL ?? 'http://localhost:3000').replace(
  /\/$/,
  '',
);
const API = `${BASE}/api/v1`;

let passed = 0;
let failed = 0;

function check(label: string, cond: boolean, detail?: unknown): void {
  if (cond) {
    passed++;
    console.log(`  \x1b[32m✓\x1b[0m ${label}`);
  } else {
    failed++;
    console.log(`  \x1b[31m✗ ${label}\x1b[0m`);
    if (detail !== undefined) console.log('     ', JSON.stringify(detail));
  }
}

/** Minimal cookie jar so we can drive the HTTP-only cookie auth flow. */
class Jar {
  private cookies = new Map<string, string>();

  store(res: Response): void {
    for (const c of res.headers.getSetCookie()) {
      const [pair] = c.split(';');
      const idx = pair.indexOf('=');
      const name = pair.slice(0, idx).trim();
      const value = pair.slice(idx + 1).trim();
      if (value === '' || value === 'undefined') this.cookies.delete(name);
      else this.cookies.set(name, value);
    }
  }

  header(): Record<string, string> {
    if (this.cookies.size === 0) return {};
    return {
      Cookie: [...this.cookies].map(([k, v]) => `${k}=${v}`).join('; '),
    };
  }

  has(name: string): boolean {
    return this.cookies.has(name);
  }
}

type Res = { status: number; body: any };

async function req(
  method: string,
  path: string,
  opts: { jar?: Jar; json?: unknown; form?: FormData } = {},
): Promise<Res> {
  const headers: Record<string, string> = { ...(opts.jar?.header() ?? {}) };
  let body: string | FormData | undefined;
  if (opts.json !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(opts.json);
  } else if (opts.form) {
    body = opts.form;
  }
  const res = await fetch(`${API}${path}`, { method, headers, body });
  opts.jar?.store(res);
  const text = await res.text();
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = text;
  }
  return { status: res.status, body: parsed };
}

function isEnvelope(b: any): boolean {
  return (
    b &&
    typeof b === 'object' &&
    typeof b.statusCode === 'number' &&
    typeof b.success === 'boolean' &&
    typeof b.message === 'string' &&
    'data' in b
  );
}

/** A tiny 1x1 PNG for upload tests. */
function pngBlob(): Blob {
  const b64 =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  return new Blob([Buffer.from(b64, 'base64')], { type: 'image/png' });
}

const rnd = Math.random().toString(36).slice(2, 8);

async function main() {
  console.log(`\nSmoke test → ${API}\n`);

  // ---- Health & root ----
  console.log('Health');
  let r = await req('GET', '/health');
  check('GET /health 200 + envelope', r.status === 200 && isEnvelope(r.body), r.body);

  // ---- Auth ----
  console.log('\nAuth');
  const jarA = new Jar();
  const emailA = `alice-${rnd}@example.com`;
  r = await req('POST', '/auth/register', {
    jar: jarA,
    json: {
      firstName: 'Alice',
      lastName: 'Doe',
      email: emailA,
      password: 'secret123',
    },
  });
  check('register 201', r.status === 201 && isEnvelope(r.body), r.body);
  check('register sets auth cookies', jarA.has('accessToken') && jarA.has('refreshToken'));
  const userAId = r.body?.data?.user?.id as string;
  check('register returns user.id, no password', !!userAId && !('password' in (r.body?.data?.user ?? {})));

  r = await req('POST', '/auth/register', {
    json: { firstName: 'Alice', lastName: 'Doe', email: emailA, password: 'secret123' },
  });
  check('duplicate email 409', r.status === 409, r.body);

  r = await req('POST', '/auth/register', {
    json: { firstName: '', email: 'nope', password: '12' },
  });
  check('invalid register 400 + errorSources', r.status === 400 && Array.isArray(r.body?.errorSources), r.body);

  r = await req('POST', '/auth/login', { jar: jarA, json: { email: emailA, password: 'secret123' } });
  check('login 200', r.status === 200 && isEnvelope(r.body), r.body);

  r = await req('POST', '/auth/login', { json: { email: emailA, password: 'wrong' } });
  check('wrong password 401', r.status === 401, r.body);

  // ---- Profile ----
  console.log('\nProfile');
  r = await req('GET', `/profile/${userAId}`);
  check('public profile 200 + blogs array', r.status === 200 && Array.isArray(r.body?.data?.blogs), r.body);

  r = await req('PATCH', '/profile', { json: { bio: 'no cookie' } });
  check('update profile without cookie 401', r.status === 401, r.body);

  r = await req('PATCH', '/profile', { jar: jarA, json: { bio: 'Hello world', firstName: 'Alicia' } });
  check('update profile 200 + fields applied', r.status === 200 && r.body?.data?.user?.bio === 'Hello world' && r.body?.data?.user?.firstName === 'Alicia', r.body);

  // Avatar upload (only if Cloudinary configured on the server)
  const form = new FormData();
  form.append('avatar', pngBlob(), 'a.png');
  r = await req('POST', '/profile/avatar', { jar: jarA, form });
  if (r.status === 200) {
    check('avatar upload 200 + Cloudinary URL', typeof r.body?.data?.user?.avatar === 'string' && r.body.data.user.avatar.startsWith('http'), r.body);
  } else {
    console.log(`  \x1b[33m~\x1b[0m avatar upload skipped (status ${r.status} — Cloudinary likely unconfigured)`);
  }

  // ---- Second user (for authorization checks) ----
  const jarB = new Jar();
  const emailB = `bob-${rnd}@example.com`;
  r = await req('POST', '/auth/register', {
    jar: jarB,
    json: { firstName: 'Bob', lastName: 'Roe', email: emailB, password: 'secret123' },
  });
  const userBId = r.body?.data?.user?.id as string;

  // ---- Blogs ----
  console.log('\nBlogs');
  r = await req('POST', '/blogs', {
    json: { title: 'x', content: 'y' },
  });
  check('create blog without cookie 401', r.status === 401, r.body);

  r = await req('POST', '/blogs', {
    jar: jarA,
    json: { title: `Unit Testing in Node ${rnd}`, content: 'A'.repeat(400), tags: 'node, testing, js' },
  });
  check('create blog 201 + tags normalized', r.status === 201 && Array.isArray(r.body?.data?.blog?.tags) && r.body.data.blog.tags.length === 3, r.body);
  const blogId = r.body?.data?.blog?.id as string;
  check('created blog author populated', r.body?.data?.blog?.author?.firstName != null, r.body?.data?.blog?.author);

  r = await req('GET', '/blogs?page=1&limit=10');
  check('list blogs 200 + shape', r.status === 200 && Array.isArray(r.body?.data?.blogs) && typeof r.body?.data?.total === 'number', r.body);
  const listed = (r.body?.data?.blogs ?? []).find((b: any) => b.id === blogId);
  check('list truncates long content', !!listed && String(listed.content).endsWith('...') && listed.content.length <= 184, listed?.content?.length);

  r = await req('GET', `/blogs/${blogId}`, { jar: jarA });
  check('single blog 200 + full content + isFavourite/isLiked', r.status === 200 && r.body?.data?.content?.length === 400 && r.body?.data?.isFavourite === false && r.body?.data?.isLiked === false, { fav: r.body?.data?.isFavourite, liked: r.body?.data?.isLiked, len: r.body?.data?.content?.length });

  r = await req('PATCH', `/blogs/${blogId}`, { jar: jarB, json: { title: 'hijack' } });
  check("cannot edit another user's blog 403", r.status === 403, r.body);

  r = await req('PATCH', `/blogs/${blogId}`, { jar: jarA, json: { title: 'Updated Title' } });
  check('author can update blog 200', r.status === 200 && r.body?.data?.blog?.title === 'Updated Title', r.body);

  r = await req('POST', `/blogs/${blogId}/like`, { jar: jarA });
  check('like blog 200 + isLiked true + likes[]', r.status === 200 && r.body?.data?.isLiked === true && r.body?.data?.likes?.length === 1, r.body);
  r = await req('POST', `/blogs/${blogId}/like`, { jar: jarA });
  check('unlike blog toggles off', r.status === 200 && r.body?.data?.isLiked === false && r.body?.data?.likes?.length === 0, r.body);

  r = await req('PATCH', `/blogs/${blogId}/favourite`, { jar: jarA });
  check('favourite blog 200 + isFavourite true', r.status === 200 && r.body?.data?.isFavourite === true, r.body);
  r = await req('GET', '/blogs/favourites', { jar: jarA });
  check('favourites list contains blog', r.status === 200 && (r.body?.data?.blogs ?? []).some((b: any) => b.id === blogId), r.body);

  r = await req('POST', `/blogs/${blogId}/comment`, { jar: jarB, json: { content: 'Great post!' } });
  check('add comment 201 + comments[]', r.status === 201 && r.body?.data?.comments?.length === 1 && r.body?.data?.comments[0]?.author?.firstName === 'Bob', r.body);
  const commentId = r.body?.data?.comments?.[0]?.id as string;

  r = await req('DELETE', `/blogs/${blogId}/comment/${commentId}`, { jar: jarA });
  check('blog author can delete any comment 200', r.status === 200 && r.body?.data?.comments?.length === 0, r.body);

  r = await req('GET', '/blogs/popular');
  check('popular blogs 200', r.status === 200 && Array.isArray(r.body?.data?.blogs), r.body);

  r = await req('GET', `/search?q=${encodeURIComponent('Updated Title')}`);
  check('search 200 + results/count/query', r.status === 200 && r.body?.data?.count >= 1 && Array.isArray(r.body?.data?.results) && r.body?.data?.query === 'Updated Title', r.body);
  r = await req('GET', '/search');
  check('search without q 400', r.status === 400, r.body);

  r = await req('DELETE', `/blogs/${blogId}`, { jar: jarB });
  check("cannot delete another user's blog 403", r.status === 403, r.body);
  r = await req('DELETE', `/blogs/${blogId}`, { jar: jarA });
  check('author can delete blog 200', r.status === 200, r.body);
  r = await req('GET', `/blogs/${blogId}`);
  check('deleted blog now 404', r.status === 404, r.body);
  void userBId;

  // ---- Token refresh / logout ----
  console.log('\nSession');
  r = await req('POST', '/auth/refresh-token', { jar: jarA });
  check('refresh-token 200', r.status === 200, r.body);
  r = await req('POST', '/auth/logout', { jar: jarA });
  check('logout 200', r.status === 200, r.body);
  r = await req('POST', '/auth/refresh-token', { jar: jarA });
  check('refresh after logout 401', r.status === 401, r.body);

  console.log(`\n\x1b[1mResult:\x1b[0m ${passed} passed, ${failed} failed\n`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
