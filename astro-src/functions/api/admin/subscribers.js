import { jsonResponse } from '../_lib/http.js';

export async function onRequestGet(context) {
  const { env } = context;

  const { results } = await env.DB.prepare(`
    SELECT
      species_id,
      SUM(CASE WHEN unsubscribed_at IS NULL THEN 1 ELSE 0 END) AS active_count,
      MAX(last_notified_at) AS last_notified_at
    FROM subscriptions
    GROUP BY species_id
  `).all();

  return jsonResponse({ subscribers: results });
}
