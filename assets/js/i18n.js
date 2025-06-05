// i18n.js - Script para gerenciar internacionalização

class I18nManager {
  constructor() {
    this.currentLanguage = "pt-br"; // Idioma padrão
    this.translations = {}; // Armazenará as traduções
    this.initialized = false;
  }

  // Inicializa o gerenciador de idiomas
  async init() {
    // Verifica se há um idioma na URL (vindo da loading page)
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang");

    // Verifica se há um idioma salvo no localStorage
    const savedLang = localStorage.getItem("preferredLanguage");

    // Define o idioma atual baseado na prioridade: URL > localStorage > padrão
    if (langParam && ["pt-br", "en"].includes(langParam)) {
      this.currentLanguage = langParam;
      localStorage.setItem("preferredLanguage", langParam);
    } else if (savedLang && ["pt-br", "en"].includes(savedLang)) {
      this.currentLanguage = savedLang;
    }

    // Carrega as traduções do idioma atual
    await this.loadTranslations(this.currentLanguage);

    // Aplica as traduções
    this.updatePageContent();

    // Adiciona o seletor de idioma se não existir
    this.addLanguageSelector();

    // Garante que o DOM esteja atualizado e a função exista
    setTimeout(() => {
      if (typeof window.startTypingEffect === "function") {
        window.startTypingEffect();
      } else {
        console.error("startTypingEffect não está definido.");
      }
    }, 100); // Pequeno atraso para garantir que o DOM esteja pronto

    this.initialized = true;

    // Limpa o parâmetro de idioma da URL para evitar problemas com compartilhamento
    if (langParam) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  // Carrega o arquivo de traduções
  async loadTranslations(lang) {
    try {
      const response = await fetch(`translations/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${lang}`);
      }
      this.translations = await response.json();
      return true;
    } catch (error) {
      console.error("Error loading translations:", error);
      // Fallback para o idioma padrão se houver erro
      if (lang !== "pt-br") {
        this.currentLanguage = "pt-br";
        return this.loadTranslations("pt-br");
      }
      return false;
    }
  }

  // Muda o idioma atual
  async changeLanguage(lang) {
    if (this.currentLanguage === lang) return;

    // Salva a preferência
    this.currentLanguage = lang;
    localStorage.setItem("preferredLanguage", lang);

    // Carrega as novas traduções
    await this.loadTranslations(lang);

    // Atualiza o conteúdo da página
    this.updatePageContent();

    // Atualiza o seletor de idioma
    this.updateLanguageSelector();

    // Reinicia o efeito de digitação ao mudar de idioma
    if (typeof startTypingEffect === "function") {
      startTypingEffect();
    }
  }

  // Aplica as traduções aos elementos da página
  updatePageContent() {
    // Elementos com atributo data-i18n
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = this.getTranslation(key);

      if (translation) {
        // Se o elemento for um input com placeholder
        if (element.placeholder !== undefined) {
          element.placeholder = translation;
        }
        // Se for um elemento com valor (como botões)
        else if (
          element.value !== undefined &&
          element.tagName !== "DIV" &&
          element.tagName !== "SPAN"
        ) {
          element.value = translation;
        }
        // Para outros elementos, atualiza o conteúdo HTML
        else {
          element.innerHTML = translation;
        }
      }
    });
  }

  // Obtém uma tradução a partir de uma chave aninhada (ex: "nav.sobre")
  getTranslation(key) {
    const keys = key.split(".");
    let value = this.translations;

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Retorna a chave como fallback
      }
    }

    return value;
  }

  // Adiciona o seletor de idioma ao cabeçalho
  addLanguageSelector() {
    // Verifica se o seletor já existe
    if (document.getElementById("language-selector")) return;

    // Cria o elemento do seletor
    const selector = document.createElement("div");
    selector.id = "language-selector";
    selector.className = "language-selector";

    // Define o texto baseado no idioma atual
    const switchText = this.currentLanguage === "pt-br" ? "EN" : "PT";

    // Cria o HTML do seletor
    selector.innerHTML = `
      <button class="language-switch">
        ${switchText}
      </button>
    `;

    // Adiciona o evento de clique
    selector.querySelector(".language-switch").addEventListener("click", () => {
      const newLang = this.currentLanguage === "pt-br" ? "en" : "pt-br";
      this.changeLanguage(newLang);
    });

    // Adiciona o seletor ao cabeçalho
    const header = document.querySelector("header .header-content");
    if (header) {
      header.appendChild(selector);

      // Adiciona estilos CSS inline (você pode mover isso para seu arquivo CSS)
      const style = document.createElement("style");
      style.textContent = `
        .language-selector {
          margin-left: 20px;
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
        }
        .language-switch:hover {
          background-color: var(--cor-destaque);
          color: var(--cor-secundaria);
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Atualiza o texto do seletor de idioma
  updateLanguageSelector() {
    const selector = document.querySelector(".language-switch");
    if (selector) {
      selector.textContent = this.currentLanguage === "pt-br" ? "EN" : "PT";
    }
  }
}

// Cria e inicializa o gerenciador de idiomas quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  window.i18n = new I18nManager();
  window.i18n.init();
});