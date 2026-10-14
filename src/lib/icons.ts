/** 24×24 stroke icons (currentColor). */
export const ICONS = {
  pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  down: '<path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>',
  ne: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  right: '<path d="m9 6 6 6-6 6"/>',
  left: '<path d="M19 12H5"/><path d="m11 6-6 6 6 6"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  check: '<path d="m5 12 4 4 10-10"/>',
} as const;

export type IconName = keyof typeof ICONS;

/** Card glyphs for featured case studies (stroke 1.6). */
export const GLYPHS: Record<string, string> = {
  // decaying pressure swing settling to a flat baseline
  'slow-leak-detection': '<path d="M2 12c1.4-7 2.8-7 4.2 0s2.8 5 4.2 0 2.2-3 3.2 0 1.6 1.5 2.4 0H22"/>',
  // an orchestrator agent and two query agents
  'llm-agents-food-plant':
    '<circle cx="12" cy="5.5" r="2.5"/><circle cx="5.5" cy="18" r="2.5"/><circle cx="18.5" cy="18" r="2.5"/><path d="M10.8 7.7 6.7 15.8M13.2 7.7l4.1 8.1M8 18h8"/>',
  // speed dial with one controllable needle
  'line-speed-advisory':
    '<path d="M4 17a8 8 0 1 1 16 0"/><path d="m12 17 4.5-5"/><circle cx="12" cy="17" r="1.2"/><path d="M7 11.5l-1-1M12 9V7.6M17 11.5l1-1"/>',
  // crystal lattice cell
  'materials-ml-pipelines':
    '<path d="M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9Z"/><path d="M12 12v9M12 12l7.8-4.5M12 12 4.2 7.5"/><circle cx="12" cy="12" r="1.3"/>',
  // a soma inside its marker sphere
  'soma-segmentation':
    '<circle cx="12" cy="12" r="9" stroke-dasharray="2.4 2.6"/><path d="M12 6.8c3 0 5 2.2 5 5 0 3.3-2.4 5.4-5.2 5.4-3 0-4.8-2.4-4.8-5.1 0-3 2-5.3 5-5.3Z"/><circle cx="12.2" cy="12" r="1.6"/>',
  // Breakthrough board with two pawns
  'alphagateau-breakthrough':
    '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M3.5 9.2h17M3.5 14.8h17M9.2 3.5v17M14.8 3.5v17"/><circle cx="6.4" cy="17.6" r="1.3" fill="currentColor"/><circle cx="17.6" cy="6.4" r="1.3"/>',
  // energy bolt over a GPU die
  'vjepa2-energy':
    '<rect x="4" y="4" width="16" height="16" rx="2.5"/><path d="M13 7.5 9.5 12.5h4L11 16.5"/><path d="M8 2v2M12 2v2M16 2v2M8 20v2M12 20v2M16 20v2"/>',
};
