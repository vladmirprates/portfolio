// Animação do terminal
document.addEventListener("DOMContentLoaded", function () {
  // Criar partículas
  const particlesContainer = document.getElementById("particles");
  if (particlesContainer) {
    for (let i = 0; i < 50; i++) {
      createParticle();
    }
  }

  function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Posição aleatória
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight + window.innerHeight; // Começa abaixo da tela

    // Tamanho aleatório
    const size = Math.random() * 4 + 1;

    // Cor aleatória entre as cores do tema
    const colors = ["#7e57c2", "#00e676", "#ff3d00"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Duração aleatória
    const duration = Math.random() * 2 + 2;

    // Atraso aleatório
    const delay = Math.random() * 5;

    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    particle.style.animation = `float ${duration}s infinite linear`;
    particle.style.animationDelay = `${delay}s`;

    particlesContainer.appendChild(particle);
  }

  // Animação do terminal
  const terminalLines = document.querySelectorAll(".terminal-line");
  const terminalTexts = document.querySelectorAll(".terminal-text");
  const mainTitle = document.getElementById("main-title");
  
  let currentLine = 0;

  function animateTerminal() {
    if (currentLine < terminalLines.length) {
      const line = terminalLines[currentLine];
      const text = terminalTexts[currentLine];

      line.classList.add("visible");
      text.classList.add("typing");

      // Mostrar o título após a primeira linha
      if (currentLine === 0) {
        setTimeout(() => {
          mainTitle.classList.add("visible");
        }, 300);
      }

      // Tempo de digitação baseado no comprimento do texto
      const typingDuration = text.textContent.length * 20;

      setTimeout(() => {
        currentLine++;
        if (currentLine < terminalLines.length) {
          animateTerminal();
        }
      }, typingDuration);
    }
  }

  // Começar a animação do terminal após o carregamento
  setTimeout(animateTerminal, 200);

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
