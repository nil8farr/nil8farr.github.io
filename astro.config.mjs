import { appendFile } from 'node:fs/promises';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// آدرس سایت. بعد از خرید دامنه، همین‌جا عوض می‌شود.
const site = 'https://nil8farr.github.io';
let hasPublishedNotes = false;

export default defineConfig({
  site,
  integrations: [
    {
      name: 'crawl-directives',
      hooks: {
        // پیش از ساخت نقشهٔ سایت، مسیر نوشته‌های منتشرشده را بررسی می‌کنیم.
        'astro:build:done': async ({ dir, pages }) => {
          hasPublishedNotes = pages.some(({ pathname }) => /^\/?notebook\/[^/]/.test(pathname));
          const sitemapUrl = new URL('/sitemap-index.xml', site);
          await appendFile(new URL('robots.txt', dir), `\nSitemap: ${sitemapUrl.href}\n`);
        },
      },
    },
    sitemap({
      filter: (url) => hasPublishedNotes || !/^\/notebook\/?$/.test(new URL(url).pathname),
    }),
  ],
  experimental: {
    // سیاست امنیت محتوا (CSP): مرورگر فقط اسکریپت‌ها و استایل‌های خود سایت را اجرا می‌کند.
    // بقیهٔ چیزها (عکس، قلم، اتصال) هم فقط از خود سایت؛ عکس data: برای خط موج‌دار زیر «به‌جز متن‌ها» است.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
    },
  },
});
