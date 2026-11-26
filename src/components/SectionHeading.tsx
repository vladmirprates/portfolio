type SectionHeadingProps = {
    title: string;
    lead?: string;
    className?: string;
};

const SectionHeading = ({ title, lead, className = '' }: SectionHeadingProps) => (
    <div className={className}>
        <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
        {lead && <p className="mt-3 text-text-muted max-w-xl">{lead}</p>}
    </div>
);

export default SectionHeading;
