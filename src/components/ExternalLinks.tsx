import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';

import type { ExternalLink } from '../content';

type ExternalLinksProps = {
    links?: ExternalLink[];
    className?: string;
    /** What the links belong to (e.g. the project title), read out after the label so two
        "GitHub" links on the page don't sound identical while going to different places. */
    context?: string;
};

const ExternalLinks = ({ links, className = '', context }: ExternalLinksProps) => {
    const { t } = useTranslation();
    if (!links?.length) return null;

    return (
        <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
            {links.map((link) => (
                <li key={link.url}>
                    <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-accent hover:text-accent-hover underline-offset-4 hover:underline"
                    >
                        {link.label}
                        {context && <span className="sr-only"> ({context})</span>}
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        <span className="sr-only">{t('a11y.new_tab')}</span>
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default ExternalLinks;
