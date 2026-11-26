import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from 'framer-motion';
import { Search } from 'lucide-react';

import { SPECIES, type Locale, type Species } from '../lib/bugSpecies';
import { browserName, type Capture } from '../lib/ticket';
import BugIcon from './BugIcon';
import BugTicket from './BugTicket';

/**
 * Glitchy bugs that crawl around the page background, behind the content.
 * Ported from the QA Character Sheet's bug hunt: click a bug to inspect it, click again to
 * capture it and file a Jira-style ticket.
 */

type Point = { x: number; y: number };

type Bug = Point & {
    id: number;
    species: Species;
    /** Heading in degrees. Kept continuous (not wrapped to ±180) so the body never spins the long way round. */
    angle: number;
    travelMs: number;
    arriveAt: number;
    revealed: boolean;
    captured: boolean;
};

const BUG_SIZE = 30;
/** Every bug crawls at the same pace, in px per second. */
const SPEED = 65;
/** Bugs never pick a destination closer than this to another bug's. */
const MIN_GAP = 300;
/** Each hop is 280–620 px: long enough to avoid constant turning, short enough to keep moving. */
const MIN_HOP = 280;
const MAX_HOP = 620;
/** Preferred maximum turn per hop; widened only when a bug is cornered. */
const MAX_TURN = 60;
/** How long an inspected bug holds still before it gives up and crawls off again. */
const REVEAL_MS = 10000;
/** Places a bug shouldn't stop on (it may still crawl behind them). */
const SOLID = 'header, h1, h2, h3, p, li, a, button, img, figure, article, dl, blockquote, .rounded-lg';
/** Clicks on these never reach a bug: controls keep working, and bugs hidden behind cards can't be caught. */
const BLOCKS_CLICK = 'a, button, input, textarea, select, label, header, img, .rounded-lg, .bug-ticket';
const TICKET_KEY = 'bug-tickets';

/** Translation key of each section's heading, for the ticket title. */
const SECTION_TITLES: Record<string, string> = {
    sobre: 'about.title',
    experiencia: 'experience.title',
    habilidades: 'skills.title',
    projetos: 'projects.title',
    'side-quests': 'side.title',
    recomendacoes: 'testimonials.title',
    contato: 'contact.title',
};

let nextId = 1;

const maxBugs = () => (window.innerWidth >= 768 ? 2 : 1);

function isFree(x: number, y: number) {
    const el = document.elementFromPoint(x, y);
    return !!el && !el.closest(SOLID);
}

const distanceToNearest = (p: Point, others: Point[]) =>
    Math.min(Infinity, ...others.map((o) => Math.hypot(p.x - o.x, p.y - o.y)));

/**
 * A random spot in the visible page background and at least MIN_GAP from `others`.
 * With `from`, the spot is a hop away and roughly ahead of the bug's current heading, so it wanders
 * in gentle curves; the allowed turn widens only if nothing ahead fits (e.g. at a screen edge).
 * If no spot satisfies everything, takes the candidate furthest from the others.
 */
function pickSpot(others: Point[], from?: Point & { angle: number }): Point {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const inBounds = (p: Point) => p.x > 20 && p.x < w - 20 && p.y > 80 && p.y < h - 20;

    let best: Point | null = null;
    let bestGap = -1;
    for (let i = 0; i < 80; i++) {
        let p: Point;
        if (from) {
            const maxTurn = i < 30 ? MAX_TURN : i < 55 ? 120 : 180;
            const heading = ((from.angle + (Math.random() * 2 - 1) * maxTurn) * Math.PI) / 180;
            const hop = MIN_HOP + Math.random() * (MAX_HOP - MIN_HOP);
            p = { x: from.x + Math.cos(heading) * hop, y: from.y + Math.sin(heading) * hop };
            if (!inBounds(p)) continue;
        } else {
            p = { x: 20 + Math.random() * (w - 40), y: 80 + Math.random() * (h - 100) };
        }
        const gap = distanceToNearest(p, others);
        if (gap >= MIN_GAP && isFree(p.x, p.y)) return p;
        if (gap > bestGap) {
            best = p;
            bestGap = gap;
        }
    }
    return best ?? { x: w / 2, y: h / 2 };
}

/** Spawns a bug of a species not already on screen, away from the others. */
function spawnBug(existing: Bug[]): Bug {
    const taken = new Set(existing.map((b) => b.species.id));
    const available = SPECIES.filter((s) => !taken.has(s.id));
    return {
        id: nextId++,
        species: available[Math.floor(Math.random() * available.length)],
        ...pickSpot(existing),
        angle: Math.random() * 360,
        travelMs: 0,
        // Sits still for 1–3 s after appearing (this also lets the browser draw it before the first move)
        arriveAt: performance.now() + 1000 + Math.random() * 2000,
        revealed: false,
        captured: false,
    };
}

