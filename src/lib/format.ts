const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const parse = (s: string) => s.split('-').map(Number) as [number, number];

/** "2026-05" -> "May 2026" */
export function monthLabel(s: string): string {
  const [y, m] = parse(s);
  return `${MONTHS[m - 1]} ${y}`;
}

/** "2026-05", "2026-09" -> "May – Sep 2026"; "present" -> "… – Present" */
export function span(start: string, end: string): string {
  const [y1, m1] = parse(start);
  if (end === 'present') return `${MONTHS[m1 - 1]} ${y1} – Present`;
  const [y2, m2] = parse(end);
  if (y1 === y2) return `${MONTHS[m1 - 1]} – ${MONTHS[m2 - 1]} ${y2}`;
  return `${MONTHS[m1 - 1]} ${y1} – ${MONTHS[m2 - 1]} ${y2}`;
}

/** Keep the first and last parts of a "A · B · C" context line. */
export function shortContext(ctx: string): string {
  const parts = ctx.split('·').map((p) => p.trim());
  return parts.length > 1 ? `${parts[0]} · ${parts[parts.length - 1]}` : parts[0];
}

export const isExternal = (href: string) => /^https?:/.test(href);
