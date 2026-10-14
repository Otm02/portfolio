import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Work = CollectionEntry<'work'>;
export type Paper = CollectionEntry<'papers'>;
export type Job = CollectionEntry<'experience'>;
export type Project = CollectionEntry<'projects'>;

export async function getProfile() {
  const entry = await getEntry('profile', 'profile');
  if (!entry) throw new Error('src/content/profile/profile.yaml is missing');
  return entry.data;
}

/** Case studies by their `order` field. */
export async function getWork() {
  return (await getCollection('work')).sort((a, b) => a.data.order - b.data.order);
}

/** Current roles first, then by end date, newest first. */
export async function getExperience() {
  const key = (e: Job) => `${e.data.end === 'present' ? '9999-99' : e.data.end}|${e.data.start}`;
  return (await getCollection('experience')).sort((a, b) => key(b).localeCompare(key(a)));
}

/** Ongoing work first, then newest first, then by title. */
export async function getPapers() {
  return (await getCollection('papers')).sort(
    (a, b) =>
      Number(b.data.ongoing) - Number(a.data.ongoing) ||
      b.data.date.localeCompare(a.data.date) ||
      a.data.title.localeCompare(b.data.title),
  );
}

/** PDF, Paper, Code and OpenReview links of a paper, in that order. */
export function paperLinks(l: Paper['data']['links']) {
  const all: [string, string | undefined][] = [
    ['PDF', l.pdf],
    ['Paper', l.paper],
    ['Code', l.code],
    ['OpenReview', l.openreview],
  ];
  return all.filter((x): x is [string, string] => !!x[1]).map(([label, href]) => ({ label, href }));
}

export async function getProjects() {
  return getCollection('projects');
}

/** Turns a project or paper into one row for the Projects list. */
export interface ProjectRow {
  id: string;
  title: string;
  href?: string;
  when: string;
  sub?: string;
  summary: string;
  tags: string[];
  links: { label: string; href: string }[];
  ongoing: boolean;
  date: string;
}
