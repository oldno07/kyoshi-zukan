/* ============================================================
   entry.js — 鋸歯生物 個体詳細ページ
   ============================================================ */

const params = new URLSearchParams(window.location.search);
const no = params.get("no");
const isEx = params.get("ex") === "true";

// Search across all entry arrays
function findEntry(entryNo) {
  // Check MAIN_ENTRIES first
  const mainEntry = window.MAIN_ENTRIES?.find((e) => String(e.no) === entryNo);
  if (mainEntry) return { entry: mainEntry, source: 'MAIN' };

  // Check EX_ENTRIES
  const exEntry = window.EX_ENTRIES?.find((e) => String(e.no) === entryNo);
  if (exEntry) return { entry: exEntry, source: 'EX' };

  // Check MISSING_ENTRIES
  const missingEntry = window.MISSING_ENTRIES?.find((e) => String(e.no) === entryNo);
  if (missingEntry) return { entry: missingEntry, source: 'MISSING' };

  return null;
}

const entryData = findEntry(no);
const entry = entryData?.entry;
const entrySource = entryData?.source;
const container = document.getElementById("entry-detail");

if (!container) {
  console.error("[ERROR] entry-detail container not found");
  document.body.innerHTML = `<div style="padding: 40px; text-align: center; color: var(--red); font-family: var(--mono);">
    ⚠ PAGE LOAD ERROR<br>
    コンテナ要素が見つかりません
  </div>`;
} else if (!window.MAIN_ENTRIES || !Array.isArray(window.MAIN_ENTRIES)) {
  console.error("[ERROR] ENTRIES data is invalid or missing");
  container.innerHTML = `
    <div class="ed-notfound">
      <div class="ed-nf-code">500</div>
      <div class="ed-nf-msg">DATA LOAD ERROR</div>
      <p style="margin-top: 16px; color: var(--ink3);">標本データの読み込みに失敗しました</p>
      <a href="index.html" class="btn btn-o" style="margin-top:24px;">← 目録に戻る</a>
    </div>`;
} else if (!entry) {
  container.innerHTML = `
    <div class="ed-notfound">
      <div class="ed-nf-code">404</div>
      <div class="ed-nf-msg">SPECIMEN NOT FOUND</div>
      <p style="margin-top: 16px; color: var(--ink3);">No.${no || "???"} の標本は見つかりませんでした</p>
      <a href="index.html" class="btn btn-o" style="margin-top:24px;">← 目録に戻る</a>
    </div>`;
} else {
  // Mark entry as viewed when detail page is opened (only for main entries)
  if (window.markAsViewed && entrySource === 'MAIN') {
    window.markAsViewed(entry.no);
  }
  renderEntry(entry, entrySource);
  initAnimations();
}

/* ============================================================
   SHOP PANEL（バリアントなし個体用）
   ============================================================ */
function shopPanel(e) {
  if (!e) return "";
  if (!e.shopUrl && !e.soldOut) return "";

  if (e.soldOut) {
    return `
      <div class="ed-panel ed-panel-soldout reveal">
        <div class="ed-panel-title">SPECIMEN / 標本</div>
        <div class="ed-shop-soldout">SOLD OUT</div>
        <p class="ed-panel-sub">この個体の販売は終了しました</p>
      </div>`;
  }

  return `
    <a href="${e.shopUrl}" target="_blank" class="ed-panel ed-panel-shop reveal">
      <div class="ed-panel-title">SPECIMEN / 標本入手</div>
      <div class="ed-shop-price">${e.price ? `¥${Number(e.price).toLocaleString()}` : "価格はショップで確認"}</div>
      <p class="ed-panel-sub">STORESにて販売中</p>
      <span class="ed-shop-btn">購入ページへ →</span>
    </a>`;
}

/* ============================================================
   VARIANTS SECTION
   ============================================================ */
