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
    // GitHub Pages では相対パスがページの階層に依存するため
    // ルートからの相対パスを使う
    const res = await fetch(path);
    if (!res.ok) throw new Error(res.status);
    el.innerHTML = await res.text();
    console.log("[OK] loaded:", path, "| ENTRIES:", window.ENTRIES?.length);
  } catch (err) {
    console.warn("component load failed:", path, err);
  }
}

async function initComponents() {
  const base = getBasePath();

  await Promise.all([
    loadComponent("#header-placeholder", `${base}components/header.html`),
    loadComponent("#footer-placeholder", `${base}components/footer.html`),
  ]);

  // header/footer のDOM注入が完了してから実行
  updateEntryCount();
  setActiveNav();
}

/* ----------------------------------------------------------
   パス解決ユーティリティ
   index.html, about.html, entry.html はすべてルート直下想定
   サブディレクトリに置く場合はここを修正
   ---------------------------------------------------------- */
function getBasePath() {
  // ルート直下のファイルから見た components/ への相対パス
  return "./";
}

/* ----------------------------------------------------------
   2. ENTRYカウント更新
   header読み込み完了後に呼ぶ
   ---------------------------------------------------------- */
function updateEntryCount() {
  const el = document.getElementById("entry-count-num");
  console.log("[COUNT] el:", el, "| ENTRIES:", window.ENTRIES?.length);
  if (!el) return;
  if (!window.ENTRIES) return;
  el.textContent = window.ENTRIES.length;
  console.log("[COUNT] set to:", el.textContent);
}

/* ----------------------------------------------------------
   3. アクティブナビ
   現在のページURLに応じて .current クラスを付与
   ---------------------------------------------------------- */
function setActiveNav() {
  const path = window.location.pathname;

  // ページ名を取得（例: "about.html", "index.html", "entry.html"）
  const page = path.split("/").pop() || "index.html";

  // data-nav属性とページ名のマッピング
  const navMap = {
    "index.html": "catalog",
    "": "catalog", // ルートアクセス
    "about.html": "world",
    "entry.html": "catalog", // entryはcatalog配下扱い
  };

  const current = navMap[page];
  if (!current) return;

  document.querySelectorAll(".nav-a[data-nav]").forEach((a) => {
    a.classList.toggle("current", a.dataset.nav === current);
  });
}

/* ----------------------------------------------------------
   4. Scroll Reveal
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

  // entry.jsがDOMを生成した後に呼ばれる場合も考慮
  // MutationObserverで動的追加された.revealも監視
  document.querySelectorAll(".reveal").forEach((r) => obs.observe(r));

  // entry.htmlなど動的生成ページ用: DOM変化を監視して新しい.revealを登録
  const mutObs = new MutationObserver(() => {
    document.querySelectorAll(".reveal:not(.visible)").forEach((r) => {
      obs.observe(r);
    });
  });
  mutObs.observe(document.body, { childList: true, subtree: true });
}

/* ----------------------------------------------------------
   5. Filter（index.html の標本目録）
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
        // 非表示にするが、アニメーション後に
        if (card.style.opacity === "0") card.style.display = "none";
      }, 250);
    }
  });
}

/* ----------------------------------------------------------
   6. Init
   ---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", async () => {
  // entries.js は main.js より前に <script> で読まれているので
  // DOMContentLoaded時点では window.ENTRIES は確実に存在する
  // → initComponents() でheaderを注入してからカウント更新
  await initComponents();
  initReveal();
});
