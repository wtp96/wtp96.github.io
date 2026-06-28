import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts');
  const index = posts
    .filter((p) => !p.data.draft)
    .map((p) => ({
      slug: p.slug,
      title: p.data.title,
      description: p.data.description,
      category: p.data.category,
      date: p.data.date.toISOString(),
      body: p.body,
    }));

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
