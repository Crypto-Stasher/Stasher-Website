import { useEffect } from 'react';

export const useScrollReveal = (ready: boolean = true) => {
  useEffect(() => {
    if (!ready) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');

          // Stagger children inside .stagger containers
          if (entry.target.classList.contains('stagger')) {
            const children = entry.target.querySelectorAll('.stagger-item');
            children.forEach((child, i) => {
              (child as HTMLElement).style.transitionDelay = `${i * 0.1}s`;
              child.classList.add('active');
            });
          }

          // One-shot reveal — stop observing once activated
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    // Use a tiny timeout to ensure React has fully committed the real DOM nodes
    const timer = setTimeout(() => {
      const selectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .stagger, .divider-animated';
      const elements = document.querySelectorAll(selectors);
      elements.forEach(el => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [ready]);
};
