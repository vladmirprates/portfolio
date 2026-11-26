/** Bug tickets, adapted from the QA Character Sheet's bug hunt (src/features/bughunt/ticket.ts). */

import type { Locale, Priority, Species } from './bugSpecies';

/** What is known when a bug is captured. The ticket text is built from it per language. */
export type Capture = {
    species: Species;
    /** Sequential ticket number; keys start at QA-1001. */
    number: number;
    /** Heading of the section the bug was caught in, per language. */
    section: Record<Locale, string>;
    x: number;
    y: number;
    browser: string;
    viewport: { w: number; h: number };
};

export type Ticket = {
    key: string;
    icon: string;
    title: string;
    priority: Priority;
    severity: string;
    environment: string;
    steps: string[];
    expected: string;
    actual: string;
};

const TEXT: Record<Locale, { steps: (c: Capture) => string[]; expected: string }> = {
    en: {
        steps: (c) => [
            'Open the portfolio',
            `Click the anomaly at (${Math.round(c.x)}, ${Math.round(c.y)}) to inspect it`,
            'Click it again to capture it',
        ],
        expected: 'No bugs on the portfolio',
    },
    pt: {
        steps: (c) => [
            'Abrir o portfólio',
            `Clicar na anomalia em (${Math.round(c.x)}, ${Math.round(c.y)}) para inspecioná-la`,
            'Clicar nela de novo para capturá-la',
        ],
        expected: 'Nenhum bug no portfólio',
    },
};

export function buildTicket(c: Capture, locale: Locale): Ticket {
    const { species } = c;
    return {
        key: `QA-${1000 + c.number}`,
        icon: species.icon,
        title: species.title[locale].replace('{section}', c.section[locale]),
        priority: species.priority,
        severity: species.severity[locale],
        environment: `${c.browser} · ${c.viewport.w}×${c.viewport.h} · ${locale === 'pt' ? 'pt-BR' : 'en'}`,
        steps: TEXT[locale].steps(c),
        expected: TEXT[locale].expected,
        actual: `${species.selector} — ${species.actual[locale]}`,
    };
}

const LABELS: Record<Locale, Record<'type' | 'status' | 'statusValue' | 'priority' | 'severity' | 'environment' | 'steps' | 'expected' | 'actual' | 'copy' | 'copied' | 'close', string>> = {
    en: {
        type: 'Bug',
        status: 'Status',
        statusValue: 'Open',
        priority: 'Priority',
        severity: 'Severity',
        environment: 'Environment',
        steps: 'Steps to reproduce',
        expected: 'Expected result',
        actual: 'Actual result',
        copy: 'Copy ticket',
        copied: 'Copied ✓',
        close: 'Close ticket',
    },
    pt: {
        type: 'Bug',
        status: 'Status',
        statusValue: 'Aberto',
        priority: 'Prioridade',
        severity: 'Severidade',
        environment: 'Ambiente',
        steps: 'Passos para reproduzir',
        expected: 'Resultado esperado',
        actual: 'Resultado obtido',
        copy: 'Copiar ticket',
        copied: 'Copiado ✓',
        close: 'Fechar ticket',
    },
};

export const ticketLabels = (locale: Locale) => LABELS[locale];

/** Plain-text ticket for the clipboard. */
export function ticketText(t: Ticket, locale: Locale): string {
    const l = LABELS[locale];
    return [
        `[${t.key}] ${t.title}`,
        `${l.priority}: ${t.priority} · ${l.severity}: ${t.severity}`,
        `${l.environment}: ${t.environment}`,
        '',
        `${l.steps}:`,
        ...t.steps.map((s, i) => `${i + 1}. ${s}`),
        '',
        `${l.expected}: ${t.expected}`,
        `${l.actual}: ${t.actual}`,
    ].join('\n');
}

/** Short browser name from a user-agent string, for the ticket's environment line. */
export function browserName(ua: string): string {
    const match =
        /Edg\/(\d+)/.exec(ua) ?? /Firefox\/(\d+)/.exec(ua) ?? /Chrome\/(\d+)/.exec(ua) ?? /Version\/(\d+).*Safari/.exec(ua);
    if (!match) return 'Unknown browser';
    const name = ua.includes('Edg/') ? 'Edge' : ua.includes('Firefox/') ? 'Firefox' : ua.includes('Chrome/') ? 'Chrome' : 'Safari';
    return `${name} ${match[1]}`;
}
