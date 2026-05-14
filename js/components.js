/* ============================================================
   Components
   ============================================================ */

async function loadComponent(selector, url) {
  const el = document.querySelector(selector);

  if (!el) return;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(res.status);
    }

    el.innerHTML = await res.text();
  } catch (e) {
    console.warn(`Component load failed: ${url}`, e);
  }
}

/* ----------------------------------------------------------
   Base Path
   ---------------------------------------------------------- */

function getBasePath() {
  const depth = location.pathname
    .replace(/\/[^/]*$/, "")
    .split("/")
    .filter(Boolean).length;

  return depth > 0 ? "../".repeat(depth) : "./";
}

/* ----------------------------------------------------------
   Current Nav
   ---------------------------------------------------------- */

function highlightCurrentNav() {
  const path = location.pathname;

  document.querySelectorAll(".nav-a[data-nav]").forEach((a) => {
    const nav = a.dataset.nav;

    if (nav === "world" && path.includes("about")) {
      a.classList.add("current");
    }
  });
}

/* ----------------------------------------------------------
   Init
   ---------------------------------------------------------- */

export async function initComponents() {
  const base = getBasePath();

  await Promise.all([
    loadComponent("#header-placeholder", base + "components/header.html"),

    loadComponent("#footer-placeholder", base + "components/footer.html"),
  ]);

  highlightCurrentNav();
}
