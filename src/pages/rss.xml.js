import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';

export async function GET(context) {
  const posts = await getCollection('posts');
  const sorted = posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, 20);

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/${post.data.category}/${post.slug}/`,
    })),
    customData: `<language>${SITE.language}</language>`,
  });
}
