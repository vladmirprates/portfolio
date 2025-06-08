class ThemeManager {
  constructor() {
    this.currentTheme = "default";
    this.themes = {
      default: {
        name: "Padrão",
        icon: "fas fa-palette",
      },
      fantasy: {
        name: "Fantasy",
        icon: "fas fa-dragon",
      },
      "dark-fire": {
        name: "Dark Fire",
        icon: "fas fa-fire",
      },
      leaf: {
        name: "Leaf",
        icon: "fa-solid fa-leaf",
      },
    };
    this.initialized = false;
  }

  // Inicializa o gerenciador de temas
  init() {
    // Verifica se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem("preferredTheme");

    // Define o tema atual baseado na preferência salva ou usa o padrão
    if (savedTheme && this.themes[savedTheme]) {
      this.currentTheme = savedTheme;
    }

    // Aplica o tema atual
    this.applyTheme(this.currentTheme);

    // Adiciona o seletor de temas se não existir
    this.addThemeSelector();

    this.initialized = true;
  }

  // Muda o tema atual
  changeTheme(theme) {
    if (this.currentTheme === theme || !this.themes[theme]) return;

    // Salva a preferência
    this.currentTheme = theme;
    localStorage.setItem("preferredTheme", theme);

    // Aplica o novo tema
    this.applyTheme(theme);

    // Atualiza o seletor de temas
    this.updateThemeSelector();
  }

  // Aplica o tema selecionado
  applyTheme(theme) {
    // Remove classes de temas anteriores
    document.body.classList.remove(
      "theme-default",
      "theme-dark-fire",
      "theme-leaf",
      "theme-fantasy"
    );

    // Adiciona a classe do tema atual
    document.body.classList.add(`theme-${theme}`);

    // Atualiza o atributo data-theme para uso em CSS
    document.documentElement.setAttribute("data-theme", theme);
  }

  // Adiciona o seletor de temas ao cabeçalho
  addThemeSelector() {
    // Verifica se o seletor já existe
    if (document.getElementById("theme-selector")) return;

    // Cria o elemento do seletor
    const selector = document.createElement("div");
    selector.id = "theme-selector";
    selector.className = "theme-selector";

    // Cria o HTML do seletor
    let themeOptions = "";
    for (const [key, value] of Object.entries(this.themes)) {
      const isActive = key === this.currentTheme ? "active" : "";
      themeOptions += `
        <div class="theme-option ${isActive}" data-theme="${key}" title="${value.name}">
          <i class="${value.icon}"></i>
        </div>
      `;
    }

    selector.innerHTML = `
      <div class="theme-toggle">
        <i class="fas fa-adjust"></i>
      </div>
      <div class="theme-dropdown">
        ${themeOptions}
      </div>
    `;

    // Adiciona eventos de clique
    selector.querySelector(".theme-toggle").addEventListener("click", () => {
      selector.classList.toggle("open");
    });

    selector.querySelectorAll(".theme-option").forEach((option) => {
      option.addEventListener("click", () => {
        const theme = option.getAttribute("data-theme");
        this.changeTheme(theme);
        selector.classList.remove("open");
      });
    });

    // Fecha o dropdown ao clicar fora
    document.addEventListener("click", (event) => {
      if (!selector.contains(event.target)) {
        selector.classList.remove("open");
      }
    });

    // Adiciona o seletor ao container de seletores ou ao header
    const header = document.querySelector("header .header-content");
    if (header) {
      let selectorsContainer = document.querySelector(".header-selectors");
      if (!selectorsContainer) {
        selectorsContainer = document.createElement("div");
        selectorsContainer.className = "header-selectors";
        header.appendChild(selectorsContainer);
      }
      selectorsContainer.appendChild(selector);

      // Adiciona estilos CSS inline
      const style = document.createElement("style");
      style.textContent = this.getThemeSelectorCSS();
      document.head.appendChild(style);
    }
  }

  // Atualiza o seletor de temas
  updateThemeSelector() {
    const options = document.querySelectorAll(".theme-option");
    options.forEach((option) => {
      const theme = option.getAttribute("data-theme");
      if (theme === this.currentTheme) {
        option.classList.add("active");
      } else {
        option.classList.remove("active");
      }
    });
  }

  // Retorna o CSS para o seletor de temas
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

// Cria e inicializa o gerenciador de temas quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  window.themeManager = new ThemeManager();
  window.themeManager.init();
});
