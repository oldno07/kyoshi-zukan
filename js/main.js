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
  UNKNOWN: 'UNKNOWN',
  DISCOVERED: 'DISCOVERED',
  RESTRICTED: 'RESTRICTED'
};

function getDiscoveryData() {
  try {
    const data = localStorage.getItem('kyoshi_discovery_data');
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.warn('[WARN] Failed to read discovery data:', e);
    return {};
  }
}

function setDiscoveryData(data) {
  try {
    localStorage.setItem('kyoshi_discovery_data', JSON.stringify(data));
  } catch (e) {
    console.warn('[WARN] Failed to write discovery data:', e);
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
  return Object.keys(data).filter(no => data[no] !== DISCOVERY_STATES.UNKNOWN);
}

// Show discovery overlay animation
function showDiscoveryOverlay(entryNo) {
  const overlay = document.getElementById('discovery-overlay');
  if (!overlay) return;

  overlay.classList.add('active');

  // Auto-hide after 2 seconds
  setTimeout(() => {
    overlay.classList.remove('active');
  }, 2000);
}

function updateCollectionProgress() {
  const viewed = getViewedEntries();
  const total = window.MAIN_ENTRIES?.length || 0;
  const viewedCount = viewed.length;
  const percentage = total > 0 ? Math.round((viewedCount / total) * 100) : 0;

  // ヘッダーの進捗表示を更新
  const progressEl = document.getElementById('collection-progress');
  if (progressEl) {
    progressEl.textContent = `${viewedCount}/${total}`;
  }

  const percentageEl = document.getElementById('collection-percentage');
  if (percentageEl) {
    percentageEl.textContent = `${percentage}%`;
  }

  // モバイルの進捗表示を更新
  const mobileProgressEl = document.getElementById('collection-progress-mobile');
  if (mobileProgressEl) {
    mobileProgressEl.textContent = `${viewedCount}/${total}`;
  }

  const mobilePercentageEl = document.getElementById('collection-percentage-mobile');
  if (mobilePercentageEl) {
    mobilePercentageEl.textContent = `${percentage}%`;
  }

  // プログレスバーの幅を更新
  const progressBar = document.getElementById('collection-bar-fill');
  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }

  // ヒーローセクションのDISCOVERY RATEを更新
  const heroDiscoveryRate = document.getElementById('hero-discovery-rate');
  if (heroDiscoveryRate) {
    heroDiscoveryRate.textContent = `${viewedCount}/${total}`;
  }

  const heroDiscoveryPercent = document.getElementById('hero-discovery-percent');
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
   6. Filter
   ---------------------------------------------------------- */
function setFilter(btn) {
  if (!btn) {
    console.warn("[WARN] setFilter called with null button");
    return;
  }
  document
    .querySelectorAll(".flt-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  const filter = btn.textContent.trim();

  document.querySelectorAll(".ecard").forEach((card) => {
    const tag = (card.querySelector(".ctag")?.textContent || "").toUpperCase();
    let show = true;
    if (filter === "PLANT+") {
      show = tag.includes("PLANT") || tag.includes("SUCCULENT");
    } else if (filter === "ANIMAL+") {
      show = tag.includes("BEAST") || tag.includes("ANIMAL");
    }
    if (show) {
      card.style.opacity = "1";
      card.style.transform = "none";
      card.style.display = "";
    } else {
      card.style.opacity = "0";
      card.style.transform = "translateY(8px)";
      setTimeout(() => {
        if (card.style.opacity === "0") card.style.display = "none";
      }, 250);
    }
  });
}

/* ----------------------------------------------------------
   7. Init
   ---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", async () => {
  await initComponents();
  initReveal();
});
