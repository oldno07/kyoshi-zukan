/* ----------------------------------------------------------
   0. トップページ ニュース表示（最新3件）
   ---------------------------------------------------------- */
function renderTopNews() {
  const list = document.getElementById("top-news-list");
  if (!list) {
    console.warn("[WARN] top-news-list element not found");
    return;
  }
  if (!window.NEWS || !Array.isArray(window.NEWS)) {
    console.warn("[WARN] NEWS data is invalid or missing");
    return;
  }

  const TYPE_LABEL = {
    new: "NEW",
    event: "EVENT",
    shop: "SHOP",
    info: "INFO",
  };

  const items = window.NEWS.slice(0, 3);

  list.innerHTML = items
    .map((n) => {
      const href = n.link ?? "news.html";
      const isExternal = href.startsWith("http");
      const target = isExternal ? 'target="_blank"' : "";

      return `
      <a href="${href}" ${target} class="top-news-item">
        <span class="top-news-date">${n.date}</span>
        <span class="top-news-type">
          <span class="type-badge type-${n.type}">${TYPE_LABEL[n.type] ?? n.type}</span>
        </span>
        <span class="top-news-title">${n.title}</span>
        <span class="top-news-arrow">→</span>
      </a>`;
    })
    .join("");
}

/* ============================================================
   鋸歯生物図鑑 — catalog.js
   ============================================================ */

/* ----------------------------------------------------------
   1. カタログ ソート & レンダリング
   ---------------------------------------------------------- */

const RARITY_RANK = {
  LEGEND: 5,
  EPIC: 4,
  RARE: 3,
  UNCOMMON: 2,
  COMMON: 1,
};

let currentSort = "sort"; // デフォルト：No.順
let currentFilter = "ALL"; // デフォルト：全表示

function sortEntries(entries, sortKey) {
  if (!entries || !Array.isArray(entries)) {
    console.warn("[WARN] sortEntries received invalid data");
    return [];
  }
  const arr = [...entries];
  switch (sortKey) {
    case "new":
      return arr.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
    case "old":
      return arr.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateA - dateB;
      });
    case "rarity":
      return arr.sort(
        (a, b) =>
          (RARITY_RANK[b.rarity?.toUpperCase()] ?? 0) -
          (RARITY_RANK[a.rarity?.toUpperCase()] ?? 0),
      );
    case "random":
      return arr.sort(() => Math.random() - 0.5);
    case "sort":
    default:
      return arr.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
  }
}