function variantsSection(e) {
  if (!e || !e.variants || !Array.isArray(e.variants) || e.variants.length === 0) return "";

  const cards = e.variants
    .map((v, i) => {
      // 購入ボタン or SOLD OUT
      let shopHtml = "";
      if (v.soldOut) {
        shopHtml = `<div class="vr-sold">SOLD OUT</div>`;
      } else if (v.shopUrl) {
        shopHtml = `
        <a href="${v.shopUrl}" target="_blank" class="vr-buy">
          ${v.price ? `<span class="vr-price">¥${Number(v.price).toLocaleString()}</span>` : ""}
          <span class="vr-buy-label">購入する →</span>
        </a>`;
      }

      return `
      <div class="vr-card reveal" style="transition-delay:${i * 0.08}s">
        <div class="vr-img-wrap">
          <img src="${v.image || "images/unknown.png"}" alt="${e.jp || "Unknown"} — ${v.label || "Variant"}"
               onerror="this.src='images/unknown.png'; this.onerror=null;">
          <div class="vr-id">No.${v.id || "???"}</div>
        </div>
        <div class="vr-body">
          <div class="vr-label">${v.label || "名称不明"}</div>
          <div class="vr-label-en">${v.labelEn ?? ""}</div>
          ${v.desc ? `<p class="vr-desc">${v.desc}</p>` : ""}
          ${shopHtml}
        </div>
      </div>`;
    })
    .join("");

  return `
    <div class="ed-variants reveal">
      <div class="ed-variants-header">
        <div class="ed-block-label">VARIANTS / 個体バリエーション</div>
        <span class="ed-variants-count">${e.variants.length} SPECIMENS</span>
      </div>
      <div class="vr-grid">
        ${cards}
      </div>
    </div>`;
}

/* ============================================================
   RENDER
   ============================================================ */
