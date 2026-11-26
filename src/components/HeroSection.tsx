import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { scrollToHash } from '../lib/scroll';
import { useContentList } from '../content';

/** One line of the hero scenario; `value` is shown quoted, like a step parameter. */
type GherkinStep = { keyword: string; text: string; value?: string };

/** Delay before each check row appears, and the stamp lands after the last one. */
const ROW_DELAY = 0.35;
const ROW_STEP = 0.18;

const HeroSection = () => {
    const { t } = useTranslation();

    // The one QA-flavoured moment on the page: real facts written up as a passing Gherkin scenario.
    // Given/When are the context; every Then/And must be an outcome the team can observe.
    const steps = useContentList<GherkinStep>('hero.steps');
    const workedOn = useContentList<string>('hero.worked_on_items');

    return (
        <section id="top" className="relative pt-16 lg:pt-24">
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
                <div>
                    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold leading-[0.92]">
                        Vladmir<br />Prates
                    </h1>
                    <p className="mt-6 font-heading text-xl md:text-2xl font-semibold text-text-main">
                        {t('hero.role')}
                    </p>
                    <p className="mt-4 text-lg md:text-xl text-text-muted max-w-xl leading-relaxed">
                        {t('hero.subtitle')} <span className="text-text-main">{t('hero.subtitle_highlight')}</span>.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                        <a
                            href="#projetos"
                            onClick={(e) => { e.preventDefault(); scrollToHash('#projetos'); }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-md transition-colors"
                        >
                            {t('hero.btn_projects')}
                        </a>
                        <a
                            href="#contato"
                            onClick={(e) => { e.preventDefault(); scrollToHash('#contato'); }}
                            className="group inline-flex items-center gap-2 font-medium text-text-main hover:text-primary transition-colors"
                        >
                            {t('hero.btn_contact')}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    <p className="mt-8 inline-flex items-center gap-2.5 font-medium text-text-main">
                        <span className="w-2 h-2 rounded-full bg-pass" aria-hidden="true" />
                        {t('hero.open')}
                    </p>
                </div>

                {/* An acceptance scenario in Gherkin, each step marked as it passes */}
                <motion.article
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    aria-labelledby="hero-case-title"
                    className="rounded-md border border-surface-light bg-surface text-[0.95rem]"
                >
                    <div className="px-6 pt-5 pb-4 border-b border-surface-light">
                        <p className="font-mono text-xs text-text-muted">{t('hero.case.tags')}</p>
                        <h2 id="hero-case-title" className="mt-2 text-lg font-semibold text-text-main">
                            <span className="text-primary">{t('hero.case.feature_kw')}:</span> {t('hero.case.feature')}
                        </h2>
                        <p className="mt-1 text-text-main">
                            <span className="font-semibold text-primary">{t('hero.case.scenario_kw')}:</span> {t('hero.case.scenario')}
                        </p>
                    </div>

                    <ol className="px-6 py-4">
                        {steps.map((step, i) => (
                            <motion.li
                                key={step.text}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: ROW_DELAY + i * ROW_STEP }}
                                className="grid grid-cols-[4.5rem_1fr] gap-x-3 py-1.5 leading-relaxed"
                            >
                                <span className="font-semibold text-primary text-right">{step.keyword}</span>
                                <span className="text-text-muted">
                                    {step.text}
                                    {step.value && <> <span className="text-text-main">"{step.value}"</span></>}
                                </span>
                            </motion.li>
                        ))}
                    </ol>

                    <footer className="px-6 py-3 border-t border-surface-light text-sm text-text-muted">
                        {t('hero.case.result', { count: steps.length })}
                    </footer>
                </motion.article>
            </div>

            {/* Proof over decoration: the companies I worked for (not their clients), plain text */}
            <div className="mt-16 lg:mt-24 pt-6 border-t border-surface-light flex flex-col md:flex-row md:items-baseline gap-x-8 gap-y-3">
                <p className="shrink-0 text-sm text-text-muted">{t('hero.worked_on')}</p>
                <ul className="flex flex-wrap gap-x-8 gap-y-2 font-heading text-lg md:text-xl font-semibold text-text-main/80">
                    {workedOn.map((name) => <li key={name}>{name}</li>)}
                </ul>
            </div>
        </section>
    );
};

export default HeroSection;
