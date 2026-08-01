// SOLD OUT個体の譲渡通知登録フォーム（.cd-notify）を制御する。
// Turnstile（invisibleモード）はページ内に複数フォームがあっても
// それぞれ個別のウィジェットとして描画・実行する。

(function () {
  function initWidgets() {
    document.querySelectorAll('.cd-notify').forEach(setupNotify);
  }

  // Turnstileスクリプト（?onload=onloadTurnstileCallback）から呼ばれる
  window.onloadTurnstileCallback = initWidgets;
  // キャッシュ等で既にturnstileが読み込み済みの場合の保険
  if (window.turnstile) initWidgets();

  function setupNotify(container) {
    if (container.dataset.notifyInit) return;

    const form = container.querySelector('.cd-notify-form');
    const input = container.querySelector('.cd-notify-input');
    const btn = container.querySelector('.cd-notify-btn');
    const msg = container.querySelector('.cd-notify-msg');
    const turnstileEl = container.querySelector('.cd-notify-turnstile');

    if (!form || !turnstileEl || !window.turnstile) return;
    container.dataset.notifyInit = '1';

    const speciesId = container.dataset.speciesId;
    let tokenResolve = null;
    let tokenReject = null;

    const widgetId = window.turnstile.render(turnstileEl, {
      sitekey: turnstileEl.dataset.sitekey,
      // invisibleモード相当：size ではなく execution/appearance で指定する。
      // execution: 'execute' で render() 時点の自動実行を止め、
      // appearance: 'interaction-only' でチャレンジ不要時は非表示にする。
      execution: 'execute',
      appearance: 'interaction-only',
      callback: (token) => { if (tokenResolve) tokenResolve(token); },
      'error-callback': () => { if (tokenReject) tokenReject(new Error('turnstile_error')); },
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (btn.disabled) return;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const email = input.value.trim();
      btn.disabled = true;
      hideMessage(msg);

      try {
        const token = await new Promise((resolve, reject) => {
          tokenResolve = resolve;
          tokenReject = reject;
          window.turnstile.execute(widgetId);
        });

        const res = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ speciesId, email, turnstileToken: token }),
        });
        const data = await res.json().catch(() => ({}));

        if (data.status === 'registered' || data.status === 'resubscribed') {
          form.hidden = true;
          showMessage(msg,
            '観測対象として登録しました。現在も研究員が鋸歯生物の捕獲作業を行っています。' +
            '譲渡可能な個体をご用意でき次第、メールでご連絡します。');
        } else if (data.status === 'already_subscribed') {
          form.hidden = true;
          showMessage(msg, 'この個体はすでに通知登録されています。譲渡可能な個体をご用意でき次第、お知らせします。');
        } else if (data.error === 'invalid_email') {
          showMessage(msg, 'メールアドレスの形式が正しくありません。', true);
        } else {
          showMessage(msg, 'エラーが発生しました。時間をおいて再度お試しください。', true);
        }
      } catch {
        showMessage(msg, 'エラーが発生しました。時間をおいて再度お試しください。', true);
      } finally {
        btn.disabled = false;
        window.turnstile.reset(widgetId);
      }
    });
  }

  function showMessage(el, text, isError) {
    if (!el) return;
    el.textContent = text;
    el.hidden = false;
    el.classList.toggle('is-error', !!isError);
  }

  function hideMessage(el) {
    if (!el) return;
    el.hidden = true;
    el.textContent = '';
    el.classList.remove('is-error');
  }
})();
