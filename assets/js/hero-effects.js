document.addEventListener("DOMContentLoaded", function () {
  // Particles effect on mouse move
  const heroParticles = document.querySelector(".hero-particles");
  if (heroParticles) {
    document.addEventListener("mousemove", (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      heroParticles.style.backgroundPosition = `${x * 40}% ${y * 40}%`;
    });
  }

  // Smooth parallax effect on scroll
  const heroSection = document.querySelector(".hero-section");
  if (heroSection) {
    window.addEventListener("scroll", () => {
      heroSection.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
    });
  }

  // Typing effect for subtitle
  let typingTimeoutId = null;

  // Clears the typing effect timeout
  window.clearTypingEffect = function () {
    if (typingTimeoutId) {
      clearTimeout(typingTimeoutId);
      typingTimeoutId = null;
    }
  };

  // Starts the typing effect
  window.startTypingEffect = function () {
    window.clearTypingEffect();

    const subtitle = document.querySelector(".hero-text p");
    if (subtitle) {
      // Always use the updated textContent, not the attribute
      const currentText = subtitle.textContent;

      // Update data-original-text with the current text
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
