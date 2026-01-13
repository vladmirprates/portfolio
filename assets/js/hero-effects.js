document.addEventListener("DOMContentLoaded", function () {
  
  // --- TERMINAL LOGIC ---
  const terminalLines = document.querySelectorAll(".terminal-line");
  const terminalTexts = document.querySelectorAll(".terminal-text");
  const mainTitle = document.getElementById("main-title");
  
  let currentLine = 0;

  function animateTerminal() {
    if (currentLine < terminalLines.length) {
      const line = terminalLines[currentLine];
      const text = terminalTexts[currentLine];

      // Make the line visible and start CSS typing effect
      line.classList.add("visible");
      text.classList.add("typing");

      // Show main title after first line (if exists)
      if (currentLine === 0 && mainTitle) {
        setTimeout(() => {
          mainTitle.classList.add("visible");
        }, 300);
      }

      // Calculate time based on text size to seem natural
      // Minimum 1s, maximum 3s
      const typingDuration = Math.min(Math.max(text.textContent.length * 50, 1000), 3000);

      setTimeout(() => {
        currentLine++;
        if (currentLine < terminalLines.length) {
          animateTerminal();
        }
      }, typingDuration);
    }
  }

  // Start terminal with a small delay to ensure rendering
  setTimeout(animateTerminal, 500);


  // --- SUBTITLE TYPING EFFECT (HERO) ---
  let typingTimeoutId = null;

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
      const currentText = subtitle.getAttribute("data-original-text") || subtitle.textContent;
      
      // Save original text if not yet saved
      if (!subtitle.getAttribute("data-original-text")) {
        subtitle.setAttribute("data-original-text", currentText);
      }

      subtitle.textContent = "";
      let charIndex = 0;

      const typeWriter = () => {
        if (charIndex < currentText.length) {
          subtitle.textContent += currentText.charAt(charIndex);
          charIndex++;
          typingTimeoutId = setTimeout(typeWriter, 30); // Typing speed
        } else {
          typingTimeoutId = null;
        }
      };

      typingTimeoutId = setTimeout(typeWriter, 300);
    }
  };
});