function setSort(btn) {
  document
    .querySelectorAll(".sort-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  currentSort = btn.dataset.sort;
  renderCatalog();
}

function renderCatalog() {
  const grid = document.querySelector(".card-grid");
  if (!grid) {
    console.warn("[WARN] .card-grid element not found");
    return;
  }
  if (!window.ENTRIES || !Array.isArray(window.ENTRIES)) {
    console.warn("[WARN] ENTRIES data is invalid or missing");
    grid.innerHTML = `<div style="padding: 40px; text-align: center; color: var(--ink3); font-family: var(--mono);">
      ⚠ DATA LOAD ERROR<br>
      標本データの読み込みに失敗しました
    </div>`;
    return;
  }

  grid.innerHTML = "";

  const sorted = sortEntries(window.ENTRIES, currentSort);

  // フィルター適用
  const filtered = sorted.filter((entry) => {
    if (currentFilter === "ALL") return true;

    const tag = (entry.tag || "").toUpperCase();

    switch (currentFilter) {
      case "PLANT+":
        return tag.includes("PLANT") || tag.includes("SUCCULENT");

      case "ANIMAL+":
        return tag.includes("BEAST") || tag.includes("ANIMAL");

      default:
        return true;
    }
  });

  filtered.forEach((entry, index) => {
    const card = document.createElement("div");
    card.className = "ecard reveal";
    card.style.display = "";
    card.style.opacity = "1";
    card.style.transform = "none";

    if (index > 0) {
      card.style.transitionDelay = `${index * 0.1}s`;
    }

    card.innerHTML = `
      <div class="ct">
        <span class="cno">No.${entry.no || "???"}</span>
        <span class="rarity ${entry.rarityClass || "rar-c"}">
          ${entry.rarity || "COMMON"}
        </span>
      </div>
      <div class="cillus">
        <img src="${entry.image || "images/unknown.png"}" alt="${entry.jp || "Unknown"}" onerror="this.src='images/unknown.png'; this.onerror=null;" />
      </div>
      <div class="cbody">
        <div class="ctag">${entry.tag || "UNKNOWN"}</div>
        <div class="cnm-jp">${entry.jp || "名称不明"}</div>
        <div class="cnm-en">${entry.en || "Unknown"}</div>
        <p class="cdesc">${entry.desc || "記録なし"}</p>
        <div class="cdata">
          <div class="dc">
            <div class="dk">HABITAT</div>
            <div class="dv">${entry.habitat || "—"}</div>
          </div>
          <div class="dc">
            <div class="dk">SIZE</div>
            <div class="dv">${entry.size || "—"}</div>
          </div>
          <div class="dc">
            <div class="dk">MOBILITY</div>
            <div class="dv">${entry.mobility || "—"}</div>
          </div>
          <div class="dc">
            <div class="dk">STATUS</div>
            <div class="dv" style="color:${entry.statusColor || "var(--g)"}">
              ${entry.status || "—"}
            </div>
          </div>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.href = `entry.html?no=${entry.no}`;
    });

    grid.appendChild(card);
  });
}

/* ----------------------------------------------------------
   2. ヒーロービューワー ランダム表示
   ---------------------------------------------------------- */
function renderHeroViewer() {
  if (!window.ENTRIES || !Array.isArray(window.ENTRIES) || window.ENTRIES.length === 0) {
    console.warn("[WARN] ENTRIES data is invalid or empty for hero viewer");
    return;
  }

  // ランダムに1体選ぶ
  const pick =
    window.ENTRIES[Math.floor(Math.random() * window.ENTRIES.length)];

  // 画像
  const img = document.querySelector(".sp-float img");
  if (img) {
    img.src = pick.image || "images/unknown.png";
    img.alt = pick.jp || "Unknown";
    img.onerror = function() {
      this.src = "images/unknown.png";
      this.onerror = null;
    };
  }

  // ENTRY No. ラベル
  const spId = document.querySelector(".sp-id");
  if (spId) spId.textContent = `ENTRY No.${pick.no || "???"} — FEATURED`;

  // レアリティバッジ
  const rarBadge = document.querySelector(".sp-hd .rarity");
  if (rarBadge) {
    rarBadge.className = `rarity ${pick.rarityClass || "rar-c"}`;
    rarBadge.textContent = `★ ${pick.rarity || "COMMON"}`;
  }

  // 名前
  const nmJp = document.querySelector(".sp-nm-jp");
  const nmEn = document.querySelector(".sp-nm-en");
  if (nmJp) nmJp.textContent = pick.jp || "名称不明";
  if (nmEn) nmEn.textContent = `${pick.en || "Unknown"} / No.${pick.no || "???"}`;

  // ステータスバー（PLANT / ANIMAL / DANGER の順）
  const bars = document.querySelectorAll(".sp-ft .bar-f");
  const vals = [pick.plant ?? 0, pick.animal ?? 0, pick.danger ?? 0];
  bars.forEach((bar, i) => {
    if (bar) bar.style.width = `${vals[i]}%`;
  });

  // ビューワークリックでentry詳細へ
  const viewer = document.querySelector(".sp-view");
  const spFt = document.querySelector(".sp-ft");
  [viewer, spFt].forEach((el) => {
    if (!el) return;
    el.style.cursor = "crosshair";
    el.addEventListener("click", () => {
      window.location.href = `entry.html?no=${pick.no}`;
    });
  });

  // STORES導線を更新
  const shopWrap = document.getElementById("hero-shop-wrap");
  if (!shopWrap) return;

  if (pick.soldOut) {
    shopWrap.innerHTML = `
      <div class="hero-shop-soldout">
        <span class="hero-shop-soldout-label">SOLD OUT</span>
        <span class="hero-shop-soldout-name">${pick.jp}</span>
      </div>`;
  } else if (pick.shopUrl) {
    shopWrap.innerHTML = `
      <a href="${pick.shopUrl}" target="_blank" class="hero-shop-btn">
        <div>
          <div class="hero-shop-label">この個体を購入する</div>
          <div class="hero-shop-en">BUY ON STORES ↗</div>
        </div>
        ${pick.price ? `<div class="hero-shop-price">¥${Number(pick.price).toLocaleString()}</div>` : ""}
      </a>`;
  } else {
    shopWrap.innerHTML = `
      <a href="https://agavest.stores.jp" target="_blank" class="hero-shop-btn hero-shop-btn--top">
        <div>
          <div class="hero-shop-label">ショップで購入する</div>
          <div class="hero-shop-en">AGAVEST STORES ↗</div>
        </div>
      </a>`;
  }
}

/* ----------------------------------------------------------
   3. Init
   ---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  renderHeroViewer();
  renderTopNews();

  window.setFilter = function (btn) {
    document
      .querySelectorAll(".flt-btn")
      .forEach((b) => b.classList.remove("active"));

    btn.classList.add("active");

    currentFilter = btn.dataset.filter;
    renderCatalog();
  };

  // .entry-total の更新（main.jsのupdateEntryCountと役割分担）
  const total = window.ENTRIES?.length ?? 0;
  document.querySelectorAll(".entry-total").forEach((el) => {
    el.textContent = total.toString().padStart(3, "0");
  });
});
