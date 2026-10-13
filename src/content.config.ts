import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/*
 * Content model. Adding a job, paper, project or case study means adding one
 * file to the matching folder in src/content/. Dates are months ("2026-05"),
 * never invented days.
 */

const month = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use YYYY-MM, e.g. 2026-05');
const monthOrPresent = z.union([month, z.literal('present')]);
const href = z.union([z.url(), z.string().startsWith('/')]);
const link = z.object({ label: z.string(), href });

/** Project filter chips on the home page. */
export const projectTags = ['ML', 'RL', 'Systems', 'Web', 'Hackathon'] as const;
const tag = z.enum(projectTags);

/** Hero, education, skills and contact: one YAML file. */
const profile = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/profile' }),
  schema: z.object({
    name: z.string(),
    positioning: z.string(),
    lede: z.string(),
    status: z.array(z.string()).min(1),
    location: z.string(),
    email: z.email(),
    links: z.object({
      linkedin: z.url(),
      github: z.url(),
      cvEn: href,
      cvFr: href,
    }),
    lastUpdated: z.coerce.date(),
    contactNote: z.string(),
    education: z.array(
      z.object({
        degree: z.string(),
        school: z.string(),
        start: month,
        end: month,
      }),
    ),
    coursework: z.array(z.string()),
    skills: z.array(z.object({ group: z.string(), items: z.array(z.string()) })),
    spokenLanguages: z.array(z.string()),
    seo: z.object({
      title: z.string().max(70),
      description: z.string().max(170),
    }),
  }),
});

/** One file per role. Sorted by end date (current roles first). */
const experience = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    org: z.string(),
    orgNote: z.string().optional(),
    location: z.string(),
    start: month,
    end: monthOrPresent,
    employment: z.string().optional(),
    context: z.string().optional(),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    caseStudies: z.array(reference('work')).default([]),
  }),
});

/** Case studies at /work/[slug]. Body holds the narrative sections. */
const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    cardTitle: z.string(),
    context: z.string(),
    summary: z.string(),
    metric: z.object({ value: z.string(), label: z.string() }),
    order: z.number().int(),
    featured: z.boolean().default(true),
    confidentiality: z.string().optional(),
    stack: z.array(z.string()),
    links: z.array(link).default([]),
    experience: reference('experience').optional(),
    paper: reference('papers').optional(),
    related: z.array(reference('work')).default([]),
  }),
});

/** Research & Papers. Body holds the abstract (verbatim from the PDF). */
const papers = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/papers' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: month,
      dateLabel: z.string().optional(),
      ongoing: z.boolean().default(false),
      summary: z.string(),
      keyResult: z.string().optional(),
      contribution: z.string(),
      abstractLabel: z.enum(['Abstract', 'Summary']).default('Abstract'),
      links: z.object({
        pdf: z.string().startsWith('/papers/').optional(),
        paper: z.url().optional(),
        code: z.url().optional(),
        openreview: z.url().optional(),
      }),
      figure: z
        .object({ src: image(), alt: z.string(), caption: z.string() })
        .optional(),
      tags: z.array(tag).min(1),
      inProjects: z.boolean().default(true),
      caseStudy: reference('work').optional(),
    }),
});

/** Projects list with filter chips; archive entries sit in a collapsed group. */
const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: month,
    dateLabel: z.string().optional(),
    context: z.string().optional(),
    role: z.string().optional(),
    status: z.string().optional(),
    note: z.string().optional(),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
    tags: z.array(tag).min(1),
    links: z.array(link).default([]),
    archive: z.boolean().default(false),
  }),
});

export const collections = { profile, experience, work, papers, projects };
