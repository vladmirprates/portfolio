import { useTranslation } from 'react-i18next';

import { useContentList, type Project } from '../content';
import SectionHeading from './SectionHeading';
import ExternalLinks from './ExternalLinks';
import ProjectGallery from './ProjectGallery';
import Emphasis from './Emphasis';

const ProjectBody = ({ project, large = false }: { project: Project; large?: boolean }) => (
    <>
        <h3 className={`font-semibold ${large ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
            {project.title}
        </h3>
        <ul className="mt-4 space-y-2 text-text-muted list-disc pl-5 marker:text-primary">
            {project.highlights.map((highlight) => (
                <li key={highlight}><Emphasis text={highlight} /></li>
            ))}
        </ul>
        <p className="mt-4 font-mono text-xs text-text-muted">{project.tags.join(' · ')}</p>
        <ExternalLinks links={project.links} className="mt-5" />
    </>
);

const ProjectsInventory = () => {
    const { t } = useTranslation();
    const projects = useContentList<Project>('projects.items');
    const featured = projects.filter((p) => p.images?.length);
    const others = projects.filter((p) => !p.images?.length);

    return (
        <section id="projetos">
            <SectionHeading title={t('projects.title')} className="mb-10" />

            {featured.map((project) => (
                <article key={project.title} className="grid md:grid-cols-[3fr_2fr] gap-8 md:gap-10 md:items-start mb-14">
                    <ProjectGallery images={project.images!} />
                    <div>
                        <ProjectBody project={project} large />
                    </div>
                </article>
            ))}

            <div className="grid md:grid-cols-2 gap-6">
                {others.map((project) => (
                    <article key={project.title} className="p-6 md:p-8 rounded-lg border border-surface-light bg-surface">
                        <ProjectBody project={project} />
                    </article>
                ))}
            </div>
        </section>
    );
};

export default ProjectsInventory;
