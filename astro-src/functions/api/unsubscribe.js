// GET: トークンを検証して確認画面を表示するだけ（この時点では解除しない）。
// メールクライアントによるリンク先読みで誤って解除されるのを防ぐため。
// POST: 確認画面のフォーム送信を受けて実際に解除する。

function page(title, bodyHtml, status = 200) {
  const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | 鋸歯生物図鑑</title>
<style>
  :root {
    --bg: #ffffff; --ink: #111110; --ink2: #444441; --ink3: #888780;
    --g: #3b6d11; --red: #d85a30; --br: rgba(17,17,16,0.10);
    --mono: "Share Tech Mono", monospace; --sans: "Noto Sans JP", sans-serif;
  }
  body {
    background: var(--bg); color: var(--ink); font-family: var(--sans);
    max-width: 480px; margin: 80px auto; padding: 0 24px; line-height: 1.7;
  }
  h1 { font-family: var(--mono); font-size: 18px; letter-spacing: 0.05em; margin-bottom: 24px; }
  p { color: var(--ink2); }
  button {
    font-family: var(--mono); background: var(--g); color: #fff; border: none;
    padding: 12px 24px; margin-top: 24px; cursor: pointer; font-size: 14px;
  }
  .err { color: var(--red); }
  a { color: var(--g); }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
  return new Response(html, { status, headers: { 'content-type': 'text/html; charset=utf-8' } });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const token = new URL(request.url).searchParams.get('token') ?? '';

  if (!token) {
    return page('配信停止', '<h1>配信停止</h1><p class="err">トークンが指定されていません。</p>', 400);
  }

  const sub = await env.DB.prepare(
    'SELECT species_id, unsubscribed_at FROM subscriptions WHERE unsubscribe_token = ?1'
  ).bind(token).first();

  if (!sub) {
    return page('配信停止', '<h1>配信停止</h1><p class="err">無効なリンクです。</p>', 404);
  }

  if (sub.unsubscribed_at) {
    return page('配信停止', '<h1>配信停止</h1><p>この登録はすでに配信停止済みです。</p>');
  }

  return page('配信停止の確認', `
    <h1>配信停止の確認</h1>
    <p>No.${escapeHtml(sub.species_id)} の通知登録を解除します。よろしいですか？</p>
    <form method="POST" action="/api/unsubscribe">
      <input type="hidden" name="token" value="${escapeHtml(token)}">
      <button type="submit">配信を停止する</button>
    </form>
  `);
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // トークンは (1) 確認画面のフォーム送信ではPOSTボディ、
  // (2) RFC 8058 List-Unsubscribe-Post によるメールクライアントの自動POSTでは
  // List-Unsubscribeヘッダに入れたURLのクエリ文字列、の2箇所どちらかに入る。
  let token = '';
  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    const body = await request.json().catch(() => ({}));
    token = typeof body?.token === 'string' ? body.token : '';
  } else {
    const form = await request.formData().catch(() => null);
    token = form ? String(form.get('token') ?? '') : '';
  }
  if (!token) {
    token = new URL(request.url).searchParams.get('token') ?? '';
  }

  if (!token) {
    return page('配信停止', '<h1>配信停止</h1><p class="err">トークンが指定されていません。</p>', 400);
  }

  const result = await env.DB.prepare(
    `UPDATE subscriptions SET unsubscribed_at = datetime('now')
     WHERE unsubscribe_token = ?1 AND unsubscribed_at IS NULL`
  ).bind(token).run();

  if (result.meta.changes === 0) {
    const sub = await env.DB.prepare(
      'SELECT id FROM subscriptions WHERE unsubscribe_token = ?1'
    ).bind(token).first();
    if (!sub) {
      return page('配信停止', '<h1>配信停止</h1><p class="err">無効なリンクです。</p>', 404);
    }
    return page('配信停止', '<h1>配信停止</h1><p>この登録はすでに配信停止済みです。</p>');
  }

  return page('配信停止しました', '<h1>配信停止しました</h1><p>通知登録を解除しました。ご利用ありがとうございました。</p>');
}
