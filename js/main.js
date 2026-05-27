/* ============================================================
   鋸歯生物図鑑 — main.js
   ============================================================ */

/* ----------------------------------------------------------
   1. Header / Footer 読み込み
   ---------------------------------------------------------- */
async function loadComponent(selector, path) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    el.innerHTML = await res.text();
    console.log("[OK] loaded:", path, "| ENTRIES:", window.ENTRIES?.length);
  } catch (err) {
    console.error("component load failed:", path, err);
    el.innerHTML = `<div style="padding: 20px; color: var(--red); font-family: var(--mono); font-size: 12px;">
      ⚠ COMPONENT LOAD FAILED: ${path}<br>
      ${err.message}
    </div>`;
  }
}

async function initComponents() {
  const base = getBasePath();
  await loadComponent("#header-placeholder", `${base}components/header.html`);
  await loadComponent("#footer-placeholder", `${base}components/footer.html`);

  console.log("[INIT] components done.");
  updateEntryCount();
  setActiveNav();
  initMobileNav();
}

function getBasePath() {
  return "./";
}

/* ----------------------------------------------------------
   2. ENTRYカウント更新 & コレクション進捗
   ---------------------------------------------------------- */
function updateEntryCount() {
  // Count only main entries, EX entries are separate
  const count = window.MAIN_ENTRIES?.length || 0;
  const el = document.getElementById("entry-count-num");
  if (el) el.textContent = count;

  const mobileEl = document.getElementById("entry-count-num-mobile");
  if (mobileEl) mobileEl.textContent = count;

  document.querySelectorAll(".entry-total").forEach((el) => {
    el.textContent = count;
  });

  updateCollectionProgress();
}

// ============================================================
// DISCOVERY SYSTEM - localStorage with three states
// ============================================================
const DISCOVERY_STATES = {
  UNKNOWN: "UNKNOWN",
  DISCOVERED: "DISCOVERED",
  RESTRICTED: "RESTRICTED",
};

function getDiscoveryData() {
  try {
    const data = localStorage.getItem("kyoshi_discovery_data");
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.warn("[WARN] Failed to read discovery data:", e);
    return {};
  }
}

function setDiscoveryData(data) {
  try {
    localStorage.setItem("kyoshi_discovery_data", JSON.stringify(data));
  } catch (e) {
    console.warn("[WARN] Failed to write discovery data:", e);
  }
}

function getDiscoveryState(entryNo) {
  const data = getDiscoveryData();
  return data[entryNo] || DISCOVERY_STATES.UNKNOWN;
}

function setDiscoveryState(entryNo, state) {
  const data = getDiscoveryData();
  data[entryNo] = state;
  setDiscoveryData(data);
  updateCollectionProgress();
}

// Legacy compatibility - mark as discovered
function markAsViewed(entryNo) {
  const currentState = getDiscoveryState(entryNo);
  if (currentState === DISCOVERY_STATES.UNKNOWN) {
    setDiscoveryState(entryNo, DISCOVERY_STATES.DISCOVERED);
    return true; // 新規発見
  }
  return false; // 既に発見済み
}

function getViewedEntries() {
  const data = getDiscoveryData();
  return Object.keys(data).filter(
    (no) => data[no] !== DISCOVERY_STATES.UNKNOWN,
  );
}

// Show discovery overlay animation
function showDiscoveryOverlay(entryNo) {
  const overlay = document.getElementById("discovery-overlay");
  if (!overlay) return;

  overlay.classList.add("active");

  // Auto-hide after 2 seconds
  setTimeout(() => {
    overlay.classList.remove("active");
  }, 2000);
}

function updateCollectionProgress() {
  const viewed = getViewedEntries();
  const total = window.MAIN_ENTRIES?.length || 0;
  const viewedCount = viewed.length;
  const percentage = total > 0 ? Math.round((viewedCount / total) * 100) : 0;

  // ヘッダーの進捗表示を更新
  const progressEl = document.getElementById("collection-progress");
  if (progressEl) {
    progressEl.textContent = `${viewedCount}/${total}`;
  }

  const percentageEl = document.getElementById("collection-percentage");
  if (percentageEl) {
    percentageEl.textContent = `${percentage}%`;
  }

  // モバイルの進捗表示を更新
  const mobileProgressEl = document.getElementById(
    "collection-progress-mobile",
  );
  if (mobileProgressEl) {
    mobileProgressEl.textContent = `${viewedCount}/${total}`;
  }

  const mobilePercentageEl = document.getElementById(
    "collection-percentage-mobile",
  );
  if (mobilePercentageEl) {
    mobilePercentageEl.textContent = `${percentage}%`;
  }

  // プログレスバーの幅を更新
  const progressBar = document.getElementById("collection-bar-fill");
  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }

  // ヒーローセクションのDISCOVERY RATEを更新
  const heroDiscoveryRate = document.getElementById("hero-discovery-rate");
  if (heroDiscoveryRate) {
    heroDiscoveryRate.textContent = `${viewedCount}/${total}`;
  }

  const heroDiscoveryPercent = document.getElementById(
    "hero-discovery-percent",
  );
  if (heroDiscoveryPercent) {
    heroDiscoveryPercent.textContent = `${percentage}%`;
  }
}

