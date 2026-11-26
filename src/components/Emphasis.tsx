/** Renders text with **marked** phrases brought forward (bright and medium weight); the rest inherits its color. */
const Emphasis = ({ text }: { text: string }) => (
    <>
        {text.split('**').map((part, i) =>
            i % 2 === 1 ? (
                <strong key={i} className="font-medium text-text-main">{part}</strong>
            ) : (
                part
            )
        )}
    </>
);

export default Emphasis;
