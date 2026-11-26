import { useTranslation } from 'react-i18next';
import { Github, Gitlab, Linkedin } from 'lucide-react';

const links = [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/vladmirprates', Icon: Linkedin },
    { label: 'GitHub', url: 'https://github.com/vladmirprates', Icon: Github },
    { label: 'GitLab', url: 'https://gitlab.com/vladmirprates', Icon: Gitlab },
];

const ContactCard = () => {
    const { t } = useTranslation();
    return (
        <section id="contato" className="border-t border-surface-light pt-20 md:pt-28">
            <h2 className="text-5xl md:text-7xl font-extrabold max-w-3xl">
                {t('contact.title')}
            </h2>
            <p className="mt-6 text-lg md:text-xl text-text-muted max-w-xl">
                {t('contact.subtitle')}
            </p>

            <ul className="mt-10 flex flex-wrap gap-4">
                {links.map(({ label, url, Icon }, i) => (
                    <li key={label}>
                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-medium transition-colors ${i === 0
                                ? 'bg-primary hover:bg-primary-hover text-white'
                                : 'border border-surface-light hover:border-text-muted'
                                }`}
                        >
                            <Icon className="w-5 h-5" aria-hidden="true" />
                            {label}
                            <span className="sr-only">{t('a11y.new_tab')}</span>
                        </a>
                    </li>
                ))}
            </ul>

            <p className="mt-12 text-sm">
                <span className="text-text-muted">{t('contact.loc_title')}:</span> {t('contact.loc_val')}
            </p>
        </section>
    );
};

export default ContactCard;
