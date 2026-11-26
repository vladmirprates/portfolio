import { useTranslation } from 'react-i18next';

import { asset } from '../lib/scroll';
import { useContentList, type Project } from '../content';
import SectionHeading from './SectionHeading';
import ExternalLinks from './ExternalLinks';

const SideQuests = () => {
    const { t } = useTranslation();
    const items = useContentList<Project>('side.items');

    return (
        // Same layout as About: photo on the left, heading and quests on the right. On phones: heading, photo, quests.
        <section id="side-quests" className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-16 gap-y-10 items-start">
            <SectionHeading title={t('side.title')} lead={t('side.lead')} className="md:col-start-2 md:row-start-1" />

            <img
                src={asset('assets/images/gaming.jpg')}
                alt={t('side.photo_alt')}
                width={720}
                height={720}
                loading="lazy"
                decoding="async"
                className="w-full max-w-sm aspect-square object-cover rounded-lg border border-surface-light md:col-start-1 md:row-start-1 md:row-span-2"
            />

            <div className="grid lg:grid-cols-2 gap-x-10 gap-y-12 md:col-start-2 md:row-start-2">
                {items.map((item) => (
                    <div key={item.title} className="border-t border-surface-light pt-6">
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <ul className="mt-4 space-y-2 text-text-muted list-disc pl-5 marker:text-accent">
                            {item.highlights.map((highlight) => (
                                <li key={highlight}>{highlight}</li>
                            ))}
                        </ul>
                        <p className="mt-4 font-mono text-xs text-text-muted">{item.tags.join(' · ')}</p>
                        <ExternalLinks links={item.links} context={item.title} className="mt-5" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SideQuests;
