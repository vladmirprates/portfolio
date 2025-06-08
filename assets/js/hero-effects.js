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
    window.clearTypingEffect();

    const subtitle = document.querySelector(".hero-text p");
    if (subtitle) {
      // SEMPRE usa o textContent atualizado, não o atributo
      const currentText = subtitle.textContent;

      // Atualiza o data-original-text com o texto atual
      subtitle.setAttribute("data-original-text", currentText);

      subtitle.textContent = "";
      let charIndex = 0;

      const typeWriter = () => {
        if (charIndex < currentText.length) {
          subtitle.textContent += currentText.charAt(charIndex);
          charIndex++;
          typingTimeoutId = setTimeout(typeWriter, 50);
        } else {
          typingTimeoutId = null;
        }
      };

      typingTimeoutId = setTimeout(typeWriter, 300);
    }
  };
});
