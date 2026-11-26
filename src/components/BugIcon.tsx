import { BUG_ICONS } from '../lib/bugIcons';

const BugIcon = ({ name, className }: { name: string; className?: string }) => {
    const icon = BUG_ICONS[name];
    return (
        <svg className={className} viewBox={icon.viewBox} aria-hidden="true">
            {icon.paths.map((d, i) => <path key={i} d={d} />)}
        </svg>
    );
};

export default BugIcon;