/* ----------------------------------------------------------
   3. アクティブナビ
   ---------------------------------------------------------- */
function setActiveNav() {
  const path = window.location.pathname;
  const page = path.split("/").pop() || "index.html";
  const navMap = {
    "index.html": "catalog",
    "": "catalog",
    "about.html": "world",
    "entry.html": "catalog",
  };
  const current = navMap[page];
  if (!current) return;

  document.querySelectorAll(".nav-a[data-nav]").forEach((a) => {
    a.classList.toggle("current", a.dataset.nav === current);
  });
  document.querySelectorAll(".nav-overlay-item[data-nav]").forEach((a) => {
    a.classList.toggle("current", a.dataset.nav === current);
  });
}

/* ----------------------------------------------------------
   4. Mobile Nav
   ---------------------------------------------------------- */
function initMobileNav() {
  const burger = document.getElementById("nav-burger");
  const overlay = document.getElementById("nav-overlay");
  const close = document.getElementById("nav-close");

  if (!burger || !overlay) return;

  function openMenu() {
    burger.classList.add("is-open");
    overlay.classList.add("is-open");
    document.body.classList.add("nav-is-open");
    burger.setAttribute("aria-label", "メニューを閉じる");
  }

  function closeMenu() {
    burger.classList.remove("is-open");
    overlay.classList.remove("is-open");
    document.body.classList.remove("nav-is-open");
    burger.setAttribute("aria-label", "メニューを開く");
  }

  burger.addEventListener("click", () => {
    overlay.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  if (close) close.addEventListener("click", closeMenu);

  overlay.querySelectorAll(".nav-overlay-item").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

/* ----------------------------------------------------------
   5. Scroll Reveal
   ---------------------------------------------------------- */
function initReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll(".reveal").forEach((r) => obs.observe(r));

  const mutObs = new MutationObserver(() => {
    document.querySelectorAll(".reveal:not(.visible)").forEach((r) => {
      obs.observe(r);
    });
  });
  mutObs.observe(document.body, { childList: true, subtree: true });
}

/* ----------------------------------------------------------
   7. Site Config Application
   ---------------------------------------------------------- */
function applySiteConfig() {
  if (!window.SITE_CONFIG) {
    console.warn("[WARN] SITE_CONFIG not found");
    return;
  }

  const config = window.SITE_CONFIG;

  // Apply version to header
  const versionEl = document.getElementById("sys-version");
  if (versionEl) {
    versionEl.textContent = `SYS_V${config.version}`;
  }

  // Apply version to footer
  const footerVersionEl = document.getElementById("footer-version");
  if (footerVersionEl) {
    footerVersionEl.textContent = `KYOSHI_SEIBUTSU_ZUKAN_v${config.version}`;
  }

  // Apply to sys-divider elements
  const statusEl = document.getElementById("sys-status");
  if (statusEl) {
    statusEl.textContent = config.status;
  }

  const regionEl = document.getElementById("sys-region");
  if (regionEl) {
    regionEl.textContent = config.region;
  }

  const collectorEl = document.getElementById("sys-collector");
  if (collectorEl) {
    collectorEl.textContent = config.collector;
  }

  const lastUpdateEl = document.getElementById("sys-last-update");
  if (lastUpdateEl) {
    lastUpdateEl.textContent = config.lastUpdate;
  }

  const docTypeEl = document.getElementById("sys-doc-type");
  if (docTypeEl) {
    docTypeEl.textContent = config.docType;
  }

  const classificationEl = document.getElementById("sys-classification");
  if (classificationEl) {
    classificationEl.textContent = config.classification;
  }

  console.log("[CONFIG] Site config applied:", config);
}

/* ----------------------------------------------------------
   8. System Connection Animation - 観測システム起動演出
   ---------------------------------------------------------- */
function initSystemConnectionLinks() {
  const systemLinks = document.querySelectorAll(".nav-overlay-system-link, .mobile-footer-link");
  const overlay = document.getElementById("system-connection-overlay");
  const textEl = document.getElementById("system-connection-text");
  const statusEl = document.getElementById("system-connection-status");

  if (!systemLinks.length || !overlay) return;

  systemLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const href = link.getAttribute("href");
      const isExternal = link.getAttribute("target") === "_blank";
      const linkType = link.dataset.systemLink;

      // ランダムにテキストを選択
      const messages = ["CONNECTING...", "OBSERVATION NODE ACTIVE"];
      const message = messages[Math.floor(Math.random() * messages.length)];
      textEl.textContent = message;

      // オーバーレイを表示
      overlay.classList.add("active");

      // モバイルメニューを閉じる
      const burger = document.getElementById("nav-burger");
      const navOverlay = document.getElementById("nav-overlay");
      if (burger && navOverlay && navOverlay.classList.contains("is-open")) {
        burger.classList.remove("is-open");
        navOverlay.classList.remove("is-open");
        document.body.classList.remove("nav-is-open");
      }

      // 0.4〜0.6秒後に遷移
      const delay = 400 + Math.random() * 200;

      // 成功メッセージを一瞬表示（オプション）
      setTimeout(() => {
        statusEl.textContent = "SIGNAL CONFIRMED";
        statusEl.classList.add("visible");
      }, delay - 100);

      // 遷移実行
      setTimeout(() => {
        if (isExternal) {
          window.open(href, "_blank");
        } else {
          window.location.href = href;
        }

        // オーバーレイを非表示（遷移後のクリーンアップ）
        setTimeout(() => {
          overlay.classList.remove("active");
          statusEl.classList.remove("visible");
        }, 100);
      }, delay);
    });
  });
}

