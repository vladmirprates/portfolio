import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useContentList, type Experience } from '../content';
import SectionHeading from './SectionHeading';

const INSPECT_KEY = 'inspector-off';

/** Whole months between two "YYYY-MM" months, counting both ends. */
const monthsBetween = (from: string, to: string) => {
    const [fy, fm] = from.split('-').map(Number);
    const [ty, tm] = to.split('-').map(Number);
    return (ty - fy) * 12 + (tm - fm) + 1;
};

/**
 * Inspectable (see Inspector): hovering any element here highlights it like DevTools' picker.
 * `data-inspect` names what the tag shows; an entry's tag also shows how long the job lasted.
 */
const ExperienceLog = () => {
    const { t } = useTranslation();
    const experiences = useContentList<Experience>('experience.items');
    // On by default; turning it off is remembered on this browser
    const [inspecting, setInspecting] = useState(() => {
        try {
            return localStorage.getItem(INSPECT_KEY) !== '1';
        } catch {
            return true;
        }
    });
    const toggleInspect = () => {
        const next = !inspecting;
        setInspecting(next);
        try {
            if (next) localStorage.removeItem(INSPECT_KEY);
            else localStorage.setItem(INSPECT_KEY, '1');
        } catch {
            // storage blocked; the choice lasts for this visit only
        }
    };

    const duration = (exp: Experience) => {
        const total = monthsBetween(exp.from, exp.to);
        const years = Math.floor(total / 12);
        const months = total % 12;
        const parts = [
            years > 0 && t('experience.duration.years', { count: years }),
            months > 0 && t('experience.duration.months', { count: months }),
        ].filter(Boolean);
        return parts.join(t('experience.duration.join'));
    };

    return (
        <section
            id="experiencia"
            data-inspect-root={inspecting ? '' : undefined}
            className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] gap-8 md:gap-16"
        >
            <div className="md:sticky md:top-28 self-start">
                <SectionHeading title={t('experience.title')} />

                {/* Mouse only, like the inspector itself; the inspector ignores this control */}
                <button
                    type="button"
                    role="switch"
                    aria-checked={inspecting}
                    onClick={toggleInspect}
                    data-inspect-ignore
                    className="mt-5 inline-flex items-center gap-2.5 text-sm text-text-muted hover:text-text-main transition-colors [@media(hover:none)]:hidden"
                >
                    <span
                        aria-hidden="true"
                        className={`relative w-8 h-[18px] rounded-full border transition-colors ${inspecting ? 'bg-[#1a2a44] border-[#74b4ff]' : 'bg-surface-light border-surface-light'}`}
                    >
                        <span
                            className={`absolute top-[2px] left-[2px] w-3 h-3 rounded-full transition-transform ${inspecting ? 'translate-x-[14px] bg-[#9fd0ff]' : 'bg-text-muted'}`}
                        />
                    </span>
                    {t('experience.inspect')}
                </button>
            </div>

            <ol data-inspect="experience-log" className="border-t border-surface-light">
                {experiences.map((exp) => {
                    const length = duration(exp);
                    return (
                        <li
                            key={`${exp.company}-${exp.period}`}
                            data-inspect="experience"
                            data-inspect-note={length}
                            className="grid sm:grid-cols-[11rem_1fr] gap-x-8 gap-y-2 py-8 border-b border-surface-light"
                        >
                            <div data-inspect="when" className="font-mono text-sm text-text-muted pt-1.5">
                                <span data-inspect="period" className="whitespace-nowrap">{exp.period}</span>
                                <span className="sr-only"> ({length})</span>
                                <span data-inspect="mode" className="block mt-1">{exp.mode}</span>
                            </div>

                            <div data-inspect="details">
                                <h3 data-inspect="role" className="text-xl md:text-2xl font-semibold">
                                    {exp.role} <span data-inspect="company" className="text-text-muted font-medium">· {exp.company}</span>
                                </h3>

                                <ul data-inspect="highlights" className="mt-4 space-y-2 text-text-muted list-disc pl-5 marker:text-primary">
                                    {exp.highlights.map((highlight) => (
                                        <li key={highlight} data-inspect="highlight">{highlight}</li>
                                    ))}
                                </ul>

                                <p data-inspect="tags" className="mt-4 font-mono text-xs text-text-muted">
                                    {exp.tags.join(' · ')}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
};

export default ExperienceLog;
