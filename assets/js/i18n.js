// Gerenciador de Internacionalização (i18n)
class I18nManager {
  constructor() {
    // Idioma padrão
    this.currentLanguage = "pt-br";
    // Armazena as traduções carregadas
    this.translations = {};
    // Indica se o gerenciador já foi inicializado
    this.initialized = false;
  }

  /**
   * Inicializa o gerenciador de idiomas:
   * - Detecta idioma via URL, localStorage ou usa padrão
   * - Carrega traduções
   * - Atualiza conteúdo da página
   * - Adiciona seletor de idioma
   * - Inicia efeito de digitação (se existir)
   * - Limpa parâmetro de idioma da URL
   */
  async init() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang");
    const savedLang = localStorage.getItem("preferredLanguage");

    // Define o idioma atual: prioridade URL > localStorage > padrão
    if (langParam && ["pt-br", "en"].includes(langParam)) {
      this.currentLanguage = langParam;
      localStorage.setItem("preferredLanguage", langParam);
    } else if (savedLang && ["pt-br", "en"].includes(savedLang)) {
      this.currentLanguage = savedLang;
    }

    // Carrega traduções e aplica na página
    await this.loadTranslations(this.currentLanguage);
    this.updatePageContent();
    this.addLanguageSelector();

    // Aguarda DOM e inicia efeito de digitação, se existir
    setTimeout(() => {
      if (typeof window.startTypingEffect === "function") {
        window.startTypingEffect();
      } else {
        console.error("startTypingEffect não está definido.");
      }
    }, 100);

    this.initialized = true;

    // Remove parâmetro de idioma da URL
    if (langParam) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  /**
   * Carrega o arquivo de traduções do idioma especificado.
   * Em caso de erro, faz fallback para o idioma padrão.
   */
  async loadTranslations(lang) {
    try {
      const response = await fetch(`assets/translations/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load translations for ${lang}`);
      this.translations = await response.json();
      return true;
    } catch (error) {
      console.error("Error loading translations:", error);
      // Fallback para o idioma padrão
      if (lang !== "pt-br") {
        this.currentLanguage = "pt-br";
        return this.loadTranslations("pt-br");
      }
      return false;
    }
  }

  /**
   * Altera o idioma atual e atualiza a página.
   * Reinicia o efeito de digitação após a troca.
   */
  async changeLanguage(lang) {
    if (this.currentLanguage === lang) return;

    // Para o efeito de digitação atual
    window.clearTypingEffect();

    // Atualiza idioma e conteúdo
    this.currentLanguage = lang;
    localStorage.setItem("preferredLanguage", lang);
    await this.loadTranslations(lang);
    this.updatePageContent();
    this.updateLanguageSelector();

    // Reinicia o efeito de digitação
    setTimeout(() => {
      if (typeof window.startTypingEffect === "function") {
        window.startTypingEffect();
      }
    }, 0);
  }

  /**
   * Aplica as traduções aos elementos da página com atributo [data-i18n]
   */
  updatePageContent() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = this.getTranslation(key);

      if (translation) {
        // Atualiza atributo para efeito de digitação, se necessário
        if (
          element.classList.contains("hero-text") ||
          element.id === "typing-element"
        ) {
          element.setAttribute("data-original-text", translation);
        }
        // Atualiza o texto do elemento
        element.textContent = translation;
      }
    });
  }

  /**
   * Retorna a tradução para uma chave aninhada (ex: "nav.sobre").
   * Exibe mensagem de erro se a chave não existir.
   */
  getTranslation(key) {
    try {
      return (
        key.split(".").reduce((obj, k) => obj[k], this.translations) ||
        `[MISSING: ${key}]`
      );
    } catch (e) {
      console.error(`Translation error for key "${key}":`, e);
      return `[ERROR: ${key}]`;
    }
  }

  /**
   * Adiciona o seletor de idioma ao cabeçalho, se ainda não existir.
   * Inclui estilos CSS inline.
   */
  addLanguageSelector() {
    if (document.getElementById("language-selector")) return;

    // Cria o seletor de idioma
    const selector = document.createElement("div");
    selector.id = "language-selector";
    selector.className = "language-selector";
    const switchText = this.currentLanguage === "pt-br" ? "EN" : "PT";
    selector.innerHTML = `
      <button class="language-switch">
        ${switchText}
      </button>
    `;

    // Evento de troca de idioma
    selector.querySelector(".language-switch").addEventListener("click", () => {
      const newLang = this.currentLanguage === "pt-br" ? "en" : "pt-br";
      this.changeLanguage(newLang);
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

      // Estilos CSS inline
      const style = document.createElement("style");
      style.textContent = `
        .language-selector {
          margin-left: 0;
        }
        .language-switch {
          background: transparent;
          border: 1px solid var(--cor-destaque);
          color: var(--cor-destaque);
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          font-family: var(--fonte-principal);
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .language-switch:hover {
          background-color: var(--cor-destaque);
          color: var(--cor-secundaria);
        }
      `;
      document.head.appendChild(style);
    }
  }

  /**
   * Atualiza o texto do seletor de idioma após troca de idioma.
   */
  updateLanguageSelector() {
    const selector = document.querySelector(".language-switch");
    if (selector) {
      selector.textContent = this.currentLanguage === "pt-br" ? "EN" : "PT";
    }
  }
}

// Inicializa o gerenciador de idiomas quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  window.i18n = new I18nManager();
  window.i18n.init();
});
