// ThemeManager: Gerencia temas do site e o seletor de temas no header
class ThemeManager {
  constructor() {
    // Tema atual
    this.currentTheme = "default";
    // Temas disponíveis
    this.themes = {
      default: { name: "Padrão", icon: "fas fa-palette" },
      fantasy: { name: "Fantasy", icon: "fas fa-dragon" },
      "dark-fire": { name: "Dark Fire", icon: "fas fa-fire" },
      leaf: { name: "Leaf", icon: "fa-solid fa-leaf" },
    };
    this.initialized = false;
  }

  // Inicializa o gerenciador de temas
  init() {
    // Busca tema salvo no localStorage
    const savedTheme = localStorage.getItem("preferredTheme");
    if (savedTheme && this.themes[savedTheme]) {
      this.currentTheme = savedTheme;
    }
    this.applyTheme(this.currentTheme);
    this.addThemeSelector();
    this.initialized = true;
  }

  // Troca o tema atual
  changeTheme(theme) {
    if (this.currentTheme === theme || !this.themes[theme]) return;
    this.currentTheme = theme;
    localStorage.setItem("preferredTheme", theme);
    this.applyTheme(theme);
    this.updateThemeSelector();
  }

  // Aplica o tema selecionado ao body e html
  applyTheme(theme) {
    document.body.classList.remove(
      "theme-default",
      "theme-dark-fire",
      "theme-leaf",
      "theme-fantasy"
    );
    document.body.classList.add(`theme-${theme}`);
    document.documentElement.setAttribute("data-theme", theme);
  }

  // Cria e adiciona o seletor de temas ao header
  addThemeSelector() {
    if (document.getElementById("theme-selector")) return;

    const selector = document.createElement("div");
    selector.id = "theme-selector";
    selector.className = "theme-selector";

    // Monta as opções de tema
    let themeOptions = "";
    for (const [key, value] of Object.entries(this.themes)) {
      const isActive = key === this.currentTheme ? "active" : "";
      themeOptions += `
        <div class="theme-option ${isActive}" data-theme="${key}" title="${value.name}">
          <i class="${value.icon}"></i>
        </div>
      `;
    }

    // Estrutura do seletor
    selector.innerHTML = `
      <div class="theme-toggle">
        <i class="fas fa-adjust"></i>
      </div>
      <div class="theme-dropdown">
        ${themeOptions}
      </div>
    `;

    // Evento: abre/fecha dropdown
    selector.querySelector(".theme-toggle").addEventListener("click", () => {
      selector.classList.toggle("open");
    });

    // Evento: troca de tema
    selector.querySelectorAll(".theme-option").forEach((option) => {
      option.addEventListener("click", () => {
        const theme = option.getAttribute("data-theme");
        this.changeTheme(theme);
        selector.classList.remove("open");
      });
    });

    // Evento: fecha dropdown ao clicar fora
    document.addEventListener("click", (event) => {
      if (!selector.contains(event.target)) {
        selector.classList.remove("open");
      }
    });

    // Adiciona ao header
    const header = document.querySelector("header .header-content");
    if (header) {
      let selectorsContainer = document.querySelector(".header-selectors");
      if (!selectorsContainer) {
        selectorsContainer = document.createElement("div");
        selectorsContainer.className = "header-selectors";
        header.appendChild(selectorsContainer);
      }
      selectorsContainer.appendChild(selector);

      // Adiciona CSS inline do seletor
      const style = document.createElement("style");
      style.textContent = this.getThemeSelectorCSS();
      document.head.appendChild(style);
    }
  }

  // Atualiza o estado visual do seletor de temas
  updateThemeSelector() {
    const options = document.querySelectorAll(".theme-option");
    options.forEach((option) => {
      const theme = option.getAttribute("data-theme");
      option.classList.toggle("active", theme === this.currentTheme);
    });
  }

  // CSS do seletor de temas
  getThemeSelectorCSS() {
    return `
      .theme-selector {
        position: relative;
        margin-left: 20px;
      }
      .theme-toggle {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .theme-toggle i {
        color: var(--cor-destaque);
        font-size: 1rem;
      }
      .theme-toggle:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-3px);
      }
      .theme-dropdown {
        position: absolute;
        top: 100%;
        right: -12px;
        background: var(--cor-fundo-escuro);
        border-radius: 8px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        border: 1px solid var(--cor-primaria);
        opacity: 0;
        visibility: hidden;
        transform: translateY(10px);
        transition: all 0.3s ease;
        z-index: 1000;
        margin-top: 10px;
      }
      .theme-selector.open .theme-dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      .theme-option {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.1);
      }
      .theme-option i {
        color: var(--cor-texto-claro);
        font-size: 1rem;
      }
      .theme-option:hover {
        transform: scale(1.1);
      }
      .theme-option.active {
        background: var(--cor-destaque);
      }
      .theme-option.active i {
        color: var(--cor-secundaria);
      }
    `;
  }
}

// Inicializa o ThemeManager quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  window.themeManager = new ThemeManager();
  window.themeManager.init();
});
