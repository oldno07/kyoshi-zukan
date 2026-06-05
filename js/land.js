// ============================================================
// 鋸歯生物図鑑 LP - land.js
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  // ============================================================
  // 1. FADE-IN on scroll
  // ============================================================
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px",
    threshold: 0.12,
  });

  document.querySelectorAll(".fade-in").forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
    fadeObserver.observe(el);
  });


  // ============================================================
  // 2. CATALOG カード: スクロールで順番に出現
  // ============================================================
  const catalogObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("catalog-card--visible");
        catalogObserver.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px",
    threshold: 0.15,
  });

  document.querySelectorAll(".catalog-card").forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(24px)";
    card.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    catalogObserver.observe(card);
  });

  const catalogStyle = document.createElement("style");
  catalogStyle.textContent = `
    .catalog-card--visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(catalogStyle);


  // ============================================================
  // 3. HERO creature label: フェードインで登場
  // ============================================================
  const creatureLabel = document.querySelector(".hero-creature-label");
  if (creatureLabel) {
    creatureLabel.style.opacity = "0";
    creatureLabel.style.transform = "translateX(-50%) translateY(10px)";
    creatureLabel.style.transition = "opacity 0.8s ease 1s, transform 0.8s ease 1s";

    requestAnimationFrame(() => {
      setTimeout(() => {
        creatureLabel.style.opacity = "1";
        creatureLabel.style.transform = "translateX(-50%) translateY(0)";
      }, 800);
    });
  }


  // ============================================================
  // 4. AREA: 横スクロール（キーボード対応）
  // ============================================================
  const areaScroll = document.querySelector(".area-scroll");
  if (areaScroll) {
    const areaCards = document.querySelectorAll(".area-card");
    let currentIndex = 0;

    document.addEventListener("keydown", (e) => {
      const areaRect = document.querySelector(".area")?.getBoundingClientRect();
      if (!areaRect) return;
      const inView = areaRect.top < window.innerHeight && areaRect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowRight" && currentIndex < areaCards.length - 1) {
        currentIndex++;
        areaCards[currentIndex].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        currentIndex--;
        areaCards[currentIndex].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      }
    });

    areaScroll.addEventListener("scroll", () => {
      const cardWidth = areaCards[0]?.offsetWidth + 32 || 320;
      currentIndex = Math.round(areaScroll.scrollLeft / cardWidth);
    }, { passive: true });
  }


  // ============================================================
  // 5. SPOT: クリックでLOGセクションへ
  // ============================================================
  document.querySelectorAll(".spot").forEach((spot) => {
    spot.addEventListener("click", () => {
      document.getElementById("log")?.scrollIntoView({ behavior: "smooth" });
    });
  });


  // ============================================================
  // 6. アンカーリンクのスムーズスクロール
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });


  // ============================================================
  // 7. CTAボタン: クリック時の押し込み感
  // ============================================================
  document.querySelectorAll(".hero-cta, .footer-link").forEach((btn) => {
    btn.addEventListener("mousedown", () => {
      btn.style.transform = "scale(0.95)";
    });
    ["mouseup", "mouseleave"].forEach((ev) => {
      btn.addEventListener(ev, () => {
        btn.style.transform = "";
      });
    });
  });

});
// ============================================================
// 8. NEWS: news.js からデータを動的描画
// ============================================================
const newsList = document.getElementById("news-list");
if (newsList && window.NEWS) {
  const TYPE_LABEL = {
    new:   "NEW",
    event: "EVENT",
    shop:  "SHOP",
    info:  "INFO",
  };

  const STATUS_LABEL = {
    upcoming: "開催予定",
    ongoing:  "開催中",
    ended:    "終了",
  };

  const formatDate = (str) => str.replace(/-/g, ".");

  const items = window.NEWS.slice(0, 5);

  newsList.innerHTML = items.map((item) => {
    const typeLabel   = TYPE_LABEL[item.type] ?? item.type.toUpperCase();
    const statusBadge = item.status
      ? `<span class="news-badge news-badge--status news-badge--${item.status}">${STATUS_LABEL[item.status]}</span>`
      : "";
    const linkBtn = item.link
      ? `<a href="${item.link}" class="news-link" target="_blank" rel="noopener">${item.linkLabel}</a>`
      : "";
    const thumb = item.image
      ? `<div class="news-thumb"><img src="${item.image}" alt="${item.title}" class="news-thumb-img" /></div>`
      : `<div class="news-thumb news-thumb--empty"></div>`;

    return `
      <div class="news-item">
        ${thumb}
        <div class="news-item-body">
          <div class="news-item-meta">
            <span class="news-date">${formatDate(item.date)}</span>
            <span class="news-badge news-badge--${item.type}">${typeLabel}</span>
            ${statusBadge}
          </div>
          <span class="news-title">${item.title}</span>
        </div>
        ${linkBtn}
      </div>
    `;
  }).join("");
}
// カードフリップ
document.querySelectorAll('.catalog-card').forEach((card) => {
  card.addEventListener('click', (e) => {
    // 裏面のリンククリック時はフリップしない
    if (e.target.closest('.catalog-back-cta')) return;
    card.classList.toggle('flipped');
  });
});