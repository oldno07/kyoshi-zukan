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

  // Pin event items with status != "ended" to the top
  const pinnedItems = window.NEWS.filter(
    (n) => n.type === "event" && n.status !== "ended",
  );
  const otherItems = window.NEWS.filter(
    (n) => !(n.type === "event" && n.status !== "ended"),
  );
  const sortedItems = [...pinnedItems, ...otherItems];

  const items = sortedItems.slice(0, 3);

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

// Helper function to safely get field value
function getField(entry, field, defaultValue = "—") {
  const value = entry[field];
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }
  return value;
}

// Helper function to check if entry has intentional missing state
function hasIntentionalMissingState(entry) {
  return (
    entry.missingState &&
    ["DATA_LOST", "ACCESS_DENIED", "REDACTED"].includes(entry.missingState)
  );
}

function renderCatalog() {
  const grid = document.querySelector(".card-grid");

  grid.innerHTML = "";

  // Use MAIN_ENTRIES for main catalog, EX_ENTRIES are handled separately
  let entries = window.MAIN_ENTRIES || [];

  // Filter
  if (currentFilter !== "ALL") {
    entries = entries.filter((entry) => {
      const tag = (entry.tag || "").toUpperCase();
      const filter = currentFilter.toUpperCase();
      if (filter === "PLANT+") {
        return tag.includes("PLANT") || tag.includes("SUCCULENT");
      } else if (filter === "ANIMAL+") {
        return tag.includes("BEAST") || tag.includes("ANIMAL");
      }
      return tag.includes(filter);
    });
  }

  // Sort
  if (currentSort === "sort") {
    entries.sort((a, b) => (a.sort || 0) - (b.sort || 0));
  } else if (currentSort === "new") {
    entries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (currentSort === "random") {
    entries.sort(() => Math.random() - 0.5);
  } else if (currentSort === "rarity") {
    const rarityOrder = { LEGEND: 1, EPIC: 2, RARE: 3, UNCOMMON: 4, COMMON: 5 };
    entries.sort((a, b) => {
      const ra = rarityOrder[a.rarity?.toUpperCase()] || 99;
      const rb = rarityOrder[b.rarity?.toUpperCase()] || 99;
      return ra - rb;
    });
  }

  entries.forEach((entry, index) => {
    const card = document.createElement("div");
    card.className = "ecard reveal";
    card.style.display = "";
    card.style.opacity = "1";
    card.style.transform = "none";
    card.setAttribute(
      "data-rarity",
      getField(entry, "rarity", "COMMON").toUpperCase(),
    );
    card.setAttribute(
      "data-classification",
      getField(entry, "classification", "SAFE").toUpperCase(),
    );
    card.setAttribute("data-ex", "false"); // Main catalog entries are not EX

    if (index > 0) {
      card.style.transitionDelay = `${index * 0.1}s`;
    }

    // Check if this entry has been viewed
    const viewed = window.getViewedEntries ? window.getViewedEntries() : [];
    const isViewed = viewed.includes(entry.no);
    const isNew = !isViewed;

    // Handle intentional missing states (worldbuilding only)
    const isMissing = hasIntentionalMissingState(entry);
    const silhouetteClass = isMissing ? "silhouette" : "";
    const missingBadge = isMissing
      ? `<span class="missing-state missing-${entry.missingState.toLowerCase().replace("_", "-")}">${entry.missingState}</span>`
      : "";

    // Add missing state class to card for CSS targeting
    if (isMissing) {
      card.classList.add(
        `missing-${entry.missingState.toLowerCase().replace("_", "-")}`,
      );
    }

    // Truncate description to 150 characters
    const fullDesc = isMissing
      ? "記録なし"
      : getField(entry, "desc", "記録なし");
    const truncatedDesc =
      fullDesc.length > 150 ? fullDesc.substring(0, 150) + "..." : fullDesc;
    const needsReadMore = fullDesc.length > 150 && !isMissing;

    card.innerHTML = `
      <div class="ct">
        <span class="cno">No.${getField(entry, "no", "???")}
          ${entry.classification ? `<span class="classification cls-${entry.classification.toLowerCase()}">${entry.classification}</span>` : ""}
          ${isNew && !isMissing ? '<span class="discovery-badge">NEW</span>' : ""}
        </span>
        <div class="ct-badges">
          <span class="rarity ${entry.rarityClass || "rar-c"}">
            ${getField(entry, "rarity", "COMMON")}
          </span>
          ${missingBadge}
        </div>
      </div>
      <div class="cillus ${silhouetteClass}">
        <img src="${getField(entry, "image", "images/unknown.png")}" alt="${getField(entry, "jp", "Unknown")}" onerror="this.src='images/unknown.png'; this.onerror=null;" />
      </div>
      <div class="cbody">
        <div class="ctag">${getField(entry, "tag", "UNKNOWN")}</div>
        <div class="cnm-jp">${isMissing ? "——" : getField(entry, "jp", "名称不明")}</div>
        <div class="cnm-en">${isMissing ? "UNKNOWN ENTITY" : getField(entry, "en", "Unknown")}</div>
        <p class="cdesc">${truncatedDesc}</p>
        ${needsReadMore ? `<a href="entry.html?no=${entry.no}" class="read-more">続きを読む →</a>` : ""}
        <div class="cdata">
          <div class="dc">
            <div class="dk">HABITAT</div>
            <div class="dv">${isMissing ? "██████" : getField(entry, "habitat", "—")}</div>
          </div>
          <div class="dc">
            <div class="dk">SIZE</div>
            <div class="dv">${isMissing ? "██████" : getField(entry, "size", "—")}</div>
          </div>
          <div class="dc">
            <div class="dk">MOBILITY</div>
            <div class="dv">${isMissing ? "██████" : getField(entry, "mobility", "—")}</div>
          </div>
          <div class="dc">
            <div class="dk">STATUS</div>
            <div class="dv" style="color:${isMissing ? "var(--ink3)" : entry.statusColor || "var(--g)"}">
              ${isMissing ? "——" : getField(entry, "status", "—")}
              ${!isMissing && entry.status && entry.status.includes("ACTIVE") ? '<span class="live-pulse-indicator"></span>' : ""}
            </div>
          </div>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      // Mark as viewed when clicked
      if (window.markAsViewed) {
        const wasNew = window.markAsViewed(entry.no);
        if (wasNew) {
          // Trigger discovery animation
          card.classList.add("discovering");
          showDiscoveryOverlay(entry.no);
        }
      }
      window.location.href = `entry.html?no=${entry.no}`;
    });

    grid.appendChild(card);
  });
}

/* ----------------------------------------------------------
   2. ヒーロービューワー ランダム表示
   ---------------------------------------------------------- */
function renderHeroViewer() {
  if (
    !window.ENTRIES ||
    !Array.isArray(window.ENTRIES) ||
    window.ENTRIES.length === 0
  ) {
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
    img.onerror = function () {
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
  if (nmEn)
    nmEn.textContent = `${pick.en || "Unknown"} / No.${pick.no || "???"}`;

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
   3. UNKNOWN SIGNAL - Random Observation
   ---------------------------------------------------------- */
function observeRandomSignal() {
  // Use MAIN_ENTRIES for random observation
  const entries = window.MAIN_ENTRIES || [];
  if (!Array.isArray(entries) || entries.length === 0) {
    console.warn("[WARN] No entries available for random observation");
    return;
  }

  // Show terminal feedback
  showTerminalFeedback("UNKNOWN SIGNAL", "SEARCHING...");

  // Pick a random entry after a brief delay
  setTimeout(() => {
    const randomEntry = entries[Math.floor(Math.random() * entries.length)];

    // Update feedback with found entry
    showTerminalFeedback(
      "SIGNAL ACQUIRED",
      `NO.${randomEntry.no.padStart(3, "0")}`,
    );

    // Navigate to the entry after another brief delay
    setTimeout(() => {
      window.location.href = `entry.html?no=${randomEntry.no}`;
    }, 400);
  }, 600);
}

/* ----------------------------------------------------------
   4. Terminal Feedback System
   ---------------------------------------------------------- */
function showTerminalFeedback(message, status = "PROCESSING") {
  const overlay = document.getElementById("terminal-feedback");
  const messageEl = document.getElementById("terminal-message");
  const statusEl = document.getElementById("terminal-status");

  if (!overlay || !messageEl || !statusEl) return;

  messageEl.textContent = message;
  statusEl.textContent = status;
  overlay.classList.add("active");

  setTimeout(() => {
    overlay.classList.remove("active");
  }, 800);
}

/* ----------------------------------------------------------
   5. Init
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

  // Add terminal feedback to card clicks
  document.querySelectorAll(".ecard").forEach((card) => {
    card.addEventListener("click", () => {
      const entryNo = card.querySelector(".cno")?.textContent;
      if (entryNo) {
        showTerminalFeedback(
          `ENTRY OPENED`,
          `NO.${entryNo.replace("No.", "")}`,
        );
      }
    });
  });
});
