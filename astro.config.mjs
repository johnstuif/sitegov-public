import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sitegov.io',
  output: 'server',
  adapter: cloudflare(),
  integrations: [tailwind(), sitemap()],
  vite: {
    server: {
      fs: {
        allow: ['..'],
      },
    },
  },
});
