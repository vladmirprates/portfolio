// Internationalization Manager (i18n)
class I18nManager {
  constructor() {
    // Default language
    this.currentLanguage = "pt-br";
    // Stores loaded translations
    this.translations = {};
    // Indicates if manager has been initialized
    this.initialized = false;
  }

  /**
   * Initializes the language manager:
   * - Detects language via URL, localStorage or uses default
   * - Loads translations
   * - Updates page content
   * - Adds language selector
   * - Starts typing effect (if exists)
   * - Clears language parameter from URL
   */
  async init() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang");
    const savedLang = localStorage.getItem("preferredLanguage");

    // Define current language: priority URL > localStorage > default
    if (langParam && ["pt-br", "en"].includes(langParam)) {
      this.currentLanguage = langParam;
      localStorage.setItem("preferredLanguage", langParam);
    } else if (savedLang && ["pt-br", "en"].includes(savedLang)) {
      this.currentLanguage = savedLang;
    }

    // Load translations and apply to page
    await this.loadTranslations(this.currentLanguage);
    this.updatePageContent();
    this.addLanguageSelector();

    // Wait for DOM and start typing effect, if exists
    setTimeout(() => {
      if (typeof window.startTypingEffect === "function") {
        window.startTypingEffect();
      } else {
        console.error("startTypingEffect is not defined.");
      }
    }, 100);

    this.initialized = true;

    // Remove language parameter from URL
    if (langParam) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  /**
   * Loads the translation file for the specified language.
   * In case of error, falls back to the default language.
   */
  async loadTranslations(lang) {
    try {
      const response = await fetch(`assets/translations/${lang}.json`);
      if (!response.ok)
        throw new Error(`Failed to load translations for ${lang}`);
      this.translations = await response.json();
      return true;
    } catch (error) {
      console.error("Error loading translations:", error);
      // Fallback to default language
      if (lang !== "pt-br") {
        this.currentLanguage = "pt-br";
        return this.loadTranslations("pt-br");
      }
      return false;
    }
  }

  /**
   * Changes the current language and updates the page.
   * Restarts the typing effect after the change.
   */
  async changeLanguage(lang) {
    if (this.currentLanguage === lang) return;

    // Stop current typing effect
    window.clearTypingEffect();

    // Update language and content
    this.currentLanguage = lang;
    localStorage.setItem("preferredLanguage", lang);
    await this.loadTranslations(lang);
    this.updatePageContent();
    this.updateLanguageSelector();

    // Restart typing effect
    setTimeout(() => {
      if (typeof window.startTypingEffect === "function") {
        window.startTypingEffect();
      }
    }, 0);
  }

  /**
   * Applies translations to page elements with [data-i18n] attribute
   */
  updatePageContent() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = this.getTranslation(key);

      if (translation) {
        // Update attribute for typing effect, if necessary
        if (
          element.classList.contains("hero-text") ||
          element.id === "typing-element"
        ) {
          element.setAttribute("data-original-text", translation);
        }
        // Update element text
        element.textContent = translation;
      }
    });
  }

  /**
   * Returns the translation for a nested key (e.g., "nav.sobre").
   * Displays error message if key does not exist.
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
   * Adds the language selector to the header, if it doesn't exist yet.
   * Includes inline CSS styles.
   */
  addLanguageSelector() {
    if (document.getElementById("language-selector")) return;

    // Create language selector
    const selector = document.createElement("div");
    selector.id = "language-selector";
    selector.className = "language-selector";
    const switchText = this.currentLanguage === "pt-br" ? "EN" : "PT";
    const ariaLabel =
      this.currentLanguage === "pt-br"
        ? "Switch language to English"
        : "Alterar idioma para Português";
    selector.innerHTML = `
      <button class="language-switch" aria-label="${ariaLabel}">
        ${switchText}
      </button>
    `;

    // Language switch event
    selector.querySelector(".language-switch").addEventListener("click", () => {
      const newLang = this.currentLanguage === "pt-br" ? "en" : "pt-br";
      this.changeLanguage(newLang);
    });

    // Add to header
    const header = document.querySelector("header .header-content");
    if (header) {
      let selectorsContainer = document.querySelector(".header-selectors");
      if (!selectorsContainer) {
        selectorsContainer = document.createElement("div");
        selectorsContainer.className = "header-selectors";
        header.appendChild(selectorsContainer);
      }
      selectorsContainer.appendChild(selector);

      // Inline CSS styles
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
   * Updates the language selector text after language change.
   */
  updateLanguageSelector() {
    const selector = document.querySelector(".language-switch");
    if (selector) {
      selector.textContent = this.currentLanguage === "pt-br" ? "EN" : "PT";
      const ariaLabel =
        this.currentLanguage === "pt-br"
          ? "Switch language to English"
          : "Switch language to Portuguese";
      selector.setAttribute("aria-label", ariaLabel);
    }
  }
}

// Initialize language manager when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.i18n = new I18nManager();
  window.i18n.init();
});
