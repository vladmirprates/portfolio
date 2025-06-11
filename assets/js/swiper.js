// Inicialização do Swiper
const swiper = new Swiper(".swiper", {
    // Loop infinito dos slides
    loop: true,

    // Espaçamento entre slides
    spaceBetween: 30,

    // Centralização dos slides (padrão)
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

    // Experiência do usuário
    grabCursor: true,            // Cursor de "pegar" ao passar o mouse
    watchOverflow: true,         // Desativa Swiper se slides não excedem o container

    // Efeitos de transição
    speed: 600,                  // Duração da transição (ms)
    effect: 'slide',             // Tipo de efeito

    // Configurações de touch/swipe
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,

    // Prevenção de cliques durante transição
    preventClicks: true,
    preventClicksPropagation: true,
});
