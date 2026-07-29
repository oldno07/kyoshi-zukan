import { jsonResponse } from './_lib/http.js';

// IP単位のレート制限はCloudflare Rate Limiting Rules（ダッシュボード側）で
// このパスに設定する想定。ここでは行わない。

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_request' }, 400);
  }

  const speciesId = typeof body?.speciesId === 'string' ? body.speciesId : '';
  const rawEmail = typeof body?.email === 'string' ? body.email : '';
  const turnstileToken = typeof body?.turnstileToken === 'string' ? body.turnstileToken : '';

  if (!speciesId) {
    return jsonResponse({ error: 'invalid_request' }, 400);
  }

  const email = rawEmail.trim().toLowerCase();
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return jsonResponse({ error: 'invalid_email' }, 400);
  }

  if (!turnstileToken) {
    return jsonResponse({ error: 'turnstile_required' }, 400);
  }

  const ip = request.headers.get('CF-Connecting-IP') ?? undefined;
  const verified = await verifyTurnstile(turnstileToken, ip, env.TURNSTILE_SECRET_KEY);
  if (!verified) {
    return jsonResponse({ error: 'turnstile_failed' }, 403);
  }

  const existing = await env.DB.prepare(
    'SELECT id, unsubscribed_at FROM subscriptions WHERE species_id = ?1 AND email = ?2'
  ).bind(speciesId, email).first();

  if (existing && existing.unsubscribed_at === null) {
    return jsonResponse({ status: 'already_subscribed' });
  }

  const unsubscribeToken = crypto.randomUUID();

  if (existing) {
    // 配信停止済みアドレスの再登録。明示的な再同意とみなし unsubscribed_at を戻す
    await env.DB.prepare(
      'UPDATE subscriptions SET unsubscribed_at = NULL, unsubscribe_token = ?1 WHERE id = ?2'
    ).bind(unsubscribeToken, existing.id).run();
    return jsonResponse({ status: 'resubscribed' });
  }

  try {
    await env.DB.prepare(
      'INSERT INTO subscriptions (species_id, email, unsubscribe_token) VALUES (?1, ?2, ?3)'
    ).bind(speciesId, email, unsubscribeToken).run();
    return jsonResponse({ status: 'registered' }, 201);
  } catch (err) {
    // UNIQUE(species_id, email) 制約違反 = 直前のSELECTと競合した重複登録
    if (String(err).includes('UNIQUE')) {
      return jsonResponse({ status: 'already_subscribed' });
    }
    throw err;
  }
}

async function verifyTurnstile(token, ip, secret) {
  if (!secret) return false;

  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
    });
    const outcome = await res.json();
    return outcome.success === true;
  } catch {
    // siteverify に到達できない/想定外レスポンスの場合は未検証として扱う
    return false;
  }
}