function renderEntry(e, source = 'MAIN') {
  if (!e) {
    console.error("[ERROR] renderEntry called with null entry");
    return;
  }

  // Determine the appropriate array for navigation
  const entriesArray = source === 'EX' ? window.EX_ENTRIES :
                       source === 'MISSING' ? window.MISSING_ENTRIES :
                       window.MAIN_ENTRIES;

  // Handle intentional missing state (worldbuilding)
  const isMissing = e.missingState && ['DATA_LOST', 'ACCESS_DENIED', 'REDACTED'].includes(e.missingState);
  const isEx = source === 'EX';

  document.title = `${isMissing ? "UNKNOWN ENTITY" : (e.jp || "名称不明")} — 鋸歯生物図鑑`;

  const rarClass =
    {
      LEGENDARY: "rar-l",
      EPIC: "rar-e",
      RARE: "rar-r",
      UNCOMMON: "rar-uc",
      COMMON: "rar-c",
    }[e.rarity?.toUpperCase()] ?? "rar-c";

  const bars = [
    { k: "PLANT", v: e.plant ?? 0, cls: "" },
    { k: "ANIMAL", v: e.animal ?? 0, cls: "a" },
    { k: "DANGER", v: e.danger ?? 0, cls: "d" },
  ]
    .map(
      (b) => `
    <div class="bar-row">
      <span class="bar-k">${b.k}</span>
      <div class="bar-t">
        <div class="bar-f ${b.cls} ed-bar" style="width:0%" data-w="${b.v}%"></div>
      </div>
      <span class="ed-bar-num">${b.v}</span>
    </div>`,
    )
    .join("");

  const rows = [
    { k: "HABITAT", v: e.habitat },
    { k: "SIZE", v: e.size },
    { k: "MOBILITY", v: e.mobility },
    { k: "STATUS", v: e.status },
    { k: "TYPE", v: e.tag },
  ]
    .filter((r) => r.v)
    .map(
      (r) => `
    <div class="entry-row">
      <div class="k">${r.k}</div>
      <div class="v">${r.v}</div>
    </div>`,
    )
    .join("");

  // Navigation within the same array
  const all = entriesArray ?? [];
  const idx = all.findIndex((x) => String(x.no) === no);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  // Check if prev/next entries have missing state
  const prevMissing = prev?.missingState && ['DATA_LOST', 'ACCESS_DENIED', 'REDACTED'].includes(prev.missingState);
  const nextMissing = next?.missingState && ['DATA_LOST', 'ACCESS_DENIED', 'REDACTED'].includes(next.missingState);

  const prevHtml = prev
    ? `<a href="entry.html?no=${prev.no}${isEx ? '&ex=true' : ''}" class="ed-nav-btn">
         <span class="ed-nav-dir">← PREV</span>
         <span class="ed-nav-nm">${prevMissing ? "UNKNOWN ENTITY" : (prev.jp || "名称不明")}</span>
         <span class="ed-nav-en">${isEx ? 'EX-' : 'No.'}${String(prev.no).padStart(3, "0")}</span>
       </a>`
    : `<div class="ed-nav-btn ed-nav-empty">— 先頭の標本 —</div>`;
  const nextHtml = next
    ? `<a href="entry.html?no=${next.no}${isEx ? '&ex=true' : ''}" class="ed-nav-btn ed-nav-right">
         <span class="ed-nav-dir">NEXT →</span>
         <span class="ed-nav-nm">${nextMissing ? "UNKNOWN ENTITY" : (next.jp || "名称不明")}</span>
         <span class="ed-nav-en">${isEx ? 'EX-' : 'No.'}${String(next.no).padStart(3, "0")}</span>
       </a>`
    : `<div class="ed-nav-btn ed-nav-right ed-nav-empty">— 最後の標本 —</div>`;

  const entryPrefix = isEx ? 'EX-' : 'No.';
  const entryId = `${entryPrefix}${String(e.no || "???").padStart(3, "0")}`;

  container.innerHTML = `

    <!-- TOP STRIP -->
    <div class="ed-strip">
      <a href="index.html#catalog" class="ed-strip-back">← CATALOG</a>
      <div class="ed-strip-path">
        <span>HOME</span><span class="ed-strip-sep">/</span>
        <span>CATALOG</span><span class="ed-strip-sep">/</span>
        <span style="color:var(--ink)">${entryId}</span>
      </div>
      <span class="ed-strip-id">ENTRY_${entryId.replace('-', '_')}</span>
    </div>

    <!-- HERO -->
    <div class="ed-hero">
      <div class="ed-hero-l">
        <div class="ed-hero-meta reveal">
          <span class="rarity ${rarClass}">${e.rarity ?? "COMMON"}</span>
          ${isEx ? '<span class="ex-badge">EX</span>' : ''}
          ${isMissing ? `<span class="missing-state missing-${e.missingState.toLowerCase().replace('_', '-')}">${e.missingState}</span>` : ''}
          <span class="ed-hero-no">${entryId}</span>
        </div>
        <h1 class="ed-hero-jp reveal">${isMissing ? "——" : (e.jp || "名称不明")}</h1>
        <div class="ed-hero-en reveal">${isMissing ? "UNKNOWN ENTITY" : (e.en || "Unknown")}</div>
        <div class="ed-hero-tag reveal">${e.tag ?? "UNKNOWN"}</div>
        ${!isMissing ? `<div class="ed-bars reveal">${bars}</div>` : ''}
      </div>
      <div class="ed-hero-r">
        <div class="ed-viewer ${isMissing ? 'silhouette' : ''}">
          <div class="reticle"></div>
          <div class="cm cm-tl"></div><div class="cm cm-tr"></div>
          <div class="cm cm-bl"></div><div class="cm cm-br"></div>
          <div class="ed-scan-line"></div>
          <img class="ed-img sp-float" src="${e.image || "images/unknown.png"}" alt="${isMissing ? "UNKNOWN ENTITY" : (e.jp || "Unknown")}"
               onerror="this.src='images/unknown.png'; this.onerror=null;"/>
          <div class="ed-viewer-label">SPECIMEN_VIEW</div>
        </div>
      </div>
    </div>

    <!-- SYS DIVIDER -->
    <div class="sys-div">
      <div class="sys-dc">ID: <span>ENTRY_${entryId.replace('-', '_')}</span></div>
      <div class="sys-dc">TYPE: <span>${e.tag ?? "—"}</span></div>
      <div class="sys-dc">HABITAT: <span>${isMissing ? "—" : (e.habitat ?? "—")}</span></div>
      <div class="sys-dc">STATUS: <span>${isMissing ? "——" : (e.status ?? "—")}</span></div>
    </div>

    <!-- BODY -->
    <div class="ed-body">

      <div class="ed-col-main">
        <div class="ed-block reveal">
          <div class="ed-block-label">FIELD NOTES / 観察記録</div>
          <p class="ed-desc">${isMissing ? "記録なし" : (e.desc ?? "記録なし")}</p>
        </div>
        ${!isMissing ? `
        <div class="ed-block reveal">
          <div class="ed-block-label">SPECIMEN DATA</div>
          <div class="entry-table">${rows}</div>
        </div>` : ''}
        ${
          e.notes && !isMissing
            ? `
        <div class="ed-block reveal">
          <div class="ed-block-label">RESEARCHER NOTE</div>
          <p class="ed-notes">${e.notes}</p>
        </div>`
            : ""
        }
      </div>

      ${!isMissing ? `
      <div class="ed-col-side">
        <div class="ed-panel reveal">
          <div class="ed-panel-title">ABILITY / 特殊能力</div>
          ${(e.abilities ?? ["記録なし"])
            .map(
              (a) => `
            <div class="ed-ability-row">
              <span class="ed-ability-ic">⬡</span>
              <span class="ed-ability-txt">${a || "—"}</span>
            </div>`,
            )
            .join("")}
        </div>
        <div class="ed-panel reveal">
          <div class="ed-panel-title">CLASSIFICATION</div>
          <div class="ed-class-grid">
            <div class="ed-class-cell">
              <div class="ed-class-k">PLANT</div>
              <div class="ed-class-v" style="color:var(--g)">${e.plant ?? 0}<span class="ed-class-u">%</span></div>
            </div>
            <div class="ed-class-cell">
              <div class="ed-class-k">ANIMAL</div>
              <div class="ed-class-v" style="color:var(--amb)">${e.animal ?? 0}<span class="ed-class-u">%</span></div>
            </div>
            <div class="ed-class-cell">
              <div class="ed-class-k">DANGER</div>
              <div class="ed-class-v" style="color:var(--red)">${e.danger ?? 0}<span class="ed-class-u">%</span></div>
            </div>
            <div class="ed-class-cell">
              <div class="ed-class-k">RARITY</div>
              <div class="ed-class-v" style="font-size:13px">${e.rarity ?? "—"}</div>
            </div>
          </div>
        </div>
        ${shopPanel(e)}
        <a href="about.html" class="ed-panel ed-panel-link reveal">
          <div class="ed-panel-title">WORLD / 世界観</div>
          <p class="ed-panel-sub">鋸歯生物が生きる世界の記録</p>
          <span class="ed-panel-arrow">→</span>
        </a>
      </div>` : ''}
    </div>

    <!-- VARIANTS（バリアントがある個体のみ表示） -->
    ${!isMissing ? variantsSection(e) : ''}

    <!-- PREV / NEXT -->
    <div class="ed-nav">
      ${prevHtml}
      ${nextHtml}
    </div>

    <!-- BACK TO CATALOG -->
    <div class="ed-footer-link">
      <a href="index.html#catalog" class="btn btn-o">← 標本目録に戻る</a>
    </div>
  `;
}

