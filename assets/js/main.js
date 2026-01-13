document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS animations
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

  // Responsive menu elements
  const menuToggle = document.createElement("div");
  menuToggle.className = "menu-toggle";
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

  const nav = document.querySelector("nav");
  const navUl = document.querySelector("nav ul");

  // Add mobile menu button if necessary
  if (window.innerWidth <= 576) {
    nav.appendChild(menuToggle);
  }

  // Function to reset menu toggle icon
  function resetMenuToggle() {
    const icon = menuToggle.querySelector("i");
    if (icon.classList.contains("fa-times")) {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  }

  // Toggle mobile menu display and icon
  menuToggle.addEventListener("click", function () {
    navUl.classList.toggle("show");
    const icon = menuToggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  });

  // Close menu when clicking on link and reset icon
  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 576) {
        navUl.classList.remove("show");
        resetMenuToggle();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!navUl.contains(event.target) && !menuToggle.contains(event.target)) {
      if (navUl.classList.contains("show")) {
        navUl.classList.remove("show");
        resetMenuToggle();
      }
    }
  });

  // Smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId.length === 1) return;
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const offset =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    });
  });

  // Active section indicator in menu
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

  // Add or remove responsive menu button on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 576 && !nav.querySelector(".menu-toggle")) {
      nav.appendChild(menuToggle);
    } else if (window.innerWidth > 576 && nav.querySelector(".menu-toggle")) {
      menuToggle.remove();
    }
  });

  window.addEventListener("resize", () => {
    const header = document.querySelector("header");
    const nav = document.querySelector("nav ul");

    if (window.innerWidth > 1200) {
      const availableSpace =
        header.offsetWidth -
        document.querySelector(".logo-area").offsetWidth -
        document.querySelector(".header-selectors").offsetWidth;

      if (nav.scrollWidth > availableSpace) {
        document.querySelectorAll("nav ul li").forEach((item) => {
          item.style.margin = "0 10px";
        });
      }
    }
  });
});
