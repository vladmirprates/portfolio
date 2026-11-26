/** Bug species, adapted from the QA Character Sheet's bug hunt (src/features/bughunt/species.ts). */

export type Locale = 'en' | 'pt';
type L = Record<Locale, string>;

export type Priority = 'Highest' | 'High' | 'Medium' | 'Low';

export type Species = {
    id: string;
    /** Key in BUG_ICONS. */
    icon: string;
    /** DevTools-style selector shown when the bug is inspected, e.g. div.heisenbug */
    selector: string;
    /** Ticket title; {section} is replaced by where it was caught. */
    title: L;
    priority: Priority;
    severity: L;
    actual: L;
};

export const SPECIES: Species[] = [
    {
        id: 'heisenbug',
        icon: 'alien-bug',
        selector: 'div.heisenbug',
        title: { en: 'Heisenbug lurking behind the {section} section', pt: 'Heisenbug escondido atrás da seção {section}' },
        priority: 'High',
        severity: { en: 'Major', pt: 'Grave' },
        actual: {
            en: 'Moves faster whenever nobody is looking at it',
            pt: 'Anda mais rápido sempre que ninguém está olhando',
        },
    },
    {
        id: 'race',
        icon: 'long-antennae-bug',
        selector: 'span.race-condition',
        title: {
            en: 'Race condition crawling near the {section} section',
            pt: 'Condição de corrida rastejando perto da seção {section}',
        },
        priority: 'Highest',
        severity: { en: 'Critical', pt: 'Crítica' },
        actual: {
            en: 'Arrives before it was spawned, about 1 time in 3',
            pt: 'Chega antes de ter sido criado, cerca de 1 em cada 3 vezes',
        },
    },
    {
        id: 'leak',
        icon: 'beetle-shell',
        selector: 'div.memory-leak',
        title: {
            en: 'Memory leak growing beside the {section} section',
            pt: 'Vazamento de memória crescendo ao lado da seção {section}',
        },
        priority: 'Medium',
        severity: { en: 'Major', pt: 'Grave' },
        actual: {
            en: 'Gets slightly bigger every time you look away',
            pt: 'Fica um pouco maior toda vez que você desvia o olhar',
        },
    },
    {
        id: 'off-by-one',
        icon: 'ladybug',
        selector: 'li.off-by-one',
        title: {
            en: 'Off-by-one error one pixel away from the {section} section',
            pt: 'Erro off-by-one a um pixel da seção {section}',
        },
        priority: 'Low',
        severity: { en: 'Minor', pt: 'Menor' },
        actual: {
            en: 'Always one slot to the left of where it should be',
            pt: 'Sempre um espaço à esquerda de onde deveria estar',
        },
    },
    {
        id: 'null',
        icon: 'scarab-beetle',
        selector: 'null.pointer',
        title: {
            en: 'Null pointer dereferenced under the {section} section',
            pt: 'Ponteiro nulo desreferenciado sob a seção {section}',
        },
        priority: 'High',
        severity: { en: 'Critical', pt: 'Crítica' },
        actual: {
            en: "Cannot read properties of undefined (reading 'bug')",
            pt: "Cannot read properties of undefined (reading 'bug')",
        },
    },
];
