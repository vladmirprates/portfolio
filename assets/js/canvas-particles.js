/**
 * CanvasParticleSystem 3.0 - The "Original Feel"
 * Physics: Linear Vertical Ascent (No Sway) + Glow Effect
 */
class CanvasParticleSystem {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.particleCount = 40; // Original quantity
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    // Mouse interaction (Kept because it is a performance improvement without affecting the base visual)
    this.mouse = { x: null, y: null };
    
    // Theme colors
    this.colors = [];

    this.init();
  }

  init() {
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.pointerEvents = "none";
    this.canvas.style.zIndex = "1"; 
    this.container.appendChild(this.canvas);

    this.resize();
    window.addEventListener("resize", () => this.resize());
    
    document.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          this.updateThemeColors();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    this.updateThemeColors();
    this.createParticles();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  updateThemeColors() {
    const style = getComputedStyle(document.documentElement);
    // Cores originais exatas como fallback, mas lendo variáveis para suportar temas
    this.colors = [
      style.getPropertyValue("--cor-primaria").trim() || "#7e57c2",
      style.getPropertyValue("--cor-destaque").trim() || "#00e676",
      style.getPropertyValue("--cor-destaque-alt").trim() || "#ff3d00"
    ];
    
    // Update color of existing particles
    this.particles.forEach(p => {
        p.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    });
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.generateParticle(true));
    }
  }

  generateParticle(randomY = false) {
    // Original size: 1 to 5px (Math.random() * 4 + 1)
    const size = Math.random() * 3 + 1;
    
    // Speed based on original duration (2s to 4s to cross the screen)
    // If height is ~1000px, speed is approx 4 to 8 pixels per frame
    const speedBase = this.height / 150; // Adjust scale according to screen height
    const speed = (Math.random() * speedBase) + (speedBase * 0.1); 

    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : this.height + 10,
      size: size,
      speedY: -speed, // Goes straight up
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      // Original opacity did not vary much, it was fixed or via keyframe, let us keep solid
      opacity: 1.0 
    };
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Optimization: Grouping drawing operations can be faster, 
    // but drawing individually allows different colors/shadows.
    this.particles.forEach((p) => {
      // Linear Movement (No oscillation)
      p.y += p.speedY;

      // Reset particle (Infinite Loop)
      if (p.y < -10) {
        const newP = this.generateParticle(false);
        p.x = newP.x;
        p.y = newP.y;
        p.speedY = newP.speedY;
        p.color = this.colors[Math.floor(Math.random() * this.colors.length)];
      }

      // Desenho
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      
      // GLOW EFFECT (Original: box-shadow: 0 0 size*2 color)
      this.ctx.shadowBlur = p.size * 2;
      this.ctx.shadowColor = p.color;
      
      this.ctx.fill();
      
      // Reset shadow to not affect other elements if any
      this.ctx.shadowBlur = 0;
    });

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener("DOMContentLoaded", () => {
    window.particleSystem = new CanvasParticleSystem("particles");
});