/* ============================================================
   ANIMATIONS
   ============================================================ */
function initAnimations() {
  // Terminal feedback on page load
  showTerminalFeedbackOnLoad();

  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.addEventListener("click", () => {
      gtag("event", "outbound_click", {
        link_url: link.href,
        link_text: link.innerText.trim(),
      });
    });
  });
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal").forEach((r) => obs.observe(r));

  setTimeout(() => {
    document.querySelectorAll(".ed-bar").forEach((bar, i) => {
      setTimeout(() => {
        bar.style.transition = "width 0.8s cubic-bezier(0.4,0,0.2,1)";
        bar.style.width = bar.dataset.w;
      }, i * 150);
    });
  }, 400);

  const scanLine = document.querySelector(".ed-scan-line");
  if (scanLine) {
    setTimeout(() => scanLine.classList.add("ed-scan-done"), 1200);
  }
}

/* Terminal feedback on page load */
function showTerminalFeedbackOnLoad() {
  const overlay = document.getElementById("terminal-feedback");
  const messageEl = document.getElementById("terminal-message");
  const statusEl = document.getElementById("terminal-status");

  if (!overlay || !messageEl || !statusEl) return;

  const params = new URLSearchParams(window.location.search);
  const entryNo = params.get("no");

  // Determine message based on entry state
  let message = "ENTRY OPENED";
  let status = entryNo ? `NO.${entryNo.padStart(3, "0")}` : "UNKNOWN";

  // Check if this is a missing/forbidden entry
  const entryData = findEntry(entryNo);
  if (entryData && entryData.entry) {
    if (entryData.entry.missingState) {
      message = "DATA CORRUPTED";
      status = entryData.entry.missingState;
    } else if (entryData.entry.classification === "FORBIDDEN") {
      message = "RESTRICTED ACCESS";
      status = "CLASSIFICATION: FORBIDDEN";
    } else if (entryData.entry.rarity === "LEGEND") {
      message = "LEGENDARY DATA";
      status = "HIGH PRIORITY";
    }
  }

  messageEl.textContent = message;
  statusEl.textContent = status;
  overlay.classList.add("active");

  setTimeout(() => {
    overlay.classList.remove("active");
  }, 800);
}
