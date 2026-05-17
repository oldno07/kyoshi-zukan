/* ----------------------------------------------------------
   0. トップページ ニュース表示（最新3件）
   ---------------------------------------------------------- */
function renderTopNews() {
  const list = document.getElementById("top-news-list");
  if (!list || !window.NEWS) return;

  const TYPE_LABEL = {
    new:   "NEW",
    event: "EVENT",
    shop:  "SHOP",
    info:  "INFO",
  };

  const items = window.NEWS.slice(0, 3);

  list.innerHTML = items.map((n) => {
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
  }).join("");
}

/* ============================================================
   鋸歯生物図鑑 — catalog.js
   ============================================================ */

/* ----------------------------------------------------------
   1. カタログ レンダリング
   ---------------------------------------------------------- */
function renderCatalog() {
  const grid = document.querySelector(".card-grid");
  if (!grid || !window.ENTRIES) return;

  grid.innerHTML = "";

  window.ENTRIES.forEach((entry, index) => {
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
        <span class="cno">No.${entry.no}</span>
        <span class="rarity ${entry.rarityClass}">
          ${entry.rarity}
        </span>
      </div>
      <div class="cillus">
        <img src="${entry.image}" alt="${entry.jp}" />
      </div>
      <div class="cbody">
        <div class="ctag">${entry.tag}</div>
        <div class="cnm-jp">${entry.jp}</div>
        <div class="cnm-en">${entry.en}</div>
        <p class="cdesc">${entry.desc}</p>
        <div class="cdata">
          <div class="dc">
            <div class="dk">HABITAT</div>
            <div class="dv">${entry.habitat}</div>
          </div>
          <div class="dc">
            <div class="dk">SIZE</div>
            <div class="dv">${entry.size}</div>
          </div>
          <div class="dc">
            <div class="dk">MOBILITY</div>
            <div class="dv">${entry.mobility}</div>
          </div>
          <div class="dc">
            <div class="dk">STATUS</div>
            <div class="dv" style="color:${entry.statusColor}">
              ${entry.status}
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
  if (!window.ENTRIES || window.ENTRIES.length === 0) return;

  // ランダムに1体選ぶ
  const pick = window.ENTRIES[Math.floor(Math.random() * window.ENTRIES.length)];

  // 画像
  const img = document.querySelector(".sp-float img");
  if (img) {
    img.src = pick.image;
    img.alt = pick.jp;
  }

  // ENTRY No. ラベル
  const spId = document.querySelector(".sp-id");
  if (spId) spId.textContent = `ENTRY No.${pick.no} — FEATURED`;

  // レアリティバッジ
  const rarBadge = document.querySelector(".sp-hd .rarity");
  if (rarBadge) {
    rarBadge.className = `rarity ${pick.rarityClass}`;
    rarBadge.textContent = `★ ${pick.rarity}`;
  }

  // 名前
  const nmJp = document.querySelector(".sp-nm-jp");
  const nmEn = document.querySelector(".sp-nm-en");
  if (nmJp) nmJp.textContent = pick.jp;
  if (nmEn) nmEn.textContent = `${pick.en} / No.${pick.no}`;

  // ステータスバー（PLANT / ANIMAL / DANGER の順）
  const bars = document.querySelectorAll(".sp-ft .bar-f");
  const vals = [pick.plant ?? 0, pick.animal ?? 0, pick.danger ?? 0];
  bars.forEach((bar, i) => {
    bar.style.width = `${vals[i]}%`;
  });

  // ビューワークリックでentry詳細へ
  const viewer = document.querySelector(".sp-view");
  const spFt   = document.querySelector(".sp-ft");
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

  // .entry-total の更新（main.jsのupdateEntryCountと役割分担）
  const total = window.ENTRIES?.length ?? 0;
  document.querySelectorAll(".entry-total").forEach((el) => {
    el.textContent = total.toString().padStart(3, "0");
  });
});