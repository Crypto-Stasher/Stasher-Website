import React, { lazy, Suspense } from 'react';
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
            <div className="hero-eyebrow">
              <span className="status-dot" aria-hidden="true" />
              {content.tag}
            </div>
            <h1 className="hero-title-container">{content.title}</h1>
            <p className="hero-desc">{content.description}</p>

            <div className="hero-cta-row">
              <a href="#products" className="cta-button" onClick={scrollTo}>
                <span>{content.cta}</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a href="#architecture" className="hero-text-link" onClick={scrollTo}>
                See how it stays offline
                <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className="hero-assurance" aria-label="Connectivity protections">
              <span>No Wi-Fi</span>
              <span>No Bluetooth</span>
              <span>Keys never leave</span>
            </div>
          </div>

          <div className="hero-image">
            <div className="hero-stage-grid" aria-hidden="true" />
            <div className="hero-stage-label hero-stage-label--top">
              <span>PRODUCT MODEL</span>
              <span>STASHER / V0.8</span>
            </div>
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
            <div className="hero-stage-label hero-stage-label--bottom">
              <span>40 × 62 × 9 MM</span>
              <span>SCREEN / LIVE</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll-cue" aria-hidden="true">
          <span>Drag to spin 360°</span>
          <span className="hero-scroll-line" />
        </div>
      </div>
    </section>
  );
};
