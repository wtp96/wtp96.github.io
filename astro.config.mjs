import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// GitHub Pages 設定：
// - User/Organization 站（repo 名為 wtp96.github.io），base 設為 '/'
// - Project 站則設為 '/repo-name'
const site = 'https://wtp96.github.io';
const base = process.env.ASTRO_BASE || '/';

export default defineConfig({
  site,
  base,
  integrations: [solidJs(), tailwind(), sitemap()],
  output: 'static',
  trailingSlash: 'always',
});
