import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

import { asset } from '../lib/scroll';
import type { ProjectImage } from '../content';

const INTERVAL_MS = 4500;

/**
 * Crossfading screenshot gallery with labelled tabs.
 * Auto-advances until the visitor picks a tab; pauses on hover/focus and never runs with reduced motion.
 */
const ProjectGallery = ({ images }: { images: ProjectImage[] }) => {
    const reduceMotion = useReducedMotion();
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [userPicked, setUserPicked] = useState(false);
    const autoplay = images.length > 1 && !reduceMotion && !userPicked && !paused;

    useEffect(() => {
        if (!autoplay) return;
        const timer = setTimeout(() => setActive((i) => (i + 1) % images.length), INTERVAL_MS);
        return () => clearTimeout(timer);
    }, [autoplay, active, images.length]);

    return (
        <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            <div className="relative overflow-hidden rounded-lg border border-surface-light bg-surface aspect-[16/9]">
                {images.map((image, i) => (
                    <img
                        key={image.src}
                        src={asset(image.src)}
                        alt={image.alt}
                        aria-hidden={i !== active}
                        width={1600}
                        height={900}
                        loading="lazy"
                        decoding="async"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === active ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>

            {images.length > 1 && (
                <div className="mt-3 grid gap-2" style={{ gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))` }}>
                    {images.map((image, i) => (
                        <button
                            key={image.src}
                            type="button"
                            onClick={() => {
                                setActive(i);
                                setUserPicked(true);
                            }}
                            aria-pressed={i === active}
                            className={`text-left text-sm pt-2 border-t-2 transition-colors ${i === active
                                ? 'text-text-main border-surface-light'
                                : 'text-text-muted border-surface-light hover:text-text-main'
                                }`}
                        >
                            {/* Progress bar doubles as the active-tab indicator */}
                            <span className="block -mt-[10px] mb-2 h-0.5 overflow-hidden" aria-hidden="true">
                                <span
                                    key={`${active}-${autoplay}`}
                                    className={`block h-full bg-primary origin-left ${i === active ? '' : 'scale-x-0'}`}
                                    style={i === active && autoplay ? { animation: `gallery-progress ${INTERVAL_MS}ms linear` } : undefined}
                                />
                            </span>
                            {image.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectGallery;
