const swiper = new Swiper(".swiper", {
  loop: true,
  spaceBetween: 30,
  centeredSlides: false,
  
  // Autoplay
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  
  // Paginação
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Botões de navegação
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Breakpoints para responsividade
  breakpoints: {
    // Mobile pequeno
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: true,
    },
    // Mobile grande
    480: {
      slidesPerView: 1.2,
      spaceBetween: 20,
      centeredSlides: false,
    },
    // Tablet
    768: {
      slidesPerView: 1.5,
      spaceBetween: 25,
      centeredSlides: false,
    },
    // Desktop pequeno
    1024: {
      slidesPerView: 1,
      spaceBetween: 50,
      centeredSlides: false,
    },
    // Desktop grande
    1200: {
      slidesPerView: 1,
      spaceBetween: 50,
      centeredSlides: false,
    },
  },

  // Configurações adicionais para melhor experiência
  grabCursor: true,
  watchOverflow: true,
  
  // Efeitos de transição
  speed: 600,
  effect: 'slide',
  
  // Configurações de touch/swipe
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  
  // Prevenção de cliques durante transição
  preventClicks: true,
  preventClicksPropagation: true,
});

