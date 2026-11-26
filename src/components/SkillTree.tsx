import { useTranslation } from 'react-i18next';

import { useContentList, type SkillGroup } from '../content';
import SectionHeading from './SectionHeading';

const SkillTree = () => {
    const { t } = useTranslation();
    const groups = useContentList<SkillGroup>('skills.groups');

    return (
        <section id="habilidades" className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] gap-8 md:gap-16">
            <SectionHeading title={t('skills.title')} />

            <div>
                <div className="grid sm:grid-cols-3 gap-x-8 gap-y-10">
                    {groups.map((group) => (
                        <div key={group.title}>
                            <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted pb-3 border-b border-surface-light">
                                {group.title}
                            </h3>
                            <ul className="mt-4 space-y-2">
                                {group.items.map((skill) => (
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default SkillTree;
