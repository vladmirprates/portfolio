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
  window.startTypingEffect = function () {
    const subtitle = document.querySelector(".hero-text p");
    if (subtitle) {
      const originalText = subtitle.textContent;
      subtitle.textContent = "";
      let charIndex = 0;
      const typeWriter = () => {
        if (charIndex < originalText.length) {
          subtitle.textContent += originalText.charAt(charIndex);
          charIndex++;
          setTimeout(typeWriter, 50);
        }
      };
      setTimeout(() => {
        typeWriter();
      }, 1000);
    }
  };
});
