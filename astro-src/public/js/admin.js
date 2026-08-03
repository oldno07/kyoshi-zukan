(function () {
  const rows = document.querySelectorAll('#admin-rows tr[data-species-id]:not(.sub-row)');
  const subscriberCache = new Map();

  function formatDate(iso) {
    if (!iso) return '未送信';
    return iso.replace('T', ' ').slice(0, 16);
  }

  function showMsg(el, text, isError) {
    el.textContent = text;
    el.hidden = false;
    el.classList.toggle('is-error', !!isError);
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  function renderSubscribers(container, speciesId, subscribers) {
    if (subscribers.length === 0) {
      container.innerHTML = '<p class="sub-empty">購読者はいません。</p>';
      return;
    }

    const rowsHtml = subscribers.map((s) => {
      const isUnsubscribed = !!s.unsubscribed_at;
      return `
        <tr data-subscription-id="${s.id}">
          <td>${escapeHtml(s.email)}</td>
          <td>${formatDate(s.created_at)}</td>
          <td>${formatDate(s.unsubscribed_at)}</td>
          <td>${formatDate(s.last_notified_at)}</td>
          <td>
            ${isUnsubscribed
              ? '<span class="unsubscribed">停止済み</span>'
              : '<button type="button" class="js-unsub-btn">配信停止</button>'}
            <p class="msg js-sub-msg" hidden></p>
          </td>
        </tr>`;
    }).join('');

    container.innerHTML = `
      <table class="sub-table">
        <thead>
          <tr>
            <th>メールアドレス</th>
            <th>登録日</th>
            <th>配信停止日</th>
            <th>最終通知日</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>`;

    container.querySelectorAll('.js-unsub-btn').forEach((btn) => {
      btn.addEventListener('click', () => unsubscribe(btn, speciesId));
    });
  }

  async function unsubscribe(btn, speciesId) {
    const tr = btn.closest('tr');
    const subscriptionId = Number(tr.dataset.subscriptionId);
    const msg = tr.querySelector('.js-sub-msg');
    btn.disabled = true;

    try {
      const res = await fetch('/api/admin/unsubscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ subscriptionId }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && (data.status === 'unsubscribed' || data.status === 'not_found')) {
        const cell = btn.parentElement;
        cell.innerHTML = '<span class="unsubscribed">停止済み</span>';
        const cached = subscriberCache.get(speciesId);
        const sub = cached && cached.find((s) => s.id === subscriptionId);
        if (sub) sub.unsubscribed_at = sub.unsubscribed_at || new Date().toISOString();
      } else {
        showMsg(msg, '配信停止に失敗しました。', true);
        btn.disabled = false;
      }
    } catch {
      showMsg(msg, '配信停止に失敗しました。', true);
      btn.disabled = false;
    }
  }

  async function toggleDetail(row, speciesId) {
    const subRow = document.querySelector(`.sub-row[data-species-id="${speciesId}"]`);
    if (!subRow) return;

    if (subRow.classList.contains('is-open')) {
      subRow.classList.remove('is-open');
      return;
    }

    const container = subRow.querySelector('.js-sub-content');

    if (!subscriberCache.has(speciesId)) {
      container.innerHTML = '<p class="sub-empty">読み込み中...</p>';
      subRow.classList.add('is-open');
      try {
        const res = await fetch(`/api/admin/subscribers/${encodeURIComponent(speciesId)}`);
        const data = await res.json();
        subscriberCache.set(speciesId, data.subscribers || []);
      } catch {
        container.innerHTML = '<p class="sub-empty">読み込みに失敗しました。</p>';
        return;
      }
    } else {
      subRow.classList.add('is-open');
    }

    renderSubscribers(container, speciesId, subscriberCache.get(speciesId));
  }

  async function sendNotify(row, speciesId, count) {
    if (!window.confirm(`${count}名へ通知を送信します。よろしいですか？`)) return;

    const btn = row.querySelector('.js-notify-btn');
    const msg = row.querySelector('.js-msg');
    btn.disabled = true;
    msg.hidden = true;

    try {
      const res = await fetch('/api/admin/notify', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ speciesId }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.status === 'sent') {
        row.querySelector('.js-last').textContent = formatDate(data.sentAt);
        showMsg(msg, `${data.recipientCount}名へ送信しました。`, false);
      } else if (data.error === 'daily_limit_exceeded') {
        showMsg(msg, '本日の送信上限に達しています。', true);
      } else if (data.error === 'no_subscribers') {
        showMsg(msg, '通知待ちの購読者がいません。', true);
      } else {
        showMsg(msg, '送信に失敗しました。', true);
      }
    } catch {
      showMsg(msg, '送信に失敗しました。', true);
    } finally {
      btn.disabled = false;
    }
  }

  async function loadCounts() {
    let subscribers = [];
    try {
      const res = await fetch('/api/admin/subscribers');
      const data = await res.json();
      subscribers = data.subscribers || [];
    } catch {
      // 一覧の骨組みは表示したままにする
    }
    const bySpecies = new Map(subscribers.map((s) => [s.species_id, s]));

    rows.forEach((row) => {
      const speciesId = row.dataset.speciesId;
      const sub = bySpecies.get(speciesId);
      const count = sub ? sub.active_count : 0;

      row.querySelector('.js-count').textContent = `${count}名`;
      row.querySelector('.js-last').textContent = formatDate(sub && sub.last_notified_at);

      const btn = row.querySelector('.js-notify-btn');
      btn.disabled = count === 0;
      btn.addEventListener('click', () => sendNotify(row, speciesId, count));

      row.querySelector('.js-detail-btn').addEventListener('click', () => toggleDetail(row, speciesId));
    });
  }

  loadCounts();
})();
