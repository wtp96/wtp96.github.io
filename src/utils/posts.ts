import { getCollection } from 'astro:content';
import { CATEGORY_SLUGS } from '@/consts';

export async function getAllPosts() {
  const posts = await getCollection('posts');
  return posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function getPostsByCategory(posts: Awaited<ReturnType<typeof getAllPosts>>, category: string) {
  return posts.filter((p) => p.data.category === category);
}

export function groupPostsByYear(posts: Awaited<ReturnType<typeof getAllPosts>>) {
  const groups: Record<string, typeof posts> = {};
  for (const post of posts) {
    const year = post.data.date.getFullYear().toString();
    if (!groups[year]) groups[year] = [];
    groups[year].push(post);
  }
  return Object.entries(groups)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, items]) => ({ year, items }));
}

export function groupPostsByYearAndMonth(posts: Awaited<ReturnType<typeof getAllPosts>>) {
  const yearGroups: Record<string, Record<string, typeof posts>> = {};
  for (const post of posts) {
    const year = post.data.date.getFullYear().toString();
    const month = post.data.date.getMonth();
    if (!yearGroups[year]) yearGroups[year] = {};
    if (!yearGroups[year][month]) yearGroups[year][month] = [];
    yearGroups[year][month].push(post);
  }

  return Object.entries(yearGroups)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, months]) => {
      const monthEntries = Object.entries(months)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([month, items]) => ({
          month: Number(month),
          items: items.sort((a, b) => b.data.date.getTime() - a.data.date.getTime()),
        }));
      return { year, months: monthEntries, count: monthEntries.reduce((sum, m) => sum + m.items.length, 0) };
    });
}

export function isValidCategory(category: string) {
  return CATEGORY_SLUGS.includes(category);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-Hant', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatDateISO(date: Date) {
  return date.toISOString();
}

export function getMonthLabel(month: number) {
  const labels = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  const en = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  return { zh: labels[month], en: en[month] };
}

export function getDayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getYearProgress(date: Date) {
  const start = new Date(date.getFullYear(), 0, 1);
  const end = new Date(date.getFullYear() + 1, 0, 1);
  const total = end.getTime() - start.getTime();
  const passed = date.getTime() - start.getTime();
  return Math.min(100, Math.max(0, (passed / total) * 100));
}

export function getTodayProgress(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const passed = date.getTime() - start.getTime();
  return Math.min(100, Math.max(0, (passed / (24 * 60 * 60 * 1000)) * 100));
}
