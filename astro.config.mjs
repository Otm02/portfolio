// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { diagrams } from './src/lib/markdown-diagrams.mjs';

export default defineConfig({
  site: 'https://athmanebenarous.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  markdown: { processor: satteri({ mdastPlugins: [diagrams] }) },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self' https://cloudflareinsights.com",
        "base-uri 'self'",
        "form-action 'none'",
        "object-src 'none'",
      ],
      scriptDirective: { resources: ["'self'", 'https://static.cloudflareinsights.com'] },
    },
  },
});
