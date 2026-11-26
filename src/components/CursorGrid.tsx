import { useEffect, useRef } from 'react';

import { GRID_SIZE, gridLines } from '../lib/grid';

const MASK = 'radial-gradient(220px circle at var(--x, -999px) var(--y, -999px), black, transparent)';

/**
 * A faint grid that shows around the mouse, anywhere on the page.
 * It sits behind the content (cards and text cover it) and is fixed to the viewport, so the
 * cursor position maps straight to CSS variables without React re-renders.
 * Mouse only; the CSS hides it for touch screens and reduced motion.
 */
const CursorGrid = () => {
    const layer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = layer.current;
        if (!el) return;

        const move = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return;
            el.style.setProperty('--x', `${e.clientX}px`);
            el.style.setProperty('--y', `${e.clientY}px`);
            el.style.opacity = '1';
        };
        const leave = () => {
            el.style.opacity = '0';
        };

        window.addEventListener('pointermove', move, { passive: true });
        document.documentElement.addEventListener('mouseleave', leave);
        return () => {
            window.removeEventListener('pointermove', move);
            document.documentElement.removeEventListener('mouseleave', leave);
        };
    }, []);

    return (
        <div
            ref={layer}
            aria-hidden="true"
            className="fixed inset-0 -z-10 pointer-events-none opacity-0 transition-opacity duration-500 motion-reduce:hidden [@media(hover:none)]:hidden"
            style={{
                // Visible lines in the accent colour, but no glow fill behind them
                backgroundImage: gridLines('rgb(225 29 72 / 0.32)'),
                backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
                maskImage: MASK,
                WebkitMaskImage: MASK,
            }}
        />
    );
};

export default CursorGrid;
