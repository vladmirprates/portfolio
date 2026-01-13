// Swiper initialization
const swiper = new Swiper(".swiper", {
  // Infinite loop of slides
  loop: true,

  // Spacing between slides
  spaceBetween: 30,

  // Slide centering (default)
  centeredSlides: false,

  // Autoplay
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  // Pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation buttons
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Responsiveness breakpoints
  breakpoints: {
    // Small mobile
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: true,
    },
    // Large mobile
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: false,
    },
    // Tablet
    768: {
      slidesPerView: 1,
      spaceBetween: 25,
      centeredSlides: false,
    },
    // Small desktop
    1024: {
      slidesPerView: 1,
      spaceBetween: 50,
      centeredSlides: false,
    },
    // Large desktop
    1200: {
      slidesPerView: 1,
      spaceBetween: 50,
      centeredSlides: false,
    },
  },

  // User experience
  grabCursor: true, // "Grab" cursor on hover
  watchOverflow: true, // Disable Swiper if slides don't exceed container

  // Transition effects
  speed: 600, // Transition duration (ms)
  effect: "slide", // Effect type

  // Touch/swipe settings
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,

  // Prevent clicks during transition
  preventClicks: true,
  preventClicksPropagation: true,
});

// Pause autoplay initially
swiper.autoplay.stop();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        swiper.autoplay.start();
      }
    });
  },
  {
    threshold: 0.3,
  }
);

observer.observe(document.querySelector(".swiper"));
