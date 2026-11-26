import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';

import { scrollToHash, setScrollLocked } from '../lib/scroll';

// 'top' (the hero) has no nav link; tracking it clears the highlight when scrolled back up
const SECTION_IDS = ['top', 'sobre', 'experiencia', 'habilidades', 'projetos', 'side-quests', 'recomendacoes', 'contato'];

/** Tracks which section is currently in the middle band of the viewport. */
function useActiveSection(ids: string[]) {
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: '-45% 0px -50% 0px' }
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [ids]);

    return active;
}

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const activeSection = useActiveSection(SECTION_IDS);

    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

    // Handle scroll state for navbar appearance
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock page scroll and allow Escape to close while the mobile menu is open
    useEffect(() => {
        if (!mobileMenuOpen) return;
        setScrollLocked(true);
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMobileMenuOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => {
            setScrollLocked(false);
            window.removeEventListener('keydown', onKey);
        };
    }, [mobileMenuOpen]);

    const navLinks = [
        { label: t('nav.sobre'), href: '#sobre' },
        { label: t('nav.experiencia'), href: '#experiencia' },
        { label: t('nav.habilidades'), href: '#habilidades' },
        { label: t('nav.projetos'), href: '#projetos' },
        { label: t('nav.side'), href: '#side-quests' },
        { label: t('nav.recomendacoes'), href: '#recomendacoes' },
        { label: t('nav.contato'), href: '#contato' },
    ];

    const toggleLanguage = () => {
        const newLang = i18n.language === 'pt' ? 'en' : 'pt';
        i18n.changeLanguage(newLang);
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        // Wait a frame so the scroll lock is released before scrolling
        requestAnimationFrame(() => scrollToHash(href));
    };

    const isActive = (href: string) => activeSection === href.slice(1);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b w-full ${isScrolled
                    ? 'bg-background/90 backdrop-blur-md border-surface-light py-3'
                    : 'bg-transparent border-transparent py-5'
                    }`}
            >
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

                    {/* Logo */}
                    <a href="#top" onClick={(e) => handleLinkClick(e, '#top')} className="flex items-center group relative z-50" aria-label="Vladmir Prates">
                        <span className="text-lg md:text-xl font-heading font-extrabold">
                            <span className="text-text-main group-hover:text-primary transition-colors">vladmir</span>
                            <span className="text-primary">.spec.ts</span>
                        </span>
                        {/* Animated progress line under logo */}
                        <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label={t('a11y.main_nav')}>
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                aria-current={isActive(link.href) ? 'location' : undefined}
                                className={`text-sm transition-colors relative group ${isActive(link.href)
                                    ? 'text-text-main'
                                    : 'text-text-muted hover:text-text-main'
                                    }`}
                            >
                                {link.label}
                                <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-primary transition-all duration-300 ${isActive(link.href)
                                    ? 'w-full opacity-100'
                                    : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                                    }`} />
                            </a>
                        ))}

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="ml-4 flex items-center gap-2 px-3 py-1.5 rounded bg-surface border border-surface-light hover:border-primary/50 text-xs font-mono text-text-muted hover:text-white transition-all group"
                            aria-label={t('a11y.switch_lang')}
                        >
                            <Globe className="w-4 h-4 text-primary transition-colors" />
                            <span className="uppercase">{i18n.language}</span>
                        </button>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <div className="flex items-center gap-4 lg:hidden relative z-50">
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1.5 px-2 py-1 rounded bg-surface border border-surface-light text-xs font-mono text-text-muted"
                            aria-label={t('a11y.switch_lang')}
                        >
                            <Globe className="w-3.5 h-3.5 text-primary" />
                            <span className="uppercase">{i18n.language}</span>
                        </button>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-text-main hover:text-primary transition-colors p-1"
                            aria-label={mobileMenuOpen ? t('a11y.menu_close') : t('a11y.menu_open')}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Scroll progress bar */}
                <motion.div
                    aria-hidden="true"
                    style={{ scaleX: progress }}
                    className="absolute left-0 right-0 -bottom-px h-[2px] origin-left bg-primary"
                />
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl border-b border-surface-light pt-24 pb-8 flex flex-col lg:hidden w-full overflow-hidden"
                    >
                        <nav className="flex flex-col items-center justify-center gap-6 h-full px-6" aria-label={t('a11y.main_nav')}>
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                    aria-current={isActive(link.href) ? 'location' : undefined}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.05 } }}
                                    className={`text-xl font-heading font-medium hover:text-primary transition-colors w-full text-center py-2 border-b border-surface-light ${isActive(link.href) ? 'text-primary' : 'text-text-main'}`}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
