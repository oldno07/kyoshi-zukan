/* ============================================================
   Reveal Animation
   ============================================================ */

export function initReveal() {
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
