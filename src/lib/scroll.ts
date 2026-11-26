/** Scrolls to a section id (e.g. "#sobre") or to the top when given "#" / "#top". */
export function scrollToHash(hash: string) {
    const isTop = hash === '#' || hash === '#top';

    if (isTop) {
        // CSS `scroll-behavior` handles smoothness and respects reduced motion
        window.scrollTo({ top: 0 });
    } else {
        // Sections define `scroll-margin-top` to clear the fixed navbar
        document.getElementById(hash.slice(1))?.scrollIntoView();
    }

    history.replaceState(null, '', isTop ? window.location.pathname : hash);
}

/** Pauses/resumes page scrolling (used while the mobile menu is open). */
export function setScrollLocked(locked: boolean) {
    document.documentElement.style.overflow = locked ? 'hidden' : '';
}

/** Resolves a path inside /public against Vite's base URL. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
