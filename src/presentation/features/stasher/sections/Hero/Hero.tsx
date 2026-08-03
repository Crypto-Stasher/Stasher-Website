import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import stasherHero from '@assets/stasher-model-fallback.png';
import type { HeroContent } from '@models/sections';
import { useSmoothScroll } from '@hooks';

const StasherScene = lazy(
  () => import('@features/stasher/components/StasherModel/StasherScene')
    .then((module) => ({ default: module.StasherScene })),
);

interface HeroProps {
  content: HeroContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const scrollTo = useSmoothScroll();

  return (
    <section id="overview" className="hero-scroll">
      <div className="hero">
        <div className="hero-aurora hero-aurora--one" aria-hidden="true" />
        <div className="hero-aurora hero-aurora--two" aria-hidden="true" />

        <div className="container hero-layout">
          <div className="hero-content">
            <h1 className="hero-title-container">{content.title}</h1>
            <p className="hero-desc">{content.description}</p>

            <div className="hero-cta-row">
              <Link to="/product" className="cta-button">
                <span>{content.cta}</span>
                <span aria-hidden="true">↗</span>
              </Link>
              <a href="#architecture" className="hero-text-link" onClick={scrollTo}>
                See how it stays offline
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="hero-image">
            <div className="hero-stage-grid" aria-hidden="true" />
            <Suspense
              fallback={(
                <img
                  src={stasherHero}
                  alt="Black Stasher hardware wallet"
                  className="hero-device-img"
                  width={540}
                  height={640}
                  fetchPriority="high"
                  decoding="async"
                />
              )}
            >
              <StasherScene
                fallbackSrc={stasherHero}
                alt="Interactive black Stasher hardware wallet. Drag in any direction to rotate it 360 degrees."
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};
