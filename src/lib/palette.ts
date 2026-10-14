import { getPapers, getProfile, getWork } from './data';

/** Entries for the ⌘K command palette, shared by every page. */
export async function getSiteData() {
  const [profile, work, papers] = await Promise.all([getProfile(), getWork(), getPapers()]);
  const palette = [
    { label: 'Selected work', kind: 'Section', action: 'section', target: 'work' },
    { label: 'Experience', kind: 'Section', action: 'section', target: 'experience' },
    { label: 'Research & papers', kind: 'Section', action: 'section', target: 'research' },
    { label: 'Projects', kind: 'Section', action: 'section', target: 'projects' },
    { label: 'Contact', kind: 'Section', action: 'section', target: 'contact' },
    { label: 'Copy email address', kind: 'Action', action: 'copy', keywords: 'mail contact' },
    { label: 'Download CV (English)', kind: 'Action', action: 'link', target: profile.links.cvEn, keywords: 'resume pdf' },
    { label: 'Download CV (French)', kind: 'Action', action: 'link', target: profile.links.cvFr, keywords: 'resume pdf français' },
    { label: 'Toggle light / dark theme', kind: 'Action', action: 'theme', keywords: 'dark mode' },
    { label: 'LinkedIn', kind: 'Link', action: 'link', target: profile.links.linkedin },
    { label: 'GitHub', kind: 'Link', action: 'link', target: profile.links.github },
    ...work.map((w) => ({ label: w.data.cardTitle, kind: 'Case study', action: 'case', target: w.id, keywords: w.data.stack.join(' ') })),
    ...papers.map((p) => ({ label: p.data.title, kind: 'Paper', action: 'paper', target: p.id, keywords: p.data.tags.join(' ') })),
  ];
  // The address is stored reversed and base64-encoded so it isn't in the HTML as plain text.
  const e = Buffer.from([...profile.email].reverse().join('')).toString('base64');
  return { e, palette };
}