/** Where a bug actually is right now (mid-crawl), from its rendered position. */
function livePosition(bug: Bug): Point {
    const r = document.querySelector(`[data-bug-id="${bug.id}"]`)?.getBoundingClientRect();
    return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: bug.x, y: bug.y };
}

/** The page section a point is in (or nearest to). */
function sectionAt(y: number): string {
    let best = 'top';
    let bestDist = Infinity;
    for (const section of document.querySelectorAll<HTMLElement>('main section[id]')) {
        const r = section.getBoundingClientRect();
        const dist = Math.max(r.top - y, 0, y - r.bottom);
        if (dist < bestDist) {
            bestDist = dist;
            best = section.id;
        }
    }
    return best;
}

function nextTicketNumber() {
    let n = 0;
    try {
        n = Number(localStorage.getItem(TICKET_KEY)) || 0;
        localStorage.setItem(TICKET_KEY, String(n + 1));
    } catch {
        // storage unavailable; numbering just restarts next visit
    }
    return n + 1;
}

const CrawlingBugs = () => {
    const { t, i18n } = useTranslation();
    const reduceMotion = useReducedMotion();
    const [bugs, setBugs] = useState<Bug[]>([]);
    const [capture, setCapture] = useState<Capture | null>(null);
    /** Bug under the mouse, so it can show its "click to inspect" hint. */
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    // Latest bugs for the click handler, which is attached once
    const bugsRef = useRef(bugs);
    useEffect(() => {
        bugsRef.current = bugs;
    }, [bugs]);

    // The first bug shows up a few seconds after load; on wider screens a second one joins a few seconds later.
    useEffect(() => {
        if (reduceMotion) return;
        const first = window.setTimeout(() => setBugs((b) => (b.length ? b : [spawnBug(b)])), 3500);
        const second = window.setTimeout(() => {
            setBugs((b) => (b.length < maxBugs() ? [...b, spawnBug(b)] : b));
        }, 8000);
        return () => {
            window.clearTimeout(first);
            window.clearTimeout(second);
        };
    }, [reduceMotion]);

    // Crawl: whenever a bug arrives, it picks a new spot. The movement itself is a CSS transition.
    useEffect(() => {
        if (reduceMotion) return;
        const id = window.setInterval(() => {
            if (document.hidden) return;
            const now = performance.now();
            setBugs((list) => {
                let changed = false;
                const next = [...list];
                next.forEach((bug, i) => {
                    if (bug.captured || now < bug.arriveAt) return;
                    // Stay clear of where every other bug is heading
                    const others = next.filter((o) => o.id !== bug.id);
                    const spot = pickSpot(others, bug);
                    const dist = Math.hypot(spot.x - bug.x, spot.y - bug.y);
                    const travelMs = Math.max(600, (dist / SPEED) * 1000);
                    // Turn by the shortest way (-180..180) from the current heading
                    const target = (Math.atan2(spot.y - bug.y, spot.x - bug.x) * 180) / Math.PI;
                    const turn = ((((target - bug.angle) % 360) + 540) % 360) - 180;
                    changed = true;
                    next[i] = {
                        ...bug,
                        ...spot,
                        angle: bug.angle + turn,
                        travelMs,
                        // An inspected bug that wasn't captured in time hides again and crawls off
                        revealed: false,
                        // Usually a short rest (0.3–1 s); now and then it stops for a while (2–5 s)
                        arriveAt: now + travelMs + (Math.random() < 0.25 ? 2000 + Math.random() * 3000 : 300 + Math.random() * 700),
                    };
                });
                return changed ? next : list;
            });
        }, 200);
        return () => window.clearInterval(id);
    }, [reduceMotion]);

    // Clicking: the bugs sit behind the content, so clicks are matched to them by position.
    useEffect(() => {
        if (reduceMotion) return;

        const bugAt = (x: number, y: number, target: EventTarget | null) => {
            if (target instanceof Element && target.closest(BLOCKS_CLICK)) return undefined;
            return bugsRef.current.find((b) => {
                if (b.captured) return false;
                const r = document.querySelector(`[data-bug-id="${b.id}"]`)?.getBoundingClientRect();
                return !!r && x >= r.left - 12 && x <= r.right + 12 && y >= r.top - 12 && y <= r.bottom + 12;
            });
        };

        const reveal = (bug: Bug) => {
            const at = livePosition(bug);
            // Freeze it where it is, outlined and labelled like a DevTools element
            setBugs((list) =>
                list.map((b) => (b.id === bug.id ? { ...b, ...at, travelMs: 0, revealed: true, arriveAt: performance.now() + REVEAL_MS } : b))
            );
        };

        const captureBug = (bug: Bug) => {
            const at = livePosition(bug);
            setBugs((list) => list.map((b) => (b.id === bug.id ? { ...b, ...at, travelMs: 0, captured: true } : b)));

            const titleKey = SECTION_TITLES[sectionAt(at.y)];
            const sectionName = (lng: Locale) =>
                titleKey ? i18n.getFixedT(lng)(titleKey) : lng === 'pt' ? 'Topo' : 'Hero';
            const made: Capture = {
                species: bug.species,
                number: nextTicketNumber(),
                section: { en: sectionName('en'), pt: sectionName('pt') },
                ...at,
                browser: browserName(navigator.userAgent),
                viewport: { w: window.innerWidth, h: window.innerHeight },
            };

            // The net drops and the bug shrinks into it, then the ticket opens
            window.setTimeout(() => {
                setBugs((list) => list.filter((b) => b.id !== bug.id));
                setCapture(made);
            }, 900);
            // Another one always turns up
            window.setTimeout(() => setBugs((list) => (list.length < maxBugs() ? [...list, spawnBug(list)] : list)), 7000);
        };

        const onClick = (e: MouseEvent) => {
            const bug = bugAt(e.clientX, e.clientY, e.target);
            if (!bug) return;
            if (bug.revealed) captureBug(bug);
            else reveal(bug);
        };

        // Crosshair over a bug you can inspect; a pointer over an inspected one you can capture
        let mouse: Point | null = null;
        const updateHover = () => {
            const bug = mouse ? bugAt(mouse.x, mouse.y, document.elementFromPoint(mouse.x, mouse.y)) : undefined;
            const root = document.documentElement.classList;
            root.toggle('over-bug', !!bug && !bug.revealed);
            root.toggle('over-revealed-bug', !!bug?.revealed);
            const id = bug?.id ?? null;
            setHoveredId((prev) => (prev === id ? prev : id));
        };
        const onMove = (e: PointerEvent) => {
            mouse = e.pointerType === 'mouse' ? { x: e.clientX, y: e.clientY } : null;
            updateHover();
        };
        // Bugs move while the mouse rests, so re-check what's under it a few times a second
        const hoverTimer = window.setInterval(() => mouse && updateHover(), 250);

        window.addEventListener('click', onClick);
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => {
            window.removeEventListener('click', onClick);
            window.removeEventListener('pointermove', onMove);
            window.clearInterval(hoverTimer);
            document.documentElement.classList.remove('over-bug', 'over-revealed-bug');
        };
    }, [reduceMotion, i18n]);

    if (reduceMotion) return null;

    return (
        <>
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
                {bugs.map((bug) => (
                    <div
                        key={bug.id}
                        data-bug-id={bug.id}
                        className={`crawl-bug ${bug.revealed ? 'is-revealed' : ''} ${bug.captured ? 'is-captured' : ''}`}
                        style={{
                            width: BUG_SIZE,
                            height: BUG_SIZE,
                            transform: `translate3d(${bug.x - BUG_SIZE / 2}px, ${bug.y - BUG_SIZE / 2}px, 0)`,
                            transitionDuration: `${bug.travelMs}ms`,
                        }}
                    >
                        <div className="crawl-bug__body" style={{ rotate: `${bug.angle + 90}deg` }}>
                            <BugIcon name={bug.species.icon} className="crawl-bug__glitch crawl-bug__glitch--r" />
                            <BugIcon name={bug.species.icon} className="crawl-bug__glitch crawl-bug__glitch--c" />
                            <BugIcon name={bug.species.icon} className="crawl-bug__icon" />
                        </div>
                        {hoveredId === bug.id && !bug.revealed && !bug.captured && (
                            <span className="crawl-bug__tag">
                                <span className="crawl-bug__hint">
                                    <Search className="crawl-bug__hint-icon" aria-hidden="true" />
                                    {t('bug.inspect_hint')}
                                </span>
                            </span>
                        )}
                        {bug.revealed && !bug.captured && (
                            <span className="crawl-bug__tag">
                                <span>
                                    <b>{bug.species.selector}</b> {BUG_SIZE}×{BUG_SIZE}
                                </span>
                                <span className="crawl-bug__hint">
                                    <BugIcon name="bug-net" className="crawl-bug__hint-icon" />
                                    {t('bug.capture_hint')}
                                </span>
                            </span>
                        )}
                        {bug.captured && <BugIcon name="bug-net" className="crawl-bug__net" />}
                    </div>
                ))}
            </div>

            {capture && <BugTicket capture={capture} onClose={() => setCapture(null)} />}
        </>
    );
};

export default CrawlingBugs;
