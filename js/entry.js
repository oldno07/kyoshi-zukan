const params = new URLSearchParams(window.location.search);
const no = params.get("no");

const entry = window.getEntryByNo(no);

if (!entry) {
  document.getElementById("entry-detail").innerHTML = "Not Found";
} else {
  renderEntry(entry);
}

function renderEntry(e) {
  document.getElementById("entry-detail").innerHTML = `
    <div class="entry-card">
      <h1>No.${e.no} ${e.jp}</h1>
      <h2>${e.en}</h2>
      <img src="${e.image}" />
      <p>${e.desc}</p>

      <ul>
        <li>Habitat: ${e.habitat}</li>
        <li>Size: ${e.size}</li>
        <li>Mobility: ${e.mobility}</li>
      </ul>
    </div>
  `;
}
