// Theme Park LP - 鋸歯生物展示室
// Scroll animations, horizontal scroll snap, and interactions

document.addEventListener("DOMContentLoaded", () => {
  // Fade-in animation on scroll
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((el) => observer.observe(el));

  // Horizontal scroll snap for AREA section
  const areaScroll = document.querySelector(".area-scroll");
  if (areaScroll) {
    // Add smooth scroll behavior
    areaScroll.style.scrollBehavior = "smooth";

    // Optional: Add scroll indicators or custom navigation
    const areaCards = document.querySelectorAll(".area-card");
    let currentIndex = 0;

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (currentIndex < areaCards.length - 1) {
          currentIndex++;
          areaCards[currentIndex].scrollIntoView({
            behavior: "smooth",
            inline: "start",
          });
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (currentIndex > 0) {
          currentIndex--;
          areaCards[currentIndex].scrollIntoView({
            behavior: "smooth",
            inline: "start",
          });
        }
      }
    });

    // Update current index on scroll
    areaScroll.addEventListener("scroll", () => {
      const scrollLeft = areaScroll.scrollLeft;
      const cardWidth = areaCards[0].offsetWidth + 32; // card width + gap
      currentIndex = Math.round(scrollLeft / cardWidth);
    });
  }

  // SPOT hover effects with slight delay for natural feel
  const spots = document.querySelectorAll(".spot");
  spots.forEach((spot) => {
    spot.addEventListener("mouseenter", () => {
      // Add a subtle bounce effect
      spot.style.animation = "bounce 0.5s ease";
    });

    spot.addEventListener("mouseleave", () => {
      spot.style.animation = "";
    });

    // Click to scroll to corresponding section
    spot.addEventListener("click", () => {
      const logSection = document.getElementById("log");
      if (logSection) {
        logSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Button press effect
  const buttons = document.querySelectorAll(".hero-cta, .footer-link");
  buttons.forEach((button) => {
    button.addEventListener("mousedown", () => {
      button.style.transform = "scale(0.95)";
    });

    button.addEventListener("mouseup", () => {
      button.style.transform = "";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });

  // Log card stagger animation
  const logCards = document.querySelectorAll(".log-card");
  logCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Parallax effect for hero background
  const hero = document.querySelector(".hero");
  const heroBg = document.querySelector(".hero-bg");

  if (hero && heroBg) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const heroHeight = hero.offsetHeight;

      if (scrolled < heroHeight) {
        const parallaxValue = scrolled * 0.3;
        heroBg.style.transform = `translateY(${parallaxValue}px)`;
      }
    });
  }

  // Add bounce animation keyframes dynamically
  const style = document.createElement("style");
  style.textContent = `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
    }
  `;
  document.head.appendChild(style);
});
