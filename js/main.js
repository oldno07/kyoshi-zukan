// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
reveals.forEach(r => obs.observe(r));

// Filter
function setFilter(btn) {
  document.querySelectorAll('.flt-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const filter = btn.textContent.trim();
  const cards = document.querySelectorAll('.ecard');

  cards.forEach(card => {
    const tag = card.querySelector('.ctag') ? card.querySelector('.ctag').textContent.toUpperCase() : '';

    let show = true;

    if (filter === 'PLANT+') {
      show = tag.includes('PLANT') || tag.includes('SUCCULENT');
    } else if (filter === 'ANIMAL+') {
      show = tag.includes('BEAST') || tag.includes('ANIMAL');
    }
    // ALL はすべて表示

    if (show) {
      card.style.display = '';
      // グリッドの見た目を保つため少し遅延してopacityを戻す
      setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'none'; }, 10);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(8px)';
      setTimeout(() => { card.style.display = 'none'; }, 300);
    }
  });
}