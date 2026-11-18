// نوشته‌های دفترچه: هر فایل .md در پوشهٔ src/content/notes یک نوشته است.
// فایل‌هایی که اسمشان با _ شروع می‌شود (مثل _نمونه.md) نادیده گرفته می‌شوند.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    // تاریخ میلادی به شکل 2026-11-18. روی سایت به تاریخ شمسی نمایش داده می‌شود.
    date: z.coerce.date(),
    description: z.string().optional(),
    // اگر true باشد، نوشته منتشر نمی‌شود.
    draft: z.boolean().default(false),
  }),
});

export const collections = { notes };
