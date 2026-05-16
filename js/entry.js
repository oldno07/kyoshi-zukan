/* ============================================================
   entry.js — 鋸歯生物 個体詳細ページ
   ============================================================ */

const params = new URLSearchParams(window.location.search);
const no = params.get("no");
const entry = window.ENTRIES?.find((e) => String(e.no) === no);
const container = document.getElementById("entry-detail");

if (!entry) {
  container.innerHTML = `
    <div class="ed-notfound">
      <div class="ed-nf-code">404</div>
      <div class="ed-nf-msg">SPECIMEN NOT FOUND</div>
      <a href="index.html" class="btn btn-o" style="margin-top:24px;">← 目録に戻る</a>
    </div>`;
} else {
  renderEntry(entry);
  initAnimations();
}

/* ============================================================
   SHOP PANEL（バリアントなし個体用）
   ============================================================ */
function shopPanel(e) {
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
  if (!e.variants || e.variants.length === 0) return "";

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
          <img src="${v.image}" alt="${e.jp} — ${v.label}"
               onerror="this.src='images/unknown.png'">
          <div class="vr-id">No.${v.id}</div>
        </div>
        <div class="vr-body">
          <div class="vr-label">${v.label}</div>
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
function renderEntry(e) {
  document.title = `${e.jp} — 鋸歯生物図鑑`;

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

  const all = window.ENTRIES ?? [];
  const idx = all.findIndex((x) => String(x.no) === no);
  const prev = all[idx - 1];
  const next = all[idx + 1];
  const prevHtml = prev
    ? `<a href="entry.html?no=${prev.no}" class="ed-nav-btn">
         <span class="ed-nav-dir">← PREV</span>
         <span class="ed-nav-nm">${prev.jp}</span>
         <span class="ed-nav-en">No.${String(prev.no).padStart(3, "0")}</span>
       </a>`
    : `<div class="ed-nav-btn ed-nav-empty">— 先頭の標本 —</div>`;
  const nextHtml = next
    ? `<a href="entry.html?no=${next.no}" class="ed-nav-btn ed-nav-right">
         <span class="ed-nav-dir">NEXT →</span>
         <span class="ed-nav-nm">${next.jp}</span>
         <span class="ed-nav-en">No.${String(next.no).padStart(3, "0")}</span>
       </a>`
    : `<div class="ed-nav-btn ed-nav-right ed-nav-empty">— 最後の標本 —</div>`;

  container.innerHTML = `

    <!-- TOP STRIP -->
    <div class="ed-strip">
      <a href="index.html#catalog" class="ed-strip-back">← CATALOG</a>
      <div class="ed-strip-path">
        <span>HOME</span><span class="ed-strip-sep">/</span>
        <span>CATALOG</span><span class="ed-strip-sep">/</span>
        <span style="color:var(--ink)">No.${String(e.no).padStart(3, "0")}</span>
      </div>
      <span class="ed-strip-id">ENTRY_${String(e.no).padStart(3, "0")}</span>
    </div>

    <!-- HERO -->
    <div class="ed-hero">
      <div class="ed-hero-l">
        <div class="ed-hero-meta reveal">
          <span class="rarity ${rarClass}">${e.rarity ?? "COMMON"}</span>
          <span class="ed-hero-no">No.${String(e.no).padStart(3, "0")}</span>
        </div>
        <h1 class="ed-hero-jp reveal">${e.jp}</h1>
        <div class="ed-hero-en reveal">${e.en}</div>
        <div class="ed-hero-tag reveal">${e.tag ?? ""}</div>
        <div class="ed-bars reveal">${bars}</div>
      </div>
      <div class="ed-hero-r">
        <div class="ed-viewer">
          <div class="reticle"></div>
          <div class="cm cm-tl"></div><div class="cm cm-tr"></div>
          <div class="cm cm-bl"></div><div class="cm cm-br"></div>
          <div class="ed-scan-line"></div>
          <img class="ed-img sp-float" src="${e.image}" alt="${e.jp}"
               onerror="this.src='images/unknown.png'"/>
          <div class="ed-viewer-label">SPECIMEN_VIEW</div>
        </div>
      </div>
    </div>

    <!-- SYS DIVIDER -->
    <div class="sys-div">
      <div class="sys-dc">ID: <span>ENTRY_${String(e.no).padStart(3, "0")}</span></div>
      <div class="sys-dc">TYPE: <span>${e.tag ?? "—"}</span></div>
      <div class="sys-dc">HABITAT: <span>${e.habitat ?? "—"}</span></div>
      <div class="sys-dc">STATUS: <span>${e.status ?? "—"}</span></div>
    </div>

    <!-- BODY -->
    <div class="ed-body">

      <div class="ed-col-main">
        <div class="ed-block reveal">
          <div class="ed-block-label">FIELD NOTES / 観察記録</div>
          <p class="ed-desc">${e.desc ?? "記録なし"}</p>
        </div>
        <div class="ed-block reveal">
          <div class="ed-block-label">SPECIMEN DATA</div>
          <div class="entry-table">${rows}</div>
        </div>
        ${
          e.notes
            ? `
        <div class="ed-block reveal">
          <div class="ed-block-label">RESEARCHER NOTE</div>
          <p class="ed-notes">${e.notes}</p>
        </div>`
            : ""
        }
      </div>

      <div class="ed-col-side">
        <div class="ed-panel reveal">
          <div class="ed-panel-title">ABILITY / 特殊能力</div>
          ${(e.abilities ?? ["記録なし"])
            .map(
              (a) => `
            <div class="ed-ability-row">
              <span class="ed-ability-ic">⬡</span>
              <span class="ed-ability-txt">${a}</span>
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
      </div>
    </div>

    <!-- VARIANTS（バリアントがある個体のみ表示） -->
    ${variantsSection(e)}

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
