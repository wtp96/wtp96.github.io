import { createSignal, onMount } from 'solid-js';

export default function ThemeToggle() {
  const [isDark, setIsDark] = createSignal(false);

  onMount(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  });

  const toggle = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark() ? '切換淺色模式' : '切換深色模式'}
      class="p-2 rounded-md hover:bg-bg-elevated transition-colors"
    >
      {isDark() ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM11 1h2v3h-2V1Zm0 19h2v3h-2v-3ZM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93ZM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121Zm0-12.728 2.121-2.121 1.414 1.414-2.121 2.121-1.414-1.414ZM4.929 20.485l2.121-2.121 1.414 1.414-2.121 2.121-1.414-1.414ZM23 11v2h-3v-2h3ZM1 11v2H1v-2h3Z" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 7a7 7 0 0 0 12 4.9A9 9 0 1 1 10 7Zm2-1.982A9.04 9.04 0 0 1 20.982 11 7 7 0 0 0 12 5.082V5.018Z" />
        </svg>
      )}
    </button>
  );
}
