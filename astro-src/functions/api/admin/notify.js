import { jsonResponse } from '../_lib/http.js';

const DAILY_LIMIT = 300; // Brevo無料枠

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_request' }, 400);
  }

  const speciesId = typeof body?.speciesId === 'string' ? body.speciesId : '';
  if (!speciesId) {
    return jsonResponse({ error: 'invalid_request' }, 400);
  }

  if (!env.BREVO_API_KEY || !env.BREVO_SENDER_EMAIL) {
    return jsonResponse({ error: 'server_error' }, 500);
  }

  const creature = await lookupCreature(request, speciesId);
  if (!creature) {
    return jsonResponse({ error: 'unknown_species' }, 404);
  }

  const { results: recipients } = await env.DB.prepare(
    `SELECT email, unsubscribe_token FROM subscriptions
     WHERE species_id = ?1 AND unsubscribed_at IS NULL`
  ).bind(speciesId).all();

  if (recipients.length === 0) {
    return jsonResponse({ error: 'no_subscribers' }, 400);
  }

  const sentToday = await getSentCountToday(env);
  if (sentToday + recipients.length > DAILY_LIMIT) {
    return jsonResponse({ error: 'daily_limit_exceeded' }, 429);
  }

  const pageUrl =
    `https://pelicanworks.site/zukan/${creature.slug}/` +
    `?utm_source=email&utm_medium=notification&utm_campaign=restock_${speciesId}`;

  const outcomes = await Promise.allSettled(
    recipients.map((r) => sendBrevoEmail(env, creature, pageUrl, r))
  );

  const succeeded = recipients.filter((_, i) => outcomes[i].status === 'fulfilled');
  const allSucceeded = succeeded.length === recipients.length;
  const sentAt = new Date().toISOString();

  const statements = [];
  if (succeeded.length > 0) {
    const placeholders = succeeded.map(() => '?').join(',');
    statements.push(
      env.DB.prepare(
        `UPDATE subscriptions SET last_notified_at = ?
         WHERE species_id = ? AND email IN (${placeholders})`
      ).bind(sentAt, speciesId, ...succeeded.map((r) => r.email))
    );
  }
  statements.push(
    env.DB.prepare(
      `INSERT INTO notification_logs (species_id, sent_at, recipient_count, success)
       VALUES (?1, ?2, ?3, ?4)`
    ).bind(speciesId, sentAt, succeeded.length, allSucceeded ? 1 : 0)
  );
  await env.DB.batch(statements);

  if (succeeded.length === 0) {
    return jsonResponse({ error: 'send_failed' }, 502);
  }

  return jsonResponse({
    status: 'sent',
    recipientCount: succeeded.length,
    failedCount: recipients.length - succeeded.length,
    sentAt,
  });
}

async function lookupCreature(request, speciesId) {
  const url = new URL('/data/creatures.json', request.url);
  const res = await fetch(url);
  if (!res.ok) return null;
  const list = await res.json();
  return list.find((c) => c.no === speciesId) ?? null;
}

async function getSentCountToday(env) {
  const row = await env.DB.prepare(
    `SELECT COALESCE(SUM(recipient_count), 0) AS total
     FROM notification_logs
     WHERE success = 1 AND sent_at >= datetime('now', 'start of day')`
  ).first();
  return row?.total ?? 0;
}

async function sendBrevoEmail(env, creature, pageUrl, recipient) {
  const unsubscribeUrl =
    `https://pelicanworks.site/api/unsubscribe?token=${encodeURIComponent(recipient.unsubscribe_token)}`;

  const footerName = env.MAIL_SENDER_DISPLAY_NAME ?? env.BREVO_SENDER_EMAIL;
  const footerAddress = env.MAIL_FOOTER_ADDRESS ?? ''; // 要確認：管理者に住所を確認
  const footerContact = env.MAIL_FOOTER_CONTACT ?? ''; // 要確認：管理者に問い合わせ先を確認

  const html = `
    <p>${escapeHtml(creature.name_jp)}（${escapeHtml(creature.name_en)}）の
    譲渡可能な個体をご用意しました。</p>
    <p><a href="${pageUrl}">${pageUrl}</a></p>
    <hr>
    <p style="font-size:12px;color:#888;">
      ${escapeHtml(footerName)}${footerAddress ? ' / ' + escapeHtml(footerAddress) : ''}<br>
      ${footerContact ? escapeHtml(footerContact) + '<br>' : ''}
      配信停止をご希望の場合は<a href="${unsubscribeUrl}">こちら</a>
    </p>
  `;

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'api-key': env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: footerName, email: env.BREVO_SENDER_EMAIL },
      to: [{ email: recipient.email }],
      subject: `【鋸歯生物図鑑】${creature.name_jp} 譲渡可能個体のお知らせ`,
      htmlContent: html,
      headers: {
        'List-Unsubscribe': `<${unsubscribeUrl}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`brevo send failed: ${res.status}`);
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
