// URLから no を取得
const params = new URLSearchParams(window.location.search);
const no = params.get("no");

// データから該当個体を取得
const entry = window.ENTRIES.find((e) => e.no === no);

const container = document.getElementById("entry-detail");

if (!entry) {
  container.innerHTML = "<p>Not Found</p>";
} else {
  renderEntry(entry);
}

function renderEntry(e) {
  container.innerHTML = `
    <div class="entry-card">

      <h1>No.${e.no} ${e.jp}</h1>
      <h2>${e.en}</h2>

      <img src="${e.image}" alt="${e.jp}" />

      <p>${e.desc}</p>

      <ul>
        <li>タグ: ${e.tag}</li>
        <li>生息地: ${e.habitat}</li>
        <li>サイズ: ${e.size}</li>
        <li>機動性: ${e.mobility}</li>
        <li>ステータス: ${e.status}</li>
      </ul>

    </div>
  `;
}
