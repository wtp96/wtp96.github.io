import { createSignal, createResource, For, Show, onMount, onCleanup } from 'solid-js';
import Fuse from 'fuse.js';

type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  body: string;
};

export default function Search() {
  const [open, setOpen] = createSignal(false);
  const [query, setQuery] = createSignal('');
  const [data] = createResource<Post[]>(async () => {
    // @ts-ignore
    const url = window.__SEARCH_INDEX_URL__ || '/search.json';
    const res = await fetch(url);
    return res.json();
  });

  const fuse = () => {
    const posts = data();
    if (!posts) return null;
    return new Fuse(posts, {
      keys: ['title', 'description', 'body'],
      threshold: 0.3,
    });
  };

  const results = () => {
    const q = query().trim();
    if (!q) return data() || [];
    const f = fuse();
    if (!f) return [];
    return f.search(q).map((r) => r.item);
  };

  onMount(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('open-search', onOpen);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    onCleanup(() => {
      window.removeEventListener('open-search', onOpen);
      window.removeEventListener('keydown', onKey);
    });
  });

  return (
    <Show when={open()}>
      <div class="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div class="relative w-full max-w-xl bg-bg rounded-xl border border-border shadow-2xl overflow-hidden">
          <div class="flex items-center gap-3 px-4 py-3 border-b border-border">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="text-text-secondary">
              <path d="M18.031 16.617 22.314 20.899 20.899 22.314 16.617 18.031A9.96 9.96 0 0 1 11 20C6.032 20 2 15.968 2 11S6.032 2 11 2s9 4.032 9 9a9.96 9.96 0 0 1-1.969 5.617Zm-2.006-.042A7.96 7.96 0 0 0 19 11c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8a7.96 7.96 0 0 0 5.575-2.329Z" />
            </svg>
            <input
              type="text"
              placeholder="搜尋文章..."
              class="flex-1 bg-transparent outline-none text-text placeholder:text-text-secondary"
              value={query()}
              onInput={(e) => setQuery(e.currentTarget.value)}
              autofocus
            />
            <span class="text-xs text-text-secondary hidden sm:inline">ESC 關閉</span>
          </div>
          <div class="max-h-[50vh] overflow-auto p-2">
            <Show when={!data.loading} fallback={<div class="p-4 text-sm text-text-secondary">載入中...</div>}>
              <For each={results().slice(0, 8)}>
                {(post) => (
                  <a
                    href={`/${post.category}/${post.slug}/`}
                    class="block p-3 rounded-lg hover:bg-bg-elevated transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <div class="text-sm font-medium text-text">{post.title}</div>
                    <div class="text-xs text-text-secondary mt-1 line-clamp-1">{post.description}</div>
                  </a>
                )}
              </For>
              <Show when={query().trim() && results().length === 0}>
                <div class="p-4 text-sm text-text-secondary">找不到相關文章</div>
              </Show>
            </Show>
          </div>
        </div>
      </div>
    </Show>
  );
}
