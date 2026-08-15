import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { DifferentiatorItem } from '@models/sections';
import { WhyVideo } from '@features/stasher/components';
import { WhySlide } from './WhySlide';

/**
 * Reasons illustrated by a clip instead of a generated object, keyed by item id
 * so reordering the copy cannot silently mismatch them.
 */
const WHY_VIDEOS: Record<string, { src: string; poster: string }> = {
  '01': {
    src: `${import.meta.env.BASE_URL}video/quantum.mp4`,
    poster: `${import.meta.env.BASE_URL}video/quantum-poster.jpg`,
  },
  '03': {
    src: `${import.meta.env.BASE_URL}video/cold-hot.mp4`,
    poster: `${import.meta.env.BASE_URL}video/cold-hot-poster.jpg`,
  },
  '06': {
    src: `${import.meta.env.BASE_URL}video/pocket.mp4`,
    poster: `${import.meta.env.BASE_URL}video/pocket-poster.jpg`,
  },
};

// three.js is the heaviest dependency on the page, so the stage's 3D layer is
// split out and only fetched once the section is close to view.
const WhyScene = lazy(
  () => import('@features/stasher/components/WhyScene/WhyScene')
    .then((module) => ({ default: module.WhyScene })),
);

interface DifferentiatorsProps {
  title: string;
  items: DifferentiatorItem[];
}

/** How long a slide keeps its exit animation before going fully idle. */
const LEAVE_MS = 520;

/**
 * Sides alternate down the sequence: copy left then right then left, with the
 * object always opposite it. Derived from the index so adding a reason keeps
 * the rhythm without anyone maintaining a list.
 */
const textSide = (index: number): 'left' | 'right' => (index % 2 === 0 ? 'left' : 'right');
const visualSide = (index: number): 'left' | 'right' => (index % 2 === 0 ? 'right' : 'left');

/**
 * A single pinned stage whose copy changes as you scroll.
 *
 * The stage sticks to the viewport while an equal number of invisible,
 * viewport-tall steps scroll past behind it. Each step that crosses the middle
 * of the screen swaps the copy, so nothing moves except the text — no panel
 * edges, no seams, no sense of separate pages going by.
 */
export const Differentiators: React.FC<DifferentiatorsProps> = ({ title, items }) => {
  const [active, setActive] = useState(0);
  // Tracked separately from `active` so the outgoing slide can animate away in
  // its own direction instead of sharing the incoming slide's resting state.
  const [leaving, setLeaving] = useState<number | null>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const stepsRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = stepsRef.current;
    if (!container) return;

    const steps = Array.from(container.children) as HTMLElement[];
    if (!steps.length) return;

    // A zero-height band across the middle of the viewport: exactly one step
    // intersects it at a time, which makes "the one you are looking at"
    // unambiguous without measuring scroll offsets by hand.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (Number.isNaN(index)) return;

          setActive((current) => {
            if (current !== index) setLeaving(current);
            return index;
          });
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, [items.length]);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // Mount the canvas a screen early so it is warm by the time the stage pins,
  // and never at all for readers who never reach the section.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSceneReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100% 0px' },
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // Drop the leaving slide back to idle once its exit has played, so it starts
  // from the entry pose next time round.
  useEffect(() => {
    if (leaving === null) return;

    const timer = window.setTimeout(() => setLeaving(null), LEAVE_MS);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  return (
    <section id="differentiators" className="why">
      <div className="container why-intro">
        <h2 className="section-heading reveal-blur">{title}</h2>
      </div>

      <div className="why-stage" ref={stageRef}>
        <div className="why-stage-sticky">
          {/* One rule for the whole stage, and it never moves — it is what
              sells the page as standing still while the copy changes. */}
          <span className="why-stage-split" aria-hidden="true" />

          {items.map((item, index) => (
            WHY_VIDEOS[item.id] ? (
              <WhyVideo
                key={item.id}
                src={WHY_VIDEOS[item.id].src}
                poster={WHY_VIDEOS[item.id].poster}
                side={visualSide(index)}
                active={index === active}
                reducedMotion={reducedMotion}
              />
            ) : null
          ))}

          {sceneReady && (
            <div className="why-scene" aria-hidden="true">
              <Suspense fallback={null}>
                {/* A clip-illustrated reason has no generated object, so the
                    canvas clears rather than showing both at once. */}
                <WhyScene
                  active={WHY_VIDEOS[items[active]?.id] ? -1 : active}
                  reducedMotion={reducedMotion}
                />
              </Suspense>
            </div>
          )}

          <span className="why-stage-vignette" aria-hidden="true" />

          {items.map((item, index) => (
            <WhySlide
              key={item.id}
              item={item}
              state={
                index === active ? 'active' : index === leaving ? 'leaving' : 'idle'
              }
              textSide={textSide(index)}
            />
          ))}
        </div>

        {/* Scroll length only — these carry no content and are pulled up
            underneath the sticky stage. */}
        <div className="why-steps" ref={stepsRef} aria-hidden="true">
          {items.map((item, index) => (
            <div key={item.id} className="why-step" data-index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
