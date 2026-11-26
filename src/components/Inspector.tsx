import { useEffect, useRef } from 'react';

/** Areas the inspector works in: any element with this attribute, and everything inside it. */
const ROOT = '[data-inspect-root]';

/** Tag kept clear of the fixed navbar. */
const NAV_CLEARANCE = 72;

const px = (value: string) => Math.max(0, parseFloat(value) || 0);

/** DevTools-style name: tag, #id, then the `data-inspect` name as a class (Tailwind classes would be noise). */
const labelOf = (el: Element) => {
    const html = el as HTMLElement;
    let label = el.tagName.toLowerCase();
    if (html.id) label += `#${html.id}`;
    if (html.dataset.inspect) label += `.${html.dataset.inspect}`;
    return label;
};

/**
 * Hovering inside an inspectable area highlights the exact element under the mouse the way
 * DevTools' element picker does: content in blue, padding in green, margin in orange, with a
 * tag showing its name and size. Drawn on fixed overlays (no React re-renders); mouse only.
 */
const Inspector = () => {
    const marginBox = useRef<HTMLDivElement>(null);
    const paddingBox = useRef<HTMLDivElement>(null);
    const contentBox = useRef<HTMLDivElement>(null);
    const tag = useRef<HTMLDivElement>(null);
    const tagName = useRef<HTMLElement>(null);
    const tagSize = useRef<HTMLSpanElement>(null);
    const tagNote = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const layers = [marginBox.current, paddingBox.current, contentBox.current, tag.current];
        let target: Element | null = null;
        let frame = 0;

        const hide = () => {
            target = null;
            layers.forEach((el) => el && (el.style.display = 'none'));
        };

        const place = (el: HTMLDivElement | null, left: number, top: number, width: number, height: number, border?: number[]) => {
            if (!el) return;
            el.style.display = 'block';
            el.style.transform = `translate(${left}px, ${top}px)`;
            el.style.width = `${Math.max(0, width)}px`;
            el.style.height = `${Math.max(0, height)}px`;
            if (border) el.style.borderWidth = border.map((b) => `${b}px`).join(' ');
        };

        const draw = () => {
            frame = 0;
            if (!target || !target.isConnected) return hide();

            const r = target.getBoundingClientRect();
            const cs = getComputedStyle(target);
            const m = [px(cs.marginTop), px(cs.marginRight), px(cs.marginBottom), px(cs.marginLeft)];
            const p = [
                px(cs.paddingTop) + px(cs.borderTopWidth),
                px(cs.paddingRight) + px(cs.borderRightWidth),
                px(cs.paddingBottom) + px(cs.borderBottomWidth),
                px(cs.paddingLeft) + px(cs.borderLeftWidth),
            ];

            // Each ring is a border (content-box sizing), so the three colours never overlap
            place(marginBox.current, r.left - m[3], r.top - m[0], r.width, r.height, m);
            place(paddingBox.current, r.left, r.top, r.width - p[1] - p[3], r.height - p[0] - p[2], p);
            place(contentBox.current, r.left + p[3], r.top + p[0], r.width - p[1] - p[3], r.height - p[0] - p[2]);

            const el = tag.current;
            if (!el) return;
            const note = (target as HTMLElement).dataset.inspectNote ?? '';
            if (tagName.current) tagName.current.textContent = labelOf(target);
            if (tagSize.current) tagSize.current.textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`;
            if (tagNote.current) {
                tagNote.current.textContent = note;
                tagNote.current.style.display = note ? '' : 'none';
            }
            el.style.display = 'flex';
            const above = r.top - m[0] - el.offsetHeight - 6;
            const top = above >= NAV_CLEARANCE ? above : r.bottom + m[2] + 6;
            const left = Math.min(Math.max(8, r.left), window.innerWidth - el.offsetWidth - 8);
            el.style.transform = `translate(${left}px, ${top}px)`;
        };

        const schedule = () => {
            if (target && !frame) frame = requestAnimationFrame(draw);
        };

        const move = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return;
            const el = e.target instanceof Element ? e.target : null;
            const next = el?.closest(ROOT) && !el.closest('[data-inspect-ignore]') ? el : null;
            if (next === target) return;
            if (!next) return hide();
            target = next;
            schedule();
        };

        // An area can stop being inspectable while hovered (its switch): re-check after clicks
        const recheck = () => requestAnimationFrame(() => {
            if (target && !target.closest(ROOT)) hide();
        });

        window.addEventListener('pointermove', move, { passive: true });
        window.addEventListener('click', recheck);
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        document.documentElement.addEventListener('mouseleave', hide);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('pointermove', move);
            window.removeEventListener('click', recheck);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            document.documentElement.removeEventListener('mouseleave', hide);
        };
    }, []);

    return (
        <div aria-hidden="true" className="inspector">
            <div ref={marginBox} className="inspector__margin" />
            <div ref={paddingBox} className="inspector__padding" />
            <div ref={contentBox} className="inspector__content" />
            <div ref={tag} className="inspector__tag">
                <b ref={tagName} />
                <span ref={tagSize} className="inspector__size" />
                <span ref={tagNote} className="inspector__note" />
            </div>
        </div>
    );
};

export default Inspector;
