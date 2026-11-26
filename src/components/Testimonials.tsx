import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Linkedin } from 'lucide-react';

import { useContentList, type Testimonial } from '../content';
import SectionHeading from './SectionHeading';

const LINKEDIN_RECOMMENDATIONS = 'https://www.linkedin.com/in/vladmirprates/details/recommendations/';

/** Renders the quote muted, with its key phrase (an exact substring) brought forward. */
const QuoteText = ({ text, highlight }: { text: string; highlight?: string }) => {
    const at = highlight ? text.indexOf(highlight) : -1;
    if (!highlight || at < 0) return <>{text}</>;
    return (
        <>
            {text.slice(0, at)}
            <strong className="font-medium text-text-main">{highlight}</strong>
            {text.slice(at + highlight.length)}
        </>
    );
};

const initials = (name: string) =>
    name.split(' ').filter(Boolean).map((part) => part[0]).slice(0, 2).join('').toUpperCase();

const Author = ({ testimonial }: { testimonial: Testimonial }) => {
    const { t } = useTranslation();
    return (
        <figcaption className="mt-auto pt-6 flex items-center gap-3 text-sm">
            <span
                aria-hidden="true"
                className="grid place-items-center w-10 h-10 shrink-0 rounded-full bg-surface-light font-heading font-semibold text-text-main"
            >
                {initials(testimonial.author)}
            </span>
            <span>
                <span className="block font-medium text-text-main">{testimonial.author}</span>
                <span className="block text-text-muted">
                    {testimonial.role} · {testimonial.year}
                    {testimonial.translated && <> · <span className="font-mono text-xs">{t('testimonials.translated')}</span></>}
                </span>
            </span>
        </figcaption>
    );
};

/** Quotes longer than this get a short preview and a toggle, so one long card can't stretch its row. */
const PREVIEW_CHARS = 260;

/** Grid card: the key phrase leads as the pull quote, the full text sits below, collapsed when long. */
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const long = testimonial.text.length > PREVIEW_CHARS;
    const textId = `quote-${testimonial.author.replace(/\W+/g, '-').toLowerCase()}`;

    return (
        <figure className="flex flex-col p-6 rounded-lg border border-surface-light bg-surface">
            {testimonial.highlight && (
                <p className="font-heading text-lg font-semibold leading-snug text-text-main">
                    “{testimonial.highlight}”
                </p>
            )}
            <blockquote
                id={textId}
                className={`leading-relaxed text-text-muted whitespace-pre-line ${testimonial.highlight ? 'mt-4 text-sm' : ''} ${long && !open ? 'line-clamp-4' : ''}`}
            >
                {testimonial.text}
            </blockquote>
            {long && (
                <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={textId}
                    onClick={() => setOpen((v) => !v)}
                    className="mt-2 self-start text-sm font-medium text-accent hover:text-accent-hover"
                >
                    {open ? t('testimonials.read_less') : t('testimonials.read_more')}
                </button>
            )}
            <Author testimonial={testimonial} />
        </figure>
    );
};

const Testimonials = () => {
    const { t } = useTranslation();
    const [featured, ...rest] = useContentList<Testimonial>('testimonials.items');

    return (
        <section id="recomendacoes">
            <SectionHeading
                title={t('testimonials.title')}
                lead={t('testimonials.subtitle')}
                className="mb-10"
            />

            {featured && (
                <figure className="mb-12 max-w-4xl border-l-2 border-primary pl-6 md:pl-8">
                    <blockquote className="text-xl md:text-2xl leading-relaxed text-text-muted">
                        <QuoteText text={featured.text} highlight={featured.highlight} />
                    </blockquote>
                    <Author testimonial={featured} />
                </figure>
            )}

            {/* Previews keep the cards close in height; a row's authors line up along the bottom */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((testimonial) => (
                    <TestimonialCard key={testimonial.author} testimonial={testimonial} />
                ))}
            </div>

            <a
                href={LINKEDIN_RECOMMENDATIONS}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-surface-light hover:border-text-muted font-medium transition-colors"
            >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
                {t('testimonials.linkedin_cta')}
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">{t('a11y.new_tab')}</span>
            </a>
        </section>
    );
};

export default Testimonials;
