import { useTranslation } from 'react-i18next';

/** Content lists live in public/locales/<lang>/translation.json so both languages stay in one place. */

export type Fact = { label: string; value: string };

export type ExternalLink = { label: string; url: string };

export type Experience = {
    role: string;
    company: string;
    period: string;
    mode: string;
    /** "YYYY-MM", used for the duration shown when the entry is inspected. */
    from: string;
    to: string;
    highlights: string[];
    tags: string[];
};

export type Testimonial = {
    author: string;
    role: string;
    year: string;
    text: string;
    /** Exact substring of `text` to emphasise. */
    highlight?: string;
    /** Set when `text` is a translation of the original recommendation. */
    translated?: boolean;
};

export type SkillGroup = { title: string; items: string[] };

export type ProjectImage = { src: string; label: string; alt: string };

export type Project = {
    title: string;
    /** Screenshots (paths inside /public); projects with images render as the large featured layout. */
    images?: ProjectImage[];
    highlights: string[];
    tags: string[];
    links?: ExternalLink[];
};

/** Reads an array from the active translation (empty array if the key is missing). */
export function useContentList<T>(key: string): T[] {
    const { t } = useTranslation();
    const value = t(key, { returnObjects: true });
    return Array.isArray(value) ? (value as T[]) : [];
}
