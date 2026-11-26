import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { Locale } from '../lib/bugSpecies';
import { buildTicket, ticketLabels, ticketText, type Capture } from '../lib/ticket';
import BugIcon from './BugIcon';

/**
 * The Jira-style ticket filed when a bug is captured. It parodies real software, so it uses a
 * plain app UI font instead of the site's own type. Built per render so it follows the language toggle.
 */
const BugTicket = ({ capture, onClose }: { capture: Capture; onClose: () => void }) => {
    const { i18n } = useTranslation();
    const locale: Locale = i18n.language === 'pt' ? 'pt' : 'en';
    const ticket = buildTicket(capture, locale);
    const l = ticketLabels(locale);
    const [copied, setCopied] = useState(false);
    const closeRef = useRef<HTMLButtonElement>(null);

    // Focus the ticket when it opens (keyboard and screen-reader users land on it); Escape closes it
    useEffect(() => {
        closeRef.current?.focus({ preventScroll: true });
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [capture, onClose]);

    useEffect(() => {
        if (!copied) return;
        const timer = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timer);
    }, [copied]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(ticketText(ticket, locale));
            setCopied(true);
        } catch {
            // clipboard blocked; nothing to do
        }
    };

    return (
        <section className="bug-ticket" role="dialog" aria-labelledby="bug-ticket-title">
            <header className="bug-ticket__header">
                <span className="bug-ticket__type">
                    <BugIcon name={ticket.icon} className="bug-ticket__type-icon" />
                    {l.type}
                </span>
                <span className="bug-ticket__key">{ticket.key}</span>
                <button ref={closeRef} type="button" className="bug-ticket__close" onClick={onClose} aria-label={l.close}>
                    ×
                </button>
            </header>

            <h2 id="bug-ticket-title" className="bug-ticket__title">{ticket.title}</h2>

            <dl className="bug-ticket__fields">
                <div>
                    <dt>{l.priority}</dt>
                    <dd className={`prio prio--${ticket.priority.toLowerCase()}`}>{ticket.priority}</dd>
                </div>
                <div>
                    <dt>{l.severity}</dt>
                    <dd>{ticket.severity}</dd>
                </div>
                <div>
                    <dt>{l.status}</dt>
                    <dd className="bug-ticket__status">{l.statusValue}</dd>
                </div>
            </dl>

            <p className="bug-ticket__env">
                <b>{l.environment}:</b> {ticket.environment}
            </p>

            <h3>{l.steps}</h3>
            <ol>
                {ticket.steps.map((step) => (
                    <li key={step}>{step}</li>
                ))}
            </ol>

            <p>
                <b>{l.expected}:</b> {ticket.expected}
            </p>
            <p>
                <b>{l.actual}:</b> <code>{ticket.actual}</code>
            </p>

            <div className="bug-ticket__actions">
                <button type="button" className="bug-ticket__copy" onClick={copy}>
                    {copied ? l.copied : l.copy}
                </button>
            </div>
        </section>
    );
};

export default BugTicket;
