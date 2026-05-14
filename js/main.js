/* ============================================================
   鋸歯生物図鑑 — main.js
   ============================================================ */

/* ----------------------------------------------------------
   1. Header / Footer 読み込み
   ---------------------------------------------------------- */

async function loadComponent(selector, path) {
  const el = document.querySelector(selector);

  if (!el) return;

  try {
    const res = await fetch(path);

    if (!res.ok) {
      throw new Error(res.status);
    }

    el.innerHTML = await res.text();
  } catch (err) {
    console.warn("component load failed:", path, err);
  }
}

async function initComponents() {
  await Promise.all([
    loadComponent("#header-placeholder", "components/header.html"),
    loadComponent("#footer-placeholder", "components/footer.html"),
  ]);
}

/* ----------------------------------------------------------
   2. Scroll Reveal
   ---------------------------------------------------------- */

function initReveal() {
  const reveals = document.querySelectorAll(".reveal");

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  reveals.forEach((r) => obs.observe(r));
}

/* ----------------------------------------------------------
   3. Filter
   ---------------------------------------------------------- */

function setFilter(btn) {
  document
    .querySelectorAll(".flt-btn")
    .forEach((b) => b.classList.remove("active"));

  btn.classList.add("active");

  const filter = btn.textContent.trim();

  document.querySelectorAll(".ecard").forEach((card) => {
    const tag = (card.querySelector(".ctag")?.textContent || "").toUpperCase();

    let show = true;

    if (filter === "PLANT+") {
      show = tag.includes("PLANT") || tag.includes("SUCCULENT");
    } else if (filter === "ANIMAL+") {
      show = tag.includes("BEAST") || tag.includes("ANIMAL");
    }

    card.style.display = show ? "" : "none";
  });
}

/* ----------------------------------------------------------
   4. Init
   ---------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", async () => {
  await initComponents();

  updateEntryCount();

  initReveal();
});
