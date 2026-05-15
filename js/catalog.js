let currentFilter = "ALL";

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

document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  // updateEntryCount は main.js が担当
  // .entry-total の更新だけここで行う
  const total = window.ENTRIES?.length ?? 0;
  document.querySelectorAll(".entry-total").forEach((el) => {
    el.textContent = total.toString().padStart(3, "0");
  });
});
