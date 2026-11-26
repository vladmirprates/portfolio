import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';

import type { ExternalLink } from '../content';

const ExternalLinks = ({ links, className = '' }: { links?: ExternalLink[]; className?: string }) => {
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
                        className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary-hover underline-offset-4 hover:underline"
                    >
                        {link.label}
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        <span className="sr-only">{t('a11y.new_tab')}</span>
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default ExternalLinks;
