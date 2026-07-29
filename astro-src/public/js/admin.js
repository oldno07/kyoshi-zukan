(function () {
  const rows = document.querySelectorAll('#admin-rows tr');

  function formatDate(iso) {
    if (!iso) return '未送信';
    return iso.replace('T', ' ').slice(0, 16);
  }

  function showMsg(el, text, isError) {
    el.textContent = text;
    el.hidden = false;
    el.classList.toggle('is-error', !!isError);
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
    });
  }

  loadCounts();
})();
