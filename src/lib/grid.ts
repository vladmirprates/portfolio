/** Shared by the hero's faint grid and the page-wide cursor grid so their lines line up. */
export const GRID_SIZE = 48;

export const gridLines = (color: string) =>
    `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`;
