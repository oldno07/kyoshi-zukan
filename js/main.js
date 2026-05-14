/* ============================================================
   鋸歯生物図鑑 — main.js
   ============================================================ */
/* ----------------------------------------------------------
   0. 図鑑登録数（手動管理）
   ---------------------------------------------------------- */
const ENTRY_TOTAL = 11;

function updateEntryCount() {
  document.querySelectorAll(".entry-total").forEach((el) => {
    el.textContent = ENTRY_TOTAL.toString().padStart(3, "0");
  });
}

/* ----------------------------------------------------------
   1. Components
   ---------------------------------------------------------- */

// サブディレクトリ対応
function getBasePath() {
  const depth = location.pathname
    .replace(/\/[^/]*$/, "")
    .split("/")
    .filter(Boolean).length;

  return depth > 0 ? "../".repeat(depth) : "./";
}

// HTML読み込み
async function loadComponent(selector, url) {
  const el = document.querySelector(selector);

  if (!el) return;

  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error(res.status);

    el.innerHTML = await res.text();
  } catch (e) {
    console.warn(`Component load failed: ${url}`, e);
  }
}

// Header/Footer 初期化
async function initComponents() {
  const base = getBasePath();

  await Promise.all([
    loadComponent("#header-placeholder", base + "components/header.html"),

    loadComponent("#footer-placeholder", base + "components/footer.html"),
  ]);

  highlightCurrentNav();
}

// 現在ページをハイライト
function highlightCurrentNav() {
  const path = location.pathname;

  document.querySelectorAll(".nav-a[data-nav]").forEach((a) => {
    const nav = a.dataset.nav;

    if (nav === "world" && path.includes("about")) {
      a.classList.add("current");
    }
  });
}

/* ----------------------------------------------------------
   2. Scroll Reveal
   ---------------------------------------------------------- */

function initReveal() {
  const reveals = document.querySelectorAll(".reveal");

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  reveals.forEach((r) => obs.observe(r));
}

/* ----------------------------------------------------------
   3. Catalog Filter
   ---------------------------------------------------------- */

function setFilter(btn) {
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
        if (card.style.opacity === "0") {
          card.style.display = "none";
        }
      }, 300);
    }
  });
}

/* ----------------------------------------------------------
   4. Init
   ---------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", async () => {
  await initComponents();

  initReveal();

  updateEntryCount();
});
