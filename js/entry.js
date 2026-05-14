// URLから no を取得
const params = new URLSearchParams(window.location.search);
const no = params.get("no");

// データから該当個体を取得
const entry = window.ENTRIES.find((e) => String(e.no) === no);

const container = document.getElementById("entry-detail");

if (!entry) {
  container.innerHTML = "<p>Not Found</p>";
} else {
  renderEntry(entry);
}


function renderEntry(e) {
  container.innerHTML = `
    <div class="entry-wrap">

      <div class="entry-hero">
        <div class="entry-meta">
          <div class="entry-no">No.${e.no}</div>
          <div class="entry-tag">${e.tag}</div>
        </div>

        <h1 class="entry-title-jp">${e.jp}</h1>
        <div class="entry-title-en">${e.en}</div>
      </div>

      <div class="entry-body">

        <div class="entry-image">
          <img src="${e.image}" alt="${e.jp}" onerror="this.src='images/unknown.png'">
        </div>

        <div class="entry-info">

          <div class="entry-section-title">SPECIMEN DATA</div>

          <div class="entry-desc">
            ${e.desc ?? "記録なし"}
          </div>

          <div class="entry-table">
            <div class="entry-row">
              <div class="k">HABITAT</div>
              <div class="v">${e.habitat ?? "-"}</div>
            </div>

            <div class="entry-row">
              <div class="k">SIZE</div>
              <div class="v">${e.size ?? "-"}</div>
            </div>

            <div class="entry-row">
              <div class="k">MOBILITY</div>
              <div class="v">${e.mobility ?? "-"}</div>
            </div>

            <div class="entry-row">
              <div class="k">STATUS</div>
              <div class="v">${e.status ?? "-"}</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  `;
}
