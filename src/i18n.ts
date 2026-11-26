import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptTranslation from '../public/locales/pt/translation.json';
import enTranslation from '../public/locales/en/translation.json';

export const LANGUAGES = ['pt', 'en'] as const;
type Language = (typeof LANGUAGES)[number];

const STORAGE_KEY = 'lang';

const resources = {
    pt: {
        translation: ptTranslation
    },
    en: {
        translation: enTranslation
    }
};

const isLanguage = (value: unknown): value is Language =>
    LANGUAGES.includes(value as Language);

// Priority: ?lang= query param, saved choice, browser language, then Portuguese.
function detectLanguage(): Language {
    const fromQuery = new URLSearchParams(window.location.search).get('lang');
    if (isLanguage(fromQuery)) return fromQuery;

    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (isLanguage(saved)) return saved;
    } catch {
        // storage unavailable (private mode, blocked cookies)
    }

    return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

function syncDocument(lng: string) {
    document.documentElement.lang = lng === 'pt' ? 'pt-BR' : 'en';
    document.title = i18n.t('meta.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', i18n.t('meta.description'));
    try {
        localStorage.setItem(STORAGE_KEY, lng);
    } catch {
        // ignore
    }
}

i18n.on('languageChanged', syncDocument);

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: detectLanguage(),
        fallbackLng: 'pt',
        interpolation: {
            escapeValue: false
        }
    });

syncDocument(i18n.language);

export default i18n;
