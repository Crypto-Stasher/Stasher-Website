import React, { useEffect, useRef } from 'react';
import { StasherMark } from '../../../../shared/components/StasherBrand';

export type SectionTransitionVariant = 'airgap' | 'verify' | 'pair';

interface SectionTransitionProps {
  variant: SectionTransitionVariant;
}

const COPY: Record<
  SectionTransitionVariant,
  { index: string; eyebrow: string; title: string; detail: string }
> = {
  airgap: {
    index: 'INTERLUDE / 01',
    eyebrow: 'PHYSICAL ISOLATION',
    title: 'Disconnected by design.',
    detail: 'No radio. No cable. No hidden route in.',
  },
  verify: {
    index: 'INTERLUDE / 02',
    eyebrow: 'HUMAN IN THE LOOP',
    title: 'Nothing moves until you do.',
    detail: 'See it. Check it. Approve it on the device.',
  },
  pair: {
    index: 'INTERLUDE / 03',
    eyebrow: 'SOFTWARE MEETS THE VAULT',
    title: 'One flow. Two separate worlds.',
    detail: 'The app prepares. The device verifies. Your keys stay offline.',
  },
};

const PIXELS = Array.from({ length: 28 }, (_, index) => {
  const ring = 1 + (index % 4) * 0.23;
  const angle = index * 2.399963;
  return {
    x: Math.cos(angle) * 210 * ring,
    y: Math.sin(angle) * 118 * ring,
    z: -420 + (index % 7) * 86,
    size: 5 + (index % 4) * 2,
    delay: index * -0.17,
  };
});

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  variant,
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const copy = COPY[variant];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let currentProgress = 0;
    let targetProgress = 0;
    let animationFrame = 0;

    const applyProgress = (rawProgress: number) => {
      const progress = smoothstep(rawProgress);
      const arc = Math.sin(progress * Math.PI);

      root.style.setProperty('--transition-rotate-y', `${-48 + progress * 96}deg`);
      root.style.setProperty('--transition-rotate-x', `${12 - arc * 22}deg`);
      root.style.setProperty('--transition-world-z', `${-280 + arc * 255}px`);
      root.style.setProperty('--transition-core-rotate', `${progress * 270}deg`);
      root.style.setProperty('--transition-ring-rotate', `${progress * -190}deg`);
      root.style.setProperty('--transition-copy-y', `${(0.5 - progress) * 2.8}rem`);
      root.style.setProperty('--transition-copy-opacity', `${0.34 + arc * 0.66}`);
      root.style.setProperty('--transition-depth-opacity', `${0.18 + arc * 0.52}`);
    };

    const animateProgress = () => {
      currentProgress += (targetProgress - currentProgress) * 0.13;
      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
      }
      applyProgress(currentProgress);
      if (currentProgress !== targetProgress) {
        animationFrame = window.requestAnimationFrame(animateProgress);
      } else {
        animationFrame = 0;
      }
    };

    const updateTarget = () => {
      if (reducedMotion.matches) {
        targetProgress = 0.5;
      } else {
        const rect = root.getBoundingClientRect();
        targetProgress = clamp(
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
        );
      }
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animateProgress);
      }
    };

    const updatePointer = (event: PointerEvent) => {
      if (reducedMotion.matches || event.pointerType === 'touch') return;
      const bounds = root.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      root.style.setProperty('--transition-pointer-x', `${x * 8}deg`);
      root.style.setProperty('--transition-pointer-y', `${-y * 5}deg`);
      root.style.setProperty('--transition-glow-x', `${(x + 1) * 50}%`);
      root.style.setProperty('--transition-glow-y', `${(y + 1) * 50}%`);
    };

    const resetPointer = () => {
      root.style.setProperty('--transition-pointer-x', '0deg');
      root.style.setProperty('--transition-pointer-y', '0deg');
      root.style.setProperty('--transition-glow-x', '66%');
      root.style.setProperty('--transition-glow-y', '50%');
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => root.classList.toggle('section-transition--visible', entry.isIntersecting),
      { rootMargin: '120px 0px', threshold: 0 },
    );
    visibilityObserver.observe(root);

    const updateMotionPreference = () => {
      resetPointer();
      updateTarget();
    };

    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget, { passive: true });
    root.addEventListener('pointermove', updatePointer, { passive: true });
    root.addEventListener('pointerleave', resetPointer);
    reducedMotion.addEventListener('change', updateMotionPreference);
    applyProgress(reducedMotion.matches ? 0.5 : 0);
    updateTarget();

    return () => {
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
      root.removeEventListener('pointermove', updatePointer);
      root.removeEventListener('pointerleave', resetPointer);
      reducedMotion.removeEventListener('change', updateMotionPreference);
      visibilityObserver.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      className={`section-transition section-transition--${variant}`}
      aria-label={`${copy.eyebrow}: ${copy.title}`}
      ref={rootRef}
    >
      <div className="section-transition-scene" aria-hidden="true">
        <div className="section-transition-world">
          <div className="section-transition-pixels">
            {PIXELS.map((pixel, index) => (
              <i
                className="section-transition-pixel"
                key={index}
                style={{
                  '--pixel-x': `${pixel.x}px`,
                  '--pixel-y': `${pixel.y}px`,
                  '--pixel-z': `${pixel.z}px`,
                  '--pixel-size': `${pixel.size}px`,
                  '--pixel-delay': `${pixel.delay}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>

          <div className="section-transition-rings">
            <i />
            <i />
            <i />
          </div>

          <div className="section-transition-core">
            <span className="section-transition-face section-transition-face--front">
              <StasherMark className="section-transition-mark" />
            </span>
            <span className="section-transition-face section-transition-face--back">
              <StasherMark className="section-transition-mark" />
            </span>
            <span className="section-transition-face section-transition-face--left" />
            <span className="section-transition-face section-transition-face--right" />
            <span className="section-transition-face section-transition-face--top" />
            <span className="section-transition-face section-transition-face--bottom" />
          </div>

          <div className="section-transition-gate section-transition-gate--left" />
          <div className="section-transition-gate section-transition-gate--right" />
        </div>
      </div>

      <div className="section-transition-copy">
        <p>{copy.index}</p>
        <span>{copy.eyebrow}</span>
        <h2>{copy.title}</h2>
        <small>{copy.detail}</small>
      </div>

      <div className="section-transition-coordinates" aria-hidden="true">
        <span>DEPTH / LIVE</span>
        <span>STASHER / SECURE PATH</span>
      </div>
    </section>
  );
};
