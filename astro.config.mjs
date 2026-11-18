import { defineConfig } from 'astro/config';

export default defineConfig({
  // آدرس سایت. بعد از خرید دامنه، همین‌جا عوض می‌شود.
  site: 'https://nil8farr.github.io',
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
