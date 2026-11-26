import { useTranslation } from 'react-i18next';

import { asset } from '../lib/scroll';
import { useContentList, type Fact } from '../content';
import SectionHeading from './SectionHeading';

const AboutSection = () => {
    const { t } = useTranslation();
    const paragraphs = useContentList<string>('about.paragraphs');
    const facts = useContentList<Fact>('about.facts');

    return (
        <section id="sobre" className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 md:gap-16 items-start">
            <img
                src={asset('assets/images/profile.jpeg')}
                alt="Vladmir Prates"
                width={597}
                height={599}
                loading="lazy"
                decoding="async"
                className="w-full max-w-sm aspect-square object-cover rounded-lg border border-surface-light"
            />

            <div>
                <SectionHeading title={t('about.title')} />

                <div className="mt-6 space-y-5 text-lg text-text-muted leading-relaxed">
                    {paragraphs.map((p) => (
                        <p key={p}>{p}</p>
                    ))}
                </div>

                {/* Fixed gaps rather than equal columns, so the spacing between facts looks even */}
                <dl className="mt-10 flex flex-wrap gap-x-16 gap-y-6 border-t border-surface-light pt-6">
                    {facts.map((fact) => (
                        <div key={fact.label}>
                            <dt className="text-sm text-text-muted">{fact.label}</dt>
                            <dd className="mt-1 font-medium">{fact.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
};

export default AboutSection;
