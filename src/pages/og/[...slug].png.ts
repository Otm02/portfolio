/*
 * Open Graph images, rendered at build time with satori (layout → SVG) and
 * sharp (SVG → PNG). One per page: /og/home.png, /og/research.png,
 * /og/work/<slug>.png.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { getPapers, getProfile, getWork } from '../../lib/data';
import { GLYPHS } from '../../lib/icons';

type Node = { type: string; props: Record<string, unknown> & { children?: unknown } };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children, ...extra },
});

const C = { bg: '#FCFCFC', ink: '#18181B', muted: '#5E5E66', line: '#E6E6E9', red: '#C62828', tint: '#FBEDED' };
const fontFile = (w: number) => path.resolve(`node_modules/@fontsource/geist/files/geist-latin-${w}-normal.woff`);
let assets: Promise<{ fonts: { name: string; data: Buffer; weight: 400 | 600 | 800; style: 'normal' }[]; portrait: string }> | undefined;
const load = () =>
  (assets ??= (async () => {
    const weights = [400, 600, 800] as const;
    const fonts = await Promise.all(
      weights.map(async (weight) => ({ name: 'Geist', data: await fs.readFile(fontFile(weight)), weight, style: 'normal' as const })),
    );
    const png = await sharp(path.resolve('src/assets/portrait.webp')).resize(520, 520).png().toBuffer();
    return { fonts, portrait: `data:image/png;base64,${png.toString('base64')}` };
  })());

const glyph = (slug: string) =>
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${C.red}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${(GLYPHS[slug] ?? '').replace(/currentColor/g, C.red)}</svg>`,
  ).toString('base64')}`;

/** Geist has no "→"; draw it as an inline arrow so satori doesn't show a missing glyph. */
const arrow = (size: number, color: string) =>
  h('img', { width: size, height: size }, undefined, {
    src: `data:image/svg+xml;base64,${Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16"/><path d="m14 6 6 6-6 6"/></svg>`,
    ).toString('base64')}`,
    width: size,
    height: size,
  });
const withArrows = (text: string, size: number, color: string) =>
  text.split('→').flatMap((part, i) => (i ? [arrow(size, color), part.trim()] : [part.trim()]));

const footer = (name: string, portrait: string) =>
  h('div', { position: 'absolute', left: 80, bottom: 56, alignItems: 'center', gap: 18 }, [
    h('img', { width: 56, height: 56, borderRadius: 14 }, undefined, { src: portrait, width: 56, height: 56 }),
    h('div', { flexDirection: 'column' }, [
      h('div', { fontSize: 26, fontWeight: 600, color: C.ink }, name),
      h('div', { fontSize: 22, color: C.muted }, 'athmanebenarous.com'),
    ]),
  ]);

const frame = (children: Node[]) =>
  h('div', { width: 1200, height: 630, background: C.bg, fontFamily: 'Geist', position: 'relative', overflow: 'hidden' }, [
    h('div', { position: 'absolute', left: 0, top: 0, width: 1200, height: 10, background: C.red }),
    ...children,
  ]);

export const getStaticPaths = (async () => {
  const [work, papers] = await Promise.all([getWork(), getPapers()]);
  return [
    { params: { slug: 'home' }, props: { kind: 'home' as const } },
    { params: { slug: 'research' }, props: { kind: 'research' as const, count: papers.length } },
    ...work.map((w) => ({ params: { slug: `work/${w.id}` }, props: { kind: 'work' as const, id: w.id, data: w.data } })),
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { fonts, portrait } = await load();
  const profile = await getProfile();
  const [first, last] = profile.name.split(' ');
  let tree: Node;

  if (props.kind === 'home') {
    tree = frame([
      h('div', { flexDirection: 'column', padding: '80px 0 64px 80px', width: 720, height: 630 }, [
        h('div', { flexDirection: 'column', fontSize: 124, fontWeight: 800, letterSpacing: -6, lineHeight: 0.92 }, [
          h('div', { color: C.ink }, first),
          h('div', { color: C.red }, last),
        ]),
        h('div', { fontSize: 40, fontWeight: 600, color: C.ink, marginTop: 36, lineHeight: 1.2, letterSpacing: -0.8, maxWidth: 600 }, profile.positioning),
        h('div', { fontSize: 25, color: C.muted, marginTop: 40, lineHeight: 1.4, maxWidth: 620 }, `${profile.status[0]} · ${profile.status[1]}`),
      ]),
      h('div', { position: 'absolute', right: 96, top: 140, width: 300, height: 300, borderRadius: 40, background: C.red, transform: 'translate(20px, 20px) rotate(3deg)' }),
      h('img', { position: 'absolute', right: 96, top: 140, width: 300, height: 300, borderRadius: 40 }, undefined, { src: portrait, width: 300, height: 300 }),
    ]);
  } else if (props.kind === 'research') {
    tree = frame([
      h('div', { flexDirection: 'column', padding: '84px 80px 64px', width: 1200, height: 630 }, [
        h('div', { fontSize: 26, color: C.red, fontWeight: 600 }, `${props.count} papers and reports`),
        h('div', { fontSize: 92, fontWeight: 800, letterSpacing: -4, color: C.ink, marginTop: 20, lineHeight: 1 }, 'Research & papers'),
        h('div', { fontSize: 32, color: C.muted, marginTop: 28, lineHeight: 1.35, maxWidth: 900 }, 'Abstracts, figures and what I did on each: segmentation, self-play RL, GPU energy, stance detection.'),
        footer(profile.name, portrait),
      ]),
    ]);
  } else {
    const d = props.data;
    const titleSize = d.title.length > 60 ? 54 : 62;
    tree = frame([
      h('div', { flexDirection: 'column', padding: '72px 80px 64px', width: 1200, height: 630 }, [
        h('div', { alignItems: 'center', gap: 20 }, [
          h('div', { width: 64, height: 64, borderRadius: 16, background: C.tint, alignItems: 'center', justifyContent: 'center' }, [
            h('img', { width: 40, height: 40 }, undefined, { src: glyph(props.id), width: 40, height: 40 }),
          ]),
          h('div', { fontSize: 24, color: C.muted, maxWidth: 900 }, d.context.split('·').map((s: string) => s.trim()).filter((_: string, i: number, a: string[]) => i === 0 || i === a.length - 1).join(' · ')),
        ]),
        h('div', { fontSize: titleSize, fontWeight: 800, letterSpacing: -2.2, color: C.ink, marginTop: 34, lineHeight: 1.05, maxWidth: 1000 }, d.title),
        h('div', { alignItems: 'baseline', gap: 22, marginTop: 34 }, [
          h('div', { fontSize: 50, fontWeight: 800, color: C.red, letterSpacing: -1.5, alignItems: 'center', gap: 12 }, withArrows(d.metric.value, 40, C.red)),
          h('div', { fontSize: 24, color: C.muted, maxWidth: 640, lineHeight: 1.3 }, d.metric.label),
        ]),
        footer(profile.name, portrait),
      ]),
    ]);
  }

  const svg = await satori(tree as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
