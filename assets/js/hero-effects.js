// hero-effects.js
document.addEventListener("DOMContentLoaded", function () {
  // Efeito partículas
  const heroParticles = document.querySelector(".hero-particles");
  if (heroParticles) {
    document.addEventListener("mousemove", (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      heroParticles.style.backgroundPosition = `${x * 40}% ${y * 40}%`;
    });
  }

  // Efeito de parallax suave
  const heroSection = document.querySelector(".hero-section");
  if (heroSection) {
    window.addEventListener("scroll", () => {
      heroSection.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
    });
  }

  // Efeito de digitação no subtítulo
  let typingTimeoutId = null; // Variável para armazenar o ID do timeout

  window.clearTypingEffect = function () {
    if (typingTimeoutId) {
      clearTimeout(typingTimeoutId);
      typingTimeoutId = null;
    }
  };

  window.startTypingEffect = function () {
    window.clearTypingEffect(); // Limpa qualquer timeout anterior antes de iniciar

    const subtitle = document.querySelector(".hero-text p");
    if (subtitle) {
      // Obtenha o texto original do elemento, não do conteúdo HTML, para evitar tags
      const originalText =
        subtitle.getAttribute("data-original-text") || subtitle.textContent;
      subtitle.setAttribute("data-original-text", originalText); // Armazena o texto original
      subtitle.textContent = "";
      let charIndex = 0;
      const typeWriter = () => {
        if (charIndex < originalText.length) {
          subtitle.textContent += originalText.charAt(charIndex);
          charIndex++;
          typingTimeoutId = setTimeout(typeWriter, 50);
        } else {
          typingTimeoutId = null; // Limpa o ID do timeout quando a digitação termina
        }
      };
      typingTimeoutId = setTimeout(() => {
        typeWriter();
      }, 1000);
    }
  };
});