/* ----------------------------------------------------------
   9. Mobile Footer Scroll Detection - スクロール停止時に表示
   ---------------------------------------------------------- */
function initMobileFooterScroll() {
  const footer = document.getElementById("mobile-fixed-footer");
  if (!footer) return;

  let scrollTimeout;
  let isScrolling = false;

  // スクロール中は非表示
  window.addEventListener("scroll", () => {
    if (!isScrolling) {
      footer.classList.remove("visible");
      isScrolling = true;
    }

    // スクロール停止を検出
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      footer.classList.add("visible");
    }, 150);
  });
}

/* ----------------------------------------------------------
   10. Mobile Footer State Management - 状態別UI切り替え
   ---------------------------------------------------------- */
function detectPageMode() {
  const path = window.location.pathname;
  const filename = path.split('/').pop();

  if (filename === 'about.html' || filename === 'about') {
    return 'about';
  } else if (filename === 'entry.html' || filename === 'entry') {
    return 'detail';
  } else {
    return 'index';
  }
}

function updateMobileFooterByState() {
  const footer = document.getElementById("mobile-fixed-footer");
  if (!footer) return;

  const mode = detectPageMode();

  // 既存のリンクをクリア
  footer.innerHTML = '';

  let links = [];

  if (mode === 'index') {
    // 入口モード
    links = [
      { href: 'about.html', text: '理解する', systemLink: 'about', icon: '◈' },
      { href: '#catalog', text: '閲覧する', systemLink: 'catalog', icon: '▦' },
      { href: 'https://agavest.stores.jp', text: '入手する', systemLink: 'external', target: '_blank', icon: '↗' }
    ];
  } else if (mode === 'about') {
    // 観測モード
    links = [
      { href: 'index.html', text: '観測を続ける', systemLink: 'home', icon: '◈' },
      { href: 'index.html#catalog', text: '標本へ移動', systemLink: 'catalog', icon: '▦' },
      { href: 'https://agavest.stores.jp', text: '入手する', systemLink: 'external', target: '_blank', icon: '↗' }
    ];
  } else if (mode === 'detail') {
    // 標本モード
    links = [
      { href: '#', text: '前の個体', systemLink: 'prev', id: 'mobile-footer-prev', icon: '◈' },
      { href: 'index.html#catalog', text: '一覧へ戻る', systemLink: 'catalog', icon: '▦' },
      { href: 'https://agavest.stores.jp', text: '入手する', systemLink: 'external', target: '_blank', icon: '↗' }
    ];
  }

  // リンクを生成
  links.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.className = 'mobile-footer-link';
    a.dataset.systemLink = link.systemLink;
    if (link.target) a.target = link.target;
    if (link.id) a.id = link.id;

    const icon = document.createElement('span');
    icon.className = 'mobile-footer-icon';
    icon.textContent = link.icon || '◈';

    const text = document.createElement('span');
    text.className = 'mobile-footer-text';
    text.textContent = link.text;

    a.appendChild(icon);
    a.appendChild(text);
    footer.appendChild(a);
  });

  // detailモードの場合は「前の個体」のリンク先を設定
  if (mode === 'detail') {
    updatePrevEntryLink();
  }
}

function updatePrevEntryLink() {
  const prevLink = document.getElementById('mobile-footer-prev');
  if (!prevLink) return;

  // URLパラメータから現在のエントリーIDを取得
  const params = new URLSearchParams(window.location.search);
  const currentId = params.get('id');

  if (!currentId) return;

  // entriesデータから前のIDを探す
  if (typeof entries !== 'undefined' && entries.length > 0) {
    const currentIndex = entries.findIndex(e => e.id === currentId);
    if (currentIndex > 0) {
      const prevEntry = entries[currentIndex - 1];
      prevLink.href = `entry.html?id=${prevEntry.id}`;
    } else {
      // 最初のエントリーの場合は無効化
      prevLink.style.pointerEvents = 'none';
      prevLink.style.opacity = '0.3';
    }
  }
}

/* ----------------------------------------------------------
   11. Init
   ---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", async () => {
  await initComponents();
  initReveal();
  applySiteConfig();
  updateMobileFooterByState();
  initSystemConnectionLinks();
  initMobileFooterScroll();
});
