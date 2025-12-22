export function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const fadeUpObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll("[data-animate]");
  animatedElements.forEach((el, index) => {
    const delay = index * 80; 
    el.style.transitionDelay = `${delay}ms`;
    fadeUpObserver.observe(el);
  });
}

export function initCardHoverEffects() {
  const cards = document.querySelectorAll("[data-card]");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-3px) scale(1.01)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });
}

export function revealOnScroll(selector = ".reveal") {
  const elements = document.querySelectorAll(selector);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("revealed");
          }, index * 100);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
}

export function initAnimations() {
  document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
    initCardHoverEffects();
    revealOnScroll();
  });

  window.addEventListener("hashchange", () => {
    setTimeout(() => {
      initScrollAnimations();
      initCardHoverEffects();
      revealOnScroll();
    }, 50);
  });
}
