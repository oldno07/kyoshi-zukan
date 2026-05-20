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
  if (!window.ENTRIES || !Array.isArray(window.ENTRIES)) {
    console.warn("[WARN] ENTRIES data is invalid or missing");
    return;
  }
  const count = window.ENTRIES.length;

  const headerEl = document.getElementById("entry-count-num");
  if (headerEl) headerEl.textContent = count;

  const mobileEl = document.getElementById("entry-count-num-mobile");
  if (mobileEl) mobileEl.textContent = count;

  document.querySelectorAll(".entry-total").forEach((el) => {
    el.textContent = count;
  });

  updateCollectionProgress();
}

// コレクション進捗管理
function getViewedEntries() {
  try {
    const viewed = localStorage.getItem('kyoshi_viewed_entries');
    return viewed ? JSON.parse(viewed) : [];
  } catch (e) {
    console.warn('[WARN] Failed to read localStorage:', e);
    return [];
  }
}

function markAsViewed(entryNo) {
  try {
    const viewed = getViewedEntries();
    if (!viewed.includes(entryNo)) {
      viewed.push(entryNo);
      localStorage.setItem('kyoshi_viewed_entries', JSON.stringify(viewed));
      updateCollectionProgress();
      return true; // 新規発見
    }
    return false; // 既に閲覧済み
  } catch (e) {
    console.warn('[WARN] Failed to write localStorage:', e);
    return false;
  }
}

function updateCollectionProgress() {
  const viewed = getViewedEntries();
  const total = window.ENTRIES?.length || 0;
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
