import { initReveal } from "./reveal.js";

/* ============================================================
   Load Creatures
   ============================================================ */

export async function loadCreatures() {
  const grid = document.getElementById("card-grid");

  if (!grid) return;

  try {
    const res = await fetch("data/creatures.json");

    const creatures = await res.json();

    renderCreatures(creatures);

    updateEntryCount(creatures.length);
  } catch (e) {
    console.error("Creature load failed", e);
  }
}

/* ============================================================
   Render
   ============================================================ */

function renderCreatures(creatures) {
  const grid = document.getElementById("card-grid");

  grid.innerHTML = creatures
    .map(
      (c, i) => `
      <div
        class="ecard reveal"
        style="transition-delay:${i * 0.08}s"
      >

        <div class="ct">

          <span class="cno">
            No.${c.no}
          </span>

          <span class="rarity ${c.rarityClass}">
            ${c.rarity}
          </span>

        </div>

        <div class="cillus">

          <img
            src="${c.image}"
            alt="${c.nameJa}"
          />

        </div>

        <div class="cbody">

          <div class="ctag">
            ${c.tag}
          </div>

          <div class="cnm-jp">
            ${c.nameJa}
          </div>

          <div class="cnm-en">
            ${c.nameEn}
          </div>

          <p class="cdesc">
            ${c.description}
          </p>

          <div class="cdata">

            <div class="dc">
              <div class="dk">
                HABITAT
              </div>

              <div class="dv">
                ${c.habitat}
              </div>
            </div>

            <div class="dc">
              <div class="dk">
                SIZE
              </div>

              <div class="dv">
                ${c.size}
              </div>
            </div>

            <div class="dc">
              <div class="dk">
                MOBILITY
              </div>

              <div class="dv">
                ${c.mobility}
              </div>
            </div>

            <div class="dc">
              <div class="dk">
                STATUS
              </div>

              <div
                class="dv"
                style="color:${c.statusColor}"
              >
                ${c.status}
              </div>
            </div>

          </div>

        </div>
      </div>
    `,
    )
    .join("");

  initReveal();
}

/* ============================================================
   Entry Count
   ============================================================ */

function updateEntryCount(total) {
  document.querySelectorAll(".entry-total").forEach((el) => {
    el.textContent = total.toString().padStart(3, "0");
  });
}
