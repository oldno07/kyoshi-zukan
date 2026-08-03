import { jsonResponse } from '../_lib/http.js';

// 論理削除（配信停止）専用。物理削除エンドポイントは作らない。
export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_request' }, 400);
  }

  const subscriptionId = Number.isInteger(body?.subscriptionId) ? body.subscriptionId : null;
  if (!subscriptionId) {
    return jsonResponse({ error: 'invalid_request' }, 400);
  }

  const result = await env.DB.prepare(
    `UPDATE subscriptions SET unsubscribed_at = datetime('now')
     WHERE id = ?1 AND unsubscribed_at IS NULL`
  ).bind(subscriptionId).run();

  if (result.meta.changes === 0) {
    return jsonResponse({ status: 'not_found' });
  }

  return jsonResponse({ status: 'unsubscribed' });
}
