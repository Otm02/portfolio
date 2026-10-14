import { renderDiagram } from './diagrams.mjs';

const MARKER = /^<!--\s*diagram:\s*([\w-]+)\s*\|\s*([\s\S]*?)\s*-->$/;

/** Sätteri Markdown plugin: swap `<!-- diagram: name | caption -->` for an inline diagram. */
export const diagrams = {
  name: 'case-study-diagrams',
  html(node, ctx) {
    const m = node.value.trim().match(MARKER);
    if (m) ctx.replaceNode(node, { type: 'html', value: renderDiagram(m[1], m[2]) });
  },
};
