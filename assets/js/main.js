document.addEventListener("DOMContentLoaded", function () {
  // AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: false,
    mirror: false,
  });

  // Header scroll effect
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 100);
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

  // Função para resetar o ícone do menu toggle
  function resetMenuToggle() {
    const icon = menuToggle.querySelector("i");
    if (icon.classList.contains("fa-times")) {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  }

  menuToggle.addEventListener("click", function () {
    navUl.classList.toggle("show");
    const icon = menuToggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  });

  // Fecha menu ao clicar em link e reseta o ícone do toggle
  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 576) {
        navUl.classList.remove("show");
        resetMenuToggle(); // Reseta o ícone quando clica em um link do menu
      }
    });
  });

  // Adiciona evento para fechar o menu quando clicar fora dele
  document.addEventListener("click", function(event) {
    // Verifica se o clique foi fora do menu e do botão toggle
    if (!navUl.contains(event.target) && !menuToggle.contains(event.target)) {
      if (navUl.classList.contains("show")) {
        navUl.classList.remove("show");
        resetMenuToggle(); // Reseta o ícone quando clica fora do menu
      }
    }
  });

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId.length === 1) return;
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const offset =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    });
  });

  // Indicador de seção ativa
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });
  // Menu Responsivo Dinâmico
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 576 && !nav.querySelector(".menu-toggle")) {
      nav.appendChild(menuToggle);
    } else if (window.innerWidth > 576 && nav.querySelector(".menu-toggle")) {
      menuToggle.remove();
    }
  });
});

