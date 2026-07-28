import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://pelicanworks.site',
  integrations: [
    sitemap({
      // labo.html は public/ 配下の静的ファイルのため Astro のページとして
      // 検出されない。手動で追加する（canonical と同じくスラッシュなし）
      customPages: ['https://pelicanworks.site/labo'],
    }),
  ],
});
