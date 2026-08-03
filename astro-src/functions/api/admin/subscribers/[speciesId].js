import { jsonResponse } from '../../_lib/http.js';

export async function onRequestGet(context) {
  const { env, params } = context;
  const speciesId = params.speciesId;

  const { results } = await env.DB.prepare(
    `SELECT id, email, created_at, unsubscribed_at, last_notified_at
     FROM subscriptions
     WHERE species_id = ?1
     ORDER BY created_at DESC`
  ).bind(speciesId).all();

  return jsonResponse({ subscribers: results });
}
