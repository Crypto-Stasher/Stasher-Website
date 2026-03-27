import { useCallback } from 'react';

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export const useSmoothScroll = () => {
  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const navHeight = 70;
    const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = Math.min(1200, Math.max(600, Math.abs(distance) * 0.5));
    let startTime: number | null = null;

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        history.pushState(null, '', href);
      }
    }

    requestAnimationFrame(step);
  }, []);

  return scrollTo;
};
