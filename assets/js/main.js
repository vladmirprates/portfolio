// Inicialização do AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", function () {
  // Inicializa a biblioteca AOS para animações de scroll
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });

  // Header scroll effect
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Menu mobile toggle
  const menuToggle = document.createElement("div");
  menuToggle.className = "menu-toggle";
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

  const nav = document.querySelector("nav");
  const navUl = document.querySelector("nav ul");

  if (window.innerWidth <= 576) {
    nav.appendChild(menuToggle);
  }

  menuToggle.addEventListener("click", function () {
    navUl.classList.toggle("show");
    const icon = menuToggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  });

  // Fecha menu ao clicar em link
  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 576) {
        navUl.classList.remove("show");
      }
    });
  });

  // Smooth scroll para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      // Ignora se for apenas "#"
      if (!targetId || targetId === "#" || targetId.length === 1) return;
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
